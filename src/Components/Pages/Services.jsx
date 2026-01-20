import React, { useEffect, useRef, useState } from 'react';
import { Star, ArrowUpRight } from 'lucide-react';

const Services = () => {
  const [isVisible, setIsVisible] = useState({});
  const [counts, setCounts] = useState({
    projects: 0,
    clients: 0,
    team: 0,
    awards: 0
  });
  const observerRefs = useRef([]);
  const hasAnimated = useRef(false);

  const portfolioImages = [
    { type: 'Designer Portfolio', img: 'photo-1517694712202-14dd9538aa97' },
    { type: 'Logo Design', img: 'photo-1626785774573-4b799315345d' },
    { type: 'Business Website', img: 'photo-1460925895917-afdab827c52f' },
    { type: 'E-commerce', img: 'photo-1472851294608-062f824d29cc' },
    { type: 'Social Media', img: 'photo-1611926653458-09294b3142bf' }
  ];

  const services = [
    {
      number: '01',
      category: 'CUSTOMIZATION',
      title: 'WordPress & Marketing',
      description: 'We believe that great design should not be our download will start automatically in 3 to 5 seconds',
      color: 'from-purple-400 to-purple-600'
    },
    {
      number: '02',
      category: 'ENERGY & ENVIRONMENT',
      title: 'Business Solutions',
      description: 'We believe that great design should not be our download will start automatically in 3 to 5 seconds',
      color: 'from-purple-400 to-purple-600'
    },
    {
      number: '03',
      category: 'FINANCIAL SERVICE',
      title: 'Digital Marketing',
      description: 'We believe that great design should not be our download will start automatically in 3 to 5 seconds',
      color: 'from-purple-400 to-purple-600'
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

  useEffect(() => {
    const observers = [];
    
    observerRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(prev => ({ ...prev, [index]: true }));
              
              // Trigger counter animation for stats section
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
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-slate-900/50"></div>
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
            Services
          </h1>
          <div className="flex items-center gap-2 text-white animate-slide-up">
            <span 
              onClick={() => window.location.href = '/'}
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
                <img 
                  src={`https://images.unsplash.com/${item.img}?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`}
                  alt={item.type}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
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
          </div>

          {/* Services List */}
          <div className="space-y-6">
            {services.map((service, idx) => (
              <div 
                key={idx}
                ref={el => addToRefs(el, 2 + idx)}
                className={`bg-gradient-to-r from-purple-50 to-white rounded-2xl p-8 border-2 border-purple-200 hover:border-purple-400 transition-all duration-500 hover:shadow-xl group ${
                  isVisible[2 + idx] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
                }`}
                style={{ transitionDelay: isVisible[2 + idx] ? `${idx * 150}ms` : '0ms' }}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Number */}
                  <div className="md:col-span-2">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} text-white flex items-center justify-center text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform`}>
                      {service.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-7">
                    <p className="text-xs font-semibold text-purple-600 tracking-widest mb-2">{service.category}</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-purple-600 mb-2">{service.title}</h3>
                    <p className="text-slate-600">{service.description}</p>
                  </div>

                  {/* Illustration & Rating */}
                  <div className="md:col-span-3 flex flex-col items-center gap-4">
                    <div className="relative w-32 h-32 rounded-full border-4 border-purple-300 bg-gradient-to-br from-purple-50 to-white flex items-center justify-center">
                      {/* Illustration SVG */}
                      <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none">
                        {/* Person */}
                        <circle cx="50" cy="35" r="12" fill="#A78BFA"/>
                        <path d="M35 65 Q35 45 50 45 Q65 45 65 65 L60 80 L40 80 Z" fill="#34D399"/>
                        {/* Phone */}
                        <rect x="55" y="55" width="15" height="25" rx="2" fill="#10B981" stroke="#059669" strokeWidth="1"/>
                        <circle cx="62.5" cy="75" r="1.5" fill="#D1FAE5"/>
                        {/* Money icons */}
                        <circle cx="30" cy="40" r="6" fill="#E0E7FF" stroke="#6366F1" strokeWidth="1"/>
                        <text x="30" y="43" fontSize="8" fill="#6366F1" textAnchor="middle" fontWeight="bold">$</text>
                        <circle cx="25" cy="60" r="5" fill="#E0E7FF" stroke="#6366F1" strokeWidth="1"/>
                        <text x="25" y="62.5" fontSize="6" fill="#6366F1" textAnchor="middle" fontWeight="bold">$</text>
                      </svg>
                      <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-xl">💰</span>
                      </div>
                    </div>
                    
                    {/* Google Rating */}
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                      <span className="text-2xl">G</span>
                      <div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-xs text-slate-600">4.8 Rating on Google</p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-all duration-300 cursor-pointer">
                      <ArrowUpRight size={24} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* See Services Button */}
          <div 
            ref={el => addToRefs(el, 5)}
            className={`text-center mt-12 transition-all duration-1000 ${
              isVisible[5] ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-2 mx-auto group hover:scale-105">
              <span>SEE SERVICES</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Partners Section */}
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
            {/* Left - Content */}
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

              {/* Work Completed Counter */}
              <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 border-2 border-purple-200 mb-8">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Work completed"
                    className="w-24 h-24 rounded-2xl object-cover mb-4"
                  />
                  <div>
                    <p className="text-sm text-slate-600 mb-2">Work Completed</p>
                    <h3 className="text-5xl font-bold text-purple-600 mb-1">
                      {counts.projects.toLocaleString()}+
                    </h3>
                  </div>
                </div>
              </div>

              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-2 group hover:scale-105">
                <span>GET STARTED</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            {/* Right - Technologies Grid */}
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
                    className={`bg-white rounded-2xl p-8 border-2 border-purple-100 hover:border-purple-400 transition-all duration-500 hover:shadow-xl text-center group hover:scale-105 ${
                      isVisible[7] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: isVisible[7] ? `${idx * 100}ms` : '0ms' }}
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

      {/* Custom CSS */}
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