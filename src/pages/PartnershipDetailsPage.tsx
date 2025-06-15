import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  ArrowLeft, 
  Building,
  Lightbulb,
  Target,
  Zap,
  CheckCircle,
  Users,
  Globe,
  TrendingUp,
  Shield,
  Settings,
  Brain,
  BarChart3,
  Smartphone,
  Cloud,
  Lock,
  Award,
  Phone,
  Mail,
  Calendar
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const PartnershipDetailsPage = () => {
  const [ref, isVisible] = useScrollAnimation();

  const partnershipTypes = [
    {
      title: 'Educational Institutions',
      icon: Building,
      color: 'from-blue-400 to-purple-500',
      description: 'Schools, universities, and training centers looking to enhance their educational technology infrastructure.',
      benefits: [
        'Custom LMS implementation',
        'Student information systems',
        'Digital classroom tools',
        'Parent communication portals',
        'Assessment and grading platforms',
        'Virtual learning environments'
      ]
    },
    {
      title: 'Corporate Training Centers',
      icon: Lightbulb,
      color: 'from-teal-400 to-green-500',
      description: 'Businesses and organizations focused on employee development and professional training.',
      benefits: [
        'Employee training platforms',
        'Skill assessment tools',
        'Certification management',
        'Performance tracking',
        'Compliance training',
        'Leadership development programs'
      ]
    },
    {
      title: 'Healthcare Organizations',
      icon: Target,
      color: 'from-orange-400 to-yellow-500',
      description: 'Medical institutions requiring specialized training and certification management.',
      benefits: [
        'Medical training simulations',
        'Continuing education tracking',
        'Certification compliance',
        'Patient education resources',
        'Staff development programs',
        'Research collaboration tools'
      ]
    },
    {
      title: 'Government Agencies',
      icon: Zap,
      color: 'from-purple-400 to-pink-500',
      description: 'Public sector organizations needing secure, compliant training and education solutions.',
      benefits: [
        'Public sector training',
        'Compliance management',
        'Citizen education programs',
        'Inter-agency collaboration',
        'Security clearance training',
        'Policy dissemination tools'
      ]
    }
  ];

  const implementationProcess = [
    {
      phase: 'Discovery & Assessment',
      duration: '1-2 weeks',
      description: 'Comprehensive analysis of your current systems, needs, and goals.',
      activities: [
        'Stakeholder interviews',
        'System architecture review',
        'Needs assessment',
        'Goal definition',
        'Success metrics establishment'
      ]
    },
    {
      phase: 'Solution Design',
      duration: '2-3 weeks',
      description: 'Custom solution design tailored to your specific requirements.',
      activities: [
        'Technical architecture design',
        'User experience planning',
        'Integration mapping',
        'Security framework design',
        'Scalability planning'
      ]
    },
    {
      phase: 'Development & Configuration',
      duration: '4-8 weeks',
      description: 'Building and configuring your custom learning platform.',
      activities: [
        'Platform development',
        'Custom feature implementation',
        'Third-party integrations',
        'Security implementation',
        'Quality assurance testing'
      ]
    },
    {
      phase: 'Testing & Training',
      duration: '2-3 weeks',
      description: 'Comprehensive testing and user training to ensure smooth deployment.',
      activities: [
        'User acceptance testing',
        'Performance optimization',
        'Staff training programs',
        'Documentation creation',
        'Support system setup'
      ]
    },
    {
      phase: 'Deployment & Support',
      duration: 'Ongoing',
      description: 'Go-live support and continuous optimization.',
      activities: [
        'Platform deployment',
        '24/7 technical support',
        'Performance monitoring',
        'Regular updates',
        'Continuous improvement'
      ]
    }
  ];

  const pricingModels = [
    {
      model: 'Fixed Project',
      description: 'One-time implementation with defined scope and timeline.',
      bestFor: 'Organizations with clear requirements and fixed budgets',
      pricing: 'Starting from $25,000',
      includes: ['Complete platform development', 'Training and documentation', '3 months support', 'Basic integrations']
    },
    {
      model: 'Subscription-Based',
      description: 'Monthly or annual subscription with ongoing support and updates.',
      bestFor: 'Organizations wanting continuous updates and support',
      pricing: 'Starting from $500/month',
      includes: ['Platform access', 'Regular updates', 'Technical support', 'Basic analytics']
    },
    {
      model: 'Enterprise Partnership',
      description: 'Comprehensive partnership with custom development and dedicated support.',
      bestFor: 'Large organizations with complex requirements',
      pricing: 'Custom pricing',
      includes: ['Dedicated development team', '24/7 support', 'Custom integrations', 'Advanced analytics']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-lg text-slate-800">Tuto ki Tulo mwa Afrika</span>
            </Link>

            {/* Back Button */}
            <Link 
              to="/"
              className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors duration-200"
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
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-full px-6 py-2 mb-6">
              <span className="text-xl mr-2">🤝</span>
              <span className="text-slate-700 font-medium">Partnership Programs</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent mb-6">
              Transform Your Organization's Educational Capabilities
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Partner with us to unlock your team's potential through cutting-edge educational technology, 
              AI-powered learning solutions, and comprehensive digital transformation services.
            </p>
          </div>

          {/* Partnership Types */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Partnership Opportunities</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                We work with diverse organizations to create customized educational solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {partnershipTypes.map((type, index) => {
                const TypeIcon = type.icon;
                return (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className={`bg-gradient-to-r ${type.color} p-6 rounded-t-2xl text-white`}>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="bg-white/20 p-3 rounded-xl">
                          <TypeIcon className="h-8 w-8" />
                        </div>
                        <h3 className="text-2xl font-bold">{type.title}</h3>
                      </div>
                      <p className="text-white/90">{type.description}</p>
                    </div>
                    
                    <div className="p-6">
                      <h4 className="font-semibold text-slate-800 mb-4">What We Provide:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {type.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center space-x-2 text-sm text-slate-600">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Implementation Process */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Implementation Process</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Our proven methodology ensures successful deployment and adoption
              </p>
            </div>

            <div className="space-y-8">
              {implementationProcess.map((phase, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-8 shadow-lg">
                  <div className="flex items-start space-x-6">
                    <div className="bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <h3 className="text-xl font-bold text-slate-800">{phase.phase}</h3>
                        <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                          {phase.duration}
                        </span>
                      </div>
                      <p className="text-slate-600 mb-4">{phase.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {phase.activities.map((activity, activityIndex) => (
                          <div key={activityIndex} className="flex items-center space-x-2 text-sm text-slate-600">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Models */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Pricing Models</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Flexible pricing options to match your budget and requirements
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingModels.map((model, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{model.model}</h3>
                  <p className="text-slate-600 mb-4">{model.description}</p>
                  <div className="text-2xl font-bold text-blue-600 mb-4">{model.pricing}</div>
                  <div className="text-sm text-slate-500 mb-6">{model.bestFor}</div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-800 text-sm">Includes:</h4>
                    {model.includes.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-2 text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-sm p-12 rounded-3xl border border-blue-200 shadow-xl">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Ready to Transform Your Organization?
              </h3>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Let's discuss how we can create a customized solution that meets your specific needs and goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-500 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2">
                  <Calendar className="h-6 w-6" />
                  <span>Schedule Consultation</span>
                </button>
                <a 
                  href="mailto:info@tuloafrika.tech"
                  className="border-2 border-blue-400 text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-400 hover:text-white transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm flex items-center justify-center space-x-2"
                >
                  <Mail className="h-6 w-6" />
                  <span>Email Partnership Team</span>
                </a>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-200">
                <p className="text-slate-600 mb-4">
                  Questions about partnerships? Our team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-slate-500">
                  <div className="flex items-center space-x-2">
                    <span>📧</span>
                    <span>info@tuloafrika.tech</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>📞</span>
                    <span>+264 64 404 605</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PartnershipDetailsPage;