import { test } from 'node:test';
import assert from 'node:assert/strict';
import { BODY_LIMIT, createInquiryHandler, readInquiryJson } from '../../src/lib/inquiry/handler.ts';
import { inquiryLimits, validateInquiry } from '../../src/lib/inquiry-schema.ts';

const origin = 'https://treydmarktech.com';
const valid = { name: 'Synthetic Visitor', email: 'visitor@example.test', phone: '', business: '', website: '', service: 'Starter Site', budget: 'Not sure yet', timeline: 'Flexible', message: 'Please help us improve our business website.' };
function request(body: unknown = valid, headers: Record<string, string> = {}, raw = false, url = origin) {
  return new Request(`${url}/api/inquiry`, { method: 'POST', headers: { origin, 'content-type': 'application/json', ...headers }, body: raw ? String(body) : JSON.stringify(body) });
}
function harness(result: unknown = { data: { id: 'synthetic-acceptance' }, error: null }) {
  const sent: unknown[] = [];
  const handle = createInquiryHandler({ origins: [origin], configuration: () => ({ configured: true, to: 'owner@example.test', from: 'Treydmark <forms@example.test>' }), send: async email => { sent.push(email); if (result instanceof Error) throw result; return result; } });
  return { handle, sent };
}

test('legitimate inquiries retain escaped HTML, explicit text, fixed addressing and reply-to', async () => {
  const { handle, sent } = harness();
  const payload = { ...valid, name: `Ana & <Team> "Synthetic"`, message: 'Necesito una web para suscripciones mensuales.\nhttps://example.pro <img src=x onerror=alert(1)>', website: 'https://example.live/path', phone: '', budget: 'Not sure yet' };
  const response = await handle(request(payload));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true, code: 'accepted' });
  assert.equal(response.headers.get('cache-control'), 'no-store');
  const email = sent[0] as { from: string; to: string[]; subject: string; replyTo: string; html: string; text: string };
  assert.equal(email.from, 'Treydmark <forms@example.test>');
  assert.deepEqual(email.to, ['owner@example.test']);
  assert.equal(email.subject, 'New Treydmark Tech inquiry');
  assert.equal(email.replyTo, payload.email);
  assert.ok(email.html.includes('Ana &amp; &lt;Team&gt; &quot;Synthetic&quot;'));
  assert.ok(email.html.includes('&lt;img src=x onerror=alert(1)&gt;'));
  assert.ok(!email.html.includes('<img src=x'));
  assert.ok(email.text.includes(payload.message));
  assert.ok(email.html.includes('mensuales.<br>https://example.pro'));
  assert.ok(email.text.includes('Phone: Not provided'));
});

test('schema rejects untrusted shapes, unknown fields, controls, enums and pre-trim overlength without sending', async () => {
  const cases: unknown[] = [null, [], 'text', 42, {}, { ...valid, surprise: 'x' }, { ...valid, name: [] }, { ...valid, email: {} }, { ...valid, phone: 12 }, { ...valid, service: 'invented' }, { ...valid, budget: 'invented' }, { ...valid, timeline: 'invented' }, { ...valid, message: 'Too short' }, { ...valid, name: 'Header\r\nInjected' }, { ...valid, email: 'a@example.test\r\nBcc: other@example.test' }, { ...valid, website: 'javascript:alert(1)' }, { ...valid, website: 'https://user:pass@example.test' }, { ...valid, companyWebsite: {} }, { ...valid, companyWebsite: 'bot.example' }];
  for (const [field, limit] of Object.entries(inquiryLimits)) cases.push({ ...valid, [field]: ' '.repeat(limit + 1) });
  for (const payload of cases) {
    const { handle, sent } = harness();
    assert.equal((await handle(request(payload))).status, 400);
    assert.equal(sent.length, 0);
  }
  assert.ok(validateInquiry({ ...valid, phone: undefined, business: undefined, website: undefined }).valid);
});

test('mailbox validation rejects multiple recipients, malformed domains and missing contact', async () => {
  for (const email of ['a@example.test,b@example.test', 'a@example', '.a@example.test', 'a..b@example.test', 'a@-example.test', 'a@example..test', '']) {
    const { handle, sent } = harness();
    assert.equal((await handle(request({ ...valid, email }))).status, 400);
    assert.equal(sent.length, 0);
  }
});

test('browser origin and media-type policy fails closed without invoking transport', async () => {
  const blockedHeaders: Record<string, string>[] = [{ origin: 'https://foreign.test' }, { origin: 'null' }, { origin: '' }, { 'sec-fetch-site': 'cross-site' }, { 'content-type': 'multipart/form-data; boundary=CaseSensitive' }, { 'content-type': 'text/plain' }];
  for (const headers of blockedHeaders) {
    const { handle, sent } = harness();
    const response = await handle(request(valid, headers));
    assert.ok([403, 415].includes(response.status));
    assert.equal(sent.length, 0);
  }
  const { handle } = harness();
  assert.equal((await handle(request(valid, {}, false, 'https://spoofed.test'))).status, 403);
  const missing = request(); missing.headers.delete('origin');
  assert.equal((await handle(missing)).status, 403);
});

