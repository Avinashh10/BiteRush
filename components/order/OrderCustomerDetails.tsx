import type { CustomerDetails } from "@/types";

export default function OrderCustomerDetails({ customer }: { customer: CustomerDetails }) {
  return (
    <section className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7" aria-labelledby="delivery-details-heading">
      <h2 id="delivery-details-heading" className="text-lg font-extrabold text-stone-900">Delivery details</h2>
      <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
        <div>
          <p className="font-semibold text-stone-900">{customer.fullName}</p>
          <p className="mt-1 text-stone-600">{customer.phoneNumber}</p>
          <p className="mt-1 break-all text-stone-600">{customer.email}</p>
        </div>
        <div>
          <p className="font-semibold text-stone-800">Delivery address</p>
          <p className="mt-1 leading-6 text-stone-600">{customer.deliveryAddress}<br />{customer.city}, {customer.pincode}</p>
        </div>
      </div>
      {customer.deliveryInstructions && <p className="mt-4 rounded-xl bg-stone-50 px-3 py-2.5 text-sm leading-6 text-stone-600"><span className="font-semibold text-stone-800">Delivery instructions: </span>{customer.deliveryInstructions}</p>}
    </section>
  );
}
