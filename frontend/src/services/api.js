import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const authAPI = {
  login: (email, password) => 
    api.post('/auth/login', { email, password }),
  
  register: (name, email, password) => 
    api.post('/auth/register', { name, email, password }),
  
  logout: (token) => 
    api.post('/auth/logout', {}, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  getProfile: (token) => 
    api.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
};

export const itemsAPI = {
  getAll: (category = '', search = '') => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    return api.get(`/items?${params.toString()}`);
  },
  
  getById: (id) => 
    api.get(`/items/${id}`)
};

export const cartAPI = {
  getCart: (token) => 
    api.get('/cart', {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  addToCart: (token, itemId, quantity) => 
    api.post('/cart/add', { itemId, quantity }, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  updateQuantity: (token, itemId, quantity) => 
    api.put('/cart/update', { itemId, quantity }, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  removeFromCart: (token, itemId) => 
    api.delete(`/cart/remove/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  clearCart: (token) => 
    api.delete('/cart/clear', {
      headers: { Authorization: `Bearer ${token}` }
    })
};

export const ordersAPI = {
  createOrder: (token, orderData) => 
    api.post('/orders', orderData, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  getOrders: (token) => 
    api.get('/orders', {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  getOrder: (token, orderId) => 
    api.get(`/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
};

export default api;