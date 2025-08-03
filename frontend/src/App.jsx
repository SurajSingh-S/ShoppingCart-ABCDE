import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import HomePage from './components/HomePage';
import AuthModal from './components/AuthModal';
import CartModal from './components/CartModal';
import CheckoutModal from './components/CheckoutModal';
import { useModal } from './hooks/useModal';

function App() {
  const authModal = useModal();
  const cartModal = useModal();
  const checkoutModal = useModal();

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Header 
            onAuthClick={authModal.open}
            onCartClick={cartModal.open}
            onCheckoutClick={checkoutModal.open}
          />
          <main>
            <HomePage onAuthRequired={authModal.open} />
          </main>
          
          <AuthModal isOpen={authModal.isOpen} onClose={authModal.close} />
          <CartModal isOpen={cartModal.isOpen} onClose={cartModal.close} />
          <CheckoutModal isOpen={checkoutModal.isOpen} onClose={checkoutModal.close} />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;