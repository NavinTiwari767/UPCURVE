import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Heart } from 'lucide-react';

const Custom = () => {
  const [activeTab, setActiveTab] = useState('description');

  const relatedProducts = [
    {
      id: 1,
      name: 'ECommerce Website Design',
      price: '₹9,999',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop',
      category: 'Web Design'
    },
    {
      id: 2,
      name: 'Logo Design',
      price: '₹999',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
      category: 'Design'
    },
    {
      id: 3,
      name: 'Blog Website Design',
      price: '₹4,999',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
      category: 'Web Design'
    },
    {
      id: 4,
      name: 'Custom Website Design',
      price: '₹12,999',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop',
      category: 'Web Design'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section with Breadcrumb */}
      <div 
        className="relative w-full h-80 bg-cover bg-center flex flex-col justify-center items-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=500&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Product Details</h1>
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-white text-sm md:text-base">
          <Link to="/" className="hover:text-purple-300 transition-colors">Home</Link>
          <ChevronRight size={18} />
          <Link to="/services" className="hover:text-purple-300 transition-colors">Products</Link>
          <ChevronRight size={18} />
          <Link to="#" className="hover:text-purple-300 transition-colors">Ahm Services</Link>
          <ChevronRight size={18} />
          <span className="text-purple-300 font-semibold">Custom Website Design</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          
          {/* Left - Image */}
          <div className="flex items-center justify-center">
            <div className="w-full h-96 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=400&fit=crop" 
                alt="Custom Website Design"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right - Details */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Custom Website Design
            </h2>
            
            <p className="text-slate-600 text-lg mb-6 font-semibold">
              Tailored to Your Exact Needs
            </p>

            <p className="text-slate-700 mb-6">
              For complex projects like:
            </p>

            <ul className="space-y-3 mb-8 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold">•</span>
                <span>SaaS platforms</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold">•</span>
                <span>Membership sites</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold">•</span>
                <span>Web apps</span>
              </li>
            </ul>

            <blockquote className="border-l-4 border-purple-600 pl-4 mb-8 italic text-slate-700">
              "Your vision, our code – let's build something extraordinary"
            </blockquote>

            <div className="flex items-center gap-2 mb-8 text-pink-500">
              <Heart size={18} className="fill-pink-500" />
              <span>Book a free strategy call</span>
            </div>

            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all mb-8">
              Contact Us
            </button>

            <div className="border-t border-slate-200 pt-6">
              <p className="text-slate-700">
                <span className="font-semibold">Category:</span> <span className="text-purple-600">Ahm Services</span>
              </p>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="border-b border-slate-200 mb-8">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-6 py-4 font-semibold transition-all ${
                activeTab === 'description'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              DESCRIPTION
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-4 font-semibold transition-all ${
                activeTab === 'reviews'
                  ? 'text-purple-600 border-b-2 border-purple-600'
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
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Description</h3>
            
            <div className="mb-8">
              <h4 className="text-lg font-bold text-slate-900 mb-3">Tailored to Your Exact Needs</h4>
              <p className="text-slate-700 mb-4">For complex projects like</p>
              
              <ul className="space-y-2 text-slate-700 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>SaaS platforms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Membership sites</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Web apps</span>
                </li>
              </ul>

              <blockquote className="border-l-4 border-purple-600 pl-4 italic text-slate-700 mb-6">
                "Your vision, our code – let's build something extraordinary"
              </blockquote>

              <div className="flex items-center gap-2 text-blue-600 text-sm">
                <span>💬 WhatsApp us for a free consultation</span>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg">
              <h4 className="text-lg font-bold text-slate-900 mb-4">✅ Includes:</h4>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>5-7 pages (Home, Services, Gallery, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Contact forms & Google Maps</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Speed optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>WhatsApp chat integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>2 design revisions</span>
                </li>
              </ul>
              <blockquote className="mt-4 border-l-4 border-blue-600 pl-4 italic text-slate-700">
                "Impress clients and outshine competitors"
              </blockquote>
              <div className="mt-4 text-blue-600 text-sm">
                💬 WhatsApp us for a free consultation
              </div>
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
                <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="p-4">
                  <p className="text-xs text-purple-600 font-semibold mb-2">{product.category}</p>
                  <h4 className="text-sm font-bold text-slate-900 mb-3 line-clamp-2">
                    {product.name}
                  </h4>
                  <p className="text-purple-600 font-bold mb-3">{product.price}</p>
                  
                  <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm rounded-full font-semibold hover:shadow-lg transition-all">
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

export default Custom;