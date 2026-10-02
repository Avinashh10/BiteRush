"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { saveOrder } from "@/lib/storage";
import { validateCheckoutDetails, validateCheckoutFieldValue, type CartTotals, type CheckoutErrors, type RequiredCheckoutField } from "@/lib/utils";
import type { CustomerDetails, OrderRecord } from "@/types";

interface CheckoutFormProps {
  totals: CartTotals;
}

interface TextFieldProps {
  id: RequiredCheckoutField;
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  type?: "text" | "tel" | "email";
  inputMode?: "text" | "numeric" | "tel" | "email";
  autoComplete?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function TextField({ id, label, value, placeholder, error, type = "text", inputMode, autoComplete, onChange }: TextFieldProps) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-stone-800">{label} <span className="text-orange-700" aria-hidden="true">*</span></label>
      <input
        id={id}
        name={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`min-h-12 w-full rounded-xl border bg-[#fffdfa] px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:ring-2 ${error ? "border-red-400 focus:border-red-400 focus:ring-red-100" : "border-stone-200 focus:border-orange-400 focus:ring-orange-100"}`}
      />
      {error && <p id={errorId} className="mt-1.5 text-xs font-medium text-red-700" role="alert">{error}</p>}
    </div>
  );
}

function createOrderId(): string {
  const uniquePart = globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  return `BR-${uniquePart.slice(0, 13).toUpperCase()}`;
}

export default function CheckoutForm({ totals }: CheckoutFormProps) {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const [details, setDetails] = useState<CustomerDetails>({
    fullName: "",
    phoneNumber: "",
    email: "",
    deliveryAddress: "",
    city: "",
    pincode: "",
    deliveryInstructions: "",
  });
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [submissionError, setSubmissionError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (field: keyof CustomerDetails, value: string) => {
    setDetails((current) => ({ ...current, [field]: value }));
    if (field !== "deliveryInstructions" && field in errors) {
      setErrors((current) => ({ ...current, [field]: validateCheckoutFieldValue(field as RequiredCheckoutField, value) }));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateCheckoutDetails(details);
    setErrors(nextErrors);
    setSubmissionError("");

    if (Object.keys(nextErrors).length > 0) {
      document.getElementById(Object.keys(nextErrors)[0])?.focus();
      return;
    }
    if (cartItems.length === 0) {
      setSubmissionError("Your cart is empty. Add a dish before placing your order.");
      return;
    }

    setIsSubmitting(true);
    const order: OrderRecord = {
      orderId: createOrderId(),
      customer: { ...details, fullName: details.fullName.trim(), email: details.email.trim() },
      items: cartItems.map((item) => ({ ...item })),
      subtotal: totals.subtotal,
      deliveryFee: totals.deliveryFee,
      taxes: totals.taxes,
      total: totals.total,
      orderDate: new Date().toISOString(),
    };

    if (!saveOrder(order)) {
      setSubmissionError("We couldn’t save your order. Please check your browser storage and try again.");
      setIsSubmitting(false);
      return;
    }

    clearCart();
    router.push("/order-success");
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7">
      <div>
        <h2 className="text-xl font-extrabold text-stone-900">Delivery details</h2>
        <p className="mt-1 text-sm text-stone-500"><span className="text-orange-700">*</span> Required fields</p>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <TextField id="fullName" label="Full Name" value={details.fullName} placeholder="e.g. Aditi Sharma" autoComplete="name" error={errors.fullName} onChange={(event) => handleFieldChange("fullName", event.target.value)} />
        </div>
        <TextField id="phoneNumber" label="Phone Number" type="tel" inputMode="tel" value={details.phoneNumber} placeholder="10-digit mobile number" autoComplete="tel-national" error={errors.phoneNumber} onChange={(event) => handleFieldChange("phoneNumber", event.target.value)} />
        <TextField id="email" label="Email Address" type="email" inputMode="email" value={details.email} placeholder="you@example.com" autoComplete="email" error={errors.email} onChange={(event) => handleFieldChange("email", event.target.value)} />
        <div className="sm:col-span-2">
          <label htmlFor="deliveryAddress" className="mb-2 block text-sm font-semibold text-stone-800">Delivery Address <span className="text-orange-700" aria-hidden="true">*</span></label>
          <textarea
            id="deliveryAddress"
            name="deliveryAddress"
            required
            rows={3}
            value={details.deliveryAddress}
            onChange={(event) => handleFieldChange("deliveryAddress", event.target.value)}
            placeholder="House / flat, street, area"
            aria-invalid={Boolean(errors.deliveryAddress)}
            aria-describedby={errors.deliveryAddress ? "deliveryAddress-error" : undefined}
            className={`w-full resize-y rounded-xl border bg-[#fffdfa] px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:ring-2 ${errors.deliveryAddress ? "border-red-400 focus:border-red-400 focus:ring-red-100" : "border-stone-200 focus:border-orange-400 focus:ring-orange-100"}`}
          />
          {errors.deliveryAddress && <p id="deliveryAddress-error" className="mt-1.5 text-xs font-medium text-red-700" role="alert">{errors.deliveryAddress}</p>}
        </div>
        <TextField id="city" label="City" value={details.city} placeholder="e.g. Bengaluru" autoComplete="address-level2" error={errors.city} onChange={(event) => handleFieldChange("city", event.target.value)} />
        <TextField id="pincode" label="Pincode" inputMode="numeric" value={details.pincode} placeholder="6-digit pincode" autoComplete="postal-code" error={errors.pincode} onChange={(event) => handleFieldChange("pincode", event.target.value)} />
        <div className="sm:col-span-2">
          <label htmlFor="deliveryInstructions" className="mb-2 block text-sm font-semibold text-stone-800">Delivery Instructions <span className="font-normal text-stone-400">(optional)</span></label>
          <textarea id="deliveryInstructions" name="deliveryInstructions" rows={2} value={details.deliveryInstructions} onChange={(event) => handleFieldChange("deliveryInstructions", event.target.value)} placeholder="Gate code, landmark or delivery note" className="w-full resize-y rounded-xl border border-stone-200 bg-[#fffdfa] px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100" />
        </div>
      </div>

      {submissionError && <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800" role="alert">{submissionError}</p>}
      <button type="submit" disabled={isSubmitting} className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 disabled:cursor-wait disabled:opacity-70">
        {isSubmitting ? "Placing your order…" : "Place Order"}
      </button>
      <p className="mt-3 text-center text-xs leading-5 text-stone-400">Your order details are saved securely in this browser for confirmation.</p>
    </form>
  );
}
