import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("/docs");

// FR-006/constitution Article V: no hand-written docs content duplicating
// the real API contract. ehr-platform doesn't yet generate a
// machine-readable schema (spec.md Assumptions) — an honest placeholder,
// not a fake or stale-risking docs page, until that exists.
export default function DocsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">API documentation</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Generated, auto-published API documentation for ShriMD&apos;s tenant integration
        contract is coming soon. We&apos;d rather point you here honestly than maintain a
        second, hand-written copy that can drift from the real API.
      </p>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        In the meantime, the shape of the integration — request submission, lifecycle
        webhooks, and authentication — is described on the{" "}
        <Link href="/platform" className="font-medium text-zinc-900 underline dark:text-zinc-50">
          platform capabilities
        </Link>{" "}
        page under Interoperability. For a specific integration question,{" "}
        <Link href="/contact" className="font-medium text-zinc-900 underline dark:text-zinc-50">
          contact the ShriMD team
        </Link>
        .
      </p>
    </div>
  );
}
