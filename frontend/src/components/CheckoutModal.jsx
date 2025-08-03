import React, { useState } from 'react';
import { X, CreditCard, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ordersAPI } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const CheckoutModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1); // 1: shipping, 2: payment, 3: confirmation
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    paymentMethod: 'credit_card'
  });

  const { items, totalAmount, clearCart } = useCart();
  const { isAuthenticated, token } = useAuth();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitShipping = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        paymentMethod: formData.paymentMethod
      };

      const response = await ordersAPI.createOrder(token, orderData);
      setOrder(response.data.order);
      clearCart();
      setStep(3);
    } catch (error) {
      console.error('Order creation failed:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setOrder(null);
    setFormData({
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      paymentMethod: 'credit_card'
    });
    onClose();
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay fade-in" onClick={handleClose}>
      <div className="modal-content slide-up max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {step === 1 && 'Shipping Information'}
              {step === 2 && 'Payment & Review'}
              {step === 3 && 'Order Confirmed'}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {!isAuthenticated ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Please log in to checkout</p>
              <button onClick={handleClose} className="btn-primary">
                Close
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Your cart is empty</p>
              <button onClick={handleClose} className="btn-primary">
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Step 1: Shipping */}
              {step === 1 && (
                <form onSubmit={handleSubmitShipping} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                        placeholder="State"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                        placeholder="12345"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="input-field"
                      >                        
                      <option value="United States">India</option>

                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="w-full btn-primary">
                    Continue to Payment
                  </button>
                </form>
              )}

              {/* Step 2: Payment & Review */}
              {step === 2 && (
                <div className="space-y-6">
                  {/* Order Summary */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {items.map((cartItem) => (
                        <div key={cartItem._id} className="flex justify-between items-center py-2">
                          <div className="flex-1">
                            <p className="font-medium">{cartItem.item.name}</p>
                            <p className="text-sm text-gray-500">
                              Qty: {cartItem.quantity} × {formatPrice(cartItem.item.price)}
                            </p>
                          </div>
                          <span className="font-semibold">
                            {formatPrice(cartItem.item.price * cartItem.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-primary-500">{formatPrice(totalAmount)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="credit_card"
                          checked={formData.paymentMethod === 'credit_card'}
                          onChange={handleInputChange}
                          className="text-primary-500"
                        />
                        <CreditCard className="h-5 w-5 text-gray-400" />
                        <span>Credit Card</span>
                      </label>
                      <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="debit_card"
                          checked={formData.paymentMethod === 'debit_card'}
                          onChange={handleInputChange}
                          className="text-primary-500"
                        />
                        <CreditCard className="h-5 w-5 text-gray-400" />
                        <span>Debit Card</span>
                      </label>
                      <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="paypal"
                          checked={formData.paymentMethod === 'paypal'}
                          onChange={handleInputChange}
                          className="text-primary-500"
                        />
                        <span>Cash On Delivery</span>
                      </label>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 btn-secondary"
                    >
                      Back to Shipping
                    </button>
                    <button
                      onClick={handleSubmitOrder}
                      disabled={loading}
                      className="flex-1 btn-primary"
                    >
                      {loading ? <LoadingSpinner size="small" /> : 'Place Order'}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {step === 3 && order && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-success-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Order Confirmed!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Order #{order.orderNumber}
                  </p>
                  <p className="text-gray-600 mb-6">
                    Thank you for your purchase. You'll receive a confirmation email shortly.
                  </p>
                  <button onClick={handleClose} className="btn-primary">
                    Continue Shopping
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;