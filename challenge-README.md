# Challenge README

**Ideally, please build out your solution in the same directory as this challenge-README.md file.**

*If necessary, please add any notes here that will help the reviewer run or understand your solution.*


# 🛒 Shopping Basket Challenge

This project implements a simple shopping basket interface using **Angular 18**, designed to interact with mock product data stored locally. The application fulfills all challenge requirements, including two primary views (Product List and Basket Checkout), state management, form validation, and responsive UI with Tailwind CSS.

---

## ✅ Features

### 🛍 Product List View
- Displays list of available products (name, description, price).
- Add and remove products to/from the basket.
- Quantity is capped by each product’s `basketLimit`.
- Live display of basket item count and total price.
- Proceed to Checkout button.

### 🧾 Basket Checkout View
- View and modify quantities of selected items.
- Display unit and total cost per product.
- Validate credit card input (must be exactly 16 digits).
- Checkout confirmation and return to product list.
- Remove all of a product from the basket.
- Total cost and quantity updates in real-time.

---

## ⚙️ Technologies Used

- **Angular 18** (standalone components)
- **TypeScript**
- **RxJS** (via `BehaviorSubject` for state management)
- **Tailwind CSS** (via CDN for simplicity)
- **Local JSON** (loaded from `src/assets/data/products_sample.json`)

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```
---

### 2. Run the Application

```bash
ng server
```
