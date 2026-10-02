import type { CartItem, FoodItem, OrderRecord } from "@/types";

const CART_STORAGE_KEY = "biterush-cart";
const ORDER_STORAGE_KEY = "biterush-last-order";
const SERVER_CART_SNAPSHOT = "[]";
let memorySnapshot = SERVER_CART_SNAPSHOT;
const cartListeners = new Set<() => void>();
let memoryOrderSnapshot: string | null = null;
const orderListeners = new Set<() => void>();

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null) return false;

  const candidate = value as { foodItem?: Partial<FoodItem>; quantity?: unknown };
  const foodItem = candidate.foodItem;
  return (
    typeof foodItem?.id === "string" &&
    typeof foodItem.name === "string" &&
    typeof foodItem.image === "string" &&
    typeof foodItem.category === "string" &&
    typeof foodItem.price === "number" && Number.isFinite(foodItem.price) && foodItem.price >= 0 &&
    typeof foodItem.description === "string" &&
    typeof foodItem.restaurantId === "string" &&
    typeof foodItem.rating === "number" && Number.isFinite(foodItem.rating) &&
    typeof foodItem.popularity === "number" && Number.isFinite(foodItem.popularity) &&
    typeof candidate.quantity === "number" &&
    Number.isInteger(candidate.quantity) &&
    candidate.quantity > 0
  );
}

export function parseCartItems(snapshot: string): CartItem[] {
  try {
    const parsed: unknown = JSON.parse(snapshot);
    return Array.isArray(parsed) ? parsed.filter(isCartItem) : [];
  } catch {
    return [];
  }
}

export function getCartSnapshot(): string {
  if (typeof window === "undefined") return SERVER_CART_SNAPSHOT;

  try {
    memorySnapshot = window.localStorage.getItem(CART_STORAGE_KEY) ?? SERVER_CART_SNAPSHOT;
  } catch {
    // Keep the in-memory snapshot when browser storage is blocked.
  }
  return memorySnapshot;
}

export function getServerCartSnapshot(): string {
  return SERVER_CART_SNAPSHOT;
}

export function subscribeToCartStorage(listener: () => void): () => void {
  cartListeners.add(listener);
  const handleStorage = (event: StorageEvent) => {
    if (event.key === CART_STORAGE_KEY || event.key === null) listener();
  };

  if (typeof window !== "undefined") window.addEventListener("storage", handleStorage);

  return () => {
    cartListeners.delete(listener);
    if (typeof window !== "undefined") window.removeEventListener("storage", handleStorage);
  };
}

export function loadCartItems(): CartItem[] {
  return parseCartItems(getCartSnapshot());
}

export function saveCartItems(cartItems: CartItem[]): void {
  memorySnapshot = JSON.stringify(cartItems);

  try {
    if (typeof window !== "undefined") window.localStorage.setItem(CART_STORAGE_KEY, memorySnapshot);
  } catch {
    // Storage can be unavailable in private browsing or when the browser blocks it.
  }

  cartListeners.forEach((listener) => listener());
}

function isOrderRecord(value: unknown): value is OrderRecord {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<OrderRecord>;
  const customer = candidate.customer;
  return (
    typeof candidate.orderId === "string" && /^BR-[A-Z0-9-]{6,}$/.test(candidate.orderId) &&
    typeof candidate.items === "object" && Array.isArray(candidate.items) &&
    candidate.items.length > 0 &&
    typeof candidate.subtotal === "number" && Number.isFinite(candidate.subtotal) && candidate.subtotal >= 0 &&
    typeof candidate.deliveryFee === "number" && Number.isFinite(candidate.deliveryFee) && candidate.deliveryFee >= 0 &&
    typeof candidate.taxes === "number" && Number.isFinite(candidate.taxes) && candidate.taxes >= 0 &&
    typeof candidate.total === "number" && Number.isFinite(candidate.total) && candidate.total >= 0 &&
    typeof candidate.orderDate === "string" && !Number.isNaN(Date.parse(candidate.orderDate)) &&
    typeof customer === "object" && customer !== null &&
    typeof customer.fullName === "string" &&
    typeof customer.phoneNumber === "string" &&
    typeof customer.email === "string" &&
    typeof customer.deliveryAddress === "string" &&
    typeof customer.city === "string" &&
    typeof customer.pincode === "string" &&
    typeof customer.deliveryInstructions === "string" &&
    candidate.items.every(isCartItem)
  );
}

export function parseOrder(snapshot: string | null): OrderRecord | null {
  if (!snapshot) return null;
  try {
    const parsed: unknown = JSON.parse(snapshot);
    return isOrderRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function getOrderSnapshot(): string | null {
  if (typeof window === "undefined") return null;

  try {
    memoryOrderSnapshot = window.localStorage.getItem(ORDER_STORAGE_KEY);
  } catch {
    // Keep the in-memory order when browser storage is blocked.
  }
  return memoryOrderSnapshot;
}

export function getServerOrderSnapshot(): string | null {
  return null;
}

export function subscribeToOrderStorage(listener: () => void): () => void {
  orderListeners.add(listener);
  const handleStorage = (event: StorageEvent) => {
    if (event.key === ORDER_STORAGE_KEY || event.key === null) listener();
  };

  if (typeof window !== "undefined") window.addEventListener("storage", handleStorage);
  return () => {
    orderListeners.delete(listener);
    if (typeof window !== "undefined") window.removeEventListener("storage", handleStorage);
  };
}

export function saveOrder(order: OrderRecord): boolean {
  const snapshot = JSON.stringify(order);
  memoryOrderSnapshot = snapshot;

  try {
    if (typeof window === "undefined") return false;
    window.localStorage.setItem(ORDER_STORAGE_KEY, snapshot);
  } catch {
    return false;
  }

  orderListeners.forEach((listener) => listener());
  return true;
}
