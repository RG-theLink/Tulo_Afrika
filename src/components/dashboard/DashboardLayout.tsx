import React, { useState, useEffect } from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import MainContent from './MainContent';
import RightSidebar from './RightSidebar';
import MessagingPlatform from './messaging/MessagingPlatform';
import { useAuth } from '../auth/AuthContext';

interface DashboardLayoutProps {
  onLogout: () => void;
}

const DashboardLayout = ({ onLogout }: DashboardLayoutProps) => {
  const { userType } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');

  // Listen for custom events to navigate between views
  useEffect(() => {
    const handleNavigateToAISearch = () => {
      setActiveView('ai-search');
    };

    window.addEventListener('navigate-to-ai-search', handleNavigateToAISearch);
    
    return () => {
      window.removeEventListener('navigate-to-ai-search', handleNavigateToAISearch);
    };
  }, []);

  // Use the user type from auth context or default to student
  const currentUserType = userType || 'student';

  const renderMainContent = () => {
    switch (activeView) {
      case 'messages':
        return <MessagingPlatform userType={currentUserType} />;
      case 'dashboard':
      case 'ai-search':
      case 'courses':
      case 'goals':
      case 'progress':
      case 'schedule':
      case 'feedback':
      default:
        return (
          <div className="flex-1 flex">
            <MainContent userType={currentUserType} activeView={activeView} />
            {activeView === 'dashboard' && <RightSidebar userType={currentUserType} />}
    signOut();
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      <DashboardHeader userType={currentUserType} onLogout={onLogout} />
      
      <div className="flex pt-16">
        <DashboardSidebar 
          userType={currentUserType} 
          activeView={activeView}
          onViewChange={setActiveView}
        )
        />
        
        <div className="flex-1 flex">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
    }
  }
}
    }
  }
}