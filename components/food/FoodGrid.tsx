import FoodCard from "@/components/food/FoodCard";
import type { FoodItem, Restaurant } from "@/types";

interface FoodGridProps {
  foodItems: FoodItem[];
  restaurants: Restaurant[];
}

export default function FoodGrid({ foodItems, restaurants }: FoodGridProps) {
  const restaurantNames = new Map(restaurants.map((restaurant) => [restaurant.id, restaurant.name]));

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {foodItems.map((food) => (
        <FoodCard key={food.id} food={food} restaurantName={restaurantNames.get(food.restaurantId) ?? "BiteRush restaurant"} />
      ))}
    </div>
  );
}
