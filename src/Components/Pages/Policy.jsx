import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Truck, 
  RefreshCw, 
  FileText, 
  Cookie, 
  CheckCircle,
  ChevronRight,
  ArrowLeft,
  Home
} from 'lucide-react';

const Policy = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('privacy');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation trigger
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Handle hash in URL
    const hash = window.location.hash.substring(1);
    if (hash && ['privacy', 'terms', 'shipping', 'refund', 'cookies'].includes(hash)) {
      setActiveSection(hash);
    }

    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigation = (path) => {
    scrollToTop();
    navigate(path);
  };

  const policySections = [
    {
      id: 'privacy',
      icon: Shield,
      title: 'Privacy Policy',
      color: 'from-purple-500 to-purple-600',
      lastUpdated: 'January 15, 2024'
    },
    {
      id: 'terms',
      icon: FileText,
      title: 'Terms of Service',
      color: 'from-blue-500 to-blue-600',
      lastUpdated: 'January 10, 2024'
    },
    {
      id: 'shipping',
      icon: Truck,
      title: 'Shipping & Delivery Policy',
      color: 'from-green-500 to-green-600',
      lastUpdated: 'December 28, 2023'
    },
    {
      id: 'refund',
      icon: RefreshCw,
      title: 'Refund & Returns Policy',
      color: 'from-orange-500 to-orange-600',
      lastUpdated: 'December 25, 2023'
    },
    {
      id: 'cookies',
      icon: Cookie,
      title: 'Cookies Policy',
      color: 'from-pink-500 to-pink-600',
      lastUpdated: 'January 5, 2024'
    }
  ];

  const privacyPolicyContent = {
    introduction: `At UpCurve Media, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.`,
    sections: [
      {
        title: 'Information We Collect',
        content: `We collect personal information that you voluntarily provide to us when you register on the website, express interest in obtaining information about us or our products and services, or otherwise contact us.`,
        points: [
          'Personal identification information (Name, email address, phone number)',
          'Payment information (processed securely through third-party payment processors)',
          'Technical data (IP address, browser type, operating system)',
          'Usage data (pages visited, time spent on site, click patterns)'
        ]
      },
      {
        title: 'How We Use Your Information',
        content: `We use personal information collected via our website for various business purposes:`,
        points: [
          'To provide and maintain our services',
          'To process your transactions and manage your orders',
          'To send administrative information to you',
          'To respond to inquiries and offer support',
          'To send marketing and promotional communications',
          'To improve our website and services',
          'To comply with legal obligations'
        ]
      },
      {
        title: 'Information Sharing',
        content: `We may share information we have collected about you in certain situations:`,
        points: [
          'With service providers who perform services for us',
          'Business transfers (in case of merger or acquisition)',
          'With your consent',
          'For legal purposes and safety'
        ]
      },
      {
        title: 'Data Security',
        content: `We have implemented appropriate technical and organizational security measures to protect the security of any personal information we process. However, please remember that no method of transmission over the Internet or method of electronic storage is 100% secure.`
      },
      {
        title: 'Your Rights',
        content: `Depending on your location, you may have certain rights regarding your personal information:`,
        points: [
          'Right to access your personal information',
          'Right to correct inaccurate data',
          'Right to delete your personal information',
          'Right to restrict processing',
          'Right to data portability',
          'Right to object to processing'
        ]
      },
      {
        title: 'Contact Us',
        content: `If you have questions or comments about this Privacy Policy, please contact us at: privacy@upcurvemedia.com`
      }
    ]
  };

  const termsOfServiceContent = {
    introduction: `Welcome to UpCurve Media. These Terms of Service govern your use of our website and services. By accessing or using our services, you agree to be bound by these terms.`,
    sections: [
      {
        title: 'Acceptance of Terms',
        content: `By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.`
      },
      {
        title: 'Use License',
        content: `Permission is granted to temporarily download one copy of the materials on UpCurve Media's website for personal, non-commercial transitory viewing only.`
      },
      {
        title: 'User Accounts',
        content: `When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding your password.`
      },
      {
        title: 'Prohibited Activities',
        content: `You may not use the site for any unlawful purpose or to solicit others to perform unlawful acts. Specifically, you agree not to:`,
        points: [
          'Harass, abuse, or harm another person',
          'Upload or transmit viruses or any malicious code',
          'Collect or track personal information of others',
          'Interfere with or circumvent security features',
          'Use the service for any unauthorized commercial purpose'
        ]
      },
      {
        title: 'Intellectual Property',
        content: `All content included on this site, such as text, graphics, logos, images, and software, is the property of UpCurve Media and protected by copyright laws.`
      },
      {
        title: 'Termination',
        content: `We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, for any reason whatsoever.`
      }
    ]
  };

  const shippingPolicyContent = {
    introduction: `This Shipping & Delivery Policy outlines our practices regarding the shipping and delivery of digital services and any physical goods we may provide.`,
    sections: [
      {
        title: 'Digital Services Delivery',
        content: `Most of our services are delivered digitally. Upon successful payment and approval:`,
        points: [
          'Website designs are delivered via secure links within 7-14 business days',
          'Digital marketing services begin within 24-48 hours of agreement',
          'Logo designs are delivered within 5-7 business days',
          'Access credentials are sent to your registered email'
        ]
      },
      {
        title: 'Physical Goods Shipping',
        content: `For any physical goods (merchandise, printed materials):`,
        points: [
          'Shipping within India: 5-7 business days',
          'International shipping: 10-15 business days',
          'Shipping costs are calculated at checkout',
          'We use reputable courier services'
        ]
      },
      {
        title: 'Delivery Timeframes',
        content: `Delivery times are estimates and commence from the date of shipping, rather than the date of order. We make every effort to deliver within the estimated timeframe.`
      },
      {
        title: 'Shipping Charges',
        content: `Shipping charges for your order will be calculated and displayed at checkout. We offer free shipping on orders over ₹5000 within India.`
      },
      {
        title: 'International Shipping',
        content: `We currently ship to select international locations. Additional customs fees, import duties, or taxes may apply and are the responsibility of the recipient.`
      }
    ]
  };

  const refundPolicyContent = {
    introduction: `At UpCurve Media, we strive to ensure complete customer satisfaction with our services. This Refund & Returns Policy outlines the circumstances under which refunds are provided.`,
    sections: [
      {
        title: 'Digital Services Refund Policy',
        content: `For our digital services (web design, digital marketing, logo design):`,
        points: [
          'Full refund if project is canceled within 24 hours of payment',
          '50% refund if canceled after 24 hours but before work begins',
          'No refund once work has commenced and deliverables have been shared',
          'Refunds are processed within 7-10 business days'
        ]
      },
      {
        title: 'Physical Goods Returns',
        content: `For any physical merchandise:`,
        points: [
          '30-day return policy from date of delivery',
          'Items must be in original condition with all tags',
          'Customer bears return shipping costs unless item is defective',
          'Refund issued upon receipt and inspection of returned item'
        ]
      },
      {
        title: 'Refund Process',
        content: `To request a refund:`,
        points: [
          'Contact our support team at support@upcurvemedia.com',
          'Provide your order number and reason for refund',
          'Allow 3-5 business days for refund request review',
          'Refunds are issued to the original payment method'
        ]
      },
      {
        title: 'Non-Refundable Items',
        content: `The following are non-refundable:`,
        points: [
          'Customized digital products after delivery',
          'Services where work has already commenced',
          'Downloadable digital products',
          'Gift cards and promotional items'
        ]
      }
    ]
  };

  const cookiesPolicyContent = {
    introduction: `This Cookies Policy explains what cookies are, how we use them, and how you can manage your cookie preferences.`,
    sections: [
      {
        title: 'What Are Cookies?',
        content: `Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better user experience.`
      },
      {
        title: 'How We Use Cookies',
        content: `We use cookies for several purposes:`,
        points: [
          'Essential Cookies: Required for the website to function properly',
          'Performance Cookies: Help us understand how visitors interact with our website',
          'Functionality Cookies: Remember your preferences and settings',
          'Targeting Cookies: Used to deliver relevant advertisements'
        ]
      },
      {
        title: 'Types of Cookies We Use',
        content: `We use both session and persistent cookies:`,
        points: [
          'Session Cookies: Temporary cookies that expire when you close your browser',
          'Persistent Cookies: Remain on your device for a set period or until deleted',
          'First-party Cookies: Set by our website',
          'Third-party Cookies: Set by third-party services we use'
        ]
      },
      {
        title: 'Managing Cookies',
        content: `You can control and/or delete cookies as you wish. Most web browsers allow some control of most cookies through browser settings.`
      },
      {
        title: 'Your Consent',
        content: `By continuing to use our website, you consent to our use of cookies as described in this policy.`
      }
    ]
  };

  const getActiveContent = () => {
    switch(activeSection) {
      case 'privacy': return privacyPolicyContent;
      case 'terms': return termsOfServiceContent;
      case 'shipping': return shippingPolicyContent;
      case 'refund': return refundPolicyContent;
      case 'cookies': return cookiesPolicyContent;
      default: return privacyPolicyContent;
    }
  };

  const activeContent = getActiveContent();
  const activePolicy = policySections.find(p => p.id === activeSection);

  return (
    <div className="w-full bg-gradient-to-b from-white via-purple-50/50 to-blue-50/50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16 px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="mb-6">
            <button
              onClick={() => handleNavigation('/')}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft size={18} />
              <span>Back to Home</span>
            </button>
            <div className="flex items-center gap-2 text-sm mb-2">
              <span 
                onClick={() => handleNavigation('/')}
                className="hover:text-purple-200 transition-colors cursor-pointer"
              >
                Home
              </span>
              <ChevronRight size={16} />
              <span className="text-purple-200">Policies</span>
            </div>
          </div>
          
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Policies</h1>
            <p className="text-xl text-white/90 max-w-3xl">
              Transparency and trust are at the core of everything we do. Review our comprehensive policies to understand how we operate and protect your interests.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className={`sticky top-24 bg-white rounded-2xl shadow-lg border border-purple-100 p-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FileText size={20} className="text-purple-600" />
                  All Policies
                </h2>
                <p className="text-slate-600 text-sm">
                  Select a policy to view detailed information
                </p>
              </div>
              
              <div className="space-y-2">
                {policySections.map((policy) => {
                  const Icon = policy.icon;
                  const isActive = activeSection === policy.id;
                  
                  return (
                    <button
                      key={policy.id}
                      onClick={() => {
                        setActiveSection(policy.id);
                        window.history.pushState(null, '', `#${policy.id}`);
                        scrollToTop();
                      }}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200'
                          : 'hover:bg-slate-50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${policy.color} flex items-center justify-center`}>
                          <Icon size={20} className="text-white" />
                        </div>
                        <div>
                          <h3 className={`font-semibold ${isActive ? 'text-purple-700' : 'text-slate-700'}`}>
                            {policy.title}
                          </h3>
                          <p className="text-xs text-slate-500 mt-1">
                            Updated {policy.lastUpdated}
                          </p>
                        </div>
                      </div>
                      <ChevronRight 
                        size={18} 
                        className={`transition-transform ${isActive ? 'text-purple-600 rotate-90' : 'text-slate-400 group-hover:text-purple-500 group-hover:translate-x-1'}`}
                      />
                    </button>
                  );
                })}
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <CheckCircle size={20} className="text-green-600" />
                  <div>
                    <p className="text-sm font-semibold text-green-800">Need Help?</p>
                    <p className="text-xs text-green-700">
                      Contact us for policy-related queries
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Policy Content */}
          <div className="lg:col-span-3">
            <div className={`bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              {/* Policy Header */}
              <div className="bg-gradient-to-r from-slate-50 to-purple-50 border-b border-slate-200 p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${activePolicy?.color} flex items-center justify-center`}>
                      {activePolicy && <activePolicy.icon size={28} className="text-white" />}
                    </div>
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                        {activePolicy?.title}
                      </h1>
                      <p className="text-slate-600 mt-1">
                        Last updated: {activePolicy?.lastUpdated}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors text-sm"
                    >
                      Print Policy
                    </button>
                    <button
                      onClick={() => {
                        const element = document.createElement('a');
                        const text = `${activePolicy?.title}\n\n${activeContent.introduction}\n\n${activeContent.sections.map(s => `${s.title}\n${s.content}\n${s.points ? s.points.map(p => `• ${p}`).join('\n') : ''}\n\n`).join('')}`;
                        const file = new Blob([text], { type: 'text/plain' });
                        element.href = URL.createObjectURL(file);
                        element.download = `${activePolicy?.title.toLowerCase().replace(/ /g, '-')}.txt`;
                        document.body.appendChild(element);
                        element.click();
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 text-sm"
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>

              {/* Policy Content */}
              <div className="p-6 md:p-8">
                {/* Introduction */}
                <div className="mb-8">
                  <p className="text-lg text-slate-700 leading-relaxed">
                    {activeContent.introduction}
                  </p>
                </div>

                {/* Policy Sections */}
                <div className="space-y-8">
                  {activeContent.sections.map((section, index) => (
                    <div 
                      key={index}
                      className={`bg-gradient-to-br from-white to-slate-50 rounded-xl border border-slate-200 p-6 transition-all duration-500 hover:border-purple-200 hover:shadow-md ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-purple-600">
                            {index + 1}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">
                          {section.title}
                        </h2>
                      </div>
                      
                      <div className="ml-11">
                        <p className="text-slate-700 mb-4 leading-relaxed">
                          {section.content}
                        </p>
                        
                        {section.points && (
                          <ul className="space-y-2">
                            {section.points.map((point, pointIndex) => (
                              <li key={pointIndex} className="flex items-start gap-3">
                                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <CheckCircle size={12} className="text-green-600" />
                                </div>
                                <span className="text-slate-700">{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Contact Information */}
                <div className="mt-12 pt-8 border-t border-slate-200">
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Shield size={22} className="text-purple-600" />
                      Questions About This Policy?
                    </h3>
                    <p className="text-slate-700 mb-4">
                      If you have any questions or concerns regarding this policy, please don't hesitate to contact our support team.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4 border border-slate-200">
                        <p className="font-semibold text-slate-900 mb-1">Email Support</p>
                        <a 
                          href="mailto:support@upcurvemedia.com" 
                          className="text-purple-600 hover:text-purple-700 transition-colors"
                        >
                          support@upcurvemedia.com
                        </a>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-slate-200">
                        <p className="font-semibold text-slate-900 mb-1">Phone Support</p>
                        <a 
                          href="tel:+917991647990" 
                          className="text-purple-600 hover:text-purple-700 transition-colors"
                        >
                          +91 79916 47990
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation Footer */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Need Quick Access?</h3>
              <p className="text-slate-300">Navigate to other important pages</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleNavigation('/')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-medium transition-colors flex items-center gap-2"
              >
                <Home size={18} />
                Home Page
              </button>
              <button
                onClick={() => handleNavigation('/contact')}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full font-medium transition-all duration-300"
              >
                Contact Us
              </button>
              <button
                onClick={scrollToTop}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-medium transition-colors"
              >
                Back to Top
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Print styles */
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Policy;