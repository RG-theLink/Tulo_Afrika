import React from 'react';
import { TrendingUp, Target, Award, Calendar } from 'lucide-react';

interface ProgressWidgetProps {
  userType: 'student' | 'educator' | 'admin';
}

const ProgressWidget = ({ userType }: ProgressWidgetProps) => {
  const getProgressData = () => {
    switch (userType) {
      case 'student':
        return {
          title: 'My Progress',
          weeklyGoal: 85,
          currentProgress: 72,
          streak: 7,
          completedLessons: 12,
          totalLessons: 15,
          achievements: [
            { name: 'Math Master', icon: '🔢', earned: true },
            { name: 'Speed Reader', icon: '📚', earned: true },
            { name: 'Code Warrior', icon: '💻', earned: false },
            { name: 'Science Explorer', icon: '🔬', earned: false }
          ],
          stats: [
            { label: 'Streak', value: '🔥 7 days', color: 'from-orange-100 to-red-100', borderColor: 'border-orange-200' },
            { label: 'This Week', value: '72%', color: 'from-green-100 to-teal-100', borderColor: 'border-green-200' }
          ],
          schedule: [
            { subject: 'Math Practice', time: '2:00 PM' },
            { subject: 'History Reading', time: '4:30 PM' }
          ]
        };
      case 'educator':
        return {
          title: 'Teaching Progress',
          weeklyGoal: 90,
          currentProgress: 85,
          streak: 12,
          completedLessons: 18,
          totalLessons: 20,
          achievements: [
            { name: 'Great Mentor', icon: '👨‍🏫', earned: true },
            { name: 'Innovator', icon: '💡', earned: true },
            { name: 'Tech Savvy', icon: '💻', earned: true },
            { name: 'Student Favorite', icon: '⭐', earned: false }
          ],
          stats: [
            { label: 'Teaching Days', value: '🔥 12 days', color: 'from-orange-100 to-red-100', borderColor: 'border-orange-200' },
            { label: 'Avg Score', value: '92%', color: 'from-green-100 to-teal-100', borderColor: 'border-green-200' }
          ],
          schedule: [
            { subject: 'Grade 10 Math', time: '2:00 PM' },
            { subject: 'Grade 11 Physics', time: '10:00 AM' }
          ]
        };
      case 'admin':
        return {
          title: 'Institution Metrics',
          weeklyGoal: 95,
          currentProgress: 88,
          streak: 30,
          completedLessons: 245,
          totalLessons: 280,
          achievements: [
            { name: 'Excellence Leader', icon: '🏆', earned: true },
            { name: 'Growth Driver', icon: '📈', earned: true },
            { name: 'Innovation Hub', icon: '🚀', earned: true },
            { name: 'Top Performer', icon: '⭐', earned: false }
          ],
          stats: [
            { label: 'Uptime', value: '🔥 30 days', color: 'from-orange-100 to-red-100', borderColor: 'border-orange-200' },
            { label: 'Satisfaction', value: '98%', color: 'from-green-100 to-teal-100', borderColor: 'border-green-200' }
          ],
          schedule: [
            { subject: 'Board Meeting', time: '10:00 AM' },
            { subject: 'Staff Review', time: '3:00 PM' }
          ]
        };
      default:
        return null;
    }
  };

  const progressData = getProgressData();
  if (!progressData) return null;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
          <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-2 rounded-lg">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <span>{progressData.title}</span>
        </h2>
      </div>

      <div className="p-6 space-y-6">
        {/* Weekly Goal */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">
              {userType === 'student' ? 'Weekly Goal' : userType === 'educator' ? 'Teaching Goal' : 'Performance Goal'}
            </span>
            <span className="text-sm text-slate-600">{progressData.currentProgress}%</span>
          </div>
          <div className="bg-slate-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-teal-400 to-blue-500 rounded-full h-3 transition-all duration-500"
              style={{ width: `${progressData.currentProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {progressData.completedLessons} of {progressData.totalLessons} {userType === 'admin' ? 'tasks' : 'lessons'} completed
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {progressData.stats.map((stat, index) => (
            <div key={index} className={`bg-gradient-to-r ${stat.color} p-4 rounded-xl border ${stat.borderColor}`}>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm font-medium text-slate-800">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold text-slate-900">{stat.value.replace('🔥 ', '')}</div>
              {stat.value.includes('🔥') && <div className="text-xs text-slate-700">streak</div>}
              {stat.value.includes('%') && <div className="text-xs text-slate-700">completed</div>}
            </div>
          ))}
        </div>

        {/* Recent Achievements */}
        <div>
          <h3 className="text-sm font-medium text-slate-700 mb-3 flex items-center space-x-2">
            <Award className="h-4 w-4" />
            <span>Achievements</span>
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {progressData.achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  achievement.earned
                    ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-200'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{achievement.icon}</div>
                  <div className={`text-xs font-medium ${
                    achievement.earned ? 'text-yellow-800' : 'text-slate-500'
                  }`}>
                    {achievement.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center space-x-2 mb-3">
            <Calendar className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">
              {userType === 'student' ? "Today's Schedule" : userType === 'educator' ? "Today's Classes" : "Today's Agenda"}
            </span>
          </div>
          <div className="space-y-2">
            {progressData.schedule.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-blue-700">{item.subject}</span>
                <span className="text-blue-600">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressWidget;