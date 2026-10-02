"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { restaurants } from "@/data/restaurants";
import { calculateCartTotals } from "@/lib/utils";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderPreview from "@/components/checkout/OrderPreview";

export default function CheckoutPageClient() {
  const { cartItems, hasHydrated } = useCart();

  if (!hasHydrated) {
    return (
      <main className="flex-1 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl animate-pulse rounded-3xl border border-stone-200 bg-white p-8 text-center text-sm font-medium text-stone-500">Loading your order…</div>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg rounded-3xl border border-stone-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
          <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-orange-50 text-3xl" aria-hidden="true">🛍️</span>
          <h1 className="mt-5 text-2xl font-extrabold text-stone-900">Your cart is empty</h1>
          <p className="mt-2 text-sm leading-6 text-stone-500">Add a few favourites to your cart, then come back to complete your order.</p>
          <Link href="/menu" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Browse Menu</Link>
        </div>
      </main>
    );
  }

  const totals = calculateCartTotals(cartItems, restaurants);

  return (
    <main className="flex-1 px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 max-w-3xl sm:mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-700">Almost there</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">Complete Your Order</h1>
          <p className="mt-3 text-base leading-7 text-stone-600">Enter your details and we&apos;ll deliver your food to your doorstep.</p>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <CheckoutForm totals={totals} />
          <OrderPreview cartItems={cartItems} totals={totals} />
        </div>
      </div>
    </main>
  );
}
