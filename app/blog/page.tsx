import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { BLOG_POSTS } from "@/lib/blog";

export const metadata: Metadata = pageMetadata("/blog");

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Blog</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Notes on building multi-tenant clinical infrastructure — architecture decisions,
        compliance tradeoffs, and what we deliberately don&apos;t build yet.
      </p>

      <div className="mt-10 space-y-8">
        {BLOG_POSTS.map((post) => (
          <article key={post.slug} className="border-b border-zinc-200 pb-8 dark:border-zinc-800">
            <Link href={`/blog/${post.slug}`} className="text-xl font-semibold text-zinc-900 hover:underline dark:text-zinc-50">
              {post.title}
            </Link>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{post.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
