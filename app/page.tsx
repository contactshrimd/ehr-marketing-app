import Link from "next/link";

const PILLARS = [
  {
    title: "Multi-tenant by construction",
    body: "Every tenant-scoped table is isolated by row-level security, not an application-layer filter that can be forgotten in one query. One platform, real tenant isolation.",
  },
  {
    title: "API and webhook-enabled",
    body: "Bring your own patient-facing portal and integrate against our request/webhook contract, or use our reference provider and admin apps directly. Your call.",
  },
  {
    title: "Async-first triage",
    body: "The default clinical workflow is asynchronous, store-and-forward consult — not a calendar with extra steps. Scheduling exists for the encounters that genuinely need it.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <section className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
          The clinical engine behind cash-pay telehealth practices.
        </h1>
        <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
          ShriMD is a multi-tenant EHR and clinical engine purpose-built for async-first,
          cash-pay care — intake, provider matching, e-prescribing, and provider network
          administration, exposed through a real API and webhooks or a ready-made
          provider and admin experience.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/get-started"
            className="rounded bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Get Started
          </Link>
          <Link
            href="/platform"
            className="rounded border border-zinc-300 px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
          >
            See the platform
          </Link>
        </div>
      </section>

      <section className="mt-20 grid gap-8 sm:grid-cols-3">
        {PILLARS.map((pillar) => (
          <div key={pillar.title} className="rounded border border-zinc-200 p-6 dark:border-zinc-800">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">{pillar.title}</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{pillar.body}</p>
          </div>
        ))}
      </section>

      <section className="mt-20 rounded border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Built for what cash-pay telehealth actually needs</h2>
        <p className="mt-3 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          No insurance billing, claims submission, or clearinghouse integration — this
          platform is cash-pay only, by design. See{" "}
          <Link href="/platform" className="font-medium text-zinc-900 underline dark:text-zinc-50">
            what&apos;s in scope, and what&apos;s deliberately deferred
          </Link>
          , before you evaluate further.
        </p>
      </section>
    </div>
  );
}
