import React from 'react';
import AICoPilotWidget from './widgets/AICoPilotWidget';
import ProgressWidget from './widgets/ProgressWidget';
import AnnouncementsWidget from './widgets/AnnouncementsWidget';

interface RightSidebarProps {
  userType: 'student' | 'educator' | 'admin';
}

const RightSidebar = ({ userType }: RightSidebarProps) => {
  return (
    <aside className="w-80 p-6 space-y-6">
      <AICoPilotWidget userType={userType} />
      <ProgressWidget userType={userType} />
      <AnnouncementsWidget userType={userType} />
    </aside>
  );
};

export default RightSidebar;