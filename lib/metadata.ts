import type { Metadata } from "next";

// FR-005: single source of truth for title/description/canonical per
// page — both each page's own `metadata` export and the SEO guardrail
// script read from this registry, so there's no drift between "what the
// guardrail checked" and "what actually renders."
export interface PageMeta {
  path: string;
  title: string;
  description: string;
}

const SITE_URL = "https://www.shrimd.com";
const SITE_NAME = "ShriMD";

export const PAGES: PageMeta[] = [
  {
    path: "/",
    title: "ShriMD — Multi-Tenant EHR & Telehealth Infrastructure",
    description:
      "A multi-tenant EHR and clinical engine for cash-pay telehealth practices — async-first triage, provider network management, and e-prescribing, exposed through a real API and webhooks, or a ready-made provider/admin experience.",
  },
  {
    path: "/platform",
    title: "Platform Capabilities — ShriMD",
    description:
      "How ShriMD handles intake, async triage, scheduling, clinical documentation, e-prescribing, compliance, interoperability, and provider/pharmacy network administration — structured the way you actually evaluate an EHR vendor.",
  },
  {
    path: "/pricing",
    title: "Pricing — ShriMD",
    description:
      "ShriMD pricing is scoped per deal at this stage. Tell us about your practice and we'll follow up with a real conversation, not a self-serve calculator.",
  },
  {
    path: "/get-started",
    title: "Get Started — ShriMD",
    description:
      "Tell us about your practice and what you're evaluating. A real person follows up — this form doesn't create any account or platform access on its own.",
  },
  {
    path: "/docs",
    title: "API Documentation — ShriMD",
    description:
      "ShriMD's API and webhook contract for tenant integrations — intake submission, request lifecycle, and delivery events.",
  },
  {
    path: "/blog",
    title: "Blog — ShriMD",
    description:
      "Notes on building multi-tenant clinical infrastructure: architecture decisions, compliance tradeoffs, and what we deliberately don't build yet.",
  },
];

export function pageMetadata(path: string): Metadata {
  const page = PAGES.find((p) => p.path === path);
  if (!page) {
    throw new Error(`No metadata registered in lib/metadata.ts for path "${path}"`);
  }
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `${SITE_URL}${path === "/" ? "" : path}` },
    openGraph: {
      title: page.title,
      description: page.description,
      siteName: SITE_NAME,
      url: `${SITE_URL}${path === "/" ? "" : path}`,
    },
  };
}
