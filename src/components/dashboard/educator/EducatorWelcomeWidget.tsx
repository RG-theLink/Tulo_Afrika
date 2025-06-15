import React from 'react';
import { Calendar, Users, BookOpen } from 'lucide-react';

const EducatorWelcomeWidget = () => {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';
  
  return (
    <div className="bg-gradient-to-r from-teal-400 to-blue-500 rounded-2xl p-6 text-white shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">
            {greeting}, Dr. Wilson! 👋
          </h1>
          <p className="text-teal-100 mb-6">
            Ready to inspire your students today?
          </p>

          {/* Educator Dashboard Card */}
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-lg">Manage Your Classes</h3>
              <span className="text-xs bg-white/30 px-2 py-1 rounded-full">
                👨‍🏫 Educator
              </span>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium mb-1">
                Mathematics Class - Grade 10
              </h4>
              <p className="text-sm text-teal-100 mb-3">
                Next class: Today at 2:00 PM
              </p>
              
              {/* Progress Bar */}
              <div className="bg-white/20 rounded-full h-2 mb-2">
                <div className="bg-white rounded-full h-2 w-3/4"></div>
              </div>
              <div className="flex justify-between text-xs text-teal-100">
                <span>18/24 Students Present</span>
                <span>6 assignments to review</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 bg-white text-teal-600 py-2 px-4 rounded-lg font-medium hover:bg-teal-50 transition-all duration-200 flex items-center justify-center space-x-2">
                <Users className="h-4 w-4" />
                <span>View Students</span>
              </button>
              <button className="bg-white/20 text-white py-2 px-4 rounded-lg hover:bg-white/30 transition-all duration-200 flex items-center justify-center">
                <Calendar className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Side Stats */}
        <div className="ml-6 space-y-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
            <div className="text-2xl font-bold">24</div>
            <div className="text-xs text-teal-100">Students</div>
            <div className="text-lg">👥</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
            <div className="text-2xl font-bold">92%</div>
            <div className="text-xs text-teal-100">Avg Score</div>
            <div className="text-lg">📈</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducatorWelcomeWidget;