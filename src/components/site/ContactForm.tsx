"use client";

import {
  ChangeEvent,
  type CSSProperties,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

type InquiryField =
  | "name"
  | "email"
  | "phone"
  | "business"
  | "website"
  | "service"
  | "budget"
  | "timeline"
  | "message";

type FieldErrors = Partial<Record<InquiryField, string>>;

const serviceOptions = [
  "Starter Site",
  "Growth Website",
  "Custom Platform / App",
  "Minor Refresh",
  "Major Redesign / Migration",
  "Ongoing Support",
  "Other",
];

const budgetOptions = [
  "$1,000 - $3,000",
  "$3,000 - $5,000",
  "$5,000 - $15,000",
  "$15,000+",
  "Not sure yet",
];

const timelineOptions = [
  "As soon as possible",
  "Within 1 month",
  "1 - 3 months",
  "Flexible",
];

const inputClassName =
  "interactive-field mt-2 h-12 w-full rounded-md border border-white/10 bg-[#0B0B0C] px-4 text-sm text-[#F5F5F2] outline-none placeholder:text-[#73737A]";

const websitePrefix = "https://";
const genericSubmitError =
  "The inquiry could not be sent. Please try again in a few minutes.";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [websiteValue, setWebsiteValue] = useState("");
  const [resetToken, setResetToken] = useState(0);

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

  function handleWebsiteChange(event: ChangeEvent<HTMLInputElement>) {
    setWebsiteValue(stripWebsiteProtocol(event.target.value));
    clearFieldError("website");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries()) as Record<
      InquiryField,
      string
    >;
    const nextFieldErrors = validateInquiryForm(payload);

    setSubmitError(null);
    setSubmitSuccess(null);
    setFieldErrors(nextFieldErrors);

    if (Object.keys(nextFieldErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setSubmitError(await getSafeSubmitError(response));
        return;
      }

      form.reset();
      setWebsiteValue("");
      setFieldErrors({});
      setResetToken((current) => current + 1);
      setSubmitSuccess(
        "Inquiry sent. I will review the details and follow up from the reply-to email you provided."
      );
    } catch {
      setSubmitError(genericSubmitError);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-lg border border-white/10 bg-[#101011] p-5 shadow-[var(--surface-shadow)] sm:p-7"
    >
      <div className="grid gap-6 md:grid-cols-2 md:gap-5">
        <Field
          label="Name"
          name="name"
          placeholder="Your Name"
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
          label="Phone"
          name="phone"
          placeholder="(555) 555-5555"
          type="tel"
          error={fieldErrors.phone}
          onValueChange={clearFieldError}
        />
        <Field
          label="Business Name"
          name="business"
          placeholder="Business Name"
          error={fieldErrors.business}
          onValueChange={clearFieldError}
        />
        <WebsiteField
          value={websiteValue}
          error={fieldErrors.website}
          onChange={handleWebsiteChange}
        />
        <CustomSelectField
          key={`service-${resetToken}`}
          label="Service Interested In"
          name="service"
          options={serviceOptions}
          required
          error={fieldErrors.service}
          onValueChange={clearFieldError}
        />
        <CustomSelectField
          key={`budget-${resetToken}`}
          label="Budget Range"
          name="budget"
          options={budgetOptions}
          required
          error={fieldErrors.budget}
          onValueChange={clearFieldError}
        />
        <CustomSelectField
          key={`timeline-${resetToken}`}
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
            minLength={20}
            placeholder="What needs to change, what is working now, and what would make the project successful?"
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? "message-error" : undefined}
            data-invalid={fieldErrors.message ? "true" : undefined}
            className={`interactive-field mt-2 w-full rounded-md border border-white/10 bg-[#0B0B0C] px-4 py-3 text-sm text-[#F5F5F2] outline-none placeholder:text-[#73737A] ${
              fieldErrors.message ? "border-[#F8AFAF]" : ""
            }`}
            onChange={() => clearFieldError("message")}
          />
          <FieldError id="message-error" message={fieldErrors.message} />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="interactive-button w-full rounded-full bg-[#E6B8A2] px-6 py-4 text-sm font-semibold text-[#0B0B0C] hover:bg-[#F1C8B8] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {isSubmitting ? "Sending..." : "Start a Project"}
        </button>
        <p
          aria-live="polite"
          className={`text-sm ${
            submitError ? "text-[#F8AFAF]" : "text-[#C9C9C3]"
          }`}
        >
          {submitError ||
            submitSuccess ||
            "Replies route through the email address you enter above."}
        </p>
      </div>
    </form>
  );
}

