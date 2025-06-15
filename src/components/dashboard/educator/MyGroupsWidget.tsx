import React, { useState } from 'react';
import { Users, Search, ChevronRight, BookOpen, Clock, Calendar, Star } from 'lucide-react';

const MyGroupsWidget = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const groups = [
    {
      id: 1,
      name: 'Mathematics Grade 10',
      students: 24,
      nextClass: 'Today, 2:00 PM',
      pendingAssignments: 6,
      averageScore: 87,
      icon: '🔢'
    },
    {
      id: 2,
      name: 'Physics Grade 11',
      students: 18,
      nextClass: 'Tomorrow, 10:00 AM',
      pendingAssignments: 4,
      averageScore: 82,
      icon: '⚛️'
    },
    {
      id: 3,
      name: 'Chemistry Lab',
      students: 12,
      nextClass: 'Friday, 1:00 PM',
      pendingAssignments: 0,
      averageScore: 90,
      icon: '🧪'
    }
  ];

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
            <Users className="h-5 w-5 text-teal-600" />
            <span>My Groups & Students</span>
          </h2>
          <span className="bg-teal-100 text-teal-800 text-xs rounded-full px-2 py-1">
            {groups.length} Groups
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search groups..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Groups List */}
        <div className="space-y-4">
          {filteredGroups.map((group) => (
            <div 
              key={group.id}
              className="group bg-gradient-to-br from-white to-slate-50 rounded-xl border border-slate-200 p-4 hover:shadow-lg hover:border-teal-300 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{group.icon}</div>
                  <div>
                    <h3 className="font-semibold text-slate-800 group-hover:text-teal-600 transition-colors">
                      {group.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{group.students} students</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4" />
                        <span>{group.averageScore}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-teal-600 transition-colors" />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="bg-slate-100 p-2 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-teal-600" />
                    <span className="text-slate-700">{group.nextClass}</span>
                  </div>
                </div>
                <div className="bg-slate-100 p-2 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm">
                    <BookOpen className="h-4 w-4 text-teal-600" />
                    <span className="text-slate-700">{group.pendingAssignments} pending</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-6 text-center">
          <button className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 px-6 py-2 rounded-lg hover:from-teal-100 hover:to-blue-100 hover:text-teal-700 transition-all duration-200 font-medium">
            View All Groups ({groups.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyGroupsWidget;