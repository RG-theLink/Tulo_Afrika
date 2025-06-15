import React, { useState } from 'react';
import { ExternalLink, BookOpen, Clock, Users, Star, Play, Search } from 'lucide-react';

const MyCoursesPage = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const courses = [
    {
      id: 1,
      title: 'Algebra 1',
      thumbnail: '🔢',
      progress: 75,
      status: 'in-progress',
      category: 'Mathematics'
    },
    {
      id: 2,
      title: 'World History',
      thumbnail: '🌍',
      progress: 60,
      status: 'in-progress',
      category: 'History'
    },
    {
      id: 3,
      title: 'Introduction to Python',
      thumbnail: '🐍',
      progress: 40,
      status: 'in-progress',
      category: 'Computer Science'
    },
    {
      id: 4,
      title: 'Biology Fundamentals',
      thumbnail: '🧬',
      progress: 100,
      status: 'completed',
      category: 'Science'
    },
    {
      id: 5,
      title: 'Creative Writing',
      thumbnail: '✍️',
      progress: 0,
      status: 'not-started',
      category: 'Language Arts'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || course.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'not-started': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: courses.length,
    inProgress: courses.filter(c => c.status === 'in-progress').length,
    completed: courses.filter(c => c.status === 'completed').length,
    avgProgress: Math.round(courses.reduce((acc, c) => acc + c.progress, 0) / courses.length)
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center space-x-3">
            <BookOpen className="h-8 w-8 text-teal-600" />
            <span>My Courses</span>
          </h1>
          <p className="text-slate-600 mt-2">Track your learning progress and continue where you left off</p>
        </div>
        <a
          href="https://online.elearning-swakopca.edu.na/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-teal-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2"
        >
          <ExternalLink className="h-5 w-5" />
          <span>Navigate to E-Learning</span>
        </a>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-800">{stats.total}</div>
              <div className="text-blue-600 text-sm">Total Courses</div>
            </div>
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-6 rounded-xl border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-yellow-800">{stats.inProgress}</div>
              <div className="text-yellow-600 text-sm">In Progress</div>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-800">{stats.completed}</div>
              <div className="text-green-600 text-sm">Completed</div>
            </div>
            <Star className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-6 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-800">{stats.avgProgress}%</div>
              <div className="text-purple-600 text-sm">Avg Progress</div>
            </div>
            <div className="text-3xl">📈</div>
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
                placeholder="Search courses by title or category..."
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="md:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Courses</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="not-started">Not Started</option>
            </select>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 overflow-hidden"
          >
            {/* Course Header */}
            <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-6 text-white relative">
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">{course.thumbnail}</div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                  {course.status.replace('-', ' ')}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-white/90 text-sm">{course.category}</p>
            </div>

            {/* Course Content */}
            <div className="p-6">
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-slate-700">Progress</span>
                  <span className="text-slate-600">{course.progress}%</span>
                </div>
                <div className="bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-teal-400 to-blue-500 rounded-full h-2 transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* E-Learning Link */}
              <a
                href="https://online.elearning-swakopca.edu.na/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white py-3 px-4 rounded-xl font-medium hover:from-teal-500 hover:to-blue-600 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <ExternalLink className="h-5 w-5" />
                <span>Continue on E-Learning</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* E-Learning Platform CTA */}
      <div className="bg-gradient-to-r from-white/80 to-teal-50/80 backdrop-blur-sm rounded-3xl border border-teal-200 p-12 shadow-xl text-center">
        <div className="flex justify-center space-x-4 mb-6">
          <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-3 rounded-xl">
            <span className="text-2xl">🚀</span>
          </div>
          <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-3 rounded-xl">
            <span className="text-2xl">📚</span>
          </div>
          <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-3 rounded-xl">
            <span className="text-2xl">🎓</span>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-4">
          Ready to Continue Your Learning Journey?
        </h3>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
          Access your full course library, interactive lessons, and advanced learning tools on our dedicated e-learning platform.
        </p>
        <a
          href="https://online.elearning-swakopca.edu.na/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-teal-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl inline-flex items-center space-x-2"
        >
          <ExternalLink className="h-6 w-6" />
          <span>Navigate to E-Learning Platform</span>
        </a>
      </div>
    </div>
  );
};

export default MyCoursesPage;