import type { Metadata } from "next";
import { ContactBand } from "@/components/contact-band";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("/pricing");

const CONVERSATION = [
  {
    title: "Volume",
    body: "Expected visits per month, and whether you are launching or migrating an existing book.",
  },
  {
    title: "Verticals",
    body: "Which conditions you will offer first. That tells us which protocols and pharmacy routes matter.",
  },
  {
    title: "Who brings providers",
    body: "Your employed clinicians, a contracted network, or a mix. We do not sell a rented medical group.",
  },
  {
    title: "Who brings pharmacies",
    body: "Existing partner contracts versus starting from the routing rules we already operate.",
  },
];

export default function PricingPage() {
  return (
    <div>
      <div className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">Pricing</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          Scoped to how you actually launch
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
          There is no self-serve rate card. We are working with a small number of
          brands, and the number depends on volume, verticals, and who brings
          clinicians and pharmacies. A person on the ShriMD team will follow up
          with real figures for your situation.
        </p>

        <h2 className="mt-12 text-xl font-semibold text-zinc-900 dark:text-zinc-50">What a conversation covers</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {CONVERSATION.map((item) => (
            <div key={item.title} className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
      <ContactBand
        title="Get numbers for your build"
        subtitle="Share volume, verticals, and who brings providers and pharmacies. We will follow up with a scoped conversation — not a calculator."
      />
    </div>
  );
}
