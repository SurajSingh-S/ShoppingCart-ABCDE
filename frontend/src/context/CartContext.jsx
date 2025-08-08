import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_CART':
      return {
        ...state,
        items: action.payload.items || [],
        totalAmount: action.payload.totalAmount || 0,
        loading: false
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'CLEAR_CART':
      return { ...state, items: [], totalAmount: 0 };
    case 'SET_PENDING_ITEM':
      return { ...state, pendingItem: action.payload };
    case 'CLEAR_PENDING_ITEM':
      return { ...state, pendingItem: null };
    default:
      return state;
  }
};

const initialState = {
  items: [],
  totalAmount: 0,
  loading: false,
  error: null,
  pendingItem: null
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { isAuthenticated, token } = useAuth();

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchCart();
    } else {
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [isAuthenticated, token]);

  const fetchCart = async () => {
    if (!token) return;

    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await cartAPI.getCart(token);
      dispatch({ type: 'SET_CART', payload: response.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error fetching cart' });
    }
  };

  const addToCart = async (itemId, quantity = 1) => {
    if (!token) {
      dispatch({ type: 'SET_PENDING_ITEM', payload: { itemId, quantity } });
      return { requiresAuth: true };
    }

    try {
      const response = await cartAPI.addToCart(token, itemId, quantity);
      dispatch({ type: 'SET_CART', payload: response.data.cart });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error adding item to cart' });
      return { success: false, error: error.response?.data?.message };
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (!token) return;

    try {
      const response = await cartAPI.updateQuantity(token, itemId, quantity);
      dispatch({ type: 'SET_CART', payload: response.data.cart });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error updating cart' });
    }
  };

  const removeFromCart = async (itemId) => {
    if (!token) return;

    try {
      const response = await cartAPI.removeFromCart(token, itemId);
      dispatch({ type: 'SET_CART', payload: response.data.cart });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error removing item from cart' });
    }
  };



  const clearCart = async () => {
    if (!token) {
      dispatch({ type: 'CLEAR_CART' });
      return;
    }

    try {
      await cartAPI.clearCart(token);
    } catch (error) {
      console.error('Error clearing cart from backend:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Error clearing cart' });
    }

    dispatch({ type: 'CLEAR_CART' });
  };




  const processPendingItem = async () => {
    if (state.pendingItem && token) {
      const result = await addToCart(state.pendingItem.itemId, state.pendingItem.quantity);
      dispatch({ type: 'CLEAR_PENDING_ITEM' });
      return result;
    }
  };

  const getCartCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    ...state,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    fetchCart,
    processPendingItem,
    getCartCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};