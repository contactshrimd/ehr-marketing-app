import Link from "next/link";

const LINKS = [
  { href: "/platform", label: "Platform" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/get-started", label: "Get Started" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-zinc-500 dark:text-zinc-400">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span>&copy; {new Date().getFullYear()} ShriMD. The clinical engine you own.</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-zinc-900 dark:hover:text-zinc-100">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
