import React, { useEffect, useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Loader } from 'lucide-react';
import { supabase } from '../../services/supabase';
import { CartContext } from '../../context/CartContext';

const Services = () => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [isVisible, setIsVisible] = useState({});
  const [counts, setCounts] = useState({
    projects: 0,
    clients: 0,
    team: 0,
    awards: 0
  });
  const [imageErrors, setImageErrors] = useState({});
  const [imageLoading, setImageLoading] = useState({});
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const observerRefs = useRef([]);
  const hasAnimated = useRef(false);

  // Portfolio images with backup URLs
  const portfolioImages = [
    { 
      type: 'Designer Portfolio', 
      img: 'photo-1517694712202-14dd9538aa97',
      fallback: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    { 
      type: 'Logo Design', 
      img: 'photo-1626785774573-4b799315345d',
      fallback: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    { 
      type: 'Business Website', 
      img: 'photo-1460925895917-afdab827c52f',
      fallback: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    { 
      type: 'E-commerce', 
      img: 'photo-1472851294608-062f824d29cc',
      fallback: 'https://images.pexels.com/photos/633409/pexels-photo-633409.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    { 
      type: 'Social Media', 
      img: 'photo-1611926653458-09294b3142bf',
      fallback: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  // Fallback services
  const fallbackServices = [
    {
      id: 1,
      number: '01',
      category: 'CUSTOMIZATION',
      title: 'WordPress & Marketing',
      description: 'We believe that great design should not be our download will start automatically in 3 to 5 seconds',
      color: 'from-purple-400 to-purple-600',
      price: 5999
    },
    {
      id: 2,
      number: '02',
      category: 'ENERGY & ENVIRONMENT',
      title: 'Business Solutions',
      description: 'We believe that great design should not be our download will start automatically in 3 to 5 seconds',
      color: 'from-purple-400 to-purple-600',
      price: 7999
    },
    {
      id: 3,
      number: '03',
      category: 'FINANCIAL SERVICE',
      title: 'Digital Marketing',
      description: 'We believe that great design should not be our download will start automatically in 3 to 5 seconds',
      color: 'from-blue-400 to-blue-600',
      price: 9999
    }
  ];

  const technologies = [
    { name: 'WEB DESIGN', icon: 'E', color: 'from-pink-500 to-pink-600' },
    { name: 'HTML 5', icon: '5', color: 'from-orange-500 to-orange-600' },
    { name: 'WORDPRESS', icon: 'W', color: 'from-blue-600 to-blue-700' },
    { name: 'REACT', icon: '⚛', color: 'from-cyan-400 to-cyan-500' },
    { name: 'CSS 3', icon: '3', color: 'from-blue-500 to-blue-600' },
    { name: 'JAVASCRIPT', icon: 'JS', color: 'from-yellow-400 to-yellow-500' }
  ];

  const partners = [
    'VOIO', 'Jubilant', 'Agency Vista', 'MIU', 'UERY'
  ];

  // Fetch services from Supabase
  const fetchServices = async () => {
    try {
      setServicesLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.error('❌ Error fetching services:', error.message);
        setServices(fallbackServices);
        return;
      }

      console.log('✅ Services fetched:', data);
      
      if (data && data.length > 0) {
        const servicesWithPrice = data.map(service => ({
          ...service,
          price: service.price || 5999
        }));
        setServices(servicesWithPrice);
      } else {
        console.log('⚠️ No services in database, using fallback');
        setServices(fallbackServices);
      }
    } catch (err) {
      console.error('❌ Supabase connection error:', err);
      setServices(fallbackServices);
    } finally {
      setServicesLoading(false);
    }
  };

  // Handle service click - Add to cart
  const handleServiceClick = (service) => {
    const cartItem = {
      id: service.id,
      title: service.title,
      category: service.category,
      price: service.price || 5999,
      number: service.number,
      description: service.description
    };

    addToCart(cartItem);
    
    // Show notification
    setNotificationMessage(`✅ ${service.title} added to cart!`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);

    console.log('🛒 Added to cart:', cartItem);
  };

  // Image loading handlers
  const handleImageError = (imgId) => {
    console.log(`Photo load nahi hua: ${imgId}`);
    setImageErrors(prev => ({ ...prev, [imgId]: true }));
  };

  const handleImageLoad = (imgId) => {
    setImageLoading(prev => ({ ...prev, [imgId]: true }));
  };

  // Get optimized image URL
  const getImageUrl = (item) => {
    if (imageErrors[item.img]) {
      return item.fallback;
    }
    return `https://images.unsplash.com/${item.img}?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80`;
  };

  const handleGetStarted = () => {
    window.scrollTo(0, 0);
    navigate('/contact');
  };

  // Fetch services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  // Intersection Observer setup
  useEffect(() => {
    const observers = [];
    
    observerRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(prev => ({ ...prev, [index]: true }));
              
              // Counter animation trigger
              if (index === 5 && !hasAnimated.current) {
                hasAnimated.current = true;
                animateCounter('projects', 22594);
                animateCounter('clients', 5100);
                animateCounter('team', 233);
                animateCounter('awards', 250);
              }
            }
          },
          { threshold: 0.1 }
        );
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const animateCounter = (key, target) => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCounts(prev => ({ ...prev, [key]: target }));
        clearInterval(timer);
      } else {
        setCounts(prev => ({ ...prev, [key]: Math.floor(current) }));
      }
    }, duration / steps);
  };

  const addToRefs = (el, index) => {
    if (el && !observerRefs.current.includes(el)) {
      observerRefs.current[index] = el;
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-white via-purple-50 to-blue-50">
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-6 right-6 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg animate-pulse">
          {notificationMessage}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=600&q=80"
            alt="Services"
            className="w-full h-full object-cover"
            onError={() => handleImageError('hero')}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-slate-900/50"></div>
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
            Services
          </h1>
          <div className="flex items-center gap-2 text-white animate-slide-up">
            <span 
              onClick={() => {
                window.scrollTo(0, 0);
                navigate('/');
              }}
              className="hover:text-purple-400 transition-colors cursor-pointer"
            >
              Home
            </span>
            <span>→</span>
            <span className="text-purple-400">Services</span>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={el => addToRefs(el, 0)}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 ${
              isVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            {portfolioImages.map((item, idx) => (
              <div 
                key={idx}
                className={`relative rounded-2xl overflow-hidden shadow-xl border border-purple-200 group h-64 transition-all duration-700 ${
                  isVisible[0] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ transitionDelay: isVisible[0] ? `${idx * 100}ms` : '0ms' }}
              >
                {!imageLoading[item.img] && !imageErrors[item.img] && (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                    <Loader className="w-8 h-8 text-purple-500 animate-spin" />
                  </div>
                )}

                <img 
                  src={getImageUrl(item)}
                  alt={item.type}
                  className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                    imageLoading[item.img] ? 'opacity-100' : 'opacity-0'
                  }`}
                  onError={() => handleImageError(item.img)}
                  onLoad={() => handleImageLoad(item.img)}
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-semibold text-lg">{item.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Creative Services Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={el => addToRefs(el, 1)}
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible[1] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
          >
            <p className="text-sm font-semibold text-purple-600 tracking-widest mb-4">⚡ WELCOME AXIM</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Full Creative Services<br />For You
            </h2>
            <p className="text-slate-600 mt-4">Showing {services.length} services</p>
          </div>

          {/* Services List - Database se data */}
          {servicesLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader className="w-12 h-12 text-purple-600 animate-spin" />
            </div>
          ) : (
            <div className="space-y-6">
              {services && services.length > 0 ? (
                services.map((service, idx) => (
                  <div 
                    key={service.id}
                    className={`bg-gradient-to-r from-purple-50 to-white rounded-2xl p-8 border-2 border-purple-200 hover:border-purple-400 transition-all duration-500 hover:shadow-xl group opacity-100 translate-x-0`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      {/* Number Circle */}
                      <div className="md:col-span-2">
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color || 'from-purple-400 to-purple-600'} text-white flex items-center justify-center text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform`}>
                          {service.number}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="md:col-span-5">
                        <p className="text-xs font-semibold text-purple-600 tracking-widest mb-2">{service.category}</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-purple-600 mb-2">{service.title}</h3>
                        <p className="text-slate-600 mb-3">{service.description}</p>
                        <p className="text-2xl font-bold text-green-600">₹{service.price || 5999}</p>
                      </div>

                      {/* Clickable Section - ADD TO CART */}
                      <div className="md:col-span-5 flex flex-col items-center justify-center gap-4">
                        <button
                          onClick={() => handleServiceClick(service)}
                          className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-all duration-300 cursor-pointer hover:shadow-lg shadow-lg"
                          title="Add to Cart"
                        >
                          <ShoppingCart size={28} className="text-white" />
                        </button>
                        
                        {/* Google Rating */}
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                          <span className="text-2xl">G</span>
                          <div>
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <p className="text-xs text-slate-600">4.8 Rating</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-600">No services found</p>
                </div>
              )}
            </div>
          )}

          {/* See Services Button */}
          <div 
            ref={el => addToRefs(el, 5)}
            className={`text-center mt-12 transition-all duration-1000 ${
              isVisible[5] ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <button 
              onClick={handleGetStarted}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-2 mx-auto group hover:scale-105"
            >
              <span>SEE SERVICES</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Partners Logo Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-12">
            {partners.map((partner, idx) => (
              <div 
                key={idx}
                className="text-2xl font-bold text-slate-400 hover:text-slate-600 transition-colors"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* We Provide Better Service Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side */}
            <div 
              ref={el => addToRefs(el, 6)}
              className={`transition-all duration-1000 ${
                isVisible[6] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
              }`}
            >
              <p className="text-sm font-semibold text-purple-600 tracking-widest mb-4">⚡ OUR BEST SERVICES</p>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                We Provide<br />Better Service?
              </h2>
              <p className="text-slate-700 mb-8 leading-relaxed">
                We believe that great design should not be out of reach, so our but Services are less than half the price of a full-time designer
              </p>

              <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 border-2 border-purple-200 mb-8">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <img 
                      src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400"
                      alt="Work completed"
                      className="w-24 h-24 rounded-2xl object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/400x400?text=Work+Completed';
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-2">Work Completed</p>
                    <h3 className="text-5xl font-bold text-purple-600 mb-1">
                      {counts.projects.toLocaleString()}+
                    </h3>
                    <p className="text-slate-500">Projects done successfully</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleGetStarted}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-2 group hover:scale-105"
              >
                <span>GET STARTED</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            {/* Right Side - Technologies */}
            <div 
              ref={el => addToRefs(el, 7)}
              className={`transition-all duration-1000 delay-300 ${
                isVisible[7] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
              }`}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {technologies.map((tech, idx) => (
                  <div 
                    key={idx}
                    className={`bg-white rounded-2xl p-8 border-2 border-purple-100 hover:border-purple-400 transition-all duration-500 hover:shadow-xl text-center group hover:scale-105 opacity-100 translate-y-0`}
                  >
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${tech.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                      {tech.icon}
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">{tech.name}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        .animate-slide-up {
          animation: slideUp 1s ease-out 0.3s backwards;
        }
      `}</style>
    </div>
  );
};

export default Services;