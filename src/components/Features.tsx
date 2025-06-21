import React from 'react';
import { Brain, Code, Palette, BookOpen, Shield, Users, Database, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Features = () => {
  const [ref, isVisible] = useScrollAnimation();

  const features = [
    {
      icon: BookOpen,
      emoji: '🌟',
      title: 'Open Source Learning Resources',
      description: 'Access free, community-driven educational resources that are always updating with the latest content.',
      gradient: 'from-green-400 to-teal-500'
    },
    {
      icon: Sparkles,
      emoji: '💎',
      title: 'Paid Educational & Design Resources',
      description: 'Premium tools and content for enhanced learning experiences and professional development.',
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      icon: Database,
      emoji: '🏫',
      title: 'Customized LMS',
      description: 'Fully tailored Learning Management Systems designed specifically for your institution\'s unique needs.',
      gradient: 'from-blue-400 to-indigo-500'
    },
    {
      icon: Brain,
      emoji: '🧠',
      title: 'AI Learning Co-Pilot',
      description: 'Personalized AI assistance that adapts to your learning style and provides instant help when needed.',
      gradient: 'from-teal-400 to-blue-500'
    },
    {
      icon: Shield,
      emoji: '🔒',
      title: 'Secure Google Accounts',
      description: 'Personalized Google accounts with advanced security and educational content filtering.',
      gradient: 'from-green-400 to-blue-500'
    },
    {
      icon: Users,
      emoji: '👨‍👩‍👧‍👦',
      title: 'Parental Controls',
      description: 'Comprehensive management tools to ensure safe and focused learning environments.',
      gradient: 'from-indigo-400 to-purple-500'
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-white via-slate-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Educational Badge */}
          <div className="inline-flex items-center bg-gradient-to-r from-teal-100 to-blue-100 border border-teal-200 rounded-full px-6 py-2 mb-6">
            <span className="text-xl mr-2">🛠️</span>
            <span className="text-slate-700 font-medium">Powerful Learning Tools</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 to-teal-600 bg-clip-text text-transparent mb-6">
            All Your Tools, One Login.
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Everything you need for a comprehensive learning experience, unified in one powerful platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-200 hover:border-teal-300 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-xl ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`bg-gradient-to-r ${feature.gradient} p-4 rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-3xl">{feature.emoji}</div>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Progress indicator */}
                <div className="mt-6 bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${feature.gradient} rounded-full transition-all duration-1000 ${
                    isVisible ? 'w-full' : 'w-0'
                  }`} style={{ transitionDelay: `${index * 200 + 500}ms` }}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summarized Security Section */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-white/80 to-green-50/80 backdrop-blur-sm rounded-3xl border border-green-200 shadow-xl p-8">
            <div className="text-center mb-6">
              <div className="flex justify-center space-x-4 mb-6">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 p-3 rounded-xl">
                  <span className="text-2xl">🔒</span>
                </div>
                <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-3 rounded-xl">
                  <span className="text-2xl">👨‍👩‍👧‍👦</span>
                </div>
                <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-3 rounded-xl">
                  <span className="text-2xl">🎓</span>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-4">
                Safe & Secure Learning Environment
              </h3>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-6">
                Every student receives personalized Google accounts with advanced security measures and 
                intelligent content filtering, giving parents peace of mind while maintaining full access to educational resources.
              </p>
            </div>
          </div>
        </div>

        {/* Educational Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-2">🌟</div>
            <div className="text-3xl font-bold text-slate-800">Always</div>
            <div className="text-slate-600">Updating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">💎</div>
            <div className="text-3xl font-bold text-slate-800">Premium</div>
            <div className="text-slate-600">Quality</div>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">🏫</div>
            <div className="text-3xl font-bold text-slate-800">Custom</div>
            <div className="text-slate-600">Solutions</div>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">🔒</div>
            <div className="text-3xl font-bold text-slate-800">100%</div>
            <div className="text-slate-600">Secure</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;