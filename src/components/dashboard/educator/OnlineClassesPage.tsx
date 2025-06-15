import React, { useState } from 'react';
import { Video, Users, Calendar, Clock, Plus, Edit, Trash2, Link, Settings, X, Save, ExternalLink, MessageSquare, Mic, MicOff, Camera, CameraOff, Share2 } from 'lucide-react';

const OnlineClassesPage = () => {
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'recurring'>('upcoming');
  const [newClass, setNewClass] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    targetGroup: '',
    isRecurring: false,
    recurringPattern: 'weekly',
    meetingLink: '',
    sendReminder: true
  });

  const upcomingClasses = [
    {
      id: 1,
      title: 'Mathematics Grade 10 - Quadratic Equations',
      description: 'Live session covering quadratic equations and their applications',
      date: '2024-02-05',
      startTime: '14:00',
      endTime: '15:30',
      group: 'Mathematics Grade 10',
      studentCount: 24,
      confirmedCount: 20,
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      status: 'scheduled',
      isRecurring: true,
      recurringPattern: 'Weekly on Mondays'
    },
    {
      id: 2,
      title: 'Physics Grade 11 - Wave Motion',
      description: 'Interactive session on wave properties and behaviors',
      date: '2024-02-06',
      startTime: '10:00',
      endTime: '11:30',
      group: 'Physics Grade 11',
      studentCount: 18,
      confirmedCount: 15,
      meetingLink: 'https://meet.google.com/klm-nopq-rst',
      status: 'scheduled',
      isRecurring: false
    },
    {
      id: 3,
      title: 'Chemistry Lab - Pre-Lab Discussion',
      description: 'Preparation for the upcoming chemical reactions lab',
      date: '2024-02-08',
      startTime: '13:00',
      endTime: '14:00',
      group: 'Chemistry Lab',
      studentCount: 12,
      confirmedCount: 10,
      meetingLink: 'https://meet.google.com/uvw-xyz-123',
      status: 'scheduled',
      isRecurring: false
    }
  ];

  const pastClasses = [
    {
      id: 4,
      title: 'Mathematics Grade 10 - Linear Equations',
      description: 'Review of linear equations and systems',
      date: '2024-01-29',
      startTime: '14:00',
      endTime: '15:30',
      group: 'Mathematics Grade 10',
      studentCount: 24,
      attendedCount: 22,
      recordingLink: 'https://drive.google.com/file/d/123456',
      status: 'completed',
      feedback: {
        rating: 4.8,
        comments: 12
      }
    },
    {
      id: 5,
      title: 'Physics Grade 11 - Forces and Motion',
      description: 'Newton\'s laws and applications',
      date: '2024-01-30',
      startTime: '10:00',
      endTime: '11:30',
      group: 'Physics Grade 11',
      studentCount: 18,
      attendedCount: 16,
      recordingLink: 'https://drive.google.com/file/d/789012',
      status: 'completed',
      feedback: {
        rating: 4.6,
        comments: 8
      }
    }
  ];

  const recurringClasses = [
    {
      id: 6,
      title: 'Mathematics Grade 10 - Weekly Class',
      description: 'Regular mathematics class following the curriculum',
      pattern: 'Every Monday and Wednesday',
      time: '14:00 - 15:30',
      group: 'Mathematics Grade 10',
      studentCount: 24,
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      nextSession: '2024-02-05'
    },
    {
      id: 7,
      title: 'Physics Grade 11 - Weekly Class',
      description: 'Regular physics class following the curriculum',
      pattern: 'Every Tuesday and Thursday',
      time: '10:00 - 11:30',
      group: 'Physics Grade 11',
      studentCount: 18,
      meetingLink: 'https://meet.google.com/klm-nopq-rst',
      nextSession: '2024-02-06'
    },
    {
      id: 8,
      title: 'Office Hours',
      description: 'Weekly office hours for student questions',
      pattern: 'Every Friday',
      time: '13:00 - 15:00',
      group: 'All Groups',
      studentCount: 54,
      meetingLink: 'https://meet.google.com/uvw-xyz-123',
      nextSession: '2024-02-09'
    }
  ];

  const groups = [
    { id: 'math10', name: 'Mathematics Grade 10', count: 24 },
    { id: 'physics11', name: 'Physics Grade 11', count: 18 },
    { id: 'chemlab', name: 'Chemistry Lab', count: 12 },
    { id: 'all', name: 'All Groups', count: 54 }
  ];

  const recurringPatterns = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating online class:', newClass);
    setShowCreateClass(false);
    setNewClass({
      title: '',
      description: '',
      date: '',
      startTime: '',
      endTime: '',
      targetGroup: '',
      isRecurring: false,
      recurringPattern: 'weekly',
      meetingLink: '',
      sendReminder: true
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'live': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center space-x-3">
            <Video className="h-8 w-8 text-purple-600" />
            <span>Online Classes</span>
          </h1>
          <p className="text-slate-600 mt-2">Schedule and manage virtual classes and sessions with your students</p>
        </div>
        <button
          onClick={() => setShowCreateClass(true)}
          className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-500 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Schedule Class</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-6 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-800">{upcomingClasses.length}</div>
              <div className="text-purple-600 text-sm">Upcoming Classes</div>
            </div>
            <Calendar className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-800">{recurringClasses.length}</div>
              <div className="text-blue-600 text-sm">Recurring Sessions</div>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-800">{pastClasses.length}</div>
              <div className="text-green-600 text-sm">Completed Classes</div>
            </div>
            <Video className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-pink-100 to-pink-200 p-6 rounded-xl border border-pink-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-pink-800">
                {upcomingClasses.reduce((acc, c) => acc + c.studentCount, 0)}
              </div>
              <div className="text-pink-600 text-sm">Total Students</div>
            </div>
            <Users className="h-8 w-8 text-pink-600" />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-2 shadow-lg">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'upcoming'
                  ? 'bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:text-purple-600 hover:bg-slate-50'
              }`}
            >
              <Calendar className="h-5 w-5" />
              <span>Upcoming</span>
            </button>
            <button
              onClick={() => setActiveTab('recurring')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'recurring'
                  ? 'bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:text-purple-600 hover:bg-slate-50'
              }`}
            >
              <Clock className="h-5 w-5" />
              <span>Recurring</span>
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'past'
                  ? 'bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:text-purple-600 hover:bg-slate-50'
              }`}
            >
              <Video className="h-5 w-5" />
              <span>Past Classes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Classes List */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
            {activeTab === 'upcoming' && (
              <>
                <Calendar className="h-6 w-6 text-purple-600" />
                <span>Upcoming Online Classes</span>
              </>
            )}
            {activeTab === 'recurring' && (
              <>
                <Clock className="h-6 w-6 text-blue-600" />
                <span>Recurring Sessions</span>
              </>
            )}
            {activeTab === 'past' && (
              <>
                <Video className="h-6 w-6 text-green-600" />
                <span>Past Classes</span>
              </>
            )}
          </h2>
        </div>

        <div className="p-6">
          {activeTab === 'upcoming' && (
            <div className="space-y-6">
              {upcomingClasses.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-gradient-to-r from-slate-100 to-slate-200 p-6 rounded-xl inline-block mb-4">
                    <Calendar className="h-12 w-12 text-slate-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-600 mb-2">No upcoming classes</h4>
                  <p className="text-slate-500">Schedule a new online class to get started.</p>
                </div>
              ) : (
                upcomingClasses.map((onlineClass) => (
                  <div key={onlineClass.id} className="bg-slate-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-4 text-white">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg">{onlineClass.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white/20`}>
                          {onlineClass.isRecurring ? 'Recurring' : 'One-time'}
                        </span>
                      </div>
                      <p className="text-white/80 text-sm mt-1">{onlineClass.description}</p>
                    </div>
                    
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-purple-600" />
                          <div>
                            <div className="text-sm font-medium text-slate-700">Date</div>
                            <div className="text-slate-800">{formatDate(onlineClass.date)}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="h-5 w-5 text-purple-600" />
                          <div>
                            <div className="text-sm font-medium text-slate-700">Time</div>
                            <div className="text-slate-800">{onlineClass.startTime} - {onlineClass.endTime}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Users className="h-5 w-5 text-purple-600" />
                          <div>
                            <div className="text-sm font-medium text-slate-700">Participants</div>
                            <div className="text-slate-800">
                              {onlineClass.confirmedCount} confirmed / {onlineClass.studentCount} invited
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Link className="h-5 w-5 text-purple-600" />
                          <div>
                            <div className="text-sm font-medium text-slate-700">Meeting Link</div>
                            <a 
                              href={onlineClass.meetingLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              Join Meeting
                            </a>
                          </div>
                        </div>
                      </div>
                      
                      {onlineClass.isRecurring && (
                        <div className="bg-purple-50 p-3 rounded-lg mb-4">
                          <div className="flex items-center space-x-2 text-sm text-purple-700">
                            <Clock className="h-4 w-4 text-purple-600" />
                            <span>Recurring: {onlineClass.recurringPattern}</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex space-x-3">
                        <button className="flex-1 bg-gradient-to-r from-purple-400 to-pink-500 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-500 hover:to-pink-600 transition-all duration-200 flex items-center justify-center space-x-2">
                          <Video className="h-4 w-4" />
                          <span>Start Class</span>
                        </button>
                        <button className="bg-slate-100 text-slate-600 py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="bg-slate-100 text-slate-600 py-2 px-4 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors flex items-center justify-center">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'recurring' && (
            <div className="space-y-6">
              {recurringClasses.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-gradient-to-r from-slate-100 to-slate-200 p-6 rounded-xl inline-block mb-4">
                    <Clock className="h-12 w-12 text-slate-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-600 mb-2">No recurring classes</h4>
                  <p className="text-slate-500">Set up recurring sessions for regular classes.</p>
                </div>
              ) : (
                recurringClasses.map((recurringClass) => (
                  <div key={recurringClass.id} className="bg-slate-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="bg-gradient-to-r from-blue-400 to-indigo-500 p-4 text-white">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg">{recurringClass.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white/20`}>
                          Recurring
                        </span>
                      </div>
                      <p className="text-white/80 text-sm mt-1">{recurringClass.description}</p>
                    </div>
                    
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-3">
                          <Clock className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="text-sm font-medium text-slate-700">Pattern</div>
                            <div className="text-slate-800">{recurringClass.pattern}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="text-sm font-medium text-slate-700">Next Session</div>
                            <div className="text-slate-800">{formatDate(recurringClass.nextSession)}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="text-sm font-medium text-slate-700">Time</div>
                            <div className="text-slate-800">{recurringClass.time}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Users className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="text-sm font-medium text-slate-700">Group</div>
                            <div className="text-slate-800">
                              {recurringClass.group} ({recurringClass.studentCount} students)
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <a 
                          href={recurringClass.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-500 hover:to-indigo-600 transition-all duration-200 flex items-center justify-center space-x-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>Join Meeting</span>
                        </a>
                        <button className="bg-slate-100 text-slate-600 py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="bg-slate-100 text-slate-600 py-2 px-4 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors flex items-center justify-center">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'past' && (
            <div className="space-y-6">
              {pastClasses.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-gradient-to-r from-slate-100 to-slate-200 p-6 rounded-xl inline-block mb-4">
                    <Video className="h-12 w-12 text-slate-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-600 mb-2">No past classes</h4>
                  <p className="text-slate-500">Your completed classes will appear here.</p>
                </div>
              ) : (
                pastClasses.map((pastClass) => (
                  <div key={pastClass.id} className="bg-slate-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="bg-gradient-to-r from-green-400 to-teal-500 p-4 text-white">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg">{pastClass.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(pastClass.status)}`}>
                          {pastClass.status}
                        </span>
                      </div>
                      <p className="text-white/80 text-sm mt-1">{pastClass.description}</p>
                    </div>
                    
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-green-600" />
                          <div>
                            <div className="text-sm font-medium text-slate-700">Date</div>
                            <div className="text-slate-800">{formatDate(pastClass.date)}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="h-5 w-5 text-green-600" />
                          <div>
                            <div className="text-sm font-medium text-slate-700">Time</div>
                            <div className="text-slate-800">{pastClass.startTime} - {pastClass.endTime}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Users className="h-5 w-5 text-green-600" />
                          <div>
                            <div className="text-sm font-medium text-slate-700">Attendance</div>
                            <div className="text-slate-800">
                              {pastClass.attendedCount} attended / {pastClass.studentCount} invited
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MessageSquare className="h-5 w-5 text-green-600" />
                          <div>
                            <div className="text-sm font-medium text-slate-700">Feedback</div>
                            <div className="text-slate-800">
                              ⭐ {pastClass.feedback.rating} ({pastClass.feedback.comments} comments)
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <a 
                          href={pastClass.recordingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-r from-green-400 to-teal-500 text-white py-2 px-4 rounded-lg font-medium hover:from-green-500 hover:to-teal-600 transition-all duration-200 flex items-center justify-center space-x-2"
                        >
                          <Video className="h-4 w-4" />
                          <span>View Recording</span>
                        </a>
                        <button className="bg-slate-100 text-slate-600 py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center">
                          <MessageSquare className="h-4 w-4" />
                        </button>
                        <button className="bg-slate-100 text-slate-600 py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create Online Class Modal */}
      {showCreateClass && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                  <Video className="h-6 w-6 text-purple-600" />
                  <span>Schedule Online Class</span>
                </h3>
                <button 
                  onClick={() => setShowCreateClass(false)}
                  className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleCreateClass} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Class Title</label>
                <input
                  type="text"
                  value={newClass.title}
                  onChange={(e) => setNewClass(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Mathematics Grade 10 - Quadratic Equations"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  value={newClass.description}
                  onChange={(e) => setNewClass(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Describe what will be covered in this class..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={newClass.date}
                    onChange={(e) => setNewClass(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Target Group</label>
                  <select
                    value={newClass.targetGroup}
                    onChange={(e) => setNewClass(prev => ({ ...prev, targetGroup: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select group</option>
                    {groups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name} ({group.count} students)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Start Time</label>
                  <input
                    type="time"
                    value={newClass.startTime}
                    onChange={(e) => setNewClass(prev => ({ ...prev, startTime: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">End Time</label>
                  <input
                    type="time"
                    value={newClass.endTime}
                    onChange={(e) => setNewClass(prev => ({ ...prev, endTime: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Meeting Link (Optional)</label>
                <div className="relative">
                  <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="url"
                    value={newClass.meetingLink}
                    onChange={(e) => setNewClass(prev => ({ ...prev, meetingLink: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., https://meet.google.com/abc-defg-hij"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Leave empty to generate a meeting link automatically
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isRecurring"
                  checked={newClass.isRecurring}
                  onChange={(e) => setNewClass(prev => ({ ...prev, isRecurring: e.target.checked }))}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <label htmlFor="isRecurring" className="text-sm font-medium text-slate-700">
                  This is a recurring class
                </label>
              </div>

              {newClass.isRecurring && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Recurring Pattern</label>
                  <select
                    value={newClass.recurringPattern}
                    onChange={(e) => setNewClass(prev => ({ ...prev, recurringPattern: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {recurringPatterns.map((pattern) => (
                      <option key={pattern.value} value={pattern.value}>{pattern.label}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="sendReminder"
                  checked={newClass.sendReminder}
                  onChange={(e) => setNewClass(prev => ({ ...prev, sendReminder: e.target.checked }))}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <label htmlFor="sendReminder" className="text-sm font-medium text-slate-700">
                  Send reminders to students (24h and 1h before class)
                </label>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowCreateClass(false)}
                  className="flex-1 px-6 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-500 hover:to-pink-600 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Save className="h-5 w-5" />
                  <span>Schedule Class</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Virtual Classroom Preview */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl border border-purple-200 p-8 text-center">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">Virtual Classroom Features</h2>
        <p className="text-purple-700 mb-6 max-w-2xl mx-auto">
          Our integrated virtual classroom provides all the tools you need for effective online teaching.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white/60 p-6 rounded-xl shadow-md">
            <div className="text-center">
              <Video className="h-8 w-8 mx-auto mb-3 text-purple-600" />
              <h3 className="font-semibold text-slate-800 mb-2">HD Video</h3>
              <p className="text-sm text-slate-600">Crystal clear video for up to 50 participants</p>
            </div>
          </div>
          <div className="bg-white/60 p-6 rounded-xl shadow-md">
            <div className="text-center">
              <Share2 className="h-8 w-8 mx-auto mb-3 text-purple-600" />
              <h3 className="font-semibold text-slate-800 mb-2">Screen Sharing</h3>
              <p className="text-sm text-slate-600">Share presentations, documents, and applications</p>
            </div>
          </div>
          <div className="bg-white/60 p-6 rounded-xl shadow-md">
            <div className="text-center">
              <MessageSquare className="h-8 w-8 mx-auto mb-3 text-purple-600" />
              <h3 className="font-semibold text-slate-800 mb-2">Chat & Q&A</h3>
              <p className="text-sm text-slate-600">Interactive discussions and question management</p>
            </div>
          </div>
          <div className="bg-white/60 p-6 rounded-xl shadow-md">
            <div className="text-center">
              <Settings className="h-8 w-8 mx-auto mb-3 text-purple-600" />
              <h3 className="font-semibold text-slate-800 mb-2">Classroom Controls</h3>
              <p className="text-sm text-slate-600">Manage participants, recordings, and breakout rooms</p>
            </div>
          </div>
        </div>
        <button className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-500 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl inline-flex items-center space-x-2">
          <Video className="h-6 w-6" />
          <span>Try Virtual Classroom Demo</span>
        </button>
      </div>
    </div>
  );
};

export default OnlineClassesPage;