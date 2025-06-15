import React from 'react';
import { GraduationCap } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-teal-50 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-3 rounded-xl animate-pulse">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <span className="text-2xl font-bold text-slate-800">Tuto ki Tulo</span>
        </div>
        
        <div className="flex justify-center items-center space-x-2">
          <div className="w-3 h-3 bg-teal-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
        
        <p className="text-slate-600 mt-4">Loading your educational experience...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;