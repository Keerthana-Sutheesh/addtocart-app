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
- **Product Metadata**: Display product categories and ratings from API

## Project Structure

```
src/
├── components/
│   ├── ProductCard.jsx        # Individual product component
│   └── ProductCard.css        # Product card styling
├── context/
│   └── CartContext.jsx        # Cart state management & hooks
├── pages/
│   ├── Products.jsx           # Products listing page
│   ├── Products.css           # Products page styling
│   ├── Cart.jsx               # Shopping cart page
│   └── Cart.css               # Cart page styling
├── App.jsx                    # Main app with routing setup
├── App.css                    # Global app styling
├── index.css                  # Global styles
└── main.jsx                   # Application entry point
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

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
   The application will be available at `http://localhost:5173/`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## Usage Guide

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

### CartContext (`src/context/CartContext.jsx`)
Manages global cart state with the following methods:
- `addToCart(product)` - Add product to cart or increase quantity
- `removeFromCart(productId)` - Remove item from cart
- `updateQuantity(productId, quantity)` - Update item quantity
- `clearCart()` - Clear all items
- `getTotalPrice()` - Get sum of all items
- `getCartCount()` - Get total number of items

### useCart Hook
Custom hook to access cart context:
```jsx
const { cartItems, addToCart, removeFromCart, ... } = useCart();
```

## Routing Setup

This application uses **React Router DOM v7** for client-side routing, enabling seamless navigation between pages without page reloads.

### Route Structure

**File:** `src/App.jsx`

```jsx
<CartProvider>
  <Router>
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  </Router>
</CartProvider>
```

### Available Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Products | Browse and add items from store |
| `/cart` | Cart | View, manage, and checkout items |

### Navigation Methods

**1. Products → Cart**
```jsx
// Products.jsx header
<Link to="/cart" className="cart-link">
  🛒 Cart ({getCartCount()})
</Link>
```

**2. Cart → Products**
```jsx
// Cart.jsx header
<Link to="/" className="back-to-products-btn">
  ← Back to Products
</Link>
```

### Key Routing Features

- ✅ **Client-Side Routing**: Instant navigation without page reloads
- ✅ **Cart State Persistence**: Cart data maintained during navigation
- ✅ **Dynamic Links**: Cart count updates in real-time in the link
- ✅ **Clean URLs**: Intuitive route paths (`/` for products, `/cart` for cart)
- ✅ **Responsive**: Works seamlessly on desktop and mobile devices
- ✅ **Context Integration**: CartProvider wraps Router to ensure state availability during navigation

### How Navigation Works

```
1. User clicks "🛒 Cart" link on Products page
   ↓
2. React Router detects route change to "/cart"
   ↓
3. Products component unmounts, Cart component mounts
   ↓
4. CartProvider keeps cart state in memory (not lost)
   ↓
5. Cart page renders with current items
   ↓
6. Browser URL changes to "localhost:5173/cart" (no page reload)
```

## Technologies Used

- **React 19.2** - UI library
- **Vite 7.3** - Build tool and dev server
- **React Router DOM 7.13** - Client-side routing
- **CSS Grid** - Responsive layout
- **Context API** - State management

## Fake Store API Integration

