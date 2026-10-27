import type { Metadata } from "next";
import Link from "next/link";
import { ContactBand } from "@/components/contact-band";
import { NOT_YET, PLATFORM_GROUPS } from "@/lib/features";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("/platform");

function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: NOT_YET.map((item) => ({
      "@type": "Question",
      name: `Does ShriMD support ${item.title.toLowerCase()}?`,
      acceptedAnswer: { "@type": "Answer", text: item.body },
    })),
  };
}

export default function PlatformPage() {
  return (
    <div>
      <div className="mx-auto max-w-5xl px-6 py-16">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }} />
        <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">Feature catalog</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          Everything in the clinical engine
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Structured the way a founder evaluates vendors — tenant, patient journey,
          clinical work, pharmacy, workforce, ops, and integration. Plus the
          capabilities we will not pretend to ship.
        </p>

        {PLATFORM_GROUPS.map((group) => (
          <section key={group.title} className="mt-14">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">{group.title}</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {group.items.map((item) => (
                <div key={item.title} className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{item.body}</p>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            What this platform explicitly doesn&apos;t do yet
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            A mismatched expectation after you sign is worse than knowing the real
            scope up front. Every deferred capability has a reason.
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {NOT_YET.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-amber-300 bg-amber-50 p-6 dark:border-amber-900 dark:bg-amber-950/40"
              >
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-12 text-sm text-zinc-600 dark:text-zinc-400">
          Ready to map this against your brand?{" "}
          <Link href="/contact" className="font-medium text-zinc-900 underline dark:text-zinc-50">
            Contact the ShriMD team
          </Link>
          .
        </p>
      </div>
      <ContactBand />
    </div>
  );
}
