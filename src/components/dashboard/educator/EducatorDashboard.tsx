import React, { useState } from 'react';
import EducatorWelcomeWidget from './EducatorWelcomeWidget';
import MyGroupsWidget from './MyGroupsWidget';
import AnnouncementsWidget from './AnnouncementsWidget';
import EducatorGoalsPage from './EducatorGoalsPage';
import EducatorSchedulePage from './EducatorSchedulePage';
import OnlineClassesPage from './OnlineClassesPage';

interface EducatorDashboardProps {
  activeView?: string;
}

const EducatorDashboard = ({ activeView = 'dashboard' }: EducatorDashboardProps) => {
  switch (activeView) {
    case 'goals':
      return <EducatorGoalsPage />;
    case 'schedule':
      return <EducatorSchedulePage />;
    case 'online-classes':
      return <OnlineClassesPage />;
    case 'dashboard':
    default:
      return (
        <main className="flex-1 p-6 space-y-6">
          <EducatorWelcomeWidget />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MyGroupsWidget />
            <AnnouncementsWidget />
          </div>
        </main>
      );
  }
};

export default EducatorDashboard;