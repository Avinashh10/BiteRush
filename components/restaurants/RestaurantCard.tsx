import Image from "next/image";
import Link from "next/link";
import type { Restaurant } from "@/types";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden bg-orange-50">
        <Image src={restaurant.image} alt={restaurant.name} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw" className="object-cover transition duration-300 group-hover:scale-105" />
        <span className={`absolute left-3 top-3 rounded-full px-3 py-1.5 text-xs font-bold shadow-sm ${restaurant.isOpen ? "bg-white text-emerald-700" : "bg-stone-900/85 text-white"}`}>
          <span className="mr-1.5 inline-block size-1.5 rounded-full bg-current align-middle" aria-hidden="true" />
          {restaurant.isOpen ? "Open now" : "Closed"}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-extrabold text-stone-900">{restaurant.name}</h3>
            <p className="mt-1 truncate text-sm text-stone-500">{restaurant.cuisine}</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-800"><span className="text-amber-500" aria-hidden="true">★</span>{restaurant.rating.toFixed(1)}</span>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-2 gap-y-1 border-t border-stone-100 pt-3 text-xs font-medium text-stone-500">
          <span>{restaurant.deliveryTime}</span>
          <span>{restaurant.deliveryFee === 0 ? "Free delivery" : `Delivery ₹${restaurant.deliveryFee}`}</span>
        </div>
        <Link href={`/menu?restaurant=${encodeURIComponent(restaurant.id)}`} className="mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
          View Menu <span className="ml-2" aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
