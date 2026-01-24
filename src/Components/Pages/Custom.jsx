import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, MessageCircle, Phone, Zap } from 'lucide-react';

const Custom = () => {
  const [activeTab, setActiveTab] = useState('description');
  const navigate = useNavigate();

  const relatedProducts = [
    {
      id: 1,
      name: 'ECommerce Website Design',
      image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=400&h=300&fit=crop',
      category: 'Web Design'
    },
    {
      id: 2,
      name: 'Logo Design',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
      category: 'Design'
    },
    {
      id: 3,
      name: 'Blog Website Design',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
      category: 'Web Design'
    },
    {
      id: 4,
      name: 'Business Website Design',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
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
      {/* Hero Section with Breadcrumb */}
      <div 
        className="relative w-full h-80 bg-cover bg-center flex flex-col justify-center items-center px-4"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=500&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 text-center drop-shadow-lg">Custom Website Design</h1>
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-white text-sm md:text-base flex-wrap justify-center bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
          <Link to="/" className="hover:text-purple-300 transition-colors font-medium">Home</Link>
          <ChevronRight size={18} />
          <Link to="/services" className="hover:text-purple-300 transition-colors font-medium">Services</Link>
          <ChevronRight size={18} />
          <span className="text-orange-300 font-bold">Custom Website Design</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          
          {/* Left - Image */}
          <div className="flex items-center justify-center">
            <div className="w-full h-96 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=400&fit=crop" 
                alt="Custom Website Design"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right - Details */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Custom Website Design
            </h2>
            
            <p className="text-slate-600 text-base mb-4 font-semibold text-purple-600">
              Tailored to Your Exact Needs
            </p>

            <p className="text-slate-700 text-sm mb-6">
              Enterprise-grade custom solutions for complex projects. Get exactly what you need, built the way you want it.
            </p>

            <div className="bg-purple-50 p-4 rounded-lg mb-6 border border-purple-100">
              <p className="text-purple-700 font-semibold mb-4">🚀 Perfect For:</p>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>SaaS platforms with advanced features</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Membership sites with user portals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Web applications with custom functionality</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Enterprise websites with integrations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Complex booking and management systems</span>
                </li>
              </ul>
            </div>

            <blockquote className="border-l-4 border-purple-400 pl-4 italic text-slate-700 mb-6 text-sm bg-purple-50 py-3">
              "Your vision, our code – let's build something extraordinary together"
            </blockquote>

            {/* Contact Us Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleContactClick}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center gap-3 group hover:scale-105"
              >
                <MessageCircle size={20} />
                <span>Free Strategy Call</span>
              </button>
              
              <a 
                href="https://wa.me/919876543210" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 flex items-center justify-center gap-3 group hover:scale-105"
              >
                <Phone size={20} />
                <span>WhatsApp Us</span>
              </a>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <p className="text-slate-700 text-sm mb-3">
                <span className="font-semibold">Service Type:</span> <span className="text-slate-600">Custom Web Development</span>
              </p>
              <p className="text-slate-700 text-sm">
                <span className="font-semibold">Delivery Time:</span> <span className="text-slate-600">Based on Project Scope</span>
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
              onClick={() => setActiveTab('process')}
              className={`px-6 py-4 font-bold transition-all text-sm ${
                activeTab === 'process'
                  ? 'text-purple-600 border-b-4 border-purple-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              PROCESS
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
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Complete Custom Solution</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-4">Why Choose Custom Development?</h4>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mt-1">
                      <span className="text-purple-600 text-sm">✓</span>
                    </div>
                    <span>Built exactly to your specifications</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mt-1">
                      <span className="text-purple-600 text-sm">✓</span>
                    </div>
                    <span>Scalable architecture for future growth</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mt-1">
                      <span className="text-purple-600 text-sm">✓</span>
                    </div>
                    <span>Advanced features and integrations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mt-1">
                      <span className="text-purple-600 text-sm">✓</span>
                    </div>
                    <span>Dedicated development team</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-4">What's Included:</h4>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3">
                    <Zap size={16} className="text-blue-600 mt-1" />
                    <span>Detailed project planning and wireframes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap size={16} className="text-blue-600 mt-1" />
                    <span>Custom UI/UX design</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap size={16} className="text-blue-600 mt-1" />
                    <span>Full-stack development</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap size={16} className="text-blue-600 mt-1" />
                    <span>API integrations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap size={16} className="text-blue-600 mt-1" />
                    <span>Testing and quality assurance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap size={16} className="text-blue-600 mt-1" />
                    <span>Deployment and training</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 p-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-200 text-center">
              <h4 className="text-2xl font-bold text-slate-900 mb-4">Ready to Build Your Dream Project?</h4>
              <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
                Let's discuss your requirements and create a custom solution that perfectly fits your business needs.
              </p>
              <button
                onClick={handleContactClick}
                className="px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-3 mx-auto group hover:scale-105"
              >
                <MessageCircle size={20} />
                <span>Schedule Free Consultation</span>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'process' && (
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Our Development Process</h3>
            
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Discovery & Planning",
                  desc: "We understand your requirements, goals, and create a detailed project roadmap."
                },
                {
                  step: "2",
                  title: "Design & Prototyping",
                  desc: "Custom UI/UX design and interactive prototypes for your approval."
                },
                {
                  step: "3",
                  title: "Development",
                  desc: "Our expert team builds your solution using the latest technologies."
                },
                {
                  step: "4",
                  title: "Testing & QA",
                  desc: "Rigorous testing to ensure everything works perfectly."
                },
                {
                  step: "5",
                  title: "Launch & Support",
                  desc: "Smooth deployment and ongoing support for your success."
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-4 p-6 bg-white border border-slate-200 rounded-lg hover:border-purple-300 transition-all">
                  <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h3>
            
            <div className="space-y-6">
              {[
                {
                  q: "How much does a custom website cost?",
                  a: "Custom projects vary based on requirements. We'll provide a detailed quote after understanding your needs during the free consultation."
                },
                {
                  q: "How long does custom development take?",
                  a: "Timeline depends on project complexity. Simple projects take 4-6 weeks, while complex applications may take 3-6 months."
                },
                {
                  q: "What technologies do you use?",
                  a: "We use modern tech stacks including React, Node.js, Python, and more based on your project requirements."
                },
                {
                  q: "Do you provide ongoing support?",
                  a: "Yes, we offer maintenance packages to keep your website updated, secure, and running smoothly."
                },
                {
                  q: "Can you integrate with third-party services?",
                  a: "Absolutely! We can integrate payment gateways, CRMs, APIs, and other third-party services as needed."
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
                    className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105"
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

export default Custom;