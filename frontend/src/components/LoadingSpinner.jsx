import React from 'react';

const LoadingSpinner = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'h-4 w-4 border-2',
    medium: 'h-8 w-8 border-2',
    large: 'h-12 w-12 border-3'
  };

  return (
    <div className={`loading-spinner border-primary-500 border-t-transparent rounded-full ${sizeClasses[size]} ${className}`} />
  );
};

export default LoadingSpinner;