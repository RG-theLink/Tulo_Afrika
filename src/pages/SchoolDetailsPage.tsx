import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  ArrowLeft, 
  ExternalLink,
  Users,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  Star,
  Award,
  Globe,
  Phone,
  Mail,
  Download,
  Play
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const SchoolDetailsPage = () => {
  const [ref, isVisible] = useScrollAnimation();

  const schoolDetails = {
    name: 'Swakopmund Christian Academy',
    website: 'https://swakopca.com/',
    enrollmentUrl: 'https://its.elearning-swakopca.edu.na/register',
    location: 'Swakopmund, Namibia',
    established: '1987',
    students: '50+',
    grades: 'Pre-K to Grade 12',
    logo: '🏫',
    tagline: 'Unleashing the Potential of Every Student',
    subtitle: 'Experience the Best Hybrid Learning',
    description: 'Swakopmund Christian Academy is dedicated to providing an exceptional e-learning platform tailored to address the unique needs of their students. Their comprehensive curriculum and advanced communication tools, powered by Tuto ki Tulo mwa Afrika, empower learners to bridge their learning gaps and reach their full potential.',
    gradient: 'from-teal-400 to-blue-500',
    contact: {
      phone: '+264 64 404 605',
      email: 'info@tuloafrika.tech',
      address: 'Online'
    }
  };

  const fullPrograms = [
    {
      category: 'Core Academic Programs',
      programs: [
        {
          name: 'American Curriculum Standards',
          description: 'Comprehensive K-12 education following American educational standards and best practices.',
          features: ['Common Core aligned', 'STEM integration', 'Critical thinking focus', 'College preparation']
        },
        {
          name: 'GED Preparation & Testing',
          description: 'Complete General Educational Development program with official testing capabilities.',
          features: ['Comprehensive prep courses', 'Practice tests', 'Official testing center', 'Flexible scheduling']
        },
        {
          name: 'SAT Preparation & Testing',
          description: 'Standardized test preparation for college admissions with official testing services.',
          features: ['Expert instruction', 'Practice exams', 'Score improvement strategies', 'College counseling']
        },
        {
          name: 'American Diploma Pathway',
          description: 'Clear pathway to earning an American high school diploma recognized internationally.',
          features: ['Credit tracking', 'Graduation requirements', 'Transcript services', 'College readiness']
        }
      ]
    },
    {
      category: 'Technology Integration',
      programs: [
        {
          name: 'Digital Learning Integration',
          description: 'Seamless integration of technology into all aspects of the learning experience.',
          features: ['1:1 device program', 'Digital literacy', 'Online collaboration', 'Tech support']
        },
        {
          name: 'Comprehensive E-Learning Platform',
          description: 'State-of-the-art learning management system powered by Tuto ki Tulo mwa Afrika.',
          features: ['Interactive lessons', 'Progress tracking', 'AI tutoring', 'Parent portal']
        }
      ]
    },
    {
      category: 'Specialized Programs',
      programs: [
        {
          name: 'English as a Second Language (ESL)',
          description: 'Specialized support for students whose first language is not English.',
          features: ['Language assessment', 'Individualized instruction', 'Cultural integration', 'Academic support']
        },
        {
          name: 'Special Education Services',
          description: 'Comprehensive support for students with diverse learning needs.',
          features: ['IEP development', 'Assistive technology', 'Specialized instruction', 'Family support']
        },
        {
          name: 'Gifted and Talented Program',
          description: 'Advanced learning opportunities for academically gifted students.',
          features: ['Accelerated curriculum', 'Independent projects', 'Mentorship programs', 'Competition preparation']
        }
      ]
    }
  ];

  const aftercareDetails = {
    available: true,
    hours: '2:00 PM - 5:00 PM',
    description: 'Professional aftercare services designed to support working parents while providing a safe, nurturing environment for students.',
    activities: [
      {
        category: 'Academic Support',
        items: ['Homework assistance', 'Study groups', 'Tutoring sessions', 'Reading programs']
      },
      {
        category: 'Physical Activities',
        items: ['Sports activities', 'Outdoor play', 'Team games', 'Fitness programs']
      },
      {
        category: 'Creative Arts',
        items: ['Arts & crafts', 'Music activities', 'Drama club', 'Creative writing']
      },
      {
        category: 'Life Skills',
        items: ['Leadership development', 'Social skills', 'Character building', 'Community service']
      }
    ],
    staff: {
      ratio: '1:10',
      qualifications: 'All aftercare staff are certified educators with background checks and specialized training in child development.',
      supervision: 'Continuous adult supervision with structured activities and free play time.'
    },
    enrollment: {
      process: 'Separate enrollment required for aftercare services',
      pricing: 'Competitive rates with family discounts available',
      flexibility: 'Full-time or part-time options available'
    }
  };

  const achievements = [
    {
      title: 'Academic Excellence Award',
      year: '2023',
      description: 'Recognized for outstanding academic performance and student achievement.',
      icon: Award
    },
    {
      title: 'Technology Integration Leader',
      year: '2022',
      description: 'Leading the way in educational technology integration in Namibia.',
      icon: Globe
    },
    {
      title: 'Community Impact Recognition',
      year: '2023',
      description: 'Acknowledged for positive impact on the local Swakopmund community.',
      icon: Users
    },
    {
      title: 'Student Success Stories',
      year: 'Ongoing',
      description: '95% of graduates successfully transition to higher education or career paths.',
      icon: Star
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Parent',
      content: 'SCA has transformed my daughter\'s learning experience. The personalized attention and innovative teaching methods have helped her excel academically.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Graduate',
      content: 'The American curriculum and college preparation at SCA gave me the foundation I needed to succeed at university. I\'m grateful for the excellent education I received.',
      rating: 5
    },
    {
      name: 'Dr. Emily Wilson',
      role: 'Education Consultant',
      content: 'SCA represents the future of education in Africa. Their integration of technology and commitment to excellence is truly impressive.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
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
              className="flex items-center space-x-2 text-slate-600 hover:text-teal-600 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* School Header */}
          <div 
            ref={ref}
            className={`transition-all duration-1000 mb-16 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className={`bg-gradient-to-r ${schoolDetails.gradient} rounded-3xl p-12 text-white relative overflow-hidden shadow-2xl`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full"></div>
                <div className="absolute bottom-10 left-10 w-24 h-24 bg-white rounded-full"></div>
              </div>
              
              <div className="relative z-10">
                <div className="text-center">
                  <div className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    {schoolDetails.subtitle}
                  </div>
                  <h1 className="text-4xl lg:text-6xl font-bold mb-4 leading-tight">
                    {schoolDetails.name}
                  </h1>
                  <p className="text-2xl text-white/90 mb-6">
                    {schoolDetails.tagline}
                  </p>
                  <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-8">
                    {schoolDetails.description}
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href={schoolDetails.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <Globe className="h-5 w-5" />
                      <span>Visit Website</span>
                      <ExternalLink className="h-5 w-5" />
                    </a>
                    <a
                      href={schoolDetails.enrollmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-teal-600 px-8 py-3 rounded-xl font-semibold hover:bg-teal-50 transition-all duration-200 transform hover:scale-105"
                    >
                      Enroll Now
                    </a>
                  </div>
                </div>

                {/* School Stats */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                    <Users className="h-8 w-8 mx-auto mb-3" />
                    <div className="text-2xl font-bold">{schoolDetails.students}</div>
                    <div className="text-sm text-white/80">Students</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                    <GraduationCap className="h-8 w-8 mx-auto mb-3" />
                    <div className="text-2xl font-bold">{schoolDetails.grades}</div>
                    <div className="text-sm text-white/80">Grade Levels</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                    <Calendar className="h-8 w-8 mx-auto mb-3" />
                    <div className="text-2xl font-bold">Est. {schoolDetails.established}</div>
                    <div className="text-sm text-white/80">Founded</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                    <span className="text-4xl block mb-3">🇺🇸</span>
                    <div className="text-2xl font-bold">American</div>
                    <div className="text-sm text-white/80">Curriculum</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Programs */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Academic Programs</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Comprehensive educational programs designed to prepare students for success in higher education and beyond
              </p>
            </div>

            {fullPrograms.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">{category.category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {category.programs.map((program, programIndex) => (
                    <div key={programIndex} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                      <h4 className="text-xl font-semibold text-slate-800 mb-3">{program.name}</h4>
                      <p className="text-slate-600 mb-4 leading-relaxed">{program.description}</p>
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium text-slate-700">Key Features:</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {program.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center space-x-2 text-sm text-slate-600">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Aftercare Details */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">SCA Aftercare Program</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Professional aftercare services providing a safe, nurturing environment for students after school hours
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Program Overview */}
              <div>
                <div className="bg-gradient-to-r from-green-100 to-teal-100 p-6 rounded-2xl border border-green-200 mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock className="h-6 w-6 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-green-800">Program Hours</h3>
                      <p className="text-green-700">{aftercareDetails.hours}</p>
                    </div>
                  </div>
                  <p className="text-green-700 text-sm">{aftercareDetails.description}</p>
                </div>

                <div className="space-y-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 p-6">
                    <h4 className="font-semibold text-slate-800 mb-3">Staff Qualifications</h4>
                    <div className="space-y-3 text-sm text-slate-600">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span><strong>Student-to-Staff Ratio:</strong> {aftercareDetails.staff.ratio}</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{aftercareDetails.staff.qualifications}</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{aftercareDetails.staff.supervision}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 p-6">
                    <h4 className="font-semibold text-slate-800 mb-3">Enrollment Information</h4>
                    <div className="space-y-3 text-sm text-slate-600">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>{aftercareDetails.enrollment.process}</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>{aftercareDetails.enrollment.pricing}</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>{aftercareDetails.enrollment.flexibility}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activities */}
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-6">Aftercare Activities</h3>
                <div className="space-y-6">
                  {aftercareDetails.activities.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 p-6">
                      <h4 className="font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                        <span className="text-lg">
                          {category.category === 'Academic Support' && '📚'}
                          {category.category === 'Physical Activities' && '⚽'}
                          {category.category === 'Creative Arts' && '🎨'}
                          {category.category === 'Life Skills' && '🌟'}
                        </span>
                        <span>{category.category}</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {category.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center space-x-2 text-sm text-slate-600">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Achievements & Recognition</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Celebrating our commitment to educational excellence and community impact
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => {
                const AchievementIcon = achievement.icon;
                return (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-xl inline-block mb-4">
                      <AchievementIcon className="h-8 w-8 text-yellow-600" />
                    </div>
                    <h4 className="font-semibold text-slate-800 mb-2">{achievement.title}</h4>
                    <p className="text-sm text-slate-500 mb-2">{achievement.year}</p>
                    <p className="text-sm text-slate-600">{achievement.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">What Our Community Says</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Hear from parents, students, and education professionals about their experience with SCA
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 p-6 shadow-lg">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, starIndex) => (
                      <Star key={starIndex} className="h-5 w-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-slate-800">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact & Enrollment */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-white/80 to-teal-50/80 backdrop-blur-sm p-12 rounded-3xl border border-teal-200 shadow-xl">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Ready to Join Our Community?
              </h3>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Take the next step in your child's educational journey. Contact us to learn more or begin the enrollment process.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/60 p-6 rounded-xl">
                  <Phone className="h-8 w-8 mx-auto mb-3 text-teal-600" />
                  <h4 className="font-semibold text-slate-800 mb-2">Call Us</h4>
                  <p className="text-slate-600">{schoolDetails.contact.phone}</p>
                </div>
                <div className="bg-white/60 p-6 rounded-xl">
                  <Mail className="h-8 w-8 mx-auto mb-3 text-teal-600" />
                  <h4 className="font-semibold text-slate-800 mb-2">Email Us</h4>
                  <p className="text-slate-600">{schoolDetails.contact.email}</p>
                </div>
                <div className="bg-white/60 p-6 rounded-xl">
                  <MapPin className="h-8 w-8 mx-auto mb-3 text-teal-600" />
                  <h4 className="font-semibold text-slate-800 mb-2">Visit Us</h4>
                  <p className="text-slate-600">{schoolDetails.contact.address}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={schoolDetails.enrollmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-teal-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <GraduationCap className="h-6 w-6" />
                  <span>Start Enrollment</span>
                  <ExternalLink className="h-5 w-5" />
                </a>
                <button className="border-2 border-teal-400 text-teal-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal-400 hover:text-white transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm flex items-center justify-center space-x-2">
                  <Download className="h-6 w-6" />
                  <span>Download Brochure</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SchoolDetailsPage;