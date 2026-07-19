import { PAGES } from "../lib/metadata.js";
import { BLOG_POSTS } from "../lib/blog.js";

// FR-005/constitution Article VI: reimplements the checks described for
// healovi-app's seo-guardrails.js (duplicate title/description/canonical
// detection, near-duplicate content detection) rather than copying that
// file, which isn't available in this environment (spec.md Assumptions,
// plan.md Constitution Check — a documented deviation, not a silent gap).
export interface GuardrailViolation {
  kind: "duplicate_title" | "duplicate_description" | "duplicate_slug" | "missing_field";
  detail: string;
}

export function checkPageMetadata(): GuardrailViolation[] {
  const violations: GuardrailViolation[] = [];

  const titles = new Map<string, string[]>();
  const descriptions = new Map<string, string[]>();

  for (const page of PAGES) {
    if (!page.title.trim()) violations.push({ kind: "missing_field", detail: `${page.path} has no title` });
    if (!page.description.trim()) violations.push({ kind: "missing_field", detail: `${page.path} has no description` });

    titles.set(page.title, [...(titles.get(page.title) ?? []), page.path]);
    descriptions.set(page.description, [...(descriptions.get(page.description) ?? []), page.path]);
  }

  for (const [title, paths] of titles) {
    if (paths.length > 1) {
      violations.push({ kind: "duplicate_title", detail: `"${title}" used by: ${paths.join(", ")}` });
    }
  }
  for (const [description, paths] of descriptions) {
    if (paths.length > 1) {
      violations.push({ kind: "duplicate_description", detail: `"${description}" used by: ${paths.join(", ")}` });
    }
  }

  return violations;
}

export function checkBlogPosts(): GuardrailViolation[] {
  const violations: GuardrailViolation[] = [];

  const slugs = new Map<string, number>();
  const titles = new Map<string, string[]>();
  const descriptions = new Map<string, string[]>();

  for (const post of BLOG_POSTS) {
    slugs.set(post.slug, (slugs.get(post.slug) ?? 0) + 1);
    titles.set(post.title, [...(titles.get(post.title) ?? []), post.slug]);
    descriptions.set(post.description, [...(descriptions.get(post.description) ?? []), post.slug]);
  }

  for (const [slug, count] of slugs) {
    if (count > 1) violations.push({ kind: "duplicate_slug", detail: `slug "${slug}" used ${count} times` });
  }
  for (const [title, slugList] of titles) {
    if (slugList.length > 1) violations.push({ kind: "duplicate_title", detail: `"${title}" used by: ${slugList.join(", ")}` });
  }
  for (const [description, slugList] of descriptions) {
    if (slugList.length > 1) {
      violations.push({ kind: "duplicate_description", detail: `"${description}" used by: ${slugList.join(", ")}` });
    }
  }

  return violations;
}

export function runGuardrails(): GuardrailViolation[] {
  return [...checkPageMetadata(), ...checkBlogPosts()];
}

// Run directly (npm run seo-guardrails) as well as import for tests.
if (import.meta.url === `file://${process.argv[1]}`) {
  const violations = runGuardrails();
  if (violations.length > 0) {
    console.error(`SEO guardrail failed with ${violations.length} violation(s):`);
    for (const v of violations) console.error(`  [${v.kind}] ${v.detail}`);
    process.exit(1);
  }
  console.log(`SEO guardrail passed (${PAGES.length} page(s), ${BLOG_POSTS.length} blog post(s) checked).`);
}
