"use client";

import { useMemo, useState } from "react";
import RestaurantGrid from "@/components/restaurants/RestaurantGrid";
import type { Restaurant } from "@/types";

type SortOption = "recommended" | "rating" | "delivery-time" | "delivery-fee";

interface RestaurantFiltersProps {
  restaurants: Restaurant[];
}

const selectClassName = "min-h-11 w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm font-medium text-stone-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 sm:w-auto";

export default function RestaurantFilters({ restaurants }: RestaurantFiltersProps) {
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("all");
  const [minimumRating, setMinimumRating] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [sort, setSort] = useState<SortOption>("recommended");

  const cuisineOptions = useMemo(
    () => Array.from(new Set(restaurants.flatMap((restaurant) => restaurant.cuisine.split(",").map((item) => item.trim())))).sort((a, b) => a.localeCompare(b)),
    [restaurants],
  );

  const visibleRestaurants = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    const filtered = restaurants.filter((restaurant) => {
      const matchesSearch = !query || restaurant.name.toLocaleLowerCase().includes(query) || restaurant.cuisine.toLocaleLowerCase().includes(query);
      const matchesCuisine = cuisine === "all" || restaurant.cuisine.split(",").some((item) => item.trim() === cuisine);
      const matchesRating = minimumRating === "all" || restaurant.rating >= Number(minimumRating);
      const matchesAvailability = availability === "all" || restaurant.isOpen;
      return matchesSearch && matchesCuisine && matchesRating && matchesAvailability;
    });

    switch (sort) {
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      case "delivery-time":
        return filtered.sort((a, b) => Number.parseInt(a.deliveryTime, 10) - Number.parseInt(b.deliveryTime, 10));
      case "delivery-fee":
        return filtered.sort((a, b) => a.deliveryFee - b.deliveryFee);
      default:
        return filtered;
    }
  }, [availability, cuisine, minimumRating, restaurants, search, sort]);

  const clearFilters = () => {
    setSearch("");
    setCuisine("all");
    setMinimumRating("all");
    setAvailability("all");
    setSort("recommended");
  };

  return (
    <main className="flex-1 px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-700">Your next meal starts here</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">Find Your Favorite Restaurant</h1>
          <p className="mt-3 text-base leading-7 text-stone-600">Explore local kitchens, discover something new, and find the right bite for right now.</p>
        </div>

        <div className="mt-8 rounded-3xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
          <label htmlFor="restaurant-search" className="mb-2 block text-sm font-bold text-stone-800">Search restaurants</label>
          <div className="relative">
            <svg viewBox="0 0 24 24" fill="none" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-stone-400" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></svg>
            <input
              id="restaurant-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by restaurant or cuisine"
              className="min-h-12 w-full rounded-2xl border border-stone-200 bg-[#fffdfa] py-3 pl-12 pr-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <div className="mt-4 grid gap-3 border-t border-stone-100 pt-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.2fr]">
            <label className="flex flex-col gap-2 text-xs font-bold uppercase tracking-wide text-stone-500">
              Cuisine
              <select value={cuisine} onChange={(event) => setCuisine(event.target.value)} className={selectClassName}>
                <option value="all">All cuisines</option>
                {cuisineOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-xs font-bold uppercase tracking-wide text-stone-500">
              Minimum rating
              <select value={minimumRating} onChange={(event) => setMinimumRating(event.target.value)} className={selectClassName}>
                <option value="all">Any rating</option>
                <option value="4.5">4.5+</option>
                <option value="4.0">4.0+</option>
                <option value="3.5">3.5+</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-xs font-bold uppercase tracking-wide text-stone-500">
              Availability
              <select value={availability} onChange={(event) => setAvailability(event.target.value)} className={selectClassName}>
                <option value="all">All</option>
                <option value="open">Open Now</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-xs font-bold uppercase tracking-wide text-stone-500">
              Sort by
              <select value={sort} onChange={(event) => setSort(event.target.value as SortOption)} className={selectClassName}>
                <option value="recommended">Recommended</option>
                <option value="rating">Rating: High to Low</option>
                <option value="delivery-time">Delivery Time: Fastest</option>
                <option value="delivery-fee">Delivery Fee: Low to High</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mb-5 mt-8 flex items-center justify-between gap-4">
          <p className="text-sm text-stone-500" aria-live="polite"><span className="font-bold text-stone-800">{visibleRestaurants.length}</span> {visibleRestaurants.length === 1 ? "restaurant" : "restaurants"} found</p>
          {(search || cuisine !== "all" || minimumRating !== "all" || availability !== "all" || sort !== "recommended") && (
            <button type="button" onClick={clearFilters} className="rounded-lg px-3 py-2 text-sm font-bold text-orange-700 transition hover:bg-orange-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Reset filters</button>
          )}
        </div>

        {visibleRestaurants.length > 0 ? (
          <RestaurantGrid restaurants={visibleRestaurants} />
        ) : (
          <div className="rounded-3xl border border-dashed border-stone-300 bg-white px-6 py-14 text-center sm:py-20">
            <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-orange-50 text-2xl" aria-hidden="true">⌕</span>
            <h2 className="mt-4 text-xl font-extrabold text-stone-900">No restaurants found</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-stone-500">Try a different search or clear your filters to see all restaurants.</p>
            <button type="button" onClick={clearFilters} className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Clear Filters</button>
          </div>
        )}
      </div>
    </main>
  );
}
