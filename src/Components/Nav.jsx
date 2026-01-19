import React, { useState } from 'react';
import { Menu, X, Search, ShoppingCart } from 'lucide-react';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-white via-blue-50 to-white shadow-lg border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16 relative">
          {/* Logo - Left */}
          <div className="absolute left-0 flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
            <span className="text-3xl font-bold text-purple-600">↑</span>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-900 leading-tight">UpCurve</span>
              <span className="text-xs font-semibold text-purple-500">Media</span>
            </div>
          </div>

          {/* Desktop Menu - Center */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-slate-700 hover:text-purple-600 font-medium transition duration-300 relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#about" className="text-slate-700 hover:text-purple-600 font-medium transition duration-300 relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#services" className="text-slate-700 hover:text-purple-600 font-medium transition duration-300 relative group">
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="/contact" className="text-slate-700 hover:text-purple-600 font-medium transition duration-300 relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>

          {/* Mobile Menu Button & Cart - Right */}
          <div className="absolute right-0 flex items-center gap-4">
            {/* Search Box - Desktop */}
            <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 border border-purple-200">
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="bg-transparent text-slate-700 placeholder-slate-400 outline-none w-40"
              />
              <Search size={18} className="text-purple-600" />
            </div>

            {/* Cart Icon */}
            <button className="text-purple-600 hover:text-purple-700 transition relative">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">0</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-purple-600 hover:text-purple-700 transition"
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-6 pt-4 space-y-3 border-t border-purple-100">
            <a 
              href="#home" 
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-slate-700 hover:bg-purple-100 hover:text-purple-600 rounded-lg transition"
            >
              Home
            </a>
            <a 
              href="#about" 
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-slate-700 hover:bg-purple-100 hover:text-purple-600 rounded-lg transition"
            >
              About
            </a>
            <a 
              href="#services" 
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-slate-700 hover:bg-purple-100 hover:text-purple-600 rounded-lg transition"
            >
              Services
            </a>
            <a 
              href="#contact" 
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-slate-700 hover:bg-purple-100 hover:text-purple-600 rounded-lg transition"
            >
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;