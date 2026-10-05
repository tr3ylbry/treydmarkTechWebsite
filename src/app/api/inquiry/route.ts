import { getResend } from "@/lib/resend";
import { createInquiryHandler } from "@/lib/inquiry/handler";

export const runtime = "nodejs";
// Explicit deployment origins, never a caller-supplied Host/forwarded-host allowlist.
const origins = process.env.CONTACT_FORM_ALLOWED_ORIGINS?.split(",").map(value => value.trim()).filter(Boolean) ?? [
  "https://treydmarktech.com", "https://www.treydmarktech.com", "https://treydmark-tech-website.vercel.app",
  ...(process.env.NODE_ENV === "development" ? ["http://localhost:3000", "http://127.0.0.1:3000"] : []),
];
const handle = createInquiryHandler({
  origins,
  configuration: () => ({
    configured: Boolean(process.env.RESEND_API_KEY),
    to: process.env.CONTACT_EMAIL_TO,
    from: process.env.RESEND_FROM_EMAIL || "Treydmark Tech <onboarding@resend.dev>",
  }),
  send: email => getResend().emails.send(email),
});
export async function POST(request: Request) { return handle(request); }
