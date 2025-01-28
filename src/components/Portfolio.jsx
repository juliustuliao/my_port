import React, { useState, useEffect, useMemo } from 'react';
import { 
  GithubIcon, LinkedinIcon, MailIcon, 
  ExternalLinkIcon, MenuIcon, XIcon, 
  MoonIcon, SunIcon 
} from 'lucide-react';

const PROJECTS = [
    {
      title: "RPA Development Projects",
      description: "Design, develop, and implement software robots using various RPA tools (UiPath, WinAuto, Automation Anywhere, Robocorp) to enhance business processes and improve operational efficiency.",
      tags: ["RPA", "UiPath", "Automation Anywhere", "Robocorp"],
      category: "fullstack",
      githubLink: "#",
      liveLink: "#"
    },
    {
      title: "Web Development Portfolio",
      description: "Consistently create well-designed, tested code using best practices for website development, including mobile and responsive site design. Integrate back-end databases and services.",
      tags: ["HTML/CSS", "JavaScript", "Responsive Design", "Backend Integration"],
      category: "ai",
      githubLink: "#",
      liveLink: "#"
    },
    {
      title: "AI & NLP Solutions",
      description: "Drive innovation by implementing latest AI research and enhancing products. Specializing in Python & NLP development with strong problem-solving capabilities.",
      tags: ["Python", "NLP", "AI", "Machine Learning"],
      category: "backend",
      githubLink: "https://huggingface.co/juliuserictuliao",
      liveLink: "#"
    }
  ];
  
  const SKILLS = [
    { 
      category: "AI",
      items: ["Web3", "HTML/CSS", "JavaScript", "Responsive Design", "UI/UX"]
    },
    { 
      category: "Backend",
      items: ["Python", "SQL", "NLP", "AI Implementation", "Database Management"]
    },
    { 
      category: "Tools",
      items: ["UiPath", "Automation Anywhere", "Robocorp", "Visual Basic", "Git"]
    }
  ];
  
  const CATEGORIES = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'backend', label: 'Backend' }
  ];
  
  const SOCIAL_LINKS = [
    { icon: GithubIcon, label: 'HuggingFace', href: 'https://huggingface.co/juliuserictuliao' },
    { icon: LinkedinIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/in/juliustuliao' },
    { icon: MailIcon, label: 'Email', href: 'mailto:juliuserictuliao@gmail.com' }
  ];

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => 
    localStorage.getItem('darkMode') === 'true' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const filteredProjects = useMemo(() => 
    activeFilter === 'all' 
      ? PROJECTS 
      : PROJECTS.filter(project => project.category === activeFilter),
    [activeFilter]
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const ThemeToggle = () => (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className={`p-2 rounded-lg transition-colors ${
        isDarkMode 
          ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
    </button>
  );

  if (isLoading) {
    return (
        
      <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className={`w-24 h-24 border-4 rounded-full animate-spin mx-auto ${
            isDarkMode 
              ? 'border-purple-500 border-t-transparent' 
              : 'border-blue-600 border-t-transparent'
          }`} />
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
            Loading Portfolio...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative bg-white dark:bg-gray-900">
      <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
             Julius Eric Tuliao
            </h1>
            
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
              <ThemeToggle />
            </div>

            <div className="md:hidden flex items-center space-x-4">
              <ThemeToggle />
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
              </button>
            </div>
          </div>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96' : 'max-h-0'}`}
        >
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

      <main className={`min-h-screen w-full transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 to-blue-50'
      } overflow-hidden`}>
        <section id="about" className="py-24">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                Turning Ideas Into<br />Digital Reality
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Full-stack developer specializing in modern web applications. 
                Passionate about creating seamless user experiences with robust architectures.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-2 px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' 
                        : 'bg-white text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <Icon size={20} aria-hidden="true" />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-600  dark:text-white ">
              Featured Projects
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {CATEGORIES.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveFilter(id)}
                  className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                    activeFilter === id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  aria-label={`Filter projects by ${label}`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <article 
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
                      <a 
                        href={project.githubLink} 
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600"
                        aria-label="View project on GitHub"
                      >
                        <GithubIcon size={20} />
                      </a>
                      <a 
                        href={project.liveLink} 
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600"
                        aria-label="View live project"
                      >
                        <ExternalLinkIcon size={20} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center dark:text-white">
              Technical Arsenal
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SKILLS.map((skillGroup, index) => (
                <div 
                  key={index}
                  className="border border-gray-100 dark:border-gray-700 rounded-xl p-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
                >
                  <h3 className="text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400">
                    {skillGroup.category}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

        <section id="contact" className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden w-[calc(100%-2rem)]">
              <div className="px-8 py-12 text-center">
                <h2 className="text-3xl font-bold mb-4 dark:text-white">Let's Connect</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Have a project in mind? Let's turn your vision into reality.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <a 
                    href="mailto:john.doe@example.com" 
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    aria-label="Send email"
                  >
                    <MailIcon size={18} />
                    <span>Send Email</span>
                  </a>
                  <a 
                    href="https://linkedin.com/in/johndoe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-full transition-colors ${
                      isDarkMode
                        ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                        : 'border border-gray-300 hover:border-blue-600 hover:text-blue-600'
                    }`}
                    aria-label="Visit LinkedIn profile"
                  >
                    <LinkedinIcon size={18} />
                    <span>LinkedIn Profile</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Portfolio;