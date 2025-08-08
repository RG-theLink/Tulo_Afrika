import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../components/auth/AuthContext';

interface HeaderProps {
  onLoginClick?: () => void;
}

const Header = ({ onLoginClick }: HeaderProps) => {
  const navigate = useNavigate();
  const { user, userType, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
    setShowUserMenu(false);
  };

  const handleDashboardClick = () => {
    if (userType === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
    setShowUserMenu(false);
  };

  return (
    <>
      {/* Demo Mode Banner */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-orange-400 to-red-500 text-white text-center py-1 text-sm font-medium">
        🚀 Demo Mode - Platform launching soon for public access
      </div>
      
      <header 
        className={`fixed top-6 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200' : 'bg-transparent'
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className={`font-bold text-lg transition-colors duration-300 ${
              isScrolled ? 'text-slate-800' : 'text-slate-800'
            }`}>
              Tuto ki Tulo mwa Afrika
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('features')}
              className={`transition-colors duration-200 hover:text-teal-500 ${
                isScrolled ? 'text-slate-600' : 'text-slate-700'
              }`}
            >
              Our Platform
            </button>
            <Link 
              to="/resources"
              className={`transition-colors duration-200 hover:text-teal-500 ${
                isScrolled ? 'text-slate-600' : 'text-slate-700'
              }`}
            >
              Resources
            </Link>
            <Link 
              to="/international-curricula"
              className={`transition-colors duration-200 hover:text-teal-500 ${
                isScrolled ? 'text-slate-600' : 'text-slate-700'
              }`}
            >
              Curricula
            </Link>
            <Link 
              to="/pricing"
              className={`transition-colors duration-200 hover:text-teal-500 ${
                isScrolled ? 'text-slate-600' : 'text-slate-700'
              }`}
            >
              Pricing
            </Link>
            <button 
              onClick={() => scrollToSection('schools')}
              className={`transition-colors duration-200 hover:text-teal-500 ${
                isScrolled ? 'text-slate-600' : 'text-slate-700'
              }`}
            >
              Partner Schools
            </button>
            <button 
              onClick={() => scrollToSection('educators')}
              className={`transition-colors duration-200 hover:text-teal-500 ${
                isScrolled ? 'text-slate-600' : 'text-slate-700'
              }`}
            >
              For Schools
            </button>
            <button 
              onClick={() => scrollToSection('footer')}
              className={`transition-colors duration-200 hover:text-teal-500 ${
                isScrolled ? 'text-slate-600' : 'text-slate-700'
              }`}
            >
              Contact
            </button>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-teal-500 hover:to-blue-600 transition-all duration-200 flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span>My Account</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                    <button
                      onClick={handleDashboardClick}
                      className="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                    >
                      <User className="h-4 w-4" />
                      <span>Dashboard</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={onLoginClick}
                className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:from-teal-500 hover:to-blue-600 transition-all duration-200 transform hover:scale-105"
              >
                Login
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-colors duration-200 hover:text-teal-500 ${
              isScrolled ? 'text-slate-600' : 'text-slate-700'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md rounded-lg mt-2 p-4 border border-slate-200 shadow-lg">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-slate-600 hover:text-teal-500 transition-colors duration-200 text-left"
              >
                Our Platform
              </button>
              <Link 
                to="/resources"
                className="text-slate-600 hover:text-teal-500 transition-colors duration-200 text-left"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <Link 
                to="/international-curricula"
                className="text-slate-600 hover:text-teal-500 transition-colors duration-200 text-left"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                International Curricula
              </Link>
              <Link 
                to="/pricing"
                className="text-slate-600 hover:text-teal-500 transition-colors duration-200 text-left"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <button 
                onClick={() => scrollToSection('schools')}
                className="text-slate-600 hover:text-teal-500 transition-colors duration-200 text-left"
              >
                Partner Schools
              </button>
              <button 
                onClick={() => scrollToSection('educators')}
                className="text-slate-600 hover:text-teal-500 transition-colors duration-200 text-left"
              >
                For Schools
              </button>
              <button 
                onClick={() => scrollToSection('footer')}
                className="text-slate-600 hover:text-teal-500 transition-colors duration-200 text-left"
              >
                Contact
              </button>
              
              {user ? (
                <>
                  <button
                    onClick={handleDashboardClick}
                    className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:from-teal-500 hover:to-blue-600 transition-all duration-200 text-center"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-700 transition-colors duration-200 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button 
                  onClick={onLoginClick}
                  className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:from-teal-500 hover:to-blue-600 transition-all duration-200 text-center"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
    </>
  );
};

export default Header;