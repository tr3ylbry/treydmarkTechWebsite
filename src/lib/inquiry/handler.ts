import { isMailbox, validateInquiry } from "../inquiry-schema.ts";
import { getInquiryEmailHtml, getInquiryEmailText } from "./email.ts";

export const BODY_LIMIT = 32_768;
const WINDOW_MS = 15 * 60_000;
const genericError = "The inquiry could not be sent. Please try again in a few minutes.";
const uncertainError = "We could not confirm your inquiry was accepted. Please contact Treydmark directly before retrying.";
type Email = { from: string; to: string[]; subject: string; replyTo: string; html: string; text: string };
type Dependencies = { origins: readonly string[]; configuration: () => { to?: string; from?: string; configured: boolean }; send: (email: Email) => Promise<unknown>; now?: () => number };

function reply(status: number, body: object, retryAfter?: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...(retryAfter ? { "Retry-After": String(retryAfter) } : {}) } });
}

class BodyError extends Error {
  status: number;
  constructor(status: number) { super("Invalid request body"); this.status = status; }
}

export async function readInquiryJson(request: Request) {
  const declared = request.headers.get("content-length");
  if (declared !== null && (!/^\d+$/.test(declared) || Number(declared) > BODY_LIMIT)) throw new BodyError(413);
  if (!request.body) throw new BodyError(400);
  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let bytes = 0;
  let text = "";
  let timedOut = false;
  const timer = setTimeout(() => { timedOut = true; void reader.cancel().catch(() => {}); }, 10_000);
  try {
    while (true) {
      const chunk = await reader.read();
      if (timedOut) throw new BodyError(408);
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > BODY_LIMIT) throw new BodyError(413);
      text += decoder.decode(chunk.value, { stream: true });
    }
    text += decoder.decode();
    return JSON.parse(text) as unknown;
  } catch (error) {
    await reader.cancel().catch(() => {});
    throw error instanceof BodyError ? error : new BodyError(400);
  } finally { clearTimeout(timer); reader.releaseLock(); }
}

// Constant memory, per-process attempt/concurrency guard. No caller-controlled IP buckets.
export function createInquiryHandler(dependencies: Dependencies) {
  let windowStart = 0;
  let attempts = 0;
  let active = 0;
  const now = dependencies.now ?? Date.now;
  return async function handle(request: Request) {
    if (request.method !== "POST") return reply(405, { error: genericError });
    const origin = request.headers.get("origin");
    if (!origin || !dependencies.origins.includes(origin) || origin !== new URL(request.url).origin || request.headers.get("sec-fetch-site") === "cross-site") return reply(403, { error: genericError });
    if (request.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase() !== "application/json") return reply(415, { error: "Submit the inquiry using the contact form." });
    const time = now();
    if (time - windowStart >= WINDOW_MS) { windowStart = time; attempts = 0; }
    if (attempts >= 60 || active >= 3) return reply(429, { error: "Too many attempts. Please wait a few minutes before trying again." }, active >= 3 ? 60 : Math.max(1, Math.ceil((windowStart + WINDOW_MS - time) / 1000)));
    attempts++;
    active++;
    try {
      let input: unknown;
      try { input = await readInquiryJson(request); }
      catch (error) { return reply(error instanceof BodyError ? error.status : 400, { error: error instanceof BodyError && error.status === 413 ? "The inquiry is too large. Please shorten it and try again." : "Submit a valid inquiry using the contact form." }); }
      const parsed = validateInquiry(input);
      if (!parsed.valid) return reply(400, { error: "Please check the inquiry fields and try again.", fieldErrors: parsed.fieldErrors });
      if (parsed.honeypot) return reply(400, { error: genericError });
      const config = dependencies.configuration();
      const fromMailbox = config.from?.match(/^[^<>\r\n]+<([^<>]+)>$/)?.[1] ?? config.from;
      if (!config.configured || !config.to || !config.from || /[\x00-\x1f\x7f]/.test(config.from) || !isMailbox(config.to) || !fromMailbox || !isMailbox(fromMailbox)) return reply(503, { error: genericError });
      const result = await dependencies.send({ from: config.from, to: [config.to], subject: "New Treydmark Tech inquiry", replyTo: parsed.payload.email, html: getInquiryEmailHtml(parsed.payload), text: getInquiryEmailText(parsed.payload) });
      if (!result || typeof result !== "object") return reply(502, { error: uncertainError });
      const response = result as { error?: unknown; data?: { id?: unknown } };
      if (response.error || typeof response.data?.id !== "string" || !response.data.id.trim()) return reply(502, { error: uncertainError });
      return reply(200, { success: true, code: "accepted" });
    } catch { return reply(502, { error: uncertainError }); }
    finally { active--; }
  };
}
