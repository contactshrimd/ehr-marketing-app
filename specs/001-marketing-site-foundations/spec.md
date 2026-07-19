# Feature Specification: Marketing Site Foundations, Brand Identity, and Lead Capture

**Feature Branch**: `001-marketing-site-foundations`
**Created**: 2026-07-19
**Status**: Draft
**Input**: User description: "Build ehr-marketing-app per ehr-platform-spec's 007-marketing-site.md and 006-repos-and-build-plan.md §2.4 — the platform's B2B marketing/SEO/AEO site under the ShriMD brand, static/content-driven, with a qualified-lead-capture form. First feature in a brand-new repo: covers site structure, brand identity, and lead capture end to end."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A prospective tenant evaluates the platform (Priority: P1)

As a prospective tenant (a telehealth practice evaluating EHR/clinical
platform vendors), I need to find clear, accurate, citable information
about what this platform does and doesn't support, structured the way I
actually evaluate vendors, so I can self-select in or out without a
sales call.

**Independent Test**: Visit each top-level page (`/`, `/platform`,
`/pricing`, `/docs`, `/blog`, `/get-started`); confirm each renders
distinct, accurate content with unique metadata, and that scope claims
match `ehr-platform-spec`'s actual constitution (no overstated
capability).

**Acceptance Scenarios**:

1. **Given** the homepage, **When** a visitor loads it, **Then** they see the platform's value proposition (multi-tenant EHR/clinical engine, API/webhook-enabled) without any HealOvi branding or consumer-facing language.
2. **Given** `/platform`, **When** a visitor loads it, **Then** capability pages are organized around real buyer-evaluation criteria (intake, scheduling, virtual visit delivery, clinical documentation, e-prescribing, compliance, interoperability, provider/pharmacy network administration) — the same structure as the requirements-gathering vendor-evaluation document.
3. **Given** a capability the platform explicitly defers (labs, EPCS/controlled substances, FHIR), **When** it's mentioned anywhere on the site, **Then** it's stated as explicitly out of scope with the actual reason, never implied as supported.
4. **Given** `/pricing`, **When** a visitor loads it, **Then** they see a "contact us" call to action, not a self-serve rate card or pricing calculator.
5. **Given** `/docs`, **When** a visitor loads it, **Then** they're pointed to real, generated API documentation (or a clear "coming soon" state if `ehr-platform` doesn't yet generate one) — never hand-written docs content duplicating the API contract.

---

### User Story 2 - A prospective tenant submits a qualified lead (Priority: P1)

As a prospective tenant ready to talk, I need to submit my company and
evaluation details through a simple form, so Ops Admin can follow up —
without that submission creating any real platform access on its own.

**Independent Test**: Submit the `/get-started` form with valid data;
confirm a lead notification is triggered (email/Slack) and no row is
created in `ehr-platform`'s `tenants`, `tenant_provider_network_agreements`,
or any API-key table.

**Acceptance Scenarios**:

1. **Given** the `/get-started` form, **When** a visitor submits company name, contact info, expected patient volume, conditions/verticals under evaluation, and current EHR/vendor (if any), **Then** a lead notification is sent to Ops Admin.
2. **Given** a successful submission, **When** it completes, **Then** nothing is written to `ehr-platform`'s Postgres or any PHI-adjacent system — this form has zero integration with `ehr-platform`'s API beyond the notification trigger itself.
3. **Given** an incomplete submission (missing required fields), **When** the visitor submits, **Then** clear inline validation errors are shown, no partial lead is created.
4. **Given** a successful submission, **When** the visitor sees the confirmation, **Then** it sets expectations honestly (a human will follow up — this is not instant account creation).

---

### User Story 3 - The site is discoverable by search and AI answer engines (Priority: P2)

As the platform's marketing owner, I need the site's content to be
structured for both traditional SEO and AI answer engines (AEO), so
prospective tenants and AI-mediated research both surface accurate
information about the platform.

