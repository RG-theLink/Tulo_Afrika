import React from 'react';
import { Users, GraduationCap, BookOpen, CreditCard, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const AdminOverview = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '2,156',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-400 to-blue-600'
    },
    {
      title: 'Active Educators',
      value: '89',
      change: '+5%',
      trend: 'up',
      icon: GraduationCap,
      color: 'from-green-400 to-green-600'
    },
    {
      title: 'Resources Available',
      value: '1,247',
      change: '+8%',
      trend: 'up',
      icon: BookOpen,
      color: 'from-purple-400 to-purple-600'
    },
    {
      title: 'Monthly Revenue',
      value: '$45,230',
      change: '+15%',
      trend: 'up',
      icon: CreditCard,
      color: 'from-orange-400 to-orange-600'
    }
  ];

  const recentActivity = [
    {
      type: 'user',
      message: 'New student registration: Sarah Johnson',
      time: '2 minutes ago',
      status: 'success'
    },
    {
      type: 'subscription',
      message: 'Educator Pro subscription upgraded: Dr. Wilson',
      time: '15 minutes ago',
      status: 'success'
    },
    {
      type: 'alert',
      message: 'Resource access issue reported',
      time: '1 hour ago',
      status: 'warning'
    },
    {
      type: 'system',
      message: 'System backup completed successfully',
      time: '2 hours ago',
      status: 'success'
    }
  ];

  const subscriptionBreakdown = [
    { tier: 'Student Free', count: 1456, percentage: 67.5, color: 'bg-slate-400' },
    { tier: 'Student Pro', count: 589, percentage: 27.3, color: 'bg-blue-500' },
    { tier: 'Tutor Plus', count: 111, percentage: 5.2, color: 'bg-purple-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Admin Dashboard</h1>
        <p className="text-slate-600">Platform overview and key metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</h3>
              <p className="text-slate-600 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-6 shadow-lg">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
            <Clock className="h-6 w-6 text-orange-500" />
            <span>Recent Activity</span>
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl">
                <div className={`p-2 rounded-lg ${
                  activity.status === 'success' ? 'bg-green-100' :
                  activity.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                  {activity.status === 'success' && <CheckCircle className="h-5 w-5 text-green-600" />}
                  {activity.status === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-slate-800 font-medium">{activity.message}</p>
                  <p className="text-slate-500 text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Breakdown */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-6 shadow-lg">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-orange-500" />
            <span>Subscriptions</span>
          </h2>
          <div className="space-y-4">
            {subscriptionBreakdown.map((sub, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-700">{sub.tier}</span>
                  <span className="text-slate-600">{sub.count} users</span>
                </div>
                <div className="bg-slate-200 rounded-full h-2">
                  <div 
                    className={`${sub.color} rounded-full h-2 transition-all duration-500`}
                    style={{ width: `${sub.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-slate-500">{sub.percentage}% of total</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl border border-orange-200 p-6">
        <h2 className="text-xl font-bold text-orange-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-white/80 p-4 rounded-xl hover:bg-white transition-all duration-200 text-left">
            <div className="text-2xl mb-2">👤</div>
            <div className="font-medium text-slate-800">Add New User</div>
            <div className="text-sm text-slate-600">Create student or educator account</div>
          </button>
          <button className="bg-white/80 p-4 rounded-xl hover:bg-white transition-all duration-200 text-left">
            <div className="text-2xl mb-2">📚</div>
            <div className="font-medium text-slate-800">Manage Resources</div>
            <div className="text-sm text-slate-600">Add or update learning materials</div>
          </button>
          <button className="bg-white/80 p-4 rounded-xl hover:bg-white transition-all duration-200 text-left">
            <div className="text-2xl mb-2">💳</div>
            <div className="font-medium text-slate-800">Billing Overview</div>
            <div className="text-sm text-slate-600">View subscription and payments</div>
          </button>
          <button className="bg-white/80 p-4 rounded-xl hover:bg-white transition-all duration-200 text-left">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-medium text-slate-800">Generate Report</div>
            <div className="text-sm text-slate-600">Create custom analytics report</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;