import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  ArrowLeft, 
  Building, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Users, 
  Calendar,
  MessageSquare,
  Clock,
  CheckCircle
} from 'lucide-react';

const SchoolSignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    // Institution Information
    institutionName: '',
    institutionType: '',
    website: '',
    address: '',
    city: '',
    state: '',
    country: '',
    
    // Contact Person
    contactName: '',
    title: '',
    email: '',
    phone: '',
    
    // Institution Details
    studentCount: '',
    gradeRange: '',
    currentLMS: '',
    
    // Integration Details
    integrationType: '',
    timeline: '',
    budget: '',
    message: '',
    
    // Preferred Contact
    preferredContactMethod: '',
    preferredTime: '',
    urgency: ''
  });

  const institutionTypes = [
    { value: 'elementary', label: 'Elementary School', icon: '🏫' },
    { value: 'middle', label: 'Middle School', icon: '🎒' },
    { value: 'high', label: 'High School', icon: '🎓' },
    { value: 'university', label: 'University/College', icon: '🏛️' },
    { value: 'private', label: 'Private School', icon: '🏫' },
    { value: 'charter', label: 'Charter School', icon: '📚' },
    { value: 'homeschool', label: 'Homeschool Network', icon: '🏠' },
    { value: 'training', label: 'Training Center', icon: '💼' },
    { value: 'other', label: 'Other', icon: '📋' }
  ];

  const studentCounts = [
    { value: '1-50', label: '1-50 students' },
    { value: '51-200', label: '51-200 students' },
    { value: '201-500', label: '201-500 students' },
    { value: '501-1000', label: '501-1,000 students' },
    { value: '1000+', label: '1,000+ students' }
  ];

  const integrationTypes = [
    { value: 'full-lms', label: 'Complete LMS Solution', icon: '🏫' },
    { value: 'resource-access', label: 'Educational Resource Access', icon: '📚' },
    { value: 'ai-tutoring', label: 'AI Tutoring Integration', icon: '🤖' },
    { value: 'analytics', label: 'Learning Analytics Platform', icon: '📊' },
    { value: 'custom', label: 'Custom Solution', icon: '⚙️' },
    { value: 'consultation', label: 'Consultation Only', icon: '💬' }
  ];

  const timelines = [
    { value: 'immediate', label: 'Immediate (Within 1 month)' },
    { value: 'quarter', label: 'This Quarter (1-3 months)' },
    { value: 'semester', label: 'Next Semester (3-6 months)' },
    { value: 'year', label: 'Next Academic Year (6-12 months)' },
    { value: 'exploring', label: 'Just Exploring Options' }
  ];

  const budgetRanges = [
    { value: 'under-5k', label: 'Under $5,000' },
    { value: '5k-15k', label: '$5,000 - $15,000' },
    { value: '15k-50k', label: '$15,000 - $50,000' },
    { value: '50k-100k', label: '$50,000 - $100,000' },
    { value: '100k+', label: '$100,000+' },
    { value: 'discuss', label: 'Prefer to discuss' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      console.log('School signup data:', formData);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-teal-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-xl p-12">
            <div className="bg-gradient-to-r from-green-100 to-teal-100 p-6 rounded-2xl inline-block mb-6">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-slate-800 mb-4">
              Thank You for Your Interest!
            </h1>
            
            <p className="text-lg text-slate-600 mb-6">
              We've received your information and will contact you within 24 hours to schedule 
              a personalized demo and discuss how we can transform your institution's learning experience.
            </p>
            
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-xl border border-blue-200 mb-8">
              <h3 className="font-semibold text-blue-800 mb-3">What happens next?</h3>
              <div className="space-y-2 text-sm text-blue-700">
                <div className="flex items-center space-x-2">
                  <span>📞</span>
                  <span>Our education specialist will call you within 24 hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📋</span>
                  <span>We'll discuss your specific needs and requirements</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🎯</span>
                  <span>Schedule a personalized demo of our platform</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📊</span>
                  <span>Receive a custom proposal tailored to your institution</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/"
                className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-teal-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                Return to Home
              </Link>
              <a 
                href="mailto:info@tuloafrika.tech"
                className="border-2 border-teal-400 text-teal-600 px-8 py-3 rounded-xl font-semibold hover:bg-teal-400 hover:text-white transition-all duration-300"
              >
                Email Us Directly
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-slate-600 hover:text-teal-600 transition-colors mb-6">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-3 rounded-xl">
              <Building className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-800">Tuto ki Tulo</span>
          </div>
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent mb-2">
            Empower Your School
          </h1>
          <p className="text-slate-600">Let's discuss how we can transform your institution's learning experience</p>
        </div>

        {/* Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Institution Information */}
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
                <Building className="h-6 w-6 text-blue-600" />
                <span>Institution Information</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Institution Name</label>
                  <input
                    type="text"
                    value={formData.institutionName}
                    onChange={(e) => handleInputChange('institutionName', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your institution name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Institution Type</label>
                  <select
                    value={formData.institutionType}
                    onChange={(e) => handleInputChange('institutionType', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="">Select institution type</option>
                    {institutionTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.icon} {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Website (Optional)</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="https://yourschool.edu"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Street address"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="City"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Country"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Contact Person */}
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
                <User className="h-6 w-6 text-purple-600" />
                <span>Contact Person</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Title/Position</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g., Principal, IT Director, etc."
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="your.email@school.edu"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="+264 64 404 605"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Institution Details */}
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
                <Users className="h-6 w-6 text-teal-600" />
                <span>Institution Details</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Number of Students</label>
                  <select
                    value={formData.studentCount}
                    onChange={(e) => handleInputChange('studentCount', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="">Select student count</option>
                    {studentCounts.map((count) => (
                      <option key={count.value} value={count.value}>
                        {count.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Grade Range</label>
                  <input
                    type="text"
                    value={formData.gradeRange}
                    onChange={(e) => handleInputChange('gradeRange', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g., K-12, 9-12, Undergraduate, etc."
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Current LMS/Platform (if any)</label>
                  <input
                    type="text"
                    value={formData.currentLMS}
                    onChange={(e) => handleInputChange('currentLMS', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g., Canvas, Blackboard, Google Classroom, or None"
                  />
                </div>
              </div>
            </div>

            {/* Integration Requirements */}
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
                <MessageSquare className="h-6 w-6 text-orange-600" />
                <span>Integration Requirements</span>
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-4">What type of integration are you interested in?</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {integrationTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => handleInputChange('integrationType', type.value)}
                        className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                          formData.integrationType === type.value
                            ? 'bg-gradient-to-r from-orange-100 to-yellow-100 border-orange-300 text-orange-800'
                            : 'bg-white border-slate-200 hover:border-orange-200 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{type.icon}</span>
                          <span className="font-medium text-sm">{type.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Implementation Timeline</label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => handleInputChange('timeline', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      required
                    >
                      <option value="">Select timeline</option>
                      {timelines.map((timeline) => (
                        <option key={timeline.value} value={timeline.value}>
                          {timeline.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Budget Range</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      required
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map((budget) => (
                        <option key={budget.value} value={budget.value}>
                          {budget.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Additional Information & Requirements</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder="Please describe your specific needs, challenges, or any questions you have about our platform..."
                    required
                  />
                </div>
              </div>
            </div>

            {/* Contact Preferences */}
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
                <Calendar className="h-6 w-6 text-green-600" />
                <span>Contact Preferences</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Contact Method</label>
                  <select
                    value={formData.preferredContactMethod}
                    onChange={(e) => handleInputChange('preferredContactMethod', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="">Select contact method</option>
                    <option value="phone">Phone Call</option>
                    <option value="email">Email</option>
                    <option value="video">Video Conference</option>
                    <option value="in-person">In-Person Meeting</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Best Time to Contact</label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="">Select preferred time</option>
                    <option value="morning">Morning (9 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                    <option value="evening">Evening (5 PM - 8 PM)</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:from-blue-500 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting Request...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-6 w-6" />
                    <span>Schedule Discovery Call</span>
                  </div>
                )}
              </button>
              
              <p className="text-sm text-slate-500 mt-4">
                We'll contact you within 24 hours to schedule your personalized demo
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-slate-500">
          Questions? Email us at 
          <a href="mailto:info@tuloafrika.tech" className="text-blue-600 hover:text-blue-700 ml-1">
            info@tuloafrika.tech
          </a>
        </div>
      </div>
    </div>
  );
};

export default SchoolSignupForm;