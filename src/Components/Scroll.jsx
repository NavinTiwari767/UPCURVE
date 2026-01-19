import React from 'react';

const Scroll = () => {
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

  return (
    <div className="w-full bg-gradient-to-br from-white via-purple-50 to-blue-50 py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 relative z-20">
          <div className="inline-block mb-6">
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 leading-tight">
              MARKETING DIGITAL STRATE
            </h1>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            What Our Clients Say About Us
          </h2>
          <p className="text-slate-700 text-lg max-w-2xl mx-auto mb-12">
            Discover how we've helped businesses transform their digital presence and achieve remarkable results
          </p>
          
          {/* Decorative Line */}
          <div className="w-32 h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-600 mx-auto rounded-full"></div>
        </div>

        {/* Continuous Scrolling Services - Top */}
        <div className="mb-20 overflow-hidden relative">
          <div className="relative">
            {/* Scrolling Text Container */}
            <div className="flex animate-scroll-fast">
              {/* First Set */}
              <div className="flex space-x-12 min-w-full py-4">
                {services.map((service, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0 px-10 py-5 bg-gradient-to-r from-purple-100/50 via-pink-100/50 to-cyan-100/50 backdrop-blur-md rounded-2xl border border-purple-300 shadow-md"
                  >
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-cyan-700">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
              {/* Duplicate for seamless scroll */}
              <div className="flex space-x-12 min-w-full py-4">
                {services.map((service, index) => (
                  <div 
                    key={`dup-${index}`} 
                    className="flex-shrink-0 px-10 py-5 bg-gradient-to-r from-purple-100/50 via-pink-100/50 to-cyan-100/50 backdrop-blur-md rounded-2xl border border-purple-300 shadow-md"
                  >
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-cyan-700">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/95 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/95 to-transparent z-10"></div>
          </div>
        </div>

        {/* Middle Content - Services Showcase */}
        <div className="mb-20 grid grid-cols-2 md:grid-cols-4 gap-6 relative z-20">
          <div className="bg-gradient-to-br from-purple-100/40 to-purple-50/40 backdrop-blur-sm rounded-2xl p-8 text-center border border-purple-300 shadow-md">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">OPTIMIZATION</h3>
            <p className="text-slate-700 text-sm">SEO & Performance</p>
          </div>
          
          <div className="bg-gradient-to-br from-pink-100/40 to-pink-50/40 backdrop-blur-sm rounded-2xl p-8 text-center border border-pink-300 shadow-md">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">CONTENT STRATEGY</h3>
            <p className="text-slate-700 text-sm">Engaging Content</p>
          </div>
          
          <div className="bg-gradient-to-br from-cyan-100/40 to-cyan-50/40 backdrop-blur-sm rounded-2xl p-8 text-center border border-cyan-300 shadow-md">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">BRAND DEVELOP</h3>
            <p className="text-slate-700 text-sm">Brand Identity</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-100/40 via-pink-100/40 to-cyan-100/40 backdrop-blur-sm rounded-2xl p-8 text-center border border-purple-300 shadow-md">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">SOCIAL MEDIA</h3>
            <p className="text-slate-700 text-sm">Platform Management</p>
          </div>
        </div>

        {/* Continuous Scrolling Services - Middle (Diagonal) */}
        <div className="mb-20 overflow-hidden relative rotate-3 transform-gpu">
          <div className="relative">
            <div className="flex animate-scroll-slow">
              <div className="flex space-x-16 min-w-full py-6">
                {services.slice(0, 4).map((service, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0 px-8 py-4 bg-gradient-to-r from-purple-200/40 to-cyan-200/40 backdrop-blur-sm rounded-xl border border-purple-300"
                  >
                    <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-cyan-700">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex space-x-16 min-w-full py-6">
                {services.slice(0, 4).map((service, index) => (
                  <div 
                    key={`dup2-${index}`} 
                    className="flex-shrink-0 px-8 py-4 bg-gradient-to-r from-purple-200/40 to-cyan-200/40 backdrop-blur-sm rounded-xl border border-purple-300"
                  >
                    <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-cyan-700">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/90 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/90 to-transparent z-10"></div>
          </div>
        </div>

        {/* Continuous Scrolling Services - Bottom */}
        <div className="relative overflow-hidden py-8 -rotate-2 transform-gpu">
          <div className="flex animate-scroll-medium">
            <div className="flex space-x-20 min-w-full items-center">
              {services.map((service, index) => (
                <div key={index} className="flex-shrink-0">
                  <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500/80 via-pink-500/80 to-cyan-500/80">
                    {service}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex space-x-20 min-w-full items-center">
              {services.map((service, index) => (
                <div key={`dup3-${index}`} className="flex-shrink-0">
                  <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500/80 via-pink-500/80 to-cyan-500/80">
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/95 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/95 to-transparent z-10"></div>
        </div>

        {/* Final Section */}
        <div className="text-center mt-24 relative z-20">
          <div className="inline-block mb-8 p-8 bg-gradient-to-br from-slate-50/80 to-blue-50/80 backdrop-blur-md rounded-3xl border border-purple-300 shadow-lg">
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600">
              MARKETING DIGITAL STRATE
            </h1>
            <p className="text-slate-700 text-lg mt-4 max-w-2xl mx-auto">
              Transforming businesses through innovative digital strategies and proven methodologies
            </p>
          </div>
        </div>
      </div>

      {/* Custom CSS for Animation */}
      <style jsx>{`
        @keyframes scroll-fast {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes scroll-medium {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes scroll-slow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-scroll-fast {
          animation: scroll-fast 20s linear infinite;
          display: flex;
        }

        .animate-scroll-medium {
          animation: scroll-medium 35s linear infinite;
          display: flex;
        }

        .animate-scroll-slow {
          animation: scroll-slow 25s linear infinite;
          display: flex;
        }

        .animate-scroll-fast:hover,
        .animate-scroll-medium:hover,
        .animate-scroll-slow:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Scroll;