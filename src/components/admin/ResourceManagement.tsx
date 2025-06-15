import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Globe, Lock, Users, Download, Upload, Filter, Image, Link, Save, X } from 'lucide-react';

const ResourceManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterAccess, setFilterAccess] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState<any>(null);

  const [uploadForm, setUploadForm] = useState({
    name: '',
    link: '',
    coverImage: '',
    category: '',
    description: '',
    accessLevel: 'Free'
  });

  const resources = [
    {
      id: 1,
      title: 'Advanced Mathematics Course',
      category: 'Mathematics',
      type: 'External Link',
      accessLevel: 'Premium',
      downloads: 1247,
      views: 5632,
      rating: 4.8,
      lastUpdated: '2024-01-15',
      status: 'active',
      creator: 'Dr. Sarah Wilson',
      description: 'Comprehensive advanced mathematics course covering calculus and linear algebra',
      icon: '🔢',
      link: 'https://example.com/math-course',
      allowedTiers: ['Student Pro', 'Tutor Plus', 'Educator Pro', 'Educator Elite']
    },
    {
      id: 2,
      title: 'Introduction to Python Programming',
      category: 'Computer Science',
      type: 'External Link',
      accessLevel: 'Free',
      downloads: 3421,
      views: 12456,
      rating: 4.9,
      lastUpdated: '2024-01-18',
      status: 'active',
      creator: 'Prof. Michael Chen',
      description: 'Beginner-friendly Python programming tutorial with hands-on exercises',
      icon: '🐍',
      link: 'https://example.com/python-course',
      allowedTiers: ['Free Tier', 'Student Pro', 'Tutor Plus', 'Educator Basic', 'Educator Pro', 'Educator Elite']
    },
    {
      id: 3,
      title: 'Biology Lab Simulations',
      category: 'Science',
      type: 'External Link',
      accessLevel: 'Premium',
      downloads: 892,
      views: 2341,
      rating: 4.7,
      lastUpdated: '2024-01-10',
      status: 'active',
      creator: 'Dr. Emily Rodriguez',
      description: 'Virtual biology lab experiments and simulations for remote learning',
      icon: '🔬',
      link: 'https://example.com/biology-lab',
      allowedTiers: ['Tutor Plus', 'Educator Pro', 'Educator Elite']
    },
    {
      id: 4,
      title: 'World History Timeline',
      category: 'History',
      type: 'External Link',
      accessLevel: 'Free',
      downloads: 2156,
      views: 8934,
      rating: 4.6,
      lastUpdated: '2024-01-05',
      status: 'inactive',
      creator: 'Prof. James Thompson',
      description: 'Interactive timeline covering major world historical events',
      icon: '🏛️',
      link: 'https://example.com/history-timeline',
      allowedTiers: ['Free Tier', 'Student Pro', 'Tutor Plus', 'Educator Basic', 'Educator Pro', 'Educator Elite']
    },
    {
      id: 5,
      title: 'Creative Writing Workshop',
      category: 'Language Arts',
      type: 'External Link',
      accessLevel: 'Premium',
      downloads: 567,
      views: 1823,
      rating: 4.5,
      lastUpdated: '2024-01-12',
      status: 'active',
      creator: 'Ms. Lisa Parker',
      description: 'Structured creative writing exercises and prompts for students',
      icon: '✍️',
      link: 'https://example.com/writing-workshop',
      allowedTiers: ['Student Pro', 'Tutor Plus']
    }
  ];

  const allTiers = [
    'Free Tier',
    'Student Pro', 
    'Tutor Plus',
    'Educator Basic',
    'Educator Pro', 
    'Educator Elite'
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.creator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || resource.category === filterCategory;
    const matchesAccess = filterAccess === 'all' || resource.accessLevel === filterAccess;
    
    return matchesSearch && matchesCategory && matchesAccess;
  });

  const getAccessColor = (access: string) => {
    switch (access) {
      case 'Free': return 'bg-green-100 text-green-800';
      case 'Premium': return 'bg-purple-100 text-purple-800';
      case 'Restricted': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const categories = ['Mathematics', 'Computer Science', 'Science', 'History', 'Language Arts', 'Art', 'Music'];

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New resource:', uploadForm);
    // Handle resource creation
    setShowUploadModal(false);
    setUploadForm({ 
      name: '', 
      link: '', 
      coverImage: '', 
      category: '', 
      description: '',
      accessLevel: 'Free'
    });
  };

  const handleAccessManagement = (resource: any) => {
    setSelectedResource({...resource});
    setShowAccessModal(true);
  };

  const handleSaveAccess = () => {
    console.log('Saving access for resource:', selectedResource);
    setShowAccessModal(false);
    setSelectedResource(null);
  };

  const handleTierToggle = (tier: string) => {
    if (!selectedResource) return;
    
    setSelectedResource(prev => {
      const updatedTiers = prev.allowedTiers.includes(tier)
        ? prev.allowedTiers.filter((t: string) => t !== tier)
        : [...prev.allowedTiers, tier];
      
      return {
        ...prev,
        allowedTiers: updatedTiers,
        accessLevel: updatedTiers.includes('Free Tier') ? 'Free' : 'Premium'
      };
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Resource Management</h1>
          <p className="text-slate-600">Manage educational resources, access levels, and content</p>
        </div>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="bg-gradient-to-r from-purple-400 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-500 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Resource</span>
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
                placeholder="Search resources by title, category, or creator..."
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="md:w-48">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Access Filter */}
          <div className="md:w-48">
            <select
              value={filterAccess}
              onChange={(e) => setFilterAccess(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Access Levels</option>
              <option value="Free">Free</option>
              <option value="Premium">Premium</option>
              <option value="Restricted">Restricted</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            {/* Resource Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-3 rounded-xl">
                  <span className="text-2xl">{resource.icon}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 line-clamp-2">{resource.title}</h3>
                  <p className="text-sm text-slate-500">{resource.type}</p>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAccessColor(resource.accessLevel)}`}>
                  {resource.accessLevel}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(resource.status)}`}>
                  {resource.status}
                </span>
              </div>
            </div>

            {/* Resource Info */}
            <div className="space-y-3 mb-4">
              <p className="text-sm text-slate-600 line-clamp-2">{resource.description}</p>
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>By {resource.creator}</span>
                <span>{resource.category}</span>
              </div>
              <div className="text-sm text-slate-500 truncate">
                <span className="font-medium">Link:</span> {resource.link}
              </div>
            </div>

            {/* Tier Access Info */}
            <div className="mb-4">
              <div className="text-sm font-medium text-slate-700 mb-2">Accessible to:</div>
              <div className="flex flex-wrap gap-1">
                {resource.allowedTiers.slice(0, 3).map((tier, index) => (
                  <span key={index} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">
                    {tier}
                  </span>
                ))}
                {resource.allowedTiers.length > 3 && (
                  <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">
                    +{resource.allowedTiers.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-sm text-slate-600">
                  <Eye className="h-4 w-4" />
                  <span>{resource.views}</span>
                </div>
                <div className="text-xs text-slate-500">Views</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-sm text-slate-600">
                  <Download className="h-4 w-4" />
                  <span>{resource.downloads}</span>
                </div>
                <div className="text-xs text-slate-500">Downloads</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-sm text-slate-600">
                  <span>⭐</span>
                  <span>{resource.rating}</span>
                </div>
                <div className="text-xs text-slate-500">Rating</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <div className="flex items-center space-x-2">
                <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" title="View">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors" title="Edit">
                  <Edit className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleAccessManagement(resource)}
                  className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors" 
                  title="Manage Tier Access"
                >
                  <Users className="h-4 w-4" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors" title="Delete">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="text-xs text-slate-500">
                Updated {resource.lastUpdated}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-6 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-800">{filteredResources.length}</div>
              <div className="text-purple-600 text-sm">Total Resources</div>
            </div>
            <div className="text-3xl">📚</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-800">
                {filteredResources.filter(r => r.accessLevel === 'Free').length}
              </div>
              <div className="text-green-600 text-sm">Free Resources</div>
            </div>
            <div className="text-3xl">🌟</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-800">
                {filteredResources.reduce((acc, r) => acc + r.downloads, 0).toLocaleString()}
              </div>
              <div className="text-blue-600 text-sm">Total Downloads</div>
            </div>
            <div className="text-3xl">⬇️</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-6 rounded-xl border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-yellow-800">
                {(filteredResources.reduce((acc, r) => acc + r.rating, 0) / filteredResources.length).toFixed(1)}
              </div>
              <div className="text-yellow-600 text-sm">Average Rating</div>
            </div>
            <div className="text-3xl">⭐</div>
          </div>
        </div>
      </div>

      {/* Add Resource Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                  <Plus className="h-6 w-6 text-purple-600" />
                  <span>Add New Resource</span>
                </h3>
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleUploadSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Resource Name</label>
                <input
                  type="text"
                  value={uploadForm.name}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter resource name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Resource Link</label>
                <div className="relative">
                  <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="url"
                    value={uploadForm.link}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, link: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://example.com/resource"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Cover Image URL (Optional)</label>
                <div className="relative">
                  <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="url"
                    value={uploadForm.coverImage}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, coverImage: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                  <select
                    value={uploadForm.category}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Access Level</label>
                  <select
                    value={uploadForm.accessLevel}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, accessLevel: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="Free">Free</option>
                    <option value="Premium">Premium</option>
                    <option value="Restricted">Restricted</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Describe the resource and its educational value..."
                  required
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-6 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-xl font-semibold hover:from-purple-500 hover:to-purple-700 transition-all duration-200"
                >
                  Add Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tier Access Management Modal */}
      {showAccessModal && selectedResource && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                  <Users className="h-6 w-6 text-purple-600" />
                  <span>Manage Tier Access</span>
                </h3>
                <button 
                  onClick={() => setShowAccessModal(false)}
                  className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h4 className="font-semibold text-slate-800 mb-2">{selectedResource.title}</h4>
                <p className="text-sm text-slate-600">Select which subscription tiers can access this resource</p>
              </div>

              <div className="space-y-3">
                {allTiers.map((tier) => (
                  <label key={tier} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedResource.allowedTiers.includes(tier)}
                      onChange={() => handleTierToggle(tier)}
                      className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-slate-800">{tier}</div>
                      <div className="text-sm text-slate-500">
                        {tier === 'Free Tier' && 'No subscription required'}
                        {tier.includes('Student') && 'Student subscription tier'}
                        {tier.includes('Educator') && 'Educator subscription tier'}
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  onClick={() => setShowAccessModal(false)}
                  className="flex-1 px-6 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAccess}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-xl font-semibold hover:from-purple-500 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Save className="h-5 w-5" />
                  <span>Save Access</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceManagement;