import React, { useState } from 'react';
import { MessageSquare, Star, Award, Send, ThumbsUp, ThumbsDown, Smile, Frown, Meh, CheckCircle, X } from 'lucide-react';

const FeedbackPage = () => {
  const [feedbackType, setFeedbackType] = useState<'platform' | 'course' | 'suggestion'>('platform');
  const [rating, setRating] = useState<number>(0);
  const [satisfaction, setSatisfaction] = useState<'positive' | 'neutral' | 'negative' | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [courseSelection, setCourseSelection] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const courses = [
    { id: 'algebra', name: 'Algebra 1', instructor: 'Dr. Sarah Wilson' },
    { id: 'history', name: 'World History', instructor: 'Prof. Michael Chen' },
    { id: 'python', name: 'Introduction to Python', instructor: 'Dr. Emily Rodriguez' },
    { id: 'biology', name: 'Biology Fundamentals', instructor: 'Dr. James Thompson' },
    { id: 'writing', name: 'Creative Writing', instructor: 'Ms. Lisa Parker' }
  ];

  const badges = [
    {
      id: 1,
      name: 'Feedback Champion',
      description: 'Provided 5 pieces of quality feedback',
      icon: '🏆',
      earned: true,
      progress: 100
    },
    {
      id: 2,
      name: 'Idea Generator',
      description: 'Submitted 3 suggestions that were implemented',
      icon: '💡',
      earned: true,
      progress: 100
    },
    {
      id: 3,
      name: 'Course Critic',
      description: 'Provided detailed feedback on 10 courses',
      icon: '🎓',
      earned: false,
      progress: 40
    },
    {
      id: 4,
      name: 'Platform Pioneer',
      description: 'Helped improve the platform with valuable feedback',
      icon: '🚀',
      earned: false,
      progress: 75
    }
  ];

  const feedbackHistory = [
    {
      id: 1,
      type: 'course',
      course: 'Algebra 1',
      rating: 5,
      comment: 'Excellent explanations and practice problems. The interactive exercises really helped me understand the concepts.',
      date: '2024-01-15',
      status: 'reviewed',
      response: 'Thank you for your positive feedback! We\'re glad the interactive exercises were helpful.'
    },
    {
      id: 2,
      type: 'platform',
      feature: 'AI Assistant',
      satisfaction: 'positive',
      comment: 'The AI assistant is incredibly helpful for answering my questions quickly.',
      date: '2024-01-10',
      status: 'reviewed',
      response: 'We appreciate your feedback on the AI assistant. We\'re continuously improving its capabilities.'
    },
    {
      id: 3,
      type: 'suggestion',
      suggestion: 'Add collaborative study rooms',
      comment: 'It would be great to have virtual study rooms where we can collaborate with classmates.',
      date: '2024-01-05',
      status: 'implementing',
      response: 'Great suggestion! We\'re currently working on implementing this feature.'
    }
  ];

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting feedback:', {
      type: feedbackType,
      rating,
      satisfaction,
      text: feedbackText,
      course: courseSelection
    });
    
    // Reset form and show success message
    setRating(0);
    setSatisfaction(null);
    setFeedbackText('');
    setCourseSelection('');
    setShowSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center space-x-3">
            <MessageSquare className="h-8 w-8 text-orange-600" />
            <span>Feedback & Suggestions</span>
          </h1>
          <p className="text-slate-600 mt-2">Share your thoughts and help us improve your learning experience</p>
        </div>
      </div>

      {/* Badges Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
            <Award className="h-6 w-6 text-yellow-600" />
            <span>Feedback Badges</span>
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-6 rounded-xl border transition-all duration-200 ${
                  badge.earned
                    ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-200 shadow-lg'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="text-center">
                  <div className={`text-4xl mb-3 ${badge.earned ? 'animate-bounce' : 'opacity-50'}`}>
                    {badge.icon}
                  </div>
                  <h3 className={`font-semibold mb-2 ${
                    badge.earned ? 'text-yellow-800' : 'text-slate-600'
                  }`}>
                    {badge.name}
                  </h3>
                  <p className={`text-sm mb-3 ${
                    badge.earned ? 'text-yellow-700' : 'text-slate-500'
                  }`}>
                    {badge.description}
                  </p>
                  
                  {badge.earned ? (
                    <div className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                      Earned
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full h-2 transition-all duration-500"
                          style={{ width: `${badge.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-slate-500">
                        {badge.progress}% Complete
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feedback Form */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
            <MessageSquare className="h-6 w-6 text-orange-600" />
            <span>Submit Feedback</span>
          </h2>
        </div>
        <div className="p-6">
          {showSuccess ? (
            <div className="bg-green-100 border border-green-200 rounded-xl p-6 text-center">
              <div className="bg-green-500 p-3 rounded-full inline-block mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Thank You for Your Feedback!</h3>
              <p className="text-green-700 mb-4">
                Your input helps us improve the learning experience for everyone. You've earned points toward your next feedback badge!
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Submit Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitFeedback} className="space-y-6">
              {/* Feedback Type Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-4">What would you like to provide feedback on?</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setFeedbackType('platform')}
                    className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                      feedbackType === 'platform'
                        ? 'bg-gradient-to-r from-orange-100 to-red-100 border-orange-300 text-orange-800'
                        : 'bg-white border-slate-200 hover:border-orange-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">🚀</div>
                      <div>
                        <div className="font-medium">Platform Feedback</div>
                        <div className="text-xs">Website, features, usability</div>
                      </div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeedbackType('course')}
                    className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                      feedbackType === 'course'
                        ? 'bg-gradient-to-r from-blue-100 to-purple-100 border-blue-300 text-blue-800'
                        : 'bg-white border-slate-200 hover:border-blue-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">📚</div>
                      <div>
                        <div className="font-medium">Course Feedback</div>
                        <div className="text-xs">Content, instructors, materials</div>
                      </div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeedbackType('suggestion')}
                    className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                      feedbackType === 'suggestion'
                        ? 'bg-gradient-to-r from-green-100 to-teal-100 border-green-300 text-green-800'
                        : 'bg-white border-slate-200 hover:border-green-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">💡</div>
                      <div>
                        <div className="font-medium">Suggestion</div>
                        <div className="text-xs">New features, improvements</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Course Selection (for course feedback) */}
              {feedbackType === 'course' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Select Course</label>
                  <select
                    value={courseSelection}
                    onChange={(e) => setCourseSelection(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a course</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name} - {course.instructor}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Star Rating (for all feedback types) */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-4">
                  {feedbackType === 'course' 
                    ? 'How would you rate this course?' 
                    : feedbackType === 'platform'
                    ? 'How would you rate the platform?'
                    : 'How important is this suggestion?'
                  }
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`p-3 rounded-lg transition-colors ${
                        rating >= star ? 'text-yellow-500' : 'text-slate-300 hover:text-yellow-400'
                      }`}
                    >
                      <Star className="h-8 w-8 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Satisfaction (for platform feedback) */}
              {feedbackType === 'platform' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-4">How satisfied are you with the platform?</label>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setSatisfaction('positive')}
                      className={`p-4 rounded-xl border transition-all duration-200 flex-1 ${
                        satisfaction === 'positive'
                          ? 'bg-gradient-to-r from-green-100 to-green-200 border-green-300 text-green-800'
                          : 'bg-white border-slate-200 hover:border-green-200 text-slate-700'
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <Smile className={`h-8 w-8 ${satisfaction === 'positive' ? 'text-green-600' : 'text-slate-400'}`} />
                        <span className="font-medium">Satisfied</span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSatisfaction('neutral')}
                      className={`p-4 rounded-xl border transition-all duration-200 flex-1 ${
                        satisfaction === 'neutral'
                          ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300 text-yellow-800'
                          : 'bg-white border-slate-200 hover:border-yellow-200 text-slate-700'
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <Meh className={`h-8 w-8 ${satisfaction === 'neutral' ? 'text-yellow-600' : 'text-slate-400'}`} />
                        <span className="font-medium">Neutral</span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSatisfaction('negative')}
                      className={`p-4 rounded-xl border transition-all duration-200 flex-1 ${
                        satisfaction === 'negative'
                          ? 'bg-gradient-to-r from-red-100 to-red-200 border-red-300 text-red-800'
                          : 'bg-white border-slate-200 hover:border-red-200 text-slate-700'
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <Frown className={`h-8 w-8 ${satisfaction === 'negative' ? 'text-red-600' : 'text-slate-400'}`} />
                        <span className="font-medium">Unsatisfied</span>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Feedback Text */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {feedbackType === 'platform' && 'Tell us about your experience with the platform'}
                  {feedbackType === 'course' && 'What did you think about this course?'}
                  {feedbackType === 'suggestion' && 'What would you like to suggest?'}
                </label>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder={
                    feedbackType === 'platform' ? 'Share your thoughts on the platform features, usability, etc...' :
                    feedbackType === 'course' ? 'Tell us what you liked or didn\'t like about the course...' :
                    'Describe your suggestion in detail...'
                  }
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white py-3 rounded-xl font-semibold hover:from-orange-500 hover:to-red-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Submit Feedback</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Feedback History */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
            <MessageSquare className="h-6 w-6 text-blue-600" />
            <span>Your Previous Feedback</span>
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {feedbackHistory.map((feedback) => (
              <div key={feedback.id} className="bg-slate-50 rounded-xl p-6 hover:bg-slate-100 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`p-2 rounded-lg ${
                        feedback.type === 'platform' ? 'bg-orange-100 text-orange-600' :
                        feedback.type === 'course' ? 'bg-blue-100 text-blue-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {feedback.type === 'platform' && <Smile className="h-5 w-5" />}
                        {feedback.type === 'course' && <Star className="h-5 w-5" />}
                        {feedback.type === 'suggestion' && <MessageSquare className="h-5 w-5" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">
                          {feedback.type === 'platform' && 'Platform Feedback'}
                          {feedback.type === 'course' && `Course Feedback: ${feedback.course}`}
                          {feedback.type === 'suggestion' && 'Suggestion'}
                        </h4>
                        <p className="text-xs text-slate-500">Submitted on {feedback.date}</p>
                      </div>
                    </div>
                    
                    {feedback.type === 'course' && (
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < feedback.rating ? 'text-yellow-500 fill-current' : 'text-slate-300'}`} />
                        ))}
                      </div>
                    )}
                    
                    {feedback.type === 'platform' && (
                      <div className="flex items-center space-x-2 mb-2">
                        {feedback.satisfaction === 'positive' && <ThumbsUp className="h-4 w-4 text-green-500" />}
                        {feedback.satisfaction === 'neutral' && <Meh className="h-4 w-4 text-yellow-500" />}
                        {feedback.satisfaction === 'negative' && <ThumbsDown className="h-4 w-4 text-red-500" />}
                        <span className="text-sm text-slate-600 capitalize">{feedback.satisfaction}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    feedback.status === 'reviewed' ? 'bg-green-100 text-green-800' :
                    feedback.status === 'implementing' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {feedback.status}
                  </div>
                </div>
                
                <div className="text-sm text-slate-600 mb-4">
                  {feedback.comment}
                </div>
                
                {feedback.response && (
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <h5 className="font-medium text-blue-800 mb-1">Response from Team:</h5>
                    <p className="text-sm text-blue-700">{feedback.response}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;