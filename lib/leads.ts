import { Resend } from "resend";

export interface LeadSubmission {
  companyName: string;
  contactName: string;
  contactEmail: string;
  expectedPatientVolume: string;
  conditionsUnderEvaluation: string;
  currentVendor: string; // "" is valid — optional per spec
}

const REQUIRED_FIELDS: (keyof LeadSubmission)[] = [
  "companyName",
  "contactName",
  "contactEmail",
  "expectedPatientVolume",
  "conditionsUnderEvaluation",
];

export class LeadValidationError extends Error {
  constructor(public fields: (keyof LeadSubmission)[]) {
    super(`Missing required lead fields: ${fields.join(", ")}`);
    this.name = "LeadValidationError";
  }
}

export function validateLead(submission: LeadSubmission): void {
  const missing = REQUIRED_FIELDS.filter((field) => !submission[field]?.trim());
  if (missing.length > 0) {
    throw new LeadValidationError(missing);
  }
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set`);
  }
  return value;
}

function formatLeadEmail(submission: LeadSubmission): string {
  return [
    `New qualified lead from shrimd.com/get-started`,
    ``,
    `Company: ${submission.companyName}`,
    `Contact: ${submission.contactName} <${submission.contactEmail}>`,
    `Expected patient volume: ${submission.expectedPatientVolume}`,
    `Conditions/verticals under evaluation: ${submission.conditionsUnderEvaluation}`,
    `Current EHR/vendor: ${submission.currentVendor || "(none given)"}`,
  ].join("\n");
}

// constitution Article IV (NON-NEGOTIABLE) / FR-004: this function has no
// ehr-platform API client at all — not just a policy against calling
// one. The only external call is a one-shot transactional email; nothing
// here writes to any database, this repo's own or ehr-platform's. Real
// tenant provisioning only ever happens manually in ehr-admin-app,
// following an actual sales conversation.
export async function notifyLead(submission: LeadSubmission): Promise<void> {
  validateLead(submission);

  const resend = new Resend(requireEnv("RESEND_API_KEY"));
  const { error } = await resend.emails.send({
    from: requireEnv("LEAD_NOTIFICATION_FROM"),
    to: requireEnv("LEAD_NOTIFICATION_TO"),
    subject: `New ShriMD lead: ${submission.companyName}`,
    text: formatLeadEmail(submission),
  });
  if (error) {
    throw new Error(`Lead notification failed to send: ${error.message}`);
  }
}
