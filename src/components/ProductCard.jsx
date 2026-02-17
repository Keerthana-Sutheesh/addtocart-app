import { useCart } from '../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product }) {

  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  const truncateDescription = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{truncateDescription(product.description)}</p>
        {product.category && (
          <p className="product-category">Category: {product.category}</p>
        )}
        {product.rating && (
          <p className="product-rating">
            ⭐ Rating: {product.rating.rate || 'N/A'} ({product.rating.count || 0} reviews)
          </p>
        )}
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
