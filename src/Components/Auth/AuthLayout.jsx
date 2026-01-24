import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle, linkText, linkPath }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
              UpCurve Media
            </h1>
          </Link>
          <p className="text-slate-600 mt-2">Professional Content Solutions</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-purple-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
            {subtitle && (
              <p className="text-slate-600 mt-2">{subtitle}</p>
            )}
          </div>

          {/* Form Content */}
          {children}

          {/* Footer Links */}
          <div className="mt-8 pt-6 border-t border-slate-200 text-center">
            <p className="text-slate-600">
              {linkText}{' '}
              <Link to={linkPath} className="font-semibold text-purple-600 hover:text-purple-700">
                {linkText.includes('Sign up') ? 'Sign up' : 'Sign in'}
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-slate-500 hover:text-slate-700">
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} UpCurve Media. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;