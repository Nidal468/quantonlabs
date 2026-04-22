// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 1 Assessment — Section D: Delivery
// Source: ASSESSMENT STAGE 1 QUESTION BANK v1.1 Apr2026

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { RespondentRole, SectionD } from "@/lib/stage1";

// ============================================================
// ROLE OPTIONS
// ============================================================

const ROLE_OPTIONS: { value: RespondentRole; label: string }[] = [
  { value: "founder_owner", label: "Founder or Owner" },
  { value: "executive_leadership", label: "Executive Leadership (CEO, COO, CFO)" },
  { value: "senior_operator", label: "Senior Operator (VP, Director, Head of)" },
  { value: "other", label: "Other" },
];

// ============================================================
// COMPONENT
// ============================================================

interface SectionDProps {
  initialValue?: Partial<SectionD>;
  onComplete: (sectionD: SectionD) => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export default function SectionDComponent({
  initialValue,
  onComplete,
  onBack,
  isSubmitting,
}: SectionDProps) {
  const [firstName, setFirstName] = useState(initialValue?.first_name ?? "");
  const [lastName, setLastName] = useState(initialValue?.last_name ?? "");
  const [workEmail, setWorkEmail] = useState(initialValue?.work_email ?? "");
  const [phone, setPhone] = useState(initialValue?.phone ?? "");
  const [website, setWebsite] = useState(initialValue?.website ?? "");
  const [role, setRole] = useState<RespondentRole | null>(
    initialValue?.role ?? null
  );
  const [location, setLocation] = useState(initialValue?.location ?? "");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (!workEmail.trim()) {
      newErrors.workEmail = "Work email is required.";
    } else if (!isValidEmail(workEmail)) {
      newErrors.workEmail =
        "Please enter a valid email address, such as name@company.com.";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone is required.";
    } else if (!isValidPhone(phone)) {
      newErrors.phone =
        "Any standard format works, with or without country code, dashes, parentheses, or spaces.";
    }

    if (!website.trim()) {
      newErrors.website = "Company website is required.";
    } else if (!isValidUrl(website)) {
      newErrors.website =
        "Please enter a valid website, such as yourcompany.com.";
    }

    if (!role) {
      newErrors.role = "Please select the option that best describes your role.";
    }

    return newErrors;
  };

  const handleFieldBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const freshErrors = validate();
    setErrors(freshErrors);
  };

  const handleSubmit = () => {
    setTouched({
      firstName: true,
      lastName: true,
      workEmail: true,
      phone: true,
      website: true,
      role: true,
    });

    const freshErrors = validate();
    setErrors(freshErrors);

    if (Object.keys(freshErrors).length > 0) return;
    if (!role) return;

    onComplete({
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      work_email: workEmail.trim().toLowerCase(),
      phone: normalizePhone(phone),
      website: normalizeUrl(website),
      role,
      location: location.trim() || null,
    });
  };

  const showError = (field: string): string | null =>
    touched[field] && errors[field] ? errors[field] : null;

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-12"
      >
        <p className="text-sm font-semibold tracking-wide uppercase text-[#4655EB] mb-3">
          Section D, 4 of 4
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Your full Structural Pattern Report is ready.
        </h1>
        <p className="text-lg text-gray-600">
          Where should we send it?
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="First name"
            required
            value={firstName}
            onChange={setFirstName}
            onBlur={() => handleFieldBlur("firstName")}
            error={showError("firstName")}
            placeholder="Jane"
            autoComplete="given-name"
          />
          <Field
            label="Last name"
            required
            value={lastName}
            onChange={setLastName}
            onBlur={() => handleFieldBlur("lastName")}
            error={showError("lastName")}
            placeholder="Smith"
            autoComplete="family-name"
          />
        </div>

        <RoleField
          value={role}
          onChange={setRole}
          onBlur={() => handleFieldBlur("role")}
          error={showError("role")}
        />

        <Field
          label="Work email"
          required
          type="email"
          value={workEmail}
          onChange={setWorkEmail}
          onBlur={() => handleFieldBlur("workEmail")}
          error={showError("workEmail")}
          placeholder="jane@company.com"
          autoComplete="email"
        />

        <Field
          label="Phone"
          required
          type="tel"
          value={phone}
          onChange={setPhone}
          onBlur={() => handleFieldBlur("phone")}
          error={showError("phone")}
          placeholder="(555) 555-5555"
          autoComplete="tel"
        />

        <Field
          label="Company website"
          required
          value={website}
          onChange={setWebsite}
          onBlur={() => handleFieldBlur("website")}
          error={showError("website")}
          placeholder="yourcompany.com"
          autoComplete="url"
        />

        <Field
          label="Location"
          optional
          value={location}
          onChange={setLocation}
          onBlur={() => handleFieldBlur("location")}
          error={null}
          placeholder="City, State"
          autoComplete="address-level2"
        />

        <p className="text-sm text-gray-500 pt-2">
          We use this to tailor your report, send follow-up that is relevant to
          your business, and prepare properly if we speak. We do not share your
          information.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="flex justify-between items-center mt-12"
      >
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`px-8 py-4 rounded-lg font-semibold text-white transition-all min-w-[180px] ${
            isSubmitting
              ? "bg-gray-400 cursor-wait"
              : "bg-gradient-to-r from-[#2B60EB] via-[#584DEB] to-[#8B37EA] hover:shadow-lg hover:shadow-[#4655EB]/20 cursor-pointer"
          }`}
        >
          {isSubmitting ? "Preparing your report…" : "Send My Report"}
        </button>
      </motion.div>
    </div>
  );
}

