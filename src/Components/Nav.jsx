import React, { useState, useContext, useEffect } from 'react';
import { Menu, X, Search, ShoppingCart, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Nav = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  
  const { getCartCount, user: contextUser } = useContext(CartContext);
  const cartCount = getCartCount();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(contextUser);
  }, [contextUser]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
    setShowUserDropdown(false);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('customer_session');
      localStorage.removeItem('cart');
      setShowUserDropdown(false);
      setCurrentUser(null);
      
      navigate('/');
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // ✅ Admin access ke liye /login pe redirect
  const handleAdminAccess = () => {
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-white via-blue-50 to-white shadow-lg border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-85 transition flex-shrink-0"
            onClick={() => handleNavigation('/')}
          >
            <img 
              src="/src/assets/upCurve.jpeg" 
              alt="UpCurve Logo"
              className="h-16 w-auto object-contain"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {['Home', 'About', 'Services', 'Blog', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => handleNavigation(`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`)}
                className="text-slate-700 hover:text-purple-600 font-medium transition duration-300 relative group bg-none border-none cursor-pointer"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Search - Desktop */}
            <div className="hidden lg:flex items-center bg-slate-100 rounded-full px-4 py-2 border border-purple-200">
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="bg-transparent text-slate-700 placeholder-slate-400 outline-none w-32"
              />
              <Search size={18} className="text-purple-600" />
            </div>

            {/* Cart Icon */}
            <button 
              onClick={() => handleNavigation('/cart')}
              className="text-purple-600 hover:text-purple-700 transition relative hover:scale-110"
              title="View Cart"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* ✅ USER MENU - Desktop */}
            <div className="hidden md:block">
              {currentUser ? (
                <div className="relative">
                  {/* User Avatar Button */}
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-50 hover:bg-purple-100 rounded-full transition-colors"
                  >
                    <User size={20} className="text-purple-600" />
                    <span className="text-sm font-semibold text-slate-700 truncate max-w-[120px]">
                      {currentUser.name || currentUser.email?.split('@')[0] || 'User'}
                    </span>
                  </button>

                  {/* User Dropdown */}
                  {showUserDropdown && (
                    <>
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-purple-100 py-2 z-50">
                        <div className="px-4 py-3 border-b border-slate-200">
                          <p className="text-sm font-semibold text-slate-900 truncate">
                            {currentUser.name || 'User'}
                          </p>
                          <p className="text-xs text-slate-600 truncate">
                            {currentUser.email}
                          </p>
                        </div>

                        <button
                          onClick={() => handleNavigation('/cart')}
                          className="w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors flex items-center gap-3"
                        >
                          <ShoppingCart size={18} className="text-purple-600" />
                          <span className="text-sm text-slate-700">My Cart ({cartCount})</span>
                        </button>

                        {/* Admin Access Link - Only for admin users */}
                        {(currentUser.role === 'admin' || currentUser.role === 'super_admin') && (
                          <button
                            onClick={handleAdminAccess}
                            className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors flex items-center gap-3 text-red-600"
                          >
                            <span className="text-sm font-semibold">Admin Panel</span>
                          </button>
                        )}

                        <div className="border-t border-slate-200 mt-2"></div>

                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors flex items-center gap-3 text-red-600"
                        >
                          <LogOut size={18} />
                          <span className="text-sm font-semibold">Logout</span>
                        </button>
                      </div>

                      {/* Click outside to close */}
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowUserDropdown(false)}
                      ></div>
                    </>
                  )}
                </div>
              ) : (
                /* ✅ SIRF "Login / Sign Up" BUTTON (Customer ke liye) */
                <button 
                  onClick={() => handleNavigation('/user-auth')}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
                >
                  Login / Sign Up
                </button>
              )}
            </div>

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
            {/* User Info - Mobile */}
            {currentUser && (
              <div className="px-4 py-3 bg-purple-50 rounded-lg mb-3">
                <p className="text-sm font-semibold text-slate-900 truncate">
                  👋 {currentUser.name || 'User'}
                </p>
                <p className="text-xs text-slate-600 truncate">
                  {currentUser.email}
                </p>
              </div>
            )}

            {/* Mobile Search */}
            <div className="px-4">
              <div className="flex items-center bg-slate-100 rounded-full px-4 py-2 border border-purple-200">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="bg-transparent text-slate-700 placeholder-slate-400 outline-none flex-1"
                />
                <Search size={18} className="text-purple-600" />
              </div>
            </div>

            {/* Mobile Navigation Links */}
            {['Home', 'About', 'Services', 'Blog', 'Contact', 'Cart'].map((item) => (
              <button 
                key={item}
                onClick={() => handleNavigation(`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`)}
                className="block w-full text-left px-4 py-2 text-slate-700 hover:bg-purple-100 hover:text-purple-600 rounded-lg transition bg-none border-none cursor-pointer"
              >
                {item === 'Cart' ? `🛒 Cart (${cartCount})` : item}
              </button>
            ))}

            <div className="border-t border-purple-200 my-3"></div>

            {/* Auth Buttons - Mobile */}
            {currentUser ? (
              <>
                {/* Admin Access for Admin Users - Mobile */}
                {(currentUser.role === 'admin' || currentUser.role === 'super_admin') && (
                  <button 
                    onClick={handleAdminAccess}
                    className="block w-full text-left px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg transition hover:shadow-lg mb-2"
                  >
                    🛡️ Admin Panel
                  </button>
                )}
                
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 bg-red-500 text-white rounded-lg transition hover:bg-red-600 flex items-center gap-2"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              /* ✅ Mobile me bhi sirf Login/Signup button */
              <button 
                onClick={() => handleNavigation('/user-auth')}
                className="block w-full text-left px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg transition hover:shadow-lg"
              >
                Login / Sign Up
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;