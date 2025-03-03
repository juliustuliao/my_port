import React, { useState, useEffect, useMemo } from 'react';
import { 
  GithubIcon, LinkedinIcon, MailIcon, 
  ExternalLinkIcon, MenuIcon, XIcon, 
  MoonIcon, SunIcon,
  ChevronLeftIcon,
  ChevronRightIcon 
} from 'lucide-react';
const CATEGORIES = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'data', label: 'Data Engineering' },
    { id: 'automation', label: 'Automation' },
    { id: 'fullstack', label: 'Full Stack' }
  ];
  
  const SKILLS = [
    {
      category: "AI & Machine Learning",
      items: [
        "Natural Language Processing",
        "Speech Recognition (ASR)",
        "Computer Vision",
        "Large Language Models",
        "TensorFlow/PyTorch",
        "Model Fine-tuning",
        "Machine Learning Ops",
        "Neural Networks"
      ]
    },
    {
      category: "Data Engineering",
      items: [
        "Data Warehousing",
        "ETL Pipeline Design",
        "SQL (PostgreSQL, MySQL)",
        "NoSQL (Redis)",
        "CLOUD (RDS, EC2, ECS)",
        "Data Modeling",
        "API Development",
        "Real-time Processing"
      ]
    },
    {
      category: "Development",
      items: [
        "Python",
        "Node.js",
        "React",
        "Web3/Blockchain",
        "REST APIs",
        "Flask",
        "Docker",
        "Git/CI/CD"
      ]
    },
    {
      category: "Automation & Tools",
      items: [
        "UiPath",
        "Winautomation",
        "Robocorp",
        "VBA",
        "Process Design",
        "Bubble.io",
        "Agile/Scrum",
        "Business Analysis"
      ]
    },
    {
      category: "Analytics & Visualization",
      items: [
        "Tableau",
        "Google Looker Studio",
        "Business Intelligence",
        "GIS/Mapping",
        "Statistical Analysis",
        "KPI Dashboards",
        "Advanced Excel",
        "Data Storytelling"
      ]
    }
  ];
  
  const PROJECTS = [
    {
      title: "Tagalog ASR Engine",
      description: "Lead team of developers in Fine-tuning Whisper model on 36,000+ minutes of Tagalog voice recordings using LoRA. Deployed on AWS ECS/EC2 using Flask, achieving high accuracy in Tagalog speech recognition. Built foundation for multiple speech-to-text applications.",
      tags: ["ASR", "Fine-tuning", "LoRA", "AWS", "Flask", "Docker"],
      category: "ai",
      githubLink: "#",
      liveLink: "#",
      images: ["/images/asr1.png"]
    },
    {
      title: "AI Research Assistant",
      description: "Developed autonomous research agent utilizing browser automation and LLM technology. Created intelligent system capable of understanding complex instructions and executing multi-step web research tasks automatically.",
      tags: ["LLM", "Web Automation", "AI Agent", "browser_use", "Research Automation"],
      category: "ai",
      githubLink: "#",
      liveLink: "#",
      images: ["/images/browser1.gif"]
    },
    {
      title: "ALPR System",
      description: "led the development of computer vision solution using fine-tuned YOLOv8 for automated license plate and conduction sticker detection. Custom-trained on 5 specialized datasets for optimal accuracy in local conditions.",
      tags: ["Computer Vision", "YOLOv8", "Object Detection", "Fine-tuning"],
      category: "ai",
      githubLink: "#",
      liveLink: "#",
      images: ["/images/alpr1.jpg"]
    },
    {
      title: "RAG-Based Customer Support AI",
      description: "Led the development of conversational AI system handling 40K+ messages monthly, resolving 80% of Level 1 inquiries. Utilized LlamaIndex, vector DB, Docker, Redis, and VLLM with intelligent human escalation protocols.",
      tags: ["RAG", "LlamaIndex", "Vector DB", "VLLM", "Redis", "Docker"],
      category: "ai",
      githubLink: "#",
      liveLink: "#",
      images: ["/images/chat1.png","/images/chat2.png"]
    },
    {
      title: "Delivery Status Chatbot",
      description: "Created automated response system handling 100K+ monthly rider inquiries. Integrated REST APIs to sync local and cloud databases for real-time parcel status updates and automated communications.",
      tags: ["API Development", "Database Integration", "Chatbot", "Real-time Updates"],
      category: "fullstack",
      githubLink: "#",
      liveLink: "#",
      images: ["/images/delivery1.gif"]
    },
    {
      title: "AI Call Center Quality Assurance",
      description: "Initiated and led the development of an AI-powered QA system analyzing 90,000+ monthly calls. Designed and implemented automated violation detection, opportunity identification, and conversation quality scoring using advanced NLP and speech processing.",
      tags: ["NLP", "Speech Processing", "Machine Learning", "Quality Analytics"],
      category: "ai",
      githubLink: "#",
      liveLink: "#",
      images: ["/images/qa1.png"]
    },
    {
      title: "AssessMate - AI Hiring Platform",
      description: "Led a team of developers in building an AI voice grading platform processing 20,000 applications monthly. Designed and implemented a custom ASR API, fluency assessment models, and automated evaluation system, reducing hiring time from days to just 5 minutes.",
      tags: ["ASR", "Machine Learning", "API Development", "Process Automation"],
      category: "ai",
      githubLink: "#",
      liveLink: "#",
      images: ["/images/assessmate1.png"]
    },
    {
      title: "Address Intelligence Engine",
      description: "Developed ML model achieving 85% accuracy in parsing unstructured addresses. Trained on 100K+ geocoding results from Google Maps and HERE APIs, enabling automated location intelligence.",
      tags: ["Machine Learning", "NLP", "Geocoding", "API Integration"],
      category: "ai",
      githubLink: "#",
      liveLink: "#",
      images: ["/images/geocode1.png"]
    },
    {
      title: "Enterprise Data Warehouse",
      description: "Led the team in developing the company's core data infrastructure using AWS RDS and EC2. Oversaw the design and implementation of a Flask REST API, enabling seamless data access and analytics integration to drive data-driven operations.",
      tags: ["AWS", "Data Warehouse", "API Development", "Database Design"],
      category: "data",
      githubLink: "#",
      liveLink: "#",
      images: ["/images/datawarehouse0.png","/images/datawarehouse1.png", "/images/datawarehouse2.png"]
    },
    {
      title: "Route Optimization System",
      description: "Created advanced routing engine optimizing 10,000+ destinations daily. Increased field productivity by 66% through intelligent route planning, improving from 15 to 25 daily account visits.",
      tags: ["Algorithms", "Optimization", "GIS", "Data Science"],
      category: "data",
      githubLink: "#",
      liveLink: "#",
      images: ["/images/route1.jpeg"]
    },
    {
      title: "Analytics Dashboard Suite",
      description: "Designed enterprise-wide analytics platform using Tableau and Looker Studio. Created interactive visualizations for email, SMS, and field operations, enabling data-driven decision making.",
      tags: ["Tableau", "Looker", "Data Visualization", "Analytics"],
      category: "data",
      githubLink: "#",
      liveLink: "#",
      images: ["/images/dashboard1.png", "/images/dashboard2.png","/images/dashboard3.jpeg"]
    },
    {
      title: "Automated Gas Sales Processing",
      description: "Developed UiPath automation handling 300,000 kg monthly LPG sales data (50,000+ rows). Eliminated manual encoding needs while ensuring 100% accuracy in legacy system integration.",
      tags: ["UiPath", "Process Automation", "Data Processing", "RPA"],
      category: "automation",
      githubLink: "#",
      liveLink: "#",
      images: ["/images/rpa.png"]
    },
    {
      title: "Smart Email Management System",
      description: "Engineered automated email processing using Lark AnyX and LLM. Implemented intelligent classification and response generation, streamlining group email management with priority-based routing.",
      tags: ["Email Automation", "LLM", "Workflow Automation", "NLP"],
      category: "automation",
      githubLink: "#",
      liveLink: "#",
      images: ["/images/email1.png", "/images/email2.png","/images/email3.png"]
    },
    {
      title: "Banking Reports Automation",
      description: "Created VBA solutions automating complex financial reporting. Eliminated manual processes in data consolidation, formula application, and report generation, significantly reducing processing time.",
      tags: ["VBA", "Financial Automation", "Excel", "Report Generation"],
      category: "automation",
      githubLink: "#",
      liveLink: "#",
      images: ["/images/vba.jpg"]
    },
    {
      title: "High-Scale Betting Platform",
      description: "Engineered betting platform processing 5M+ monthly transactions using Node.js, PostgreSQL, and Redis. Features automated receipt generation, dynamic odds adjustment, and real-time management.",
      tags: ["Node.js", "PostgreSQL", "Redis", "High-Scale Systems"],
      category: "fullstack",
      githubLink: "#",
      liveLink: "#",
      images: ["/images/betting1.gif"]
    },
    {
      title: "Smart Contract Suite",
      description: "Developed and deployed blockchain smart contracts for betting and asset tokenization. Implemented secure, efficient contract logic enabling automated financial operations on blockchain platforms.",
      tags: ["Solidity", "Web3", "Smart Contracts", "DeFi"],
      category: "fullstack",
      githubLink: "#",
      liveLink: "#",
      images: ["/images/sc1.gif"]
    },
    {
      title: "Coffee Shop Management System",
      description: "Developed full-featured POS and management system using Bubble.io. Includes order processing, customer history tracking, automated email receipts, and comprehensive business reporting.",
      tags: ["Bubble.io", "No-Code", "POS", "Business Systems"],
      category: "fullstack",
      githubLink: "#",
      liveLink: "#",
      images: ["/images/coffee1.png"]
    }
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