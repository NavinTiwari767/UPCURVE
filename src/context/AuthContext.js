import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../services/supabase';
import { Mail, Lock, User, Eye, EyeOff, Loader, Shield, Store } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // Import custom hook

const UserAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login: authLogin, setRedirect } = useAuth(); // Get auth functions
  
  const [isLogin, setIsLogin] = useState(true);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // ✅ Get redirect path from location state OR default
  useEffect(() => {
    const from = location.state?.from || '/services';
    setRedirect(from); // Store in auth context
    console.log('🔄 Redirect path set to:', from);
  }, [location, setRedirect]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  // ✅ COMMON VALIDATION FUNCTION
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
      // Check if email already exists in customers
      const { data: existingCustomer, error: checkError } = await supabase
        .from('customers')
        .select('email')
        .eq('email', formData.email)
        .maybeSingle();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      if (existingCustomer) {
        setError('Email already registered');
        setLoading(false);
        return;
      }

      // Insert new customer
      const { data, error: insertError } = await supabase
        .from('customers')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            password_hash: formData.password
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

  // ✅ CUSTOMER LOGIN - FIXED VERSION
  const handleCustomerLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      console.log('🔐 Attempting customer login for:', formData.email);

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

      // ✅ Verify password (using RPC or direct comparison for development)
      let passwordValid = false;

      // Try RPC function first
      try {
        const { data: verifyResult, error: verifyError } = await supabase
          .rpc('verify_user_password', {
            user_email: formData.email,
            user_password: formData.password
          });

        if (!verifyError && verifyResult) {
          passwordValid = true;
          console.log('✅ Password verified via RPC');
        }
      } catch (rpcErr) {
        console.log('⚠️ RPC function not available, using fallback');
      }

      // Fallback for development
      if (!passwordValid && customer.password_hash === formData.password) {
        passwordValid = true;
        console.log('✅ Password verified via direct comparison');
      }

      if (!passwordValid) {
        setError('Invalid email or password');
        setLoading(false);
        return;
      }

      console.log('✅ Customer login successful:', customer.email);
      setSuccess('Login successful! Redirecting...');

      // ✅ USE AUTH CONTEXT FOR LOGIN (This ensures proper state sync)
      const loginSuccess = authLogin({
        id: customer.id,
        name: customer.name,
        email: customer.email
      });

      if (loginSuccess) {
        console.log('✅ Auth context login successful');
      }

    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  // ✅ ADMIN LOGIN (Same as before, but with improved redirect)
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      console.log('🔐 Attempting admin login for:', formData.email);

      // Method 1: Supabase Auth
      try {
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });

        if (!authError && authData.user) {
          const userRole = authData.user.user_metadata?.role;
          const isAdmin = userRole === 'admin' || userRole === 'super_admin';
          
          if (!isAdmin) {
            await supabase.auth.signOut();
            setError('❌ Admin access only! Please use customer login.');
            setLoading(false);
            return;
          }

          console.log('✅ Admin login successful via Supabase Auth');
          setSuccess('Admin login successful! Redirecting...');

          localStorage.setItem('admin_session', JSON.stringify({
            id: authData.user.id,
            name: authData.user.user_metadata?.name || 'Admin',
            email: authData.user.email,
            role: userRole || 'admin',
            is_supabase_auth: true,
            logged_in_at: new Date().toISOString()
          }));

          localStorage.removeItem('customer_session');

          setTimeout(() => {
            navigate('/admin', { replace: true });
            window.location.reload();
          }, 1000);
          return;
        }
      } catch (authError) {
        console.log('⚠️ Supabase Auth failed:', authError.message);
      }

      // Method 2 & 3: Custom table or hardcoded (same as before)
      // ... (keep your existing admin login logic here)

    } catch (err) {
      console.error('💥 Admin login error:', err);
      setError(err.message || 'Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle form submission based on mode
  const handleSubmit = async (e) => {
    if (isAdminLogin) {
      await handleAdminLogin(e);
    } else if (isLogin) {
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
            {isAdminLogin ? (
              <div className="p-3 bg-red-100 rounded-full">
                <Shield className="text-red-600" size={32} />
              </div>
            ) : (
              <div className="p-3 bg-purple-100 rounded-full">
                <Store className="text-purple-600" size={32} />
              </div>
            )}
          </div>
          
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            {isAdminLogin ? 'Admin Portal' : isLogin ? 'Welcome Back!' : 'Create Account'}
          </h1>
          <p className="text-slate-600">
            {isAdminLogin 
              ? 'Login to manage your store' 
              : isLogin 
                ? 'Login to add items to your cart' 
                : 'Sign up to start shopping'}
          </p>
        </div>

        {/* Toggle Admin/Customer Mode */}
        <div className="mb-6">
          <div className="bg-white p-1 rounded-lg border border-slate-200 inline-flex">
            <button
              onClick={() => {
                setIsAdminLogin(false);
                setIsLogin(true);
                setError('');
                setSuccess('');
                setFormData({ name: '', email: '', password: '' });
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${!isAdminLogin 
                ? 'bg-purple-600 text-white shadow' 
                : 'text-slate-600 hover:text-slate-900'}`}
            >
              Customer
            </button>
            <button
              onClick={() => {
                setIsAdminLogin(true);
                setIsLogin(true);
                setError('');
                setSuccess('');
                setFormData({ name: '', email: '', password: '' });
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${isAdminLogin 
                ? 'bg-red-600 text-white shadow' 
                : 'text-slate-600 hover:text-slate-900'}`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Form Card */}
        <div className={`bg-white rounded-2xl shadow-xl p-8 border ${isAdminLogin ? 'border-red-100' : 'border-purple-100'}`}>
          {/* Error/Success Messages */}
          {error && (
            <div className={`mb-4 p-4 rounded-lg text-sm ${isAdminLogin 
              ? 'bg-red-50 border border-red-200 text-red-600' 
              : 'bg-red-50 border border-red-200 text-red-600'}`}>
              {error}
            </div>
          )}
          {success && (
            <div className={`mb-4 p-4 rounded-lg text-sm ${isAdminLogin 
              ? 'bg-green-50 border border-green-200 text-green-600' 
              : 'bg-green-50 border border-green-200 text-green-600'}`}>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name Field (Only for Customer Signup) */}
            {!isLogin && !isAdminLogin && (
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
                  placeholder={isAdminLogin ? "Enter admin email" : "Enter your email"}
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
              className={`w-full py-3 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${isAdminLogin 
                ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:shadow-red-500/30' 
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-purple-500/30'}`}
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  <span>Processing...</span>
                </>
              ) : (
                <span>
                  {isAdminLogin 
                    ? 'Admin Login' 
                    : isLogin 
                      ? 'Login' 
                      : 'Sign Up'}
                </span>
              )}
            </button>
          </form>

          {/* Toggle Login/Signup (Only for Customer) */}
          {!isAdminLogin && (
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
          )}

          {/* Back Button */}
          <div className="mt-4 text-center">
            <button
              onClick={() => navigate(isAdminLogin ? '/' : '/services')}
              className="text-slate-500 hover:text-slate-700 text-sm transition-colors"
            >
              ← Back to {isAdminLogin ? 'Home' : 'Services'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAuth;