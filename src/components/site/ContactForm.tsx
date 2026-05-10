"use client";

import { FormEvent, useState, useTransition } from "react";

type FormState = {
  error: string | null;
  success: string | null;
};

const serviceOptions = [
  "Website Refresh",
  "New Business Website",
  "Advanced Web Platform",
  "Logo and Brand Refresh",
  "SEO Setup",
  "Monthly Care Plan",
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
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setState(initialState);

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
      className="rounded-lg border border-white/10 bg-[#101011] p-5 shadow-2xl shadow-black/30 sm:p-7"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" name="name" placeholder="Your name" required />
        <Field
          label="Email"
          name="email"
          placeholder="you@business.com"
          type="email"
          required
        />
        <Field
          label="Business name"
          name="business"
          placeholder="Business name"
        />
        <Field
          label="Existing website URL"
          name="website"
          placeholder="https://"
          type="url"
        />
        <SelectField
          label="Service interested in"
          name="service"
          options={serviceOptions}
          required
        />
        <SelectField
          label="Budget range"
          name="budget"
          options={budgetOptions}
          required
        />
        <SelectField
          label="Timeline"
          name="timeline"
          options={timelineOptions}
          required
        />
        <div className="md:col-span-2">
          <label
            htmlFor="message"
            className="text-sm font-medium text-[#F5F5F2]"
          >
            Project goals / message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            placeholder="What needs to change, what is working now, and what would make the project successful?"
            className={inputClassName}
          />
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

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
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
        className={inputClassName}
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  required = false,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
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
        className={inputClassName}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
