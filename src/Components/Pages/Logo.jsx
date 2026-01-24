import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, MessageCircle, Phone } from 'lucide-react';

const Logo = () => {
  const [activeTab, setActiveTab] = useState('description');
  const navigate = useNavigate();

  const relatedProducts = [
    {
      id: 1,
      name: 'Business Website Design',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
      category: 'Web Design'
    },
    {
      id: 2,
      name: 'Blog Website Design',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
      category: 'Web Design'
    },
    {
      id: 3,
      name: 'Custom Website Design',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop',
      category: 'Web Design'
    },
    {
      id: 4,
      name: 'ECommerce Website Design',
      image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=400&h=300&fit=crop',
      category: 'Web Design'
    }
  ];

  const handleContactClick = () => {
    window.scrollTo(0, 0);
    navigate('/contact');
  };

  const handleServicesClick = () => {
    window.scrollTo(0, 0);
    navigate('/services');
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div 
        className="relative w-full h-80 bg-cover bg-center flex flex-col justify-center items-center px-4"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=500&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 text-center drop-shadow-lg">Logo Design</h1>
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-white text-sm md:text-base flex-wrap justify-center bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
          <Link to="/" className="hover:text-purple-300 transition-colors font-medium">Home</Link>
          <ChevronRight size={18} />
          <Link to="/services" className="hover:text-purple-300 transition-colors font-medium">Services</Link>
          <ChevronRight size={18} />
          <span className="text-orange-300 font-bold">Logo Design</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          
          {/* Left - Image */}
          <div className="flex items-center justify-center">
            <div className="w-full h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <span className="text-white text-5xl font-bold">A</span>
                </div>
                <h3 className="text-slate-900 font-bold text-xl">YOUR LOGO</h3>
                <p className="text-slate-600 text-sm">Professional Design</p>
              </div>
            </div>
          </div>

          {/* Right - Details */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Logo Design
            </h2>

            <p className="text-slate-600 text-base mb-4 font-semibold text-green-600">
              A Face Your Brand Deserves
            </p>

            <p className="text-slate-700 text-sm mb-6">
              Professional logo design that makes your brand stand out. Get a unique, memorable logo that represents your business perfectly.
            </p>

            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <p className="text-green-700 font-semibold mb-4">✅ What You Get:</p>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>3 unique logo concepts to choose from</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Unlimited revisions until you're satisfied</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>High-resolution files (PNG, JPG)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Vector files (AI, EPS, SVG)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Transparent background versions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Social media ready formats</span>
                </li>
              </ul>
            </div>

            <blockquote className="border-l-4 border-green-400 pl-4 italic text-slate-700 mb-6 text-sm bg-green-50 py-3">
              "Make a lasting first impression with a logo that defines your brand"
            </blockquote>

            {/* Contact Us Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleContactClick}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center gap-3 group hover:scale-105"
              >
                <MessageCircle size={20} />
                <span>Get Your Logo</span>
              </button>
              
              <a 
                href="https://wa.me/919876543210" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 flex items-center justify-center gap-3 group hover:scale-105"
              >
                <Phone size={20} />
                <span>WhatsApp Now</span>
              </a>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <p className="text-slate-700 text-sm mb-3">
                <span className="font-semibold">Service Type:</span> <span className="text-slate-600">Logo Design</span>
              </p>
              <p className="text-slate-700 text-sm">
                <span className="font-semibold">Delivery Time:</span> <span className="text-slate-600">2-3 Business Days</span>
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
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-6 py-4 font-bold transition-all text-sm ${
                activeTab === 'faq'
                  ? 'text-purple-600 border-b-4 border-purple-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              FAQ
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'description' && (
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Service Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-4">Why Choose Our Logo Design?</h4>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <span>Unique designs tailored to your brand identity</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <span>Multiple concepts to choose from</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <span>Professional designers with years of experience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <span>Fast turnaround time - 48-72 hours</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-4">Perfect For:</h4>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mt-1">
                      <span className="text-purple-600 text-sm">★</span>
                    </div>
                    <span>New businesses launching their brand</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mt-1">
                      <span className="text-purple-600 text-sm">★</span>
                    </div>
                    <span>Companies rebranding their image</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mt-1">
                      <span className="text-purple-600 text-sm">★</span>
                    </div>
                    <span>Entrepreneurs and freelancers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mt-1">
                      <span className="text-purple-600 text-sm">★</span>
                    </div>
                    <span>Online stores and eCommerce brands</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 p-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-200 text-center">
              <h4 className="text-2xl font-bold text-slate-900 mb-4">Ready for Your Brand Identity?</h4>
              <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
                Contact us today and let's create a logo that perfectly represents your brand and vision.
              </p>
              <button
                onClick={handleContactClick}
                className="px-10 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-3 mx-auto group hover:scale-105"
              >
                <MessageCircle size={20} />
                <span>Start Your Logo Project</span>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="text-slate-700 py-8">
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
                <MessageCircle size={40} className="text-slate-400" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-4">No Reviews Yet</h4>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                Be the first to share your experience with our Logo Design service.
              </p>
              <button
                onClick={handleContactClick}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Share Your Experience
              </button>
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h3>
            
            <div className="space-y-6">
              {[
                {
                  q: "How many logo concepts will I receive?",
                  a: "You'll receive 3 unique logo concepts to choose from. You can select one and request unlimited revisions."
                },
                {
                  q: "What file formats will I receive?",
                  a: "You'll get high-resolution PNG, JPG, and vector files (AI, EPS, SVG) with transparent backgrounds."
                },
                {
                  q: "How long does the design process take?",
                  a: "Typically 2-3 business days from receiving your brand information and requirements."
                },
                {
                  q: "Can I request changes to the logo?",
                  a: "Yes! We offer unlimited revisions until you're completely satisfied with the final design."
                },
                {
                  q: "Do you provide copyright ownership?",
                  a: "Yes, once the project is completed, you own full rights to use your logo anywhere."
                }
              ].map((faq, index) => (
                <div key={index} className="border border-slate-200 rounded-lg p-6 hover:border-purple-300 transition-all">
                  <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm">
                      Q
                    </span>
                    {faq.q}
                  </h4>
                  <p className="text-slate-700 pl-9">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        <div className="mt-20">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900">Explore Our Other Services</h3>
            <button
              onClick={handleServicesClick}
              className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-2 group transition-colors"
            >
              View All Services
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <div key={product.id} className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="w-full h-48 bg-slate-100 flex items-center justify-center overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
                
                <div className="p-4">
                  <p className="text-xs text-slate-600 font-semibold mb-2">{product.category}</p>
                  <h4 className="text-sm font-bold text-slate-900 mb-3 line-clamp-2">
                    {product.name}
                  </h4>
                  
                  <button 
                    onClick={handleServicesClick}
                    className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white text-sm rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105"
                  >
                    Learn More
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