import React, { useState } from 'react';
import { ArrowLeft, Mail, User, MessageSquare, Send } from 'lucide-react';

interface WaitlistFormProps {
  onBack: () => void;
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call - replace with actual implementation
    try {
      // Here you would typically send the data to your backend
      console.log('Waitlist submission:', formData);
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting waitlist form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-teal-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-xl p-8 text-center">
            <div className="mb-6">
              <div className="bg-gradient-to-r from-green-400 to-teal-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Send className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">You're on the Waitlist!</h2>
              <p className="text-slate-600">
                Thank you for your interest in Tuto ki Tulo mwa Afrika. We've received your request for demo access.
              </p>
            </div>
            
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6">
              <p className="text-teal-700 text-sm">
                <strong>What's next?</strong><br />
                Our team will review your request and send demo credentials to <strong>{formData.email}</strong> within 24-48 hours.
              </p>
            </div>

            <button
              onClick={onBack}
              className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white py-3 rounded-xl font-semibold hover:from-teal-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-slate-600 hover:text-teal-600 transition-colors duration-200 group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium">Back</span>
          </button>
        </div>

        {/* Form Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-teal-600 bg-clip-text text-transparent mb-2">
            Join the Waitlist
          </h1>
          <p className="text-slate-600">
            Request demo access to explore Tuto ki Tulo mwa Afrika
          </p>
        </div>

        {/* Waitlist Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    placeholder="John"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Why do you want demo access?
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell us about your interest in our educational platform..."
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white py-3 rounded-xl font-semibold hover:from-teal-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Send className="h-5 w-5" />
                  <span>Join Waitlist</span>
                </div>
              )}
            </button>
          </form>

          {/* Info Note */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-700 text-sm">
              <strong>📧 Demo Access:</strong> We'll review your request and send demo credentials to your email within 24-48 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitlistForm;