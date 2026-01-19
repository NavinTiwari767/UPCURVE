import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  Heart,
  ChevronRight
} from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#' },
    { name: 'Services', href: '#' },
    { name: 'Portfolio', href: '#' },
    { name: 'Team', href: '#' },
    { name: 'Contact', href: '#' }
  ];

  const services = [
    { name: 'Digital Marketing', href: '#' },
    { name: 'SEO Optimization', href: '#' },
    { name: 'Social Media Marketing', href: '#' },
    { name: 'Content Strategy', href: '#' },
    { name: 'Brand Development', href: '#' },
    { name: 'PPC Campaigns', href: '#' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <div className="w-full">
      {/* Main Footer */}
      <footer className="bg-gradient-to-br from-white via-purple-50 to-blue-50 pt-16 pb-8 px-4 border-t border-purple-200">
        <div className="max-w-7xl mx-auto">
          {/* Top Section - Newsletter */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-purple-100/40 via-blue-100/40 to-cyan-100/40 rounded-2xl p-8 md:p-12 backdrop-blur-sm border border-purple-300 shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                    Stay Updated With Latest Marketing Trends
                  </h3>
                  <p className="text-slate-700">
                    Subscribe to our newsletter and get exclusive insights delivered to your inbox.
                  </p>
                </div>
                <div className="relative">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="flex-1 px-6 py-4 bg-white/70 backdrop-blur-sm border border-purple-300 rounded-full text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent shadow-md"
                    />
                    <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center gap-2 group">
                      <span>Subscribe</span>
                      <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                  <p className="text-slate-600 text-sm mt-4">
                    By subscribing, you agree to our Privacy Policy
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Section - Links and Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Company Info */}
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl font-bold text-purple-600">↑</span>
                  <h2 className="text-2xl font-bold text-slate-900">UpCurve</h2>
                </div>
                <p className="text-xs font-semibold text-purple-500">Media</p>
              </div>
              <p className="text-slate-700 mb-6 leading-relaxed">
                We are a premier digital marketing agency dedicated to transforming businesses through innovative strategies and cutting-edge solutions.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 rounded-full bg-purple-100 hover:bg-gradient-to-r hover:from-purple-600 hover:to-cyan-500 flex items-center justify-center text-purple-600 hover:text-white transition-all duration-300 shadow-md"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <ChevronRight size={20} className="text-purple-600" />
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="text-slate-700 hover:text-purple-600 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <ChevronRight size={14} className="text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <ChevronRight size={20} className="text-purple-600" />
                Our Services
              </h3>
              <ul className="space-y-3">
                {services.map((service, idx) => (
                  <li key={idx}>
                    <a
                      href={service.href}
                      className="text-slate-700 hover:text-purple-600 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <ChevronRight size={14} className="text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <ChevronRight size={20} className="text-purple-600" />
                Contact Us
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-200/60 to-cyan-200/60 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Phone size={18} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-slate-900 font-semibold">Phone</p>
                    <p className="text-slate-700">+91 79916 47990</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-200/60 to-cyan-200/60 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Mail size={18} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-slate-900 font-semibold">Email</p>
                    <p className="text-slate-700">info@upcurvemedia.com</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-200/60 to-cyan-200/60 flex items-center justify-center flex-shrink-0 shadow-md">
                    <MapPin size={18} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-slate-900 font-semibold">Address</p>
                    <p className="text-slate-700">Kolkata, West Bengal, India</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-purple-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p className="text-slate-700">
                  © {new Date().getFullYear()} UpCurve Media Pvt Ltd. All rights reserved.
                </p>
              </div>
              
              <div className="flex items-center gap-6 text-slate-700 text-sm">
                <a href="#" className="hover:text-purple-600 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-purple-600 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-purple-600 transition-colors">Cookies Policy</a>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-slate-600 text-sm flex items-center justify-center gap-2">
                Made with <Heart size={14} className="text-pink-500 fill-pink-500" /> by UpCurve Team
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;