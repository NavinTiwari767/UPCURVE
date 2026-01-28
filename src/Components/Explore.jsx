import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle, Users, Trophy, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Explore = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState({});
  const observerRefs = useRef([]);

  const handleNavigateToServices = () => {
    navigate('/services');
    window.scrollTo(0, 0);
  };

  const handleNavigateToAbout = () => {
    navigate('/about');
    window.scrollTo(0, 0);
  };

  const stats = [
    {
      icon: Trophy,
      number: '120+',
      label: 'Projects Done',
      color: 'from-pink-400 to-pink-600'
    },
    {
      icon: Users,
      number: '5.1k',
      label: 'Happy Clients',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: Users,
      number: '233k',
      label: 'Team Members',
      color: 'from-cyan-400 to-cyan-600'
    },
    {
      icon: Trophy,
      number: '250k',
      label: 'Awards Won',
      color: 'from-orange-400 to-orange-600'
    }
  ];

  const reasons = [
    { icon: '✓', title: 'Fast Working Process' },
    { icon: '✓', title: 'Dedicated Team' },
    { icon: '✓', title: '24/7 Hours Support' },
    { icon: '✓', title: 'Handle By Expert' }
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
    <div className="w-full">
      {/* Story Section */}
      <section className="bg-gradient-to-br from-white via-purple-50 to-blue-50 py-16 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Story Card */}
          <div 
            ref={el => addToRefs(el, 0)}
            className={`relative rounded-3xl overflow-hidden h-64 md:h-80 mb-12 group shadow-xl border border-purple-200 transition-all duration-1000 ${
              isVisible[0] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            {/* ✅ FIXED: Background Image */}
            <img 
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902" 
              alt="Digital marketing team collaboration"
              className="absolute inset-0 w-full h-full object-cover md:object-center group-hover:scale-110 transition-transform duration-700"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg';
              }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-800/60 to-slate-950/70"></div>
            
            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-end p-4 md:p-8 lg:p-12">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-6">
                <div className="max-w-2xl">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-4 animate-slide-in-left">
                    Behind The Story Of Digital Marketing Agency
                  </h2>
                  <p className="text-gray-200 text-sm sm:text-base mb-3 md:mb-4 animate-fade-in-delay">
                    Discover how we transformed businesses with innovative digital strategies
                  </p>
                </div>
                <button 
                  onClick={handleNavigateToAbout}
                  className="px-6 py-2 sm:px-8 sm:py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex-shrink-0 flex items-center gap-2 hover:scale-105 group text-sm sm:text-base cursor-pointer"
                >
                  <span>Learn More</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div 
            ref={el => addToRefs(el, 1)}
            className={`bg-white rounded-3xl p-6 md:p-8 lg:p-12 mb-16 shadow-lg border border-purple-200 transition-all duration-1000 ${
              isVisible[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, idx) => {
                const IconComponent = stat.icon;
                const delay = idx * 150;
                return (
                  <div 
                    key={idx} 
                    className={`text-center group transition-all duration-700 ${
                      isVisible[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: isVisible[1] ? `${delay}ms` : '0ms' }}
                  >
                    {/* Icon */}
                    <div className="flex justify-center mb-3 md:mb-4">
                      <div className={`p-3 md:p-4 rounded-full bg-gradient-to-br ${stat.color} text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg animate-bounce-in`}>
                        <IconComponent size={24} className="sm:w-6 sm:h-6 md:w-8 md:h-8" />
                      </div>
                    </div>
                    {/* Number */}
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-1 md:mb-2 animate-count-up">
                      {stat.number}
                    </h3>
                    {/* Label */}
                    <p className="text-slate-600 font-medium uppercase text-xs tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Why Choose Section */}
          <div 
            ref={el => addToRefs(el, 2)}
            className="mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left - Image */}
              <div className={`relative rounded-2xl overflow-hidden h-64 sm:h-80 md:h-96 shadow-xl border border-purple-200 transition-all duration-1000 ${
                isVisible[2] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
              }`}>
                {/* ✅ FIXED: Marketing analytics image */}
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71" 
                  alt="Digital marketing analytics dashboard"
                  className="w-full h-full object-cover object-center hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent"></div>
                
                {/* Floating Badge */}
                <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/95 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-xl border border-purple-200 animate-float">
                  <div className="text-center">
                    <p className="text-lg md:text-2xl font-bold text-slate-900">98%</p>
                    <p className="text-xs text-slate-600">Success Rate</p>
                  </div>
                </div>
              </div>

              {/* Right - Content */}
              <div className={`transition-all duration-1000 delay-300 ${
                isVisible[2] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
              }`}>
                <p className="text-sm font-semibold text-pink-600 tracking-widest mb-2 animate-fade-in">OUR BENEFITS</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4">
                  Why You Should Choose Agency Services
                </h2>
                <p className="text-slate-700 text-base md:text-lg mb-6 md:mb-8">
                  We are 120+ professional software engineers with more than 5 years of experience in delivering superior products. Believe in because you've seen it. Here are real numbers.
                </p>

                {/* Reasons Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                  {reasons.map((reason, idx) => (
                    <div 
                      key={idx} 
                      className={`flex items-center gap-3 md:gap-4 group transition-all duration-500 ${
                        isVisible[2] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                      }`}
                      style={{ transitionDelay: isVisible[2] ? `${500 + idx * 100}ms` : '0ms' }}
                    >
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center text-white font-bold flex-shrink-0 group-hover:scale-110 transition-transform text-sm md:text-base">
                        {reason.icon}
                      </div>
                      <span className="text-slate-900 font-semibold text-base md:text-lg group-hover:text-purple-600 transition-colors">
                        {reason.title}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button - CLICKABLE */}
                <button 
                  onClick={handleNavigateToAbout}
                  className="px-6 py-2 sm:px-8 sm:py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-2 group hover:scale-105 text-sm sm:text-base cursor-pointer"
                >
                  <span>Learn More</span>
                  <span className="group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div 
            ref={el => addToRefs(el, 3)}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
          >
            {/* Left - Team Image Grid */}
            <div className={`space-y-4 md:space-y-6 transition-all duration-1000 ${
              isVisible[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}>
              {/* Main Team Image */}
              <div className="relative rounded-2xl overflow-hidden h-56 sm:h-64 md:h-72 shadow-xl border border-purple-200 group">
                {/* ✅ FIXED: Team collaboration image */}
                <img 
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72" 
                  alt="Team collaboration meeting"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent"></div>
              </div>

              {/* Team Stats Row - Fixed images for Strategy, Marketing, Design */}
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                {/* ✅ FIXED: Strategy Image */}
                <div 
                  className={`relative rounded-xl overflow-hidden h-28 sm:h-32 md:h-36 shadow-lg border border-purple-100 group transition-all duration-700 ${
                    isVisible[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: isVisible[3] ? '300ms' : '0ms' }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978"
                    alt="Strategy"
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg';
                    }}
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-slate-900/60 backdrop-blur-sm rounded-lg p-2">
                    <p className="text-white text-xs font-semibold">Strategy</p>
                  </div>
                </div>

                {/* ✅ FIXED: Marketing Image */}
                <div 
                  className={`relative rounded-xl overflow-hidden h-28 sm:h-32 md:h-36 shadow-lg border border-purple-100 group transition-all duration-700 ${
                    isVisible[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: isVisible[3] ? '400ms' : '0ms' }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
                    alt="Marketing"
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg';
                    }}
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-slate-900/60 backdrop-blur-sm rounded-lg p-2">
                    <p className="text-white text-xs font-semibold">Marketing</p>
                  </div>
                </div>

                {/* ✅ FIXED: Design Image */}
                <div 
                  className={`relative rounded-xl overflow-hidden h-28 sm:h-32 md:h-36 shadow-lg border border-purple-100 group transition-all duration-700 ${
                    isVisible[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: isVisible[3] ? '500ms' : '0ms' }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1545235617-9465d2a55698"
                    alt="Design"
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg';
                    }}
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-slate-900/60 backdrop-blur-sm rounded-lg p-2">
                    <p className="text-white text-xs font-semibold">Design</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className={`space-y-4 md:space-y-6 transition-all duration-1000 delay-300 ${
              isVisible[3] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}>
              <p className="text-sm font-semibold text-pink-600 tracking-widest">WHO WE ARE</p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
                Our Team Works Together To Achieve Success
              </h3>
              <p className="text-slate-700 text-base md:text-lg leading-relaxed">
                Our experienced team of digital marketing professionals is dedicated to delivering exceptional results. With combined expertise in strategy, design, and execution, we create comprehensive solutions tailored to your business goals.
              </p>
              <ul className="space-y-2 md:space-y-3">
                {[
                  'Proven track record of success',
                  'Client-focused approach',
                  'Innovative solutions',
                  'Real-time analytics and reporting'
                ].map((item, idx) => (
                  <li 
                    key={idx}
                    className={`flex items-center gap-2 md:gap-3 text-slate-700 transition-all duration-500 ${
                      isVisible[3] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                    }`}
                    style={{ transitionDelay: isVisible[3] ? `${600 + idx * 100}ms` : '0ms' }}
                  >
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={12} className="md:w-3.5 md:h-3.5 text-white" />
                    </div>
                    <span className="text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={handleNavigateToServices}
                className="px-6 py-2 sm:px-8 sm:py-3 bg-gradient-to-r from-cyan-400 to-cyan-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105 text-sm sm:text-base cursor-pointer"
              >
                Discover Our Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInDelay {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes pulseSlow {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          60% {
            opacity: 1;
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes countUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slide-in-left {
          animation: slideInLeft 1s ease-out;
        }

        .animate-fade-in-delay {
          animation: fadeInDelay 1s ease-out 0.3s backwards;
        }

        .animate-pulse-slow {
          animation: pulseSlow 2s ease-in-out infinite;
        }

        .animate-bounce-in {
          animation: bounceIn 0.8s ease-out;
        }

        .animate-count-up {
          animation: countUp 1s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Explore;