This application uses the **Fake Store API** (https://fakestoreapi.com/) to fetch real product data dynamically.

### API Endpoint
- **Base URL**: `https://fakestoreapi.com`
- **Products Endpoint**: `https://fakestoreapi.com/products`
- **Request Method**: GET
- **No Authentication**: Public API, no API key required
- **Rate Limiting**: None (suitable for development)

### API Response Transformation
The API returns products in the following format, which we transform for our application:

**API Response:**
```json
{
  "id": 1,
  "title": "Product Name",
  "price": 109.95,
  "description": "Product description...",
  "category": "electronics",
  "image": "https://via.placeholder.com/150",
  "rating": {
    "rate": 3.9,
    "count": 120
  }
}
```

**Transformed to Our Format:**
```javascript
{
  id: 1,
  name: "Product Name",           // from "title"
  price: 109.95,
  description: "Product description...",
  image: "https://placeholder.url",
  category: "electronics",         // added metadata
  rating: { rate: 3.9, count: 120 } // added metadata
}
```

### Available Product Categories
The Fake Store API contains products in the following categories:
- Electronics
- Jewelery
- Men's Clothing
- Women's Clothing

### Loading States
The application provides user feedback during API calls:
- **Loading**: Animated spinner while fetching products
- **Success**: Products display in a responsive grid
- **Error**: User-friendly error message if API fails
- **Empty**: Message if no products are returned

### Data Fetching Logic (`src/pages/Products.jsx`)
```javascript
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      // Transform API data to match our structure
      setProducts(transformedData);
    } catch (err) {
      setError(err.message);
    }
  };
  
  fetchProducts();
}, []); // Runs once on component mount
```

### Network Performance
- **Request Time**: Typically 200-500ms on good connections
- **Response Size**: ~50KB for all products
- **Caching**: Can be implemented for better performance
- **Fallback**: Can be enhanced with local cache or fallback data

## How Cart Logic Works

1. **Adding Items**: When you add a product, the context checks if it exists in the cart
   - If it exists: quantity increases by 1
   - If new: adds product with quantity 1

2. **Removing Items**: Clicking "Remove" filters out the item from cart

3. **Quantity Updates**: You can change quantity via controls or direct input

4. **Calculations**: Total price automatically updates based on current items

## Data Flow Architecture

```
API Request (fetch)
      ↓
Loading State (show spinner)
      ↓
Response Processing (transform data)
      ↓
State Update (setProducts)
      ↓
Component Re-render (display products)
      ↓
User Interaction (add to cart)
      ↓
Cart Context Update
      ↓
Cart Count Reflects Change
```

## Product Display Features

Each product card displays:
- **Product Image**: Using `object-fit: contain` for proper image scaling
- **Product Title**: First line is product title from API
- **Description**: Truncated to 100 characters with ellipsis
- **Category Badge**: Color-coded category tag
- **Rating**: Star rating and review count
- **Price**: Highlighted in green with 2 decimal places
- **Add to Cart Button**: Interactive button with hover effects

## Error Handling

The application handles various error scenarios:

1. **Network Errors**: Displayed with user-friendly message
2. **Failed Requests**: shows status error on alert
3. **Missing Data**: Displays "N/A" or defaults for missing fields
4. **Timeout**: User can refresh page to retry

## Responsive Design Breakpoints

- **Desktop** (1024px+): Multi-column grid layout (auto-fill cols)
- **Tablet** (768px-1023px): 2-column layout
- **Mobile** (<768px): Single-column layout

## Tips for Production Use

1. **Add Pagination**: Fake Store API returns ~20 products. Consider paginating for larger datasets
2. **Implement Caching**: Cache API response in localStorage to reduce requests
3. **Error Recovery**: Add retry logic or fallback data
4. **Performance**: Consider infinite scroll for better UX
5. **Search/Filter**: Add category filters using API query parameters
6. **Image Optimization**: Consider lazy loading images (already implemented with `loading="lazy"`)

## Testing the Application

### Test Add to Cart
1. Navigate to Products page (`/`)
2. Wait for products to load from API
3. Click "Add to Cart" on any product
4. See cart count update in the header
5. Repeat with different products

### Test Cart Management
1. Go to Cart page
2. Adjust quantities or remove items
3. See totals update in real-time
4. Return to Products and continue shopping

### Test Error Handling
1. Turn off internet connection (open DevTools → Network → Offline)
2. Refresh page to see error message
3. Turn internet back on and refresh to recover

## Future Enhancements

- **Search functionality** - Filter products by name
- **Category filtering** - Filter by product category from API
- **Sort options** - Sort by price, rating, or popularity
- **Product details page** - Detailed view with full description
- **Wishlist functionality** - Save favorites to localStorage
- **Payment integration** - Stripe/PayPal checkout
- **Order history** - Store completed orders in localStorage
- **User authentication** - Login/registration system
- **Pagination** - Load products in batches
- **Advanced filtering** - Price range, rating filters
- **Reviews section** - User-submitted reviews
- **Inventory management** - Track stock levels

## Scripts Available

```bash
npm run dev       # Start development server


## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for learning and development purposes.

## Author

Created as a demonstration of React Router DOM and e-commerce functionality.

