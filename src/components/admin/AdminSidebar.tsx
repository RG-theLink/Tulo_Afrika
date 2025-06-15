import React from 'react';
import { 
  Home, 
  Users, 
  GraduationCap, 
  BookOpen, 
  CreditCard, 
  Settings,
  BarChart3,
  Shield,
  Database
} from 'lucide-react';

interface AdminSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const AdminSidebar = ({ activeView, onViewChange }: AdminSidebarProps) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Home, emoji: '📊' },
    { id: 'students', label: 'Student Management', icon: Users, emoji: '🎓' },
    { id: 'educators', label: 'Educator Management', icon: GraduationCap, emoji: '👨‍🏫' },
    { id: 'resources', label: 'Resource Management', icon: BookOpen, emoji: '📚' },
    { id: 'subscriptions', label: 'Subscription Management', icon: CreditCard, emoji: '💳' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, emoji: '📈' },
    { id: 'security', label: 'Security', icon: Shield, emoji: '🔒' },
    { id: 'settings', label: 'System Settings', icon: Settings, emoji: '⚙️' }
  ];

  return (
    <aside className="w-64 bg-white/80 backdrop-blur-sm border-r border-slate-200">
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                  activeView === item.id
                    ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-orange-600'
                }`}
              >
                <span className="text-lg">{item.emoji}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl border border-orange-200">
          <h3 className="text-sm font-semibold text-orange-800 mb-3">Platform Status</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-orange-600">Active Users</span>
              <span className="font-medium text-orange-800">2,847</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-orange-600">System Health</span>
              <span className="font-medium text-orange-800">98%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-orange-600">Revenue</span>
              <span className="font-medium text-orange-800">$45.2K</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;