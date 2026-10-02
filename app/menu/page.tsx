import FoodFilters from "@/components/food/FoodFilters";
import { categories } from "@/data/categories";
import { foodItems } from "@/data/foodItems";
import { restaurants } from "@/data/restaurants";

interface MenuPageProps {
  searchParams: Promise<{ restaurant?: string | string[] }>;
}

export default async function MenuPage({ searchParams }: MenuPageProps) {
  const params = await searchParams;
  const restaurantParam = params.restaurant;
  const restaurantId = Array.isArray(restaurantParam) ? restaurantParam[0] ?? null : restaurantParam ?? null;

  return (
    <FoodFilters
      key={restaurantId ?? "all-restaurants"}
      foodItems={foodItems}
      restaurants={restaurants}
      categories={categories}
      initialRestaurantId={restaurantId}
    />
  );
}