// ============================================================
// FIELD COMPONENT
// ============================================================

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error: string | null;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
  type?: string;
  autoComplete?: string;
}

function Field({
  label,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  required,
  optional,
  type = "text",
  autoComplete,
}: FieldProps) {
  return (
    <div>
      <label className="block mb-2">
        <span className="text-sm font-semibold text-gray-800">{label}</span>
        {required && <span className="text-[#4655EB] ml-1">*</span>}
        {optional && (
          <span className="text-xs font-normal text-gray-400 ml-2">
            Optional
          </span>
        )}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full px-4 py-3 rounded-lg border-2 bg-white text-gray-800 placeholder-gray-400 focus:outline-none transition-all ${
          error
            ? "border-red-400 focus:border-red-500"
            : "border-gray-200 focus:border-[#4655EB]"
        }`}
      />
      {error && (
        <p className="text-xs text-red-600 mt-1.5">{error}</p>
      )}
    </div>
  );
}

// ============================================================
// ROLE FIELD
// ============================================================

interface RoleFieldProps {
  value: RespondentRole | null;
  onChange: (role: RespondentRole) => void;
  onBlur: () => void;
  error: string | null;
}

function RoleField({ value, onChange, onBlur, error }: RoleFieldProps) {
  return (
    <div>
      <label className="block mb-2">
        <span className="text-sm font-semibold text-gray-800">Your role</span>
        <span className="text-[#4655EB] ml-1">*</span>
      </label>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-2"
        onBlur={onBlur}
      >
        {ROLE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`text-left px-4 py-3 rounded-lg border-2 transition-all ${
              value === opt.value
                ? "border-[#4655EB] bg-[#4655EB]/5 text-gray-800"
                : error
                ? "border-red-300 bg-white text-gray-700 hover:border-gray-300"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  value === opt.value ? "border-[#4655EB]" : "border-gray-300"
                }`}
              >
                {value === opt.value && (
                  <span className="w-2 h-2 rounded-full bg-[#4655EB]" />
                )}
              </span>
              <span className="text-sm">{opt.label}</span>
            </div>
          </button>
        ))}
      </div>
      {error && (
        <p className="text-xs text-red-600 mt-1.5">{error}</p>
      )}
    </div>
  );
}

// ============================================================
// VALIDATION HELPERS
// ============================================================

function isValidEmail(email: string): boolean {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email.trim());
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }
  return `+${digits}`;
}

function isValidUrl(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed) return false;
  const domain = trimmed
    .replace(/^https?:\/\//i, "")
    .replace(/\/.*$/, "")
    .toLowerCase();
  const pattern = /^([a-z0-9]([a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/;
  return pattern.test(domain);
}

function normalizeUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed.toLowerCase();
  return `https://${trimmed.toLowerCase()}`;
}