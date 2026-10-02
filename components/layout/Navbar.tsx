"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const links = [
  { label: "Home", href: "/" },
  { label: "Restaurants", href: "/restaurants" },
  { label: "Menu", href: "/menu" },
];

function BrandMark() {
  return (
    <span className="flex size-10 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-sm shadow-orange-200" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" className="size-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14.5h16l-1.5 5h-13L4 14.5Z" />
        <path d="M6.5 11.5c1.2-2.2 3-3.3 5.5-3.3s4.3 1.1 5.5 3.3" />
        <path d="M8 5.5v1M12 4v1M16 5.5v1" />
      </svg>
    </span>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 4h2l2.2 10.1a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6" />
      <circle cx="10" cy="19" r="1" />
      <circle cx="18" cy="19" r="1" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItemCount } = useCart();

  const linkClass = (href: string) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${pathname === href ? "bg-orange-50 text-orange-700" : "text-stone-600 hover:bg-stone-100 hover:text-stone-950"}`;

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#fffdfa]/95 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group inline-flex items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500" aria-label="BiteRush home" onClick={() => setIsMenuOpen(false)}>
          <BrandMark />
          <span className="text-xl font-extrabold tracking-tight text-stone-900">Bite<span className="text-orange-600">Rush</span></span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)} aria-current={pathname === link.href ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/menu" className="inline-flex size-11 items-center justify-center rounded-full text-stone-600 transition-colors hover:bg-stone-100 hover:text-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500" aria-label="Search the menu">
            <SearchIcon />
          </Link>
          <Link href="/cart" className="relative inline-flex h-11 items-center gap-2 rounded-full px-3 text-stone-700 transition-colors hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500" aria-label={`Cart, ${cartItemCount} ${cartItemCount === 1 ? "item" : "items"}`}>
            <CartIcon />
            <span className="hidden text-sm font-semibold sm:inline">Cart</span>
            <span className="flex size-5 items-center justify-center rounded-full bg-orange-500 text-[11px] font-bold text-white" aria-hidden="true">{cartItemCount}</span>
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-stone-700 transition-colors hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 md:hidden"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" className="size-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" className="size-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            )}
          </button>
        </div>
      </div>

      <nav id="mobile-navigation" aria-label="Mobile navigation" className={`border-t border-stone-200 bg-[#fffdfa] px-4 py-3 shadow-lg shadow-stone-900/5 md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="mx-auto flex max-w-7xl flex-col gap-1 sm:px-2">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={`${linkClass(link.href)} rounded-xl py-3`} aria-current={pathname === link.href ? "page" : undefined} onClick={() => setIsMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/cart" className={`${linkClass("/cart")} rounded-xl py-3`} aria-current={pathname === "/cart" ? "page" : undefined} onClick={() => setIsMenuOpen(false)}>
            Cart <span className="ml-1 text-orange-700">({cartItemCount})</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
