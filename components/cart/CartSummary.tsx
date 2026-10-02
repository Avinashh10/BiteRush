import Link from "next/link";
import type { CartTotals } from "@/lib/utils";

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

interface CartSummaryProps {
  totals: CartTotals;
  canCheckout: boolean;
  onClear: () => void;
}

export default function CartSummary({ totals, canCheckout, onClear }: CartSummaryProps) {
  return (
    <aside className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7 lg:sticky lg:top-24" aria-labelledby="cart-summary-heading">
      <h2 id="cart-summary-heading" className="text-xl font-extrabold text-stone-900">Cart summary</h2>
      <dl className="mt-5 space-y-4 text-sm">
        <div className="flex justify-between gap-4 text-stone-600"><dt>Subtotal</dt><dd className="font-semibold text-stone-800">{inr.format(totals.subtotal)}</dd></div>
        <div className="flex justify-between gap-4 text-stone-600"><dt>Delivery Fee</dt><dd className="font-semibold text-stone-800">{totals.deliveryFee === 0 ? "Free" : inr.format(totals.deliveryFee)}</dd></div>
        <div className="flex justify-between gap-4 text-stone-600"><dt>Taxes</dt><dd className="font-semibold text-stone-800">{inr.format(totals.taxes)}</dd></div>
        <div className="flex justify-between gap-4 border-t border-stone-200 pt-4 text-base font-extrabold text-stone-900"><dt>Total</dt><dd>{inr.format(totals.total)}</dd></div>
      </dl>
      {canCheckout ? (
        <Link href="/checkout" className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Proceed to Checkout</Link>
      ) : (
        <span aria-disabled="true" className="mt-6 inline-flex min-h-12 w-full cursor-not-allowed items-center justify-center rounded-full bg-stone-200 px-5 py-3 text-sm font-bold text-stone-500">Proceed to Checkout</span>
      )}
      <button type="button" onClick={onClear} disabled={!canCheckout} className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-bold text-stone-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 disabled:cursor-not-allowed disabled:opacity-50">Clear Cart</button>
      <p className="mt-4 text-center text-xs leading-5 text-stone-500">Taxes are calculated at 5% of your food subtotal.</p>
    </aside>
  );
}
