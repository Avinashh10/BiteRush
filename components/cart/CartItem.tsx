import Image from "next/image";
import { restaurants } from "@/data/restaurants";
import type { CartItem as CartItemType } from "@/types";

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

interface CartItemProps {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export default function CartItem({ item, onIncrease, onDecrease, onRemove }: CartItemProps) {
  const restaurantName = restaurants.find((restaurant) => restaurant.id === item.foodItem.restaurantId)?.name ?? "Restaurant";
  const subtotal = item.foodItem.price * item.quantity;

  return (
    <article className="flex gap-4 border-b border-stone-100 py-5 first:pt-0 last:border-b-0 last:pb-0 sm:gap-5">
      <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-orange-50 sm:size-24">
        <Image src={item.foodItem.image} alt={item.foodItem.name} fill sizes="(min-width: 640px) 96px, 80px" className="object-cover" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <h2 className="truncate font-bold text-stone-900">{item.foodItem.name}</h2>
          <p className="mt-1 text-sm text-stone-500">{restaurantName}</p>
          <p className="mt-1 text-sm font-semibold text-stone-700">{inr.format(item.foodItem.price)} each</p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 sm:justify-end">
          <div className="inline-flex h-10 items-center rounded-full border border-stone-200 bg-[#fffdfa]">
            <button type="button" onClick={onDecrease} aria-label={`Decrease ${item.foodItem.name} quantity`} className="flex size-10 items-center justify-center rounded-full text-lg font-semibold text-stone-600 transition hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">−</button>
            <span className="min-w-8 text-center text-sm font-bold text-stone-800" aria-live="polite">{item.quantity}</span>
            <button type="button" onClick={onIncrease} aria-label={`Increase ${item.foodItem.name} quantity`} className="flex size-10 items-center justify-center rounded-full text-lg font-semibold text-stone-600 transition hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">+</button>
          </div>
          <div className="min-w-20 text-right">
            <p className="text-sm font-extrabold text-stone-900">{inr.format(subtotal)}</p>
            <button type="button" onClick={onRemove} className="mt-1 text-xs font-semibold text-stone-500 underline-offset-4 transition hover:text-red-700 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Remove</button>
          </div>
        </div>
      </div>
    </article>
  );
}
