# Contact inquiry controls

The contact form posts JSON to `/api/inquiry`. Existing fields, service/budget/timeline choices and submit-time field validation remain. Provider acceptance requires an error-free response with a nonempty string ID. This is acceptance for sending, not proof of inbox delivery. The form retains values on every failed/uncertain response and does not automatically retry.

## Configuration

Existing server-only settings: `RESEND_API_KEY`, `CONTACT_EMAIL_TO` (one mailbox), `RESEND_FROM_EMAIL` (one mailbox or display-name mailbox; defaults to the existing onboarding sender). Sender verification and recipient approval remain deployment checks. No credentials or provider error details are returned to clients.

`CONTACT_FORM_ALLOWED_ORIGINS` optionally overrides the explicit comma-separated origin list. Default origins are `https://treydmarktech.com`, `https://www.treydmarktech.com` and the existing preview `https://treydmark-tech-website.vercel.app`. Development additionally allows `http://localhost:3000` and `http://127.0.0.1:3000`. An override must include every desired origin; use exact origins without paths/trailing slash/wildcards. Unique deployment previews and alternate dev ports need explicit entries. Missing/null/foreign origins, cross-site fetch signals and origins differing from the request URL origin are rejected. Verify the production proxy preserves the public URL. Raw Host or forwarded-host values never expand the allowlist. This browser-origin policy is not bot authentication.

Optional `NEXT_PUBLIC_CONTACT_FALLBACK_EMAIL` is a **public**, client-approved fallback mailbox, compiled into the client. A valid configured value renders an “Email Treydmark directly” link. No recipient was guessed or copied from private environment values; confirm and configure this fallback before rollout.

## Limits and tradeoffs

- Streaming JSON body: 32,768 actual bytes, fatal UTF-8 decoding, declared-length early rejection, ten-second read limit and stream cancellation. Native JSON duplicate-key last-value semantics apply. Request multipart/FormData is not supported; this preserves the existing JSON contract. Email retains both HTML and plain-text parts.
- Pre-trim UTF-16 field limits: name 120, email 254, phone 80, business 200, website 2,048, message 5,000, dropdowns 100, honeypot 200. Message minimum remains 20. Optional phone/business/website can be blank or absent. Large JSON escaping can exceed the byte cap even when field lengths fit; oversize returns a clear error rather than truncating.
- Practical single-mailbox syntax and HTTP(S) website validation; exact existing dropdown enums. No header controls; message tabs/newlines are retained. Unknown keys and malformed scalar values are rejected. HTML is escaped before newline markup; subject/from/to are fixed and reply-to is validated.
- Hidden, unfocusable, autocomplete-disabled honeypot. A filled trap gets honest failure with no delivery call. Password-manager autofill should still be verified on target devices.
- Constant-memory guard: 60 admitted processing attempts per 15-minute fixed window, maximum three concurrent body-read/delivery operations per process. Invalid bodies consume admitted attempts. 429 includes Retry-After. It keeps no IP, email or message state. It resets on restart and is independent per instance/region; it is not distributed or per-user enforcement. A traffic burst or attack can throttle legitimate shared traffic, and fixed-window boundaries permit bursts. Tune against real traffic before rollout.
- Hung provider requests can occupy three slots; no Promise.race delivery timeout that pretends to cancel provider acceptance. No automatic retries after ambiguity. Stronger ingress/SDK timeout or durable rate-limit controls require separate topology evidence.
- No keyword, language, URL, freemail, completion-speed or repeated-sender filter. Marketing/SEO can be legitimate Treydmark inquiry content. The honeypot and structural/attempt controls do not eliminate sophisticated spam.

## Reproduce offline checks

`node --experimental-strip-types --test tests/unit/inquiry.test.ts` (Node 24): fake transport only; never imports the route or Resend adapter. Tests cover invalid shapes/enums/lengths, origin/media policy, split UTF-8, false Content-Length overflow, HTML/text formatting, missing configuration, provider errors/throws/missing IDs, fixed-window quota and concurrency.

`npx playwright test --config playwright.contact.config.ts`: localhost:3106; Chromium, Firefox, WebKit and iPhone emulation. Accepted/error deliveries are intercepted in the browser. Only invalid/foreign-origin API requests reach the actual Next route. No real email, remote form interaction or booking occurs.

Run app lint, TypeScript and actual Next production build. Deployment sender configuration, genuine provider acceptance/inbox receipt, proxy behavior, screen readers, physical-device autofill and shared-instance enforcement remain unverified. Existing motion reduced-preference hydration warnings are independent of this handler.
