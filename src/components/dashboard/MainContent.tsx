import React from 'react';
import WelcomeWidget from './widgets/WelcomeWidget';
import MyCoursesWidget from './widgets/MyCoursesWidget';
import ELearningToolsWidget from './widgets/ELearningToolsWidget';
import AISearchEngine from './student/AISearchEngine';
import MyCoursesPage from './student/MyCoursesPage';
import GoalsPage from './student/GoalsPage';
import ProgressPage from './student/ProgressPage';
import SchedulePage from './student/SchedulePage';
import FeedbackPage from './student/FeedbackPage';
import EducatorDashboard from './educator/EducatorDashboard';

interface MainContentProps {
  userType: 'student' | 'educator' | 'admin';
  activeView?: string;
}

const MainContent = ({ userType, activeView = 'dashboard' }: MainContentProps) => {
  // Student-specific views
  if (userType === 'student') {
    switch (activeView) {
      case 'ai-search':
        return <AISearchEngine />;
      case 'courses':
        return <MyCoursesPage />;
      case 'goals':
        return <GoalsPage />;
      case 'progress':
        return <ProgressPage />;
      case 'schedule':
        return <SchedulePage />;
      case 'feedback':
        return <FeedbackPage />;
      case 'dashboard':
      default:
        return (
          <main className="flex-1 p-6 space-y-6">
            <WelcomeWidget userType={userType} />
            <MyCoursesWidget userType={userType} />
            <ELearningToolsWidget userType={userType} />
          </main>
        );
    }
  }

  // Educator-specific views
  if (userType === 'educator') {
    return <EducatorDashboard activeView={activeView} />;
  }

  // Default dashboard for admins
  return (
    <main className="flex-1 p-6 space-y-6">
      <WelcomeWidget userType={userType} />
      <MyCoursesWidget userType={userType} />
      <ELearningToolsWidget userType={userType} />
    </main>
  );
};

export default MainContent;