**Independent Test**: Run the SEO guardrail check across all pages;
confirm no duplicate/near-duplicate titles, descriptions, or content;
confirm structured data (FAQPage schema where applicable) validates.

**Acceptance Scenarios**:

1. **Given** any two pages on the site, **When** compared, **Then** they have unique title/description/canonical metadata (guardrail-enforced, not just convention).
2. **Given** a page with genuinely FAQ-shaped content, **When** rendered, **Then** it includes valid FAQPage structured data.
3. **Given** the blog section, **When** content is added, **Then** it passes the same content-similarity guardrail before publishing.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST implement the six top-level routes from `007-marketing-site.md` §2: `/`, `/platform`, `/pricing`, `/get-started`, `/docs`, `/blog`.
- **FR-002**: The site MUST present under the ShriMD brand identity only — zero HealOvi branding, messaging, or design-token reuse (constitution Article II).
- **FR-003**: The site MUST NOT depend on `ehr-platform`'s API for rendering any page — fully static/content-driven (constitution Technical Constraints; `007` §2).
- **FR-004**: `/get-started` MUST capture a qualified lead (company name, contact info, expected patient volume, conditions/verticals, current EHR/vendor) and trigger a notification to Ops Admin — and MUST NOT create any row in `ehr-platform` (constitution Article IV, NON-NEGOTIABLE).
- **FR-005**: Every page MUST carry unique title/description/canonical metadata, enforced by an automated guardrail check (constitution Article VI), not left to manual discipline.
- **FR-006**: `/docs` MUST link to real API documentation generated from `ehr-platform`'s own schema; if that doesn't exist yet, show an honest placeholder rather than hand-written docs content (constitution Article V).
- **FR-007**: No page MUST reference or imply support for a capability the platform spec explicitly defers (labs, EPCS/controlled substances at launch, FHIR) without stating the actual deferral reason (constitution Article III).
- **FR-008**: No form, page, or integration in this repo MUST ever collect, store, or transmit PHI or patient data (constitution Article I, NON-NEGOTIABLE).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A prospective tenant can navigate all six top-level routes and understand the platform's actual scope (including deferrals) without a sales call.
- **SC-002**: A `/get-started` submission reliably reaches Ops Admin as a notification, with zero writes to any PHI-adjacent system — verified by an automated test, not manual QA.
- **SC-003**: The SEO guardrail passes with zero duplicate metadata/content violations across all pages.

## Assumptions

- **Brand naming/trademark items are non-blocking**: `007` §1 flags domain-history and trademark-clearance checks as items to close out before treating "ShriMD" as fully final, but explicitly not blockers to starting spec/build work. This feature proceeds under the ShriMD identity now.
- **Stack**: Next.js on Vercel, per the constitution's Technical Constraints — same stack as the referenced `healovi-app` sibling project, no reason to diverge.
- **Lead notification channel**: email is the baseline (a Slack webhook is a reasonable low-effort addition, not required for this feature) — matches `006` §2.4's "simple notification... until lead volume justifies a real CRM," and avoids speculatively building a Slack integration before it's confirmed as wanted.
- **API docs**: `ehr-platform` does not currently generate a machine-readable API schema (confirmed by inspecting that repo — no OpenAPI generation exists). Per `007` §5, that's a prerequisite task in `ehr-platform` itself. This feature's `/docs` page ships an honest "API documentation is coming soon" placeholder rather than hand-written docs or a fake link, and the `ehr-platform` prerequisite is tracked as a separate follow-up, not built speculatively here.
- **SEO guardrail**: `007` §3 and the constitution both point at reusing `healovi-app`'s `seo-guardrails.js` pattern. That repo isn't available in this environment to copy from directly, so this feature reimplements the same *checks* (duplicate title/description/canonical detection, near-duplicate content detection) as a standalone script here, matching the described behavior rather than the literal file.
- **Blog**: ships with the structural guardrail and at least one real post (platform scope/positioning) to prove the pipeline end-to-end — a large content backlog is a content-strategy/ownership question outside this feature's scope, not an engineering one.
