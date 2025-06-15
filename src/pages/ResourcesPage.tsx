import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  ArrowLeft, 
  BookOpen, 
  Brain, 
  Code, 
  Palette, 
  Globe, 
  Calculator,
  Microscope,
  Music,
  Users,
  Target,
  Sparkles,
  ExternalLink,
  Play,
  Download,
  Star,
  Shield,
  Lock,
  Eye,
  UserCheck,
  Heart,
  CreditCard,
  Settings
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ResourcesPage = () => {
  const [ref, isVisible] = useScrollAnimation();
  const [activeCategory, setActiveCategory] = useState<string>('open-source');

  const resourceCategories = [
    { 
      id: 'open-source', 
      name: 'Open Source Learning Resources', 
      subtitle: 'Always updating',
      icon: '🌟', 
      count: 500,
      description: 'Free, community-driven educational resources that are constantly updated and improved',
      color: 'from-green-400 to-teal-500'
    },
    { 
      id: 'paid-resources', 
      name: 'Paid Educational & Design Resources', 
      subtitle: 'Premium content',
      icon: '💎', 
      count: 300,
      description: 'Premium educational tools and design resources for enhanced learning experiences',
      color: 'from-purple-400 to-pink-500'
    },
    { 
      id: 'customized-lms', 
      name: 'Customized LMS', 
      subtitle: 'Tailored solutions',
      icon: '🏫', 
      count: 200,
      description: 'Personalized Learning Management Systems designed for specific educational needs',
      color: 'from-blue-400 to-indigo-500'
    }
  ];

  const openSourceResources = [
    {
      title: 'Khan Academy',
      description: 'World-class education for anyone, anywhere. Comprehensive K-12 curriculum with video lessons.',
      type: 'Interactive Courses',
      rating: 4.9,
      users: '120M+',
      icon: '🎓',
      gradient: 'from-blue-400 to-purple-500',
      features: ['Personalized Learning', 'Progress Tracking', 'Video Lessons', 'Practice Exercises'],
      educationalBenefit: 'Provides comprehensive K-12 education with adaptive learning paths that adjust to each student\'s pace and understanding level.',
      cost: 'Free',
      updateFrequency: 'Daily'
    },
    {
      title: 'MIT OpenCourseWare',
      description: 'Free lecture notes, exams, and videos from MIT. Access to university-level courses.',
      type: 'University Courses',
      rating: 4.8,
      users: '50M+',
      icon: '🏛️',
      gradient: 'from-indigo-400 to-blue-500',
      features: ['University Content', 'Lecture Notes', 'Assignments', 'Video Lectures'],
      educationalBenefit: 'Offers high-quality university-level education materials from one of the world\'s leading institutions.',
      cost: 'Free',
      updateFrequency: 'Weekly'
    },
    {
      title: 'Scratch',
      description: 'Visual programming language that makes coding accessible to children and beginners.',
      type: 'Programming Platform',
      rating: 4.8,
      users: '100M+',
      icon: '🐱',
      gradient: 'from-orange-400 to-red-500',
      features: ['Visual Coding', 'Creative Projects', 'Community Sharing', 'No Syntax Errors'],
      educationalBenefit: 'Develops computational thinking and problem-solving skills through creative programming projects.',
      cost: 'Free',
      updateFrequency: 'Monthly'
    },
    {
      title: 'Coursera (Audit Mode)',
      description: 'Audit university courses for free from top institutions worldwide.',
      type: 'Online Courses',
      rating: 4.5,
      users: '100M+',
      icon: '🎯',
      gradient: 'from-teal-400 to-blue-500',
      features: ['University Courses', 'Video Lectures', 'Reading Materials', 'Community Forums'],
      educationalBenefit: 'Access to high-quality higher education content from leading universities and institutions.',
      cost: 'Free (Audit)',
      updateFrequency: 'Weekly'
    }
  ];

  const paidResources = [
    {
      title: 'Adobe Creative Suite for Education',
      description: 'Professional design tools including Photoshop, Illustrator, and Premiere Pro for students.',
      type: 'Design Software',
      rating: 4.7,
      users: '25M+',
      icon: '🎨',
      gradient: 'from-purple-400 to-pink-500',
      features: ['Professional Tools', 'Cloud Storage', 'Collaboration', 'Tutorials'],
      educationalBenefit: 'Develops professional design and multimedia skills essential for creative industries.',
      cost: '$19.99/month',
      updateFrequency: 'Monthly'
    },
    {
      title: 'Coursera Plus',
      description: 'Unlimited access to 7,000+ courses, certificates, and specializations from top universities.',
      type: 'Course Platform',
      rating: 4.6,
      users: '10M+',
      icon: '🏆',
      gradient: 'from-blue-400 to-indigo-500',
      features: ['Unlimited Courses', 'Certificates', 'Specializations', 'University Degrees'],
      educationalBenefit: 'Comprehensive access to professional development and higher education opportunities.',
      cost: '$59/month',
      updateFrequency: 'Daily'
    },
    {
      title: 'MasterClass',
      description: 'Learn from world-renowned experts in various fields through high-quality video lessons.',
      type: 'Expert Instruction',
      rating: 4.5,
      users: '5M+',
      icon: '⭐',
      gradient: 'from-yellow-400 to-orange-500',
      features: ['Expert Instructors', 'High Production Value', 'Workbooks', 'Community'],
      educationalBenefit: 'Provides inspiration and advanced techniques from industry leaders and celebrities.',
      cost: '$180/year',
      updateFrequency: 'Monthly'
    },
    {
      title: 'Canva Pro for Education',
      description: 'Advanced design platform with premium templates, brand kits, and collaboration tools.',
      type: 'Design Platform',
      rating: 4.6,
      users: '75M+',
      icon: '🖌️',
      gradient: 'from-pink-400 to-purple-500',
      features: ['Premium Templates', 'Brand Kit', 'Team Collaboration', 'Advanced Features'],
      educationalBenefit: 'Enhances visual communication skills and makes professional design accessible to all students.',
      cost: '$12.99/month',
      updateFrequency: 'Weekly'
    }
  ];

  const customizedLMSResources = [
    {
      title: 'Tuto ki Tulo Custom LMS',
      description: 'Fully customized Learning Management System tailored to your institution\'s specific needs.',
      type: 'Custom LMS',
      rating: 4.9,
      users: '50K+',
      icon: '🏫',
      gradient: 'from-teal-400 to-blue-500',
      features: ['Custom Branding', 'Curriculum Integration', 'Progress Analytics', 'Parent Portal'],
      educationalBenefit: 'Provides a unified learning experience that aligns perfectly with institutional goals and curriculum.',
      cost: 'Custom Pricing',
      updateFrequency: 'Continuous'
    },
    {
      title: 'Adaptive Learning Pathways',
      description: 'AI-powered personalized learning paths that adapt to each student\'s learning style and pace.',
      type: 'AI Learning System',
      rating: 4.8,
      users: '25K+',
      icon: '🧠',
      gradient: 'from-purple-400 to-indigo-500',
      features: ['AI Adaptation', 'Personalized Content', 'Learning Analytics', 'Skill Mapping'],
      educationalBenefit: 'Maximizes learning efficiency by providing content that matches each student\'s optimal learning conditions.',
      cost: 'Custom Pricing',
      updateFrequency: 'Real-time'
    },
    {
      title: 'Institution Analytics Dashboard',
      description: 'Comprehensive analytics platform providing insights into student performance and institutional metrics.',
      type: 'Analytics Platform',
      rating: 4.7,
      users: '15K+',
      icon: '📊',
      gradient: 'from-green-400 to-teal-500',
      features: ['Performance Metrics', 'Predictive Analytics', 'Custom Reports', 'Data Visualization'],
      educationalBenefit: 'Enables data-driven decision making to improve educational outcomes and institutional efficiency.',
      cost: 'Custom Pricing',
      updateFrequency: 'Real-time'
    },
    {
      title: 'Integrated Assessment Suite',
      description: 'Custom assessment tools that integrate seamlessly with your curriculum and grading systems.',
      type: 'Assessment Platform',
      rating: 4.6,
      users: '20K+',
      icon: '📝',
      gradient: 'from-orange-400 to-red-500',
      features: ['Custom Assessments', 'Auto-grading', 'Rubric Integration', 'Plagiarism Detection'],
      educationalBenefit: 'Streamlines assessment processes while providing detailed insights into student understanding.',
      cost: 'Custom Pricing',
      updateFrequency: 'Continuous'
    }
  ];

  const getCurrentResources = () => {
    switch (activeCategory) {
      case 'open-source':
        return openSourceResources;
      case 'paid-resources':
        return paidResources;
      case 'customized-lms':
        return customizedLMSResources;
      default:
        return openSourceResources;
    }
  };

  const resources = getCurrentResources();
  const currentCategory = resourceCategories.find(cat => cat.id === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
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
              <span className="text-teal-600 font-medium">Resources</span>
              <Link to="/pricing" className="text-slate-600 hover:text-teal-500 transition-colors duration-200">
                Pricing
              </Link>
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
          {/* Hero Section */}
          <div 
            ref={ref}
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center bg-gradient-to-r from-teal-100 to-blue-100 border border-teal-200 rounded-full px-6 py-2 mb-6">
              <span className="text-xl mr-2">📚</span>
              <span className="text-slate-700 font-medium">Educational Resources</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 to-teal-600 bg-clip-text text-transparent mb-6">
              World-Class Learning Resources
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Access thousands of educational tools, from free open-source resources to premium platforms 
              and fully customized learning management systems designed to accelerate your educational journey.
            </p>
          </div>

          {/* Security & Access Control Section */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-white/80 to-green-50/80 backdrop-blur-sm rounded-3xl border border-green-200 p-8 shadow-xl">
              <div className="text-center mb-8">
                <div className="flex justify-center space-x-4 mb-6">
                  <div className="bg-gradient-to-r from-green-400 to-blue-500 p-3 rounded-xl">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-3 rounded-xl">
                    <span className="text-2xl">👨‍👩‍👧‍👦</span>
                  </div>
                  <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-3 rounded-xl">
                    <span className="text-2xl">🎓</span>
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">
                  Safe & Secure Access to Educational Resources
                </h2>
                <p className="text-slate-600 max-w-4xl mx-auto leading-relaxed">
                  Every student receives personalized Google accounts with advanced security measures and intelligent content filtering. 
                  Parents can reduce exposure to non-educational content while maintaining full access to learning resources.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Personalized Accounts */}
                <div className="bg-gradient-to-r from-blue-100 to-teal-100 p-6 rounded-xl border border-blue-200">
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-blue-400 to-teal-500 p-3 rounded-xl inline-block mb-3">
                      <UserCheck className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-blue-800 mb-2">Personalized Accounts</h3>
                    <p className="text-sm text-blue-700">Individual Google accounts with educational focus and seamless tool integration</p>
                  </div>
                </div>

                {/* Advanced Security */}
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-xl border border-green-200">
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-3 rounded-xl inline-block mb-3">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-green-800 mb-2">Advanced Security</h3>
                    <p className="text-sm text-green-700">Multi-factor authentication, encryption, and COPPA/FERPA compliance</p>
                  </div>
                </div>

                {/* Content Filtering */}
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl border border-purple-200">
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-3 rounded-xl inline-block mb-3">
                      <Eye className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-purple-800 mb-2">Smart Filtering</h3>
                    <p className="text-sm text-purple-700">AI-powered content screening and educational website whitelisting</p>
                  </div>
                </div>

                {/* Parental Control */}
                <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-6 rounded-xl border border-orange-200">
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-3 rounded-xl inline-block mb-3">
                      <Lock className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-orange-800 mb-2">Parental Control</h3>
                    <p className="text-sm text-orange-700">Comprehensive oversight and customizable access restrictions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resource Categories */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Choose Your Resource Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resourceCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`p-8 rounded-2xl border transition-all duration-300 text-left ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-white to-teal-50 border-teal-300 shadow-xl transform scale-105'
                      : 'bg-white/80 border-slate-200 hover:border-teal-200 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`bg-gradient-to-r ${category.color} p-3 rounded-xl`}>
                      <span className="text-2xl">{category.icon}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-800">{category.count}+</div>
                      <div className="text-xs text-slate-500">resources</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{category.name}</h3>
                  <p className="text-sm text-teal-600 font-medium mb-2">({category.subtitle})</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{category.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Current Category Header */}
          {currentCategory && (
            <div className="mb-12 text-center">
              <div className={`bg-gradient-to-r ${currentCategory.color} p-8 rounded-2xl text-white`}>
                <div className="text-4xl mb-4">{currentCategory.icon}</div>
                <h2 className="text-3xl font-bold mb-2">{currentCategory.name}</h2>
                <p className="text-white/90 text-lg">({currentCategory.subtitle})</p>
                <p className="text-white/80 max-w-2xl mx-auto mt-4">{currentCategory.description}</p>
              </div>
            </div>
          )}

          {/* Resources Grid */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {resources.map((resource, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 overflow-hidden"
                >
                  {/* Resource Header */}
                  <div className={`bg-gradient-to-r ${resource.gradient} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{resource.icon}</div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm font-medium">{resource.rating}</span>
                        </div>
                        <div className="text-xs opacity-90">{resource.users} users</div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                    <p className="text-white/90 text-sm">{resource.description}</p>
                  </div>

                  {/* Resource Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                        {resource.type}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-slate-600">{resource.cost}</span>
                        <button className="text-teal-600 hover:text-teal-700 transition-colors">
                          <ExternalLink className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {/* Update Frequency */}
                    <div className="mb-4 flex items-center space-x-2">
                      <div className="bg-green-100 p-1 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                      <span className="text-sm text-green-700">Updates: {resource.updateFrequency}</span>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-slate-800 mb-2">Key Features:</h4>
                      <div className="flex flex-wrap gap-2">
                        {resource.features.map((feature, featureIndex) => (
                          <span key={featureIndex} className="bg-teal-100 text-teal-700 px-2 py-1 rounded text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Educational Benefit */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-800 mb-2">Educational Impact:</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {resource.educationalBenefit}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <button className="flex-1 bg-gradient-to-r from-teal-400 to-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:from-teal-500 hover:to-blue-600 transition-all duration-200 flex items-center justify-center space-x-2">
                        <Play className="h-4 w-4" />
                        <span>Access</span>
                      </button>
                      <button className="bg-slate-100 text-slate-600 py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category-Specific Benefits */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12 border border-blue-200">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">
                  {activeCategory === 'open-source' && 'Why Open Source Resources Transform Learning'}
                  {activeCategory === 'paid-resources' && 'Premium Resources for Enhanced Learning'}
                  {activeCategory === 'customized-lms' && 'Tailored Solutions for Your Institution'}
                </h2>
                <p className="text-slate-600 max-w-3xl mx-auto">
                  {activeCategory === 'open-source' && 'Free, community-driven resources that provide high-quality education accessible to everyone, constantly updated by global contributors.'}
                  {activeCategory === 'paid-resources' && 'Professional-grade tools and content that provide advanced features, expert instruction, and premium support for serious learners.'}
                  {activeCategory === 'customized-lms' && 'Fully customized learning management systems designed specifically for your institution\'s unique needs and educational goals.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {activeCategory === 'open-source' && (
                  <>
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-green-400 to-teal-500 p-4 rounded-2xl inline-block mb-4">
                        <Heart className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">Community Driven</h3>
                      <p className="text-slate-600">
                        Developed and maintained by passionate educators and developers worldwide, ensuring diverse perspectives and continuous improvement.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-4 rounded-2xl inline-block mb-4">
                        <Target className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">Always Current</h3>
                      <p className="text-slate-600">
                        Regular updates ensure content stays relevant and incorporates the latest educational research and technological advances.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-orange-400 to-pink-500 p-4 rounded-2xl inline-block mb-4">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">Global Access</h3>
                      <p className="text-slate-600">
                        Free access removes financial barriers, making quality education available to students worldwide regardless of economic background.
                      </p>
                    </div>
                  </>
                )}

                {activeCategory === 'paid-resources' && (
                  <>
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-4 rounded-2xl inline-block mb-4">
                        <Star className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">Premium Quality</h3>
                      <p className="text-slate-600">
                        Professional-grade content created by industry experts with high production values and comprehensive support materials.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-blue-400 to-indigo-500 p-4 rounded-2xl inline-block mb-4">
                        <Brain className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">Advanced Features</h3>
                      <p className="text-slate-600">
                        Enhanced functionality including AI-powered personalization, advanced analytics, and professional certification programs.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-4 rounded-2xl inline-block mb-4">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">Expert Support</h3>
                      <p className="text-slate-600">
                        Dedicated customer support, expert guidance, and professional development opportunities for serious learners.
                      </p>
                    </div>
                  </>
                )}

                {activeCategory === 'customized-lms' && (
                  <>
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-4 rounded-2xl inline-block mb-4">
                        <Settings className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">Tailored Solutions</h3>
                      <p className="text-slate-600">
                        Fully customized to match your institution's specific curriculum, branding, and educational methodology.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-purple-400 to-indigo-500 p-4 rounded-2xl inline-block mb-4">
                        <Brain className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">AI Integration</h3>
                      <p className="text-slate-600">
                        Advanced AI-powered features for personalized learning paths, predictive analytics, and automated assessment.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-green-400 to-teal-500 p-4 rounded-2xl inline-block mb-4">
                        <Target className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">Scalable Growth</h3>
                      <p className="text-slate-600">
                        Designed to grow with your institution, supporting everything from small schools to large university systems.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-white/80 to-teal-50/80 backdrop-blur-sm p-12 rounded-3xl border border-teal-200 shadow-xl">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Ready to Access These Educational Resources?
              </h3>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Join thousands of students and educators who are already using our platform to enhance 
                their learning and teaching experiences with secure, filtered access to world-class resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/pricing"
                  className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-teal-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                >
                  🚀 Start Learning Today
                </Link>
                <Link 
                  to="/"
                  className="border-2 border-teal-400 text-teal-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal-400 hover:text-white transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm"
                >
                  📚 Explore Platform
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResourcesPage;