import React, { useState } from 'react';
import { ArrowLeft, Heart, Send, DollarSign } from 'lucide-react';

interface DonationFormProps {
  onBack: () => void;
}

const DonationForm: React.FC<DonationFormProps> = ({ onBack }) => {
  const [donationAmount, setDonationAmount] = useState('');
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

Amount: $${donationAmount}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

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
                Your email client should have opened with the donation details. If not, please contact us directly at <strong>donations@tuloafrika.tech</strong> with your donation amount.
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
          <p className="text-slate-600">
            Help us empower students across Africa with world-class educational resources
          </p>
        </div>

        {/* Donation Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                <p className="text-green-700 text-sm">
                  <strong>Your Impact:</strong> ${donationAmount} can help provide educational resources and platform access to students who need it most.
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !donationAmount}
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
              <strong>💝 Secure Donation:</strong> Your donation request will be sent via email to our team. We'll follow up with secure payment options and donation receipt.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-2">Our Mission</h4>
            <p className="text-slate-600 text-sm">
              Tuto ki Tulo mwa Afrika means "Education is Victory for Africa." Your donation helps us provide world-class educational tools and resources to students across Africa, breaking down barriers to quality education.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationForm;