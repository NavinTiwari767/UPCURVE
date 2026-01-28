import React, { useState, useContext, useEffect } from 'react';
import { Menu, X, ShoppingCart, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import upCurveLogo from '../assets/upCurve.jpeg';

const Nav = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  
  const { getCartCount, user: contextUser } = useContext(CartContext);
  const cartCount = getCartCount();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(contextUser);
  }, [contextUser]);

  const toggleMenu = () => setIsOpen(!isOpen);

  // ✅ UPDATED: Scroll to top on navigation
  const handleNavigation = (path) => {
    window.scrollTo(0, 0);
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
      
      window.scrollTo(0, 0);
      navigate('/');
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleAdminAccess = () => {
    window.scrollTo(0, 0);
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-white via-blue-50 to-white shadow-lg border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Updated height to h-24 for larger logo */}
        <div className="flex justify-between items-center h-24">
          {/* Logo - Made Larger */}
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-85 transition flex-shrink-0"
            onClick={() => handleNavigation('/')}
          >
            <img 
              src={upCurveLogo}
              alt="UpCurve Logo"
              className="h-20 w-auto object-contain"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['Home', 'About', 'Services', 'Blog', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => handleNavigation(`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`)}
                className="text-slate-700 hover:text-purple-600 font-semibold text-base transition duration-300 relative group bg-none border-none cursor-pointer"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-5">
            {/* Cart Icon */}
            <button 
              onClick={() => handleNavigation('/cart')}
              className="text-purple-600 hover:text-purple-700 transition relative hover:scale-110"
              title="View Cart"
            >
              <ShoppingCart size={28} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* USER MENU - Desktop */}
            <div className="hidden md:block">
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-purple-50 hover:bg-purple-100 rounded-full transition-colors"
                  >
                    <User size={22} className="text-purple-600" />
                    <span className="text-sm font-semibold text-slate-700 truncate max-w-[140px]">
                      {currentUser.name || currentUser.email?.split('@')[0] || 'User'}
                    </span>
                  </button>

                  {showUserDropdown && (
                    <>
                      <div className="absolute right-0 mt-3 w-72 bg-white rounded-lg shadow-xl border border-purple-100 py-2 z-50">
                        <div className="px-5 py-4 border-b border-slate-200">
                          <p className="text-sm font-semibold text-slate-900 truncate">
                            {currentUser.name || 'User'}
                          </p>
                          <p className="text-xs text-slate-600 truncate mt-1">
                            {currentUser.email}
                          </p>
                        </div>

                        <button
                          onClick={() => handleNavigation('/cart')}
                          className="w-full px-5 py-3 text-left hover:bg-purple-50 transition-colors flex items-center gap-3"
                        >
                          <ShoppingCart size={20} className="text-purple-600" />
                          <span className="text-sm text-slate-700 font-medium">My Cart ({cartCount})</span>
                        </button>

                        {(currentUser.role === 'admin' || currentUser.role === 'super_admin') && (
                          <button
                            onClick={handleAdminAccess}
                            className="w-full px-5 py-3 text-left hover:bg-red-50 transition-colors flex items-center gap-3 text-red-600"
                          >
                            <span className="text-sm font-semibold">🛡️ Admin Panel</span>
                          </button>
                        )}

                        <div className="border-t border-slate-200 mt-2"></div>

                        <button
                          onClick={handleLogout}
                          className="w-full px-5 py-3 text-left hover:bg-red-50 transition-colors flex items-center gap-3 text-red-600"
                        >
                          <LogOut size={20} />
                          <span className="text-sm font-semibold">Logout</span>
                        </button>
                      </div>

                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowUserDropdown(false)}
                      ></div>
                    </>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => handleNavigation('/user-auth')}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
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
              {isOpen ? <X size={36} /> : <Menu size={36} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-6 pt-4 space-y-3 border-t border-purple-100">
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

            {['Home', 'About', 'Services', 'Blog', 'Contact', 'Cart'].map((item) => (
              <button 
                key={item}
                onClick={() => handleNavigation(`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`)}
                className="block w-full text-left px-4 py-2 text-slate-700 hover:bg-purple-100 hover:text-purple-600 rounded-lg transition bg-none border-none cursor-pointer font-medium"
              >
                {item === 'Cart' ? `🛒 Cart (${cartCount})` : item}
              </button>
            ))}

            <div className="border-t border-purple-200 my-3"></div>

            {currentUser ? (
              <>
                {(currentUser.role === 'admin' || currentUser.role === 'super_admin') && (
                  <button 
                    onClick={handleAdminAccess}
                    className="block w-full text-left px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg transition hover:shadow-lg mb-2 font-medium"
                  >
                    🛡️ Admin Panel
                  </button>
                )}
                
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 bg-red-500 text-white rounded-lg transition hover:bg-red-600 flex items-center gap-2 font-medium"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button 
                onClick={() => handleNavigation('/user-auth')}
                className="block w-full text-left px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg transition hover:shadow-lg font-medium"
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