import React, { useState } from 'react';
import { Send, Sparkles, MessageCircle, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AICoPilotWidgetProps {
  userType: 'student' | 'educator' | 'admin';
}

const AICoPilotWidget = ({ userType }: AICoPilotWidgetProps) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getSuggestions = () => {
    switch (userType) {
      case 'student':
        return [
          "Explain photosynthesis",
          "Help me with quadratic equations",
          "What's the capital of Kenya?",
          "How do I write a thesis statement?"
        ];
      case 'educator':
        return [
          "Create a lesson plan for algebra",
          "Generate quiz questions for history",
          "Suggest classroom activities",
          "Help with student assessment"
        ];
      case 'admin':
        return [
          "Show enrollment statistics",
          "Generate performance report",
          "Analyze budget allocation",
          "Review staff productivity"
        ];
      default:
        return [];
    }
  };

  const suggestions = getSuggestions();

  const getTitle = () => {
    switch (userType) {
      case 'student':
        return 'AI Co-Pilot';
      case 'educator':
        return 'Teaching Assistant';
      case 'admin':
        return 'Admin Assistant';
      default:
        return 'AI Assistant';
    }
  };

  const getSubtitle = () => {
    switch (userType) {
      case 'student':
        return 'Your personal learning assistant';
      case 'educator':
        return 'Your teaching support companion';
      case 'admin':
        return 'Your management support tool';
      default:
        return 'Your AI assistant';
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      setIsTyping(true);
      // Simulate AI response
      setTimeout(() => {
        setIsTyping(false);
        setMessage('');
      }, 2000);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200 shadow-lg">
      <div className="p-6 border-b border-purple-200">
        <h2 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
          <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-2 rounded-lg">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span>{getTitle()}</span>
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          {getSubtitle()}
        </p>
      </div>

      <div className="p-6">
        {/* Chat Input */}
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={`Ask a question about your ${userType === 'student' ? 'studies' : userType === 'educator' ? 'teaching' : 'institution'}...`}
              className="w-full pl-4 pr-12 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80"
            />
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-400 to-pink-500 text-white p-2 rounded-lg hover:from-purple-500 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Typing Indicator */}
        {isTyping && (
          <div className="mb-4 p-3 bg-white/80 rounded-xl border border-purple-200">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-1 rounded-full">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm text-slate-600">AI is thinking...</span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Suggestions */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-slate-700 mb-3">Quick Questions:</h3>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setMessage(suggestion)}
              className="w-full text-left p-3 bg-white/60 hover:bg-white/80 rounded-lg border border-purple-100 hover:border-purple-300 transition-all duration-200 text-sm text-slate-700 hover:text-purple-700"
            >
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4 text-purple-400" />
                <span>{suggestion}</span>
              </div>
            </button>
          ))}
        </div>

        {/* AI Features */}
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border border-purple-200">
          <h4 className="font-medium text-purple-800 mb-2 flex items-center space-x-2">
            <span>✨</span>
            <span>AI Features</span>
          </h4>
          <ul className="text-sm text-purple-700 space-y-1">
            {userType === 'student' && (
              <>
                <li>• Instant homework help</li>
                <li>• Concept explanations</li>
                <li>• Study plan suggestions</li>
                <li>• Progress insights</li>
              </>
            )}
            {userType === 'educator' && (
              <>
                <li>• Lesson plan generation</li>
                <li>• Assessment creation</li>
                <li>• Student progress analysis</li>
                <li>• Teaching recommendations</li>
              </>
            )}
            {userType === 'admin' && (
              <>
                <li>• Performance analytics</li>
                <li>• Resource optimization</li>
                <li>• Trend analysis</li>
                <li>• Strategic insights</li>
              </>
            )}
          </ul>
        </div>

        {/* Link to Full AI Search */}
        {userType === 'student' && (
          <div className="mt-4 text-center">
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('navigate-to-ai-search'))}
              className="text-purple-600 hover:text-purple-800 font-medium text-sm flex items-center justify-center space-x-2 mx-auto"
            >
              <Brain className="h-4 w-4" />
              <span>Open Full AI Search Engine</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AICoPilotWidget;