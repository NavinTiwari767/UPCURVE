import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { ShoppingCart, CreditCard, Truck } from 'lucide-react';

const Checkout = () => {
  const { cartItems, getCartTotal } = useContext(CartContext);
  
  const total = getCartTotal();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <ShoppingCart size={24} />
                Order Summary
              </h2>
              
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-4 border-b">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-slate-600 text-sm">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">₹{item.price * item.quantity}</p>
                </div>
              ))}
              
              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>

            {/* Payment & Shipping forms can be added here */}
            
          </div>

          {/* Order Total */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CreditCard size={24} />
                Payment
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹0</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹0</span>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
                
                <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all mt-6">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;