import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowLeft, User, Mail, Lock, Eye, EyeOff, BookOpen, Target, Brain, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gradeLevel: '',
    learningGoals: [] as string[],
    subjects: [] as string[],
    learningStyle: '',
    timeCommitment: '',
    parentEmail: '',
    userType: 'student' as 'student' | 'educator' | 'admin'
  });

  const learningGoals = [
    { id: 'improve-grades', label: 'Improve my grades', icon: '📈' },
    { id: 'test-prep', label: 'Prepare for tests/exams', icon: '📝' },
    { id: 'learn-new-skills', label: 'Learn new skills', icon: '🚀' },
    { id: 'homework-help', label: 'Get homework help', icon: '📚' },
    { id: 'college-prep', label: 'Prepare for college', icon: '🎓' },
    { id: 'career-exploration', label: 'Explore career options', icon: '💼' }
  ];

  const subjects = [
    { id: 'math', label: 'Mathematics', icon: '🔢' },
    { id: 'science', label: 'Science', icon: '🔬' },
    { id: 'english', label: 'English/Language Arts', icon: '📖' },
    { id: 'history', label: 'History/Social Studies', icon: '🏛️' },
    { id: 'languages', label: 'Foreign Languages', icon: '🌍' },
    { id: 'arts', label: 'Arts & Music', icon: '🎨' },
    { id: 'technology', label: 'Technology/Coding', icon: '💻' },
    { id: 'other', label: 'Other', icon: '📋' }
  ];

  const learningStyles = [
    { id: 'visual', label: 'Visual (I learn best with images, diagrams, and videos)', icon: '👁️' },
    { id: 'auditory', label: 'Auditory (I learn best by listening and discussing)', icon: '👂' },
    { id: 'kinesthetic', label: 'Hands-on (I learn best by doing and practicing)', icon: '✋' },
    { id: 'reading', label: 'Reading/Writing (I learn best through text and notes)', icon: '📝' }
  ];

  const timeCommitments = [
    { id: '30min', label: '30 minutes per day', icon: '⏰' },
    { id: '1hour', label: '1 hour per day', icon: '🕐' },
    { id: '2hours', label: '2 hours per day', icon: '🕑' },
    { id: 'weekends', label: 'Mainly on weekends', icon: '📅' },
    { id: 'flexible', label: 'Flexible schedule', icon: '🔄' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].includes(value)
        ? (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
        : [...(prev[field as keyof typeof prev] as string[]), value]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setIsLoading(false);
      return;
    }
    
    try {
      // Prepare metadata
      const metadata = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        age: formData.age,
        grade_level: formData.gradeLevel,
        learning_goals: formData.learningGoals,
        subjects: formData.subjects,
        learning_style: formData.learningStyle,
        time_commitment: formData.timeCommitment,
        parent_email: formData.parentEmail || null
      };
      
      const { error } = await signUp(
        formData.email, 
        formData.password, 
        formData.userType,
        metadata
      );
      
      if (error) {
        setError(error.message);
      } else {
        // Redirect to success page or login
        navigate('/signup-success');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && 
               formData.password && formData.confirmPassword && formData.age && formData.gradeLevel;
      case 2:
        return formData.learningGoals.length > 0 && formData.subjects.length > 0;
      case 3:
        return formData.learningStyle && formData.timeCommitment;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-slate-600 hover:text-teal-600 transition-colors mb-6">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-3 rounded-xl">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-800">Tuto ki Tulo</span>
          </div>
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-teal-600 bg-clip-text text-transparent mb-2">
            Start Your Learning Journey
          </h1>
          <p className="text-slate-600">Let's personalize your educational experience</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
            <p className="font-medium">Registration failed</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">Step {currentStep} of 3</span>
            <span className="text-sm text-slate-500">{Math.round((currentStep / 3) * 100)}% Complete</span>
          </div>
          <div className="bg-slate-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-teal-400 to-blue-500 rounded-full h-2 transition-all duration-500"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-xl p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-xl inline-block mb-4">
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2">Tell us about yourself</h2>
                  <p className="text-slate-600">We'll use this information to create your personalized learning profile</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                        placeholder="Create a password"
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
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                        placeholder="Confirm your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Age</label>
                    <select
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      required
                    >
                      <option value="">Select your age</option>
                      {Array.from({ length: 50 }, (_, i) => i + 5).map(age => (
                        <option key={age} value={age}>{age} years old</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Grade Level</label>
                    <select
                      value={formData.gradeLevel}
                      onChange={(e) => handleInputChange('gradeLevel', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      required
                    >
                      <option value="">Select grade level</option>
                      <option value="elementary">Elementary (K-5)</option>
                      <option value="middle">Middle School (6-8)</option>
                      <option value="high">High School (9-12)</option>
                      <option value="college">College/University</option>
                      <option value="adult">Adult Learner</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Parent/Guardian Email (if under 18)</label>
                  <input
                    type="email"
                    value={formData.parentEmail}
                    onChange={(e) => handleInputChange('parentEmail', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    placeholder="Parent/guardian email (optional)"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Learning Goals & Subjects */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl inline-block mb-4">
                    <Target className="h-8 w-8 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2">What are your learning goals?</h2>
                  <p className="text-slate-600">Select all that apply to help us customize your experience</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-4">Learning Goals</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {learningGoals.map((goal) => (
                      <button
                        key={goal.id}
                        type="button"
                        onClick={() => handleArrayToggle('learningGoals', goal.id)}
                        className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                          formData.learningGoals.includes(goal.id)
                            ? 'bg-gradient-to-r from-teal-100 to-blue-100 border-teal-300 text-teal-800'
                            : 'bg-white border-slate-200 hover:border-teal-200 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{goal.icon}</span>
                          <span className="font-medium">{goal.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-4">Subjects of Interest</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {subjects.map((subject) => (
                      <button
                        key={subject.id}
                        type="button"
                        onClick={() => handleArrayToggle('subjects', subject.id)}
                        className={`p-4 rounded-xl border transition-all duration-200 text-center ${
                          formData.subjects.includes(subject.id)
                            ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300 text-purple-800'
                            : 'bg-white border-slate-200 hover:border-purple-200 text-slate-700'
                        }`}
                      >
                        <div className="text-2xl mb-2">{subject.icon}</div>
                        <div className="text-sm font-medium">{subject.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Learning Preferences */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="bg-gradient-to-r from-green-100 to-teal-100 p-4 rounded-xl inline-block mb-4">
                    <Brain className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2">How do you learn best?</h2>
                  <p className="text-slate-600">Help us personalize your learning experience</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-4">Learning Style</label>
                  <div className="space-y-3">
                    {learningStyles.map((style) => (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => handleInputChange('learningStyle', style.id)}
                        className={`w-full p-4 rounded-xl border transition-all duration-200 text-left ${
                          formData.learningStyle === style.id
                            ? 'bg-gradient-to-r from-blue-100 to-purple-100 border-blue-300 text-blue-800'
                            : 'bg-white border-slate-200 hover:border-blue-200 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{style.icon}</span>
                          <span className="font-medium">{style.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-4">Time Commitment</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {timeCommitments.map((time) => (
                      <button
                        key={time.id}
                        type="button"
                        onClick={() => handleInputChange('timeCommitment', time.id)}
                        className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                          formData.timeCommitment === time.id
                            ? 'bg-gradient-to-r from-orange-100 to-yellow-100 border-orange-300 text-orange-800'
                            : 'bg-white border-slate-200 hover:border-orange-200 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{time.icon}</span>
                          <span className="font-medium">{time.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50 transition-all duration-200"
                >
                  Previous
                </button>
              )}
              
              <div className="ml-auto">
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="px-8 py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-xl font-semibold hover:from-teal-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!isStepValid() || isLoading}
                    className="px-8 py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-xl font-semibold hover:from-teal-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating Account...</span>
                      </div>
                    ) : (
                      'Start Learning!'
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-slate-500">
          Already have an account? 
          <Link to="/login" className="text-teal-600 hover:text-teal-700 ml-1">Sign in here</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;