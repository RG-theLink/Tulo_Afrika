import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, CheckCircle, ArrowRight } from 'lucide-react';

const SignupSuccessPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-xl p-12">
          <div className="bg-gradient-to-r from-green-100 to-teal-100 p-6 rounded-2xl inline-block mb-6">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            Registration Successful!
          </h1>
          
          <p className="text-lg text-slate-600 mb-6">
            Your account has been created successfully. Please check your email to verify your account.
          </p>
          
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-xl border border-blue-200 mb-8">
            <h3 className="font-semibold text-blue-800 mb-3">What happens next?</h3>
            <div className="space-y-2 text-sm text-blue-700 text-left">
              <div className="flex items-center space-x-2">
                <span>📧</span>
                <span>Check your email for a verification link</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>✅</span>
                <span>Click the link to verify your account</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🔑</span>
                <span>Sign in with your new credentials</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🚀</span>
                <span>Start your personalized learning journey</span>
              </div>
            </div>
          </div>
          
          <Link 
            to="/login"
            className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-teal-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2"
          >
            <span>Proceed to Login</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupSuccessPage;