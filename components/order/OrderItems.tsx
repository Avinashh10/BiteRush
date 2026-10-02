import Image from "next/image";
import { restaurants } from "@/data/restaurants";
import type { CartItem } from "@/types";

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export default function OrderItems({ items }: { items: CartItem[] }) {
  return (
    <ul className="mt-5 divide-y divide-stone-100">
      {items.map((item, index) => {
        const restaurantName = restaurants.find((restaurant) => restaurant.id === item.foodItem.restaurantId)?.name ?? "Restaurant";
        return (
          <li key={`${item.foodItem.id}-${index}`} className="flex gap-3 py-4 first:pt-0 last:pb-0 sm:gap-4">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-orange-50 sm:size-[4.5rem]">
              <Image src={item.foodItem.image} alt={item.foodItem.name} fill sizes="(min-width: 640px) 72px, 64px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-stone-900">{item.foodItem.name}</p>
              <p className="mt-1 text-xs text-stone-500">{restaurantName}</p>
              <p className="mt-1 text-xs text-stone-500">Qty {item.quantity} × {inr.format(item.foodItem.price)}</p>
            </div>
            <p className="shrink-0 self-center text-sm font-bold text-stone-800">{inr.format(item.foodItem.price * item.quantity)}</p>
          </li>
        );
      })}
    </ul>
  );
}
