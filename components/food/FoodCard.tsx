"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import type { FoodItem } from "@/types";

interface FoodCardProps {
  food: FoodItem;
  restaurantName: string;
}

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export default function FoodCard({ food, restaurantName }: FoodCardProps) {
  const { addToCart } = useCart();
  const [showAddedConfirmation, setShowAddedConfirmation] = useState(false);

  useEffect(() => {
    if (!showAddedConfirmation) return;
    const timeout = window.setTimeout(() => setShowAddedConfirmation(false), 1500);
    return () => window.clearTimeout(timeout);
  }, [showAddedConfirmation]);

  const handleAddToCart = () => {
    addToCart(food);
    setShowAddedConfirmation(true);
  };

  return (
    <article className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden bg-orange-50">
        <Image src={food.image} alt={food.name} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover transition duration-300 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-stone-700 shadow-sm">{food.category}</span>
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1.5 text-xs font-bold text-stone-800 shadow-sm"><span className="text-amber-500" aria-hidden="true">★</span>{food.rating.toFixed(1)}</span>
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-base font-extrabold text-stone-900 sm:text-lg">{food.name}</h2>
          <span className="shrink-0 text-base font-extrabold text-stone-900">{inr.format(food.price)}</span>
        </div>
        <p className="mt-2 min-h-12 text-sm leading-6 text-stone-500">{food.description}</p>
        <p className="mt-2 truncate text-xs font-semibold text-stone-500">From <span className="text-stone-700">{restaurantName}</span></p>
        <button type="button" onClick={handleAddToCart} className={`mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 ${showAddedConfirmation ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-orange-500 text-white hover:bg-orange-600"}`} aria-live="polite">
          <span aria-hidden="true">{showAddedConfirmation ? "✓" : "+"}</span>
          {showAddedConfirmation ? "Added to cart" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}
