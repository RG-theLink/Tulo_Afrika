import React, { useState } from 'react';
import { Bell, Plus, Send, X } from 'lucide-react';

const AnnouncementsWidget = () => {
  const [showCreateAnnouncement, setShowCreateAnnouncement] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    message: '',
    targetGroup: '',
    priority: 'normal'
  });

  const announcements = [
    {
      id: 1,
      title: 'Math Quiz Tomorrow',
      message: 'Reminder: We will have a quiz on quadratic equations tomorrow. Please review chapters 5-7.',
      date: '2 hours ago',
      group: 'Mathematics Grade 10',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Physics Lab Report Due',
      message: 'Please submit your lab reports on wave motion by Friday at 5 PM.',
      date: '1 day ago',
      group: 'Physics Grade 11',
      priority: 'normal'
    },
    {
      id: 3,
      title: 'Office Hours Changed',
      message: 'My office hours will be moved to 3-5 PM on Wednesdays starting next week.',
      date: '2 days ago',
      group: 'All Groups',
      priority: 'low'
    }
  ];

  const groups = [
    { id: 'math10', name: 'Mathematics Grade 10' },
    { id: 'physics11', name: 'Physics Grade 11' },
    { id: 'chemlab', name: 'Chemistry Lab' },
    { id: 'all', name: 'All Groups' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating announcement:', newAnnouncement);
    setShowCreateAnnouncement(false);
    setNewAnnouncement({ title: '', message: '', targetGroup: '', priority: 'normal' });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
            <Bell className="h-5 w-5 text-teal-600" />
            <span>Announcements</span>
          </h2>
          <button
            onClick={() => setShowCreateAnnouncement(true)}
            className="bg-teal-100 text-teal-800 hover:bg-teal-200 transition-colors px-3 py-1 rounded-lg text-sm font-medium flex items-center space-x-1"
          >
            <Plus className="h-4 w-4" />
            <span>Create</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-slate-50 p-4 rounded-xl hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <span className="text-2xl">📢</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-slate-800">
                      {announcement.title}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(announcement.priority)}`}>
                      {announcement.priority}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-2 leading-relaxed">
                    {announcement.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      {announcement.date}
                    </span>
                    <span className="text-xs text-teal-600 font-medium">
                      {announcement.group}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create Announcement Modal */}
        {showCreateAnnouncement && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                    <Bell className="h-6 w-6 text-teal-600" />
                    <span>Create Announcement</span>
                  </h3>
                  <button 
                    onClick={() => setShowCreateAnnouncement(false)}
                    className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleCreateAnnouncement} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Announcement Title</label>
                  <input
                    type="text"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter announcement title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                  <textarea
                    value={newAnnouncement.message}
                    onChange={(e) => setNewAnnouncement(prev => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your announcement message"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Target Group</label>
                    <select
                      value={newAnnouncement.targetGroup}
                      onChange={(e) => setNewAnnouncement(prev => ({ ...prev, targetGroup: e.target.value }))}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select target group</option>
                      {groups.map((group) => (
                        <option key={group.id} value={group.id}>{group.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
                    <select
                      value={newAnnouncement.priority}
                      onChange={(e) => setNewAnnouncement(prev => ({ ...prev, priority: e.target.value }))}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateAnnouncement(false)}
                    className="flex-1 px-6 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-xl font-semibold hover:from-teal-500 hover:to-blue-600 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Send className="h-5 w-5" />
                    <span>Send Announcement</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View All Button */}
        <div className="mt-4 text-center">
          <button className="text-sm text-slate-600 hover:text-teal-600 font-medium transition-colors duration-200">
            View All Announcements
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsWidget;