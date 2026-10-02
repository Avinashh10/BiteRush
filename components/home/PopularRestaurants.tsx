import Link from "next/link";
import RestaurantCard from "@/components/restaurants/RestaurantCard";
import { restaurants } from "@/data/restaurants";

export default function PopularRestaurants() {
  const popularRestaurants = [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-700">Good food starts here</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">Popular Restaurants</h2>
            <p className="mt-2 text-sm text-stone-500 sm:text-base">Local favourites, ready for your next meal.</p>
          </div>
          <Link href="/restaurants" className="inline-flex min-h-11 items-center justify-center self-start rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-bold text-stone-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 sm:self-auto">
            View All Restaurants <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popularRestaurants.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)}
        </div>
      </div>
    </section>
  );
}
