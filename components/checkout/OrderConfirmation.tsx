"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import { getOrderSnapshot, getServerOrderSnapshot, parseOrder, subscribeToOrderStorage } from "@/lib/storage";
import OrderCustomerDetails from "@/components/order/OrderCustomerDetails";
import OrderItems from "@/components/order/OrderItems";
import OrderSummary from "@/components/order/OrderSummary";

const orderDateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeStyle: "short" });

export default function OrderConfirmation() {
  const orderSnapshot = useSyncExternalStore(subscribeToOrderStorage, getOrderSnapshot, getServerOrderSnapshot);
  const order = useMemo(() => parseOrder(orderSnapshot), [orderSnapshot]);

  if (!order) {
    return (
      <main className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <section className="w-full max-w-lg rounded-3xl border border-stone-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-orange-50 text-2xl text-orange-600" aria-hidden="true">🍽</span>
          <h1 className="mt-5 text-2xl font-extrabold text-stone-900">No recent order found.</h1>
          <p className="mt-2 text-sm leading-6 text-stone-500">Place an order to see its confirmation here.</p>
          <Link href="/menu" className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 sm:w-auto">Start Ordering</Link>
        </section>
      </main>
    );
  }

  const date = new Date(order.orderDate);
  const readableDate = Number.isNaN(date.getTime()) ? order.orderDate : orderDateFormatter.format(date);

  return (
    <main className="flex-1 px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="rounded-3xl border border-orange-100 bg-white p-6 text-center shadow-sm sm:p-10">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-orange-50 text-3xl font-bold text-orange-600" aria-hidden="true">✓</span>
          <p className="mt-5 inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-emerald-800">Order Placed</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">Order Confirmed!</h1>
          <p className="mt-2 text-base font-semibold text-stone-700">Thank you for ordering with BiteRush.</p>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-stone-600">Your order has been placed successfully. We&apos;re getting it ready for delivery.</p>
          <p className="mt-5 inline-flex rounded-full bg-stone-100 px-4 py-2 font-mono text-sm font-bold text-stone-800">Order ID: {order.orderId}</p>
          <p className="mt-3 text-sm text-stone-500"><time dateTime={order.orderDate}>{readableDate}</time></p>
        </header>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <section className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7" aria-labelledby="confirmed-items-heading">
            <div className="flex items-center justify-between gap-4">
              <h2 id="confirmed-items-heading" className="text-lg font-extrabold text-stone-900">Your items</h2>
              <time className="text-xs text-stone-500 sm:hidden" dateTime={order.orderDate}>{readableDate}</time>
            </div>
            <OrderItems items={order.items} />
            <OrderSummary order={order} />
          </section>
          <OrderCustomerDetails customer={order.customer} />
        </div>

        <nav aria-label="Order actions" className="mt-6 grid gap-3 sm:flex sm:justify-center">
          <Link href="/menu" className="inline-flex min-h-12 items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Continue Shopping</Link>
          <Link href="/restaurants" className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-bold text-stone-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">View Restaurants</Link>
        </nav>
      </div>
    </main>
  );
}
