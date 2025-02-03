import React, { useState, useEffect, useMemo } from 'react';
import { 
  GithubIcon, LinkedinIcon, MailIcon, 
  ExternalLinkIcon, MenuIcon, XIcon, 
  MoonIcon, SunIcon,
  ChevronLeftIcon,
  ChevronRightIcon 
} from 'lucide-react';
const PROJECTS = [
    {
      title: "DIX Gas Sales Encoding Automation",
      description: "Developed a UiPath automation solution for processing LPG gas sales data, handling over 300,000 kg of sales (50,000+ rows) monthly. Eliminated manual encoding needs, significantly reducing operational costs and human error while improving processing efficiency.",
      tags: ["UiPath", "Data Processing", "Legacy System Integration", "Process Automation"],
      category: "rpa",
      githubLink: "#",
      liveLink: "#",
      images: ["/api/placeholder/600/400", "/api/placeholder/600/400"]
    },
    {
      title: "Intelligent Email Management System",
      description: "Built an automated email processing system using Lark AnyX and in-house LLM for smart email classification and response. Implemented priority-based routing and automated response generation, streamlining group email management and improving response efficiency.",
      tags: ["Lark", "LLM Integration", "Email Automation", "NLP", "Process Automation"],
      category: "rpa",
      githubLink: "#",
      liveLink: "#",
      images: ["/api/placeholder/600/400", "/api/placeholder/600/400"]
    },
    {
      title: "AssessMate - Automated Call Center Hiring Solution",
      description: "Developed an end-to-end hiring automation system processing 20,000 applications monthly. Features custom ASR API, speech fluency assessment models, and automated candidate evaluation, delivering results within 5 minutes of application submission.",
      tags: ["ASR", "Machine Learning", "API Development", "Speech Processing"],
      category: "ai",
      githubLink: "#",
      liveLink: "#",
      images: ["/api/placeholder/600/400", "/api/placeholder/600/400"]
    },
    {
      title: "QA AI - Call Center Quality Assurance",
      description: "Built an AI-powered QA system analyzing 90,000 calls monthly for violations, missed opportunities, and conversation quality. Automates the entire QA process for call center recordings with comprehensive grading and analysis.",
      tags: ["NLP", "Audio Processing", "Machine Learning", "Quality Assurance"],
      category: "ai",
      githubLink: "#",
      liveLink: "#",
      images: ["/api/placeholder/600/400", "/api/placeholder/600/400"]
    },
    {
      title: "Tagalog ASR Engine",
      description: "Fine-tuned Whisper model on 36,000+ minutes of Tagalog voice recordings using LoRA. Deployed on AWS ECS/EC2 using Flask, serving as foundation for multiple speech-to-text applications.",
      tags: ["ASR", "Fine-tuning", "AWS", "Flask", "Docker"],
      category: "ai",
      githubLink: "#",
      liveLink: "#",
      images: ["/api/placeholder/600/400", "/api/placeholder/600/400"]
    },
    {
      title: "Crypto Trading Advisor",
      description: "Developed a Web3 AI platform utilizing DeepSeek/OpenAI LLMs for cryptocurrency analysis and trading recommendations. Integrated multiple data sources (CoinGecko, CryptoCompare, Etherscan) for comprehensive market analysis.",
      tags: ["Web3", "LLM", "API Integration", "Cryptocurrency", "Python"],
      category: "fullstack",
      githubLink: "#",
      liveLink: "#",
      images: ["/api/placeholder/600/400", "/api/placeholder/600/400"]
    },
    {
      title: "High-Volume Betting Platform",
      description: "Built a scalable betting application processing 5M+ bets monthly using Node.js, PostgreSQL, and Redis. Features automated receipt generation, dynamic odds adjustment, and real-time bet management. Deployed across multiple betting arenas.",
      tags: ["Node.js", "PostgreSQL", "Redis", "High-Scale"],
      category: "fullstack",
      githubLink: "#",
      liveLink: "#",
      images: ["/api/placeholder/600/400", "/api/placeholder/600/400"]
    },
    {
      title: "Smart Contract Development Suite",
      description: "Designed and deployed various smart contracts for betting applications and asset tokenization. Implemented secure, efficient contract logic for multiple client requirements on blockchain platforms.",
      tags: ["Solidity", "Web3", "Smart Contracts", "Blockchain"],
      category: "fullstack",
      githubLink: "#",
      liveLink: "#",
      images: ["/api/placeholder/600/400", "/api/placeholder/600/400"]
    },
    {
      title: "Enterprise CRM System",
      description: "Developed a comprehensive CRM system for internal and external employee management. Features real-time synchronization between field and office data, automated status updates, and robust database integration.",
      tags: ["React", "Node.js", "PostgreSQL", "Real-time Sync"],
      category: "fullstack",
      githubLink: "#",
      liveLink: "#",
      images: ["/api/placeholder/600/400", "/api/placeholder/600/400"]
    },
    {
      title: "Delivery Status Chatbot",
      description: "Created an automated response system handling 100K+ monthly rider inquiries. Integrated REST APIs to sync local and cloud databases for real-time parcel status updates and automated communications.",
      tags: ["API Development", "Database Integration", "Chatbot", "Real-time Updates"],
      category: "fullstack",
      githubLink: "#",
      liveLink: "#",
      images: ["/api/placeholder/600/400", "/api/placeholder/600/400"]
    },
    {
      title: "Enterprise Data Warehouse Infrastructure",
      description: "Architected and implemented company's initial data warehouse using AWS RDS and EC2. Developed Flask-based REST API for data access, enabling seamless integration with business intelligence tools and establishing foundation for data-driven decision making.",
      tags: ["AWS", "RDS", "Flask", "API Development", "Data Warehouse", "EC2"],
      category: "fullstack",
      githubLink: "#",
      liveLink: "#",
      images: ["/api/placeholder/600/400", "/api/placeholder/600/400"]
    },
    {
      title: "Route Optimization Engine",
      description: "Developed an advanced route optimization system processing 10,000+ possible destinations. Increased field productivity by 66% (from 15 to 25 daily account visits) through intelligent route planning and optimization algorithms.",
      tags: ["Python", "Optimization", "Algorithms", "Data Science"],
      category: "ai",
      githubLink: "#",
      liveLink: "#",
      images: ["/api/placeholder/600/400", "/api/placeholder/600/400"]
    },
    {
      title: "Address Intelligence ML Model",
      description: "Created machine learning model for city and province detection from unstructured addresses. Trained on 100K geocoding results from Google Maps and HERE APIs, achieving 85% accuracy in address component classification.",
      tags: ["Machine Learning", "NLP", "Google Maps API", "HERE API", "Python"],
      category: "ai",
      githubLink: "#",
      liveLink: "#",
      images: ["/api/placeholder/600/400", "/api/placeholder/600/400"]
    },
    {
      title: "Enterprise Analytics Dashboard Suite",
      description: "Designed comprehensive visualization dashboards using Tableau and Google Looker Studio for email, SMS, and field operations data. Created interactive maps and KPI tracking systems for business intelligence.",
      tags: ["Tableau", "Google Looker", "Data Visualization", "BI", "Analytics"],
      category: "fullstack",
      githubLink: "#",
      liveLink: "#",
      images: ["/api/placeholder/600/400", "/api/placeholder/600/400"]
    },
    {
      title: "Banking Reports Automation",
      description: "Developed VBA applications to automate complex banking report generation. Eliminated manual copy-paste operations, automated formula applications, and streamlined file creation processes.",
      tags: ["VBA", "Excel", "Process Automation", "Financial Reports"],
      category: "rpa",
      githubLink: "#",
      liveLink: "#",
      images: ["/api/placeholder/600/400", "/api/placeholder/600/400"]
    }
  ];
  
  const SKILLS = [
    {
      category: "RPA Development",
      items: ["UiPath", "Winautomation", "Robocorp", "Process Design", "Business Analysis", "VBA", "Excel Automation"]
    },
    {
      category: "AI & Machine Learning",
      items: ["Python", "NLP", "TensorFlow", "Computer Vision", "LLM", "ASR", "Modelling", "Finetuning", "Route Optimization", "Geocoding ML"]
    },
    {
      category: "Full Stack Development",
      items: ["Python", "Node.js", "PostgreSQL", "REST APIs", "Webhook", "AWS", "Alibaba", "MySQL", "SQLite", "Excel", "Web3", "Bubble.io"]
    },
    {
      category: "Data & Analytics",
      items: ["Tableau", "Google Looker Studio", "Data Warehousing", "ETL", "Data Modeling", "Business Intelligence", "GIS"]
    },
    {
      category: "Tools & Technologies",
      items: ["Git", "Docker", "CI/CD", "Agile", "K6", "Redis", "Google Maps API", "HERE API", "No-Code Platforms"]
    }
  ];
  
  const CATEGORIES = [
    { id: 'all', label: 'All Projects' },
    { id: 'rpa', label: 'RPA' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'fullstack', label: 'Full Stack' }
  ];
  
  const SOCIAL_LINKS = [
    { icon: GithubIcon, label: 'HuggingFace', href: 'https://huggingface.co/juliuserictuliao' },
    { icon: LinkedinIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/in/juliustuliao' },
    { icon: MailIcon, label: 'Email', href: 'mailto:juliuserictuliao@gmail.com' }
  ];
const ThemeToggle = ({ isDarkMode, setIsDarkMode }) => (
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

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative overflow-hidden aspect-video group">
      <img 
        src={images[currentIndex]} 
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
      
      {images.length > 1 && (
        <>
          <button 
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Previous image"
          >
            <ChevronLeftIcon size={20} />
          </button>
          <button 
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Next image"
          >
            <ChevronRightIcon size={20} />
          </button>
          
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  currentIndex === index 
                    ? 'bg-white' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ProjectCard = ({ project }) => {
  return (
    <article className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <ImageCarousel images={project.images} />
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
  );
};

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
              <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            </div>

            <div className="md:hidden flex items-center space-x-4">
              <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
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

      <main className="min-h-screen w-full transition-colors duration-300">
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
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-600 dark:text-white">
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
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center dark:text-white">
              Technical Arsenal
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SKILLS.map((skillGroup, index) => (
                <div 
                  key={index}
                  className="border border-gray-100 dark:border-gray-700 rounded-xl p-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
                >
                  <h3 className="text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400">
                    {skillGroup.category}
                  </h3>
                  <div className="space-y-3">
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
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="px-8 py-12 text-center">
                <h2 className="text-3xl font-bold mb-4 text-gray-600 dark:text-white">Let's Connect</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Have a project in mind? Let's turn your vision into reality.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <a 
                    href="mailto:juliuserictuliao@gmail.com" 
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    aria-label="Send email"
                  >
                    <MailIcon size={18} />
                    <span>Send Email</span>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/juliustuliao"
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