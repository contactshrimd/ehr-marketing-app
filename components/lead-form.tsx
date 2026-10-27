"use client";

import { useActionState } from "react";
import { submitLeadAction, leadFormInitialState } from "@/app/get-started/actions";

const fieldClass =
  "mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900";
const labelClass = "block text-sm font-medium text-zinc-900 dark:text-zinc-50";

export function LeadForm() {
  const [state, formAction, isPending] = useActionState(submitLeadAction, leadFormInitialState);

  if (state.status === "success") {
    return (
      <div className="rounded border border-emerald-300 bg-emerald-50 p-6 text-sm text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
        Thanks — the ShriMD team has your note. A real person will follow up directly.
        This form does not create any account or platform access.
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {state.status === "error" && state.error && (
        <div className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200">
          {state.error}
        </div>
      )}

      <div>
        <label htmlFor="company_name" className={labelClass}>
          Company / practice name *
        </label>
        <input id="company_name" name="company_name" required className={fieldClass} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact_name" className={labelClass}>
            Your name *
          </label>
          <input id="contact_name" name="contact_name" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="contact_email" className={labelClass}>
            Email *
          </label>
          <input id="contact_email" name="contact_email" type="email" required className={fieldClass} />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone
        </label>
        <input id="phone" name="phone" type="tel" className={fieldClass} />
      </div>

      <div>
        <label htmlFor="expected_patient_volume" className={labelClass}>
          Expected patient volume *
        </label>
        <input
          id="expected_patient_volume"
          name="expected_patient_volume"
          placeholder="e.g. 200-500 patients/month"
          required
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="conditions_under_evaluation" className={labelClass}>
          Conditions / verticals you&apos;re evaluating *
        </label>
        <input
          id="conditions_under_evaluation"
          name="conditions_under_evaluation"
          placeholder="e.g. GLP-1 weight management, HRT"
          required
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="current_vendor" className={labelClass}>
          Current EHR / vendor (if any)
        </label>
        <input id="current_vendor" name="current_vendor" className={fieldClass} />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          What do you want to build? *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Brand, who brings providers and pharmacies, timeline — no patient information."
          className={fieldClass}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {isPending ? "Submitting…" : "Contact the ShriMD team"}
      </button>
    </form>
  );
}
