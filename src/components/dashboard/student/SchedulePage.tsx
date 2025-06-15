import React, { useState } from 'react';
import { Calendar, Clock, Plus, Edit, Trash2, User, BookOpen, Target, Bell, Save, X } from 'lucide-react';

const SchedulePage = () => {
  const [showCreateSchedule, setShowCreateSchedule] = useState(false);
  const [showRequestSchedule, setShowRequestSchedule] = useState(false);
  const [selectedDay, setSelectedDay] = useState('monday');
  const [newEvent, setNewEvent] = useState({
    title: '',
    subject: '',
    startTime: '',
    endTime: '',
    type: 'study',
    description: ''
  });

  const [scheduleRequest, setScheduleRequest] = useState({
    subjects: [],
    studyHours: '',
    preferredTimes: [],
    goals: '',
    currentLevel: '',
    specialRequests: ''
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
      { id: 1, title: 'Algebra Study Session', subject: 'Mathematics', startTime: '09:00', endTime: '10:30', type: 'study', description: 'Linear equations practice' },
      { id: 2, title: 'History Reading', subject: 'History', startTime: '14:00', endTime: '15:00', type: 'reading', description: 'World War 2 chapter' },
      { id: 3, title: 'Python Coding', subject: 'Computer Science', startTime: '16:00', endTime: '17:30', type: 'practice', description: 'Functions and loops exercises' }
    ],
    tuesday: [
      { id: 4, title: 'Biology Lab', subject: 'Science', startTime: '10:00', endTime: '11:30', type: 'lab', description: 'Cell structure experiment' },
      { id: 5, title: 'Essay Writing', subject: 'Language Arts', startTime: '15:00', endTime: '16:30', type: 'writing', description: 'Persuasive essay draft' }
    ],
    wednesday: [
      { id: 6, title: 'Math Tutoring', subject: 'Mathematics', startTime: '11:00', endTime: '12:00', type: 'tutoring', description: 'One-on-one session with Dr. Wilson' },
      { id: 7, title: 'Science Reading', subject: 'Science', startTime: '14:30', endTime: '15:30', type: 'reading', description: 'Genetics chapter review' }
    ],
    thursday: [
      { id: 8, title: 'History Project', subject: 'History', startTime: '09:30', endTime: '11:00', type: 'project', description: 'Renaissance presentation prep' },
      { id: 9, title: 'Creative Writing', subject: 'Language Arts', startTime: '16:00', endTime: '17:00', type: 'writing', description: 'Short story development' }
    ],
    friday: [
      { id: 10, title: 'Math Quiz Prep', subject: 'Mathematics', startTime: '10:00', endTime: '11:00', type: 'review', description: 'Quadratic equations review' },
      { id: 11, title: 'Python Project', subject: 'Computer Science', startTime: '15:00', endTime: '17:00', type: 'project', description: 'Calculator app development' }
    ],
    saturday: [
      { id: 12, title: 'Study Review', subject: 'Mixed', startTime: '10:00', endTime: '12:00', type: 'review', description: 'Weekly review session' }
    ],
    sunday: [
      { id: 13, title: 'Planning Session', subject: 'Planning', startTime: '14:00', endTime: '15:00', type: 'planning', description: 'Next week preparation' }
    ]
  };

  const subjects = ['Mathematics', 'Science', 'History', 'Language Arts', 'Computer Science', 'Art', 'Music', 'Physical Education'];
  const eventTypes = [
    { value: 'study', label: 'Study Session', color: 'bg-blue-100 text-blue-800' },
    { value: 'reading', label: 'Reading', color: 'bg-green-100 text-green-800' },
    { value: 'practice', label: 'Practice', color: 'bg-purple-100 text-purple-800' },
    { value: 'tutoring', label: 'Tutoring', color: 'bg-orange-100 text-orange-800' },
    { value: 'project', label: 'Project Work', color: 'bg-pink-100 text-pink-800' },
    { value: 'review', label: 'Review', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'lab', label: 'Lab Work', color: 'bg-teal-100 text-teal-800' },
    { value: 'writing', label: 'Writing', color: 'bg-indigo-100 text-indigo-800' },
    { value: 'planning', label: 'Planning', color: 'bg-slate-100 text-slate-800' }
  ];

  const preferredTimes = ['Morning (6-12)', 'Afternoon (12-18)', 'Evening (18-22)'];

  const getEventTypeColor = (type: string) => {
    const eventType = eventTypes.find(t => t.value === type);
    return eventType ? eventType.color : 'bg-gray-100 text-gray-800';
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating event:', newEvent);
    setShowCreateSchedule(false);
    setNewEvent({ title: '', subject: '', startTime: '', endTime: '', type: 'study', description: '' });
  };

  const handleRequestSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Requesting schedule:', scheduleRequest);
    setShowRequestSchedule(false);
    setScheduleRequest({
      subjects: [],
      studyHours: '',
      preferredTimes: [],
      goals: '',
      currentLevel: '',
      specialRequests: ''
    });
  };

  const handleSubjectToggle = (subject: string) => {
    setScheduleRequest(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const handleTimeToggle = (time: string) => {
    setScheduleRequest(prev => ({
      ...prev,
      preferredTimes: prev.preferredTimes.includes(time)
        ? prev.preferredTimes.filter(t => t !== time)
        : [...prev.preferredTimes, time]
    }));
  };

  const todayEvents = schedule[selectedDay] || [];
  const totalWeeklyHours = Object.values(schedule).flat().reduce((acc, event) => {
    const start = new Date(`2024-01-01 ${event.startTime}`);
    const end = new Date(`2024-01-01 ${event.endTime}`);
    return acc + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  }, 0);

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center space-x-3">
            <Calendar className="h-8 w-8 text-green-600" />
            <span>Study Schedule</span>
          </h1>
          <p className="text-slate-600 mt-2">Organize your learning time and stay on track with your goals</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowCreateSchedule(true)}
            className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-500 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Event</span>
          </button>
          <button
            onClick={() => setShowRequestSchedule(true)}
            className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2"
          >
            <User className="h-5 w-5" />
            <span>Request Schedule</span>
          </button>
        </div>
      </div>

      {/* Schedule Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-800">{totalWeeklyHours.toFixed(1)}h</div>
              <div className="text-green-600 text-sm">Weekly Study Time</div>
            </div>
            <Clock className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-800">{Object.values(schedule).flat().length}</div>
              <div className="text-blue-600 text-sm">Total Events</div>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
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
        <div className="bg-gradient-to-r from-orange-100 to-orange-200 p-6 rounded-xl border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-800">
                {Object.values(schedule).flat().filter(e => e.type === 'tutoring').length}
              </div>
              <div className="text-orange-600 text-sm">Tutoring Sessions</div>
            </div>
            <User className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-green-600" />
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
                    ? 'bg-gradient-to-r from-green-400 to-teal-500 text-white shadow-lg'
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
              <p className="text-slate-500">Add some study sessions or activities to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {todayEvents.map((event) => (
                <div key={event.id} className="bg-slate-50 rounded-xl p-6 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-r from-green-400 to-teal-500 p-3 rounded-xl">
                        <BookOpen className="h-6 w-6 text-white" />
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
                      <span className="text-slate-500">Type:</span>
                      <span className="ml-2 font-medium text-slate-800 capitalize">{event.type}</span>
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
                  <Plus className="h-6 w-6 text-green-600" />
                  <span>Add Study Event</span>
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
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., Algebra Study Session"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                  <select
                    value={newEvent.subject}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">End Time</label>
                  <input
                    type="time"
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, endTime: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description (Optional)</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Add any notes or details about this study session..."
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
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-xl font-semibold hover:from-green-500 hover:to-teal-600 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Save className="h-5 w-5" />
                  <span>Add Event</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Request Schedule Modal */}
      {showRequestSchedule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                  <User className="h-6 w-6 text-blue-600" />
                  <span>Request Custom Schedule</span>
                </h3>
                <button 
                  onClick={() => setShowRequestSchedule(false)}
                  className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleRequestSchedule} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-4">Subjects to Include</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {subjects.map((subject) => (
                    <button
                      key={subject}
                      type="button"
                      onClick={() => handleSubjectToggle(subject)}
                      className={`p-3 rounded-xl border transition-all duration-200 text-sm ${
                        scheduleRequest.subjects.includes(subject)
                          ? 'bg-gradient-to-r from-blue-100 to-purple-100 border-blue-300 text-blue-800'
                          : 'bg-white border-slate-200 hover:border-blue-200 text-slate-700'
                      }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Study Hours per Week</label>
                <select
                  value={scheduleRequest.studyHours}
                  onChange={(e) => setScheduleRequest(prev => ({ ...prev, studyHours: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select study hours</option>
                  <option value="5-10">5-10 hours per week</option>
                  <option value="10-15">10-15 hours per week</option>
                  <option value="15-20">15-20 hours per week</option>
                  <option value="20+">20+ hours per week</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-4">Preferred Study Times</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {preferredTimes.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => handleTimeToggle(time)}
                      className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                        scheduleRequest.preferredTimes.includes(time)
                          ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300 text-purple-800'
                          : 'bg-white border-slate-200  hover:border-purple-200 text-slate-700'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Current Academic Level</label>
                <select
                  value={scheduleRequest.currentLevel}
                  onChange={(e) => setScheduleRequest(prev => ({ ...prev, currentLevel: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select your level</option>
                  <option value="elementary">Elementary (K-5)</option>
                  <option value="middle">Middle School (6-8)</option>
                  <option value="high">High School (9-12)</option>
                  <option value="college">College/University</option>
                  <option value="adult">Adult Learner</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Learning Goals</label>
                <textarea
                  value={scheduleRequest.goals}
                  onChange={(e) => setScheduleRequest(prev => ({ ...prev, goals: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your learning goals and what you want to achieve..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Special Requests or Preferences</label>
                <textarea
                  value={scheduleRequest.specialRequests}
                  onChange={(e) => setScheduleRequest(prev => ({ ...prev, specialRequests: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any specific learning preferences, challenges, or special accommodations..."
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowRequestSchedule(false)}
                  className="flex-1 px-6 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-500 hover:to-purple-600 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Bell className="h-5 w-5" />
                  <span>Request Custom Schedule</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulePage;