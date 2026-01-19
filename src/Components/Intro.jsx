import React from 'react';
import { Play, CheckCircle, Phone } from 'lucide-react';

const Intro = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white via-blue-50 to-purple-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <p className="text-sm font-semibold text-pink-600 tracking-widest">WELCOME TO OUR COMPANY</p>
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900">
                We are Creative Digital <span className="text-purple-600">Marketing</span> Agency
              </h1>
              <p className="text-lg text-slate-700 leading-relaxed">
                We are 120+ professional software engineers with more than 5 years of experience in delivering superior products. Believe in because you've seen it. Here are real numbers.
              </p>

              {/* CTA Buttons */}
              <div className="flex gap-4 pt-4">
                <button className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition">
                  <span>Contact Us</span>
                  <span className="text-xl">→</span>
                </button>
                <button className="flex items-center gap-3 px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-full font-semibold hover:bg-purple-600 hover:text-white transition">
                  <Play size={20} className="fill-current" />
                  Watch Video
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-8">
                <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white p-6 rounded-3xl">
                  <h3 className="text-3xl font-bold">5.2k</h3>
                  <p className="text-sm font-medium">Client Satisfaction</p>
                </div>
                <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white p-6 rounded-3xl">
                  <h3 className="text-3xl font-bold">98%</h3>
                  <p className="text-sm font-medium">Success Rate</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200 via-pink-100 to-purple-100 rounded-3xl blur-3xl opacity-60"></div>
                
                {/* Main Image - Professional Woman */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Professional business woman presenting digital marketing strategy"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                  
                  {/* Overlay Text */}
                  <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="text-white text-xl font-bold">Digital Marketing Expert</h3>
                    <p className="text-gray-200 text-sm">Crafting successful campaigns since 2018</p>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-4 shadow-xl z-10 border border-purple-200">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-slate-900">98.84%</p>
                    <p className="text-xs text-slate-600">Engagement Rate</p>
                  </div>
                </div>

                {/* Purple Circle */}
                <div className="absolute -right-6 bottom-20 w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full shadow-lg flex items-center justify-center">
                  <Play size={24} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left - Image and Text */}
            <div className="space-y-6">
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
                    <div className="relative rounded-2xl overflow-hidden shadow-xl h-64">
                      <img 
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                        alt="Team meeting discussing marketing strategy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-600/40 to-transparent"></div>
                    </div>
                  </div>
                  
                  {/* Smaller Images */}
                  <div className="relative rounded-xl overflow-hidden shadow-xl h-48">
                    <img 
                      src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                      alt="Social media analytics dashboard"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-600/30 to-transparent"></div>
                  </div>
                  
                  <div className="relative rounded-xl overflow-hidden shadow-xl h-48">
                    <img 
                      src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                      alt="Content creation and graphic design"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-600/30 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Features List */}
            <div className="space-y-6">
              {/* Feature 1 */}
              <div className="flex gap-4 items-start bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border border-purple-100">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                  <CheckCircle size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Guaranteed Results</h3>
                  <p className="text-slate-600 mt-1">We deliver measurable outcomes for your business</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4 items-start bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border border-purple-100">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                  <CheckCircle size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Quality Services</h3>
                  <p className="text-slate-600 mt-1">Premium quality solutions tailored to your needs</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex gap-4 items-start bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border border-purple-100">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                  <CheckCircle size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">On Time Services</h3>
                  <p className="text-slate-600 mt-1">Always deliver projects on schedule</p>
                </div>
              </div>

              {/* Team Photo */}
              <div className="relative rounded-xl overflow-hidden shadow-lg mt-8">
                <img 
                  src="https://images.unsplash.com/photo-1551836026-d5c2c5af91f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Our professional marketing team"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent p-4">
                  <p className="text-white text-sm font-semibold">Our Expert Team</p>
                  <p className="text-gray-200 text-xs">120+ professionals working for your success</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition">
                  <span>Contact Us</span>
                  <span className="text-xl">→</span>
                </button>
                <button className="flex items-center justify-center gap-2 px-8 py-3 bg-cyan-500 text-white rounded-full font-semibold hover:bg-cyan-600 transition">
                  <Phone size={18} />
                  <span>7991647990</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Intro;