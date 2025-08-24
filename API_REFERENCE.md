# API Reference

## Component APIs

### Portfolio Component

Main application component that orchestrates the entire portfolio experience.

#### Props
None - Root component

#### State
```javascript
{
  isMenuOpen: boolean,        // Mobile menu visibility
  isDarkMode: boolean,        // Theme state
  activeFilter: string,       // Project filter ('all' | 'ai' | 'data' | 'automation' | 'fullstack')
  isLoading: boolean,         // Initial loading state
  filteredProjects: Project[] // Computed filtered project list
}
```

#### Methods
- `setActiveFilter(filter: string)` - Updates project filter
- `setIsDarkMode(isDark: boolean)` - Toggles theme
- `setIsMenuOpen(isOpen: boolean)` - Controls mobile menu

---

### AIChatbot Component

AI-powered chatbot with WebLLM integration and device optimization.

#### Props
```javascript
{
  isDarkMode: boolean // Theme state from parent
}
```

#### State
```javascript
{
  isOpen: boolean,           // Chat window visibility
  messages: Message[],       // Conversation history
  inputMessage: string,      // Current input value
  isTyping: boolean,         // Bot typing indicator
  isModelLoading: boolean,   // Model download state
  isModelReady: boolean,     // Model ready state
  loadingProgress: string,   // Loading status text
  deviceWarning: string      // Device-specific warnings
}
```

#### Methods

##### Device Detection
```javascript
isMobile(): boolean
// Returns true if device is mobile (user agent + screen width check)

isLowMemoryDevice(): boolean  
// Returns true for devices with <4GB RAM or old mobile devices

getOptimalModel(): string
// Returns optimal WebLLM model ID based on device capabilities
```

##### Model Management
```javascript
initializeWebLLM(): Promise<void>
// Initializes WebLLM engine with optimal model for device

getRelevantContext(userMessage: string): Object
// Returns relevant projects and skills based on user query

createOptimizedSystemPrompt(userMessage: string): string
// Creates context-optimized system prompt

createMinimalSystemPrompt(): string
// Creates minimal system prompt as fallback
```

##### Context Management
```javascript
trimConversationHistory(messages: Message[], maxLength: number): Message[]
// Trims conversation history while preserving system message

tryWithContextOptimization(userInput: string): Promise<void>
// Attempts AI generation with progressive context optimization
```

##### Error Handling
```javascript
generateFallbackResponse(userMessage: string): string
// Generates rule-based response when AI is unavailable
```

---

### ProjectCard Component

Displays individual project information with image carousel.

#### Props
```javascript
{
  project: {
    title: string,
    description: string,
    tags: string[],
    category: 'ai' | 'data' | 'automation' | 'fullstack',
    githubLink: string,
    liveLink: string,
    images: string[]
  }
}
```

#### Features
- Responsive image carousel
- Tag display with color coding
- Project category classification
- External link integration

---

### ImageCarousel Component

Multi-image carousel with navigation controls.

#### Props
```javascript
{
  images: string[] // Array of image URLs
}
```

#### State
```javascript
{
  currentIndex: number // Currently displayed image index
}
```

#### Methods
```javascript
goToNext(): void
// Navigate to next image (with wraparound)

goToPrevious(): void  
// Navigate to previous image (with wraparound)

setCurrentIndex(index: number): void
// Jump to specific image
```

#### Features
- Touch/swipe navigation
- Dot indicators
- Keyboard navigation
- Auto-wraparound

---

### ThemeToggle Component

Dark/light mode toggle with system preference detection.

#### Props
```javascript
{
  isDarkMode: boolean,
  setIsDarkMode: (isDark: boolean) => void
}
```

#### Features
- System preference detection
- localStorage persistence
- Smooth transitions
- Accessibility support

## WebLLM Integration API

### Model Configuration

#### Desktop Model (Phi-3.5-mini)
```javascript
{
  modelId: "Phi-3.5-mini-instruct-q4f16_1-MLC",
  parameters: "3.8B",
  downloadSize: "~2.4GB",
  memoryUsage: "~4GB",
  contextWindow: "128K tokens",
  features: ["Full context", "Streaming", "Advanced reasoning"]
}
```

#### Mobile Model (SmolLM2-360M)
```javascript
{
  modelId: "SmolLM2-360M-Instruct-q4f16_1-MLC", 
  parameters: "360M",
  downloadSize: "~600MB",
  memoryUsage: "~1.2GB",
  contextWindow: "8K tokens",
  features: ["Mobile optimized", "Fast inference", "Basic reasoning"]
}
```

