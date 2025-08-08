import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Download, Globe, BookOpen, FileText, Video, Headphones, Image, Calculator, Beaker, Palette, Music, MapPin, Languages, Monitor, Users, Clock, Star, ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const InternationalCurriculumsPage = () => {
  const [ref, isVisible] = useScrollAnimation();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const countries = [
    {
      name: 'United Kingdom',
      flag: '🇬🇧',
      curriculum: 'British National Curriculum',
      keyStages: ['Key Stage 1 (Ages 5-7)', 'Key Stage 2 (Ages 7-11)', 'Key Stage 3 (Ages 11-14)', 'Key Stage 4 (Ages 14-16)'],
      subjects: ['Maths', 'English', 'Science', 'Geography', 'History', 'Art & Design', 'Music', 'PE', 'Computing', 'Languages'],
      description: 'Comprehensive resources aligned with the UK National Curriculum standards and assessment frameworks.',
      color: 'from-blue-400 to-red-400'
    },
    {
      name: 'United States',
      flag: '🇺🇸',
      curriculum: 'Common Core State Standards',
      keyStages: ['Elementary (K-5)', 'Middle School (6-8)', 'High School (9-12)'],
      subjects: ['Mathematics', 'English Language Arts', 'Science', 'Social Studies', 'Arts', 'Physical Education', 'Technology'],
      description: 'Comprehensive resources aligned with Common Core standards and state-specific educational requirements.',
      color: 'from-red-400 to-blue-400',
      available: true
    },
    {
      name: 'Namibia',
      flag: '🇳🇦',
      curriculum: 'Namibian Cambridge Curriculum',
      keyStages: ['Lower Primary (Grades 1-3)', 'Upper Primary (Grades 4-7)', 'Junior Secondary (Grades 8-10)', 'Senior Secondary (Grades 11-12)'],
      subjects: ['English', 'Mathematics', 'Natural Science', 'Social Studies', 'Life Skills', 'Physical Education', 'Arts', 'Local Languages'],
      description: 'Specialized resources for the Namibian Cambridge Curriculum, combining international standards with local educational needs and cultural context.',
      color: 'from-blue-400 to-green-400',
      featured: true
    },
    {
      name: 'Canada',
      flag: '🇨🇦',
      curriculum: 'Provincial Curricula',
      keyStages: ['Elementary (K-8)', 'Secondary (9-12)'],
      subjects: ['Language Arts', 'Mathematics', 'Science', 'Social Studies', 'Arts Education', 'Physical Education', 'Career Education'],
      description: 'Resources adapted for Canadian provincial education standards and bilingual requirements.',
      color: 'from-red-400 to-white'
    },
    {
      name: 'South Africa',
      flag: '🇿🇦',
      curriculum: 'CAPS Curriculum',
      keyStages: ['Foundation Phase (R-3)', 'Intermediate Phase (4-6)', 'Senior Phase (7-9)', 'FET Phase (10-12)'],
      subjects: ['Home Language', 'First Additional Language', 'Mathematics', 'Life Skills', 'Natural Sciences', 'Social Sciences'],
      description: 'Content aligned with the Curriculum and Assessment Policy Statement for South African schools.',
      color: 'from-green-400 to-yellow-400'
    },
    {
      name: 'International',
      flag: '🌍',
      curriculum: 'IB & Cambridge International',
      keyStages: ['Primary Years (3-12)', 'Middle Years (11-16)', 'Diploma Programme (16-19)', 'Cambridge IGCSE'],
      subjects: ['Languages', 'Mathematics', 'Sciences', 'Individuals & Societies', 'Arts', 'Physical & Health Education'],
      description: 'Resources for International Baccalaureate and Cambridge International Education programmes.',
      color: 'from-purple-400 to-pink-400'
    }
  ];

  const resourceTypes = [
    {
      type: 'Lesson Plans',
      icon: FileText,
      emoji: '📋',
      count: '2,500+',
      description: 'Comprehensive lesson plans with learning objectives, activities, and assessments',
      color: 'from-blue-100 to-blue-200',
      borderColor: 'border-blue-300'
    },
    {
      type: 'Interactive Activities',
      icon: Monitor,
      emoji: '💻',
      count: '1,800+',
      description: 'Digital activities, games, and interactive learning experiences',
      color: 'from-purple-100 to-purple-200',
      borderColor: 'border-purple-300'
    },
    {
      type: 'Assessment Tools',
      icon: Calculator,
      emoji: '📊',
      count: '1,200+',
      description: 'Quizzes, tests, rubrics, and formative assessment resources',
      color: 'from-green-100 to-green-200',
      borderColor: 'border-green-300'
    },
    {
      type: 'Video Content',
      icon: Video,
      emoji: '🎥',
      count: '900+',
      description: 'Educational videos, tutorials, and multimedia learning materials',
      color: 'from-red-100 to-red-200',
      borderColor: 'border-red-300'
    },
    {
      type: 'Audio Resources',
      icon: Headphones,
      emoji: '🎧',
      count: '600+',
      description: 'Podcasts, audio books, pronunciation guides, and listening exercises',
      color: 'from-yellow-100 to-yellow-200',
      borderColor: 'border-yellow-300'
    },
    {
      type: 'Visual Materials',
      icon: Image,
      emoji: '🖼️',
      count: '3,000+',
      description: 'Infographics, diagrams, charts, and educational illustrations',
      color: 'from-teal-100 to-teal-200',
      borderColor: 'border-teal-300'
    }
  ];

  const subjects = [
    { name: 'Mathematics', icon: Calculator, emoji: '🔢', resources: 850 },
    { name: 'English/Language Arts', icon: BookOpen, emoji: '📚', resources: 920 },
    { name: 'Science', icon: Beaker, emoji: '🧪', resources: 780 },
    { name: 'Geography', icon: Globe, emoji: '🌍', resources: 450 },
    { name: 'History', icon: Clock, emoji: '📜', resources: 520 },
    { name: 'Art & Design', icon: Palette, emoji: '🎨', resources: 380 },
    { name: 'Music', icon: Music, emoji: '🎵', resources: 290 },
    { name: 'Physical Education', icon: Users, emoji: '⚽', resources: 340 },
    { name: 'Computing', icon: Monitor, emoji: '💻', resources: 420 },
    { name: 'Languages', icon: Languages, emoji: '🗣️', resources: 650 }
  ];

  const selectedCountryData = countries.find(country => country.name === selectedCountry);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-lg text-slate-800">Tuto ki Tulo mwa Afrika</span>
            </Link>

            {/* Back Button */}
            <Link
              to="/"
              className="flex items-center space-x-2 text-slate-600 hover:text-teal-600 transition-colors duration-200 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div
            ref={ref}
            className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-full px-6 py-2 mb-6">
              <Globe className="h-5 w-5 mr-2 text-blue-600" />
              <span className="text-slate-700 font-medium">International Curricula</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent mb-4">
              Curriculum-Aligned Resources
            </h1>
            <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-2 rounded-full inline-block mb-6">
              <span className="font-semibold">🚀 Coming Soon</span>
            </div>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              We're expanding our curriculum-aligned resources to serve schools and institutions worldwide. 
              Starting with the US Common Core standards, we're building a comprehensive library that will grow 
              to include curricula from different countries as we partner with more schools globally.
            </p>
          </div>

          {/* Country Selection */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4 text-center">Choose Your Curriculum</h2>
            <p className="text-slate-600 text-center mb-8 max-w-3xl mx-auto">
              We currently offer comprehensive resources for the US Common Core curriculum. As we expand to partner 
              with schools in different countries, we'll be curating resources for additional national curricula.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {countries.map((country, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedCountry(selectedCountry === country.name ? '' : country.name)}
                  className={`cursor-pointer transition-all duration-300 transform hover:scale-105 relative ${selectedCountry === country.name ? 'ring-2 ring-blue-500' : ''
                    } ${country.featured ? 'ring-2 ring-green-400 shadow-xl' : ''}`}
                >
                  {/* Featured Badge */}
                  {country.featured && (
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-400 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                      ⭐ Featured
                    </div>
                  )}

                  {/* Lock Overlay - Only show for non-available curricula */}
                  {!country.available && (
                    <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center z-20">
                      <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center space-x-2">
                        <span className="text-2xl">🔒</span>
                        <span className="font-semibold text-slate-700">Coming Soon</span>
                      </div>
                    </div>
                  )}

                  {/* Available Badge for US */}
                  {country.available && (
                    <div className="absolute -top-3 -left-3 bg-gradient-to-r from-green-400 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                      ✅ Available Now
                    </div>
                  )}

                  <div className={`bg-gradient-to-r ${country.color} p-6 rounded-t-2xl text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl">{country.flag}</span>
                      <div className="text-right">
                        <h3 className="text-xl font-bold">{country.name}</h3>
                        <p className="text-white/90 text-sm">{country.curriculum}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-b-2xl border border-slate-200 shadow-lg">
                    <p className="text-slate-600 text-sm mb-4">{country.description}</p>
                    <div className="space-y-2">
                      <p className="font-semibold text-slate-800 text-sm">Key Stages:</p>
                      <div className="flex flex-wrap gap-1">
                        {country.keyStages.slice(0, 2).map((stage, stageIndex) => (
                          <span key={stageIndex} className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs">
                            {stage}
                          </span>
                        ))}
                        {country.keyStages.length > 2 && (
                          <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs">
                            +{country.keyStages.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Country Details */}
          {selectedCountryData && (
            <div className="mb-16 bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200 shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <span className="text-6xl">{selectedCountryData.flag}</span>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-800">{selectedCountryData.name}</h3>
                    <p className="text-slate-600">{selectedCountryData.curriculum}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-slate-800 mb-4">Available Subjects</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedCountryData.subjects.map((subject, index) => (
                      <div key={index} className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <span className="text-slate-700 font-medium">{subject}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-slate-800 mb-4">Key Stages</h4>
                  <div className="space-y-3">
                    {selectedCountryData.keyStages.map((stage, index) => (
                      <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                        <span className="text-slate-700 font-medium">{stage}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                {selectedCountryData.available ? (
                  // Available curriculum (US)
                  <div className="bg-gradient-to-r from-green-100 to-teal-100 border border-green-200 rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-center space-x-3 mb-3">
                      <span className="text-3xl">✅</span>
                      <h4 className="text-xl font-bold text-green-800">Resources Available Now</h4>
                    </div>
                    <p className="text-green-700 text-sm mb-4">
                      Access thousands of {selectedCountryData.name} curriculum-aligned resources including lesson plans, 
                      assessments, interactive activities, and multimedia content.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="bg-white/50 p-3 rounded-lg">
                        <span className="font-semibold">📚 Complete Library</span>
                        <p className="text-green-600 mt-1">Thousands of resources ready</p>
                      </div>
                      <div className="bg-white/50 p-3 rounded-lg">
                        <span className="font-semibold">🎯 Standards Aligned</span>
                        <p className="text-green-600 mt-1">Perfect curriculum match</p>
                      </div>
                      <div className="bg-white/50 p-3 rounded-lg">
                        <span className="font-semibold">🚀 Ready to Use</span>
                        <p className="text-green-600 mt-1">Download or integrate now</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Coming soon curricula
                  <div className="bg-gradient-to-r from-orange-100 to-yellow-100 border border-orange-200 rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-center space-x-3 mb-3">
                      <span className="text-3xl">🔒</span>
                      <h4 className="text-xl font-bold text-orange-800">Curriculum Expansion Planned</h4>
                    </div>
                    <p className="text-orange-700 text-sm mb-4">
                      As we expand to partner with schools in {selectedCountryData.name}, we'll be curating comprehensive 
                      resources aligned with the {selectedCountryData.curriculum} standards.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="bg-white/50 p-3 rounded-lg">
                        <span className="font-semibold">🌍 Global Expansion</span>
                        <p className="text-orange-600 mt-1">Growing with school partnerships</p>
                      </div>
                      <div className="bg-white/50 p-3 rounded-lg">
                        <span className="font-semibold">✅ Quality Curation</span>
                        <p className="text-orange-600 mt-1">Expert content development</p>
                      </div>
                      <div className="bg-white/50 p-3 rounded-lg">
                        <span className="font-semibold">🎯 Standards Focus</span>
                        <p className="text-orange-600 mt-1">Perfect alignment planned</p>
                      </div>
                    </div>
                  </div>
                )}

                <button className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  selectedCountryData.available 
                    ? 'bg-gradient-to-r from-green-400 to-teal-500 text-white hover:from-green-500 hover:to-teal-600' 
                    : 'bg-gradient-to-r from-orange-400 to-red-500 text-white hover:from-orange-500 hover:to-red-600'
                }`}>
                  {selectedCountryData.available 
                    ? `🚀 Access ${selectedCountryData.name} Resources` 
                    : `🔮 Coming Soon - ${selectedCountryData.name} Resources`
                  }
                </button>
              </div>
            </div>
          )}

          {/* Resource Types */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Downloadable & Integrable Resources</h2>
              <p className="text-slate-600 max-w-3xl mx-auto">
                Thousands of ready-to-use educational resources that can be downloaded or integrated directly into your learning management system.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resourceTypes.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <div
                    key={index}
                    className={`bg-gradient-to-r ${resource.color} p-6 rounded-2xl border ${resource.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative`}
                  >
                    {/* Lock Overlay */}
                    <div className="absolute inset-0 bg-black/10 rounded-2xl flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg flex items-center space-x-2">
                        <span className="text-lg">🔒</span>
                        <span className="font-semibold text-slate-700 text-sm">Curating</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl opacity-70">{resource.emoji}</span>
                      <div className="bg-white/80 px-3 py-1 rounded-full">
                        <span className="font-bold text-slate-800">{resource.count}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{resource.type}</h3>
                    <p className="text-slate-600 text-sm">{resource.description}</p>

                    <div className="mt-4 flex space-x-2">
                      <button disabled className="flex-1 bg-slate-300 text-slate-500 py-2 px-4 rounded-lg font-medium cursor-not-allowed flex items-center justify-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </button>
                      <button disabled className="flex-1 bg-slate-400 text-slate-600 py-2 px-4 rounded-lg font-medium cursor-not-allowed flex items-center justify-center space-x-2">
                        <ExternalLink className="h-4 w-4" />
                        <span>Integrate</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Subject Browser */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Browse by Subject</h2>
              <p className="text-slate-600 max-w-3xl mx-auto">
                Explore our extensive collection of subject-specific resources, each carefully curated and aligned with international standards.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {subjects.map((subject, index) => {
                const Icon = subject.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center cursor-pointer relative"
                  >
                    {/* Lock Overlay */}
                    <div className="absolute top-2 right-2">
                      <div className="bg-orange-100 border border-orange-300 px-2 py-1 rounded-full">
                        <span className="text-orange-600 text-xs">🔒</span>
                      </div>
                    </div>

                    <span className="text-4xl mb-3 block opacity-70">{subject.emoji}</span>
                    <h3 className="font-bold text-slate-800 mb-2 text-sm">{subject.name}</h3>
                    <div className="bg-gradient-to-r from-orange-100 to-yellow-100 px-3 py-1 rounded-full">
                      <span className="text-orange-700 font-medium text-xs">{subject.resources} being curated</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Coming Soon Banner */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-3xl p-12 text-white shadow-2xl">
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-center space-x-4 mb-6">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <Download className="h-8 w-8" />
                  </div>
                  <div className="bg-white/20 p-3 rounded-xl">
                    <Globe className="h-8 w-8" />
                  </div>
                  <div className="bg-white/20 p-3 rounded-xl">
                    <BookOpen className="h-8 w-8" />
                  </div>
                </div>

                <h2 className="text-4xl font-bold mb-4">🌍 Global Curriculum Expansion</h2>
                <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                  Starting with comprehensive US Common Core resources, we're expanding globally as we partner 
                  with schools in different countries. Each new curriculum will be expertly curated and 
                  perfectly aligned with local educational standards.
                </p>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 max-w-4xl mx-auto">
                  <h3 className="text-xl font-bold mb-4">Our Expansion Strategy</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-3xl mb-2">🏫</div>
                      <p className="font-semibold">School Partnerships</p>
                      <p className="text-white/80">Growing with educational institutions</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-2">📚</div>
                      <p className="font-semibold">Content Curation</p>
                      <p className="text-white/80">Expert resource development</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-2">✅</div>
                      <p className="font-semibold">Quality Assurance</p>
                      <p className="text-white/80">Rigorous review process</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-2">🎯</div>
                      <p className="font-semibold">Local Alignment</p>
                      <p className="text-white/80">Perfect standards match</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                    <h3 className="font-bold text-lg mb-2">10,000+ Resources</h3>
                    <p className="text-white/80 text-sm">Comprehensive library of educational materials</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                    <h3 className="font-bold text-lg mb-2">50+ Countries</h3>
                    <p className="text-white/80 text-sm">Curriculum alignment for global institutions</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                    <h3 className="font-bold text-lg mb-2">Multiple Formats</h3>
                    <p className="text-white/80 text-sm">Download, integrate, or use online</p>
                  </div>
                </div>

                <Link
                  to="/"
                  className="inline-flex items-center space-x-2 bg-white text-orange-500 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-orange-50 transition-all duration-300 transform hover:scale-105"
                >
                  <Star className="h-5 w-5" />
                  <span>Join Our Waitlist</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InternationalCurriculumsPage;