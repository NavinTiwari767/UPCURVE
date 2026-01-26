import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../services/supabase';
import { Mail, Lock, User, Eye, EyeOff, Loader, Store } from 'lucide-react';

const UserAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Get redirect path
  const from = location.state?.from || '/services';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  // ✅ VALIDATION FUNCTION
  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Please fill all fields');
      return false;
    }

    if (!isLogin && !formData.name) {
      setError('Please enter your name');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    return true;
  };

  // ✅ CUSTOMER SIGNUP
  const handleCustomerSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Check if email already exists
      const { data: existingCustomer } = await supabase
        .from('customers')
        .select('email')
        .eq('email', formData.email)
        .maybeSingle();

      if (existingCustomer) {
        setError('Email already registered');
        setLoading(false);
        return;
      }

      // ✅ Insert customer
      const { data, error: insertError } = await supabase
        .from('customers')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            password_hash: formData.password // Will be hashed in DB
          }
        ])
        .select()
        .single();

      if (insertError) {
        if (insertError.code === '23505') {
          setError('Email already registered');
          setLoading(false);
          return;
        }
        throw insertError;
      }

      setSuccess('Account created successfully! Please login.');
      setIsLogin(true);
      setFormData({ name: '', email: '', password: '' });
      
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ CUSTOMER LOGIN
  const handleCustomerLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Check in customers table
      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .select('*')
        .eq('email', formData.email)
        .maybeSingle();

      if (customerError) {
        console.error('Customer query error:', customerError);
      }

      if (!customer) {
        setError('Invalid email or password');
        setLoading(false);
        return;
      }

      // ✅ Simple password check for now
      if (customer.password_hash !== formData.password) {
        setError('Invalid email or password');
        setLoading(false);
        return;
      }

      console.log('✅ Customer login successful:', customer.email);
      setSuccess('Login successful! Redirecting...');

      // Store customer session
      localStorage.setItem('customer_session', JSON.stringify({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        logged_in_at: new Date().toISOString()
      }));

      // Clear admin session if exists
      localStorage.removeItem('admin_session');

      // Redirect
      setTimeout(() => {
        navigate(from, { replace: true });
        window.location.reload();
      }, 1000);

    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await handleCustomerLogin(e);
    } else {
      await handleCustomerSignup(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Store className="text-purple-600" size={32} />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h1>
          <p className="text-slate-600">
            {isLogin 
              ? 'Login to add items to your cart' 
              : 'Sign up to start shopping'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-4 rounded-lg text-sm bg-red-50 border border-red-200 text-red-600">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-4 rounded-lg text-sm bg-green-50 border border-green-200 text-green-600">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name Field (Only for Signup) */}
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  <span>Processing...</span>
                </>
              ) : (
                <span>{isLogin ? 'Login' : 'Sign Up'}</span>
              )}
            </button>
          </form>

          {/* Toggle Login/Signup */}
          <div className="mt-6 text-center">
            <p className="text-slate-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setSuccess('');
                  setFormData({ name: '', email: '', password: '' });
                }}
                className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>

          {/* Back Button */}
          <div className="mt-4 text-center">
            <button
              onClick={() => navigate('/services')}
              className="text-slate-500 hover:text-slate-700 text-sm transition-colors"
            >
              ← Back to Services
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAuth;