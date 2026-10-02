import Link from "next/link";
import FoodCard from "@/components/food/FoodCard";
import { foodItems } from "@/data/foodItems";
import { restaurants } from "@/data/restaurants";

export default function FeaturedFoods() {
  const popularFoods = [...foodItems].sort((a, b) => b.popularity - a.popularity).slice(0, 6);

  return (
    <section className="border-y border-stone-200/80 bg-white/70 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-700">Crowd favourites</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">Popular Dishes</h2>
            <p className="mt-2 text-sm text-stone-500 sm:text-base">Big flavour, picked by BiteRush food lovers.</p>
          </div>
          <Link href="/menu" className="inline-flex min-h-11 items-center justify-center self-start rounded-full px-2 py-2 text-sm font-bold text-orange-700 transition hover:text-orange-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 sm:self-auto">Browse the menu <span className="ml-2" aria-hidden="true">→</span></Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popularFoods.map((food) => (
            <FoodCard key={food.id} food={food} restaurantName={restaurants.find((restaurant) => restaurant.id === food.restaurantId)?.name ?? "BiteRush restaurant"} />
          ))}
        </div>
      </div>
    </section>
  );
}
