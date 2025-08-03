import React, { useState } from 'react';
import { Shield, Bell, Search, User, LogOut, Settings } from 'lucide-react';

interface AdminHeaderProps {
  onLogout: () => void;
}

const AdminHeader = ({ onLogout }: AdminHeaderProps) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-orange-400 to-red-500 p-2 rounded-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <span className="font-bold text-lg text-slate-800">Admin Portal</span>
            <div className="text-xs text-slate-500">Tuto ki Tulo mwa Afrika</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search users, subscriptions, or resources..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-slate-600 hover:text-orange-600 hover:bg-slate-100 rounded-lg transition-all duration-200">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              5
            </span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 hover:bg-slate-100 rounded-lg transition-all duration-200"
            >
              <div className="bg-gradient-to-r from-orange-400 to-red-500 p-2 rounded-lg">
                <span className="text-lg">🛡️</span>
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-slate-800">
                  System Administrator
                </div>
                <div className="text-xs text-slate-500">
                  Super Admin
                </div>
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2">
                <button className="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Admin Settings</span>
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

export default AdminHeader;