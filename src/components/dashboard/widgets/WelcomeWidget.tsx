import React from 'react';
import { Play, Clock, Calendar } from 'lucide-react';

interface WelcomeWidgetProps {
  userType: 'student' | 'educator' | 'admin';
}

const WelcomeWidget = ({ userType }: WelcomeWidgetProps) => {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';
  
  const getUserInfo = () => {
    switch (userType) {
      case 'student':
        return { 
          name: 'Alex', 
          title: 'Continue Learning',
          subtitle: 'Ready to continue your learning journey?',
          actionText: 'Jump Back In',
          icon: '📚'
        };
      case 'educator':
        return { 
          name: 'Dr. Wilson', 
          title: 'Manage Your Classes',
          subtitle: 'Ready to inspire your students today?',
          actionText: 'View Classes',
          icon: '👨‍🏫'
        };
      case 'admin':
        return { 
          name: 'Michael', 
          title: 'Institution Overview',
          subtitle: 'Monitor your institution\'s progress',
          actionText: 'View Dashboard',
          icon: '🏫'
        };
      default:
        return { 
          name: 'User', 
          title: 'Welcome',
          subtitle: 'Ready to get started?',
          actionText: 'Get Started',
          icon: '🎓'
        };
    }
  };

  const userInfo = getUserInfo();

  return (
    <div className="bg-gradient-to-r from-teal-400 to-blue-500 rounded-2xl p-6 text-white shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">
            {greeting}, {userInfo.name}! 👋
          </h1>
          <p className="text-teal-100 mb-6">
            {userInfo.subtitle}
          </p>

          {/* Continue Learning Card */}
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-lg">{userInfo.title}</h3>
              <span className="text-xs bg-white/30 px-2 py-1 rounded-full">
                {userInfo.icon} In Progress
              </span>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium mb-1">
                {userType === 'student' && 'Algebra 1 - Chapter 3: Linear Equations'}
                {userType === 'educator' && 'Mathematics Class - Grade 10'}
                {userType === 'admin' && 'Weekly Performance Report'}
              </h4>
              <p className="text-sm text-teal-100 mb-3">
                {userType === 'student' && 'Last studied: Solving systems of equations'}
                {userType === 'educator' && 'Next class: Today at 2:00 PM'}
                {userType === 'admin' && 'Last updated: 2 hours ago'}
              </p>
              
              {/* Progress Bar */}
              <div className="bg-white/20 rounded-full h-2 mb-2">
                <div className="bg-white rounded-full h-2 w-3/4"></div>
              </div>
              <div className="flex justify-between text-xs text-teal-100">
                <span>
                  {userType === 'student' && '75% Complete'}
                  {userType === 'educator' && '18/24 Students Present'}
                  {userType === 'admin' && '85% System Health'}
                </span>
                <span>
                  {userType === 'student' && '3 lessons remaining'}
                  {userType === 'educator' && '6 assignments to review'}
                  {userType === 'admin' && '3 alerts pending'}
                </span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 bg-white text-teal-600 py-2 px-4 rounded-lg font-medium hover:bg-teal-50 transition-all duration-200 flex items-center justify-center space-x-2">
                <Play className="h-4 w-4" />
                <span>{userInfo.actionText}</span>
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
            <div className="text-2xl font-bold">
              {userType === 'student' && '7'}
              {userType === 'educator' && '24'}
              {userType === 'admin' && '1.2K'}
            </div>
            <div className="text-xs text-teal-100">
              {userType === 'student' && 'Day Streak'}
              {userType === 'educator' && 'Students'}
              {userType === 'admin' && 'Total Users'}
            </div>
            <div className="text-lg">
              {userType === 'student' && '🔥'}
              {userType === 'educator' && '👥'}
              {userType === 'admin' && '🏫'}
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
            <div className="text-2xl font-bold">
              {userType === 'student' && '85%'}
              {userType === 'educator' && '92%'}
              {userType === 'admin' && '98%'}
            </div>
            <div className="text-xs text-teal-100">
              {userType === 'student' && 'This Week'}
              {userType === 'educator' && 'Avg Score'}
              {userType === 'admin' && 'Uptime'}
            </div>
            <div className="text-lg">📈</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeWidget;