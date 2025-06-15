import React, { useState } from 'react';
import { Calendar, Clock, Plus, Edit, Trash2, User, BookOpen, Target, Bell, Save, X, Users, CheckCircle } from 'lucide-react';

const EducatorSchedulePage = () => {
  const [showCreateSchedule, setShowCreateSchedule] = useState(false);
  const [showAssignSchedule, setShowAssignSchedule] = useState(false);
  const [selectedDay, setSelectedDay] = useState('monday');
  const [newEvent, setNewEvent] = useState({
    title: '',
    subject: '',
    startTime: '',
    endTime: '',
    type: 'class',
    description: '',
    targetGroup: ''
  });

  const [scheduleAssignment, setScheduleAssignment] = useState({
    title: '',
    subject: '',
    description: '',
    targetGroup: '',
    targetStudents: [] as string[],
    suggestedTimes: [] as string[],
    deadline: '',
    priority: 'medium'
  });

  const weekDays = [
    { id: 'monday', name: 'Monday', short: 'Mon' },
    { id: 'tuesday', name: 'Tuesday', short: 'Tue' },
    { id: 'wednesday', name: 'Wednesday', short: 'Wed' },
    { id: 'thursday', name: 'Thursday', short: 'Thu' },
    { id: 'friday', name: 'Friday', short: 'Fri' },
    { id: 'saturday', name: 'Saturday', short: 'Sat' },
    { id: 'sunday', name: 'Sunday', short: 'Sun' }
  ];

  const schedule = {
    monday: [
      { id: 1, title: 'Mathematics Grade 10', subject: 'Mathematics', startTime: '09:00', endTime: '10:30', type: 'class', description: 'Quadratic equations lesson', group: 'Mathematics Grade 10' },
      { id: 2, title: 'Office Hours', subject: 'General', startTime: '14:00', endTime: '16:00', type: 'office-hours', description: 'Open for student questions', group: 'All Groups' }
    ],
    tuesday: [
      { id: 3, title: 'Physics Grade 11', subject: 'Physics', startTime: '10:00', endTime: '11:30', type: 'class', description: 'Wave motion lab', group: 'Physics Grade 11' },
      { id: 4, title: 'Department Meeting', subject: 'Administrative', startTime: '15:00', endTime: '16:30', type: 'meeting', description: 'Weekly department sync', group: 'Faculty' }
    ],
    wednesday: [
      { id: 5, title: 'Mathematics Grade 10', subject: 'Mathematics', startTime: '09:00', endTime: '10:30', type: 'class', description: 'Practice problems session', group: 'Mathematics Grade 10' },
      { id: 6, title: 'Student Tutoring', subject: 'Mathematics', startTime: '14:30', endTime: '15:30', type: 'tutoring', description: 'One-on-one with Alex Johnson', group: 'Individual' }
    ],
    thursday: [
      { id: 7, title: 'Physics Grade 11', subject: 'Physics', startTime: '10:00', endTime: '11:30', type: 'class', description: 'Momentum and collisions', group: 'Physics Grade 11' },
      { id: 8, title: 'Chemistry Lab', subject: 'Chemistry', startTime: '13:00', endTime: '14:30', type: 'lab', description: 'Chemical reactions lab', group: 'Chemistry Lab' }
    ],
    friday: [
      { id: 9, title: 'Mathematics Grade 10', subject: 'Mathematics', startTime: '09:00', endTime: '10:30', type: 'class', description: 'Quiz on quadratic equations', group: 'Mathematics Grade 10' },
      { id: 10, title: 'Professional Development', subject: 'Training', startTime: '13:00', endTime: '15:00', type: 'training', description: 'Advanced teaching methods workshop', group: 'Personal' }
    ],
    saturday: [],
    sunday: []
  };

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Administrative', 'Training', 'General'];
  const eventTypes = [
    { value: 'class', label: 'Class Session', color: 'bg-blue-100 text-blue-800' },
    { value: 'lab', label: 'Lab Session', color: 'bg-green-100 text-green-800' },
    { value: 'office-hours', label: 'Office Hours', color: 'bg-purple-100 text-purple-800' },
    { value: 'tutoring', label: 'Tutoring', color: 'bg-orange-100 text-orange-800' },
    { value: 'meeting', label: 'Meeting', color: 'bg-pink-100 text-pink-800' },
    { value: 'training', label: 'Training', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'planning', label: 'Planning', color: 'bg-indigo-100 text-indigo-800' },
    { value: 'grading', label: 'Grading', color: 'bg-teal-100 text-teal-800' },
    { value: 'other', label: 'Other', color: 'bg-slate-100 text-slate-800' }
  ];

  const groups = [
    { id: 'math10', name: 'Mathematics Grade 10', count: 24 },
    { id: 'physics11', name: 'Physics Grade 11', count: 18 },
    { id: 'chemlab', name: 'Chemistry Lab', count: 12 },
    { id: 'faculty', name: 'Faculty', count: 15 },
    { id: 'all', name: 'All Groups', count: 54 },
    { id: 'individual', name: 'Individual', count: 1 },
    { id: 'personal', name: 'Personal', count: 1 }
  ];

  const students = [
    { id: 'student1', name: 'Alex Johnson', group: 'Mathematics Grade 10' },
    { id: 'student2', name: 'Emma Davis', group: 'Mathematics Grade 10' },
    { id: 'student3', name: 'Mike Chen', group: 'Physics Grade 11' },
    { id: 'student4', name: 'Sarah Wilson', group: 'Chemistry Lab' },
    { id: 'student5', name: 'James Thompson', group: 'Physics Grade 11' }
  ];

  const suggestedTimes = [
    'Morning (8-12)', 'Afternoon (12-16)', 'Evening (16-20)', 
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' }
  ];

  const getEventTypeColor = (type: string) => {
    const eventType = eventTypes.find(t => t.value === type);
    return eventType ? eventType.color : 'bg-gray-100 text-gray-800';
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating event:', newEvent);
    setShowCreateSchedule(false);
    setNewEvent({ 
      title: '', 
      subject: '', 
      startTime: '', 
      endTime: '', 
      type: 'class', 
      description: '',
      targetGroup: ''
    });
  };

  const handleAssignSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Assigning schedule:', scheduleAssignment);
    setShowAssignSchedule(false);
    setScheduleAssignment({
      title: '',
      subject: '',
      description: '',
      targetGroup: '',
      targetStudents: [],
      suggestedTimes: [],
      deadline: '',
      priority: 'medium'
    });
  };

  const handleStudentToggle = (studentId: string) => {
    setScheduleAssignment(prev => ({
      ...prev,
      targetStudents: prev.targetStudents.includes(studentId)
        ? prev.targetStudents.filter(id => id !== studentId)
        : [...prev.targetStudents, studentId]
    }));
  };

  const handleTimeToggle = (time: string) => {
    setScheduleAssignment(prev => ({
      ...prev,
      suggestedTimes: prev.suggestedTimes.includes(time)
        ? prev.suggestedTimes.filter(t => t !== time)
        : [...prev.suggestedTimes, time]
    }));
  };

  const todayEvents = schedule[selectedDay] || [];
  const totalWeeklyHours = Object.values(schedule).flat().reduce((acc, event) => {
    const start = new Date(`2024-01-01 ${event.startTime}`);
    const end = new Date(`2024-01-01 ${event.endTime}`);
    return acc + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  }, 0);

  const totalClasses = Object.values(schedule).flat().filter(event => event.type === 'class').length;
  const totalMeetings = Object.values(schedule).flat().filter(event => event.type === 'meeting').length;

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center space-x-3">
            <Calendar className="h-8 w-8 text-teal-600" />
            <span>Teaching Schedule</span>
          </h1>
          <p className="text-slate-600 mt-2">Manage your classes, office hours, and student schedules</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowCreateSchedule(true)}
            className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-teal-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Event</span>
          </button>
          <button
            onClick={() => setShowAssignSchedule(true)}
            className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2"
          >
            <Users className="h-5 w-5" />
            <span>Assign Student Schedule</span>
          </button>
        </div>
      </div>

      {/* Schedule Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-teal-100 to-teal-200 p-6 rounded-xl border border-teal-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-teal-800">{totalWeeklyHours.toFixed(1)}h</div>
              <div className="text-teal-600 text-sm">Weekly Teaching Hours</div>
            </div>
            <Clock className="h-8 w-8 text-teal-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-800">{totalClasses}</div>
              <div className="text-blue-600 text-sm">Classes per Week</div>
            </div>
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-6 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-800">{todayEvents.length}</div>
              <div className="text-purple-600 text-sm">Today's Events</div>
            </div>
            <Target className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-pink-100 to-pink-200 p-6 rounded-xl border border-pink-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-pink-800">{totalMeetings}</div>
              <div className="text-pink-600 text-sm">Meetings</div>
            </div>
            <Users className="h-8 w-8 text-pink-600" />
          </div>
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-teal-600" />
            <span>Weekly Schedule</span>
          </h2>
        </div>

        {/* Day Selector */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex space-x-2 overflow-x-auto">
            {weekDays.map((day) => (
              <button
                key={day.id}
                onClick={() => setSelectedDay(day.id)}
                className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                  selectedDay === day.id
                    ? 'bg-gradient-to-r from-teal-400 to-blue-500 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <div className="text-center">
                  <div className="font-semibold">{day.short}</div>
                  <div className="text-xs opacity-80">{schedule[day.id]?.length || 0} events</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Day Events */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 capitalize">
            {weekDays.find(d => d.id === selectedDay)?.name} Schedule
          </h3>
          
          {todayEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gradient-to-r from-slate-100 to-slate-200 p-6 rounded-xl inline-block mb-4">
                <Calendar className="h-12 w-12 text-slate-400" />
              </div>
              <h4 className="text-lg font-semibold text-slate-600 mb-2">No events scheduled</h4>
              <p className="text-slate-500">Add classes, meetings, or other activities to your schedule.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {todayEvents.map((event) => (
                <div key={event.id} className="bg-slate-50 rounded-xl p-6 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-3 rounded-xl">
                        {event.type === 'class' && <BookOpen className="h-6 w-6 text-white" />}
                        {event.type === 'lab' && <BookOpen className="h-6 w-6 text-white" />}
                        {event.type === 'meeting' && <Users className="h-6 w-6 text-white" />}
                        {event.type === 'office-hours' && <User className="h-6 w-6 text-white" />}
                        {event.type === 'tutoring' && <User className="h-6 w-6 text-white" />}
                        {event.type === 'training' && <Target className="h-6 w-6 text-white" />}
                        {event.type === 'planning' && <Target className="h-6 w-6 text-white" />}
                        {event.type === 'grading' && <CheckCircle className="h-6 w-6 text-white" />}
                        {event.type === 'other' && <Bell className="h-6 w-6 text-white" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">{event.title}</h4>
                        <p className="text-sm text-slate-600">{event.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                        {eventTypes.find(t => t.value === event.type)?.label}
                      </span>
                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Time:</span>
                      <span className="ml-2 font-medium text-slate-800">
                        {event.startTime} - {event.endTime}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500">Duration:</span>
                      <span className="ml-2 font-medium text-slate-800">
                        {(() => {
                          const start = new Date(`2024-01-01 ${event.startTime}`);
                          const end = new Date(`2024-01-01 ${event.endTime}`);
                          const duration = (end.getTime() - start.getTime()) / (1000 * 60);
                          return duration >= 60 ? `${Math.floor(duration / 60)}h ${duration % 60}m` : `${duration}m`;
                        })()}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500">Group:</span>
                      <span className="ml-2 font-medium text-slate-800">{event.group}</span>
                    </div>
                  </div>

                  {event.description && (
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <p className="text-sm text-slate-600">{event.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Event Modal */}
      {showCreateSchedule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                  <Plus className="h-6 w-6 text-teal-600" />
                  <span>Add Schedule Event</span>
                </h3>
                <button 
                  onClick={() => setShowCreateSchedule(false)}
                  className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleCreateEvent} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Event Title</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="e.g., Mathematics Grade 10 Class"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                  <select
                    value={newEvent.subject}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Event Type</label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    {eventTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Start Time</label>
                  <input
                    type="time"
                    value={newEvent.startTime}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, startTime: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">End Time</label>
                  <input
                    type="time"
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, endTime: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Target Group</label>
                <select
                  value={newEvent.targetGroup}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, targetGroup: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                >
                  <option value="">Select group</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>{group.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description (Optional)</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Add any notes or details about this event..."
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowCreateSchedule(false)}
                  className="flex-1 px-6 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-xl font-semibold hover:from-teal-500 hover:to-blue-600 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Save className="h-5 w-5" />
                  <span>Add Event</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Schedule Modal */}
      {showAssignSchedule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                  <Users className="h-6 w-6 text-blue-600" />
                  <span>Assign Student Schedule</span>
                </h3>
                <button 
                  onClick={() => setShowAssignSchedule(false)}
                  className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleAssignSchedule} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Schedule Title</label>
                <input
                  type="text"
                  value={scheduleAssignment.title}
                  onChange={(e) => setScheduleAssignment(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Weekly Math Study Plan"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                <select
                  value={scheduleAssignment.subject}
                  onChange={(e) => setScheduleAssignment(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select subject</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  value={scheduleAssignment.description}
                  onChange={(e) => setScheduleAssignment(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the schedule and what students should focus on..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Target Group</label>
                <select
                  value={scheduleAssignment.targetGroup}
                  onChange={(e) => setScheduleAssignment(prev => ({ ...prev, targetGroup: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a group</option>
                  {groups.filter(g => g.id !== 'faculty' && g.id !== 'personal').map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name} ({group.count} students)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-4">Or Select Specific Students</label>
                <div className="max-h-60 overflow-y-auto space-y-2 bg-slate-50 p-4 rounded-xl">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id={`student-${student.id}`}
                        checked={scheduleAssignment.targetStudents.includes(student.id)}
                        onChange={() => handleStudentToggle(student.id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label htmlFor={`student-${student.id}`} className="flex-1 flex items-center justify-between">
                        <span className="text-slate-700">{student.name}</span>
                        <span className="text-xs text-slate-500">{student.group}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-4">Suggested Study Times</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {suggestedTimes.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => handleTimeToggle(time)}
                      className={`p-3 rounded-xl border transition-all duration-200 text-sm ${
                        scheduleAssignment.suggestedTimes.includes(time)
                          ? 'bg-gradient-to-r from-blue-100 to-purple-100 border-blue-300 text-blue-800'
                          : 'bg-white border-slate-200 hover:border-blue-200 text-slate-700'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Deadline</label>
                  <input
                    type="date"
                    value={scheduleAssignment.deadline}
                    onChange={(e) => setScheduleAssignment(prev => ({ ...prev, deadline: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
                  <select
                    value={scheduleAssignment.priority}
                    onChange={(e) => setScheduleAssignment(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {priorities.map((priority) => (
                      <option key={priority.value} value={priority.value}>{priority.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAssignSchedule(false)}
                  className="flex-1 px-6 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-500 hover:to-purple-600 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Bell className="h-5 w-5" />
                  <span>Assign Schedule</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducatorSchedulePage;