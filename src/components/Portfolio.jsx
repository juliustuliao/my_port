import React, { useState, useEffect, useMemo, useRef } from 'react';
import * as webllm from '@mlc-ai/web-llm';
import { 
  GithubIcon, LinkedinIcon, MailIcon, 
  ExternalLinkIcon, MenuIcon, XIcon, 
  MoonIcon, SunIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MessageCircleIcon,
  SendIcon,
  BotIcon,
  UserIcon
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
      title: "ALPR Mobile App",
      description: "developed mobile application for the alpr system compatible on android/ios devices using flutter.",
      tags: ["Flutter","Computer Vision", "YOLOv8", "Object Detection", "Fine-tuning", "PTT"],
      category: "ai",
      githubLink: "#",
      liveLink: "#",
      images: ["/images/mobile1.jpg","/images/mobile2.jpg"]
    },
    
    {
      title: "Webrtc AI Agent Mobile App",
      description: "Built a real-time AI agent application powered by WebRTC for low-latency voice interactions. The system enables users to connect via a WebRTC session where their audio is processed through an AI pipeline: Voice Activity Detection (VAD), Speech-to-Text (STT), Large Language Model (LLM) for reasoning, and Text-to-Speech (TTS) for AI response.",
      tags: ["Flutter", "WebRTC", "Livekit", "LLM", "TTS", "ASR", "Docker"],
      category: "ai",
      githubLink: "#",
      liveLink: "#",
      images: ["/images/webrtc1.jpg","/images/webrtc2.png","/images/webrtc3.png"]
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
              className="px-3 py-1 text-sm bg-green-50 dark:bg-gray-700 text-green-700 dark:text-green-300 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
      </div>
    </article>
  );
};

