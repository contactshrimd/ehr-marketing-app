import type { Metadata } from "next";
import { LeadForm } from "@/components/lead-form";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("/get-started");

export default function GetStartedPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">Get started</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Talk to the ShriMD team
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Tell us about the brand you want to build. This is not a self-serve signup
        — a person reviews every submission and follows up directly. Nothing here
        creates an account or platform access.
      </p>
      <div className="mt-8">
        <LeadForm />
      </div>
    </div>
  );
}
