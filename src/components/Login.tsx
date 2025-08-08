import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Eye, EyeOff, User, Lock, ChevronDown, Shield, ArrowLeft } from 'lucide-react';
import { useAuth } from './auth/AuthContext';

interface LoginProps {
  onLogin?: (userType: 'student' | 'educator' | 'admin') => void;
  onBackToHome?: () => void;
}

const Login = ({ onLogin, onBackToHome }: LoginProps) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedUserType, setSelectedUserType] = useState<'student' | 'educator' | 'admin'>('student');
  const [showDropdown, setShowDropdown] = useState(false);

  const userTypes = [
    { 
      value: 'student' as const, 
      label: 'Student', 
      icon: '🎓',
      description: 'Access courses and learning tools'
    },
    { 
      value: 'educator' as const, 
      label: 'Educator', 
      icon: '👨‍🏫',
      description: 'Manage students and curriculum'
    },
    { 
      value: 'admin' as const, 
      label: 'System Admin', 
      icon: '🛡️',
      description: 'Platform administration'
    }
  ];



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const user = await login(email, password);
      if (user) {
        if (onLogin) {
          onLogin(user.userType);
        } else {
          // Navigate based on user type
          if (user.userType === 'admin') {
            navigate('/admin');
          } else {
            navigate('/dashboard');
          }
        }
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const selectedType = userTypes.find(type => type.value === selectedUserType);

  const handleBackToHome = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Back to Home Button */}
        <div className="mb-6">
          <button
            onClick={handleBackToHome}
            className="flex items-center space-x-2 text-slate-600 hover:text-teal-600 transition-colors duration-200 group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium">Back to Home</span>
          </button>
        </div>
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-3 rounded-xl">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-800">Tuto ki Tulo</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-teal-600 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-600">Sign in to continue your learning journey</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-xl p-8">
          {error && (
            <div className="mb-6 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Dropdown */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Login As
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-white"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{selectedType?.icon}</span>
                    <div className="text-left">
                      <div className="font-medium text-slate-800">{selectedType?.label}</div>
                      <div className="text-xs text-slate-500">{selectedType?.description}</div>
                    </div>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-10">
                    {userTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => {
                          setSelectedUserType(type.value);
                          setShowDropdown(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-slate-50 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl ${
                          selectedUserType === type.value ? 'bg-teal-50 text-teal-700' : 'text-slate-700'
                        }`}
                      >
                        <span className="text-xl">{type.icon}</span>
                        <div className="text-left">
                          <div className="font-medium">{type.label}</div>
                          <div className="text-xs text-slate-500">{type.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white py-3 rounded-xl font-semibold hover:from-teal-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                `Sign In as ${selectedType?.label}`
              )}
            </button>
          </form>



          {/* Footer Links */}
          <div className="mt-6 text-center text-sm text-slate-500">
            <a href="#" className="hover:text-teal-600 transition-colors">Forgot password?</a>
            <span className="mx-2">•</span>
            <a href="#" className="hover:text-teal-600 transition-colors">Create account</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;