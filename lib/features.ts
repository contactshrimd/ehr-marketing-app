export interface FeatureItem {
  title: string;
  body: string;
}

export interface FeatureGroup {
  title: string;
  items: FeatureItem[];
}

/** One-line homepage grid. Each title matches a /platform catalog item. */
export const HOMEPAGE_FEATURES: FeatureItem[] = [
  { title: "Multi-tenant isolation", body: "Every tenant is isolated at the database with row-level security, not an app-layer filter." },
  { title: "Your brand, your portal", body: "CMS-driven public pages and a white-label patient app — or bring your own front end." },
  { title: "Structured intake", body: "Condition-specific intake maps straight into the chart. Providers do not re-key answers." },
  { title: "Async clinical queue", body: "Requests match live on license, credential, and network agreement. Scheduling is the exception." },
  { title: "Clinical chart", body: "Notes, problems, meds, allergies, attachments, and macros in one provider workspace." },
  { title: "MD-governed protocols", body: "Versioned clinical content with medical-director review — not a spreadsheet of rules." },
  { title: "NP/PA supervision", body: "Supervision and scope enforced in the workflow, not left as a policy memo." },
  { title: "Non-controlled e-prescribing", body: "Standard e-Rx via WENO. Controlled substances are out of scope on purpose." },
  { title: "Multi-pharmacy routing", body: "Route by partner, condition, and state. You are not locked to one pharmacy." },
  { title: "Cash-pay checkout", body: "Patient payments and fulfillment timeline without insurance claims or clearinghouses." },
  { title: "Provider app", body: "Web and mobile for the clinicians who actually run the queue." },
  { title: "Ops + tenant admin", body: "One console for platform ops and tenant administration, with an append-only audit log." },
  { title: "Credentialing & networks", body: "Onboard providers, verify licenses, and attach network agreements without an engineering ticket." },
  { title: "API and webhooks", body: "Submit requests and receive lifecycle events. Integrate your own portal if you want." },
];

export const PLATFORM_GROUPS: FeatureGroup[] = [
  {
    title: "Tenant and brand",
    items: [
      {
        title: "Multi-tenant isolation",
        body: "Every tenant-scoped table carries a tenant id and is isolated by Postgres row-level security. Isolation is structural, not a convention that one missed query can break.",
      },
      {
        title: "Tenant administration",
        body: "Tenant admins configure their own practice — offerings, staff, and operations — without seeing another tenant. Platform ops stay on a separate role axis.",
      },
      {
        title: "CMS-driven public pages",
        body: "Site chrome, marketing pages, and disclosures are governed content, not a one-off theme fork per brand.",
      },
      {
        title: "White-label patient app",
        body: "Use the reference patient experience under your brand, or bring your own portal against the same API and webhook contract.",
      },
    ],
  },
  {
    title: "Patient journey",
    items: [
      {
        title: "OTP login",
        body: "Patients authenticate with a one-time code. No password reset theatre and no third-party identity product in the critical path.",
      },
      {
        title: "Structured intake",
        body: "Condition-specific questionnaires land as a structured payload on the request the provider works from. Answers are not re-typed into a note.",
      },
      {
        title: "Offerings and pricing",
        body: "Tenants publish the products and cash-pay prices they actually sell. No insurance fee schedule lives here.",
      },
      {
        title: "Cash-pay checkout",
        body: "Patients pay the practice, not a payer. There is no claims submission, ICD-10/CPT coding, or clearinghouse integration.",
      },
      {
        title: "Fulfillment timeline",
        body: "Patients and staff see where an order stands after it leaves the chart — without inventing status from a pharmacy inbox.",
      },
    ],
  },
  {
    title: "Clinical engine",
    items: [
      {
        title: "Async queue matching",
        body: "A request lands in a live-matched queue: state license × credentialed condition × tenant/network agreement, evaluated at claim time. Renewals route back to the assigned provider.",
      },
      {
        title: "Clinical chart",
        body: "Problem, medication, and allergy lists; condition-specific notes; photo, document, and PDF attachments.",
      },
      {
        title: "Provider macros",
        body: "Text-expansion macros for high-volume charting so the note stays structured without slowing the clinician down.",
      },
      {
        title: "NP/PA supervision",
        body: "Nurse practitioner and physician-assistant supervision is enforced in the product, matching how the practice is actually licensed to operate.",
      },
      {
        title: "MD-governed protocols",
        body: "Clinical content is versioned and reviewed. What a provider can offer is the protocol a medical director approved, not a silent local edit.",
      },
    ],
  },
  {
    title: "Prescribing and pharmacy",
    items: [
      {
        title: "Non-controlled e-prescribing",
        body: "Standard e-prescribing via WENO. Controlled-substance prescribing (EPCS) is a deliberate non-goal at this stage, not an oversight.",
      },
      {
        title: "Multi-pharmacy routing",
        body: "Route to compounding and standard pharmacy partners by condition and state licensing, with fallback and priority rules — not a single hardcoded pharmacy.",
      },
    ],
  },
  {
    title: "Workforce",
    items: [
      {
        title: "Provider app",
        body: "The clinicians who run the queue get a dedicated web and mobile app — registration, queue, chart, and messaging — not a resized admin console.",
      },
      {
        title: "Credentialing",
        body: "Provider onboarding with state license and condition-credential verification before a request can be claimed.",
      },
      {
        title: "Network agreements",
        body: "A provider network can serve more than one tenant under explicit agreements. Cross-network visibility is never implied by role name alone.",
      },
    ],
  },
  {
    title: "Operations",
    items: [
      {
        title: "Shared admin console",
        body: "Platform ops and tenant admin share one codebase, split by role and organization scope.",
      },
      {
        title: "Append-only audit log",
        body: "Every PHI access is recorded. The audit trail is not a best-effort application log you hope someone grepped.",
      },
      {
        title: "Break-glass",
        body: "Emergency cross-scope access is a distinct, separately audited path — never a hidden admin toggle in the normal workflow.",
      },
      {
        title: "Lead inbox",
        body: "Visitor interest on a tenant site can land in an ops inbox. That is lead capture, not automatic tenant or patient provisioning.",
      },
    ],
  },
  {
    title: "Integration",
    items: [
      {
        title: "REST and webhooks",
        body: "A documented request/webhook contract: submit a case, receive lifecycle events. Authentication is server-side. Tenant identity is never taken from a client-supplied id.",
      },
      {
        title: "Bring your own portal",
        body: "If you already have a patient-facing brand site, integrate against the contract. If you don't, use the reference provider, admin, and patient apps.",
      },
    ],
  },
];

export const NOT_YET: FeatureItem[] = [
  {
    title: "Insurance billing",
    body: "No claims submission, ICD-10/CPT coding, or clearinghouse integration. ShriMD is cash-pay only, by design — not a gap we are racing to close.",
  },
  {
    title: "Controlled substances (EPCS)",
    body: "Standard, non-controlled e-prescribing only. Schedule II–V prescribing is a deliberate scope decision. Do not evaluate ShriMD for TRT or other controlled-substance programs.",
  },
  {
    title: "Lab integration",
    body: "No lab ordering or results integration yet. Deferred and documented, not silently ignored.",
  },
  {
    title: "FHIR-native EHR",
    body: "The tenant contract is REST and webhooks. A FHIR-shaped adapter is a scoped addition if a real integration requires it — not a claim that ShriMD is a FHIR-native EHR.",
  },
];
