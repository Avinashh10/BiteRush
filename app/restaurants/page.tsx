import RestaurantFilters from "@/components/restaurants/RestaurantFilters";
import { restaurants } from "@/data/restaurants";

export default function RestaurantsPage() {
  return <RestaurantFilters restaurants={restaurants} />;
}