function stripWebsiteProtocol(value: string) {
  return value.replace(/^\s*https?:\/\//i, "").trimStart();
}

function getWebsiteSubmissionValue(value: string) {
  const trimmedValue = stripWebsiteProtocol(value).trim();
  return trimmedValue ? `${websitePrefix}${trimmedValue}` : "";
}

function validateInquiryForm(values: Record<InquiryField, string>) {
  const errors: FieldErrors = {};
  const trimmedWebsite = values.website.trim();

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (values.phone.trim() && !/^[0-9()+\-\s.]{7,}$/.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!values.service.trim()) {
    errors.service = "Select a service.";
  }

  if (!values.budget.trim()) {
    errors.budget = "Select a budget range.";
  }

  if (!values.timeline.trim()) {
    errors.timeline = "Select a timeline.";
  }

  if (!values.message.trim()) {
    errors.message = "Message is required.";
  } else if (values.message.trim().length < 20) {
    errors.message = "Add a little more detail.";
  }

  if (trimmedWebsite) {
    try {
      const url = new URL(getWebsiteSubmissionValue(trimmedWebsite));
      if (!url.hostname.includes(".")) {
        errors.website = "Enter a full website URL.";
      }
    } catch {
      errors.website = "Enter a valid website URL.";
    }
  }

  return errors;
}

async function getSafeSubmitError(response: Response) {
  try {
    const result = (await response.json()) as { error?: unknown };

    if (typeof result.error === "string") {
      if (result.error.toLowerCase().includes("missing required field")) {
        return "Please complete the required fields and try again.";
      }

      if (isSafeUserFacingError(result.error)) {
        return result.error;
      }
    }
  } catch {
    return genericSubmitError;
  }

  return genericSubmitError;
}

function isSafeUserFacingError(message: string) {
  return !/api|apikey|key|token|secret|resend|environment|contact_email|stack|trace/i.test(
    message
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required = false,
  error,
  onValueChange,
}: {
  label: string;
  name: InquiryField;
  placeholder: string;
  type?: string;
  required?: boolean;
  error?: string;
  onValueChange: (field: InquiryField) => void;
}) {
  const errorId = `${name}-error`;

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
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        data-invalid={error ? "true" : undefined}
        className={`${inputClassName} ${error ? "border-[#F8AFAF]" : ""}`}
        onChange={() => onValueChange(name)}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function WebsiteField({
  value,
  error,
  onChange,
}: {
  value: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label
        htmlFor="website-display"
        className="text-sm font-medium text-[#F5F5F2]"
      >
        Existing Website URL (If Applicable)
      </label>
      <div
        data-invalid={error ? "true" : undefined}
        className={`interactive-field mt-2 flex h-12 items-center rounded-md border bg-[#0B0B0C] px-3 ${
          error ? "border-[#F8AFAF]" : "border-white/10"
        }`}
      >
        <span className="mr-3 inline-flex h-8 shrink-0 items-center rounded-full border border-white/12 bg-[#232326] px-3 text-sm text-[#B8B8BE]">
          {websitePrefix}
        </span>
        <input
          id="website-display"
          type="text"
          inputMode="url"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          value={value}
          onChange={onChange}
          placeholder="yourbusiness.com"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "website-error" : undefined}
          className="h-full w-full bg-transparent text-sm text-[#F5F5F2] outline-none placeholder:text-[#73737A]"
        />
        <input
          type="hidden"
          name="website"
          value={getWebsiteSubmissionValue(value)}
        />
      </div>
      <FieldError id="website-error" message={error} />
    </div>
  );
}

function CustomSelectField({
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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [listboxStyle, setListboxStyle] = useState<CSSProperties>({});
  const errorId = `${name}-error`;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function updateListboxPosition() {
      const trigger = containerRef.current?.querySelector("button");
      const triggerRect = trigger?.getBoundingClientRect();

      if (!triggerRect) {
        return;
      }

      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const viewportOffsetTop = window.visualViewport?.offsetTop ?? 0;
      const gap = 8;
      const availableBelow = viewportHeight - triggerRect.bottom - gap;
      const availableAbove = triggerRect.top - viewportOffsetTop - gap;
      const openAbove = availableBelow < 220 && availableAbove > availableBelow;
      const availableSpace = Math.max(openAbove ? availableAbove : availableBelow, 168);
      const maxHeight = Math.min(256, availableSpace);

      setListboxStyle({
        left: triggerRect.left,
        width: triggerRect.width,
        maxHeight,
        top: openAbove ? undefined : triggerRect.bottom + gap,
        bottom: openAbove ? viewportHeight - triggerRect.top + gap : undefined,
      });

      window.requestAnimationFrame(() => {
        const listbox = listboxRef.current;
        setHasOverflow(Boolean(listbox && listbox.scrollHeight > listbox.clientHeight));
      });
    }

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleWindowBlur() {
      setIsOpen(false);
    }

    updateListboxPosition();
    window.addEventListener("resize", updateListboxPosition);
    window.visualViewport?.addEventListener("resize", updateListboxPosition);
    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("resize", updateListboxPosition);
      window.visualViewport?.removeEventListener("resize", updateListboxPosition);
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [isOpen]);

  function commitSelection(option: string) {
    setSelectedValue(option);
    setHighlightedIndex(options.indexOf(option));
    setIsOpen(false);
    onValueChange(name);
  }

  function handleButtonKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setIsOpen(true);
      setHighlightedIndex((current) => {
        if (selectedValue) {
          return options.indexOf(selectedValue);
        }
        return current;
      });
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen((current) => !current);
      return;
    }

    if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  function handleListboxKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    if (event.key === "Escape" || event.key === "Tab") {
      setIsOpen(false);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((current) => Math.min(current + 1, options.length - 1));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((current) => Math.max(current - 1, 0));
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      commitSelection(options[highlightedIndex]);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <label htmlFor={`${name}-trigger`} className="text-sm font-medium text-[#F5F5F2]">
        {label}
      </label>
      <input type="hidden" name={name} value={selectedValue} required={required} />
      <button
        id={`${name}-trigger`}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onClick={() => setIsOpen((current) => !current)}
        onKeyDown={handleButtonKeyDown}
        data-invalid={error ? "true" : undefined}
        className={`${inputClassName} relative flex items-center justify-between text-left ${
          error ? "border-[#F8AFAF]" : ""
        } ${selectedValue ? "text-[#F5F5F2]" : "text-[#73737A]"}`}
      >
        <span className="truncate pr-6">
          {selectedValue || "Select an option"}
        </span>
        <span
          aria-hidden="true"
          className={`absolute inset-y-0 right-4 flex items-center text-[#A1A1AA] transition ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="block"
          >
            <path
              d="M3 5.25L7 9.25L11 5.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      {isOpen ? (
        <ul
          id={listboxId}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={`${name}-trigger`}
          onKeyDown={handleListboxKeyDown}
          ref={listboxRef}
          style={listboxStyle}
          className={`custom-dropdown-scroll fixed z-[70] overflow-y-auto overscroll-contain rounded-md border border-white/10 bg-[#111113] p-1 shadow-[0_20px_52px_rgba(0,0,0,0.42),0_0_24px_rgba(230,184,162,0.07)] ${
            hasOverflow ? "pr-2" : ""
          }`}
        >
          {options.map((option, index) => {
            const isSelected = option === selectedValue;
            const isHighlighted = index === highlightedIndex;

            return (
              <li
                key={option}
                id={`${listboxId}-${index}`}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setHighlightedIndex(index)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => commitSelection(option)}
                className={`cursor-pointer rounded-md px-3 py-3 text-sm transition ${
                  isSelected
                    ? "bg-[#E6B8A2] text-[#0B0B0C]"
                    : isHighlighted
                      ? "bg-white/8 text-[#F5F5F2]"
                      : "text-[#D2D2CC]"
                }`}
              >
                {option}
              </li>
            );
          })}
        </ul>
      ) : null}
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} className="mt-2 text-sm font-medium text-[#F8AFAF]">
      {message}
    </p>
  );
}
