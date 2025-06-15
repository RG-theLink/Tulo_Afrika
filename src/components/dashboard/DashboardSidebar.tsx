import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Target, 
  BarChart3, 
  Calendar, 
  MessageSquare, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Users,
  GraduationCap,
  Shield,
  Brain,
  MessageCircle,
  Video
} from 'lucide-react';

interface DashboardSidebarProps {
  userType: 'student' | 'educator' | 'admin';
  activeView?: string;
  onViewChange?: (view: string) => void;
}

const DashboardSidebar = ({ userType, activeView = 'dashboard', onViewChange }: DashboardSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getMenuItems = () => {
    switch (userType) {
      case 'student':
        return [
          { icon: Home, label: 'Dashboard', active: activeView === 'dashboard', emoji: '🏠', view: 'dashboard' },
          { icon: Brain, label: 'AI Search Engine', active: activeView === 'ai-search', emoji: '🤖', view: 'ai-search' },
          { icon: BookOpen, label: 'My Courses', active: activeView === 'courses', emoji: '📚', view: 'courses' },
          { icon: Target, label: 'Goals', active: activeView === 'goals', emoji: '🎯', view: 'goals' },
          { icon: BarChart3, label: 'Progress', active: activeView === 'progress', emoji: '📊', view: 'progress' },
          { icon: Calendar, label: 'Schedule', active: activeView === 'schedule', emoji: '📅', view: 'schedule' },
          { icon: MessageCircle, label: 'Feedback', active: activeView === 'feedback', emoji: '💬', view: 'feedback' },
          { icon: MessageSquare, label: 'Messages', active: activeView === 'messages', emoji: '💬', view: 'messages', isLink: true, to: '/messaging' },
        ];
      case 'educator':
        return [
          { icon: Home, label: 'Dashboard', active: activeView === 'dashboard', emoji: '🏠', view: 'dashboard' },
          { icon: Users, label: 'My Groups & Students', active: activeView === 'groups', emoji: '👥', view: 'groups' },
          { icon: Target, label: 'Goals', active: activeView === 'goals', emoji: '🎯', view: 'goals' },
          { icon: Calendar, label: 'Schedule', active: activeView === 'schedule', emoji: '📅', view: 'schedule' },
          { icon: Video, label: 'Online Classes', active: activeView === 'online-classes', emoji: '🎥', view: 'online-classes' },
          { icon: MessageSquare, label: 'Messages', active: activeView === 'messages', emoji: '💬', view: 'messages', isLink: true, to: '/messaging' },
        ];
      case 'admin':
        return [
          { icon: Home, label: 'Dashboard', active: activeView === 'dashboard', emoji: '🏠', view: 'dashboard' },
          { icon: GraduationCap, label: 'Institution', active: activeView === 'institution', emoji: '🏫', view: 'institution' },
          { icon: Users, label: 'Users', active: activeView === 'users', emoji: '👥', view: 'users' },
          { icon: BarChart3, label: 'Reports', active: activeView === 'reports', emoji: '📊', view: 'reports' },
          { icon: Shield, label: 'Security', active: activeView === 'security', emoji: '🔒', view: 'security' },
          { icon: MessageSquare, label: 'Messages', active: activeView === 'messages', emoji: '💬', view: 'messages', isLink: true, to: '/messaging' },
          { icon: Settings, label: 'Settings', active: activeView === 'settings', emoji: '⚙️', view: 'settings' },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  const getQuickStats = () => {
    switch (userType) {
      case 'student':
        return {
          title: 'This Week',
          stats: [
            { label: 'Lessons', value: '12/15' },
            { label: 'Streak', value: '🔥 7 days' }
          ]
        };
      case 'educator':
        return {
          title: 'My Classes',
          stats: [
            { label: 'Students', value: '24' },
            { label: 'Assignments', value: '8 pending' }
          ]
        };
      case 'admin':
        return {
          title: 'Institution',
          stats: [
            { label: 'Students', value: '1,247' },
            { label: 'Educators', value: '89' }
          ]
        };
      default:
        return null;
    }
  };

  const quickStats = getQuickStats();

  const handleMenuClick = (view: string) => {
    if (onViewChange) {
      onViewChange(view);
    }
  };

  return (
    <aside className={`bg-white/80 backdrop-blur-sm border-r border-slate-200 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4">
        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-end mb-6 text-slate-600 hover:text-teal-600"
        >
          {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            
            if (item.isLink && item.to) {
              return (
                <Link
                  key={index}
                  to={item.to}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                    item.active
                      ? 'bg-gradient-to-r from-teal-400 to-blue-500 text-white shadow-lg'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-teal-600'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    {isCollapsed ? (
                      <span className="text-lg">{item.emoji}</span>
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </Link>
              );
            }
            
            return (
              <button
                key={index}
                onClick={() => handleMenuClick(item.view)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                  item.active
                    ? 'bg-gradient-to-r from-teal-400 to-blue-500 text-white shadow-lg'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-teal-600'
                }`}
              >
                <div className="flex items-center justify-center">
                  {isCollapsed ? (
                    <span className="text-lg">{item.emoji}</span>
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Stats */}
        {!isCollapsed && quickStats && (
          <div className="mt-8 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border border-purple-200">
            <h3 className="text-sm font-semibold text-purple-800 mb-3">{quickStats.title}</h3>
            <div className="space-y-2">
              {quickStats.stats.map((stat, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-purple-600">{stat.label}</span>
                  <span className="font-medium text-purple-800">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default DashboardSidebar;