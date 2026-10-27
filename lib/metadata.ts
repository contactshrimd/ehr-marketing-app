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
    title: "ShriMD — Build a Telehealth Brand on a Clinical Engine You Own",
    description:
      "ShriMD is the multi-tenant EHR for founders building cash-pay telehealth: async intake and queue, your providers, your pharmacy routing, and a real API — not a rented medical group.",
  },
  {
    path: "/platform",
    title: "Platform Features — ShriMD Clinical Engine",
    description:
      "The ShriMD feature catalog: tenant isolation, patient journey, async clinical queue, charting, e-prescribing, pharmacy routing, provider apps, ops console, and APIs — plus what we deliberately do not ship yet.",
  },
  {
    path: "/pricing",
    title: "Pricing — Talk Through Your Telehealth Build",
    description:
      "ShriMD pricing is scoped to your volume, verticals, and who brings providers and pharmacies. No public rate card. A person on the ShriMD team follows up.",
  },
  {
    path: "/get-started",
    title: "Get Started — Talk to the ShriMD Team",
    description:
      "Tell the ShriMD team what you want to build. A person follows up. This form does not create an account or any platform access.",
  },
  {
    path: "/contact",
    title: "Contact the ShriMD Team",
    description:
      "Reach the ShriMD team about launching or migrating a cash-pay telehealth practice. Human follow-up only — no self-serve signup.",
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
