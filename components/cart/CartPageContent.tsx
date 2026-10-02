"use client";

import { useCart } from "@/context/CartContext";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";

export default function CartPageContent() {
  const { cartItems, cartItemCount, hasHydrated, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart();

  if (!hasHydrated) {
    return <main className="flex-1 px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl animate-pulse rounded-3xl border border-stone-200 bg-white p-8 text-center text-sm font-medium text-stone-500">Loading your cart…</div></main>;
  }

  if (cartItems.length === 0) {
    return (
      <main className="flex-1 px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <header className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-700">BiteRush</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">Your Cart</h1>
            <p className="mt-2 text-base text-stone-600">Review your items before checkout.</p>
            <p className="mt-3 text-sm font-semibold text-stone-500">0 items</p>
          </header>
          <EmptyCart />
        </div>
      </main>
    );
  }

  const subtotal = cartItems.reduce((amount, item) => amount + item.foodItem.price * item.quantity, 0);
  const deliveryFee = cartItems.length > 0 ? 40 : 0;
  const taxes = Math.round(subtotal * 0.05);
  const totals = { subtotal, deliveryFee, taxes, total: subtotal + deliveryFee + taxes };

  return (
    <main className="flex-1 px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 sm:mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-700">BiteRush</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">Your Cart</h1>
          <p className="mt-2 text-base text-stone-600">Review your items before checkout.</p>
          <p className="mt-3 text-sm font-semibold text-stone-500">{cartItemCount} {cartItemCount === 1 ? "item" : "items"}</p>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:gap-8">
          <section className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7" aria-label="Cart items">
            <ul className="list-none p-0">
              {cartItems.map((item) => (
                <li key={item.foodItem.id}>
                  <CartItem
                    item={item}
                    onIncrease={() => increaseQuantity(item.foodItem.id)}
                    onDecrease={() => decreaseQuantity(item.foodItem.id)}
                    onRemove={() => removeFromCart(item.foodItem.id)}
                  />
                </li>
              ))}
            </ul>
          </section>
          <CartSummary totals={totals} canCheckout={cartItems.length > 0} onClear={clearCart} />
        </div>
      </div>
    </main>
  );
}
