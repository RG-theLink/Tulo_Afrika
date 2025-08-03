import React, { useState } from 'react';
import { GraduationCap, Bell, Search, User, LogOut, Settings } from 'lucide-react';

interface DashboardHeaderProps {
  userType: 'student' | 'educator' | 'admin';
  onLogout: () => void;
}

const DashboardHeader = ({ userType, onLogout }: DashboardHeaderProps) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getUserInfo = () => {
    switch (userType) {
      case 'student':
        return { name: 'Alex Johnson', role: 'Student', icon: '🎓' };
      case 'educator':
        return { name: 'Dr. Sarah Wilson', role: 'Educator', icon: '👨‍🏫' };
      case 'admin':
        return { name: 'Michael Chen', role: 'School Admin', icon: '🏫' };
      default:
        return { name: 'User', role: 'Student', icon: '🎓' };
    }
  };

  const userInfo = getUserInfo();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-2 rounded-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-lg text-slate-800">Tuto ki Tulo</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses, tools, or ask a question..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-slate-600 hover:text-teal-600 hover:bg-slate-100 rounded-lg transition-all duration-200">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 hover:bg-slate-100 rounded-lg transition-all duration-200"
            >
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-2 rounded-lg">
                <span className="text-lg">{userInfo.icon}</span>
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-slate-800">
                  {userInfo.name}
                </div>
                <div className="text-xs text-slate-500">
                  {userInfo.role}
                </div>
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2">
                <button className="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </button>
                <button 
                  onClick={onLogout}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;