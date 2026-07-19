import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-zinc-500 dark:text-zinc-400">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span>&copy; {new Date().getFullYear()} ShriMD. Multi-tenant EHR infrastructure.</span>
          <div className="flex gap-6">
            <Link href="/platform" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Platform
            </Link>
            <Link href="/docs" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Docs
            </Link>
            <Link href="/get-started" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
