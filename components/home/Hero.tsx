import Image from "next/image";
import Link from "next/link";
import { foodItems } from "@/data/foodItems";

export default function Hero() {
  const heroFood = foodItems.find((food) => food.id === "food-001") ?? foodItems[0];

  return (
    <section className="overflow-hidden px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8 lg:pb-24 lg:pt-16">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div className="motion-safe:animate-[biterush-enter_650ms_ease-out_both]">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3.5 py-2 text-xs font-bold tracking-wide text-orange-700 shadow-sm sm:text-sm">
            <span className="size-2 rounded-full bg-orange-500" aria-hidden="true" />
            Fast &amp; Fresh Delivery
          </div>
          <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
            Delicious food, <span className="text-orange-600">delivered</span> to your door.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-stone-600 sm:text-lg sm:leading-8">
            From neighbourhood favourites to the meals you love, get something delicious on its way in just a few taps.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/menu" className="inline-flex min-h-12 items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-md shadow-orange-200/70 transition hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
              Order Now <span className="ml-2" aria-hidden="true">→</span>
            </Link>
            <Link href="/restaurants" className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-bold text-stone-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
              Explore Restaurants
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-3 text-sm text-stone-500">
            <div className="flex -space-x-2" aria-hidden="true">
              <span className="flex size-8 items-center justify-center rounded-full border-2 border-[#fbf8f3] bg-amber-100 text-xs">🍕</span>
              <span className="flex size-8 items-center justify-center rounded-full border-2 border-[#fbf8f3] bg-rose-100 text-xs">🍔</span>
              <span className="flex size-8 items-center justify-center rounded-full border-2 border-[#fbf8f3] bg-lime-100 text-xs">🥗</span>
            </div>
            <span><strong className="font-bold text-stone-800">Fresh picks</strong> for every craving</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl motion-safe:animate-[biterush-enter_800ms_ease-out_both] lg:max-w-none">
          <div className="absolute -right-4 top-8 size-24 rounded-full bg-orange-100 sm:-right-7 sm:size-32" aria-hidden="true" />
          <div className="absolute -bottom-5 left-0 size-20 rounded-full bg-amber-100 sm:-left-5 sm:size-28" aria-hidden="true" />
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border-[6px] border-white bg-orange-100 shadow-xl shadow-stone-300/50 sm:rounded-[2.5rem] sm:border-[10px]">
            <Image src={heroFood.image} alt={heroFood.name} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/55 via-transparent to-transparent" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/80">Today&apos;s craving</p>
                <p className="mt-1 text-xl font-extrabold sm:text-2xl">{heroFood.name}</p>
              </div>
              <span className="shrink-0 rounded-full bg-white/95 px-3 py-2 text-sm font-extrabold text-stone-900 shadow-sm">₹{heroFood.price}</span>
            </div>
          </div>
          <div className="absolute -left-1 top-5 rounded-2xl border border-stone-100 bg-white px-4 py-3 shadow-lg shadow-stone-900/10 sm:-left-7 sm:top-8">
            <p className="text-xs font-medium text-stone-500">Rated by food lovers</p>
            <p className="mt-1 flex items-center gap-1 text-sm font-extrabold text-stone-900"><span className="text-amber-500" aria-hidden="true">★</span> {heroFood.rating} <span className="font-medium text-stone-500">/ 5</span></p>
          </div>
        </div>
      </div>
    </section>
  );
}
