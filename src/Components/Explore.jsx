import React from 'react';
import { CheckCircle, Users, Trophy, Play } from 'lucide-react';

const Explore = () => {
  const handleNavigateToServices = () => {
    window.location.href = '/services';
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

  return (
    <div className="w-full">
      {/* Story Section */}
      <section className="bg-gradient-to-br from-white via-purple-50 to-blue-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Story Card */}
          <div className="relative rounded-3xl overflow-hidden h-64 md:h-80 mb-12 group shadow-xl border border-purple-200">
            {/* Background Image */}
            <img 
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
              alt="Digital marketing team collaboration"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-800/50 to-slate-950/60"></div>
            
            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-end p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-6">
                <div className="max-w-2xl">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Behind The Story Of Digital Marketing Agency
                  </h2>
                  <p className="text-gray-200 mb-4">
                    Discover how we transformed businesses with innovative digital strategies
                  </p>
                </div>
                <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition flex-shrink-0 flex items-center gap-2">
                  <span>Learn More</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* Floating Play Button */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform">
                <Play size={28} className="text-white ml-1" />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="bg-white rounded-3xl p-8 md:p-12 mb-16 shadow-lg border border-purple-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => {
                const IconComponent = stat.icon;
                return (
                  <div key={idx} className="text-center group">
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                      <div className={`p-4 rounded-full bg-gradient-to-br ${stat.color} text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <IconComponent size={32} />
                      </div>
                    </div>
                    {/* Number */}
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
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
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left - Image */}
              <div className="relative rounded-2xl overflow-hidden h-96 shadow-xl border border-purple-200">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Digital marketing analytics dashboard"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent"></div>
                
                {/* Floating Badge */}
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-purple-200">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-900">98%</p>
                    <p className="text-xs text-slate-600">Success Rate</p>
                  </div>
                </div>
              </div>

              {/* Right - Content */}
              <div>
                <p className="text-sm font-semibold text-pink-600 tracking-widest mb-2">OUR BENEFITS</p>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                  Why You Should Choose Agency Services
                </h2>
                <p className="text-slate-700 text-lg mb-8">
                  We are 120+ professional software engineers with more than 5 years of experience in delivering superior products. Believe in because you've seen it. Here are real numbers.
                </p>

                {/* Reasons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {reasons.map((reason, idx) => (
                    <div key={idx} className="flex items-center gap-4 group">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center text-white font-bold flex-shrink-0 group-hover:scale-110 transition-transform">
                        {reason.icon}
                      </div>
                      <span className="text-slate-900 font-semibold text-lg group-hover:text-purple-600 transition-colors">
                        {reason.title}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition flex items-center gap-2 group hover:scale-105">
                  <span>Learn More</span>
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left - Team Image Grid */}
            <div className="space-y-6">
              {/* Main Team Image */}
              <div className="relative rounded-2xl overflow-hidden h-64 shadow-xl border border-purple-200">
                <img 
                  src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Team collaboration meeting"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent"></div>
                
                {/* Play Button Overlay */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                  <Play size={20} className="text-purple-600" />
                </div>
              </div>

              {/* Team Stats Row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="relative rounded-xl overflow-hidden h-32 shadow-lg border border-purple-100">
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                    alt="Strategy planning"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-slate-900/60 backdrop-blur-sm rounded-lg p-2">
                    <p className="text-white text-xs font-semibold">Strategy</p>
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden h-32 shadow-lg border border-purple-100">
                  <img 
                    src="https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                    alt="Digital marketing"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-slate-900/60 backdrop-blur-sm rounded-lg p-2">
                    <p className="text-white text-xs font-semibold">Marketing</p>
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden h-32 shadow-lg border border-purple-100">
                  <img 
                    src="https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                    alt="Creative design"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-slate-900/60 backdrop-blur-sm rounded-lg p-2">
                    <p className="text-white text-xs font-semibold">Design</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="space-y-6">
              <p className="text-sm font-semibold text-pink-600 tracking-widest">WHO WE ARE</p>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
                Our Team Works Together To Achieve Success
              </h3>
              <p className="text-slate-700 text-lg leading-relaxed">
                Our experienced team of digital marketing professionals is dedicated to delivering exceptional results. With combined expertise in strategy, design, and execution, we create comprehensive solutions tailored to your business goals.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  Proven track record of success
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  Client-focused approach
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  Innovative solutions
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  Real-time analytics and reporting
                </li>
              </ul>
              <button 
                onClick={handleNavigateToServices}
                className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-cyan-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition hover:scale-105"
              >
                Discover Our Story
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Explore;