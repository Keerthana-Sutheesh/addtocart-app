# Add to Cart Router App

A modern e-commerce application built with React, Vite, and React Router DOM. This application demonstrates proper routing, state management, real-time API integration, and shopping cart functionality using the Fake Store API.

## Features

- **Real API Integration**: Fetches live product data from Fake Store API
- **Product Listing**: Browse real products with images, descriptions, prices, categories, and ratings
- **Shopping Cart**: Add/remove items and manage quantities
- **React Router DOM**: Client-side routing between Products and Cart pages
- **Context API**: Global state management for cart items
- **Loading & Error States**: User-friendly feedback during data fetching
- **Responsive Design**: Mobile-friendly UI with CSS Grid and Flexbox
- **Real-time Cart Count**: Visual indicator showing the number of items in cart
- **Product**: Display product categories and ratings from API



## Installation & Setup

### Prerequisites
- Node.js
- npm

### Steps

1. **Clone or navigate to the project**
   ```bash
   cd addtocart-routerapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev

   ```


### Products Page (`/`)
- View all available products in a responsive grid
- Click "Add to Cart" to add items to your shopping cart
- Cart count badge updates in real-time
- Click the cart icon to go to the shopping cart

### Cart Page (`/cart`)
- View all items in your cart with images and details
- Adjust quantities using +/- buttons or by typing
- Remove individual items from the cart
- View order summary with subtotal, tax, and total
- Clear entire cart with one click
- Go back to products to continue shopping

## Core Components

### CartContext 
Manages global cart state with the following methods:
- `addToCart(product)` - Add product to cart or increase quantity
- `removeFromCart(productId)` - Remove item from cart
- `updateQuantity(productId, quantity)` - Update item quantity
- `clearCart()` - Clear all items
- `getTotalPrice()` - Get sum of all items
- `getCartCount()` - Get total number of items


## Fake Store API Integration

This application uses the **Fake Store API** (https://fakestoreapi.com/) to fetch real product data dynamically.

### API Endpoint
- **Base URL**: `https://fakestoreapi.com`
- **Products Endpoint**: `https://fakestoreapi.com/products`
- **Request Method**: GET
- **No Authentication**: Public API, no API key required


## How Cart Logic Works

1. **Adding Items**: When you add a product, the context checks if it exists in the cart
   - If it exists: quantity increases by 1
   - If new: adds product with quantity 1

2. **Removing Items**: Clicking "Remove" filters out the item from cart

3. **Quantity Updates**: You can change quantity via controls or direct input

4. **Calculations**: Total price automatically updates based on current items





