import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import './Products.css';


const FAKE_STORE_API = 'https://fakestoreapi.com/products';


export default function Products() {

  const { getCartCount } = useCart();
  
  const [products, setProducts] = useState([]);        
  const [loading, setLoading] = useState(true);       
  const [error, setError] = useState(null);           


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(FAKE_STORE_API);
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();

        const transformedProducts = data.map((product) => ({
          id: product.id,
          name: product.title,
          price: product.price,
          description: product.description,
          image: product.image,
          category: product.category,
          rating: product.rating,
        }));
        
        setProducts(transformedProducts);
      } catch (err) {
        setError(err.message || 'Failed to load products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Our Products</h1>
        <Link to="/cart" className="cart-link">
          🛒 Cart ({getCartCount()})
        </Link>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      )}

      {error && (
        <div className="error-container">
          <p className="error-message">⚠️ Error: {error}</p>
          <p className="error-subtext">Please try refreshing the page</p>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="empty-container">
          <p>No products available</p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
