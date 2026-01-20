import React, { useEffect, useRef, useState } from 'react';

const Scroll = () => {
  const [isVisible, setIsVisible] = useState({});
  const observerRefs = useRef([]);

  const services = [
    "DIGITAL MARKETING",
    "SOCIAL MEDIA",
    "SEO OPTIMIZATION",
    "CONTENT STRATEGY",
    "BRAND DEVELOPMENT",
    "ANALYTICS & INSIGHTS",
    "PPC CAMPAIGNS",
    "EMAIL MARKETING"
  ];

  useEffect(() => {
    const observers = [];
    
    observerRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(prev => ({ ...prev, [index]: true }));
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

  const addToRefs = (el, index) => {
    if (el && !observerRefs.current.includes(el)) {
      observerRefs.current[index] = el;
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-white via-purple-50 to-blue-50 py-12 md:py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div 
          ref={el => addToRefs(el, 0)}
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4 animate-fade-in">
            What Our Clients Say About Us
          </h2>
          <p className="text-slate-700 text-sm md:text-lg max-w-2xl mx-auto mb-6 md:mb-12 px-4">
            Discover how we've helped businesses transform their digital presence and achieve remarkable results
          </p>
          
          {/* Decorative Line */}
          <div className="w-20 md:w-32 h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-600 mx-auto rounded-full animate-expand"></div>
        </div>

        {/* Continuous Scrolling Services */}
        <div 
          ref={el => addToRefs(el, 1)}
          className={`mb-12 md:mb-20 overflow-hidden relative transition-all duration-1000 ${
            isVisible[1] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="relative">
            {/* Scrolling Text Container */}
            <div className="flex animate-scroll">
              {/* First Set */}
              <div className="flex space-x-6 md:space-x-12 min-w-full py-3 md:py-4">
                {services.map((service, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0 px-4 md:px-10 py-3 md:py-5 bg-white rounded-xl md:rounded-2xl border border-purple-200 shadow-sm hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300"
                  >
                    <span className="text-sm md:text-2xl font-bold text-purple-700">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
              {/* Duplicate for seamless scroll */}
              <div className="flex space-x-6 md:space-x-12 min-w-full py-3 md:py-4">
                {services.map((service, index) => (
                  <div 
                    key={`dup-${index}`} 
                    className="flex-shrink-0 px-4 md:px-10 py-3 md:py-5 bg-white rounded-xl md:rounded-2xl border border-purple-200 shadow-sm hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300"
                  >
                    <span className="text-sm md:text-2xl font-bold text-purple-700">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gradient Overlays - Matching Background */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-purple-50 via-purple-50/80 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-purple-50 via-purple-50/80 to-transparent z-10 pointer-events-none"></div>
          </div>
        </div>

        {/* Middle Content - Services Showcase */}
        <div 
          ref={el => addToRefs(el, 2)}
          className={`mb-12 md:mb-20 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 transition-all duration-1000 ${
            isVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 text-center border border-purple-200 shadow-sm hover:shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 animate-slide-up-1">
            <h3 className="text-sm md:text-2xl font-bold text-slate-900 mb-1 md:mb-2">OPTIMIZATION</h3>
            <p className="text-slate-700 text-xs md:text-sm">SEO & Performance</p>
          </div>
          
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 text-center border border-pink-200 shadow-sm hover:shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 animate-slide-up-2">
            <h3 className="text-sm md:text-2xl font-bold text-slate-900 mb-1 md:mb-2">CONTENT</h3>
            <p className="text-slate-700 text-xs md:text-sm">Engaging Content</p>
          </div>
          
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 text-center border border-cyan-200 shadow-sm hover:shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 animate-slide-up-3">
            <h3 className="text-sm md:text-2xl font-bold text-slate-900 mb-1 md:mb-2">BRANDING</h3>
            <p className="text-slate-700 text-xs md:text-sm">Brand Identity</p>
          </div>
          
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 text-center border border-purple-200 shadow-sm hover:shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 animate-slide-up-4">
            <h3 className="text-sm md:text-2xl font-bold text-slate-900 mb-1 md:mb-2">SOCIAL MEDIA</h3>
            <p className="text-slate-700 text-xs md:text-sm">Platform Management</p>
          </div>
        </div>
      </div>

      {/* Custom CSS for Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expand {
          from {
            width: 0;
          }
          to {
            width: 5rem;
          }
        }

        @keyframes slideUp1 {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp2 {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp3 {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp4 {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-scroll {
          animation: scroll 25s linear infinite;
          display: flex;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        .animate-expand {
          animation: expand 1s ease-out 0.5s backwards;
        }

        .animate-slide-up-1 {
          animation: slideUp1 0.8s ease-out;
        }

        .animate-slide-up-2 {
          animation: slideUp2 0.8s ease-out 0.15s backwards;
        }

        .animate-slide-up-3 {
          animation: slideUp3 0.8s ease-out 0.3s backwards;
        }

        .animate-slide-up-4 {
          animation: slideUp4 0.8s ease-out 0.45s backwards;
        }
      `}</style>
    </div>
  );
};

export default Scroll;