import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";

export default function CategorySection() {
  return (
    <section className="border-y border-stone-200/80 bg-white/70 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-700">Find your flavour</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">Explore by Category</h2>
          </div>
          <Link href="/menu" className="hidden rounded-lg text-sm font-bold text-orange-700 transition hover:text-orange-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600 sm:inline-flex">See full menu <span className="ml-1" aria-hidden="true">→</span></Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/menu?category=${encodeURIComponent(category.name)}`} className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-orange-200 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500">
              <div className="relative aspect-[4/3] overflow-hidden bg-orange-50">
                <Image src={category.image} alt={category.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw" className="object-cover transition duration-300 group-hover:scale-105" />
              </div>
              <div className="flex items-center justify-between gap-2 px-3 py-3 sm:px-4">
                <span className="text-sm font-bold text-stone-800 sm:text-base">{category.name}</span>
                <span className="text-orange-600 transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
