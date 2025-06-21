import React from 'react';
import { Users, BookOpen, TrendingUp, Shield } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Educators = () => {
  // Keep the hook but don't render the component content
  useScrollAnimation();

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
    <section id="educators" className="hidden">
    </section>
  );
};

export default Educators;