#### Low Memory Model (SmolLM2-135M)
```javascript
{
  modelId: "SmolLM2-135M-Instruct-q0f32-MLC",
  parameters: "135M", 
  downloadSize: "~150MB",
  memoryUsage: "~300MB",
  contextWindow: "4K tokens",
  features: ["Ultra lightweight", "Very fast", "Basic responses"]
}
```

### Chat Completion API

```javascript
const completion = await engine.chat.completions.create({
  messages: conversationHistory,
  stream: true,
  temperature: 0.7,
  top_p: 0.9
});

// Streaming response handling
for await (const chunk of completion) {
  const delta = chunk.choices[0]?.delta?.content;
  if (delta) {
    // Update UI with streaming text
  }
}
```

### Context Optimization Strategies

#### Strategy 1: Full Context
```javascript
{
  messages: conversationHistory.current,
  contextSize: "Full conversation + all project data",
  tokenCount: "~2000-3000 tokens",
  usage: "Desktop with full model"
}
```

#### Strategy 2: Trimmed History  
```javascript
{
  messages: trimConversationHistory(conversationHistory.current, 8),
  contextSize: "System prompt + last 8 messages", 
  tokenCount: "~1000-1500 tokens",
  usage: "Desktop with context limit"
}
```

#### Strategy 3: Optimized Context
```javascript
{
  messages: [optimizedSystemPrompt, ...recentMessages],
  contextSize: "Relevant projects/skills only",
  tokenCount: "~500-800 tokens", 
  usage: "Mobile or context error recovery"
}
```

#### Strategy 4: Minimal Context
```javascript
{
  messages: [minimalSystemPrompt, ...lastFewMessages],
  contextSize: "Basic info + recent messages",
  tokenCount: "~200-400 tokens",
  usage: "Low memory or final fallback"
}
```

## Error Handling API

### Error Types

#### ContextWindowSizeExceededError
```javascript
{
  type: "ContextWindowSizeExceededError",
  message: "Prompt tokens exceed context window size",
  handling: "Automatic context optimization retry",
  fallback: "Rule-based response"
}
```

#### OutOfMemoryError
```javascript
{
  type: "OutOfMemoryError", 
  message: "Device memory insufficient",
  handling: "Graceful degradation",
  fallback: "Text-based responses"
}
```

#### NetworkError
```javascript
{
  type: "NetworkError",
  message: "Model download failed", 
  handling: "Offline response mode",
  fallback: "Cached responses"
}
```

### Error Recovery Flow

```javascript
try {
  // Attempt AI generation
} catch (error) {
  const isContextError = error.message?.includes('context window size');
  const isMemoryError = error.message?.includes('out of memory');
  const isNetworkError = error.message?.includes('network');
  
  if (isContextError) {
    // Try next optimization strategy
  } else if (isMemoryError) {
    // Degrade to text responses
  } else if (isNetworkError) {
    // Use offline fallback
  }
}
```

## Constants and Configuration

### Project Categories
```javascript
const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'ai', label: 'AI & ML' },
  { id: 'data', label: 'Data Engineering' }, 
  { id: 'automation', label: 'Automation' },
  { id: 'fullstack', label: 'Full Stack' }
];
```

### Skills Structure
```javascript
const SKILLS = [
  {
    category: "AI & Machine Learning",
    items: [/* skill array */]
  },
  // ... other categories
];
```

### Social Links
```javascript
const SOCIAL_LINKS = [
  { icon: GithubIcon, label: 'HuggingFace', href: 'https://huggingface.co/juliuserictuliao' },
  { icon: LinkedinIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/in/juliustuliao' },
  { icon: MailIcon, label: 'Email', href: 'mailto:juliuserictuliao@gmail.com' },
  { icon: BookAIcon, label: 'Medium', href: 'https://medium.com/@juliuserictuliao' }
];
```

## Performance Monitoring API

### Bundle Analysis
```javascript
{
  chunks: {
    'webllm': '5,512.84 kB',
    'react-vendor': '141.15 kB', 
    'icons': '6.75 kB',
    'main': '31.72 kB'
  },
  gzipped: {
    'webllm': '1,975.30 kB',
    'react-vendor': '45.33 kB',
    'icons': '1.89 kB', 
    'main': '10.49 kB'
  }
}
```

### Device Capability Detection
```javascript
{
  isMobile: boolean,
  isLowMemory: boolean,
  deviceMemory: number, // GB
  userAgent: string,
  screenWidth: number,
  optimalModel: string
}
```

### AI Performance Metrics
```javascript
{
  modelLoadTime: number,    // milliseconds
  responseTime: number,     // milliseconds  
  tokensPerSecond: number,  // inference speed
  contextStrategy: string,  // which strategy succeeded
  errorRate: number         // failure percentage
}
```