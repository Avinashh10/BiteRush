export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  isOpen: boolean;
  deliveryFee: number;
  description: string;
}

export interface FoodItem {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  description: string;
  restaurantId: string;
  rating: number;
  popularity: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  code: string;
  image: string;
}

export interface CartItem {
  foodItem: FoodItem;
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  phoneNumber: string;
  email: string;
  deliveryAddress: string;
  city: string;
  pincode: string;
  deliveryInstructions: string;
}

export interface OrderRecord {
  orderId: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  taxes: number;
  total: number;
  orderDate: string;
}
