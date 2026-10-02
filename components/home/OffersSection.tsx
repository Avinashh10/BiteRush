import Image from "next/image";
import Link from "next/link";
import { offers } from "@/data/offers";

export default function OffersSection() {
  return (
    <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-700">A little extra delicious</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">Offers made for your cravings</h2>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {offers.map((offer) => (
            <article key={offer.id} className="group grid overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:grid-cols-[1fr_0.8fr]">
              <div className="flex flex-col items-start p-5 sm:p-6">
                <span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-orange-700">{offer.discount}</span>
                <h3 className="mt-4 text-xl font-extrabold tracking-tight text-stone-900">{offer.title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-500">{offer.description}</p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <span className="rounded-lg border border-dashed border-orange-300 bg-orange-50 px-3 py-2 font-mono text-xs font-bold tracking-wider text-orange-800">{offer.code}</span>
                  <Link href="/menu" className="rounded-lg text-sm font-bold text-stone-800 transition-colors hover:text-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Order now <span aria-hidden="true">→</span></Link>
                </div>
              </div>
              <div className="relative min-h-44 overflow-hidden bg-orange-50 sm:min-h-full">
                <Image src={offer.image} alt="" fill sizes="(max-width: 767px) 100vw, 40vw" className="object-cover transition duration-500 group-hover:scale-105" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
