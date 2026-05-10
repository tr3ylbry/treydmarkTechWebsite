import { NextResponse } from "next/server";
import { getResend } from "@/lib/resend";

type InquiryPayload = {
  name: string;
  email: string;
  business: string;
  website: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
};

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

function getInquiryEmailHtml(payload: InquiryPayload) {
  const rows = [
    ["Name", payload.name],
    ["Email", payload.email],
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
            ${escapeHtml(value)}
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

function getInquiryEmailText(payload: InquiryPayload) {
  return [
    "New Treydmark Tech inquiry",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
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

function validatePayload(payload: Partial<InquiryPayload>) {
  const requiredFields: Array<keyof InquiryPayload> = [
    "name",
    "email",
    "service",
    "budget",
    "timeline",
    "message",
  ];

  for (const field of requiredFields) {
    if (!payload[field]?.trim()) {
      return `Missing required field: ${field}`;
    }
  }

  return null;
}

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<InquiryPayload>;
  const validationError = validatePayload(payload);

  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const to = process.env.CONTACT_EMAIL_TO;
  const from =
    process.env.RESEND_FROM_EMAIL || "Treydmark Tech <onboarding@resend.dev>";

  if (!to) {
    return NextResponse.json(
      {
        error:
          "Missing CONTACT_EMAIL_TO environment variable. Add the inbox address that should receive website inquiries.",
      },
      { status: 500 }
    );
  }

  try {
    const resend = getResend();
    const inquiry = payload as InquiryPayload;

    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject: `New Treydmark Tech inquiry from ${inquiry.name}`,
      replyTo: inquiry.email,
      html: getInquiryEmailHtml(inquiry),
      text: getInquiryEmailText(inquiry),
    });

    if (error) {
      return NextResponse.json(
        { error: error.message || "Resend failed to send the inquiry." },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong while sending the inquiry.",
      },
      { status: 500 }
    );
  }
}
