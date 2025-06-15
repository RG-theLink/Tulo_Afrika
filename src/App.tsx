import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import ResourcesPage from './pages/ResourcesPage';
import SecurityDetailsPage from './pages/SecurityDetailsPage';
import SchoolDetailsPage from './pages/SchoolDetailsPage';
import PartnershipDetailsPage from './pages/PartnershipDetailsPage';
import StudentSignupForm from './components/forms/StudentSignupForm';
import SchoolSignupForm from './components/forms/SchoolSignupForm';
import MessagingPage from './pages/MessagingPage';
import { useAuth } from './components/auth/AuthContext';
import DashboardLayout from './components/dashboard/DashboardLayout';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/security-details" element={<SecurityDetailsPage />} />
        <Route path="/school-details" element={<SchoolDetailsPage />} />
        <Route path="/partnership-details" element={<PartnershipDetailsPage />} />
        <Route path="/signup/student" element={<StudentSignupForm />} />
        <Route path="/signup/school" element={<SchoolSignupForm />} />
        <Route path="/messaging" element={<MessagingPage />} />
        <Route path="/dashboard" element={<DashboardLayout onLogout={handleLogout} />} />
        <Route path="/admin" element={<AdminDashboard onLogout={handleLogout} />} />
      </Routes>
    </Router>
  );
}

export default App;