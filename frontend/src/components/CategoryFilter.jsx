import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const formatCategoryName = (category) => {
    return category === 'all' ? 'All Products' : category;
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${selectedCategory === category
              ? 'bg-primary-500 text-white shadow-md'
              : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
            }
          `}
        >
          {formatCategoryName(category)}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;