"use client";

import { FormEvent, useState, useTransition } from "react";

type InquiryField =
  | "name"
  | "email"
  | "business"
  | "website"
  | "service"
  | "budget"
  | "timeline"
  | "message";

type FormState = {
  error: string | null;
  success: string | null;
};

type FieldErrors = Partial<Record<InquiryField, string>>;

const serviceOptions = [
  "Website Redesign",
  "New Business Website",
  "Advanced Web Platform",
  "Logo and Brand Refresh",
  "SEO Setup",
  "Ongoing Support",
];

const budgetOptions = [
  "$750 - $2,500",
  "$2,500 - $5,000",
  "$5,000 - $10,000",
  "$10,000+",
  "Not sure yet",
];

const timelineOptions = [
  "As soon as possible",
  "Within 1 month",
  "1 - 3 months",
  "Flexible",
];

const inputClassName =
  "mt-2 w-full rounded-md border border-white/10 bg-[#0B0B0C] px-4 py-3 text-sm text-[#F5F5F2] outline-none transition placeholder:text-[#73737A] focus:border-[#E6B8A2]/55";

const initialState: FormState = {
  error: null,
  success: null,
};

export function ContactForm() {
  const [state, setState] = useState<FormState>(initialState);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isPending, startTransition] = useTransition();

  function clearFieldError(field: InquiryField) {
    setFieldErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries()) as Record<
      InquiryField,
      string
    >;
    const nextFieldErrors = validateInquiryForm(payload);

    setState(initialState);
    setFieldErrors(nextFieldErrors);

    if (Object.keys(nextFieldErrors).length > 0) {
      setState({
        error: "Please fix the highlighted fields and try again.",
        success: null,
      });
      return;
    }

    startTransition(async () => {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        error?: string;
        success?: boolean;
      };

      if (!response.ok) {
        setState({
          error: result.error || "The inquiry could not be sent. Please try again.",
          success: null,
        });
        return;
      }

      form.reset();
      setFieldErrors({});
      setState({
        error: null,
        success:
          "Inquiry sent. I will review the details and follow up from the reply-to email you provided.",
      });
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-lg border border-white/10 bg-[#101011] p-5 shadow-2xl shadow-black/30 sm:p-7"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Name"
          name="name"
          placeholder="Your name"
          required
          error={fieldErrors.name}
          onValueChange={clearFieldError}
        />
        <Field
          label="Email"
          name="email"
          placeholder="you@business.com"
          type="email"
          required
          error={fieldErrors.email}
          onValueChange={clearFieldError}
        />
        <Field
          label="Business Name"
          name="business"
          placeholder="Business Name"
          error={fieldErrors.business}
          onValueChange={clearFieldError}
        />
        <Field
          label="Existing Website URL (If Applicable)"
          name="website"
          placeholder="https://"
          type="url"
          defaultValue="https://"
          error={fieldErrors.website}
          onValueChange={clearFieldError}
        />
        <SelectField
          label="Service Interested In"
          name="service"
          options={serviceOptions}
          required
          error={fieldErrors.service}
          onValueChange={clearFieldError}
        />
        <SelectField
          label="Budget Range"
          name="budget"
          options={budgetOptions}
          required
          error={fieldErrors.budget}
          onValueChange={clearFieldError}
        />
        <SelectField
          label="Timeline"
          name="timeline"
          options={timelineOptions}
          required
          error={fieldErrors.timeline}
          onValueChange={clearFieldError}
        />
        <div className="md:col-span-2">
          <label
            htmlFor="message"
            className="text-sm font-medium text-[#F5F5F2]"
          >
            Project Goals / Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            placeholder="What needs to change, what is working now, and what would make the project successful?"
            className={`${inputClassName} ${
              fieldErrors.message ? "border-[#F8AFAF]" : ""
            }`}
            onChange={() => clearFieldError("message")}
          />
          {fieldErrors.message ? (
            <p className="mt-2 text-sm text-[#F8AFAF]">{fieldErrors.message}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full bg-[#E6B8A2] px-6 py-4 text-sm font-semibold text-[#0B0B0C] transition hover:-translate-y-0.5 hover:bg-[#F1C8B8] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {isPending ? "Sending..." : "Start a Project"}
        </button>
        <p
          aria-live="polite"
          className={`text-sm ${
            state.error ? "text-[#F8AFAF]" : "text-[#C9C9C3]"
          }`}
        >
          {state.error || state.success || "Replies route through the email address you enter above."}
        </p>
      </div>
    </form>
  );
}

function validateInquiryForm(values: Record<InquiryField, string>) {
  const errors: FieldErrors = {};
  const trimmedWebsite = values.website.trim();
  const hasWebsiteValue = trimmedWebsite !== "" && trimmedWebsite !== "https://";

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.service.trim()) {
    errors.service = "Please choose the service you are interested in.";
  }

  if (!values.budget.trim()) {
    errors.budget = "Please select a budget range.";
  }

  if (!values.timeline.trim()) {
    errors.timeline = "Please select a timeline.";
  }

  if (!values.message.trim()) {
    errors.message = "Please describe the project goals.";
  } else if (values.message.trim().length < 20) {
    errors.message = "Add a little more detail so the inquiry has enough context.";
  }

  if (trimmedWebsite === "https://") {
    errors.website = "Add the rest of the website address or leave this field blank.";
  } else if (hasWebsiteValue) {
    try {
      const url = new URL(trimmedWebsite);
      if (!url.hostname.includes(".")) {
        errors.website = "Please enter a full website URL.";
      }
    } catch {
      errors.website = "Please enter a valid website URL.";
    }
  }

  return errors;
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required = false,
  defaultValue,
  error,
  onValueChange,
}: {
  label: string;
  name: InquiryField;
  placeholder: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  error?: string;
  onValueChange: (field: InquiryField) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-[#F5F5F2]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={`${inputClassName} ${error ? "border-[#F8AFAF]" : ""}`}
        defaultValue={defaultValue}
        onChange={() => onValueChange(name)}
      />
      {error ? <p className="mt-2 text-sm text-[#F8AFAF]">{error}</p> : null}
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  required = false,
  error,
  onValueChange,
}: {
  label: string;
  name: InquiryField;
  options: string[];
  required?: boolean;
  error?: string;
  onValueChange: (field: InquiryField) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-[#F5F5F2]">
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue=""
        required={required}
        className={`${inputClassName} ${error ? "border-[#F8AFAF]" : ""}`}
        onChange={() => onValueChange(name)}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      {error ? <p className="mt-2 text-sm text-[#F8AFAF]">{error}</p> : null}
    </div>
  );
}
