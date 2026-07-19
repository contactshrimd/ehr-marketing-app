import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LeadForm } from "./lead-form";

export const metadata: Metadata = pageMetadata("/get-started");

export default function GetStartedPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Get started</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Tell us about your practice and what you&apos;re evaluating. This isn&apos;t a
        self-serve signup — a real person reviews every submission and follows up
        directly.
      </p>
      <div className="mt-8">
        <LeadForm />
      </div>
    </div>
  );
}
