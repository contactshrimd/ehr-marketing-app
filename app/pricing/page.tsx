import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("/pricing");

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-center">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Pricing</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        We&apos;re working with a small number of provider networks right now, and pricing
        is scoped per deal — there&apos;s no self-serve rate card or calculator here yet.
      </p>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        Tell us about your practice and what you&apos;re evaluating, and we&apos;ll follow up
        with real numbers for your situation.
      </p>
      <Link
        href="/get-started"
        className="mt-8 inline-block rounded bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Contact us
      </Link>
    </div>
  );
}
