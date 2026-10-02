import Link from "next/link";

export default function EmptyCart() {
  return (
    <section className="rounded-3xl border border-stone-200 bg-white px-6 py-14 text-center shadow-sm sm:px-10 sm:py-16">
      <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-orange-50 text-3xl" aria-hidden="true">🛍️</span>
      <h2 className="mt-5 text-2xl font-extrabold text-stone-900">Your cart is empty</h2>
      <p className="mt-2 text-sm leading-6 text-stone-500">Looks like you haven&apos;t added anything yet.</p>
      <Link href="/menu" className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 sm:w-auto">Browse Menu</Link>
    </section>
  );
}
