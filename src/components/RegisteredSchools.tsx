import React, { useState } from 'react';
import { ExternalLink, Users, MapPin, Calendar, GraduationCap, Clock, Building, Lightbulb, Target, Zap, X, Mail, Phone, User, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const RegisteredSchools = () => {
  const [ref, isVisible] = useScrollAnimation();
  const [showPartnerForm, setShowPartnerForm] = useState(false);
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [partnerFormData, setPartnerFormData] = useState({
    organizationName: '',
    organizationType: '',
    contactName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [demoFormData, setDemoFormData] = useState({
    name: '',
    email: '',
    organization: '',
    role: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });

  const schools = [
    {
      name: 'Swakopmund Christian Academy',
      website: 'https://swakopca.com/',
      enrollmentUrl: 'https://its.elearning-swakopca.edu.na/register',
      location: 'Swakopmund, Namibia',
      established: '1987',
      students: '50+',
      grades: 'Pre-K to Grade 12',
      logo: '🏫',
      description: 'The school is dedicated to providing an exceptional e-learning platform tailored to address the unique needs of their students. Their comprehensive curriculum and advanced communication tools, powered by Tuto ki Tulo mwa Afrika, empower learners to bridge their learning gaps and reach their full potential.',
      tagline: 'Unleashing the Potential of Every Student',
      subtitle: 'Experience the Best Hybrid Learning',
      programs: [
        'American Curriculum Standards',
        'GED Preparation & Testing',
        'SAT Preparation & Testing',
        'American Diploma Pathway',
        'Digital Learning Integration',
        'Comprehensive E-Learning Platform'
      ],
      aftercare: {
        available: true,
        hours: '2:00 PM - 5:00 PM',
        activities: ['Homework Support', 'Sports Activities', 'Arts & Crafts', 'Study Groups']
      },
      contact: {
        phone: '+264 64 404 605',
        email: 'info@tuloafrika.tech'
      },
      gradient: 'from-teal-400 to-blue-500'
    }
  ];

  const organizationTypes = [
    'Educational Institution',
    'Corporate Training Center',
    'Healthcare Organization',
    'Government Agency',
    'Non-Profit Organization',
    'Technology Company',
    'Other'
  ];

  const roles = [
    'Administrator',
    'Educator/Teacher',
    'IT Director',
    'Training Manager',
    'Decision Maker',
    'Other'
  ];

  const handlePartnerFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Partner form submitted:', partnerFormData);
    // Handle form submission
    setShowPartnerForm(false);
    // Reset form
    setPartnerFormData({
      organizationName: '',
      organizationType: '',
      contactName: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  const handleDemoFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Demo form submitted:', demoFormData);
    // Handle form submission
    setShowDemoForm(false);
    // Reset form
    setDemoFormData({
      name: '',
      email: '',
      organization: '',
      role: '',
      preferredDate: '',
      preferredTime: '',
      message: ''
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="schools" className="py-20 bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Educational Badge */}
          <div className="inline-flex items-center bg-gradient-to-r from-teal-100 to-blue-100 border border-teal-200 rounded-full px-6 py-2 mb-6">
            <span className="text-xl mr-2">🎓</span>
            <span className="text-slate-700 font-medium">Partner Schools</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 to-teal-600 bg-clip-text text-transparent mb-6">
            Schools Already Transforming Education
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Join the growing network of educational institutions that have partnered with us to provide 
            world-class learning experiences for their students.
          </p>
        </div>

        {/* Schools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-16">
          {schools.map((school, index) => (
            <div
              key={index}
              className={`bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200 shadow-xl overflow-hidden transition-all duration-700 hover:shadow-2xl hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* School Header - Inspired by Screenshot */}
              <div className={`bg-gradient-to-r ${school.gradient} p-8 text-white relative overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full"></div>
                  <div className="absolute bottom-10 left-10 w-24 h-24 bg-white rounded-full"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <div className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-4">
                      {school.subtitle}
                    </div>
                    <h3 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                      {school.tagline}
                    </h3>
                    <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
                      {school.description}
                    </p>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a
                        href={school.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                      >
                        <span>Read More</span>
                        <ExternalLink className="h-5 w-5" />
                      </a>
                      <a
                        href={school.enrollmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-teal-600 px-8 py-3 rounded-xl font-semibold hover:bg-teal-50 transition-all duration-200 transform hover:scale-105"
                      >
                        Join Now
                      </a>
                    </div>
                  </div>

                  {/* School Info Bar */}
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="bg-white/20 p-3 rounded-xl">
                          <span className="text-3xl">{school.logo}</span>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold">{school.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-white/90">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{school.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>Est. {school.established}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <Users className="h-6 w-6 mx-auto mb-2" />
                        <div className="font-bold text-lg">{school.students}</div>
                        <div className="text-xs text-white/80">Students</div>
                      </div>
                      <div className="text-center">
                        <GraduationCap className="h-6 w-6 mx-auto mb-2" />
                        <div className="font-bold text-lg">{school.grades}</div>
                        <div className="text-xs text-white/80">Grade Levels</div>
                      </div>
                      <div className="text-center">
                        <span className="text-2xl block mb-2">🇺🇸</span>
                        <div className="font-bold text-lg">American</div>
                        <div className="text-xs text-white/80">Curriculum</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summarized School Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Programs Summary */}
                  <div>
                    <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center space-x-2">
                      <span className="text-xl">📚</span>
                      <span>Academic Programs</span>
                    </h4>
                    <div className="space-y-3">
                      {school.programs.slice(0, 3).map((program, programIndex) => (
                        <div key={programIndex} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                          <div className="bg-teal-100 p-2 rounded-lg">
                            <span className="text-sm text-teal-600">✓</span>
                          </div>
                          <span className="text-slate-700">{program}</span>
                        </div>
                      ))}
                      <Link 
                        to="/school-details"
                        className="inline-flex items-center space-x-2 text-teal-600 hover:text-teal-700 font-medium text-sm"
                      >
                        <span>View all programs</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Aftercare Summary */}
                  <div>
                    <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center space-x-2">
                      <span className="text-xl">🏠</span>
                      <span>SCA Aftercare</span>
                    </h4>
                    {school.aftercare.available ? (
                      <div className="space-y-4">
                        <div className="bg-gradient-to-r from-green-100 to-teal-100 p-4 rounded-xl border border-green-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <Clock className="h-4 w-4 text-green-600" />
                            <span className="font-medium text-green-800">
                              Available: {school.aftercare.hours}
                            </span>
                          </div>
                          <div className="text-sm text-green-700">
                            Professional aftercare services for working parents
                          </div>
                        </div>
                        <Link 
                          to="/school-details"
                          className="inline-flex items-center space-x-2 text-teal-600 hover:text-teal-700 font-medium text-sm"
                        >
                          <span>Learn more about aftercare</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    ) : (
                      <div className="text-slate-500">Aftercare services not available</div>
                    )}
                  </div>
                </div>

                {/* Contact & Enrollment */}
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Info */}
                    <div>
                      <h5 className="font-semibold text-slate-800 mb-3">Contact Information</h5>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                          <span>📞</span>
                          <span>{school.contact.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                          <span>✉️</span>
                          <span>{school.contact.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                          <span>🌐</span>
                          <a 
                            href={school.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-600 hover:text-teal-700 transition-colors"
                          >
                            {school.website}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Enrollment Actions */}
                    <div>
                      <h5 className="font-semibold text-slate-800 mb-3">Enrollment Options</h5>
                      <div className="space-y-3">
                        <a
                          href={school.enrollmentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white py-3 px-4 rounded-xl font-medium hover:from-teal-500 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                        >
                          <span>🎓</span>
                          <span>Enroll in School</span>
                          <ExternalLink className="h-4 w-4" />
                        </a>
                        <button className="w-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 text-purple-700 py-3 px-4 rounded-xl font-medium hover:from-purple-200 hover:to-pink-200 transition-all duration-200">
                          🏠 Register for Aftercare
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summarized Partnership Section */}
        <div 
          className={`text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-sm p-12 rounded-3xl border border-blue-200 max-w-5xl mx-auto shadow-xl">
            {/* Partnership Icons */}
            <div className="flex justify-center space-x-4 mb-6">
              <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-3 rounded-xl">
                <Building className="h-8 w-8 text-white" />
              </div>
              <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-3 rounded-xl">
                <Lightbulb className="h-8 w-8 text-white" />
              </div>
              <div className="bg-gradient-to-r from-orange-400 to-pink-500 p-3 rounded-xl">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div className="bg-gradient-to-r from-green-400 to-teal-500 p-3 rounded-xl">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>

            <h3 className="text-3xl font-bold text-slate-800 mb-6">
              Transform Your Organization's Educational Capabilities
            </h3>
            <p className="text-slate-600 mb-8 text-lg max-w-4xl mx-auto leading-relaxed">
              Whether you're an educational institution, corporate training center, healthcare organization, 
              government agency, or any business looking to enhance learning and development - we can help you 
              unlock your team's potential with cutting-edge educational technology and AI-powered learning solutions.
            </p>

            {/* Partnership Benefits Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-xl border border-blue-200">
                <div className="text-center">
                  <Building className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                  <h4 className="font-semibold text-blue-800 mb-2">Institutions</h4>
                  <p className="text-sm text-blue-700">Schools, universities, training centers</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-teal-100 to-green-100 p-6 rounded-xl border border-teal-200">
                <div className="text-center">
                  <Lightbulb className="h-8 w-8 mx-auto mb-3 text-teal-600" />
                  <h4 className="font-semibold text-teal-800 mb-2">Corporations</h4>
                  <p className="text-sm text-teal-700">Employee training & development</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-6 rounded-xl border border-orange-200">
                <div className="text-center">
                  <Target className="h-8 w-8 mx-auto mb-3 text-orange-600" />
                  <h4 className="font-semibold text-orange-800 mb-2">Healthcare</h4>
                  <p className="text-sm text-orange-700">Medical training & certification</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl border border-purple-200">
                <div className="text-center">
                  <Zap className="h-8 w-8 mx-auto mb-3 text-purple-600" />
                  <h4 className="font-semibold text-purple-800 mb-2">Government</h4>
                  <p className="text-sm text-purple-700">Public sector training programs</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <button 
                onClick={() => setShowPartnerForm(true)}
                className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-teal-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>📞</span>
                <span>Book a Discovery Call</span>
              </button>
              <button 
                onClick={() => setShowDemoForm(true)}
                className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-500 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>🎯</span>
                <span>Book a Live Demo</span>
              </button>
            </div>

            <Link 
              to="/partnership-details"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <span>Learn more about our partnership programs</span>
              <ArrowRight className="h-5 w-5" />
            </Link>

            {/* Contact Information */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <p className="text-slate-600 mb-4">
                Ready to enhance your organization's learning capabilities? Let's discuss how we can help.
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

      {/* Partner With Us Form Modal */}
      {showPartnerForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                  <span>📞</span>
                  <span>Book a Discovery Call</span>
                </h3>
                <button 
                  onClick={() => setShowPartnerForm(false)}
                  className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handlePartnerFormSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Organization Name</label>
                <input
                  type="text"
                  value={partnerFormData.organizationName}
                  onChange={(e) => setPartnerFormData(prev => ({ ...prev, organizationName: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your organization name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Organization Type</label>
                <select
                  value={partnerFormData.organizationType}
                  onChange={(e) => setPartnerFormData(prev => ({ ...prev, organizationType: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select organization type</option>
                  {organizationTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Contact Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      value={partnerFormData.contactName}
                      onChange={(e) => setPartnerFormData(prev => ({ ...prev, contactName: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="email"
                      value={partnerFormData.email}
                      onChange={(e) => setPartnerFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@organization.com"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="tel"
                    value={partnerFormData.phone}
                    onChange={(e) => setPartnerFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+264 64 404 605"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tell us about your needs</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <textarea
                    value={partnerFormData.message}
                    onChange={(e) => setPartnerFormData(prev => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe your organization's educational goals and how we can help..."
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowPartnerForm(false)}
                  className="flex-1 px-6 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-500 hover:to-purple-600 transition-all duration-200"
                >
                  Submit Partnership Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Demo Form Modal */}
      {showDemoForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                  <span>🎯</span>
                  <span>Book a Live Demo</span>
                </h3>
                <button 
                  onClick={() => setShowDemoForm(false)}
                  className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleDemoFormSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      value={demoFormData.name}
                      onChange={(e) => setDemoFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="email"
                      value={demoFormData.email}
                      onChange={(e) => setDemoFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@organization.com"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Organization</label>
                  <input
                    type="text"
                    value={demoFormData.organization}
                    onChange={(e) => setDemoFormData(prev => ({ ...prev, organization: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your organization name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Your Role</label>
                  <select
                    value={demoFormData.role}
                    onChange={(e) => setDemoFormData(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select your role</option>
                    {roles.map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Date</label>
                  <input
                    type="date"
                    value={demoFormData.preferredDate}
                    onChange={(e) => setDemoFormData(prev => ({ ...prev, preferredDate: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Time</label>
                  <select
                    value={demoFormData.preferredTime}
                    onChange={(e) => setDemoFormData(prev => ({ ...prev, preferredTime: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select time</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">What would you like to see in the demo?</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <textarea
                    value={demoFormData.message}
                    onChange={(e) => setDemoFormData(prev => ({ ...prev, message: e.target.value }))}
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your specific interests or requirements..."
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowDemoForm(false)}
                  className="flex-1 px-6 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-500 hover:to-purple-600 transition-all duration-200"
                >
                  Schedule Demo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default RegisteredSchools;