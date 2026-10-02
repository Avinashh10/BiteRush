import type { CartItem, CustomerDetails, Restaurant } from "@/types";

export interface CartTotals {
  subtotal: number;
  deliveryFee: number;
  taxes: number;
  total: number;
}

const TAX_RATE = 0.05;

export type RequiredCheckoutField = "fullName" | "phoneNumber" | "email" | "deliveryAddress" | "city" | "pincode";
export type CheckoutErrors = Partial<Record<RequiredCheckoutField, string>>;

function validateCheckoutField(field: RequiredCheckoutField, value: string): string | undefined {
  const trimmed = value.trim();
  switch (field) {
    case "fullName":
      return trimmed.length >= 2 ? undefined : "Enter your name (at least 2 characters).";
    case "phoneNumber":
      return /^[6-9]\d{9}$/.test(trimmed) ? undefined : "Enter a valid 10-digit Indian mobile number.";
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed) ? undefined : "Enter a valid email address.";
    case "deliveryAddress":
      return trimmed ? undefined : "Enter your delivery address.";
    case "city":
      return trimmed ? undefined : "Enter your city.";
    case "pincode":
      return /^\d{6}$/.test(trimmed) ? undefined : "Enter a 6-digit pincode.";
  }
}

export function validateCheckoutDetails(details: CustomerDetails): CheckoutErrors {
  const fields: RequiredCheckoutField[] = ["fullName", "phoneNumber", "email", "deliveryAddress", "city", "pincode"];
  return fields.reduce<CheckoutErrors>((errors, field) => {
    const error = validateCheckoutField(field, details[field]);
    if (error) errors[field] = error;
    return errors;
  }, {});
}

export function validateCheckoutFieldValue(field: RequiredCheckoutField, value: string): string | undefined {
  return validateCheckoutField(field, value);
}

export function calculateCartTotals(cartItems: CartItem[], restaurants: Restaurant[]): CartTotals {
  const subtotal = cartItems.reduce((amount, item) => amount + item.foodItem.price * item.quantity, 0);
  const restaurantIds = new Set(cartItems.map((item) => item.foodItem.restaurantId));
  const deliveryFee = restaurants
    .filter((restaurant) => restaurantIds.has(restaurant.id))
    .reduce((amount, restaurant) => amount + restaurant.deliveryFee, 0);
  const taxes = Math.round(subtotal * TAX_RATE);

  return { subtotal, deliveryFee, taxes, total: subtotal + deliveryFee + taxes };
}
