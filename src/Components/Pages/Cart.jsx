import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Trash2, ShoppingCart, Plus, Minus, ArrowLeft, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    // TODO: Integrate with Razorpay/Stripe
    alert('Proceeding to payment... (Payment integration coming soon)');
    // navigate('/payment');
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    updateQuantity(id, quantity);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-blue-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <ShoppingCart size={64} className="text-purple-500" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Your Cart is Empty</h1>
          <p className="text-slate-600 mb-8 text-lg">No services added yet. Browse our services and add them to your cart!</p>
          <button
            onClick={() => navigate('/services')}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300"
          >
            Browse Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-blue-50 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <button
            onClick={() => navigate('/services')}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold mb-4 sm:mb-6 transition hover:translate-x-[-4px] duration-300"
          >
            <ArrowLeft size={20} />
            Back to Services
          </button>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-2">Shopping Cart</h1>
          <p className="text-slate-600 text-lg">You have {cartItems.length} service(s) in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items - Left Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border border-purple-100">
              <div className="space-y-4 sm:space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 border-2 border-slate-100 rounded-xl hover:border-purple-300 transition-all duration-300 bg-gradient-to-r from-white to-purple-50/30"
                  >
                    {/* Item Details */}
                    <div className="flex-1 mb-4 sm:mb-0">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Tag size={24} className="text-purple-500" />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 hover:text-purple-600 transition">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-500 mb-2 bg-purple-100 text-purple-700 px-2 py-1 rounded-full inline-block">
                            {item.category}
                          </p>
                          <p className="text-sm text-slate-600 line-clamp-2">{item.description?.substring(0, 80)}...</p>
                        </div>
                      </div>
                    </div>

                    {/* Price, Quantity & Actions */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                      {/* Price Display */}
                      <div className="text-center sm:text-right">
                        <p className="text-xs text-slate-600 mb-1">Price</p>
                        <p className="text-xl font-bold text-purple-600">₹{item.price}</p>
                      </div>

                      {/* Quantity Control */}
                      <div className="flex items-center justify-between sm:justify-center gap-4">
                        <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-2 border border-slate-200">
                          <button
                            onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-purple-100 rounded transition"
                            title="Decrease quantity"
                          >
                            <Minus size={16} className="text-slate-700" />
                          </button>
                          <span className="w-8 text-center font-bold text-slate-900 text-lg">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-purple-100 rounded transition"
                            title="Increase quantity"
                          >
                            <Plus size={16} className="text-slate-700" />
                          </button>
                        </div>

                        {/* Subtotal */}
                        <div className="text-center">
                          <p className="text-xs text-slate-600 mb-1">Subtotal</p>
                          <p className="text-lg font-bold text-green-600">
                            ₹{item.price * (item.quantity || 1)}
                          </p>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition hover:scale-110"
                          title="Remove from cart"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart Button */}
              <button
                onClick={clearCart}
                className="mt-6 sm:mt-8 w-full px-4 py-3 text-red-600 border-2 border-red-200 rounded-lg hover:bg-red-50 transition font-semibold flex items-center justify-center gap-2"
              >
                <Trash2 size={18} />
                Clear All Items
              </button>
            </div>
          </div>

          {/* Order Summary - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-purple-100 sticky top-24">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <ShoppingCart size={24} />
                Order Summary
              </h2>

              {/* Summary Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                  <p className="text-slate-600">Items ({cartItems.length})</p>
                  <p className="font-semibold text-slate-900">
                    {cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)}
                  </p>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                  <p className="text-slate-600">Subtotal</p>
                  <p className="font-semibold text-slate-900">₹{getTotalPrice()}</p>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                  <p className="text-slate-600">Tax (10%)</p>
                  <p className="font-semibold text-slate-900">₹{Math.round(getTotalPrice() * 0.1)}</p>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pt-4 border-t border-purple-300">
                  <h3 className="text-xl font-bold text-slate-900">Total Amount</h3>
                  <p className="text-2xl md:text-3xl font-bold text-purple-600">
                    ₹{getTotalPrice() + Math.round(getTotalPrice() * 0.1)}
                  </p>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 text-lg mb-4"
              >
                Proceed to Checkout
              </button>

              {/* Continue Shopping */}
              <button
                onClick={() => navigate('/services')}
                className="w-full px-6 py-3 bg-gradient-to-r from-slate-100 to-slate-50 text-slate-900 rounded-xl font-semibold hover:bg-slate-200 transition border border-slate-200"
              >
                Continue Shopping
              </button>

              {/* Promo Code */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-sm text-slate-600 mb-3 flex items-center gap-2">
                  <Tag size={16} />
                  Have a promo code?
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    className="flex-1 px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                  />
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:shadow-md transition font-semibold whitespace-nowrap">
                    Apply
                  </button>
                </div>
              </div>

              {/* Security Info */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-700 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Secure checkout • SSL encrypted
                </p>
                <p className="text-xs text-green-600 mt-1">Your payment information is protected</p>
              </div>
            </div>
          </div>
        </div>

        {/* Need Help Section */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Need Help?</h3>
          <p className="text-slate-600 mb-4">Our support team is here to help you with your order.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-4 py-2 border-2 border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition font-medium">
              Contact Support
            </button>
            <button className="px-4 py-2 border-2 border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition font-medium">
              View FAQs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}