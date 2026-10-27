import type { Metadata } from "next";
import { LeadForm } from "@/components/lead-form";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("/contact");

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">Contact</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Reach the ShriMD team
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Questions about launching or migrating a cash-pay telehealth practice go
        here. A human follows up. Do not send patient information — this form is
        for founders and operators only.
      </p>
      <div className="mt-8">
        <LeadForm />
      </div>
    </div>
  );
}
