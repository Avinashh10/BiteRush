import Link from "next/link";
import CategorySection from "@/components/home/CategorySection";
import FeaturedFoods from "@/components/home/FeaturedFoods";
import Hero from "@/components/home/Hero";
import OffersSection from "@/components/home/OffersSection";
import PopularRestaurants from "@/components/home/PopularRestaurants";

export default function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <PopularRestaurants />
      <FeaturedFoods />
      <OffersSection />
      <section className="px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 rounded-[2rem] border border-orange-100 bg-orange-50 px-6 py-10 text-center sm:px-10 md:flex-row md:text-left lg:px-14 lg:py-12">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-700">Your next favourite is waiting</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">Craving something delicious?</h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-stone-600">Find your favorite meals and get them delivered fast.</p>
          </div>
          <Link href="/menu" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
            Browse Menu
            <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
