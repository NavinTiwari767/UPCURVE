import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle, Users, Trophy, Target, Award, Zap, IndianRupee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState({});
  const observerRefs = useRef([]);

  const stats = [
    {
      icon: Trophy,
      number: '120+',
      label: 'Projects Completed',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: Users,
      number: '5.1k',
      label: 'Happy Clients',
      color: 'from-pink-400 to-pink-600'
    },
    {
      icon: Award,
      number: '233',
      label: 'Team Members',
      color: 'from-cyan-400 to-cyan-600'
    },
    {
      icon: Target,
      number: '250+',
      label: 'Awards Won',
      color: 'from-orange-400 to-orange-600'
    }
  ];

  const services = [
    {
      icon: Zap,
      title: 'Digital Marketing',
      description: 'Every pleasure is to be welcomed and every pain avoided',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: Target,
      title: 'Product Research',
      description: 'Every pleasure is to be welcomed and every pain avoided',
      color: 'from-pink-400 to-pink-600'
    },
    {
      icon: Trophy,
      title: 'Web Development',
      description: 'Every pleasure is to be welcomed and every pain avoided',
      color: 'from-cyan-400 to-cyan-600'
    }
  ];

  const investors = [
    { name: 'EARTH2.0', logo: '🌍' },
    { name: 'CodeLab', logo: '{:}' },
    { name: 'together', logo: '⚡' },
    { name: 'oprah.', logo: '○' },
    { name: 'mattlab', logo: '△' },
    { name: 'circle', logo: '◯' }
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

  const handleExploreMore = () => {
    navigate('/services');
  };

  const handleLetsGetStarted = () => {
    navigate('/contact');
  };

  return (
    <div className="w-full bg-gradient-to-br from-white via-purple-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902"
            alt="Team collaboration"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 30%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-slate-900/50"></div>
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
            About Us
          </h1>
          <div className="flex items-center gap-2 text-white animate-slide-up">
            <span 
              onClick={() => navigate('/')}
              className="hover:text-purple-400 transition-colors cursor-pointer"
            >
              Home
            </span>
            <span>→</span>
            <span className="text-purple-400">About</span>
          </div>
        </div>
      </section>

      {/* Skillset Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={el => addToRefs(el, 0)}
            className={`transition-all duration-1000 ${
              isVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <p className="text-sm font-semibold text-purple-600 tracking-widest mb-4">⚡ CONSULTING SERVICES</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Skillset To Improve Your Company Brand
            </h2>
            <p className="text-slate-700 text-lg mb-8 max-w-3xl">
              Every pleasure is to be welcomed and every pain avoided, certain circumstances and owing to the claims welcomed and every pain avoided certain circumstances
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
            {/* Left - Image */}
            <div 
              ref={el => addToRefs(el, 1)}
              className={`transition-all duration-1000 ${
                isVisible[1] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
              }`}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-purple-200 group">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72"
                  alt="Team working together"
                  className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                  style={{ objectPosition: 'center 25%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent"></div>
              </div>
            </div>

            {/* Right - Stats Card */}
            <div 
              ref={el => addToRefs(el, 2)}
              className={`transition-all duration-1000 delay-300 ${
                isVisible[2] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
              }`}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-200">
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="text-purple-600" size={32} />
                    <div className="text-5xl font-bold text-purple-600">38,844</div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">↗ 26%</span>
                  </div>
                </div>
                <p className="text-slate-600 text-sm mb-4">Your earnings this week</p>
                <p className="text-slate-500 text-xs">compared to last week</p>
              </div>

              <button 
                onClick={handleExploreMore}
                className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-2 group hover:scale-105"
              >
                <span>EXPLORE MORE</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div 
              ref={el => addToRefs(el, 3)}
              className={`transition-all duration-1000 ${
                isVisible[3] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Goals</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Our goal is to deliver exceptional digital marketing solutions that drive measurable results for our clients. We combine creativity with data-driven strategies to help businesses grow and succeed in the digital landscape.
              </p>
            </div>

            {/* Right - Image */}
            <div 
              ref={el => addToRefs(el, 4)}
              className={`transition-all duration-1000 delay-300 ${
                isVisible[4] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
              }`}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e"
                  alt="Professional portrait"
                  className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                  style={{ objectPosition: 'center 20%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consulting Services */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto text-center">
          <div 
            ref={el => addToRefs(el, 5)}
            className={`mb-16 transition-all duration-1000 ${
              isVisible[5] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20'
            }`}
          >
            <p className="text-sm font-semibold text-purple-400 tracking-widest mb-4">⚡ CONSULTING SERVICES</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Consulting Costing
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Every pleasure is to be welcomed and every pain avoided certain circumstances and owing to the claims
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={idx}
                  ref={el => addToRefs(el, 6 + idx)}
                  className={`transition-all duration-1000 ${
                    isVisible[6 + idx] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                  }`}
                  style={{ transitionDelay: isVisible[6 + idx] ? `${idx * 150}ms` : '0ms' }}
                >
                  <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/30 hover:bg-white/20 transition-all duration-300 hover:scale-105 group">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-purple-500">
                        <img 
                          src={`https://images.unsplash.com/photo-${idx === 0 ? '1556761175-b413da4baf72' : idx === 1 ? '1573497019940-1c28c88b4f3e' : '1522071820081-009f0129c71c'}`}
                          alt={service.title}
                          className="w-full h-full object-cover"
                          style={{ objectPosition: 'center 30%' }}
                        />
                      </div>
                      <div className={`absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center text-white`}>
                        <IconComponent size={20} />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-gray-300 text-sm">{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={el => addToRefs(el, 9)}
            className={`relative rounded-3xl overflow-hidden h-96 shadow-2xl transition-all duration-1000 ${
              isVisible[9] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <img 
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902"
              alt="Team collaboration"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center 35%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/60 to-slate-900/60"></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform animate-pulse-slow shadow-2xl">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  We Help Your Business<br />To Become Stronger
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div 
              ref={el => addToRefs(el, 10)}
              className={`transition-all duration-1000 ${
                isVisible[10] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
              }`}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e"
                  alt="Professional"
                  className="w-full h-[500px] object-cover"
                  style={{ objectPosition: 'center 25%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
              </div>
            </div>

            {/* Right - Content */}
            <div 
              ref={el => addToRefs(el, 11)}
              className={`transition-all duration-1000 delay-300 ${
                isVisible[11] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
              }`}
            >
              <p className="text-sm font-semibold text-purple-600 tracking-widest mb-4">⚡ CONTACT US</p>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Ready To Experience<br />Upstage Yourself?
              </h2>
              <button 
                onClick={handleLetsGetStarted}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-2 group hover:scale-105"
              >
                <span>LET'S GET STARTED</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>

          {/* Testimonial */}
          <div 
            ref={el => addToRefs(el, 12)}
            className={`mt-20 transition-all duration-1000 ${
              isVisible[12] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">A Framework For Scaling Teams</h3>
              <p className="text-slate-700 mb-6 leading-relaxed">
                Every pleasure is to be welcomed and every pain avoided. is to be welcomed! and every Every pleasure is to be welcomed and every pain avoided is to be welcomed every Every pleasure is to be welcomed
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500">
                  <img 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e"
                    alt="Logon D"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 25%' }}
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Logon D</h4>
                  <p className="text-sm text-purple-600">Founder, Marketing agency</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investors Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={el => addToRefs(el, 13)}
            className={`transition-all duration-1000 ${
              isVisible[13] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Investors</h2>
            <p className="text-slate-700 mb-12">
              Every pleasure is to be welcomed and every pain avoided certain circumstances
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {investors.map((investor, idx) => (
                <div 
                  key={idx}
                  className={`bg-white p-8 rounded-xl shadow-md border border-purple-100 hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 transition-all duration-700 ${
                    isVisible[13] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                  }`}
                  style={{ transitionDelay: isVisible[13] ? `${idx * 100}ms` : '0ms' }}
                >
                  <span className="text-3xl">{investor.logo}</span>
                  <span className="text-xl font-bold text-slate-900">{investor.name}</span>
                </div>
              ))}
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

        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        .animate-slide-up {
          animation: slideUp 1s ease-out 0.3s backwards;
        }

        .animate-pulse-slow {
          animation: pulseSlow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default About;