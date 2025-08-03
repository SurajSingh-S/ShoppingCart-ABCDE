import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ items, onAuthRequired }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <ProductCard 
          key={item._id} 
          item={item} 
          onAuthRequired={onAuthRequired}
        />
      ))}
    </div>
  );
};

export default ProductGrid;