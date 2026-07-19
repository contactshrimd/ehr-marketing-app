import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("/platform");

const CAPABILITIES = [
  {
    title: "Intake",
    body: "Structured intake payload per request, mapped directly into the clinical note a provider works from — no re-keying patient answers into a separate documentation step.",
  },
  {
    title: "Async triage & queue matching",
    body: "The default pathway: a request lands in a live-matched queue (state license × credentialed condition × tenant/network agreement, evaluated at claim time, never a stale precomputed list) and any eligible provider claims it. Renewals and follow-ups route directly back to the assigned provider, bypassing the queue.",
  },
  {
    title: "Scheduling",
    body: "For the subset of care that genuinely needs a live visit, booking with timezone handling is a secondary surface — not the platform's home screen.",
  },
  {
    title: "Clinical documentation",
    body: "Problem, medication, and allergy lists; condition-specific structured note templates; photo, document, and PDF attachments; provider text-expansion macros for high-volume charting.",
  },
  {
    title: "E-prescribing",
    body: "Standard, non-controlled e-prescribing via WENO. Routed to curated compounding and standard pharmacy partners by condition and state licensing, with fallback/priority logic — not a single hardcoded pharmacy.",
  },
  {
    title: "Compliance",
    body: "Row-level security enforces tenant isolation at the database layer, not just in application code. A full, append-only audit log covers every PHI access. A distinct, separately-audited break-glass path exists for genuine emergency access — never a normal workflow shortcut.",
  },
  {
    title: "Interoperability",
    body: "A documented REST/webhook contract for tenant integration: submit a request, receive lifecycle webhooks. Bring your own patient-facing portal against this contract, or use our reference provider and admin apps directly.",
  },
  {
    title: "Provider & pharmacy network administration",
    body: "Provider onboarding, state license and condition credential verification, and provider-network agreements per tenant — plus pharmacy partner onboarding and routing rules — all manageable without engineering involvement.",
  },
];

const NOT_YET = [
  {
    title: "Insurance billing",
    body: "No claims submission, ICD-10/CPT coding, or clearinghouse integration. This platform is cash-pay only, by design — not a gap we're racing to close.",
  },
  {
    title: "Controlled substances (EPCS)",
    body: "Standard, non-controlled e-prescribing only at this stage. Controlled-substance prescribing is a deliberate scope decision, not an oversight.",
  },
  {
    title: "Lab integration",
    body: "No lab ordering/results integration yet. Deferred, not silently ignored — revisit criteria are documented internally.",
  },
  {
    title: "Bidirectional FHIR API",
    body: "Our tenant integration contract is a custom REST/webhook API, not FHIR. Simpler to integrate against for the multi-tenant, cash-pay model this platform serves; a FHIR-shaped adapter is a scoped addition we'd build only if a real integration requires it.",
  },
];

function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: NOT_YET.map((item) => ({
      "@type": "Question",
      name: `Does ShriMD support ${item.title.toLowerCase()}?`,
      acceptedAnswer: { "@type": "Answer", text: item.body },
    })),
  };
}

export default function PlatformPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <script
        type="application/ld+json"
        // FR-005/User Story 3: FAQPage schema where genuinely appropriate
        // — the deferred-capability list is real, answerable Q&A, not
        // shoehorned marketing copy into a schema for SEO's sake.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Platform capabilities</h1>
      <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
        Structured the way you actually evaluate an EHR/clinical-platform vendor — not
        generic feature marketing.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {CAPABILITIES.map((c) => (
          <div key={c.title} className="rounded border border-zinc-200 p-6 dark:border-zinc-800">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">{c.title}</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{c.body}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        What this platform explicitly doesn&apos;t do yet
      </h2>
      <p className="mt-3 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
        A mismatched expectation discovered after you sign is worse than knowing the real
        scope up front. Every deferred capability below has a stated reason, not a silent
        gap.
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {NOT_YET.map((c) => (
          <div key={c.title} className="rounded border border-amber-300 bg-amber-50 p-6 dark:border-amber-900 dark:bg-amber-950/40">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">{c.title}</h3>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
