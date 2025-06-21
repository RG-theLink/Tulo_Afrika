import React, { useState } from 'react';
import { ExternalLink, Users, MapPin, Calendar, GraduationCap, Clock, Building, Lightbulb, Target, Zap, X, Mail, Phone, User, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const RegisteredSchools = () => {
  // Keep the hook but don't render the component content
  useScrollAnimation();
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
    <section id="schools" className="hidden">
      {/* Partner With Us Form Modal */}
      {showPartnerForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                  <Building className="h-6 w-6 text-blue-600" />
                  <span>Partner With Us</span>
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
                  <Calendar className="h-6 w-6 text-blue-600" />
                  <span>Schedule a Demo</span>
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