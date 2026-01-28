import React, { useEffect, useRef, useState } from 'react';
import { Play, CheckCircle, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Intro = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState({});
  const [showVideo, setShowVideo] = useState(false);
  const observerRefs = useRef([]);

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

  // Handle Contact Us Click
  const handleContactClick = () => {
    navigate('/contact');
    window.scrollTo(0, 0);
  };

  // Handle Watch Video Click
  const handleWatchVideo = () => {
    setShowVideo(true);
  };

  return (
    <div className="w-full">
      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-4xl">
            <button 
              onClick={() => setShowVideo(false)}
              className="ml-auto block text-white text-3xl mb-4 hover:text-gray-300 transition"
            >
              ✕
            </button>
            <div className="relative w-full bg-black rounded-xl overflow-hidden">
              <iframe
                width="100%"
                height="500"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Our Marketing Services"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white via-blue-50 to-purple-50 py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div 
              ref={el => addToRefs(el, 0)}
              className={`space-y-6 transition-all duration-1000 ${
                isVisible[0] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
              }`}
            >
              <p className="text-sm font-semibold text-pink-600 tracking-widest animate-fade-in">
                WELCOME TO OUR COMPANY
              </p>
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900">
                We are Creative Digital <span className="text-purple-600 animate-gradient">Marketing</span> Agency
              </h1>
              <p className="text-lg text-slate-700 leading-relaxed">
                We are 120+ professional software engineers with more than 5 years of experience in delivering superior products. Believe in because you've seen it. Here are real numbers.
              </p>

              {/* CTA Buttons - CLICKABLE */}
              <div className="flex gap-4 pt-4">
                <button 
                  onClick={handleContactClick}
                  className="group flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <span>Contact Us</span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <button 
                  onClick={handleWatchVideo}
                  className="group flex items-center gap-3 px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-full font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <Play size={20} className="fill-current group-hover:scale-110 transition-transform" />
                  Watch Video
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-8">
                <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white p-6 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer">
                  <h3 className="text-3xl font-bold animate-count">5.2k</h3>
                  <p className="text-sm font-medium">Client Satisfaction</p>
                </div>
                <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white p-6 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer">
                  <h3 className="text-3xl font-bold animate-count">98%</h3>
                  <p className="text-sm font-medium">Success Rate</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div 
              ref={el => addToRefs(el, 1)}
              className={`relative flex justify-center transition-all duration-1000 delay-300 ${
                isVisible[1] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
              }`}
            >
              <div className="relative w-full max-w-md">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200 via-pink-100 to-purple-100 rounded-3xl blur-3xl opacity-60 animate-pulse-slow"></div>
                
                {/* Main Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105">
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Professional business team discussing digital marketing strategy"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                  
                  {/* Overlay Text */}
                  <div className="absolute bottom-8 left-8 right-8 transform transition-all duration-500 hover:translate-y-[-4px]">
                    <h3 className="text-white text-xl font-bold">Digital Marketing Expert</h3>
                    <p className="text-gray-200 text-sm">Crafting successful campaigns since 2018</p>
                  </div>
                </div>

                {/* Purple Circle - CLICKABLE VIDEO BUTTON */}
                <button 
                  onClick={handleWatchVideo}
                  className="absolute -right-6 bottom-20 w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full shadow-lg flex items-center justify-center animate-bounce-slow hover:scale-110 transition-transform cursor-pointer group"
                  title="Watch Video"
                >
                  <Play size={24} className="text-white group-hover:scale-125 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left - Image and Text */}
            <div 
              ref={el => addToRefs(el, 2)}
              className={`space-y-6 transition-all duration-1000 ${
                isVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
            >
              <p className="text-sm font-semibold text-pink-600 tracking-widest">WHY CHOOSE US</p>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                We Want to Give You The Best Service
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                We are 120+ professional software engineers with more than 5 years of experience in delivering superior products. Believe in because you've seen it. Here are real numbers.
              </p>

              {/* Image Grid */}
              <div className="mt-8">
                <div className="grid grid-cols-2 gap-4">
                  {/* Main Image */}
                  <div className="col-span-2">
                    <div className="relative rounded-2xl overflow-hidden shadow-xl h-64 group cursor-pointer">
                      <img 
                        src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                        alt="Modern digital marketing office workspace"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-600/40 to-transparent"></div>
                    </div>
                  </div>
                  
                  {/* Smaller Images */}
                  <div className="relative rounded-xl overflow-hidden shadow-xl h-48 group cursor-pointer">
                    <img 
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                      alt="Marketing analytics dashboard with charts"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-600/30 to-transparent"></div>
                  </div>
                  
                  <div className="relative rounded-xl overflow-hidden shadow-xl h-48 group cursor-pointer">
                    <img 
                      src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                      alt="Creative team collaboration session"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-600/30 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Features List */}
            <div 
              ref={el => addToRefs(el, 3)}
              className={`space-y-6 transition-all duration-1000 delay-300 ${
                isVisible[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
            >
              {/* Feature 1 */}
              <div className="flex gap-4 items-start bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-purple-100 transform hover:-translate-y-2 hover:scale-105 animate-slide-in-1">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                  <CheckCircle size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Guaranteed Results</h3>
                  <p className="text-slate-600 mt-1">We deliver measurable outcomes for your business</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4 items-start bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-purple-100 transform hover:-translate-y-2 hover:scale-105 animate-slide-in-2">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                  <CheckCircle size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Quality Services</h3>
                  <p className="text-slate-600 mt-1">Premium quality solutions tailored to your needs</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex gap-4 items-start bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-purple-100 transform hover:-translate-y-2 hover:scale-105 animate-slide-in-3">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                  <CheckCircle size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">On Time Services</h3>
                  <p className="text-slate-600 mt-1">Always deliver projects on schedule</p>
                </div>
              </div>

           {/* Team Photo */}
<div className="relative rounded-xl overflow-hidden shadow-lg mt-8 group cursor-pointer">
  <img 
    src="https://images.unsplash.com/photo-1556761175-b413da4baf72" 
    alt="Our professional marketing team working together"
    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
  />
  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent p-4">
    <p className="text-white text-sm font-semibold">Our Expert Team</p>
    <p className="text-gray-200 text-xs">120+ professionals working for your success</p>
  </div>
</div>

              {/* CTA Buttons - CLICKABLE */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button 
                  onClick={handleContactClick}
                  className="group flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <span>Contact Us</span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <a 
                  href="tel:+917991647990"
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-cyan-500 text-white rounded-full font-semibold hover:bg-cyan-600 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <Phone size={18} />
                  <span>7991647990</span>
                </a>
              </div>
            </div>
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          50% {
            transform: translateY(-10px) translateX(-50%);
          }
        }

        @keyframes bounceSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulseSlow {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes slideIn1 {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideIn2 {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideIn3 {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounceSlow 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulseSlow 3s ease-in-out infinite;
        }

        .animate-gradient {
          background: linear-gradient(270deg, #9333ea, #ec4899, #06b6d4);
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .animate-slide-in-1 {
          animation: slideIn1 0.6s ease-out;
        }

        .animate-slide-in-2 {
          animation: slideIn2 0.6s ease-out 0.2s backwards;
        }

        .animate-slide-in-3 {
          animation: slideIn3 0.6s ease-out 0.4s backwards;
        }

        @keyframes count {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-count {
          animation: count 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Intro;