test('bounded parser rejects malformed JSON/UTF8 and actual-byte overflow despite false declared length', async () => {
  for (const body of ['{', '', 'x'.repeat(BODY_LIMIT + 1)]) {
    const { handle, sent } = harness();
    const response = await handle(request(body, { 'content-length': '1' }, true));
    assert.equal(response.status, body.length > BODY_LIMIT ? 413 : 400);
    assert.equal(sent.length, 0);
  }
  assert.equal((await harness().handle(request(valid, { 'content-length': String(BODY_LIMIT + 1) }))).status, 413);
  const invalidUtf8 = new Request(`${origin}/api/inquiry`, { method: 'POST', body: new Uint8Array([0xff]) });
  await assert.rejects(readInquiryJson(invalidUtf8));
  const bytes = new TextEncoder().encode(JSON.stringify({ ...valid, name: 'José' }));
  const stream = new ReadableStream<Uint8Array>({ start(controller) { for (const byte of bytes) controller.enqueue(new Uint8Array([byte])); controller.close(); } });
  const streamed = new Request(`${origin}/api/inquiry`, { method: 'POST', body: stream, duplex: 'half' } as RequestInit & { duplex: 'half' });
  assert.deepEqual(await readInquiryJson(streamed), { ...valid, name: 'José' });
  const boundary = request(' '.repeat(BODY_LIMIT - 2) + '{}', {}, true);
  assert.deepEqual(await readInquiryJson(boundary), {});
  let cancelled = false;
  const overflow = new ReadableStream<Uint8Array>({ start(controller) { controller.enqueue(new Uint8Array(BODY_LIMIT + 1)); }, cancel() { cancelled = true; } });
  const overflowRequest = new Request(`${origin}/api/inquiry`, { method: 'POST', body: overflow, duplex: 'half' } as RequestInit & { duplex: 'half' });
  await assert.rejects(readInquiryJson(overflowRequest));
  assert.equal(cancelled, true);
});

test('delivery errors, missing or malformed acceptance IDs and throws never expose provider details or claim success', async () => {
  for (const result of [{ error: { message: 'private provider diagnostic' }, data: { id: 'x' } }, { data: {} }, { data: { id: '' } }, { data: { id: '   ' } }, { data: { id: 12 } }, null, new Error('private token and recipient')]) {
    const { handle, sent } = harness(result);
    const response = await handle(request());
    assert.equal(response.status, 502);
    assert.equal(sent.length, 1);
    const body = await response.text();
    assert.ok(!body.includes('private'));
    assert.ok(!body.includes('success'));
  }
});

test('unconfigured or malformed fixed addressing returns generic unavailable error without sending', async () => {
  for (const config of [{ configured: false, to: 'owner@example.test', from: 'forms@example.test' }, { configured: true }, { configured: true, to: 'owner@example.test,b@example.test', from: 'forms@example.test' }, { configured: true, to: 'owner@example.test', from: 'Unsafe\r\nName <forms@example.test>' }]) {
    let calls = 0;
    const handle = createInquiryHandler({ origins: [origin], configuration: () => config, send: async () => { calls++; return {}; } });
    const response = await handle(request());
    assert.equal(response.status, 503);
    assert.equal(calls, 0);
    assert.ok(!(await response.text()).includes('environment'));
  }
});

test('attempt guard counts invalid requests, returns Retry-After and resets its fixed window', async () => {
  let clock = 1_000_000;
  let calls = 0;
  const handle = createInquiryHandler({ origins: [origin], now: () => clock, configuration: () => ({ configured: true, to: 'owner@example.test', from: 'forms@example.test' }), send: async () => { calls++; return { data: { id: 'synthetic' } }; } });
  for (let attempt = 0; attempt < 60; attempt++) assert.equal((await handle(request(null))).status, 400);
  const throttled = await handle(request());
  assert.equal(throttled.status, 429);
  assert.equal(throttled.headers.get('retry-after'), '900');
  assert.equal(calls, 0);
  clock += 900_000;
  assert.equal((await handle(request())).status, 200);
  assert.equal(calls, 1);
});

test('concurrency guard limits active operations and releases slots after completion', async () => {
  const finish: ((result: unknown) => void)[] = [];
  let ready!: () => void;
  const started = new Promise<void>(resolve => { ready = resolve; });
  const handle = createInquiryHandler({ origins: [origin], configuration: () => ({ configured: true, to: 'owner@example.test', from: 'forms@example.test' }), send: () => new Promise(resolve => { finish.push(resolve); if (finish.length === 3) ready(); }) });
  const pending = [handle(request()), handle(request()), handle(request())];
  await started;
  assert.equal((await handle(request())).status, 429);
  finish.forEach(resolve => resolve({ data: { id: 'synthetic' } }));
  const responses = await Promise.all(pending);
  assert.deepEqual(responses.map(response => response.status), [200, 200, 200]);
  const afterCompletion = handle(request());
  while (finish.length < 4) await new Promise(resolve => setImmediate(resolve));
  finish[3]({ data: { id: 'synthetic' } });
  assert.equal((await afterCompletion).status, 200);
});
