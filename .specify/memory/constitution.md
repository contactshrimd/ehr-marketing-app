# ehr-marketing-app Constitution

## Purpose
This repo implements the platform's own B2B marketing, SEO/AEO, and
tenant-onboarding lead-capture site — distinct from `healovi-app`, which
markets HealOvi (a consumer telehealth brand, one tenant of this
platform) to patients. This site markets the platform itself to
prospective future tenants.

This constitution governs *how* this repo is built. It does not repeat or
override `ehr-platform-spec` — that repo governs *what* gets built. If
this document and `ehr-platform-spec` conflict, `ehr-platform-spec` is
correct and this document must change.

Read, in order, before starting any work here: `ehr-platform-spec`'s
`constitution.md`, then `007-marketing-site.md`.

---

## Core Principles

### I. No PHI, Ever (NON-NEGOTIABLE)
This is a public, unauthenticated B2B marketing surface. No patient data,
no clinical content, no PHI of any kind — same rule as `healovi-app`'s own
constitution, applied here for the same reason. Tenant-onboarding lead
capture (`007` §4) is business-lead data (company name, contact info,
evaluation criteria) — never confuse this with tenant or patient data;
it never touches `ehr-platform`'s Postgres or any PHI-adjacent system.

### II. Brand Identity Is Separate From HealOvi (NON-NEGOTIABLE)
This site must never present as HealOvi, or blur the distinction between
"the platform vendor" and "a consumer telehealth brand that also happens
to run on this platform." A prospective tenant evaluating this platform
should have zero ambiguity about who they'd actually be signing an
agreement with. Working brand: **ShriMD** (`007` §1) — chosen precisely
because it shares no name overlap with HealOvi, satisfying this article
structurally, not just by discipline. Confirm the two open items in `007`
§1 (domain history, trademark clearance) before treating the brand as
fully final, but they don't block starting work under this identity.

### III. SEO/AEO Structured Around Real Buyer Evaluation Criteria
Content structure follows `007` §3 — organized the way a prospective
tenant actually evaluates EHR/clinical-platform vendors (intake,
scheduling, documentation, e-prescribing, compliance, interoperability,
network administration), not generic SaaS marketing copy. Accuracy matters
more than sales polish here: never overstate capability the platform
spec explicitly defers (labs, EPCS, FHIR — see `001` §5.1,
`005` §4, constitution Article IV) — a mismatched expectation discovered
after a tenant signs is a worse outcome than one who correctly
self-selects out during evaluation.

### IV. Lead Capture Is Not Tenant Provisioning (NON-NEGOTIABLE)
A `/get-started` form submission creates a lead notification only — it
must never automatically create a real `tenants` row, API credentials, or
any actual platform access in `ehr-platform`. Real tenant provisioning
happens manually in `ehr-admin-app` following an actual sales
conversation, with a human deciding, not a web form triggering it
directly (`007` §4). This is a real security boundary, not just a process
preference — an automated path from public form submission to platform
access is an attack surface this constitution explicitly closes.

### V. Docs Link Out, Never Hand-Maintain a Second Copy
API documentation is linked from here but generated from `ehr-platform`'s
own schema, not hand-written and maintained separately in this repo
(`007` §5). Hand-maintained docs drift from the real API contract; this
constitution treats that drift as an anticipated failure mode to design
around, not an acceptable maintenance cost.

### VI. Reuse Existing Guardrail Patterns, Don't Reinvent Them
Content-similarity and metadata-uniqueness checks (duplicate titles/
descriptions, near-duplicate page content) should reuse the pattern
already built and proven for `healovi-app`'s `seo-guardrails.js`, adapted
to this repo's content — not rebuilt from scratch.

---

## Technical Constraints
- Next.js, deployed on Vercel — same stack as `healovi-app`, no reason to
  diverge
- No dependency on `ehr-platform`'s API for rendering (§2 of `007` — fully
  static/content-driven); the only integration point is the lead-capture
  form's notification trigger (Article IV)
- Design tokens: separate from HealOvi's (Article II) — a new token set
  for the ShriMD brand identity (`007` §1), not a reuse of HealOvi's
  green palette

---

## Development Workflow

### New page or content piece
1. Confirm placement against `007`'s site structure (§2) and content
   strategy (§3) — don't add pages ad hoc outside that structure
2. Unique metadata (title, description, canonical) per page
3. Run the SEO guardrail (Article VI) locally before PR
4. For any capability claim: verify it against `ehr-platform-spec`'s
   actual specs (`001`-`006`) before publishing — Article III's accuracy
   requirement applies to every sentence claiming what the platform does

---

## Governance
This constitution overrides implementation decisions in this repo only.
`ehr-platform-spec` overrides this constitution wherever they conflict.
