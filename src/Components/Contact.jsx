import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
// import { supabase } from '../../services/supabase';
import { supabase } from '../services/supabase';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: '',
    serviceType: 'Digital Marketing',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.firstName || !formData.email || !formData.phone || !formData.message) {
      setError('Please fill all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Phone validation (basic)
    if (formData.phone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Insert data into Supabase
      const { data, error: submitError } = await supabase
        .from('contacts')
        .insert([
          {
            first_name: formData.firstName,
            email: formData.email,
            phone: formData.phone,
            service_type: formData.serviceType,
            message: formData.message,
            status: 'new'
          }
        ])
        .select();

      if (submitError) throw submitError;

      console.log('✅ Contact form submitted successfully:', data);
      
      // Show success message
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          firstName: '',
          email: '',
          phone: '',
          serviceType: 'Digital Marketing',
          message: ''
        });
        setSubmitted(false);
      }, 3000);

    } catch (err) {
      console.error('❌ Error submitting contact form:', err);
      setError('Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const serviceTypes = [
    'Digital Marketing',
    'SEO Optimization',
    'Social Media Marketing',
    'Content Strategy',
    'Brand Development',
    'Website Design',
    'PPC Campaigns',
    'Email Marketing'
  ];

  return (
    <div className="w-full">
      {/* Contact Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Contact us background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-800/60 to-slate-900/70"></div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            Contact
          </h1>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-gradient-to-br from-white via-purple-50 to-blue-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-pink-600 tracking-widest mb-4">CONTACT US</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Excited About The Project? Please Get In Touch.
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {/* Contact Information Cards */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-200 hover:shadow-xl transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center">
                  <Phone size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Phone</h3>
              </div>
              <p className="text-slate-700">
                <a href="tel:+917991647990" className="hover:text-purple-600 transition">
                  +91 79916 47990
                </a>
              </p>
              <p className="text-slate-600 text-sm mt-2">Call us anytime, we're always ready to help</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-200 hover:shadow-xl transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 flex items-center justify-center">
                  <Mail size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Email</h3>
              </div>
              <p className="text-slate-700">
                <a href="mailto:info@upcurvemedia.com" className="hover:text-purple-600 transition">
                  info@upcurvemedia.com
                </a>
              </p>
              <p className="text-slate-600 text-sm mt-2">Drop us an email and we'll respond quickly</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-200 hover:shadow-xl transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center">
                  <MapPin size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Location</h3>
              </div>
              <p className="text-slate-700">
                Kolkata, West Bengal, India
              </p>
              <p className="text-slate-600 text-sm mt-2">Visit our office for a personal touch</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-purple-200">
            <h3 className="text-3xl font-bold text-slate-900 mb-8">Contact Me</h3>

            {submitted && (
              <div className="mb-8 p-6 bg-green-50 border border-green-300 rounded-xl flex items-center gap-3">
                <CheckCircle className="text-green-600" size={24} />
                <p className="text-green-700 font-semibold">
                  Thank you! Your message has been sent successfully. We'll get back to you soon.
                </p>
              </div>
            )}

            {error && (
              <div className="mb-8 p-6 bg-red-50 border border-red-300 rounded-xl">
                <p className="text-red-700 font-semibold">
                  ⚠️ {error}
                </p>
              </div>
            )}

            <div className="space-y-8">
              {/* First Row - First Name and Message */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3 uppercase">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                    className="w-full px-6 py-4 bg-slate-50 border border-purple-200 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3 uppercase">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type Your Message"
                    required
                    rows="4"
                    className="w-full px-6 py-4 bg-slate-50 border border-purple-200 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition resize-none"
                  />
                </div>
              </div>

              {/* Second Row - Phone and Email */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3 uppercase">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className="w-full px-6 py-4 bg-slate-50 border border-purple-200 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3 uppercase">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    className="w-full px-6 py-4 bg-slate-50 border border-purple-200 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Third Row - Service Type */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3 uppercase">
                  Select Service Type *
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-slate-50 border border-purple-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239333ea' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                >
                  {serviceTypes.map((service, idx) => (
                    <option key={idx} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-2 group ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                  {!loading && (
                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  )}
                </button>
                <p className="text-slate-600 text-sm">We'll get back to you within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;