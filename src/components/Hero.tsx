import React from 'react';
import { Link } from 'react-router-dom';
import CanvasAnimation from './CanvasAnimation';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-teal-50 pt-20">
      {/* Educational Tools Canvas Animation Background */}
      <CanvasAnimation />
      
      {/* Decorative Educational Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-4 rounded-2xl shadow-lg">
          <span className="text-2xl">🎓</span>
        </div>
      </div>
      
      <div className="absolute top-32 right-16 animate-bounce-gentle" style={{ animationDelay: '0.5s' }}>
        <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-3 rounded-xl shadow-lg">
          <span className="text-xl">✨</span>
        </div>
      </div>

      <div className="absolute bottom-32 left-20 animate-float" style={{ animationDelay: '1s' }}>
        <div className="bg-gradient-to-r from-orange-400 to-pink-500 p-3 rounded-xl shadow-lg">
          <span className="text-xl">🚀</span>
        </div>
      </div>

      <div className="absolute bottom-40 right-12 animate-bounce-gentle" style={{ animationDelay: '1.5s' }}>
        <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-4 rounded-2xl shadow-lg">
          <span className="text-2xl">🌟</span>
        </div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-teal-600 bg-clip-text text-transparent mb-6 leading-tight">
            Tuto ki Tulo mwa Afrika
          </h1>
          
          <p className="text-xl sm:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto font-medium">
            A unified learning portal to unlock potential.
          </p>
          
          <p className="text-lg text-slate-500 mb-12 max-w-4xl mx-auto leading-relaxed">
            We bring together the world's best educational tools, premium resources, and AI-powered 
            guidance into a single, personalized platform for every student's journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="flex items-center space-x-4">
              <Link 
                to="/signup/student"
                className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-teal-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-pulse-glow"
              >
                🎓 Start Your Journey
              </Link>
              <span className="text-sm text-slate-500 font-medium">It's Free</span>
            </div>
            <Link 
              to="/signup/school"
              className="border-2 border-teal-400 text-teal-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal-400 hover:text-white transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm"
            >
              🏫 Empower Your School
            </Link>
          </div>

          {/* Learning Stats - Updated to match your requirements */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg">
              <div className="text-3xl mb-2">🌟</div>
              <div className="text-slate-500">Open Source Learning Resources</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg">
              <div className="text-3xl mb-2">💎</div>
              <div className="text-slate-500">Paid Educational & Design Resources</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg">
              <div className="text-3xl mb-2">🏫</div>
              <div className="text-slate-500">Customized LMS</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20 pointer-events-none"></div>
    </section>
  );
};

export default Hero;