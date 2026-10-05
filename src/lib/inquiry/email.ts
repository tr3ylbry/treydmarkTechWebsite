import type { InquiryPayload } from "../inquiry-schema.ts";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatOptionalValue(value: string) {
  return value.trim() ? value.trim() : "Not provided";
}

export function getInquiryEmailHtml(payload: InquiryPayload) {
  const rows = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Phone", formatOptionalValue(payload.phone)],
    ["Business", formatOptionalValue(payload.business)],
    ["Website", formatOptionalValue(payload.website)],
    ["Service", payload.service],
    ["Budget", payload.budget],
    ["Timeline", payload.timeline],
    ["Project goals", payload.message],
  ];

  const rowMarkup = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 14px;border-bottom:1px solid #232326;color:#a1a1aa;font-size:13px;vertical-align:top;">
            ${escapeHtml(label)}
          </td>
          <td style="padding:12px 14px;border-bottom:1px solid #232326;color:#f5f5f2;font-size:14px;line-height:1.6;">
            ${escapeHtml(value).replace(/\r\n|\r|\n/g, "<br>")}
          </td>
        </tr>
      `
    )
    .join("");

  return `
    <div style="background:#0b0b0c;padding:32px;font-family:Arial,Helvetica,sans-serif;color:#f5f5f2;">
      <div style="max-width:680px;margin:0 auto;border:1px solid #232326;background:#111113;border-radius:16px;overflow:hidden;">
        <div style="padding:24px 28px;border-bottom:1px solid #232326;">
          <p style="margin:0 0 8px;color:#e6b8a2;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;">
            Treydmark Tech
          </p>
          <h1 style="margin:0;font-size:28px;line-height:1.2;color:#f5f5f2;">
            New website inquiry
          </h1>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          <tbody>${rowMarkup}</tbody>
        </table>
      </div>
    </div>
  `;
}

export function getInquiryEmailText(payload: InquiryPayload) {
  return [
    "New Treydmark Tech inquiry",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${formatOptionalValue(payload.phone)}`,
    `Business: ${formatOptionalValue(payload.business)}`,
    `Website: ${formatOptionalValue(payload.website)}`,
    `Service: ${payload.service}`,
    `Budget: ${payload.budget}`,
    `Timeline: ${payload.timeline}`,
    "",
    "Project goals:",
    payload.message,
  ].join("\n");
}
