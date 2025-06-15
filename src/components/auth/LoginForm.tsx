import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GraduationCap, Eye, EyeOff, User, Lock, ChevronDown, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUserType, setSelectedUserType] = useState<'student' | 'educator' | 'admin'>('student');
  const [showDropdown, setShowDropdown] = useState(false);

  // Get the redirect path from location state or default to '/'
  const from = (location.state as any)?.from || '/';

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

  const handleDemoLogin = async (userType: 'student' | 'educator' | 'admin') => {
    setSelectedUserType(userType);
    setIsLoading(true);
    setError(null);
    
    let demoEmail = '';
    let demoPassword = '';
    
    if (userType === 'student') {
      demoEmail = 'demo.student@tutokitulo.africa';
      demoPassword = 'student123';
    } else if (userType === 'educator') {
      demoEmail = 'demo.educator@tutokitulo.africa';
      demoPassword = 'educator123';
    } else {
      demoEmail = 'admin@tutokitulo.africa';
      demoPassword = 'admin123';
    }
    
    try {
      const { error } = await signIn(demoEmail, demoPassword);
      if (error) {
        setError(error.message);
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message);
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const selectedType = userTypes.find(type => type.value === selectedUserType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
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
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
              <p className="font-medium">Login failed</p>
              <p className="text-sm">{error}</p>
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

          {/* Demo Credentials */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h3 className="text-sm font-medium text-slate-700 mb-4 text-center">
              🎯 Demo Credentials
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => handleDemoLogin('student')}
                className="w-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 text-purple-700 py-2 px-4 rounded-lg hover:from-purple-200 hover:to-pink-200 transition-all duration-200 text-sm"
              >
                <div className="flex items-center justify-center space-x-2">
                  <span>🎓</span>
                  <span>Student Demo</span>
                </div>
                <div className="text-xs text-purple-600 mt-1">
                  demo.student@tutokitulo.africa / student123
                </div>
              </button>
              
              <button
                onClick={() => handleDemoLogin('educator')}
                className="w-full bg-gradient-to-r from-blue-100 to-teal-100 border border-blue-200 text-blue-700 py-2 px-4 rounded-lg hover:from-blue-200 hover:to-teal-200 transition-all duration-200 text-sm"
              >
                <div className="flex items-center justify-center space-x-2">
                  <span>👨‍🏫</span>
                  <span>Educator Demo</span>
                </div>
                <div className="text-xs text-blue-600 mt-1">
                  demo.educator@tutokitulo.africa / educator123
                </div>
              </button>

              <button
                onClick={() => handleDemoLogin('admin')}
                className="w-full bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200 text-orange-700 py-2 px-4 rounded-lg hover:from-orange-200 hover:to-red-200 transition-all duration-200 text-sm"
              >
                <div className="flex items-center justify-center space-x-2">
                  <span>🛡️</span>
                  <span>Admin Demo</span>
                </div>
                <div className="text-xs text-orange-600 mt-1">
                  admin@tutokitulo.africa / admin123
                </div>
              </button>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center text-sm text-slate-500">
            <Link to="/forgot-password" className="hover:text-teal-600 transition-colors">Forgot password?</Link>
            <span className="mx-2">•</span>
            <Link to="/signup" className="hover:text-teal-600 transition-colors">Create account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;