import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Restaurants", href: "/restaurants" },
  { label: "Menu", href: "/menu" },
  { label: "Cart", href: "/cart" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-8 lg:py-14">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 rounded-lg text-lg font-extrabold tracking-tight text-stone-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500" aria-label="BiteRush home">
            <span className="flex size-9 items-center justify-center rounded-xl bg-orange-500 text-sm font-black text-white" aria-hidden="true">B</span>
            Bite<span className="text-orange-600">Rush</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-stone-500">Good food, good mood. Find your next favourite meal and have it delivered fresh to your door.</p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-stone-900">Quick links</h2>
          <ul className="mt-4 space-y-3">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="rounded text-sm text-stone-500 transition-colors hover:text-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold text-stone-900">Get in touch</h2>
          <ul className="mt-4 space-y-3 text-sm text-stone-500">
            <li><a href="mailto:hello@biterush.in" className="rounded transition-colors hover:text-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500">hello@biterush.in</a></li>
            <li><a href="tel:+919876543210" className="rounded transition-colors hover:text-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500">+91 98765 43210</a></li>
            <li>Daily, 9:00 AM – 11:00 PM</li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold text-stone-900">Follow along</h2>
          <div className="mt-4 flex gap-3" aria-label="Social media links">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className="inline-flex size-10 items-center justify-center rounded-full border border-stone-200 text-stone-600 transition-colors hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500">
              <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></svg>
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" className="inline-flex size-10 items-center justify-center rounded-full border border-stone-200 text-stone-600 transition-colors hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500">
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true"><path d="M13.3 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.5 1.6-1.5h1.7V3.2c-.3 0-1.4-.2-2.6-.2-2.6 0-4.4 1.6-4.4 4.5v2.1H6.8v3.2h2.8V21h3.7Z" /></svg>
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube" className="inline-flex size-10 items-center justify-center rounded-full border border-stone-200 text-stone-600 transition-colors hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500">
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12c0 1.6.1 3.2.5 4.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-3.2.5-4.8s-.1-3.2-.5-4.8ZM9.8 15.5v-7l6 3.5-6 3.5Z" /></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-stone-100">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-stone-400 sm:px-6 lg:px-8">© {new Date().getFullYear()} BiteRush. All rights reserved.</p>
      </div>
    </footer>
  );
}
