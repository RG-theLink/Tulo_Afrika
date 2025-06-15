import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Mail, Phone, Calendar, Users, BookOpen, Star, UserPlus, X, Save, CreditCard } from 'lucide-react';

const EducatorManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTier, setFilterTier] = useState('all');
  const [showAddEducatorModal, setShowAddEducatorModal] = useState(false);
  const [showEditSubscriptionModal, setShowEditSubscriptionModal] = useState(false);
  const [selectedEducator, setSelectedEducator] = useState<any>(null);
  
  const [newEducator, setNewEducator] = useState({
    name: '',
    email: '',
    phone: '',
    tier: 'Educator Basic',
    status: 'active',
    specialization: '',
    password: '',
    bio: ''
  });

  const educators = [
    {
      id: 1,
      name: 'Dr. Sarah Wilson',
      email: 'sarah.wilson@tutokitulo.africa',
      phone: '+1 (555) 987-6543',
      tier: 'Educator Pro',
      status: 'active',
      joinDate: '2023-09-15',
      lastActive: '2024-01-20',
      studentsCount: 24,
      coursesCreated: 8,
      rating: 4.9,
      specialization: 'Mathematics',
      avatar: '👨‍🏫'
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      email: 'michael.chen@tutokitulo.africa',
      phone: '+1 (555) 876-5432',
      tier: 'Educator Elite',
      status: 'active',
      joinDate: '2023-08-20',
      lastActive: '2024-01-19',
      studentsCount: 45,
      coursesCreated: 15,
      rating: 4.8,
      specialization: 'Computer Science',
      avatar: '👨‍🏫'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@tutokitulo.africa',
      phone: '+1 (555) 765-4321',
      tier: 'Educator Basic',
      status: 'active',
      joinDate: '2023-10-10',
      lastActive: '2024-01-18',
      studentsCount: 12,
      coursesCreated: 3,
      rating: 4.7,
      specialization: 'Biology',
      avatar: '👩‍🏫'
    },
    {
      id: 4,
      name: 'Prof. James Thompson',
      email: 'james.thompson@tutokitulo.africa',
      phone: '+1 (555) 654-3210',
      tier: 'Educator Pro',
      status: 'inactive',
      joinDate: '2023-07-05',
      lastActive: '2024-01-05',
      studentsCount: 18,
      coursesCreated: 6,
      rating: 4.6,
      specialization: 'History',
      avatar: '👨‍🏫'
    }
  ];

  const subscriptionTiers = [
    { value: 'Educator Basic', label: 'Educator Basic', description: 'Basic teaching tools and resources' },
    { value: 'Educator Pro', label: 'Educator Pro', description: 'Advanced teaching tools and analytics' },
    { value: 'Educator Elite', label: 'Educator Elite', description: 'Premium features with dedicated support' }
  ];

  const specializations = [
    'Mathematics',
    'Science',
    'Biology',
    'Chemistry',
    'Physics',
    'Computer Science',
    'History',
    'Geography',
    'Literature',
    'Language Arts',
    'Foreign Languages',
    'Art',
    'Music',
    'Physical Education',
    'Special Education',
    'Other'
  ];

  const filteredEducators = educators.filter(educator => {
    const matchesSearch = educator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         educator.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         educator.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || educator.status === filterStatus;
    const matchesTier = filterTier === 'all' || educator.tier === filterTier;
    
    return matchesSearch && matchesStatus && matchesTier;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'suspended': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Educator Basic': return 'bg-slate-100 text-slate-800';
      case 'Educator Pro': return 'bg-blue-100 text-blue-800';
      case 'Educator Elite': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddEducator = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding new educator:', newEducator);
    // In a real implementation, this would add the educator to the database
    setShowAddEducatorModal(false);
    setNewEducator({
      name: '',
      email: '',
      phone: '',
      tier: 'Educator Basic',
      status: 'active',
      specialization: '',
      password: '',
      bio: ''
    });
  };

  const handleEditSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating subscription for educator:', selectedEducator);
    // In a real implementation, this would update the educator's subscription in the database
    setShowEditSubscriptionModal(false);
    setSelectedEducator(null);
  };

  const openEditSubscriptionModal = (educator: any) => {
    setSelectedEducator({...educator});
    setShowEditSubscriptionModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Educator Management</h1>
          <p className="text-slate-600">Manage educator accounts, tiers, and teaching access</p>
        </div>
        <button 
          onClick={() => setShowAddEducatorModal(true)}
          className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-500 hover:to-green-700 transition-all duration-200 flex items-center space-x-2"
        >
          <UserPlus className="h-5 w-5" />
          <span>Add Educator</span>
        </button>
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
                placeholder="Search educators by name, email, or specialization..."
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="md:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          {/* Tier Filter */}
          <div className="md:w-48">
            <select
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Tiers</option>
              <option value="Educator Basic">Educator Basic</option>
              <option value="Educator Pro">Educator Pro</option>
              <option value="Educator Elite">Educator Elite</option>
            </select>
          </div>
        </div>
      </div>

      {/* Educators Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Educator</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Contact</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Tier</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Teaching Stats</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Rating</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Last Active</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEducators.map((educator) => (
                <tr key={educator.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-lg">
                        <span className="text-lg">{educator.avatar}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{educator.name}</div>
                        <div className="text-sm text-slate-500">{educator.specialization}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm text-slate-600">
                        <Mail className="h-4 w-4" />
                        <span>{educator.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-slate-600">
                        <Phone className="h-4 w-4" />
                        <span>{educator.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTierColor(educator.tier)}`}>
                      {educator.tier}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(educator.status)}`}>
                      {educator.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm text-slate-600">
                        <Users className="h-4 w-4" />
                        <span>{educator.studentsCount} students</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-slate-600">
                        <BookOpen className="h-4 w-4" />
                        <span>{educator.coursesCreated} courses</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium text-slate-800">{educator.rating}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Calendar className="h-4 w-4" />
                      <span>{educator.lastActive}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" title="View Details">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors" title="Edit">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => openEditSubscriptionModal(educator)}
                        className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors" 
                        title="Manage Subscription"
                      >
                        <CreditCard className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-800">{filteredEducators.length}</div>
              <div className="text-green-600 text-sm">Total Educators</div>
            </div>
            <div className="text-3xl">👨‍🏫</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-800">
                {filteredEducators.filter(e => e.status === 'active').length}
              </div>
              <div className="text-blue-600 text-sm">Active Educators</div>
            </div>
            <div className="text-3xl">✅</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-6 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-800">
                {filteredEducators.reduce((acc, e) => acc + e.studentsCount, 0)}
              </div>
              <div className="text-purple-600 text-sm">Total Students Taught</div>
            </div>
            <div className="text-3xl">👥</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-6 rounded-xl border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-yellow-800">
                {(filteredEducators.reduce((acc, e) => acc + e.rating, 0) / filteredEducators.length).toFixed(1)}
              </div>
              <div className="text-yellow-600 text-sm">Average Rating</div>
            </div>
            <div className="text-3xl">⭐</div>
          </div>
        </div>
      </div>

      {/* Add Educator Modal */}
      {showAddEducatorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                  <UserPlus className="h-6 w-6 text-green-600" />
                  <span>Add New Educator</span>
                </h3>
                <button 
                  onClick={() => setShowAddEducatorModal(false)}
                  className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleAddEducator} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={newEducator.name}
                    onChange={(e) => setNewEducator(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter educator's full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={newEducator.email}
                    onChange={(e) => setNewEducator(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="educator@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={newEducator.phone}
                    onChange={(e) => setNewEducator(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Specialization</label>
                  <select
                    value={newEducator.specialization}
                    onChange={(e) => setNewEducator(prev => ({ ...prev, specialization: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select specialization</option>
                    {specializations.map((specialization, index) => (
                      <option key={index} value={specialization}>{specialization}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Professional Bio</label>
                <textarea
                  value={newEducator.bio}
                  onChange={(e) => setNewEducator(prev => ({ ...prev, bio: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Brief professional biography and teaching experience..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Temporary Password</label>
                  <input
                    type="text"
                    value={newEducator.password}
                    onChange={(e) => setNewEducator(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Temporary password"
                    required
                  />
                  <p className="text-xs text-slate-500 mt-1">Educator will be prompted to change on first login</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Subscription Tier</label>
                  <select
                    value={newEducator.tier}
                    onChange={(e) => setNewEducator(prev => ({ ...prev, tier: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    {subscriptionTiers.map((tier) => (
                      <option key={tier.value} value={tier.value}>{tier.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Account Status</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={newEducator.status === 'active'}
                      onChange={() => setNewEducator(prev => ({ ...prev, status: 'active' }))}
                      className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                    />
                    <span className="text-slate-700">Active</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={newEducator.status === 'inactive'}
                      onChange={() => setNewEducator(prev => ({ ...prev, status: 'inactive' }))}
                      className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                    />
                    <span className="text-slate-700">Inactive</span>
                  </label>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddEducatorModal(false)}
                  className="flex-1 px-6 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl font-semibold hover:from-green-500 hover:to-green-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Add Educator</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Subscription Modal */}
      {showEditSubscriptionModal && selectedEducator && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                  <CreditCard className="h-6 w-6 text-green-600" />
                  <span>Manage Subscription Tier</span>
                </h3>
                <button 
                  onClick={() => setShowEditSubscriptionModal(false)}
                  className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleEditSubscription} className="p-6 space-y-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-lg">
                  <span className="text-lg">{selectedEducator.avatar}</span>
                </div>
                <div>
                  <div className="font-semibold text-slate-800">{selectedEducator.name}</div>
                  <div className="text-sm text-slate-500">{selectedEducator.email}</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-4">Current Subscription Tier</label>
                <div className={`px-4 py-3 rounded-xl ${getTierColor(selectedEducator.tier)}`}>
                  <div className="font-medium">{selectedEducator.tier}</div>
                  <div className="text-xs mt-1">
                    {selectedEducator.tier === 'Educator Basic' && 'Basic teaching tools and resources'}
                    {selectedEducator.tier === 'Educator Pro' && 'Advanced teaching tools and analytics'}
                    {selectedEducator.tier === 'Educator Elite' && 'Premium features with dedicated support'}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Change Subscription To</label>
                <div className="space-y-3">
                  {subscriptionTiers.map((tier) => (
                    <label 
                      key={tier.value} 
                      className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                        selectedEducator.tier === tier.value 
                          ? 'bg-green-50 border-green-300' 
                          : 'bg-white border-slate-200 hover:border-green-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="tier"
                        value={tier.value}
                        checked={selectedEducator.tier === tier.value}
                        onChange={() => setSelectedEducator({...selectedEducator, tier: tier.value})}
                        className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                      />
                      <div className="ml-3 flex-1">
                        <div className="font-medium text-slate-800">{tier.label}</div>
                        <div className="text-sm text-slate-500">{tier.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowEditSubscriptionModal(false)}
                  className="flex-1 px-6 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl font-semibold hover:from-green-500 hover:to-green-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Save className="h-5 w-5" />
                  <span>Update Subscription</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducatorManagement;