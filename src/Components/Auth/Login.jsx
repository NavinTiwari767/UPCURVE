import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../services/supabase';
import { Mail, Lock, Loader, Shield } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  // Get redirect path
  const from = location.state?.from || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate
      if (!email || !password) {
        setError('Please fill all fields');
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      console.log('🔐 Admin login attempt:', email);

      // ============================================
      // METHOD 1: Try Custom Admin Table FIRST (Database)
      // ============================================
      try {
        const { data: admin, error: adminError } = await supabase
          .from('admin_profiles')
          .select('*')
          .eq('email', email)
          .maybeSingle();

        if (!adminError && admin) {
          console.log('📦 Found admin in database:', admin.email);
          
          // ✅ Use RPC password verification
          const { data: isValid, error: verifyError } = await supabase.rpc('verify_admin_password', {
            admin_email: email,
            admin_password: password
          });

          if (!verifyError && isValid) {
            console.log('✅ Admin login via database!');
            setSuccess('✅ Admin login successful! Redirecting...');

            localStorage.setItem('admin_session', JSON.stringify({
              id: admin.id,
              name: admin.full_name || admin.name || 'Admin User',
              email: admin.email,
              role: admin.role || 'admin',
              source: 'database',
              logged_in_at: new Date().toISOString()
            }));

            localStorage.removeItem('customer_session');

            setTimeout(() => {
              navigate(from, { replace: true });
              window.location.reload();
            }, 1000);
            return;
          } else {
            console.log('❌ Password verification failed');
            setError('❌ Invalid admin credentials');
            setLoading(false);
            return;
          }
        } else if (adminError) {
          console.log('⚠️ Database query error:', adminError.message);
        } else {
          console.log('⚠️ Admin not found in database');
        }
      } catch (tableErr) {
        console.log('⚠️ Custom admin table error:', tableErr.message);
      }

      // ============================================
      // METHOD 2: Try Supabase Auth
      // ============================================
      try {
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: email,
          password: password
        });

        if (!authError && authData.user) {
          const userRole = authData.user.user_metadata?.role;
          
          if (userRole === 'admin' || userRole === 'super_admin') {
            console.log('✅ Admin login via Supabase Auth');
            setSuccess('✅ Admin login successful! Redirecting...');

            localStorage.setItem('admin_session', JSON.stringify({
              id: authData.user.id,
              name: authData.user.user_metadata?.name || 'Admin',
              email: authData.user.email,
              role: userRole,
              source: 'supabase_auth',
              logged_in_at: new Date().toISOString()
            }));

            localStorage.removeItem('customer_session');

            setTimeout(() => {
              navigate(from, { replace: true });
              window.location.reload();
            }, 1000);
            return;
          } else {
            await supabase.auth.signOut();
          }
        }
      } catch (authErr) {
        console.log('Supabase Auth not configured or failed');
      }

      // ============================================
      // METHOD 3: Hardcoded Fallback
      // ============================================
      if (email === 'admin@upcurve.com' && password === 'admin123') {
        console.log('⚠️ Using hardcoded fallback');
        setSuccess('✅ Admin login successful! Redirecting...');

        localStorage.setItem('admin_session', JSON.stringify({
          id: 'admin-fallback',
          name: 'Admin User',
          email: 'admin@upcurve.com',
          role: 'admin',
          source: 'hardcoded',
          logged_in_at: new Date().toISOString()
        }));

        localStorage.removeItem('customer_session');

        setTimeout(() => {
          navigate(from, { replace: true });
          window.location.reload();
        }, 1000);
        return;
      }

      // If we reach here, all methods failed
      setError('❌ Invalid admin credentials');

    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-red-600 to-orange-600 rounded-full shadow-lg">
              <Shield className="text-white" size={40} />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Admin Portal
          </h1>
          <p className="text-slate-600">
            Restricted access for administrators only
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-100">
          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="email"
                  placeholder="admin@example.com"
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  type="password"
                  placeholder="Enter admin password"
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Demo Credentials Note */}
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-xs">
              <p className="font-semibold mb-1">Demo Credentials:</p>
              <p>Email: <span className="font-mono">admin@upcurve.com</span></p>
              <p>Password: <span className="font-mono">admin123</span></p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Sign In as Admin</span>
              )}
            </button>
          </form>

          {/* Customer Login Link */}
          <div className="mt-6 text-center">
            <p className="text-slate-600 text-sm">
              Not an admin? 
              <button
                type="button"
                onClick={() => navigate('/user-auth')}
                className="ml-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors"
              >
                Go to Customer Login →
              </button>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            ⚠️ This portal is for authorized personnel only.
            Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 