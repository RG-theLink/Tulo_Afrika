import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import MessagingPlatform from '../components/dashboard/messaging/MessagingPlatform';

const MessagingPage = () => {
  const navigate = useNavigate();
  // For demo purposes, we'll default to student. In a real app, this would come from auth context
  const [userType] = useState<'student' | 'educator' | 'admin'>('student');

  const handleBackToDashboard = () => {
    // Navigate back to the main page and trigger dashboard view
    // We'll use state to indicate we want to show the dashboard
    navigate('/', { state: { showDashboard: true, userType } });
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-lg text-white">Swakopmund Christian Academy - Messaging</span>
            </div>

            {/* Back to Dashboard */}
            <button 
              onClick={handleBackToDashboard}
              className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors duration-200 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
      </header>

      {/* Messaging Platform */}
      <div className="h-[calc(100vh-4rem)]">
        <MessagingPlatform userType={userType} />
      </div>
    </div>
  );
};

export default MessagingPage;