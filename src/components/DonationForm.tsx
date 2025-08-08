import React, { useState } from 'react';
import { ArrowLeft, Heart, Send, DollarSign, Mail } from 'lucide-react';

interface DonationFormProps {
  onBack: () => void;
}

const DonationForm: React.FC<DonationFormProps> = ({ onBack }) => {
  const [donationAmount, setDonationAmount] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const predefinedAmounts = ['10', '25', '50', '100', '250', '500'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create email content
      const emailSubject = `Donation Request - $${donationAmount}`;
      const emailBody = `
New donation request received:

Donor Email: ${donorEmail}
Amount: $${donationAmount}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

Purpose: Supporting open source educational content development, assistance to underprivileged learners, and infrastructure upgrades for Tuto ki Tulo mwa Afrika.

This donation request was submitted through the Tuto ki Tulo mwa Afrika platform.
      `.trim();

      // Create mailto link
      const mailtoLink = `mailto:donations@tuloafrika.tech?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Simulate delay for UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error processing donation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAmountSelect = (amount: string) => {
    setDonationAmount(amount);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-green-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-xl p-8 text-center">
            <div className="mb-6">
              <div className="bg-gradient-to-r from-green-400 to-teal-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Thank You for Your Generosity!</h2>
              <p className="text-slate-600">
                Your donation request for <strong>${donationAmount}</strong> has been processed.
              </p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-700 text-sm">
                <strong>What's next?</strong><br />
                Your email client should have opened with the donation details. If not, please contact us directly at <strong>donations@tuloafrika.tech</strong> with your donation amount and email address.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-800 mb-2">Your Impact</h4>
              <p className="text-blue-700 text-sm">
                Your ${donationAmount} donation will help us:
              </p>
              <ul className="text-blue-700 text-sm mt-2 space-y-1">
                <li>• Develop open source educational content</li>
                <li>• Provide assistance to underprivileged learners</li>
                <li>• Upgrade platform infrastructure</li>
                <li>• Expand access to quality education across Africa</li>
              </ul>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-green-50 flex items-center justify-center p-4">
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
          <div className="bg-gradient-to-r from-green-400 to-teal-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-green-600 bg-clip-text text-transparent mb-2">
            Support Education in Africa
          </h1>
          <p className="text-slate-600 mb-4">
            Help us develop open source content, assist underprivileged learners, and upgrade our infrastructure
          </p>
          
          {/* Mission Impact */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2">Your donation supports:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-green-700">
              <div className="flex items-center space-x-2">
                <span>📚</span>
                <span>Open source educational content</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🤝</span>
                <span>Assistance to underprivileged learners</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🏗️</span>
                <span>Infrastructure upgrades</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🌍</span>
                <span>Expanding access across Africa</span>
              </div>
            </div>
          </div>
        </div>

        {/* Donation Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Your Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">We'll use this to send you a donation receipt and updates on our impact.</p>
            </div>

            {/* Predefined Amounts */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Choose an amount or enter custom amount
              </label>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handleAmountSelect(amount)}
                    className={`py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                      donationAmount === amount
                        ? 'bg-gradient-to-r from-green-400 to-teal-500 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Donation Amount (USD)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter amount"
                  required
                />
              </div>
            </div>

            {/* Impact Message */}
            {donationAmount && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-700 text-sm mb-2">
                  <strong>Your ${donationAmount} Impact:</strong>
                </p>
                <div className="text-green-700 text-xs space-y-1">
                  <div className="flex items-center space-x-2">
                    <span>📚</span>
                    <span>Help develop {Math.floor(parseInt(donationAmount) / 5) || 1}+ open source learning modules</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>🎓</span>
                    <span>Provide platform access to {Math.floor(parseInt(donationAmount) / 2) || 1}+ underprivileged students</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>🏗️</span>
                    <span>Support infrastructure improvements for better learning experience</span>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !donationAmount || !donorEmail}
              className="w-full bg-gradient-to-r from-green-400 to-teal-500 text-white py-3 rounded-xl font-semibold hover:from-green-500 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span>Donate ${donationAmount || '0'}</span>
                </div>
              )}
            </button>
          </form>

          {/* Info Note */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-700 text-sm">
              <strong>💝 Secure Donation:</strong> Your donation request will be sent via email to our team. We'll follow up with secure payment options and send a donation receipt to your email address.
            </p>
          </div>

          {/* Detailed Mission Statement */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-3">How Your Donation Makes a Difference</h4>
            <div className="space-y-3 text-slate-600 text-sm">
              <div className="flex items-start space-x-3">
                <span className="text-lg">📚</span>
                <div>
                  <p className="font-medium text-slate-700">Open Source Content Development</p>
                  <p>Creating freely accessible educational materials, curricula, and learning resources that can be used by schools and students worldwide.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-lg">🤝</span>
                <div>
                  <p className="font-medium text-slate-700">Supporting Underprivileged Learners</p>
                  <p>Providing scholarships, free platform access, and educational support to students who cannot afford quality learning resources.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-lg">🏗️</span>
                <div>
                  <p className="font-medium text-slate-700">Infrastructure Upgrades</p>
                  <p>Improving our platform's servers, security, and features to provide a better learning experience for all users across Africa.</p>
                </div>
              </div>
            </div>
            <p className="text-slate-600 text-sm mt-4 italic">
              "Tuto ki Tulo mwa Afrika" means "Education is Victory for Africa." Every donation brings us closer to educational victory across the continent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationForm;