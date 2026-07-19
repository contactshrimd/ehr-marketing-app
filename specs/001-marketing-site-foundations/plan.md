# Implementation Plan: Marketing Site Foundations, Brand Identity, and Lead Capture

**Branch**: `001-marketing-site-foundations` | **Date**: 2026-07-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-marketing-site-foundations/spec.md`

## Summary

Build the platform's B2B marketing site (`ehr-marketing-app`) from
scratch: six static/content-driven routes under the ShriMD brand,
structured around real buyer-evaluation criteria, plus a qualified-lead
capture form that notifies Ops Admin without ever touching
`ehr-platform`'s Postgres. No API dependency on `ehr-platform` for
rendering — the only integration point is the lead-notification trigger.

## Technical Context

**Language/Version**: TypeScript, Next.js (App Router)
**Primary Dependencies**: Next.js, React, an email-sending library for the
lead notification (Resend — simplest send-only API, no queue/CRM
infrastructure needed for a low-volume qualified-lead form)
**Storage**: N/A — no database. The lead form has no persistence of its
own beyond the outbound notification; nothing is stored in this repo
or in `ehr-platform`.
**Testing**: Vitest (unit/guardrail tests), matching the toolchain already
used across this project's other repos
**Target Platform**: Vercel (per constitution Technical Constraints)
**Project Type**: Web application — single Next.js project, no separate
frontend/backend split (this repo has no backend of its own)
**Performance Goals**: Static-generation-first (SSG) for every content
page — no per-request rendering cost for pages with no dynamic data
**Constraints**: Zero PHI, zero dependency on `ehr-platform`'s API for
rendering (constitution Articles I, Technical Constraints)
**Scale/Scope**: 6 top-level routes + N blog posts; single lead-capture
form; SEO guardrail script

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Checked against this repo's own `.specify/memory/constitution.md`:

- **Article I (No PHI, Ever)**: PASS — no database, no patient data path
  exists anywhere in this feature's scope.
- **Article II (Brand Separation from HealOvi)**: PASS — new design
  tokens for ShriMD (spec.md Assumptions), zero shared components/copy
  with any HealOvi-branded surface.
- **Article III (SEO/AEO Structured Around Buyer Evaluation)**: PASS —
  `/platform`'s structure directly maps to `007` §3's vendor-evaluation
  framing (FR-002).
- **Article IV (Lead Capture ≠ Tenant Provisioning, NON-NEGOTIABLE)**:
  PASS — FR-004 explicitly requires zero writes to `ehr-platform`; the
  lead-capture service function has no `ehr-platform` API client at all,
  not just a policy not to call one.
- **Article V (Docs Link Out, Never Hand-Maintain)**: PASS — `/docs`
  ships an honest placeholder rather than hand-written API docs
  (spec.md Assumptions, since `ehr-platform` has no OpenAPI generation
  yet).
- **Article VI (Reuse Guardrail Patterns)**: PARTIAL — `healovi-app`'s
  actual `seo-guardrails.js` isn't available in this environment to copy
  from; this feature reimplements the same *checks* as a standalone
  script (spec.md Assumptions). Documented deviation, not a silent gap.

No violations requiring the Complexity Tracking table below.

## Project Structure

### Documentation (this feature)

```text
specs/001-marketing-site-foundations/
├── plan.md              # This file
├── spec.md
└── checklists/
    └── requirements.md
```

research.md/data-model.md/quickstart.md are omitted — there's no
database, no external API contract to design against (the only external
call is a one-shot email send), and no ambiguity left to research after
`007-marketing-site.md`'s existing detail. Matches this project's
established precedent of skipping those artifacts for features where
they'd add no real design value.

### Source Code (repository root)

```text
app/
├── page.tsx                    # / — homepage
├── platform/
│   └── page.tsx                # /platform — capability pages
├── pricing/
│   └── page.tsx                # /pricing — contact-us CTA
├── get-started/
│   ├── page.tsx                # /get-started — lead capture form
│   └── actions.ts               # Server Action: submit lead
├── docs/
│   └── page.tsx                # /docs — API docs pointer/placeholder
└── blog/
    ├── page.tsx                 # /blog — post index
    └── [slug]/
        └── page.tsx             # individual post

content/
└── blog/                        # blog post content (markdown/MDX)

lib/
├── leads.ts                      # lead notification (email send)
└── metadata.ts                   # per-page metadata helpers

scripts/
└── seo-guardrails.ts             # duplicate title/description/content check

tests/
└── unit/
    ├── leads.test.ts
    └── seo-guardrails.test.ts
```

**Structure Decision**: Standard Next.js App Router layout, one route
segment per top-level page from `007` §2. No `backend/`/`frontend/`
split — this is a single static site with one narrow server-side
integration point (`lib/leads.ts`), not a client/API pair. Mirrors
`ehr-admin-app`'s Next.js structure where applicable (Server Actions for
the one form that writes anywhere), but with no database/session layer
at all, since this repo has neither.

## Complexity Tracking

*No violations — table omitted.*
