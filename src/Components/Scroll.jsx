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
    <div className="w-full bg-gradient-to-br from-white via-purple-50 to-blue-50 py-12 md:py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
            What Our Clients Say About Us
          </h2>
          <p className="text-slate-700 text-sm md:text-lg max-w-2xl mx-auto mb-6 md:mb-12 px-4">
            Discover how we've helped businesses transform their digital presence and achieve remarkable results
          </p>
          
          {/* Decorative Line */}
          <div className="w-20 md:w-32 h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-600 mx-auto rounded-full"></div>
        </div>

        {/* Continuous Scrolling Services */}
        <div className="mb-12 md:mb-20 overflow-hidden relative">
          <div className="relative">
            {/* Scrolling Text Container */}
            <div className="flex animate-scroll">
              {/* First Set */}
              <div className="flex space-x-6 md:space-x-12 min-w-full py-3 md:py-4">
                {services.map((service, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0 px-4 md:px-10 py-3 md:py-5 bg-white rounded-xl md:rounded-2xl border border-purple-200 shadow-sm"
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
                    className="flex-shrink-0 px-4 md:px-10 py-3 md:py-5 bg-white rounded-xl md:rounded-2xl border border-purple-200 shadow-sm"
                  >
                    <span className="text-sm md:text-2xl font-bold text-purple-700">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
          </div>
        </div>

        {/* Middle Content - Services Showcase */}
        <div className="mb-12 md:mb-20 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 text-center border border-purple-200 shadow-sm">
            <h3 className="text-sm md:text-2xl font-bold text-slate-900 mb-1 md:mb-2">OPTIMIZATION</h3>
            <p className="text-slate-700 text-xs md:text-sm">SEO & Performance</p>
          </div>
          
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 text-center border border-pink-200 shadow-sm">
            <h3 className="text-sm md:text-2xl font-bold text-slate-900 mb-1 md:mb-2">CONTENT</h3>
            <p className="text-slate-700 text-xs md:text-sm">Engaging Content</p>
          </div>
          
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 text-center border border-cyan-200 shadow-sm">
            <h3 className="text-sm md:text-2xl font-bold text-slate-900 mb-1 md:mb-2">BRANDING</h3>
            <p className="text-slate-700 text-xs md:text-sm">Brand Identity</p>
          </div>
          
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 text-center border border-purple-200 shadow-sm">
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

        .animate-scroll {
          animation: scroll 25s linear infinite;
          display: flex;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Scroll;