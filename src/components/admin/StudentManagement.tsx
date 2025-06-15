import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye, Mail, Phone, Calendar, CreditCard, CheckCircle, XCircle, UserPlus, X, Save } from 'lucide-react';

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSubscription, setFilterSubscription] = useState('all');
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showEditSubscriptionModal, setShowEditSubscriptionModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    phone: '',
    subscription: 'Free Tier',
    status: 'active',
    gradeLevel: '',
    parentEmail: '',
    password: ''
  });

  const students = [
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex.johnson@email.com',
      phone: '+1 (555) 123-4567',
      subscription: 'Student Pro',
      status: 'active',
      joinDate: '2024-01-15',
      lastActive: '2024-01-20',
      progress: 75,
      coursesCompleted: 12,
      avatar: '🎓'
    },
    {
      id: 2,
      name: 'Emma Davis',
      email: 'emma.davis@email.com',
      phone: '+1 (555) 234-5678',
      subscription: 'Free Tier',
      status: 'active',
      joinDate: '2024-01-10',
      lastActive: '2024-01-19',
      progress: 45,
      coursesCompleted: 6,
      avatar: '👩‍🎓'
    },
    {
      id: 3,
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      phone: '+1 (555) 345-6789',
      subscription: 'Tutor Plus',
      status: 'inactive',
      joinDate: '2023-12-20',
      lastActive: '2024-01-10',
      progress: 90,
      coursesCompleted: 25,
      avatar: '👨‍🎓'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      phone: '+1 (555) 456-7890',
      subscription: 'Student Pro',
      status: 'active',
      joinDate: '2024-01-05',
      lastActive: '2024-01-20',
      progress: 60,
      coursesCompleted: 8,
      avatar: '👩‍🎓'
    }
  ];

  const subscriptionTiers = [
    { value: 'Free Tier', label: 'Free Tier', description: 'Basic access to learning resources' },
    { value: 'Student Pro', label: 'Student Pro', description: 'Full access to all learning resources and AI assistance' },
    { value: 'Tutor Plus', label: 'Tutor Plus', description: 'Premium features with personalized tutoring' }
  ];

  const gradeLevels = [
    'Elementary (K-5)',
    'Middle School (6-8)',
    'High School (9-12)',
    'College/University',
    'Adult Learner'
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    const matchesSubscription = filterSubscription === 'all' || student.subscription === filterSubscription;
    
    return matchesSearch && matchesStatus && matchesSubscription;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'suspended': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case 'Free Tier': return 'bg-slate-100 text-slate-800';
      case 'Student Pro': return 'bg-blue-100 text-blue-800';
      case 'Tutor Plus': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding new student:', newStudent);
    // In a real implementation, this would add the student to the database
    setShowAddStudentModal(false);
    setNewStudent({
      name: '',
      email: '',
      phone: '',
      subscription: 'Free Tier',
      status: 'active',
      gradeLevel: '',
      parentEmail: '',
      password: ''
    });
  };

  const handleEditSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating subscription for student:', selectedStudent);
    // In a real implementation, this would update the student's subscription in the database
    setShowEditSubscriptionModal(false);
    setSelectedStudent(null);
  };

  const openEditSubscriptionModal = (student: any) => {
    setSelectedStudent({...student});
    setShowEditSubscriptionModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Student Management</h1>
          <p className="text-slate-600">Manage student accounts, subscriptions, and access</p>
        </div>
        <button 
          onClick={() => setShowAddStudentModal(true)}
          className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
        >
          <UserPlus className="h-5 w-5" />
          <span>Add Student</span>
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
                placeholder="Search students by name or email..."
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="md:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          {/* Subscription Filter */}
          <div className="md:w-48">
            <select
              value={filterSubscription}
              onChange={(e) => setFilterSubscription(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Subscriptions</option>
              <option value="Free Tier">Free Tier</option>
              <option value="Student Pro">Student Pro</option>
              <option value="Tutor Plus">Tutor Plus</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Student</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Contact</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Subscription</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Progress</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Last Active</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-2 rounded-lg">
                        <span className="text-lg">{student.avatar}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{student.name}</div>
                        <div className="text-sm text-slate-500">ID: {student.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm text-slate-600">
                        <Mail className="h-4 w-4" />
                        <span>{student.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-slate-600">
                        <Phone className="h-4 w-4" />
                        <span>{student.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSubscriptionColor(student.subscription)}`}>
                      {student.subscription}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(student.status)}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{student.progress}%</span>
                        <span>{student.coursesCompleted} courses</span>
                      </div>
                      <div className="bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-full h-2 transition-all duration-500"
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Calendar className="h-4 w-4" />
                      <span>{student.lastActive}</span>
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
                        onClick={() => openEditSubscriptionModal(student)}
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
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-800">{filteredStudents.length}</div>
              <div className="text-blue-600 text-sm">Total Students</div>
            </div>
            <div className="text-3xl">👥</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-800">
                {filteredStudents.filter(s => s.status === 'active').length}
              </div>
              <div className="text-green-600 text-sm">Active Students</div>
            </div>
            <div className="text-3xl">✅</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-6 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-800">
                {filteredStudents.filter(s => s.subscription !== 'Free Tier').length}
              </div>
              <div className="text-purple-600 text-sm">Paid Subscriptions</div>
            </div>
            <div className="text-3xl">💎</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-100 to-orange-200 p-6 rounded-xl border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-800">
                {Math.round(filteredStudents.reduce((acc, s) => acc + s.progress, 0) / filteredStudents.length)}%
              </div>
              <div className="text-orange-600 text-sm">Avg Progress</div>
            </div>
            <div className="text-3xl">📈</div>
          </div>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddStudentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                  <UserPlus className="h-6 w-6 text-blue-600" />
                  <span>Add New Student</span>
                </h3>
                <button 
                  onClick={() => setShowAddStudentModal(false)}
                  className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleAddStudent} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter student's full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="student@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Grade Level</label>
                  <select
                    value={newStudent.gradeLevel}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, gradeLevel: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select grade level</option>
                    {gradeLevels.map((level, index) => (
                      <option key={index} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Parent/Guardian Email (if under 18)</label>
                <input
                  type="email"
                  value={newStudent.parentEmail}
                  onChange={(e) => setNewStudent(prev => ({ ...prev, parentEmail: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="parent@example.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Temporary Password</label>
                  <input
                    type="text"
                    value={newStudent.password}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Temporary password"
                    required
                  />
                  <p className="text-xs text-slate-500 mt-1">Student will be prompted to change on first login</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Subscription Tier</label>
                  <select
                    value={newStudent.subscription}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, subscription: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      checked={newStudent.status === 'active'}
                      onChange={() => setNewStudent(prev => ({ ...prev, status: 'active' }))}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-slate-700">Active</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={newStudent.status === 'inactive'}
                      onChange={() => setNewStudent(prev => ({ ...prev, status: 'inactive' }))}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-slate-700">Inactive</span>
                  </label>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="flex-1 px-6 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-500 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Add Student</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Subscription Modal */}
      {showEditSubscriptionModal && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                  <span>Manage Subscription</span>
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
                <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-2 rounded-lg">
                  <span className="text-lg">{selectedStudent.avatar}</span>
                </div>
                <div>
                  <div className="font-semibold text-slate-800">{selectedStudent.name}</div>
                  <div className="text-sm text-slate-500">{selectedStudent.email}</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-4">Current Subscription</label>
                <div className={`px-4 py-3 rounded-xl ${getSubscriptionColor(selectedStudent.subscription)}`}>
                  <div className="font-medium">{selectedStudent.subscription}</div>
                  <div className="text-xs mt-1">
                    {selectedStudent.subscription === 'Free Tier' && 'Limited access to resources'}
                    {selectedStudent.subscription === 'Student Pro' && 'Full access to resources and AI assistance'}
                    {selectedStudent.subscription === 'Tutor Plus' && 'Premium features with personalized tutoring'}
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
                        selectedStudent.subscription === tier.value 
                          ? 'bg-blue-50 border-blue-300' 
                          : 'bg-white border-slate-200 hover:border-blue-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="subscription"
                        value={tier.value}
                        checked={selectedStudent.subscription === tier.value}
                        onChange={() => setSelectedStudent({...selectedStudent, subscription: tier.value})}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
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
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-500 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2"
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

export default StudentManagement;