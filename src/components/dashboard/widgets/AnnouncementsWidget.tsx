import React from 'react';
import { Bell, Calendar, Star, Gift } from 'lucide-react';

interface AnnouncementsWidgetProps {
  userType: 'student' | 'educator' | 'admin';
}

const AnnouncementsWidget = ({ userType }: AnnouncementsWidgetProps) => {
  const getAnnouncements = () => {
    const commonAnnouncements = [
      {
        id: 1,
        type: 'feature',
        icon: Star,
        emoji: '✨',
        title: 'New AI Tutor Features',
        message: 'Enhanced math problem solving and step-by-step explanations now available!',
        time: '2 hours ago',
        color: 'from-purple-100 to-pink-100',
        borderColor: 'border-purple-200'
      },
      {
        id: 4,
        type: 'maintenance',
        icon: Bell,
        emoji: '🔧',
        title: 'Scheduled Maintenance',
        message: 'Platform will be briefly unavailable Sunday 2-4 AM for updates.',
        time: '3 days ago',
        color: 'from-orange-100 to-yellow-100',
        borderColor: 'border-orange-200'
      }
    ];

    switch (userType) {
      case 'student':
        return [
          ...commonAnnouncements,
          {
            id: 2,
            type: 'event',
            icon: Calendar,
            emoji: '📅',
            title: 'Virtual Science Fair',
            message: 'Join our online science fair next Friday. Submit your projects by Thursday!',
            time: '1 day ago',
            color: 'from-blue-100 to-teal-100',
            borderColor: 'border-blue-200'
          },
          {
            id: 3,
            type: 'reward',
            icon: Gift,
            emoji: '🎁',
            title: 'Achievement Unlocked',
            message: 'Congratulations! You\'ve earned the "Consistent Learner" badge for your 7-day streak.',
            time: '2 days ago',
            color: 'from-green-100 to-teal-100',
            borderColor: 'border-green-200'
          }
        ];
      case 'educator':
        return [
          ...commonAnnouncements,
          {
            id: 2,
            type: 'event',
            icon: Calendar,
            emoji: '📋',
            title: 'Faculty Meeting',
            message: 'Monthly faculty meeting scheduled for Friday at 3 PM in the main conference room.',
            time: '1 day ago',
            color: 'from-blue-100 to-teal-100',
            borderColor: 'border-blue-200'
          },
          {
            id: 3,
            type: 'reward',
            icon: Gift,
            emoji: '🏆',
            title: 'Teaching Excellence Award',
            message: 'Congratulations! You\'ve been nominated for the Teaching Excellence Award.',
            time: '2 days ago',
            color: 'from-green-100 to-teal-100',
            borderColor: 'border-green-200'
          }
        ];
      case 'admin':
        return [
          ...commonAnnouncements,
          {
            id: 2,
            type: 'event',
            icon: Calendar,
            emoji: '📊',
            title: 'Quarterly Review',
            message: 'Q3 performance review meeting scheduled for next Tuesday at 10 AM.',
            time: '1 day ago',
            color: 'from-blue-100 to-teal-100',
            borderColor: 'border-blue-200'
          },
          {
            id: 3,
            type: 'reward',
            icon: Gift,
            emoji: '📈',
            title: 'Enrollment Milestone',
            message: 'Congratulations! We\'ve reached 1,500 active students this semester.',
            time: '2 days ago',
            color: 'from-green-100 to-teal-100',
            borderColor: 'border-green-200'
          }
        ];
      default:
        return commonAnnouncements;
    }
  };

  const announcements = getAnnouncements();

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
            <div className="bg-gradient-to-r from-orange-400 to-red-500 p-2 rounded-lg">
              <Bell className="h-5 w-5 text-white" />
            </div>
            <span>Announcements</span>
          </h2>
          <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {announcements.length}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {announcements.map((announcement) => {
            const Icon = announcement.icon;
            return (
              <div
                key={announcement.id}
                className={`bg-gradient-to-r ${announcement.color} p-4 rounded-xl border ${announcement.borderColor} hover:shadow-md transition-all duration-200 cursor-pointer`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <span className="text-2xl">{announcement.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-slate-800 mb-1">
                      {announcement.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-2 leading-relaxed">
                      {announcement.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        {announcement.time}
                      </span>
                      <button className="text-xs text-slate-600 hover:text-slate-800 font-medium">
                        Read more →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

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