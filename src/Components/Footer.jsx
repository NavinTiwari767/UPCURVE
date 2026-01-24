import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  Heart,
  ChevronRight,
  Shield,
  LogOut,
  User,
  Lock
} from 'lucide-react';
import { getSession, signOut } from '../services/auth';

const Footer = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [isVisible, setIsVisible] = useState({});

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '#' },
    { name: 'Team', href: '#' },
    { name: 'Contact', href: '/contact' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  // Policy links that navigate to /policy with hash
  const policyLinks = [
    { 
      name: 'Privacy Policy', 
      href: '/policy#privacy',
      onClick: () => {
        window.scrollTo(0, 0);
        navigate('/policy#privacy');
      }
    },
    { 
      name: 'Terms of Service', 
      href: '/policy#terms',
      onClick: () => {
        window.scrollTo(0, 0);
        navigate('/policy#terms');
      }
    },
    { 
      name: 'Cookies', 
      href: '/policy#cookies',
      onClick: () => {
        window.scrollTo(0, 0);
        navigate('/policy#cookies');
      }
    }
  ];

  // Additional policy links for bottom section
  const additionalPolicyLinks = [
    { 
      name: 'Refund & Returns Policy', 
      href: '/policy#refund',
      onClick: () => {
        window.scrollTo(0, 0);
        navigate('/policy#refund');
      }
    },
    { 
      name: 'Shipping & Delivery Policy', 
      href: '/policy#shipping',
      onClick: () => {
        window.scrollTo(0, 0);
        navigate('/policy#shipping');
      }
    }
  ];

  // Services with specific routes
  const servicesWithRoutes = [
    { 
      name: 'Custom Website Design', 
      route: '/custom' 
    },
    { 
      name: 'Business Website Design', 
      route: '/business' 
    },
    { 
      name: 'ECommerce Website Design', 
      route: '/ecommerce' 
    },
    { 
      name: 'Logo Design', 
      route: '/logo'
    }
  ];

  useEffect(() => {
    checkAuth();
    
    // Animation trigger on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.dataset.index]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe sections
    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const checkAuth = async () => {
    try {
      const result = await getSession();
      if (result?.session) {
        setIsLoggedIn(true);
        setUser(result.session.user);
      }
    } catch (error) {
      console.log('Auth check failed:', error);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const handleServicesClick = () => {
    window.scrollTo(0, 0);
    navigate('/services');
  };

  const handleServiceClick = (route) => {
    window.scrollTo(0, 0);
    navigate(route);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full overflow-hidden">
      <footer className="bg-gradient-to-br from-white via-purple-50 to-blue-50 pt-16 pb-8 px-4 border-t border-purple-200">
        <div className="max-w-7xl mx-auto">

          {/* Newsletter Section with Animation */}
          <div 
            data-animate
            data-index="0"
            className={`mb-16 transform transition-all duration-1000 ${
              isVisible[0] 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-10 scale-95'
            }`}
          >
            <div className="bg-gradient-to-r from-purple-100/40 via-blue-100/40 to-cyan-100/40 rounded-2xl p-8 md:p-12 border border-purple-300 shadow-lg hover:shadow-xl transition-shadow duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                    Stay Updated With Latest Marketing Trends
                  </h3>
                  <p className="text-slate-700">
                    Subscribe to our newsletter and get exclusive insights delivered to your inbox.
                  </p>
                </div>
                <div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="flex-1 px-6 py-4 bg-white border border-purple-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    />
                    <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-full font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-300 group">
                      <span>Subscribe</span>
                      <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                  <p className="text-slate-600 text-sm mt-4">
                    By subscribing, you agree to our <span 
                      onClick={() => {
                        handleScrollToTop();
                        navigate('/policy#privacy');
                      }}
                      className="text-purple-600 hover:text-purple-700 cursor-pointer font-medium"
                    >
                      Privacy Policy
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Links Grid with Staggered Animation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Company Info */}
            <div 
              data-animate
              data-index="1"
              className={`transform transition-all duration-1000 delay-100 ${
                isVisible[1] 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="mb-4 transform hover:scale-105 transition-transform duration-300 inline-block">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">↑ UpCurve</h2>
                <p className="text-xs font-semibold text-purple-500">Media</p>
              </div>
              <p className="text-slate-700 mb-6">
                We are a premier digital marketing agency dedicated to transforming businesses.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <a 
                      key={i} 
                      href={s.href} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center hover:bg-purple-200 transition-all duration-300 hover:scale-110 hover:shadow-md transform ${
                        isVisible[1] ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                      }`}
                      style={{ transitionDelay: isVisible[1] ? `${i * 100}ms` : '0ms' }}
                    >
                      <Icon size={18} className="text-purple-600" />
                    </a>
                  );
                })}
              </div>

              {/* Additional Policy Links */}
              <div className="mt-8 pt-6 border-t border-purple-200">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Important Policies</h4>
                <div className="space-y-2">
                  {additionalPolicyLinks.map((policy, i) => (
                    <div 
                      key={i}
                      className={`text-sm transform transition-all duration-500 ${
                        isVisible[1] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
                      }`}
                      style={{ transitionDelay: isVisible[1] ? `${i * 100 + 400}ms` : '0ms' }}
                    >
                      <button
                        onClick={policy.onClick}
                        className="text-slate-600 hover:text-purple-600 transition-colors flex items-center gap-2 group w-full text-left"
                      >
                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        <span className="group-hover:translate-x-1 transition-transform">{policy.name}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div 
              data-animate
              data-index="2"
              className={`transform transition-all duration-1000 delay-200 ${
                isVisible[2] 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-10'
              }`}
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ChevronRight className="text-purple-600 animate-pulse" /> 
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((l, i) => (
                  <li 
                    key={i}
                    className={`transform transition-all duration-500 ${
                      isVisible[2] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
                    }`}
                    style={{ transitionDelay: isVisible[2] ? `${i * 100 + 200}ms` : '0ms' }}
                  >
                    <Link 
                      to={l.href} 
                      onClick={handleScrollToTop}
                      className="text-slate-700 hover:text-purple-600 transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      <span className="group-hover:translate-x-1 transition-transform">{l.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div 
              data-animate
              data-index="3"
              className={`transform transition-all duration-1000 delay-300 ${
                isVisible[3] 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-10'
              }`}
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ChevronRight className="text-purple-600 animate-pulse" /> 
                Our Services
              </h3>
              <ul className="space-y-3 mb-4">
                {servicesWithRoutes.map((service, i) => (
                  <li 
                    key={i}
                    className={`transform transition-all duration-500 ${
                      isVisible[3] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
                    }`}
                    style={{ transitionDelay: isVisible[3] ? `${i * 100 + 300}ms` : '0ms' }}
                  >
                    <div 
                      className="text-slate-700 hover:text-purple-600 transition-colors cursor-pointer flex items-center gap-2 group"
                      onClick={() => handleServiceClick(service.route)}
                    >
                      <span className="w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      <span className="group-hover:translate-x-1 transition-transform">{service.name}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                onClick={handleServicesClick}
                className={`text-purple-600 hover:text-purple-700 font-semibold text-sm flex items-center gap-1 transition-all transform hover:translate-x-2 duration-300 mt-4 ${
                  isVisible[3] ? 'opacity-100' : 'opacity-0'
                }`}
              >
                VIEW ALL SERVICES <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Contact */}
            <div 
              data-animate
              data-index="4"
              className={`transform transition-all duration-1000 delay-400 ${
                isVisible[4] 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-10'
              }`}
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ChevronRight className="text-purple-600 animate-pulse" /> 
                Contact Us
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <Phone size={16} className="text-purple-600" />
                  </div>
                  <a href="tel:+917991647990" className="text-slate-700 hover:text-purple-600 transition-colors">
                    +91 79916 47990
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <Mail size={16} className="text-purple-600" />
                  </div>
                  <a href="mailto:info@upcurvemedia.com" className="text-slate-700 hover:text-purple-600 transition-colors">
                    info@upcurvemedia.com
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <MapPin size={16} className="text-purple-600" />
                  </div>
                  <p className="text-slate-700">Kolkata, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section with Floating Animation */}
          <div 
            data-animate
            data-index="5"
            className={`pt-8 border-t border-purple-200 transform transition-all duration-1000 delay-500 ${
              isVisible[5] 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Copyright */}
              <div className={`transform transition-all duration-700 ${
                isVisible[5] ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}>
                <p className="text-slate-700 text-sm">
                  © {new Date().getFullYear()} UpCurve Media Pvt Ltd. All rights reserved.
                </p>
              </div>

              {/* Policy Links Only */}
              <div className={`flex items-center gap-4 text-sm transform transition-all duration-700 delay-100 ${
                isVisible[5] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}>
                {policyLinks.map((item, i) => (
                  <button
                    key={i}
                    onClick={item.onClick}
                    className="text-slate-600 hover:text-purple-600 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-500 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Made with love - Floating Animation */}
            <div 
              className={`text-center mt-8 text-sm text-slate-600 flex justify-center items-center gap-2 transform transition-all duration-1000 delay-700 ${
                isVisible[5] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <span>Made with</span>
              <Heart size={14} className="text-pink-500 fill-pink-500 animate-heartbeat" /> 
              <span>by</span>
              <button
                onClick={handleScrollToTop}
                className="font-semibold text-purple-600 hover:text-purple-700 transition-colors"
              >
                WebCros Team
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        @keyframes bounceSubtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        @keyframes pulseSubtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        @keyframes dropdown {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-heartbeat {
          animation: heartbeat 1.5s infinite;
        }

        .animate-bounce-subtle {
          animation: bounceSubtle 2s infinite;
        }

        .animate-pulse-subtle {
          animation: pulseSubtle 3s infinite;
        }

        .animate-dropdown {
          animation: dropdown 0.3s ease-out;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default Footer;