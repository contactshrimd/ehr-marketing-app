# Feature Specification: Vercel Deployment Infrastructure (Dev)

**Feature Branch**: `002-vercel-deployment-infrastructure-dev`
**Created**: 2026-07-19
**Status**: Draft
**Input**: User description: "Configure deployment environment and CI/CD to deploy ehr-marketing-app to Vercel per its own constitution (Next.js, deployed on Vercel — separate from the ehr-platform-{env} GCP project family). This feature covers dev/CI scaffolding and the initial deploy — stage/prod and the real shrimd.com domain are follow-ups."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A merge to main automatically deploys to Vercel (Priority: P1)

As an engineer, I need a merge to `main` to automatically build and
deploy the marketing site to Vercel, so the live site always reflects
the latest merged content.

**Independent Test**: Merge a PR to `main`; confirm the deploy workflow
runs and the live Vercel URL serves the new content.

**Acceptance Scenarios**:

1. **Given** a PR merges to `main`, **When** the deploy workflow runs, **Then** it builds and deploys to the linked Vercel project using a repo secret token — no credentials committed to the repo.
2. **Given** the deployed site, **When** any of the six top-level routes is requested, **Then** it responds correctly (matches `001-marketing-site-foundations`'s own live verification).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The Vercel project MUST be linked to this repo (org `ad-pilot-automation`, the same Vercel team already hosting the `healovi` sibling project).
- **FR-002**: A merge to `main` MUST trigger an automatic deploy via GitHub Actions using the Vercel CLI and a repo secret token.
- **FR-003**: Lead-capture environment variables (`RESEND_API_KEY`, `LEAD_NOTIFICATION_FROM`, `LEAD_NOTIFICATION_TO`) MUST be configured in Vercel's own environment variable store, not committed to the repo.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The site is live on a real Vercel URL and all six top-level routes return 200, verified live.

## Assumptions

- **No custom domain yet.** The site is live at its default `*.vercel.app` URL; mapping `www.shrimd.com`/`stage.shrimd.com`/`dev.shrimd.com` is a follow-up once DNS access is available (`shrimd.com` is registered at Porkbun but its nameservers point elsewhere — needs the domain owner's access, not something this feature can wire up).
- **GitHub auto-connect wasn't available.** Vercel's native GitHub App integration failed to connect during project creation (likely not installed on the `contactshrimd` org) — deploys are driven by a GitHub Actions workflow calling the Vercel CLI directly instead, which is functionally equivalent and doesn't depend on that integration.
- **`VERCEL_TOKEN` must be added as a repo secret manually.** The CLI session used to set up this project can't mint a new personal access token (`Cannot create tokens for this app (403)`) — this has to be created once via the Vercel dashboard (Account Settings → Tokens) by whoever owns the Vercel account, then added as a GitHub secret. `VERCEL_ORG_ID`/`VERCEL_PROJECT_ID` are already set as (non-secret) repo variables.
- **Dev/stage/prod environment split within Vercel is not yet decided.** A single Vercel project maps naturally to Vercel's own Production/Preview/Development environments (tied to `main`/PRs/local respectively), which doesn't map 1:1 onto this platform's dev/stage/prod GCP-style split. This feature ships one project representing "dev" for now; whether stage/prod become separate Vercel projects or Vercel's built-in environments within this same project is an open question for the stage/prod follow-up, not resolved here.