const AIChatbot = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Julius's AI assistant powered by WebLLM. Ask me anything about his projects, skills, or experience!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState('');
  const engineRef = useRef(null);
  const conversationHistory = useRef([
    {
      role: "system",
      content: `You are Julius Eric Tuliao's AI assistant. You are knowledgeable about his work and experience. Here's information about Julius:

PROJECTS:
${PROJECTS.map(p => `- ${p.title}: ${p.description} (Technologies: ${p.tags.join(', ')}, Category: ${p.category})`).join('\n')}

SKILLS:
${SKILLS.map(skill => `${skill.category}: ${skill.items.join(', ')}`).join('\n')}

CONTACT:
- Email: juliuserictuliao@gmail.com
- LinkedIn: https://www.linkedin.com/in/juliustuliao  
- HuggingFace: https://huggingface.co/juliuserictuliao

Please provide helpful, accurate responses about Julius's work. Be conversational and professional.`
    }
  ]);

  // Helper function to get relevant context based on user query
  const getRelevantContext = (userMessage) => {
    const message = userMessage.toLowerCase();
    let relevantProjects = [];
    let relevantSkills = [];

    // Find relevant projects based on keywords
    relevantProjects = PROJECTS.filter(project => 
      project.title.toLowerCase().includes(message) ||
      project.description.toLowerCase().includes(message) ||
      project.tags.some(tag => tag.toLowerCase().includes(message)) ||
      project.category.toLowerCase().includes(message)
    ).slice(0, 3); // Limit to top 3 relevant projects

    // Find relevant skills based on keywords
    relevantSkills = SKILLS.filter(skill => 
      skill.category.toLowerCase().includes(message) ||
      skill.items.some(item => item.toLowerCase().includes(message))
    ).slice(0, 2); // Limit to top 2 relevant skill categories

    return { relevantProjects, relevantSkills };
  };

  // Create optimized system prompt with only relevant context
  const createOptimizedSystemPrompt = (userMessage = '') => {
    const { relevantProjects, relevantSkills } = getRelevantContext(userMessage);
    
    let contextParts = [
      "You are Julius Eric Tuliao's AI assistant. Julius is a full-stack developer specializing in AI/ML, data engineering, and automation."
    ];

    if (relevantProjects.length > 0) {
      const projectsText = relevantProjects.map(p => 
        `- ${p.title}: ${p.description.substring(0, 150)}... (Tech: ${p.tags.slice(0, 4).join(', ')})`
      ).join('\n');
      contextParts.push(`\nRELEVANT PROJECTS:\n${projectsText}`);
    }

    if (relevantSkills.length > 0) {
      const skillsText = relevantSkills.map(skill => 
        `${skill.category}: ${skill.items.slice(0, 6).join(', ')}`
      ).join('\n');
      contextParts.push(`\nRELEVANT SKILLS:\n${skillsText}`);
    }

    contextParts.push(`\nCONTACT:\nEmail: juliuserictuliao@gmail.com | LinkedIn: linkedin.com/in/juliustuliao | HuggingFace: huggingface.co/juliuserictuliao`);
    contextParts.push(`\nBe helpful, accurate, and professional in your responses.`);

    return contextParts.join('');
  };

  // Create minimal system prompt as last resort
  const createMinimalSystemPrompt = () => {
    return `You are Julius Eric Tuliao's AI assistant. Julius is a full-stack developer specializing in AI/ML, data engineering, and automation. He has extensive experience in ASR systems, computer vision, RAG-based chatbots, enterprise data warehouses, and automation solutions. Contact: juliuserictuliao@gmail.com. Be helpful and professional.`;
  };

  // Trim conversation history to fit context window
  const trimConversationHistory = (messages, maxLength = 10) => {
    // Always keep the system message (first one)
    if (messages.length <= maxLength) return messages;
    
    const systemMessage = messages[0];
    const recentMessages = messages.slice(-(maxLength - 1));
    return [systemMessage, ...recentMessages];
  };

  const initializeWebLLM = async () => {
    if (isModelReady || isModelLoading) return;
    
    setIsModelLoading(true);
    setLoadingProgress('Initializing WebLLM...');

    try {
      if (!engineRef.current) {
        engineRef.current = new webllm.MLCEngine();
        engineRef.current.setInitProgressCallback((report) => {
          setLoadingProgress(report.text);
        });
      }

      const config = {
        temperature: 0.7,
        top_p: 0.9,
      };

      // Use Phi-3.5 for larger context window (128K tokens)
      await engineRef.current.reload("Phi-3.5-mini-instruct-q4f16_1-MLC", config);
      
      setIsModelReady(true);
      setLoadingProgress('Model ready!');
      setTimeout(() => setLoadingProgress(''), 2000);
    } catch (error) {
      console.error('Failed to initialize WebLLM:', error);
      setLoadingProgress('Failed to load model. Using fallback responses.');
      setTimeout(() => setLoadingProgress(''), 3000);
    } finally {
      setIsModelLoading(false);
    }
  };

  const generateFallbackResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Search for relevant projects
    const relevantProjects = PROJECTS.filter(project => 
      project.title.toLowerCase().includes(message) ||
      project.description.toLowerCase().includes(message) ||
      project.tags.some(tag => tag.toLowerCase().includes(message)) ||
      project.category.toLowerCase().includes(message)
    );

    if (message.includes('hello') || message.includes('hi')) {
      return "Hello! I'm here to help you learn more about Julius's work. You can ask me about his AI projects, data engineering experience, automation work, or any specific technologies.";
    }
    
    if (message.includes('contact') || message.includes('reach')) {
      return "You can reach Julius at juliuserictuliao@gmail.com or connect with him on LinkedIn at https://www.linkedin.com/in/juliustuliao. He's also active on HuggingFace at https://huggingface.co/juliuserictuliao";
    }

    if (relevantProjects.length > 0) {
      const project = relevantProjects[0];
      return `Great question about ${project.title}! ${project.description} This project uses technologies like ${project.tags.join(', ')}.`;
    }

    return "I'd be happy to help! You can ask me about Julius's AI/ML projects, data engineering work, automation solutions, or any specific technologies.";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    // Add user message to conversation history
    conversationHistory.current.push({
      role: "user",
      content: currentInput
    });

    try {
      let responseText = '';
      
      if (isModelReady && engineRef.current) {
        // Try different context optimization strategies
        await tryWithContextOptimization(currentInput);
      } else {
        // Fallback to rule-based responses
        responseText = generateFallbackResponse(currentInput);
        
        setTimeout(() => {
          const botResponse = {
            id: Date.now() + 1,
            text: responseText,
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, botResponse]);
          setIsTyping(false);
        }, 1000);
      }

    } catch (error) {
      console.error('Error generating response:', error);
      const fallbackResponse = {
        id: Date.now() + 1,
        text: generateFallbackResponse(currentInput),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackResponse]);
      setIsTyping(false);
    }
  };

  const tryWithContextOptimization = async (currentInput) => {
    const strategies = [
      // Strategy 1: Use original full context
      () => conversationHistory.current,
      
      // Strategy 2: Use trimmed conversation history
      () => trimConversationHistory(conversationHistory.current, 8),
      
      // Strategy 3: Use optimized context with relevant info only
      () => {
        const optimizedSystemPrompt = createOptimizedSystemPrompt(currentInput);
        const trimmedHistory = trimConversationHistory(conversationHistory.current, 5);
        return [
          { role: "system", content: optimizedSystemPrompt },
          ...trimmedHistory.slice(1) // Skip original system message
        ];
      },
      
      // Strategy 4: Use minimal context as last resort
      () => {
        const minimalSystemPrompt = createMinimalSystemPrompt();
        const recentMessages = conversationHistory.current.slice(-3); // Only last few messages
        return [
          { role: "system", content: minimalSystemPrompt },
          ...recentMessages.filter(msg => msg.role !== "system")
        ];
      }
    ];

    for (let i = 0; i < strategies.length; i++) {
      try {
        const messages = strategies[i]();
        console.log(`Trying strategy ${i + 1} with ${messages.length} messages`);
        
        const completion = await engineRef.current.chat.completions.create({
          messages: messages,
          stream: true,
        });

        let currentResponse = '';
        const botMessage = {
          id: Date.now() + 1,
          text: '',
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);

        for await (const chunk of completion) {
          const delta = chunk.choices[0]?.delta?.content;
          if (delta) {
            currentResponse += delta;
            setMessages(prev => prev.map(msg => 
              msg.id === botMessage.id 
                ? { ...msg, text: currentResponse }
                : msg
            ));
          }
        }

        // Success! Add response to conversation history
        if (currentResponse) {
          conversationHistory.current.push({
            role: "assistant", 
            content: currentResponse
          });

          // If we had to use an optimized strategy, update the conversation history
          if (i > 0) {
            console.log(`Successfully used optimization strategy ${i + 1}`);
            // Trim conversation history to prevent future context issues
            conversationHistory.current = trimConversationHistory(conversationHistory.current, 6);
          }
        }
        
        return; // Success, exit the retry loop
        
      } catch (error) {
        const isContextError = error.message?.includes('ContextWindowSizeExceededError') || 
                             error.message?.includes('context window size') ||
                             error.message?.includes('prompt tokens exceed');
        
        if (isContextError && i < strategies.length - 1) {
          console.log(`Context window exceeded with strategy ${i + 1}, trying next strategy...`);
          continue; // Try next strategy
        } else {
          console.error(`Strategy ${i + 1} failed:`, error);
          if (i === strategies.length - 1) {
            // All strategies failed, throw error to trigger fallback
            throw error;
          }
        }
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Initialize WebLLM when chatbot opens
  useEffect(() => {
    if (isOpen && !isModelReady && !isModelLoading) {
      initializeWebLLM();
    }
  }, [isOpen, isModelReady, isModelLoading]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className={`mb-4 w-80 h-96 rounded-lg shadow-2xl border ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        } flex flex-col`}>
          {/* Header */}
          <div className={`p-4 border-b rounded-t-lg ${
            isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'
          } flex items-center justify-between`}>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <BotIcon size={20} className={`text-green-500 ${isModelLoading ? 'animate-pulse' : ''}`} />
                {isModelReady && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </div>
              <div>
                <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Julius's AI Assistant
                </span>
                {isModelLoading && (
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Loading AI model...
                  </div>
                )}
                {isModelReady && (
                  <div className="text-xs text-green-600">WebLLM Ready</div>
                )}
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-500'
              }`}
            >
              <XIcon size={16} />
            </button>
          </div>

          {/* Loading Progress */}
          {loadingProgress && (
            <div className={`px-4 py-2 border-b text-xs ${
              isDarkMode ? 'border-gray-700 bg-gray-800 text-gray-300' : 'border-gray-200 bg-blue-50 text-gray-700'
            }`}>
              {loadingProgress}
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-xs ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user' 
                      ? 'bg-green-500' 
                      : isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    {message.sender === 'user' ? (
                      <UserIcon size={16} className="text-white" />
                    ) : (
                      <BotIcon size={16} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
                    )}
                  </div>
                  <div className={`px-3 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-green-500 text-white'
                      : isDarkMode 
                        ? 'bg-gray-700 text-gray-200' 
                        : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    <BotIcon size={16} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
                  </div>
                  <div className={`px-3 py-2 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className={`p-4 border-t ${
            isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isModelLoading ? "Loading AI model..." : "Ask about Julius's projects..."}
                disabled={isModelLoading}
                className={`flex-1 px-3 py-2 rounded-lg border text-sm ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50`}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isModelLoading}
                className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <SendIcon size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        <MessageCircleIcon size={24} />
      </button>
    </div>
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
              ? 'border-emerald-500 border-t-transparent' 
              : 'border-green-600 border-t-transparent'
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
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Julius Eric Tuliao
            </h1>
            
            <div className="hidden md:flex items-center space-x-8">
              {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-white transition-colors duration-300"
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
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent leading-tight">
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
                        : 'bg-white text-gray-600 hover:text-green-600'
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
                      ? 'bg-green-600 text-white'
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
                  <h3 className="text-lg font-semibold mb-4 text-green-600 dark:text-green-400">
                    {skillGroup.category}
                  </h3>
                  <div className="space-y-3">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <div 
                        key={skillIndex}
                        className="flex items-center space-x-2 px-3 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
                      >
                        <div className="h-2 w-2 rounded-full bg-green-500" />
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
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
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
                        : 'border border-gray-300 hover:border-green-600 hover:text-green-600'
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
      
      {/* AI Chatbot */}
      <AIChatbot isDarkMode={isDarkMode} />
    </div>
  );
};

export default Portfolio;