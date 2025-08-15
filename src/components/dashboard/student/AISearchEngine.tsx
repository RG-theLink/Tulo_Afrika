import React, { useState, useEffect } from 'react';
import { Search, Send, Sparkles, MessageCircle, BookOpen, Calculator, Globe, Lightbulb, Clock, Star } from 'lucide-react';
import { ai } from '../../../lib/api';

const AISearchEngine = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{id: string, type: 'user' | 'ai', content: string, timestamp: Date}>>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const [activeTab, setActiveTab] = useState<'search' | 'chat'>('search');
  const [sessionId] = useState(() => `session-${Date.now()}`);
  const [recentSearches, setRecentSearches] = useState<Array<{query: string, time: string}>>([]);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const quickSearches = [
    { query: 'Explain photosynthesis', icon: '🌱', category: 'Biology' },
    { query: 'Solve quadratic equations', icon: '🔢', category: 'Mathematics' },
    { query: 'World War 2 timeline', icon: '🏛️', category: 'History' },
    { query: 'Python programming basics', icon: '🐍', category: 'Computer Science' },
    { query: 'Shakespeare sonnets analysis', icon: '📖', category: 'Literature' },
    { query: 'Chemical bonding types', icon: '⚗️', category: 'Chemistry' },
    { query: 'French verb conjugation', icon: '🇫🇷', category: 'Languages' },
    { query: 'Art history Renaissance', icon: '🎨', category: 'Art' }
  ];

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setSearchQuery(query);
    setSearchResults(null);
    
    try {
      const response = await ai.search(query);
      setSearchResults(response.results);
      
      // Save to recent searches
      const newSearch = { query, time: 'Just now' };
      const updated = [newSearch, ...recentSearches.filter(s => s.query !== query)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults('Sorry, there was an error processing your search. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleChatMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: message,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setIsChatting(true);

    try {
      const response = await ai.chat(message, sessionId);
      
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: 'ai' as const,
        content: response.response,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorResponse = {
        id: (Date.now() + 1).toString(),
        type: 'ai' as const,
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsChatting(false);
    }
  };

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  const formatSearchResults = (results: string) => {
    // Split results into paragraphs for better formatting
    const paragraphs = results.split('\n\n');
    return paragraphs.map((paragraph, index) => (
      <div key={index} className="mb-4">
        {paragraph.split('\n').map((line, lineIndex) => (
          <p key={lineIndex} className="mb-2 text-slate-700 leading-relaxed">
            {line}
          </p>
        ))}
      </div>
    ));
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-3 rounded-xl">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-purple-600 bg-clip-text text-transparent">
            AI Learning Assistant
          </h1>
        </div>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Your intelligent study companion. Search for any topic, ask questions, and get personalized explanations tailored to your learning level.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-2 shadow-lg">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('search')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'search'
                  ? 'bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:text-purple-600 hover:bg-slate-50'
              }`}
            >
              <Search className="h-5 w-5" />
              <span>AI Search</span>
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'chat'
                  ? 'bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:text-purple-600 hover:bg-slate-50'
              }`}
            >
              <MessageCircle className="h-5 w-5" />
              <span>AI Chat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Tab */}
      {activeTab === 'search' && (
        <div className="space-y-8">
          {/* Main Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                placeholder="Ask me anything... What would you like to learn today?"
                className="w-full pl-12 pr-16 py-4 text-lg border border-slate-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-lg"
              />
              <button
                onClick={() => handleSearch(searchQuery)}
                disabled={isSearching || !searchQuery.trim()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-400 to-pink-500 text-white p-3 rounded-xl hover:from-purple-500 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Search className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Search Results */}
          {searchResults && !isSearching && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-8 shadow-lg">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center space-x-2">
                  <Sparkles className="h-6 w-6 text-purple-500" />
                  <span>Search Results for: "{searchQuery}"</span>
                </h3>
                <div className="prose prose-slate max-w-none">
                  {formatSearchResults(searchResults)}
                </div>
              </div>
            </div>
          )}

          {/* Quick Search Suggestions */}
          {!searchResults && (
            <div className="max-w-6xl mx-auto">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
                <Lightbulb className="h-6 w-6 text-yellow-500" />
                <span>Quick Search Suggestions</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickSearches.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickSearch(item.query)}
                    className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200 hover:border-purple-300 transition-all duration-200 hover:transform hover:scale-105 hover:shadow-lg text-left"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-slate-700 font-medium">{item.query}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {recentSearches.length > 0 && !searchResults && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
                <Clock className="h-6 w-6 text-blue-500" />
                <span>Recent Searches</span>
              </h2>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickSearch(search.query)}
                    className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      <Search className="h-5 w-5 text-slate-400" />
                      <span className="text-slate-700">{search.query}</span>
                    </div>
                    <span className="text-sm text-slate-500">{search.time}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results Area */}
          {isSearching && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-8 shadow-lg text-center">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-lg font-medium text-slate-700">Searching for "{searchQuery}"...</span>
                </div>
                <p className="text-slate-500">AI is analyzing your query and finding the best educational resources...</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Chat Tab */}
      {activeTab === 'chat' && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-6 text-white">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">AI Learning Chat</h3>
                  <p className="text-white/90">Ask questions and get instant, personalized explanations</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {chatMessages.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl inline-block mb-4">
                    <MessageCircle className="h-12 w-12 text-purple-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-2">Start a conversation!</h4>
                  <p className="text-slate-600">Ask me anything about your studies. I'm here to help you learn and understand complex topics.</p>
                </div>
              ) : (
                chatMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-purple-400 to-pink-500 text-white' 
                        : 'bg-slate-100 text-slate-800'
                    }`}>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-2 ${message.type === 'user' ? 'text-white/80' : 'text-slate-500'}`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
              {isChatting && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 px-4 py-3 rounded-2xl">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="border-t border-slate-200 p-4">
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Type your question here..."
                  className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  disabled={isChatting}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !isChatting) {
                      handleChatMessage(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                    if (!isChatting && input.value.trim()) {
                      handleChatMessage(input.value);
                      input.value = '';
                    }
                  }}
                  disabled={isChatting}
                  className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-purple-500 hover:to-pink-600 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Features Info */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl border border-blue-200 p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">AI Learning Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-4 rounded-xl inline-block mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-blue-800 mb-2">Personalized Explanations</h3>
              <p className="text-blue-700 text-sm">Get explanations tailored to your learning level and style</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-4 rounded-xl inline-block mb-4">
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-purple-800 mb-2">Step-by-Step Solutions</h3>
              <p className="text-purple-700 text-sm">Break down complex problems into manageable steps</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-pink-400 to-red-500 p-4 rounded-xl inline-block mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-pink-800 mb-2">Instant Feedback</h3>
              <p className="text-pink-700 text-sm">Get immediate responses and clarifications on any topic</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISearchEngine;