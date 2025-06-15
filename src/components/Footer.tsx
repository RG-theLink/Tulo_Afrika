import React, { useState } from 'react';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Send } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // Handle newsletter subscription
      console.log('Newsletter subscription:', email);
      setIsSubscribed(true);
      setEmail('');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer id="footer" className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Column 1: Logo and Social Media */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-2 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <span className="text-slate-200 font-bold text-lg">Tuto ki Tulo mwa Afrika</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Education is victory for Africa. Empowering students across the continent 
                with world-class learning tools and resources.
              </p>
              
              {/* Educational Icons */}
              <div className="flex space-x-3">
                <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-2 rounded-lg">
                  <span className="text-lg">🌍</span>
                </div>
                <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-2 rounded-lg">
                  <span className="text-lg">📚</span>
                </div>
                <div className="bg-gradient-to-r from-orange-400 to-pink-500 p-2 rounded-lg">
                  <span className="text-lg">🚀</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors duration-200 bg-slate-700/50 p-2 rounded-lg hover:bg-slate-600/50">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors duration-200 bg-slate-700/50 p-2 rounded-lg hover:bg-slate-600/50">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors duration-200 bg-slate-700/50 p-2 rounded-lg hover:bg-slate-600/50">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors duration-200 bg-slate-700/50 p-2 rounded-lg hover:bg-slate-600/50">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="space-y-6">
              <h3 className="text-slate-200 font-semibold text-lg flex items-center">
                <span className="text-xl mr-2">🔗</span>
                Quick Links
              </h3>
              <nav className="flex flex-col space-y-3">
                <button 
                  onClick={() => scrollToSection('features')}
                  className="text-slate-400 hover:text-teal-400 transition-colors duration-200 text-left flex items-center"
                >
                  <span className="mr-2">🛠️</span>
                  Our Platform
                </button>
                <button 
                  onClick={() => scrollToSection('pricing')}
                  className="text-slate-400 hover:text-teal-400 transition-colors duration-200 text-left flex items-center"
                >
                  <span className="mr-2">💎</span>
                  Pricing
                </button>
                <button 
                  onClick={() => scrollToSection('educators')}
                  className="text-slate-400 hover:text-teal-400 transition-colors duration-200 text-left flex items-center"
                >
                  <span className="mr-2">🏫</span>
                  For Schools
                </button>
                <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors duration-200 flex items-center">
                  <span className="mr-2">💬</span>
                  Support
                </a>
                <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors duration-200 flex items-center">
                  <span className="mr-2">ℹ️</span>
                  About Us
                </a>
              </nav>
            </div>

            {/* Column 3: Newsletter Subscription */}
            <div className="space-y-6">
              <h3 className="text-slate-200 font-semibold text-lg flex items-center">
                <span className="text-xl mr-2">📧</span>
                Stay Updated
              </h3>
              <p className="text-slate-400 text-sm">
                Subscribe to our newsletter for the latest updates, educational resources, and platform news.
              </p>
              
              {isSubscribed ? (
                <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-green-400">
                    <span className="text-lg">✅</span>
                    <span className="text-sm font-medium">Successfully subscribed!</span>
                  </div>
                  <p className="text-green-300 text-xs mt-1">
                    Thank you for joining our community!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:from-teal-500 hover:to-blue-600 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Subscribe</span>
                  </button>
                </form>
              )}
              
              <div className="text-xs text-slate-500">
                <p>🔒 We respect your privacy. Unsubscribe at any time.</p>
              </div>
            </div>

            {/* Column 4: Contact Info and Legal */}
            <div className="space-y-6">
              <h3 className="text-slate-200 font-semibold text-lg flex items-center">
                <span className="text-xl mr-2">📞</span>
                Get in Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 bg-slate-700/30 p-3 rounded-lg">
                  <Mail className="h-5 w-5 text-teal-400" />
                  <span className="text-slate-300">info@tuloafrika.tech</span>
                </div>
                <div className="flex items-center space-x-3 bg-slate-700/30 p-3 rounded-lg">
                  <Phone className="h-5 w-5 text-teal-400" />
                  <span className="text-slate-300">+264 64 404 605</span>
                </div>
                <div className="flex items-start space-x-3 bg-slate-700/30 p-3 rounded-lg">
                  <MapPin className="h-5 w-5 text-teal-400 mt-1" />
                  <span className="text-slate-300">
                    Online
                  </span>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors duration-200 text-sm flex items-center">
                  <span className="mr-2">📄</span>
                  Terms of Service
                </a>
                <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors duration-200 text-sm flex items-center">
                  <span className="mr-2">🔒</span>
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-slate-700/50 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm flex items-center">
              <span className="mr-2">©</span>
              2024 Tuto ki Tulo mwa Afrika. All rights reserved.
            </p>
            <p className="text-slate-500 text-sm mt-2 md:mt-0 flex items-center">
              <span className="mr-2">❤️</span>
              Built with love for African education
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;