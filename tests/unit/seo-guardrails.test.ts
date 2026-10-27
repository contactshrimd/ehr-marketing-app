import { describe, expect, it } from "vitest";
import { PAGES } from "@/lib/metadata";
import { BLOG_POSTS } from "@/lib/blog";
import { checkPageMetadata, checkBlogPosts, runGuardrails } from "@/scripts/seo-guardrails";

// SC-003: the SEO guardrail passes with zero violations across all pages
// — this is the automated check FR-005 requires, not manual discipline.
describe("SEO guardrails", () => {
  it("finds no violations across the real page registry", () => {
    expect(checkPageMetadata()).toEqual([]);
  });

  it("finds no violations across the real blog post registry", () => {
    expect(checkBlogPosts()).toEqual([]);
  });

  it("runGuardrails aggregates both checks", () => {
    expect(runGuardrails()).toEqual([]);
  });

  it("registers /contact with metadata distinct from /get-started", () => {
    const contact = PAGES.find((page) => page.path === "/contact");
    const getStarted = PAGES.find((page) => page.path === "/get-started");
    expect(contact).toBeDefined();
    expect(getStarted).toBeDefined();
    expect(contact!.title).not.toBe(getStarted!.title);
    expect(contact!.description).not.toBe(getStarted!.description);
    expect(BLOG_POSTS.some((post) => post.slug === "build-vs-rent-telehealth-stack")).toBe(true);
  });

  it("flags a duplicate title as a real violation (proves the guardrail actually detects problems)", async () => {
    const { PAGES } = await import("@/lib/metadata");
    const original = PAGES[1].title;
    PAGES[1].title = PAGES[0].title;
    try {
      const violations = checkPageMetadata();
      expect(violations.some((v) => v.kind === "duplicate_title")).toBe(true);
    } finally {
      PAGES[1].title = original;
    }
  });
});
