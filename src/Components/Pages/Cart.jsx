import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Trash2, ShoppingCart, Plus, Minus, ArrowLeft } from 'lucide-react';
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
    updateQuantity(id, quantity);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-blue-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart size={64} className="text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Your Cart is Empty</h1>
          <p className="text-slate-600 mb-8 text-lg">No services added yet. Browse our services and add them to your cart!</p>
          <button
            onClick={() => navigate('/services')}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
          >
            Browse Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/services')}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold mb-6 transition"
          >
            <ArrowLeft size={20} />
            Back to Services
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">Shopping Cart</h1>
          <p className="text-slate-600">You have {cartItems.length} service(s) in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - Left Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-6 border-2 border-slate-200 rounded-xl hover:border-purple-400 transition-all duration-300 group"
                  >
                    {/* Item Details */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-purple-600 transition">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-500 mb-2">{item.category}</p>
                      <p className="text-sm text-slate-600">{item.description?.substring(0, 60)}...</p>
                    </div>

                    {/* Price & Quantity */}
                    <div className="flex items-center gap-6 ml-6">
                      <div className="text-right">
                        <p className="text-sm text-slate-600 mb-1">Price</p>
                        <p className="text-2xl font-bold text-purple-600">₹{item.price}</p>
                      </div>

                      {/* Quantity Control */}
                      <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                          className="p-1 hover:bg-purple-200 rounded transition"
                          title="Decrease quantity"
                        >
                          <Minus size={16} className="text-slate-700" />
                        </button>
                        <span className="w-8 text-center font-bold text-slate-900">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                          className="p-1 hover:bg-purple-200 rounded transition"
                          title="Increase quantity"
                        >
                          <Plus size={16} className="text-slate-700" />
                        </button>
                      </div>

                      {/* Total & Delete */}
                      <div className="text-right">
                        <p className="text-sm text-slate-600 mb-2">Subtotal</p>
                        <p className="text-xl font-bold text-green-600 mb-3">
                          ₹{item.price * (item.quantity || 1)}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition hover:scale-110"
                          title="Remove from cart"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart Button */}
              <button
                onClick={clearCart}
                className="mt-8 w-full px-4 py-2 text-red-600 border-2 border-red-300 rounded-lg hover:bg-red-50 transition font-semibold"
              >
                Clear All Items
              </button>
            </div>
          </div>

          {/* Summary - Right Side */}
          <div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100 sticky top-20">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Order Summary</h2>

              {/* Items Count */}
              <div className="flex justify-between items-center pb-4 border-b-2 border-slate-200 mb-4">
                <p className="text-slate-600">Items ({cartItems.length})</p>
                <p className="font-semibold text-slate-900">
                  {cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)}
                </p>
              </div>

              {/* Subtotal */}
              <div className="flex justify-between items-center pb-4 border-b-2 border-slate-200 mb-4">
                <p className="text-slate-600">Subtotal</p>
                <p className="font-semibold text-slate-900">₹{getTotalPrice()}</p>
              </div>

              {/* Tax (10%) */}
              <div className="flex justify-between items-center pb-4 border-b-2 border-slate-200 mb-6">
                <p className="text-slate-600">Tax (10%)</p>
                <p className="font-semibold text-slate-900">₹{Math.round(getTotalPrice() * 0.1)}</p>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-8 pb-6 border-b-2 border-purple-300">
                <h3 className="text-xl font-bold text-slate-900">Total</h3>
                <p className="text-3xl font-bold text-purple-600">
                  ₹{getTotalPrice() + Math.round(getTotalPrice() * 0.1)}
                </p>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 text-lg"
              >
                Proceed to Checkout
              </button>

              {/* Continue Shopping */}
              <button
                onClick={() => navigate('/services')}
                className="w-full mt-4 px-6 py-3 bg-slate-100 text-slate-900 rounded-xl font-semibold hover:bg-slate-200 transition"
              >
                Continue Shopping
              </button>

              {/* Promo Code */}
              <div className="mt-6 pt-6 border-t-2 border-slate-200">
                <p className="text-sm text-slate-600 mb-3">Have a promo code?</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border-2 border-slate-200 rounded-lg focus:border-purple-500 outline-none"
                  />
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}