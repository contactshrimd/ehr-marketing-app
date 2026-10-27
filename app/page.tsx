import Link from "next/link";
import { ContactBand } from "@/components/contact-band";
import { HOMEPAGE_FEATURES } from "@/lib/features";

const AUDIENCES = [
  {
    title: "DTC founders",
    body: "You have a brand and a vertical. You need intake, charting, prescribing, and routing — not another rented medical group wearing your logo.",
  },
  {
    title: "Clinic owners adding virtual care",
    body: "Keep the practice you already run. Add an async cash-pay channel without standing up a second EHR.",
  },
  {
    title: "Networks running more than one brand",
    body: "One engine, real tenant isolation. Provider networks can serve multiple brands under explicit agreements.",
  },
];

const OWN = [
  {
    title: "You own the brand",
    body: "Patients see your name. Public pages and the patient app are yours to theme — or you bring your own portal.",
  },
  {
    title: "You own or bring providers",
    body: "Credential your clinicians or contract a network. ShriMD does not rent you a 50-state medical group.",
  },
  {
    title: "You keep pharmacy choice",
    body: "Route across partners by condition and state. You are not locked to one fulfillment shop.",
  },
];

const STEPS = [
  { title: "Intake", body: "Structured answers land on the request." },
  { title: "Async queue", body: "Matched live on license, credential, and agreement." },
  { title: "Chart", body: "The provider works the note, not a re-keyed form." },
  { title: "E-prescribe", body: "Standard, non-controlled e-Rx via WENO." },
  { title: "Pharmacy routing", body: "Priority and fallback across your partners." },
  { title: "Patient updates", body: "Fulfillment timeline without inventing status." },
];

export default function Home() {
  return (
    <div>
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-12 sm:pt-24">
        <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">Multi-tenant telehealth infrastructure</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
          Launch your telehealth brand on a clinical engine you own.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          ShriMD is the cash-pay, async-first EHR for founders who want to build a
          practice — intake, queue, chart, e-prescribing, and pharmacy routing —
          without renting someone else&apos;s clinicians, protocols, and pharmacies.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/get-started"
            className="rounded bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Talk to the team
          </Link>
          <Link
            href="/platform"
            className="rounded border border-zinc-300 px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
          >
            See every feature
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Who it&apos;s for</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {AUDIENCES.map((item) => (
            <div key={item.title} className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Build vs rent</h2>
        <p className="mt-3 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          Operated white-labels rent you a medical group. Storefront kits rent you a
          checkout. ShriMD is the engine you keep when the costume changes.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {OWN.map((item) => (
            <div key={item.title} className="rounded-lg bg-zinc-50 p-6 dark:bg-zinc-950">
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Key features</h2>
          <Link href="/platform" className="text-sm font-medium text-zinc-900 underline dark:text-zinc-50">
            Full catalog
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {HOMEPAGE_FEATURES.map((feature) => (
            <Link
              key={feature.title}
              href="/platform"
              className="rounded-lg border border-zinc-200 p-5 hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
            >
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{feature.title}</h3>
              <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{feature.body}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">How it works</h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800">
              <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">{step.title}</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-8 dark:border-amber-900 dark:bg-amber-950/40">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Honest scope</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-700 dark:text-zinc-300">
            Cash-pay only. Async-first. Standard e-prescribing — no controlled substances.
            No lab integration yet. No insurance claims. We would rather you self-select
            out than sign up expecting a rented 50-state clinician network or a
            same-day storefront kit.{" "}
            <Link href="/platform" className="font-medium underline">
              See what is in and out
            </Link>
            .
          </p>
        </div>
      </section>

      <ContactBand />
    </div>
  );
}
