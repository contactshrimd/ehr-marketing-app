"use client";

import { useActionState } from "react";
import { submitLeadAction, leadFormInitialState } from "./actions";

// FR-004/User Story 2: on success, the confirmation states plainly that
// a human follows up — never implying instant account creation, matching
// this feature's own honesty requirement (spec.md Acceptance Scenario 4).
export function LeadForm() {
  const [state, formAction, isPending] = useActionState(submitLeadAction, leadFormInitialState);

  if (state.status === "success") {
    return (
      <div className="rounded border border-emerald-300 bg-emerald-50 p-6 text-sm text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
        Thanks — we&apos;ve got your details. A real person will follow up with you
        directly; this form doesn&apos;t create any account or platform access on its own.
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
        <label htmlFor="company_name" className="block text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Company / practice name *
        </label>
        <input
          id="company_name"
          name="company_name"
          required
          className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact_name" className="block text-sm font-medium text-zinc-900 dark:text-zinc-50">
            Your name *
          </label>
          <input
            id="contact_name"
            name="contact_name"
            required
            className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>
        <div>
          <label htmlFor="contact_email" className="block text-sm font-medium text-zinc-900 dark:text-zinc-50">
            Email *
          </label>
          <input
            id="contact_email"
            name="contact_email"
            type="email"
            required
            className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>
      </div>

      <div>
        <label htmlFor="expected_patient_volume" className="block text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Expected patient volume *
        </label>
        <input
          id="expected_patient_volume"
          name="expected_patient_volume"
          placeholder="e.g. 200-500 patients/month"
          required
          className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      <div>
        <label htmlFor="conditions_under_evaluation" className="block text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Conditions / verticals you&apos;re evaluating *
        </label>
        <input
          id="conditions_under_evaluation"
          name="conditions_under_evaluation"
          placeholder="e.g. GLP-1 weight management, HRT"
          required
          className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      <div>
        <label htmlFor="current_vendor" className="block text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Current EHR/vendor (if any)
        </label>
        <input
          id="current_vendor"
          name="current_vendor"
          className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {isPending ? "Submitting…" : "Submit"}
      </button>
    </form>
  );
}
