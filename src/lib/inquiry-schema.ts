// Shared field policy; contains no environment values or delivery code.
export const serviceOptions = ["Starter Site", "Growth Website", "Custom Platform / App", "Minor Refresh", "Major Redesign / Migration", "Ongoing Support", "Other"];
export const budgetOptions = ["$1,000 - $3,000", "$3,000 - $5,000", "$5,000 - $15,000", "$15,000+", "Not sure yet"];
export const timelineOptions = ["As soon as possible", "Within 1 month", "1 - 3 months", "Flexible"];
export const inquiryLimits = { name: 120, email: 254, phone: 80, business: 200, website: 2048, service: 100, budget: 100, timeline: 100, message: 5000, companyWebsite: 200 };
export type InquiryField = Exclude<keyof typeof inquiryLimits, "companyWebsite">;
export type InquiryPayload = Record<InquiryField, string>;
export type FieldErrors = Partial<Record<InquiryField, string>>;

export function isMailbox(value: string) {
  if (value.length > 254 || !/^[^\s@<>(),;:\\"\[\]]+@[^\s@]+$/.test(value)) return false;
  const [local, domain] = value.split("@");
  return local.length <= 64 && !local.startsWith(".") && !local.endsWith(".") && !local.includes("..") && domain.includes(".") && domain.split(".").every(label => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(label));
}

export function validateInquiry(input: unknown):
  | { valid: true; payload: InquiryPayload; honeypot: string }
  | { valid: false; fieldErrors: FieldErrors } {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { valid: false, fieldErrors: {} };
  const values = input as Record<string, unknown>;
  if (Object.keys(values).some(key => !Object.hasOwn(inquiryLimits, key))) return { valid: false, fieldErrors: {} };
  const normalized: Record<string, string> = {};
  const fieldErrors: FieldErrors = {};
  for (const field of Object.keys(inquiryLimits) as (keyof typeof inquiryLimits)[]) {
    const value = values[field] ?? "";
    if (typeof value !== "string" || value.length > inquiryLimits[field] || (field === "message" ? /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/ : /[\x00-\x1f\x7f]/).test(value)) {
      if (field === "companyWebsite") return { valid: false, fieldErrors: {} };
      fieldErrors[field] = "Enter valid text within the field limit.";
      normalized[field] = "";
    } else normalized[field] = value.trim();
  }
  for (const field of ["name", "email", "service", "budget", "timeline", "message"] as const) {
    if (!normalized[field]) fieldErrors[field] = "This field is required.";
  }
  if (normalized.email && !isMailbox(normalized.email)) fieldErrors.email = "Enter a valid email address.";
  if (normalized.message && normalized.message.length < 20) fieldErrors.message = "Add a little more detail.";
  for (const [field, options] of [["service", serviceOptions], ["budget", budgetOptions], ["timeline", timelineOptions]] as const) {
    if (normalized[field] && !options.includes(normalized[field])) fieldErrors[field] = "Select an available option.";
  }
  if (normalized.website) {
    try {
      const url = new URL(normalized.website);
      if (!["http:", "https:"].includes(url.protocol) || !url.hostname.includes(".") || url.username || url.password) throw new Error();
    } catch { fieldErrors.website = "Enter a valid website URL."; }
  }
  if (Object.keys(fieldErrors).length) return { valid: false, fieldErrors };
  const { companyWebsite, ...payload } = normalized;
  return { valid: true, payload: payload as InquiryPayload, honeypot: companyWebsite };
}
