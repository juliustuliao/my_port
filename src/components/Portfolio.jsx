import React, { useState, useEffect } from 'react';
import { 
  GithubIcon, 
  LinkedinIcon, 
  MailIcon, 
  ExternalLinkIcon, 
  MenuIcon, 
  XIcon, 
  MoonIcon, 
  SunIcon 
} from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const projects = [
    {
      title: "E-commerce Platform",
      description: "Built a full-stack e-commerce platform using React, Node.js, and MongoDB. Implemented features like user authentication, shopping cart, and payment processing.",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      category: "fullstack",
      githubLink: "#",
      liveLink: "#"
    },
    {
      title: "Task Management App",
      description: "Developed a Kanban-style task management application with real-time updates using React and Firebase. Features include drag-and-drop functionality and team collaboration.",
      tags: ["React", "Firebase", "TypeScript", "Tailwind"],
      category: "frontend",
      githubLink: "#",
      liveLink: "#"
    },
    {
      title: "Weather Dashboard",
      description: "Created a weather dashboard that displays current weather and 5-day forecast using OpenWeather API. Implemented geolocation and search functionality.",
      tags: ["JavaScript", "REST API", "HTML/CSS"],
      category: "frontend",
      githubLink: "#",
      liveLink: "#"
    }
  ];

  const skills = [
    { 
      category: "Frontend",
      items: ["React", "JavaScript", "TypeScript", "HTML/CSS", "Tailwind CSS"]
    },
    { 
      category: "Backend",
      items: ["Node.js", "Express", "Python", "MongoDB", "PostgreSQL"]
    },
    { 
      category: "Tools",
      items: ["Git", "Docker", "AWS", "Jest", "Webpack"]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'backend', label: 'Backend' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
        <div className="space-y-4 text-center">
          <div className="w-24 h-24 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 to-blue-50'
    }`}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              John Doe
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              Turning Ideas Into<br />Digital Reality
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Full-stack developer specializing in modern web applications. Passionate about creating seamless user experiences with robust architectures.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: GithubIcon, label: 'GitHub', href: '#' },
                { icon: LinkedinIcon, label: 'LinkedIn', href: '#' },
                { icon: MailIcon, label: 'Email', href: 'mailto:example@email.com' }
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' 
                      : 'bg-white text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center dark:text-white">
            Featured Projects
          </h2>
          
          {/* Project Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                  activeFilter === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={index}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold dark:text-white">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-3 py-1 text-sm bg-blue-50 dark:bg-gray-700 text-blue-700 dark:text-blue-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a href={project.githubLink} className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
                      <GithubIcon size={20} />
                    </a>
                    <a href={project.liveLink} className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
                      <ExternalLinkIcon size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center dark:text-white">
            Technical Arsenal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <div 
                key={index}
                className="border border-gray-100 dark:border-gray-700 rounded-xl p-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
              >
                <h3 className="text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400">
                  {skillGroup.category}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <div 
                      key={skillIndex}
                      className="flex items-center space-x-2 px-3 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
                    >
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-8 py-12 text-center">
              <h2 className="text-3xl font-bold mb-4 dark:text-white">Let's Connect</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Have a project in mind? Let's turn your vision into reality.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <a 
                  href="mailto:your.email@example.com" 
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                >
                  <MailIcon size={18} />
                  <span>Send Email</span>
                </a>
                <a 
                  href="#" 
                  className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-full transition-colors ${
                    isDarkMode
                      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      : 'border border-gray-300 hover:border-blue-600 hover:text-blue-600'
                  }`}
                >
                  <LinkedinIcon size={18} />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;