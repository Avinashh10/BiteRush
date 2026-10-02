import type { Offer } from "@/types";

export const offers: Offer[] = [
  {
    id: "welcome-150",
    title: "A tasty first order",
    description: "Save ₹150 on your first order above ₹499.",
    discount: "₹150 off",
    code: "BITE150",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "pizza-20",
    title: "Pizza night, sorted",
    description: "Get 20% off pizzas from Bombay Slice Co.",
    discount: "20% off",
    code: "SLICE20",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "free-delivery",
    title: "Delivery on us",
    description: "Enjoy free delivery on orders above ₹399.",
    discount: "Free delivery",
    code: "RUSHFREE",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "healthy-10",
    title: "Feel good, eat well",
    description: "Take 10% off fresh bowls and healthy meals.",
    discount: "10% off",
    code: "FRESH10",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85",
  },
];
