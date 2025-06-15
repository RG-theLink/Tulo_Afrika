import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  ArrowLeft, 
  Shield, 
  UserCheck, 
  Eye, 
  Lock, 
  Building,
  CheckCircle,
  Users,
  Settings,
  Globe,
  Smartphone,
  Monitor,
  Wifi,
  Database,
  Key,
  AlertTriangle,
  Clock,
  FileText,
  Phone,
  Mail
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const SecurityDetailsPage = () => {
  const [ref, isVisible] = useScrollAnimation();

  const securityFeatures = [
    {
      category: 'Personalized Google Accounts',
      icon: UserCheck,
      color: 'from-blue-400 to-teal-500',
      features: [
        {
          title: 'Individual Google Workspace Accounts',
          description: 'Each student receives their own dedicated Google Workspace account with full access to educational tools like Google Classroom, Drive, Docs, and more.',
          benefits: ['Personalized learning experience', 'Seamless collaboration', 'Cloud-based accessibility']
        },
        {
          title: 'Educational Gmail Integration',
          description: 'Secure email communication with built-in monitoring and filtering to ensure appropriate content and prevent cyberbullying.',
          benefits: ['Safe communication', 'Teacher oversight', 'Parent visibility']
        },
        {
          title: 'Seamless Tool Integration',
          description: 'Single sign-on access to all educational platforms and resources through the secure Google account.',
          benefits: ['No password fatigue', 'Streamlined access', 'Enhanced productivity']
        }
      ]
    },
    {
      category: 'Advanced Security Measures',
      icon: Shield,
      color: 'from-green-400 to-emerald-500',
      features: [
        {
          title: 'End-to-End Encryption',
          description: 'All data transmission is encrypted using advanced protocols to protect sensitive information.',
          benefits: ['Data protection', 'Privacy compliance', 'Secure communications']
        },
        {
          title: 'Regular Security Audits',
          description: 'Continuous monitoring and regular security assessments to identify and address potential vulnerabilities.',
          benefits: ['Proactive protection', 'Compliance maintenance', 'Risk mitigation']
        },
        {
          title: 'COPPA & FERPA Compliance',
          description: 'Full compliance with educational privacy laws and regulations to protect student data and privacy.',
          benefits: ['Legal compliance', 'Privacy protection', 'Trust assurance']
        }
      ]
    },
    {
      category: 'Smart Content Filtering',
      icon: Eye,
      color: 'from-purple-400 to-pink-500',
      features: [
        {
          title: 'Educational Website Whitelist',
          description: 'Curated list of approved educational websites and resources that students can safely access.',
          benefits: ['Safe browsing', 'Educational focus', 'Reduced distractions']
        },
        {
          title: 'Automatic Inappropriate Content Blocking',
          description: 'Sophisticated filters automatically block access to inappropriate websites, images, and content.',
          benefits: ['Comprehensive protection', 'Peace of mind', 'Safe learning environment']
        }
      ]
    },
    {
      category: 'Centralized Management',
      icon: Building,
      color: 'from-orange-400 to-yellow-500',
      features: [
        {
          title: 'Unified Organization Control',
          description: 'All student accounts are managed under one secure organizational umbrella with centralized administration.',
          benefits: ['Streamlined management', 'Consistent policies', 'Efficient oversight']
        },
        {
          title: 'Customizable Access Restrictions',
          description: 'Flexible controls allowing administrators and parents to customize access levels and restrictions.',
          benefits: ['Personalized control', 'Flexible policies', 'Adaptive restrictions']
        }
      ]
    }
  ];

  const studentBenefits = [
    {
      title: 'Distraction-Free Learning Environment',
      description: 'Focus on education without worrying about inappropriate content or distracting websites.',
      icon: Eye
    },
    {
      title: 'Access to Educational Resources Only',
      description: 'Curated access to high-quality educational content and learning platforms.',
      icon: Globe
    },
    {
      title: 'Seamless Tool Integration',
      description: 'Easy access to all learning tools and platforms with a single, secure login.',
      icon: Key
    },
    {
      title: 'Safe Collaboration with Peers',
      description: 'Secure environment for working on group projects and communicating with classmates.',
      icon: Users
    },
    {
      title: 'Multi-Device Access',
      description: 'Access your educational resources from any device - computer, tablet, or smartphone.',
      icon: Smartphone
    },
    {
      title: 'Reliable Internet Safety',
      description: 'Browse the internet safely with automatic protection from harmful or inappropriate content.',
      icon: Wifi
    }
  ];

  const complianceStandards = [
    {
      name: 'COPPA Compliance',
      description: 'Children\'s Online Privacy Protection Act - Protecting children under 13',
      icon: '👶'
    },
    {
      name: 'FERPA Compliance',
      description: 'Family Educational Rights and Privacy Act - Protecting student educational records',
      icon: '📚'
    },
    {
      name: 'GDPR Compliance',
      description: 'General Data Protection Regulation - European data protection standards',
      icon: '🇪🇺'
    },
    {
      name: 'SOC 2 Type II',
      description: 'Service Organization Control 2 - Security, availability, and confidentiality',
      icon: '🔒'
    },
    {
      name: 'ISO 27001',
      description: 'International standard for information security management systems',
      icon: '🛡️'
    },
    {
      name: 'CCPA Compliance',
      description: 'California Consumer Privacy Act - California privacy protection standards',
      icon: '🏛️'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-lg text-slate-800">Tuto ki Tulo mwa Afrika</span>
            </Link>

            {/* Back Button */}
            <Link 
              to="/"
              className="flex items-center space-x-2 text-slate-600 hover:text-green-600 transition-colors duration-200"
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
          {/* Hero Section */}
          <div 
            ref={ref}
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-blue-100 border border-green-200 rounded-full px-6 py-2 mb-6">
              <span className="text-xl mr-2">🔒</span>
              <span className="text-slate-700 font-medium">Security & Privacy</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 to-green-600 bg-clip-text text-transparent mb-6">
              Safe & Secure Learning Environment
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Comprehensive security measures and intelligent content filtering to ensure students can learn safely 
              while giving parents complete peace of mind and control over their child's digital education experience.
            </p>
          </div>

          {/* Security Features */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center">Comprehensive Security Features</h2>
            
            {securityFeatures.map((category, categoryIndex) => {
              const CategoryIcon = category.icon;
              return (
                <div key={categoryIndex} className="mb-16">
                  <div className="text-center mb-8">
                    <div className={`bg-gradient-to-r ${category.color} p-4 rounded-2xl inline-block mb-4`}>
                      <CategoryIcon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">{category.category}</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {category.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                        <h4 className="text-xl font-semibold text-slate-800 mb-3">{feature.title}</h4>
                        <p className="text-slate-600 mb-4 leading-relaxed">{feature.description}</p>
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium text-slate-700">Key Benefits:</h5>
                          <ul className="space-y-1">
                            {feature.benefits.map((benefit, benefitIndex) => (
                              <li key={benefitIndex} className="flex items-center space-x-2 text-sm text-slate-600">
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Benefits for Students */}
          <div className="mb-20">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-green-400 to-teal-500 p-4 rounded-2xl inline-block mb-4">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">For Students</h3>
              <p className="text-slate-600">Safe, focused, and distraction-free learning environment</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentBenefits.map((benefit, index) => {
                const BenefitIcon = benefit.icon;
                return (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 p-6 shadow-lg">
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-green-100 to-teal-100 p-3 rounded-lg inline-block mb-4">
                        <BenefitIcon className="h-6 w-6 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-slate-800 mb-2">{benefit.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Compliance Standards */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Compliance & Standards</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                We adhere to the highest industry standards and regulatory requirements to ensure your data is protected
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {complianceStandards.map((standard, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="text-4xl mb-4">{standard.icon}</div>
                  <h4 className="font-semibold text-slate-800 mb-2">{standard.name}</h4>
                  <p className="text-slate-600 text-sm">{standard.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact & Support */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-white/80 to-green-50/80 backdrop-blur-sm p-12 rounded-3xl border border-green-200 shadow-xl">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Questions About Security?
              </h3>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Our security team is available to answer any questions about our privacy and security measures.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:info@tuloafrika.tech"
                  className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <Mail className="h-6 w-6" />
                  <span>Contact Security Team</span>
                </a>
                <a 
                  href="tel:+26464404605"
                  className="border-2 border-green-400 text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-400 hover:text-white transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm flex items-center justify-center space-x-2"
                >
                  <Phone className="h-6 w-6" />
                  <span>Call Support</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SecurityDetailsPage;