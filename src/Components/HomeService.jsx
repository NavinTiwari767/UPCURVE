import React, { useEffect, useRef, useState } from 'react';
import { Zap, BarChart3, Users, Palette, Globe, TrendingUp } from 'lucide-react';

const HomeService = () => {
  const [isVisible, setIsVisible] = useState({});
  const observerRefs = useRef([]);

  const services = [
    {
      id: 1,
      icon: Zap,
      title: 'Digital Strategy',
      description: 'Crafting data-driven digital roadmaps to align your business goals with online growth. We optimize your digital presence for maximum reach, engagement and conversions.',
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: 2,
      icon: BarChart3,
      title: 'Product Research',
      description: 'In-depth market and competitor analysis to identify high-demand products, ensuring your offerings stand out and drive profitability.',
      color: 'from-pink-400 to-pink-600'
    },
    {
      id: 3,
      icon: Users,
      title: 'User Experience',
      description: 'Enhancing usability, accessibility, and customer satisfaction with intuitive designs that keep users engaged and coming back.',
      color: 'from-cyan-400 to-cyan-600'
    },
    {
      id: 4,
      icon: Palette,
      title: 'Logo Design',
      description: 'Stunning, sophisticated, and conversion-focused logo designs tailored to your brand—blending aesthetics with functionality.',
      color: 'from-orange-400 to-orange-600'
    },
    {
      id: 5,
      icon: Globe,
      title: 'Website Designing',
      description: 'Stunning, responsive, and conversion-focused websites tailored to your brand—blending aesthetics with functionality.',
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 6,
      icon: TrendingUp,
      title: 'Digital Marketing',
      description: 'Targeted campaigns across PPC, social media, and email marketing to attract, convert, and retain your ideal customers.',
      color: 'from-purple-500 to-purple-700'
    }
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

  const handleViewMore = () => {
    window.location.href = '/services';
  };

  return (
    <div className="w-full">
      {/* Services Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div 
            ref={el => addToRefs(el, 0)}
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
          >
            <p className="text-sm font-semibold text-pink-600 tracking-widest mb-4 animate-fade-in">
              OUR BEST SERVICES
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              We Provide Best Services
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto rounded-full"></div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const delay = index * 100;
              
              return (
                <div
                  key={service.id}
                  ref={el => addToRefs(el, index + 1)}
                  className={`group bg-white p-8 rounded-2xl hover:bg-blue-50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-purple-100 ${
                    isVisible[index + 1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                  }`}
                  style={{ 
                    transitionDelay: isVisible[index + 1] ? `${delay}ms` : '0ms'
                  }}
                >
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${service.color} mb-6 text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 animate-icon-bounce`}>
                    <IconComponent size={28} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* View More Button */}
          <div 
            ref={el => addToRefs(el, services.length + 1)}
            className={`text-center transition-all duration-1000 ${
              isVisible[services.length + 1] ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <button
              onClick={handleViewMore}
              className="group relative px-10 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 overflow-hidden hover:scale-105"
            >
              <span className="relative z-10">Want to see our professional services? Click here to View More</span>
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Custom CSS for Animations */}
      <style jsx>{`
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

        @keyframes iconBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        .animate-icon-bounce {
          animation: iconBounce 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HomeService;