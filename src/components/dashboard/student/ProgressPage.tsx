import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, Clock, Star, Award, BookOpen, Target, CheckCircle } from 'lucide-react';

const ProgressPage = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  const courseProgress = [
    {
      id: 1,
      title: 'Algebra 1',
      category: 'Mathematics',
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      timeSpent: '45h 30m',
      lastActivity: '2 hours ago',
      averageScore: 87,
      streak: 7,
      icon: '🔢'
    },
    {
      id: 2,
      title: 'World History',
      category: 'History',
      progress: 60,
      totalLessons: 20,
      completedLessons: 12,
      timeSpent: '32h 15m',
      lastActivity: '1 day ago',
      averageScore: 92,
      streak: 5,
      icon: '🌍'
    },
    {
      id: 3,
      title: 'Introduction to Python',
      category: 'Computer Science',
      progress: 40,
      totalLessons: 30,
      completedLessons: 12,
      timeSpent: '28h 45m',
      lastActivity: '3 days ago',
      averageScore: 85,
      streak: 3,
      icon: '🐍'
    },
    {
      id: 4,
      title: 'Biology Fundamentals',
      category: 'Science',
      progress: 100,
      totalLessons: 18,
      completedLessons: 18,
      timeSpent: '42h 20m',
      lastActivity: '1 week ago',
      averageScore: 94,
      streak: 0,
      icon: '🧬'
    },
    {
      id: 5,
      title: 'Creative Writing',
      category: 'Language Arts',
      progress: 15,
      totalLessons: 15,
      completedLessons: 2,
      timeSpent: '8h 10m',
      lastActivity: '5 days ago',
      averageScore: 78,
      streak: 1,
      icon: '✍️'
    }
  ];

  const weeklyProgress = [
    { week: 'Week 1', hours: 12, lessons: 8, score: 85 },
    { week: 'Week 2', hours: 15, lessons: 10, score: 88 },
    { week: 'Week 3', hours: 18, lessons: 12, score: 91 },
    { week: 'Week 4', hours: 14, lessons: 9, score: 87 }
  ];

  const achievements = [
    {
      id: 1,
      title: 'Math Master',
      description: 'Complete 10 math lessons with 90%+ score',
      icon: '🏆',
      earned: true,
      earnedDate: '2024-01-15',
      category: 'Academic'
    },
    {
      id: 2,
      title: 'Consistent Learner',
      description: 'Maintain a 7-day learning streak',
      icon: '🔥',
      earned: true,
      earnedDate: '2024-01-20',
      category: 'Engagement'
    },
    {
      id: 3,
      title: 'Speed Reader',
      description: 'Complete 5 reading assignments in one week',
      icon: '📚',
      earned: true,
      earnedDate: '2024-01-10',
      category: 'Reading'
    },
    {
      id: 4,
      title: 'Code Warrior',
      description: 'Complete 15 programming exercises',
      icon: '💻',
      earned: false,
      progress: 60,
      category: 'Programming'
    },
    {
      id: 5,
      title: 'Science Explorer',
      description: 'Complete all science lab simulations',
      icon: '🔬',
      earned: false,
      progress: 80,
      category: 'Science'
    },
    {
      id: 6,
      title: 'Perfect Score',
      description: 'Get 100% on any final exam',
      icon: '⭐',
      earned: false,
      progress: 0,
      category: 'Academic'
    }
  ];

  const overallStats = {
    totalHours: courseProgress.reduce((acc, course) => {
      const hours = parseFloat(course.timeSpent.split('h')[0]);
      return acc + hours;
    }, 0),
    totalLessons: courseProgress.reduce((acc, course) => acc + course.completedLessons, 0),
    averageScore: Math.round(courseProgress.reduce((acc, course) => acc + course.averageScore, 0) / courseProgress.length),
    currentStreak: Math.max(...courseProgress.map(course => course.streak)),
    completedCourses: courseProgress.filter(course => course.progress === 100).length,
    activeCourses: courseProgress.filter(course => course.progress > 0 && course.progress < 100).length
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'from-green-400 to-green-600';
    if (progress >= 75) return 'from-blue-400 to-blue-600';
    if (progress >= 50) return 'from-yellow-400 to-yellow-600';
    if (progress >= 25) return 'from-orange-400 to-orange-600';
    return 'from-red-400 to-red-600';
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center space-x-3">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <span>Learning Progress</span>
          </h1>
          <p className="text-slate-600 mt-2">Track your learning journey and celebrate your achievements</p>
        </div>
        <div className="flex space-x-2">
          {['week', 'month', 'quarter'].map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedTimeframe === timeframe
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-800">{overallStats.totalHours}h</div>
              <div className="text-blue-600 text-sm">Total Study Time</div>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-800">{overallStats.totalLessons}</div>
              <div className="text-green-600 text-sm">Lessons Completed</div>
            </div>
            <BookOpen className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-6 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-800">{overallStats.averageScore}%</div>
              <div className="text-purple-600 text-sm">Average Score</div>
            </div>
            <Star className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-100 to-orange-200 p-6 rounded-xl border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-800">{overallStats.currentStreak}</div>
              <div className="text-orange-600 text-sm">Day Streak</div>
            </div>
            <div className="text-3xl">🔥</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-teal-100 to-teal-200 p-6 rounded-xl border border-teal-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-teal-800">{overallStats.completedCourses}</div>
              <div className="text-teal-600 text-sm">Completed Courses</div>
            </div>
            <CheckCircle className="h-8 w-8 text-teal-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-6 rounded-xl border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-yellow-800">{overallStats.activeCourses}</div>
              <div className="text-yellow-600 text-sm">Active Courses</div>
            </div>
            <Target className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Course Progress */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <span>Course Progress</span>
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {courseProgress.map((course) => (
              <div key={course.id} className="bg-slate-50 rounded-xl p-6 hover:bg-slate-100 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{course.icon}</div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{course.title}</h3>
                      <p className="text-sm text-slate-600">{course.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-800">{course.progress}%</div>
                    <div className="text-sm text-slate-500">Complete</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="bg-slate-200 rounded-full h-3">
                    <div 
                      className={`bg-gradient-to-r ${getProgressColor(course.progress)} rounded-full h-3 transition-all duration-500`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Course Stats */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Lessons:</span>
                    <span className="ml-2 font-medium text-slate-800">
                      {course.completedLessons}/{course.totalLessons}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Time Spent:</span>
                    <span className="ml-2 font-medium text-slate-800">{course.timeSpent}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Avg Score:</span>
                    <span className="ml-2 font-medium text-slate-800">{course.averageScore}%</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Streak:</span>
                    <span className="ml-2 font-medium text-slate-800">
                      {course.streak > 0 ? `🔥 ${course.streak} days` : 'No streak'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Last Activity:</span>
                    <span className="ml-2 font-medium text-slate-800">{course.lastActivity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-green-600" />
            <span>Weekly Progress Trend</span>
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {weeklyProgress.map((week, index) => (
              <div key={index} className="bg-gradient-to-r from-green-100 to-teal-100 p-6 rounded-xl border border-green-200">
                <h3 className="font-semibold text-green-800 mb-4">{week.week}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-green-600 text-sm">Study Hours:</span>
                    <span className="font-medium text-green-800">{week.hours}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-600 text-sm">Lessons:</span>
                    <span className="font-medium text-green-800">{week.lessons}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-600 text-sm">Avg Score:</span>
                    <span className="font-medium text-green-800">{week.score}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
            <Award className="h-6 w-6 text-yellow-600" />
            <span>Achievements</span>
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-6 rounded-xl border transition-all duration-200 ${
                  achievement.earned
                    ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-200 shadow-lg'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="text-center">
                  <div className={`text-4xl mb-3 ${achievement.earned ? 'animate-bounce' : 'opacity-50'}`}>
                    {achievement.icon}
                  </div>
                  <h3 className={`font-semibold mb-2 ${
                    achievement.earned ? 'text-yellow-800' : 'text-slate-600'
                  }`}>
                    {achievement.title}
                  </h3>
                  <p className={`text-sm mb-3 ${
                    achievement.earned ? 'text-yellow-700' : 'text-slate-500'
                  }`}>
                    {achievement.description}
                  </p>
                  
                  {achievement.earned ? (
                    <div className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                      Earned {achievement.earnedDate}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-full h-2 transition-all duration-500"
                          style={{ width: `${achievement.progress || 0}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-slate-500">
                        {achievement.progress || 0}% Complete
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl border border-blue-200 p-8 text-center">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Keep Up the Great Work!</h2>
        <p className="text-blue-700 mb-6 max-w-2xl mx-auto">
          You've made excellent progress in your learning journey. Your consistency and dedication are paying off. 
          Keep pushing forward to reach your goals!
        </p>
        <div className="flex justify-center space-x-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-800">{overallStats.totalHours}</div>
            <div className="text-blue-600 text-sm">Hours Studied</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-800">{achievements.filter(a => a.earned).length}</div>
            <div className="text-purple-600 text-sm">Achievements Earned</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-800">{overallStats.averageScore}%</div>
            <div className="text-green-600 text-sm">Average Score</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;