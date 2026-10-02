"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import FoodGrid from "@/components/food/FoodGrid";
import SearchBar from "@/components/food/SearchBar";
import type { Category, FoodItem, Restaurant } from "@/types";

type SortOption = "recommended" | "price-asc" | "price-desc" | "rating" | "popularity";

interface FoodFiltersProps {
  foodItems: FoodItem[];
  restaurants: Restaurant[];
  categories: Category[];
  initialRestaurantId: string | null;
}

export default function FoodFilters({ foodItems, restaurants, categories, initialRestaurantId }: FoodFiltersProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortOption>("recommended");
  const [restaurantFilterCleared, setRestaurantFilterCleared] = useState(false);
  const restaurantId = restaurantFilterCleared ? "" : initialRestaurantId ?? "";

  const selectedRestaurant = restaurants.find((restaurant) => restaurant.id === restaurantId);

  const visibleFoodItems = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    const filtered = foodItems.filter((food) => {
      const matchesRestaurant = !restaurantId || food.restaurantId === restaurantId;
      const matchesCategory = category === "all" || food.category === category;
      const matchesSearch = !query || food.name.toLocaleLowerCase().includes(query) || food.description.toLocaleLowerCase().includes(query) || food.category.toLocaleLowerCase().includes(query);
      return matchesRestaurant && matchesCategory && matchesSearch;
    });

    switch (sort) {
      case "price-asc":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-desc":
        return filtered.sort((a, b) => b.price - a.price);
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      case "popularity":
        return filtered.sort((a, b) => b.popularity - a.popularity);
      default:
        return filtered;
    }
  }, [category, foodItems, restaurantId, search, sort]);

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setSort("recommended");
    setRestaurantFilterCleared(true);
    if (initialRestaurantId) router.replace("/menu", { scroll: false });
  };

  return (
    <main className="flex-1 px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-700">Fresh from our kitchens</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">Explore Our Menu</h1>
          <p className="mt-3 text-base leading-7 text-stone-600">Discover delicious meals from your favorite restaurants.</p>
          {restaurantId && (
            <p className="mt-4 inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-800">
              {selectedRestaurant ? `Showing dishes from ${selectedRestaurant.name}` : "Selected restaurant not found"}
            </p>
          )}
        </header>

        <section aria-label="Search and filter food" className="mt-8 rounded-3xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
          <label htmlFor="menu-search" className="mb-2 block text-sm font-bold text-stone-800">Search the menu</label>
          <SearchBar value={search} onChange={setSearch} />

          <div className="mt-5 border-t border-stone-100 pt-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-stone-500">Browse categories</p>
            <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter by category">
              <button type="button" onClick={() => setCategory("all")} aria-pressed={category === "all"} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 ${category === "all" ? "border-orange-500 bg-orange-500 text-white" : "border-stone-200 bg-white text-stone-600 hover:border-orange-300 hover:text-orange-800"}`}>All</button>
              {categories.map((item) => (
                <button key={item.id} type="button" onClick={() => setCategory(item.name)} aria-pressed={category === item.name} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 ${category === item.name ? "border-orange-500 bg-orange-500 text-white" : "border-stone-200 bg-white text-stone-600 hover:border-orange-300 hover:text-orange-800"}`}>{item.name}</button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 border-t border-stone-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <label htmlFor="menu-sort" className="text-xs font-bold uppercase tracking-wide text-stone-500">Sort dishes</label>
            <select id="menu-sort" value={sort} onChange={(event) => setSort(event.target.value as SortOption)} className="min-h-11 rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm font-medium text-stone-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 sm:min-w-56">
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Rating: High to Low</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </section>

        <div className="mb-5 mt-8 flex items-center justify-between gap-4">
          <p className="text-sm text-stone-500" aria-live="polite"><span className="font-bold text-stone-800">{visibleFoodItems.length}</span> {visibleFoodItems.length === 1 ? "dish" : "dishes"} found</p>
          {(search || category !== "all" || sort !== "recommended" || restaurantId) && (
            <button type="button" onClick={clearFilters} className="rounded-lg px-3 py-2 text-sm font-bold text-orange-700 transition hover:bg-orange-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Clear filters</button>
          )}
        </div>

        {visibleFoodItems.length > 0 ? (
          <FoodGrid foodItems={visibleFoodItems} restaurants={restaurants} />
        ) : (
          <div className="rounded-3xl border border-dashed border-stone-300 bg-white px-6 py-14 text-center sm:py-20">
            <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-orange-50 text-2xl" aria-hidden="true">⌕</span>
            <h2 className="mt-4 text-xl font-extrabold text-stone-900">No dishes found</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-stone-500">Try another search or clear your filters to browse the full menu.</p>
            <button type="button" onClick={clearFilters} className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Clear Filters</button>
          </div>
        )}
      </div>
    </main>
  );
}
