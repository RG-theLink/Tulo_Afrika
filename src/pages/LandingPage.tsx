import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import RegisteredSchools from '../components/RegisteredSchools';
import Educators from '../components/Educators';
import Footer from '../components/Footer';
import Login from '../components/Login';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';
import { useAuth } from '../components/auth/AuthContext';
import StudentProjects from '../components/StudentProjects';

const LandingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userType, isAuthenticated, logout } = useAuth();
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'dashboard' | 'admin-login' | 'admin-dashboard'>('landing');
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  // Check if we should show dashboard based on navigation state or authentication
  useEffect(() => {
    if (location.state?.showDashboard) {
      setCurrentView('dashboard');
      if (location.state?.userType) {
        // This is for navigation from other pages
      }
    } else if (isAuthenticated && user) {
      // If user is authenticated, show appropriate dashboard
      if (user.userType === 'admin') {
        setCurrentView('admin-dashboard');
      } else {
        setCurrentView('dashboard');
      }
    }
  }, [location.state, isAuthenticated, user]);

  // Temporarily disable ElevenLabs Convai widget to prevent fetch errors
  // The widget can be re-enabled once a valid agent ID is configured
  useEffect(() => {
    if (currentView === 'landing') {
      // Commenting out the widget loading to prevent console errors
      // Uncomment and update agent ID when ready to use
      /*
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      script.type = 'text/javascript';
      
      script.onload = () => {
        setWidgetLoaded(true);
      };
      
      script.onerror = () => {
        console.warn('ElevenLabs Convai widget failed to load. This is optional and does not affect core functionality.');
        setWidgetLoaded(false);
      };
      
      document.body.appendChild(script);

      return () => {
        try {
          document.body.removeChild(script);
        } catch (error) {
          // Script might have already been removed
        }
      };
      */
    }
  }, [currentView]);

  const handleLoginClick = () => {
    setCurrentView('login');
  };

  const handleAdminLoginClick = () => {
    setCurrentView('admin-login');
  };

  const handleLogin = (type: 'student' | 'educator' | 'admin') => {
    if (type === 'admin') {
      setCurrentView('admin-dashboard');
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleAdminLogin = () => {
    setCurrentView('admin-dashboard');
  };

  const handleLogout = () => {
    logout();
    setCurrentView('landing');
    navigate('/');
  };

  if (currentView === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  if (currentView === 'admin-login') {
    return <AdminLogin onLogin={handleAdminLogin} />;
  }

  if (currentView === 'dashboard') {
    return <DashboardLayout onLogout={handleLogout} />;
  }

  if (currentView === 'admin-dashboard') {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-teal-50">
      <Header onLoginClick={handleLoginClick} />
      <Hero />
      <Features />
      <RegisteredSchools />
      <Educators />
      <StudentProjects />
      <Footer />
      
      {/* Admin Access Button - Hidden but accessible */}
      <button
        onClick={handleAdminLoginClick}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-orange-400 to-red-500 text-white p-3 rounded-full shadow-lg hover:from-orange-500 hover:to-red-600 transition-all duration-200 opacity-20 hover:opacity-100"
        title="Admin Access"
      >
        🛡️
      </button>

      {/* ElevenLabs Convai Widget - Temporarily disabled to prevent fetch errors */}
      {/* Uncomment when a valid agent ID is available */}
      {/*
      {widgetLoaded && (
        <elevenlabs-convai agent-id="agent_01jz167zg7fng8q2cwqrh8hkpg"></elevenlabs-convai>
      )}
      */}
    </div>
  );
};

export default LandingPage;