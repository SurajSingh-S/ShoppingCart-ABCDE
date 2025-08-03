import React, { useState } from 'react';
import { Star, ShoppingCart, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ item, onAuthRequired }) => {
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    setIsAdding(true);

    const result = await addToCart(item._id, 1);
    
    if (result.requiresAuth) {
      onAuthRequired();
    }

    setIsAdding(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="card group">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!item.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
        <div className="absolute top-2 left-2">
          <span className="badge bg-primary-100 text-primary-700">
            {item.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Brand */}
        <p className="text-sm text-gray-500 mb-1">{item.brand}</p>
        
        {/* Name */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {item.name}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {item.description}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          <div className="flex">
            {renderStars(item.rating)}
          </div>
          <span className="text-sm text-gray-500">
            {item.rating} ({item.reviews})
          </span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(item.price)}
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={!item.inStock || isAdding}
            className={`
              flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${item.inStock 
                ? 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
              ${isAdding ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {isAdding ? (
              <div className="loading-spinner h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <ShoppingCart className="h-4 w-4" />
            )}
            <span>{isAdding ? 'Adding...' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;