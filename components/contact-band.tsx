import { LeadForm } from "@/components/lead-form";

export function ContactBand({
  title = "Talk to the ShriMD team",
  subtitle = "Tell us what you want to build. A person follows up. This is not a self-serve signup and it never creates platform access.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="border-t border-zinc-200 bg-zinc-950 px-6 py-16 text-zinc-50 dark:border-zinc-800">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-zinc-300">{subtitle}</p>
          <p className="mt-6 text-sm text-zinc-400">
            No patient information. No PHI. A human on the ShriMD team reads every note.
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
