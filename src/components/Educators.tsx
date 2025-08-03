import React from 'react';
import { Users, BookOpen, TrendingUp, Shield } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Educators = () => {
  const [ref, isVisible] = useScrollAnimation();

  const benefits = [
    {
      icon: Users,
      emoji: '👥',
      title: 'Student Management',
      description: 'Comprehensive dashboard to track and manage student progress across all subjects.',
      gradient: 'from-blue-400 to-purple-500'
    },
    {
      icon: BookOpen,
      emoji: '📖',
      title: 'Curriculum Tools',
      description: 'Aligned with international standards and customizable to your institution\'s needs.',
      gradient: 'from-teal-400 to-blue-500'
    },
    {
      icon: TrendingUp,
      emoji: '📊',
      title: 'Analytics & Insights',
      description: 'Detailed performance analytics to identify learning gaps and optimize outcomes.',
      gradient: 'from-orange-400 to-pink-500'
    },
    {
      icon: Shield,
      emoji: '🔒',
      title: 'Secure & Compliant',
      description: 'FERPA compliant with enterprise-grade security for student data protection.',
      gradient: 'from-purple-400 to-pink-500'
    }
  ];

  return (
    <section id="educators" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Educational Badge */}
          <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-full px-6 py-2 mb-6">
            <span className="text-xl mr-2">🏫</span>
            <span className="text-slate-700 font-medium">For Educational Institutions</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 to-purple-600 bg-clip-text text-transparent mb-6">
            Designed for Educators, Built for Institutions.
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Custom packages are available for homeschools, schools, and other institutions, 
            offering comprehensive student management, curriculum tools, and bulk pricing solutions 
            tailored to your specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className={`text-center transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 hover:border-purple-300 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl">
                  <div className={`bg-gradient-to-r ${benefit.gradient} p-4 rounded-2xl inline-block mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl">{benefit.emoji}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div 
          className={`text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-gradient-to-r from-white/80 to-purple-50/80 backdrop-blur-sm p-12 rounded-3xl border border-purple-200 max-w-4xl mx-auto shadow-xl">
            {/* Institution Icons */}
            <div className="flex justify-center space-x-4 mb-6">
              <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-3 rounded-xl">
                <span className="text-2xl">🎓</span>
              </div>
              <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-3 rounded-xl">
                <span className="text-2xl">🏫</span>
              </div>
              <div className="bg-gradient-to-r from-orange-400 to-pink-500 p-3 rounded-xl">
                <span className="text-2xl">📚</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Ready to Transform Your Institution's Learning Experience?
            </h3>
            <p className="text-slate-600 mb-8 text-lg">
              Let's discuss how we can customize our platform to meet your specific educational goals 
              and help your students achieve their full potential.
            </p>
            <button className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:from-purple-500 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              🏫 Empower Your School
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Educators;