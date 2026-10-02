import type { OrderRecord } from "@/types";

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export default function OrderSummary({ order }: { order: OrderRecord }) {
  return (
    <dl className="mt-5 space-y-3 border-t border-stone-200 pt-5 text-sm">
      <div className="flex justify-between gap-4 text-stone-600"><dt>Subtotal</dt><dd className="font-semibold text-stone-800">{inr.format(order.subtotal)}</dd></div>
      <div className="flex justify-between gap-4 text-stone-600"><dt>Delivery Fee</dt><dd className="font-semibold text-stone-800">{order.deliveryFee === 0 ? "Free" : inr.format(order.deliveryFee)}</dd></div>
      <div className="flex justify-between gap-4 text-stone-600"><dt>Taxes</dt><dd className="font-semibold text-stone-800">{inr.format(order.taxes)}</dd></div>
      <div className="flex justify-between gap-4 border-t border-stone-100 pt-4 text-base font-extrabold text-stone-900"><dt>Total</dt><dd>{inr.format(order.total)}</dd></div>
    </dl>
  );
}
