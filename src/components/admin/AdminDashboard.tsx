import React, { useState } from 'react';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import StudentManagement from './StudentManagement';
import EducatorManagement from './EducatorManagement';
import ResourceManagement from './ResourceManagement';
import SubscriptionManagement from './SubscriptionManagement';
import AdminOverview from './AdminOverview';
import SystemSettings from './SystemSettings';
import { useAuth } from '../auth/AuthContext';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('overview');

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return <AdminOverview />;
      case 'students':
        return <StudentManagement />;
      case 'educators':
        return <EducatorManagement />;
      case 'resources':
        return <ResourceManagement />;
      case 'subscriptions':
        return <SubscriptionManagement />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-orange-50">
      <AdminHeader onLogout={onLogout} />
      
      <div className="flex pt-16">
        <AdminSidebar 
          activeView={activeView}
          onViewChange={setActiveView}
        />
        
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;