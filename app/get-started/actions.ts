"use server";

import { notifyLead, LeadValidationError, type LeadSubmission } from "@/lib/leads";

export interface LeadFormState {
  status: "idle" | "success" | "error";
  error?: string;
  fieldErrors?: string[];
}

const initialState: LeadFormState = { status: "idle" };
export { initialState as leadFormInitialState };

export async function submitLeadAction(_prevState: LeadFormState, formData: FormData): Promise<LeadFormState> {
  const submission: LeadSubmission = {
    companyName: String(formData.get("company_name") ?? ""),
    contactName: String(formData.get("contact_name") ?? ""),
    contactEmail: String(formData.get("contact_email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    expectedPatientVolume: String(formData.get("expected_patient_volume") ?? ""),
    conditionsUnderEvaluation: String(formData.get("conditions_under_evaluation") ?? ""),
    currentVendor: String(formData.get("current_vendor") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  try {
    await notifyLead(submission);
    return { status: "success" };
  } catch (err) {
    if (err instanceof LeadValidationError) {
      return {
        status: "error",
        error: "Please fill in all required fields.",
        fieldErrors: err.fields,
      };
    }
    return { status: "error", error: "Something went wrong submitting this — please try again." };
  }
}
