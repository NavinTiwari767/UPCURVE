import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Minus, Plus } from 'lucide-react';

const Logo = () => {
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);

  const relatedProducts = [
    {
      id: 1,
      name: 'Business Website Design',
      price: '₹14,999',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
      category: 'Web Design'
    },
    {
      id: 2,
      name: 'Blog Website Design',
      price: '₹4,999',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
      category: 'Web Design'
    },
    {
      id: 3,
      name: 'Custom Website Design',
      price: '₹12,999',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop',
      category: 'Web Design'
    },
    {
      id: 4,
      name: 'ECommerce Website Design',
      price: '₹24,999',
      image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=400&h=300&fit=crop',
      category: 'Web Design'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div 
        className="relative w-full h-80 bg-cover bg-center flex flex-col justify-center items-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=500&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Product Details</h1>
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-white text-sm md:text-base flex-wrap justify-center">
          <Link to="/" className="hover:text-purple-300 transition-colors">Home</Link>
          <ChevronRight size={18} />
          <Link to="/services" className="hover:text-purple-300 transition-colors">Products</Link>
          <ChevronRight size={18} />
          <Link to="#" className="hover:text-purple-300 transition-colors">Ahm Services</Link>
          <ChevronRight size={18} />
          <span className="text-purple-300 font-semibold">Logo Design</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          
          {/* Left - Image */}
          <div className="flex items-center justify-center">
            <div className="w-full h-96 bg-blue-100 rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-4xl">▲</span>
                </div>
                <h3 className="text-slate-900 font-bold">YOUR LOGO</h3>
                <p className="text-slate-600 text-xs">Logo Here</p>
              </div>
            </div>
          </div>

          {/* Right - Details */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Logo Design
            </h2>
            
            <p className="text-3xl font-bold text-slate-900 mb-4">₹2,999.00</p>

            <p className="text-slate-600 text-base mb-4 font-semibold text-green-600">
              A Face Your Brand Deserves
            </p>

            <p className="text-slate-700 text-sm mb-6">
              Professional logo design that makes your brand stand out.
            </p>

            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <p className="text-green-700 font-semibold mb-4">✅ Includes:</p>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>3 unique concepts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Unlimited revisions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>High-resolution files</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Transparent PNG + Vector</span>
                </li>
              </ul>
            </div>

            <blockquote className="border-l-4 border-slate-400 pl-4 italic text-slate-700 mb-6 text-sm">
              "Make a lasting first impression"
            </blockquote>

            <div className="flex items-center gap-2 mb-8 text-slate-600 text-sm">
              <span>✓ 48-hour delivery guaranteed</span>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-slate-300 rounded-full">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-slate-100"
                >
                  <Minus size={18} />
                </button>
                <span className="px-6 py-2">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-slate-100"
                >
                  <Plus size={18} />
                </button>
              </div>
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg transition-all">
                Add to cart
              </button>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <p className="text-slate-700 text-sm">
                <span className="font-semibold">Category:</span> <span className="text-slate-600">Ahm Services</span>
              </p>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="border-b border-slate-200 mb-8">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-6 py-4 font-bold transition-all text-sm ${
                activeTab === 'description'
                  ? 'text-purple-600 border-b-4 border-purple-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              DESCRIPTION
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-4 font-bold transition-all text-sm ${
                activeTab === 'reviews'
                  ? 'text-purple-600 border-b-4 border-purple-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              REVIEWS (0)
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'description' && (
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Description</h3>
            
            <h4 className="text-base font-bold text-slate-900 mb-2 text-green-600">A Face Your Brand Deserves</h4>
            
            <div className="bg-green-50 p-6 rounded-lg mb-8">
              <p className="text-green-700 font-semibold mb-4">✅ Includes:</p>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>3 unique concepts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Unlimited revisions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>High-resolution files</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Transparent PNG + Vector</span>
                </li>
              </ul>
            </div>

            <blockquote className="border-l-4 border-slate-400 pl-4 italic text-slate-700 mb-6 text-sm">
              "Make a lasting first impression"
            </blockquote>

            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <span>✓ 48-hour delivery guaranteed</span>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="text-slate-700 py-8">
            <p>No reviews yet. Be the first to review this product!</p>
          </div>
        )}

        {/* Related Products */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-slate-900 mb-12">Related Products</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <div key={product.id} className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="w-full h-48 bg-slate-100 flex items-center justify-center overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="p-4">
                  <p className="text-xs text-slate-600 font-semibold mb-2">{product.category}</p>
                  <h4 className="text-sm font-bold text-slate-900 mb-3 line-clamp-2">
                    {product.name}
                  </h4>
                  <p className="text-slate-900 font-bold mb-3">{product.price}</p>
                  
                  <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white text-sm rounded-full font-semibold hover:shadow-lg transition-all">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;