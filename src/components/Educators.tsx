import React, { useState } from 'react';
import { Users, BookOpen, TrendingUp, Shield, X, Mail, Phone, User, MessageSquare, Building } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Educators = () => {
  const [ref, isVisible] = useScrollAnimation();
  const [showEmpowerForm, setShowEmpowerForm] = useState(false);
  const [empowerFormData, setEmpowerFormData] = useState({
    schoolName: '',
    contactName: '',
    email: '',
    phone: '',
    schoolType: '',
    studentCount: '',
    message: ''
  });

  const schoolTypes = [
    'Elementary School',
    'Middle School',
    'High School',
    'K-12 School',
    'Homeschool',
    'Private School',
    'Charter School',
    'International School',
    'Other'
  ];

  const studentCounts = [
    '1-50 students',
    '51-100 students',
    '101-250 students',
    '251-500 students',
    '501-1000 students',
    '1000+ students'
  ];

  const handleEmpowerFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Empower form submitted:', empowerFormData);
    // Handle form submission
    setShowEmpowerForm(false);
    // Reset form
    setEmpowerFormData({
      schoolName: '',
      contactName: '',
      email: '',
      phone: '',
      schoolType: '',
      studentCount: '',
      message: ''
    });
  };

  const benefits = [
    {
      icon: Users,
      emoji: '👥',
      title: 'Student Management',
      description: 'Comprehensive dashboard to track and manage student progress across all subjects.',
      gradient: 'from-blue-400 to-purple-500'
    },
    {
      icon: BookOpen,
      emoji: '📖',
      title: 'Curriculum Tools',
      description: 'Aligned with international standards and customizable to your institution\'s needs.',
      gradient: 'from-teal-400 to-blue-500'
    },
    {
      icon: TrendingUp,
      emoji: '📊',
      title: 'Analytics & Insights',
      description: 'Detailed performance analytics to identify learning gaps and optimize outcomes.',
      gradient: 'from-orange-400 to-pink-500'
    },
    {
      icon: Shield,
      emoji: '🔒',
      title: 'Secure & Compliant',
      description: 'FERPA compliant with enterprise-grade security for student data protection.',
      gradient: 'from-purple-400 to-pink-500'
    }
  ];

  return (
    <section id="educators" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Educational Badge */}
          <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-full px-6 py-2 mb-6">
            <span className="text-xl mr-2">🏫</span>
            <span className="text-slate-700 font-medium">For Educational Institutions</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 to-purple-600 bg-clip-text text-transparent mb-6">
            Designed for Educators, Built for Institutions.
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Custom packages are available for homeschools, schools, and other institutions, 
            offering comprehensive student management, curriculum tools, and bulk pricing solutions 
            tailored to your specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className={`text-center transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 hover:border-purple-300 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl">
                  <div className={`bg-gradient-to-r ${benefit.gradient} p-4 rounded-2xl inline-block mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl">{benefit.emoji}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div 
          className={`text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-gradient-to-r from-white/80 to-purple-50/80 backdrop-blur-sm p-12 rounded-3xl border border-purple-200 max-w-4xl mx-auto shadow-xl">
            {/* Institution Icons */}
            <div className="flex justify-center space-x-4 mb-6">
              <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-3 rounded-xl">
                <span className="text-2xl">🎓</span>
              </div>
              <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-3 rounded-xl">
                <span className="text-2xl">🏫</span>
              </div>
              <div className="bg-gradient-to-r from-orange-400 to-pink-500 p-3 rounded-xl">
                <span className="text-2xl">📚</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Ready to Transform Your Institution's Learning Experience?
            </h3>
            <p className="text-slate-600 mb-8 text-lg">
              Let's discuss how we can customize our platform to meet your specific educational goals 
              and help your students achieve their full potential.
            </p>
            <button 
              onClick={() => setShowEmpowerForm(true)}
              className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:from-purple-500 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              🏫 Empower Your School Now
            </button>
          </div>
        </div>
      </div>

      {/* Empower Your School Form Modal */}
      {showEmpowerForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                  <Building className="h-6 w-6 text-purple-600" />
                  <span>Empower Your School</span>
                </h3>
                <button 
                  onClick={() => setShowEmpowerForm(false)}
                  className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleEmpowerFormSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">School/Institution Name</label>
                <input
                  type="text"
                  value={empowerFormData.schoolName}
                  onChange={(e) => setEmpowerFormData(prev => ({ ...prev, schoolName: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your school name"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">School Type</label>
                  <select
                    value={empowerFormData.schoolType}
                    onChange={(e) => setEmpowerFormData(prev => ({ ...prev, schoolType: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select school type</option>
                    {schoolTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Number of Students</label>
                  <select
                    value={empowerFormData.studentCount}
                    onChange={(e) => setEmpowerFormData(prev => ({ ...prev, studentCount: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select student count</option>
                    {studentCounts.map((count) => (
                      <option key={count} value={count}>{count}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Contact Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      value={empowerFormData.contactName}
                      onChange={(e) => setEmpowerFormData(prev => ({ ...prev, contactName: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                      value={empowerFormData.email}
                      onChange={(e) => setEmpowerFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="your.email@school.edu"
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
                    value={empowerFormData.phone}
                    onChange={(e) => setEmpowerFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="+264 64 404 605"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tell us about your school's needs</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <textarea
                    value={empowerFormData.message}
                    onChange={(e) => setEmpowerFormData(prev => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Describe your educational goals, current challenges, and how we can help empower your school..."
                    required
                  />
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-purple-700 text-sm">
                  <strong>🎯 What to expect:</strong> Our team will review your submission and contact you within 24 hours to discuss custom solutions, pricing, and implementation timeline for your school.
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowEmpowerForm(false)}
                  className="flex-1 px-6 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-500 hover:to-pink-600 transition-all duration-200"
                >
                  Empower My School
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Educators;