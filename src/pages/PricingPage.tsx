import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, ArrowLeft, Check, Star, Calendar, Phone, Users, Building, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const PricingPage = () => {
  const [ref, isVisible] = useScrollAnimation();
  const [activeTab, setActiveTab] = useState<'students' | 'educators' | 'schools'>('students');
  const location = useLocation();

  // Check if we should set a specific tab based on navigation state
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const studentTiers = [
    {
      name: 'Free Tier',
      emoji: '🌱',
      price: '$0',
      period: 'forever',
      features: [
        'Limited Access to Resources',
        'Community Support',
        'Basic Progress Tracking',
        'Access to Public Libraries'
      ],
      cta: 'Sign Up for Free',
      popular: false,
      gradient: 'from-slate-400 to-slate-500'
    },
    {
      name: 'Student Pro',
      emoji: '🚀',
      price: '$25',
      period: 'per month',
      features: [
        'Full Resource Access',
        'AI Learning Co-Pilot',
        'Advanced Analytics & Reports',
        'Priority Support',
        'Offline Access',
        'Custom Learning Paths'
      ],
      cta: 'Get Started',
      popular: true,
      gradient: 'from-teal-400 to-blue-500'
    },
    {
      name: 'Tutor Plus',
      emoji: '⭐',
      price: '$50',
      period: 'per month',
      features: [
        'Everything in Pro',
        'Personalized Performance Reporting',
        'Access to an Online Tutor',
        '1-on-1 Mentoring Sessions',
        'Certification Programs',
        'Career Guidance'
      ],
      cta: 'Go Premium',
      popular: false,
      gradient: 'from-purple-400 to-pink-500'
    }
  ];

  const educatorTiers = [
    {
      name: 'Educator Basic',
      emoji: '👨‍🏫',
      price: '$15',
      period: 'per month',
      features: [
        'Class Management Tools',
        'Student Progress Tracking',
        'Basic Analytics',
        'Curriculum Resources',
        'Email Support'
      ],
      cta: 'Start Teaching',
      popular: false,
      gradient: 'from-blue-400 to-teal-500'
    },
    {
      name: 'Educator Pro',
      emoji: '🎓',
      price: '$35',
      period: 'per month',
      features: [
        'Everything in Basic',
        'Advanced Student Analytics',
        'AI Teaching Assistant',
        'Custom Curriculum Builder',
        'Parent Communication Tools',
        'Priority Support'
      ],
      cta: 'Upgrade to Pro',
      popular: true,
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      name: 'Educator Elite',
      emoji: '🏆',
      price: '$60',
      period: 'per month',
      features: [
        'Everything in Pro',
        'Professional Development Credits',
        'Advanced Assessment Tools',
        'Multi-Class Management',
        'White-label Options',
        'Dedicated Account Manager'
      ],
      cta: 'Go Elite',
      popular: false,
      gradient: 'from-orange-400 to-red-500'
    }
  ];

  const tabs = [
    { id: 'students', label: 'Students', icon: '🎓', description: 'Individual learning plans' },
    { id: 'educators', label: 'Educators', icon: '👨‍🏫', description: 'Teaching & class management' },
    { id: 'schools', label: 'Schools', icon: '🏫', description: 'Institution-wide solutions' }
  ];

  const getCurrentTiers = () => {
    switch (activeTab) {
      case 'students':
        return studentTiers;
      case 'educators':
        return educatorTiers;
      default:
        return [];
    }
  };

  const tiers = getCurrentTiers();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-lg text-slate-800">Tuto ki Tulo mwa Afrika</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-slate-600 hover:text-teal-500 transition-colors duration-200">
                Home
              </Link>
              <Link to="/resources" className="text-slate-600 hover:text-teal-500 transition-colors duration-200">
                Resources
              </Link>
              <span className="text-teal-600 font-medium">Pricing</span>
            </nav>

            {/* Back Button */}
            <Link 
              to="/"
              className="flex items-center space-x-2 text-slate-600 hover:text-teal-600 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={ref}
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Educational Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-full px-6 py-2 mb-6">
              <span className="text-xl mr-2">💎</span>
              <span className="text-slate-700 font-medium">Flexible Learning Plans</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent mb-6">
              Choose Your Learning Path
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Start free and unlock premium features as you grow. Every plan includes our core learning tools and AI-powered assistance.
            </p>
          </div>

          {/* Pricing Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-2 shadow-lg">
              <div className="flex space-x-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'students' | 'educators' | 'schools')}
                    className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-3 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-teal-400 to-blue-500 text-white shadow-lg transform scale-105'
                        : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <div className="text-left">
                      <div className="font-semibold">{tab.label}</div>
                      <div className="text-xs opacity-80">{tab.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Content */}
          {activeTab !== 'schools' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {tiers.map((tier, index) => (
                <div
                  key={index}
                  className={`relative bg-white/80 backdrop-blur-sm rounded-3xl border transition-all duration-500 hover:transform hover:scale-105 ${
                    tier.popular 
                      ? 'border-teal-300 shadow-2xl shadow-teal-200/50 lg:scale-105' 
                      : 'border-slate-200 hover:border-teal-200 shadow-lg'
                  } ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-2 rounded-full font-semibold text-sm flex items-center gap-2 shadow-lg">
                        <Star className="h-4 w-4" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="p-8">
                    {/* Plan Icon */}
                    <div className={`bg-gradient-to-r ${tier.gradient} p-4 rounded-2xl inline-block mb-4`}>
                      <span className="text-3xl">{tier.emoji}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-800 mb-2">
                      {tier.name}
                    </h3>
                    
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-slate-800">
                        {tier.price}
                      </span>
                      <span className="text-slate-500 ml-2">
                        / {tier.period}
                      </span>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <div className="bg-teal-100 p-1 rounded-full">
                            <Check className="h-4 w-4 text-teal-600 flex-shrink-0" />
                          </div>
                          <span className="text-slate-600">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                      tier.popular
                        ? 'bg-gradient-to-r from-teal-400 to-blue-500 text-white hover:from-teal-500 hover:to-blue-600 hover:shadow-lg transform hover:scale-105'
                        : 'border-2 border-teal-400 text-teal-600 hover:bg-teal-400 hover:text-white'
                    }`}>
                      {tier.cta}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Schools Section */
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-sm rounded-3xl border border-blue-200 shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-8 text-white text-center">
                  <div className="flex justify-center space-x-4 mb-6">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <span className="text-3xl">🏫</span>
                    </div>
                    <div className="bg-white/20 p-3 rounded-xl">
                      <span className="text-3xl">🚀</span>
                    </div>
                    <div className="bg-white/20 p-3 rounded-xl">
                      <span className="text-3xl">📈</span>
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">
                    Transform Your Institution's Learning Experience
                  </h3>
                  <p className="text-xl text-white/90 max-w-2xl mx-auto">
                    Custom enterprise solutions designed for schools, universities, and educational institutions of all sizes.
                  </p>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Features */}
                    <div>
                      <h4 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
                        <Sparkles className="h-6 w-6 text-blue-500" />
                        <span>Enterprise Features</span>
                      </h4>
                      <div className="space-y-4">
                        {[
                          'Unlimited Student & Educator Accounts',
                          'Custom Branding & White-label Options',
                          'Advanced Analytics & Reporting',
                          'Single Sign-On (SSO) Integration',
                          'Dedicated Account Management',
                          'Priority Support & Training',
                          'Custom Curriculum Integration',
                          'FERPA & GDPR Compliance'
                        ].map((feature, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div className="bg-blue-100 p-1 rounded-full">
                              <Check className="h-4 w-4 text-blue-600" />
                            </div>
                            <span className="text-slate-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
                        <Building className="h-6 w-6 text-purple-500" />
                        <span>Why Choose Us</span>
                      </h4>
                      <div className="space-y-6">
                        <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-xl border border-blue-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-2xl">💰</span>
                            <span className="font-semibold text-blue-800">Cost Effective</span>
                          </div>
                          <p className="text-sm text-blue-700">
                            Significant savings compared to individual subscriptions for all students and staff.
                          </p>
                        </div>
                        <div className="bg-gradient-to-r from-green-100 to-teal-100 p-4 rounded-xl border border-green-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-2xl">⚡</span>
                            <span className="font-semibold text-green-800">Easy Implementation</span>
                          </div>
                          <p className="text-sm text-green-700">
                            Quick setup with comprehensive onboarding and training for your team.
                          </p>
                        </div>
                        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl border border-purple-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-2xl">📊</span>
                            <span className="font-semibold text-purple-800">Data Insights</span>
                          </div>
                          <p className="text-sm text-purple-700">
                            Institution-wide analytics to track progress and optimize learning outcomes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Call to Action Buttons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-teal-100 to-blue-100 p-6 rounded-2xl border border-teal-200 text-center">
                      <div className="text-3xl mb-3">📞</div>
                      <h5 className="text-lg font-bold text-teal-800 mb-2">Book a Discovery Call</h5>
                      <p className="text-sm text-teal-700 mb-4">
                        Discuss your institution's specific needs and explore how we can help transform your educational experience.
                      </p>
                      <button className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-teal-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                        <Phone className="h-5 w-5" />
                        <span>Schedule Discovery Call</span>
                      </button>
                    </div>

                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-2xl border border-purple-200 text-center">
                      <div className="text-3xl mb-3">🎯</div>
                      <h5 className="text-lg font-bold text-purple-800 mb-2">Book a Live Demo</h5>
                      <p className="text-sm text-purple-700 mb-4">
                        See our platform in action with a personalized demo tailored to your institution's requirements.
                      </p>
                      <button className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-500 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                        <Calendar className="h-5 w-5" />
                        <span>Schedule Live Demo</span>
                      </button>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                    <p className="text-slate-600 mb-4">
                      Have questions? Our education specialists are here to help.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-slate-500">
                      <div className="flex items-center space-x-2">
                        <span>📧</span>
                        <span>schools@tutokitulo.africa</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>📞</span>
                        <span>+1 (555) 123-SCHOOL</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom CTA */}
          {activeTab !== 'schools' && (
            <div className="mt-16 text-center">
              <div className="inline-flex items-center bg-gradient-to-r from-teal-100 to-blue-100 border border-teal-200 rounded-full px-6 py-3">
                <span className="text-2xl mr-3">🎯</span>
                <span className="text-teal-800 font-medium">Unlock Your Learning Potential</span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PricingPage;