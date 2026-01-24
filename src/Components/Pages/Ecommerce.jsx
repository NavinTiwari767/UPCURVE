import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ShoppingBag, CreditCard, Truck, Shield, MessageCircle, Phone } from 'lucide-react';

const Ecommerce = () => {
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
      name: 'Custom Website Design',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop',
      category: 'Web Design'
    },
    {
      id: 3,
      name: 'Logo Design',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
      category: 'Design'
    },
    {
      id: 4,
      name: 'Personal Website',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
      category: 'Web Design'
    }
  ];

  const features = [
    { icon: <ShoppingBag size={20} />, title: 'Product Management', desc: 'Easy to add/edit products' },
    { icon: <CreditCard size={20} />, title: 'Secure Payments', desc: 'Multiple payment options' },
    { icon: <Truck size={20} />, title: 'Order Tracking', desc: 'Real-time order updates' },
    { icon: <Shield size={20} />, title: 'SSL Security', desc: 'Safe & secure transactions' }
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
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1200&h=500&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">ECommerce Website Design</h1>
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-white text-sm md:text-base flex-wrap justify-center">
          <Link to="/" className="hover:text-purple-300 transition-colors">Home</Link>
          <ChevronRight size={18} />
          <Link to="/services" className="hover:text-purple-300 transition-colors">Services</Link>
          <ChevronRight size={18} />
          <span className="text-orange-300 font-semibold">ECommerce Website</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          
          {/* Left - Image */}
          <div className="flex items-center justify-center">
            <div className="w-full h-96 bg-slate-100 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=500&h=400&fit=crop" 
                alt="ECommerce Website Design"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right - Details */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              ECommerce Website Design
            </h2>
            
            <p className="text-slate-600 text-base mb-4 font-semibold text-green-600">
              Sell Online Like a Pro
            </p>

            <p className="text-slate-700 text-sm mb-6">
              Launch your online store with zero technical hassle. Perfect for businesses wanting to sell products online.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-purple-600">
                      {feature.icon}
                    </div>
                    <h4 className="font-semibold text-slate-900 text-sm">{feature.title}</h4>
                  </div>
                  <p className="text-slate-600 text-xs">{feature.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <p className="text-green-700 font-semibold mb-4">✅ What's Included:</p>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>10-15 product listings with categories</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Secure payment gateway integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Mobile-responsive design for all devices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Order tracking and management system</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Basic SEO setup for better visibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Admin panel for easy management</span>
                </li>
              </ul>
            </div>

            <blockquote className="border-l-4 border-green-400 pl-4 italic text-slate-700 mb-6 text-sm bg-green-50 py-3">
              "From products to profits – we handle the tech so you can focus on selling"
            </blockquote>

            {/* Contact Us Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleContactClick}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center gap-3 group hover:scale-105"
              >
                <MessageCircle size={20} />
                <span>Get Custom Quote</span>
              </button>
              
              <a 
                href="https://wa.me/919876543210" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 flex items-center justify-center gap-3 group hover:scale-105"
              >
                <Phone size={20} />
                <span>WhatsApp Inquiry</span>
              </a>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <p className="text-slate-700 text-sm mb-3">
                <span className="font-semibold">Service Type:</span> <span className="text-slate-600">ECommerce Website Development</span>
              </p>
              <p className="text-slate-700 text-sm">
                <span className="font-semibold">Delivery Time:</span> <span className="text-slate-600">10-15 Business Days</span>
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
              onClick={() => setActiveTab('benefits')}
              className={`px-6 py-4 font-bold transition-all text-sm ${
                activeTab === 'benefits'
                  ? 'text-purple-600 border-b-4 border-purple-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              BENEFITS
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
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Complete ECommerce Solution</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-4">Why Choose Our ECommerce Solution?</h4>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <span>Professional online store that builds customer trust</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <span>Secure payment processing with multiple options</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <span>Mobile-first design for maximum reach</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <span>Easy product management system</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-4">Ideal For:</h4>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3">
                    <ShoppingBag size={16} className="text-purple-600 mt-1" />
                    <span>Retail businesses going online</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ShoppingBag size={16} className="text-purple-600 mt-1" />
                    <span>Boutiques and fashion stores</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ShoppingBag size={16} className="text-purple-600 mt-1" />
                    <span>Electronics and gadget sellers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ShoppingBag size={16} className="text-purple-600 mt-1" />
                    <span>Handmade and craft businesses</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 p-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-200 text-center">
              <h4 className="text-2xl font-bold text-slate-900 mb-4">Start Selling Online Today!</h4>
              <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
                Get a complete eCommerce solution tailored to your business needs. Contact us for a free consultation.
              </p>
              <button
                onClick={handleContactClick}
                className="px-10 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-3 mx-auto group hover:scale-105"
              >
                <MessageCircle size={20} />
                <span>Schedule Free Consultation</span>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'benefits' && (
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Benefits of Our ECommerce Solution</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-purple-300 transition-all">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <ShoppingBag size={24} className="text-purple-600" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">24/7 Sales</h4>
                <p className="text-slate-600 text-sm">Your store works round the clock, generating sales even while you sleep.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-purple-300 transition-all">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CreditCard size={24} className="text-green-600" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Secure Payments</h4>
                <p className="text-slate-600 text-sm">Multiple payment options with complete security and encryption.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-purple-300 transition-all">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Truck size={24} className="text-blue-600" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Easy Management</h4>
                <p className="text-slate-600 text-sm">User-friendly admin panel to manage products, orders, and customers.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h3>
            
            <div className="space-y-6">
              {[
                {
                  q: "How many products can I list on my eCommerce website?",
                  a: "Our standard package includes 10-15 products. We can customize for more products based on your needs."
                },
                {
                  q: "Do you integrate payment gateways?",
                  a: "Yes, we integrate popular payment gateways like Razorpay, PayPal, and others as per your requirement."
                },
                {
                  q: "Can I manage products and orders myself?",
                  a: "Yes, we provide an easy-to-use admin panel where you can manage everything without technical knowledge."
                },
                {
                  q: "Will my eCommerce site be mobile-friendly?",
                  a: "Absolutely! Our designs are fully responsive and work perfectly on mobile, tablet, and desktop devices."
                },
                {
                  q: "Do you provide maintenance after launch?",
                  a: "Yes, we offer maintenance packages to keep your store updated and secure."
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
                              product.name.toLowerCase().includes('business') ? 'business' :
                              product.name.toLowerCase().includes('custom') ? 'custom' :
                              product.name.toLowerCase().includes('personal') ? 'personal' : 'services'}`);
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

export default Ecommerce;