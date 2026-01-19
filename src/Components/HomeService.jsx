import React, { useState } from 'react';
import { Zap, BarChart3, Users, Palette, Globe, TrendingUp } from 'lucide-react';

const HomeService = () => {
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

  const handleViewMore = () => {
    window.location.href = '/services';
  };

  return (
    <div className="w-full">
      {/* Services Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-pink-600 tracking-widest mb-4">OUR BEST SERVICES</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              We Provide Best Services
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto"></div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className="group bg-white p-8 rounded-2xl hover:bg-blue-50 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 border border-purple-100"
                >
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${service.color} mb-6 text-white group-hover:scale-110 transition`}>
                    <IconComponent size={28} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
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
          <div className="text-center">
            <button
              onClick={handleViewMore}
              className="px-10 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition"
            >
              Want to see our professional services? Click here to View More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeService;