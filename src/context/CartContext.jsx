import { createContext, useState, useContext } from 'react';

/**
 * CartContext - Global state management for shopping cart
 * 
 * This Context provides cart functionality throughout the application
 * without prop drilling. All cart-related state and functions are
 * managed here and accessible via the useCart() hook.
 */
const CartContext = createContext();

/**
 * CartProvider Component
 * 
 * Provides cart state and functions to all child components.
 * Wrap this around Router in App.jsx to make cart available everywhere.
 * 
 * @param {React.ReactNode} children - Child components to wrap
 * @returns {JSX.Element} Provider with all cart functionality
 */
export function CartProvider({ children }) {
  // State: Array of items in the shopping cart
  const [cartItems, setCartItems] = useState([]);

  /**
   * Add product to cart or increment quantity if already exists
   * 
   * Behavior:
   * - If product already in cart: increase quantity by 1
   * - If new product: add with quantity 1
   * 
   * @param {Object} product - Product to add (with id, name, price, image, etc.)
   */
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Increase quantity if already in cart
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  /**
   * Remove product completely from cart
   * 
   * @param {number} productId - ID of product to remove
   */
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  /**
   * Update quantity of item in cart
   * 
   * Smart logic:
   * - If quantity <= 0: automatically removes item
   * - Otherwise: updates item quantity
   * 
   * @param {number} productId - ID of product to update
   * @param {number} quantity - New quantity (must be >= 1 or item is removed)
   */
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  /**
   * Clear all items from cart
   * Resets cart to empty state
   */
  const clearCart = () => {
    setCartItems([]);
  };

  /**
   * Calculate total price of all items in cart
   * 
   * Formula: Sum of (price × quantity) for each item
   * 
   * @returns {number} Total price before discounts/tax
   */
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  /**
   * Get total number of items in cart (including quantities)
   * 
   * Example: 2 items with qty 1 and 3 = cart count of 4
   * 
   * @returns {number} Total quantity of all items in cart
   */
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/**
 * Custom Hook: useCart
 * 
 * Access cart state and functions from anywhere in the application.
 * Must be used within a component wrapped by CartProvider.
 * 
 * Usage in component:
 * const { cartItems, addToCart, removeFromCart, getCartCount } = useCart();
 * 
 * @returns {Object} Cart context value with all functions and state
 * @throws {Error} If used outside CartProvider
 */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
