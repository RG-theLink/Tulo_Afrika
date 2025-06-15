import React from 'react';
import { ChevronLeft, ChevronRight, Clock, Users } from 'lucide-react';

interface MyCoursesWidgetProps {
  userType: 'student' | 'educator' | 'admin';
}

const MyCoursesWidget = ({ userType }: MyCoursesWidgetProps) => {
  const getCoursesData = () => {
    switch (userType) {
      case 'student':
        return {
          title: 'My Courses',
          subtitle: 'Continue where you left off',
          courses: [
            {
              title: 'Algebra 1',
              thumbnail: '🔢',
              progress: 75,
              nextLesson: 'Linear Equations',
              timeLeft: '2h 30m',
              difficulty: 'Intermediate'
            },
            {
              title: 'World History',
              thumbnail: '🌍',
              progress: 60,
              nextLesson: 'Renaissance Period',
              timeLeft: '1h 45m',
              difficulty: 'Beginner'
            },
            {
              title: 'Introduction to Python',
              thumbnail: '🐍',
              progress: 40,
              nextLesson: 'Functions & Loops',
              timeLeft: '3h 15m',
              difficulty: 'Intermediate'
            }
          ]
        };
      case 'educator':
        return {
          title: 'My Classes',
          subtitle: 'Manage your teaching schedule',
          courses: [
            {
              title: 'Mathematics Grade 10',
              thumbnail: '🔢',
              progress: 85,
              nextLesson: 'Quadratic Functions',
              timeLeft: 'Today 2:00 PM',
              difficulty: '24 Students'
            },
            {
              title: 'Physics Grade 11',
              thumbnail: '⚛️',
              progress: 70,
              nextLesson: 'Wave Motion',
              timeLeft: 'Tomorrow 10:00 AM',
              difficulty: '18 Students'
            },
            {
              title: 'Chemistry Lab',
              thumbnail: '🧪',
              progress: 55,
              nextLesson: 'Organic Compounds',
              timeLeft: 'Friday 1:00 PM',
              difficulty: '12 Students'
            }
          ]
        };
      case 'admin':
        return {
          title: 'Institution Overview',
          subtitle: 'Monitor academic programs',
          courses: [
            {
              title: 'STEM Program',
              thumbnail: '🔬',
              progress: 88,
              nextLesson: 'Q2 Assessment',
              timeLeft: 'Next Week',
              difficulty: '156 Students'
            },
            {
              title: 'Arts & Humanities',
              thumbnail: '🎨',
              progress: 92,
              nextLesson: 'Portfolio Review',
              timeLeft: '3 days',
              difficulty: '89 Students'
            },
            {
              title: 'Language Studies',
              thumbnail: '🌐',
              progress: 76,
              nextLesson: 'Proficiency Tests',
              timeLeft: '1 week',
              difficulty: '203 Students'
            }
          ]
        };
      default:
        return { title: '', subtitle: '', courses: [] };
    }
  };

  const data = getCoursesData();

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty.includes('Students')) {
      return 'bg-blue-100 text-blue-800';
    }
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
              <span>📚</span>
              <span>{data.title}</span>
            </h2>
            <p className="text-slate-600 text-sm">{data.subtitle}</p>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 text-slate-400 hover:text-teal-600 hover:bg-slate-100 rounded-lg transition-all duration-200">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="p-2 text-slate-400 hover:text-teal-600 hover:bg-slate-100 rounded-lg transition-all duration-200">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.courses.slice(0, 3).map((course, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-white to-slate-50 rounded-xl border border-slate-200 p-4 hover:shadow-lg hover:border-teal-300 transition-all duration-300 cursor-pointer"
            >
              {/* Course Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="text-3xl">{course.thumbnail}</div>
                <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(course.difficulty)}`}>
                  {course.difficulty}
                </span>
              </div>

              {/* Course Info */}
              <h3 className="font-semibold text-slate-800 mb-1 group-hover:text-teal-600 transition-colors">
                {course.title}
              </h3>
              <p className="text-sm text-slate-600 mb-3">
                Next: {course.nextLesson}
              </p>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-teal-400 to-blue-500 rounded-full h-2 transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Time Info */}
              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{course.timeLeft}</span>
                </div>
                <button className="text-teal-600 hover:text-teal-700 font-medium">
                  {userType === 'student' ? 'Continue →' : 'Manage →'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-6 text-center">
          <button className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 px-6 py-2 rounded-lg hover:from-teal-100 hover:to-blue-100 hover:text-teal-700 transition-all duration-200 font-medium">
            View All {userType === 'student' ? 'Courses' : userType === 'educator' ? 'Classes' : 'Programs'} ({data.courses.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCoursesWidget;