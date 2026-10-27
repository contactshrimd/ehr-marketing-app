import type { Metadata } from "next";

// Plain TS content objects rather than an MDX pipeline — this feature
// ships the structural guardrail plus one real post to prove the path
// end to end (spec.md Assumptions); a full content-authoring pipeline
// is a reasonable future addition once there's a real backlog to manage,
// not built speculatively for a single-digit post count.
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // ISO date
  body: string[]; // paragraphs
}

const SITE_URL = "https://www.shrimd.com";

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "build-vs-rent-telehealth-stack",
    title: "Build vs Rent: What a Telehealth Founder Actually Needs to Own",
    description:
      "White-label medical groups rent you clinicians, protocols, and pharmacies. Software rails rent you a storefront. Here's the stack a founder should own if they want a durable cash-pay telehealth practice.",
    publishedAt: "2026-10-26",
    body: [
      "Most telehealth founders are sold one of two stories. The first is the operated white-label: someone else's clinicians, protocols, and pharmacy contracts, wearing your logo. The second is the storefront kit: a questionnaire builder and a checkout page, with clinical depth treated as an integration you will add later. Both can get a landing page live. Neither is the same as owning a clinical engine.",
      "If you rent the medical group, you launch faster — and you inherit their formulary, their visit model, their pharmacy lock-in, and their ability to change the economics under you. If you only buy commerce rails, you still have to invent intake-to-chart, queue matching, supervision, audit, and routing. The interesting work is not the homepage. It is everything that happens after a patient submits.",
      "What a founder should own is narrower and harder: tenant isolation that cannot be forgotten in one query; intake that becomes the chart; an async queue that matches license, credential, and network agreement at claim time; e-prescribing that is not a single hardcoded pharmacy; and an API so the brand site can change without forking the EHR. Providers can be yours or contracted. Pharmacies can be swapped. The record stays on your side of the contract.",
      "ShriMD is built for that ownership model. It is cash-pay and async-first on purpose. It does not supply a nationwide clinician network, insurance billing, labs, or controlled-substance prescribing. Those are honest non-goals. If you want to rent a turnkey medical group, that is a different category of vendor. If you want to build a practice you still recognize in three years, talk to us about the engine — not the costume.",
    ],
  },
  {
    slug: "why-async-first-not-a-calendar",
    title: "Why ShriMD Is Async-First, Not a Scheduling Calendar With Extra Steps",
    description:
      "Most telehealth platforms default to booking a video visit. ShriMD defaults to asynchronous, store-and-forward consult — scheduling is the exception, not the home screen. Here's why that ordering matters for cash-pay practices.",
    publishedAt: "2026-07-19",
    body: [
      "Every EHR vendor we compared ourselves against during evaluation — Canvas Medical, Healthie, Charm, Jane, Cerbo, Osmind — treats a scheduled, synchronous video visit as the default clinical encounter, with async messaging as a bolt-on convenience feature. We built ShriMD the other way around.",
      "For a cash-pay, condition-specific practice (weight management, hormone therapy, and similar recurring-care models), the overwhelming majority of encounters don't need two people staring at a camera at the same scheduled time. A provider reviewing a structured intake, a photo, and lab context can make a clinically sound decision asynchronously, in the time it actually takes — not the fifteen-minute slot a calendar forces on both sides.",
      "So in ShriMD's queue-and-claim model, a request lands in an async queue the moment it's submitted. Any credentialed, licensed provider on the network can claim it and act — no scheduling handshake required. Scheduling exists (booking, timezone handling), but it's a secondary surface for the specific subset of care that genuinely requires a live visit, not the platform's home screen.",
      "This ordering isn't a missing feature — it's a deliberate default, because most EHR-vendor evaluation documents assume synchronous care is the baseline and async is the exception. For the practices ShriMD is built for, it's the reverse.",
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function blogPostMetadata(post: BlogPost): Metadata {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: `${post.title} — ShriMD`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}
