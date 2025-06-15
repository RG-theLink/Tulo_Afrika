import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface ELearningToolsWidgetProps {
  userType: 'student' | 'educator' | 'admin';
}

const ELearningToolsWidget = ({ userType }: ELearningToolsWidgetProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const getToolsData = () => {
    // Educational resources with specific URLs as requested
    const educationalResources = [
      {
        name: 'MobyMax Sign In',
        description: 'Personalized Learning Platform',
        icon: '🧮',
        color: 'from-blue-400 to-blue-600',
        category: 'Learning',
        url: 'https://www.mobymax.com/signin'
      },
      {
        name: 'Khan Academy Sign In',
        description: 'Free Educational Resources',
        icon: '🎓',
        color: 'from-green-400 to-green-600',
        category: 'Learning',
        url: 'https://www.khanacademy.org/login'
      },
      {
        name: 'Duolingo Sign In',
        description: 'Language Learning Platform',
        icon: '🦉',
        color: 'from-green-400 to-blue-600',
        category: 'Languages',
        url: 'https://schools.duolingo.com/login'
      },
      {
        name: 'CS First Sign In',
        description: 'Computer Science Education',
        icon: '💻',
        color: 'from-purple-400 to-pink-500',
        category: 'Coding',
        url: 'https://csfirst.withgoogle.com/login'
      },
      {
        name: 'Raspberry Pi Sign In',
        description: 'Computing Education',
        icon: '🍓',
        color: 'from-red-400 to-pink-500',
        category: 'Coding',
        url: 'https://my.raspberrypi.org/login'
      },
      {
        name: 'Typing Club Sign In',
        description: 'Typing Skills Platform',
        icon: '⌨️',
        color: 'from-teal-400 to-blue-500',
        category: 'Skills',
        url: 'https://www.edclub.com/signin'
      }
    ];

    const commonTools = educationalResources;

    const studentTools = [
      ...commonTools
    ];

    const educatorTools = [
      ...commonTools
    ];

    const adminTools = [
      ...commonTools
    ];

    switch (userType) {
      case 'student':
        return { tools: studentTools, title: 'E-Learning Tools' };
      case 'educator':
        return { tools: educatorTools, title: 'Teaching Tools' };
      case 'admin':
        return { tools: adminTools, title: 'Management Tools' };
      default:
        return { tools: commonTools, title: 'Learning Tools' };
    }
  };

  const { tools, title } = getToolsData();
  
  // Get unique categories from tools
  const categories = ['All', ...Array.from(new Set(tools.map(tool => tool.category)))];
  
  const filteredTools = activeCategory === 'All' 
    ? tools 
    : tools.filter(tool => tool.category === activeCategory);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
              <span>🛠️</span>
              <span>{title}</span>
            </h2>
            <p className="text-slate-600 text-sm">One-click access to your {userType === 'admin' ? 'management' : 'learning'} platforms</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-teal-400 to-blue-500 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool, index) => (
            <a
              key={index}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-white to-slate-50 rounded-xl border border-slate-200 p-4 hover:shadow-lg hover:border-teal-300 transition-all duration-300 text-left"
            >
              {/* Tool Icon */}
              <div className={`bg-gradient-to-r ${tool.color} p-3 rounded-xl inline-block mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-2xl">{tool.icon}</span>
              </div>

              {/* Tool Info */}
              <h3 className="font-semibold text-slate-800 mb-1 group-hover:text-teal-600 transition-colors">
                {tool.name}
              </h3>
              <p className="text-xs text-slate-600 mb-3">
                {tool.description}
              </p>

              {/* Launch Button */}
              <div className="flex items-center justify-between">
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                  {tool.category}
                </span>
                <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-teal-600 transition-colors" />
              </div>
            </a>
          ))}
        </div>

        {/* SSO Notice */}
        <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-teal-100 rounded-xl border border-green-200">
          <div className="flex items-center space-x-2">
            <span className="text-lg">🔐</span>
            <div>
              <h4 className="font-medium text-green-800">Single Sign-On Enabled</h4>
              <p className="text-sm text-green-700">
                Access all tools with your Tuto ki Tulo account - no additional logins required!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ELearningToolsWidget;