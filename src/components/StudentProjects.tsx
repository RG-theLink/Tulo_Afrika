import React from 'react';
import { ExternalLink, Code, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const StudentProjects = () => {
  const [ref, isVisible] = useScrollAnimation();

  const studentProjects = [
    {
      title: "Student Portfolio",
      description: "A showcase of student work and achievements",
      url: "https://snazzy-nasturtium-c4444c.netlify.app/",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      tags: ["Portfolio", "Showcase", "Creative"]
    },
    {
      title: "Science Project",
      description: "Interactive science experiment documentation",
      url: "https://funny-moxie-61a13b.netlify.app/",
      image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      tags: ["Science", "Research", "Interactive"]
    },
    {
      title: "Math Learning Tool",
      description: "Interactive mathematics learning application",
      url: "https://spectacular-croissant-dc7273.netlify.app/",
      image: "https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      tags: ["Mathematics", "Education", "Interactive"]
    },
    {
      title: "History Timeline",
      description: "Interactive historical events timeline",
      url: "https://cheery-bonbon-538588.netlify.app/#home",
      image: "https://images.pexels.com/photos/6147369/pexels-photo-6147369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      tags: ["History", "Timeline", "Educational"]
    }
  ];

  return (
    <section id="student-projects" className="py-20 bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Section Badge */}
          <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-full px-6 py-2 mb-6">
            <span className="text-xl mr-2">✨</span>
            <span className="text-slate-700 font-medium">Student Showcases</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 to-purple-600 bg-clip-text text-transparent mb-6">
            Inspiring Student Projects
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore creative and educational projects developed by our talented students, showcasing their skills and knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {studentProjects.map((project, index) => (
            <div
              key={index}
              className={`bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{project.title}</h3>
                <p className="text-slate-600 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <a 
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-400 to-pink-500 text-white py-2 px-4 rounded-lg hover:from-purple-500 hover:to-pink-600 transition-all duration-300 w-full"
                >
                  <span>View Project</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl border border-purple-200 p-8 max-w-4xl mx-auto">
            <div className="flex justify-center space-x-4 mb-6">
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-3 rounded-xl">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-3 rounded-xl">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Empowering Student Creativity
            </h3>
            <p className="text-slate-600 mb-6">
              At Swakopmund Christian Academy, we encourage students to apply their knowledge through hands-on projects. 
              These showcases represent our commitment to project-based learning and digital literacy.
            </p>
            <a 
              href="#"
              className="inline-block bg-gradient-to-r from-purple-400 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-500 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              Submit Your Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentProjects;