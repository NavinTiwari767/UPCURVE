import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Heart, MessageCircle, Phone } from 'lucide-react';

const Business = () => {
  const [activeTab, setActiveTab] = useState('description');
  const navigate = useNavigate();

  const relatedProducts = [
    {
      id: 1,
      name: 'Personal Website Design',
      price: '₹2,999',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
      category: 'Web Design'
    },
    {
      id: 2,
      name: 'Blog Website Design',
      price: '₹4,999',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
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
      name: 'Logo Design',
      price: '₹2,999',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
      category: 'Design'
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
        className="relative w-full h-80 bg-cover bg-center flex flex-col justify-center items-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=500&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Business Website Design</h1>
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-white text-sm md:text-base flex-wrap justify-center">
          <Link to="/" className="hover:text-purple-300 transition-colors">Home</Link>
          <ChevronRight size={18} />
          <Link to="/services" className="hover:text-purple-300 transition-colors">Services</Link>
          <ChevronRight size={18} />
          <span className="text-orange-300 font-semibold">Business Website Design</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          
          {/* Left - Image */}
          <div className="flex items-center justify-center">
            <div className="w-full h-96 bg-slate-100 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop" 
                alt="Business Website Design"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right - Details */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Business Website Design
            </h2>
            
            <p className="text-slate-600 text-base mb-4 font-semibold text-green-600">
              Your 24/7 Sales Representative
            </p>

            <p className="text-slate-700 text-sm mb-6">
              For small businesses needing credibility and leads. Get a professional website that works for you 24/7.
            </p>

            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <p className="text-green-700 font-semibold mb-4">✅ What You Get:</p>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>5-7 pages (Home, Services, Gallery, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Contact forms & Google Maps integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Speed optimization for better performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>WhatsApp chat integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Mobile responsive design</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>SEO friendly structure</span>
                </li>
              </ul>
            </div>

            <blockquote className="border-l-4 border-green-400 pl-4 italic text-slate-700 mb-6 text-sm bg-green-50 py-3">
              "Impress clients and outshine competitors with a professional online presence"
            </blockquote>

            {/* Contact Us Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleContactClick}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 flex items-center justify-center gap-3 group hover:scale-105"
              >
                <MessageCircle size={20} />
                <span>Get Free Consultation</span>
              </button>
              
              <a 
                href="https://wa.me/919876543210" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-3 group hover:scale-105"
              >
                <Phone size={20} />
                <span>WhatsApp Now</span>
              </a>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <p className="text-slate-700 text-sm mb-3">
                <span className="font-semibold">Service Type:</span> <span className="text-slate-600">Business Website Design</span>
              </p>
              <p className="text-slate-700 text-sm">
                <span className="font-semibold">Delivery Time:</span> <span className="text-slate-600">7-10 Business Days</span>
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
                <h4 className="text-lg font-bold text-slate-900 mb-4">Why Choose Our Business Website Design?</h4>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <span>Professional design that builds trust with customers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <span>Mobile responsive - works perfectly on all devices</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <span>Fast loading speed for better user experience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <span>SEO optimized to help you rank on Google</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-4">Perfect For:</h4>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3">
                    <Heart size={16} className="text-red-500 mt-1" />
                    <span>Small businesses looking to establish online presence</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Heart size={16} className="text-red-500 mt-1" />
                    <span>Startups needing a professional website</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Heart size={16} className="text-red-500 mt-1" />
                    <span>Local businesses wanting to attract more customers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Heart size={16} className="text-red-500 mt-1" />
                    <span>Professionals showcasing their services</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 p-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-200 text-center">
              <h4 className="text-2xl font-bold text-slate-900 mb-4">Ready to Get Started?</h4>
              <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
                Contact us today for a free consultation and custom quote for your business website.
              </p>
              <button
                onClick={handleContactClick}
                className="px-10 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-3 mx-auto group hover:scale-105"
              >
                <MessageCircle size={20} />
                <span>Contact Us Now</span>
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
                Be the first to share your experience with our Business Website Design service.
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
                  q: "How long does it take to complete a business website?",
                  a: "Typically 7-10 business days from the time we receive all required content and information."
                },
                {
                  q: "Do I need to provide content and images?",
                  a: "Yes, we request you to provide text content and images. We can also help with stock images if needed."
                },
                {
                  q: "Can I make changes after the website is completed?",
                  a: "Yes, we provide 2 rounds of revisions after the initial design is presented."
                },
                {
                  q: "Will my website be mobile-friendly?",
                  a: "Absolutely! All our websites are fully responsive and work perfectly on mobile, tablet, and desktop devices."
                },
                {
                  q: "Do you provide hosting and domain?",
                  a: "We can help you purchase domain and hosting, or you can use your existing ones."
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
              className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-2 group"
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
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate(`/${product.name.toLowerCase().includes('logo') ? 'logo' : 
                              product.name.toLowerCase().includes('personal') ? 'personal' :
                              product.name.toLowerCase().includes('blog') ? 'blog' :
                              product.name.toLowerCase().includes('custom') ? 'custom' : 'services'}`);
                    }}
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

export default Business;