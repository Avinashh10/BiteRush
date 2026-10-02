import Image from "next/image";
import type { CartTotals } from "@/lib/utils";
import type { CartItem } from "@/types";

interface OrderPreviewProps {
  cartItems: CartItem[];
  totals: CartTotals;
}

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export default function OrderPreview({ cartItems, totals }: OrderPreviewProps) {
  return (
    <aside className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm lg:sticky lg:top-24 sm:p-7" aria-labelledby="order-preview-heading">
      <div className="flex items-center justify-between gap-4">
        <h2 id="order-preview-heading" className="text-xl font-extrabold text-stone-900">Your order</h2>
        <span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-800">{cartItems.reduce((count, item) => count + item.quantity, 0)} items</span>
      </div>

      <ul className="mt-5 divide-y divide-stone-100">
        {cartItems.map((item) => (
          <li key={item.foodItem.id} className="flex gap-3 py-4 first:pt-0 last:pb-0">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-orange-50">
              <Image src={item.foodItem.image} alt="" fill sizes="64px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-stone-900">{item.foodItem.name}</p>
              <p className="mt-1 text-xs text-stone-500">Qty {item.quantity} × {inr.format(item.foodItem.price)}</p>
            </div>
            <p className="shrink-0 pt-0.5 text-sm font-bold text-stone-800">{inr.format(item.foodItem.price * item.quantity)}</p>
          </li>
        ))}
      </ul>

      <dl className="mt-5 space-y-3 border-t border-stone-200 pt-5 text-sm">
        <div className="flex justify-between gap-4 text-stone-600"><dt>Subtotal</dt><dd className="font-semibold text-stone-800">{inr.format(totals.subtotal)}</dd></div>
        <div className="flex justify-between gap-4 text-stone-600"><dt>Delivery Fee</dt><dd className="font-semibold text-stone-800">{totals.deliveryFee === 0 ? "Free" : inr.format(totals.deliveryFee)}</dd></div>
        <div className="flex justify-between gap-4 text-stone-600"><dt>Taxes</dt><dd className="font-semibold text-stone-800">{inr.format(totals.taxes)}</dd></div>
        <div className="flex justify-between gap-4 border-t border-stone-100 pt-4 text-base font-extrabold text-stone-900"><dt>Total</dt><dd>{inr.format(totals.total)}</dd></div>
      </dl>
      <p className="mt-4 rounded-xl bg-stone-50 px-3 py-2.5 text-xs leading-5 text-stone-500">Delivery fees are based on each restaurant in your order. Taxes are calculated at 5% of the food subtotal.</p>
    </aside>
  );
}
