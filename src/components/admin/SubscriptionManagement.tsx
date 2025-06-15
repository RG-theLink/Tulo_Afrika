import React, { useState } from 'react';
import { Search, Filter, CreditCard, TrendingUp, Users, DollarSign, Calendar, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const SubscriptionManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const subscriptions = [
    {
      id: 1,
      userType: 'Student',
      userName: 'Alex Johnson',
      email: 'alex.johnson@email.com',
      tier: 'Student Pro',
      status: 'active',
      startDate: '2024-01-01',
      nextBilling: '2024-02-01',
      amount: 25,
      paymentMethod: 'Credit Card',
      lastPayment: '2024-01-01',
      avatar: '🎓'
    },
    {
      id: 2,
      userType: 'Educator',
      userName: 'Dr. Sarah Wilson',
      email: 'sarah.wilson@tutokitulo.africa',
      tier: 'Educator Pro',
      status: 'active',
      startDate: '2023-09-15',
      nextBilling: '2024-02-15',
      amount: 35,
      paymentMethod: 'Bank Transfer',
      lastPayment: '2024-01-15',
      avatar: '👨‍🏫'
    },
    {
      id: 3,
      userType: 'Student',
      userName: 'Emma Davis',
      email: 'emma.davis@email.com',
      tier: 'Free Tier',
      status: 'active',
      startDate: '2024-01-10',
      nextBilling: 'N/A',
      amount: 0,
      paymentMethod: 'N/A',
      lastPayment: 'N/A',
      avatar: '👩‍🎓'
    },
    {
      id: 4,
      userType: 'Student',
      userName: 'Mike Chen',
      email: 'mike.chen@email.com',
      tier: 'Tutor Plus',
      status: 'past_due',
      startDate: '2023-12-20',
      nextBilling: '2024-01-20',
      amount: 50,
      paymentMethod: 'Credit Card',
      lastPayment: '2023-12-20',
      avatar: '👨‍🎓'
    },
    {
      id: 5,
      userType: 'Educator',
      userName: 'Prof. Michael Chen',
      email: 'michael.chen@tutokitulo.africa',
      tier: 'Educator Elite',
      status: 'active',
      startDate: '2023-08-20',
      nextBilling: '2024-02-20',
      amount: 60,
      paymentMethod: 'Credit Card',
      lastPayment: '2024-01-20',
      avatar: '👨‍🏫'
    }
  ];

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = filterTier === 'all' || sub.tier === filterTier;
    const matchesStatus = filterStatus === 'all' || sub.status === filterStatus;
    
    return matchesSearch && matchesTier && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'past_due': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      case 'trial': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Free Tier': return 'bg-slate-100 text-slate-800';
      case 'Student Pro': return 'bg-blue-100 text-blue-800';
      case 'Tutor Plus': return 'bg-purple-100 text-purple-800';
      case 'Educator Basic': return 'bg-green-100 text-green-800';
      case 'Educator Pro': return 'bg-teal-100 text-teal-800';
      case 'Educator Elite': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalRevenue = subscriptions.reduce((acc, sub) => acc + sub.amount, 0);
  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active').length;
  const pastDueSubscriptions = subscriptions.filter(sub => sub.status === 'past_due').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Subscription Management</h1>
          <p className="text-slate-600">Monitor and manage user subscriptions and billing</p>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-800">${totalRevenue}</div>
              <div className="text-green-600 text-sm">Monthly Revenue</div>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-800">{activeSubscriptions}</div>
              <div className="text-blue-600 text-sm">Active Subscriptions</div>
            </div>
            <CheckCircle className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-red-100 to-red-200 p-6 rounded-xl border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-red-800">{pastDueSubscriptions}</div>
              <div className="text-red-600 text-sm">Past Due</div>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-6 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-800">
                {subscriptions.filter(s => s.tier !== 'Free Tier').length}
              </div>
              <div className="text-purple-600 text-sm">Paid Plans</div>
            </div>
            <CreditCard className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by user name or email..."
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Tier Filter */}
          <div className="md:w-48">
            <select
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Tiers</option>
              <option value="Free Tier">Free Tier</option>
              <option value="Student Pro">Student Pro</option>
              <option value="Tutor Plus">Tutor Plus</option>
              <option value="Educator Basic">Educator Basic</option>
              <option value="Educator Pro">Educator Pro</option>
              <option value="Educator Elite">Educator Elite</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="md:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="past_due">Past Due</option>
              <option value="cancelled">Cancelled</option>
              <option value="trial">Trial</option>
            </select>
          </div>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">User</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Subscription</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Billing</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Payment</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscriptions.map((subscription) => (
                <tr key={subscription.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-orange-400 to-red-500 p-2 rounded-lg">
                        <span className="text-lg">{subscription.avatar}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{subscription.userName}</div>
                        <div className="text-sm text-slate-500">{subscription.userType}</div>
                        <div className="text-sm text-slate-500">{subscription.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTierColor(subscription.tier)}`}>
                        {subscription.tier}
                      </span>
                      <div className="text-sm text-slate-500">
                        Since {subscription.startDate}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(subscription.status)}`}>
                      {subscription.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="font-semibold text-slate-800">
                        {subscription.amount > 0 ? `$${subscription.amount}/month` : 'Free'}
                      </div>
                      <div className="text-sm text-slate-500">
                        {subscription.nextBilling !== 'N/A' && (
                          <>Next: {subscription.nextBilling}</>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="text-sm text-slate-600">{subscription.paymentMethod}</div>
                      <div className="text-sm text-slate-500">
                        {subscription.lastPayment !== 'N/A' && (
                          <>Last: {subscription.lastPayment}</>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" title="View Details">
                        <CreditCard className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors" title="Manage">
                        <Calendar className="h-4 w-4" />
                      </button>
                      {subscription.status === 'past_due' && (
                        <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors" title="Send Reminder">
                          <AlertTriangle className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subscription Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tier Distribution */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-orange-500" />
            <span>Subscription Distribution</span>
          </h3>
          <div className="space-y-4">
            {['Free Tier', 'Student Pro', 'Tutor Plus', 'Educator Pro', 'Educator Elite'].map((tier) => {
              const count = subscriptions.filter(s => s.tier === tier).length;
              const percentage = (count / subscriptions.length) * 100;
              return (
                <div key={tier} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-700">{tier}</span>
                    <span className="text-slate-600">{count} users ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-orange-400 to-red-500 rounded-full h-2 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
            <DollarSign className="h-6 w-6 text-orange-500" />
            <span>Revenue Breakdown</span>
          </h3>
          <div className="space-y-4">
            {['Student Pro', 'Tutor Plus', 'Educator Pro', 'Educator Elite'].map((tier) => {
              const tierSubs = subscriptions.filter(s => s.tier === tier && s.status === 'active');
              const revenue = tierSubs.reduce((acc, s) => acc + s.amount, 0);
              const percentage = totalRevenue > 0 ? (revenue / totalRevenue) * 100 : 0;
              return (
                <div key={tier} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <div>
                    <div className="font-medium text-slate-800">{tier}</div>
                    <div className="text-sm text-slate-500">{tierSubs.length} active subscriptions</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-800">${revenue}</div>
                    <div className="text-sm text-slate-500">{percentage.toFixed(1)}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManagement;