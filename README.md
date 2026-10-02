# 🍔 BiteRush

BiteRush is a responsive food delivery web application for discovering restaurants, browsing and filtering dishes, managing a shopping cart, and placing an order through a customer details form. Cart and most recent order data are stored in the browser.

## ✨ Features

- Responsive homepage with food categories, featured dishes, restaurant highlights, and offer cards.
- Restaurant listing with restaurant search, cuisine and minimum rating filters, open status filtering, and sorting by rating, delivery time, or delivery fee.
- Food menu with search by dish name, description, or category; category filtering; optional restaurant filtering; and sorting by recommendation, price, rating, or popularity.
- Add dishes to the cart, change quantities, remove items, or clear the cart.
- Cart persistence in localStorage and a cart count displayed in the navigation.
- Checkout form with validation for customer name, phone number, email, delivery address, city, and pincode. Delivery instructions are optional.
- Order confirmation showing the saved order ID, customer and delivery details, ordered items, order date, and stored price totals.
- An empty confirmation state when there is no valid recent order in localStorage.

Orders are saved in the current browser. The project does not include a server-side order database, payment processor, or live delivery tracking.

## 🌐 Live Demo

[Visit Brew & Bloom](https://bite-rush-ashy.vercel.app/)

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js App Router | Application framework, routes, and server/client component structure |
| React | UI components and interactive client-side experiences |
| TypeScript | Type safety for components, data, and order/cart models |
| Tailwind CSS | Responsive styling and design system |
| React Context API | Shared cart state and cart actions |
| LocalStorage | Persistence for the cart and most recent order |

## 📂 Project Structure

```text
biterush/
├── app/
│   ├── cart/
│   ├── checkout/
│   ├── menu/
│   ├── order-success/
│   ├── restaurants/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── cart/
│   ├── checkout/
│   ├── common/
│   ├── food/
│   ├── home/
│   ├── layout/
│   ├── order/
│   └── restaurants/
├── context/
│   └── CartContext.tsx
├── data/
│   ├── categories.ts
│   ├── foodItems.ts
│   ├── offers.ts
│   └── restaurants.ts
├── lib/
│   ├── storage.ts
│   └── utils.ts
├── public/
│   └── images/
├── types/
│   └── index.ts
├── package.json
└── README.md
```

## 🚀 Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## 🧾 Order and Cart Storage

The cart is managed by `CartContext` and persisted by the storage helpers in `lib/storage.ts`. Checkout validates customer details, creates an order record from the current cart and calculated totals, and saves it as the most recent order in localStorage. The order success page reads that record in the browser and shows an empty state if it is missing or invalid.

Restaurant, food, category, and offer content is currently provided by the local TypeScript data files in `data/`.
