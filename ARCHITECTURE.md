# Architecture Documentation

## System Overview

This portfolio application follows a modern React architecture with AI integration via WebLLM. The system is designed for optimal performance across different devices while maintaining a rich user experience.

## Component Architecture

### Core Components

```
Portfolio (Root Component)
├── ThemeToggle
├── ImageCarousel
├── ProjectCard
├── AIChatbot
└── Navigation Components
```

### Component Responsibilities

#### `Portfolio.jsx` (Main Component)
- **State Management**: Global state for theme, menu, and loading states
- **Data Management**: Contains all project and skill data constants
- **Layout**: Orchestrates the overall page layout and sections
- **Responsive Design**: Handles mobile/desktop UI variations

#### `AIChatbot` Component
- **AI Integration**: Manages WebLLM model loading and inference
- **Device Detection**: Automatically selects optimal model based on device capabilities
- **Context Management**: Handles conversation history and context optimization
- **Error Recovery**: Implements fallback strategies for various failure modes
- **UI Management**: Floating chat interface with loading states

#### `ProjectCard` Component
- **Project Display**: Shows project information, tags, and images
- **Image Carousel Integration**: Embeds ImageCarousel for multi-image projects
- **Responsive Layout**: Adapts to different screen sizes

#### `ImageCarousel` Component
- **Multi-Image Display**: Handles projects with multiple screenshots
- **Navigation Controls**: Previous/Next buttons and dot indicators
- **Touch Support**: Swipe gestures for mobile devices

#### `ThemeToggle` Component
- **Dark/Light Mode**: Toggles between themes
- **System Preference**: Respects user's system color scheme
- **Persistent Storage**: Saves theme preference to localStorage

## Data Architecture

### Project Data Structure
```javascript
{
  title: string,
  description: string,
  tags: string[],
  category: 'ai' | 'data' | 'automation' | 'fullstack',
  githubLink: string,
  liveLink: string,
  images: string[]
}
```

### Skills Data Structure
```javascript
{
  category: string,
  items: string[]
}
```

### AI Conversation Structure
```javascript
{
  role: 'system' | 'user' | 'assistant',
  content: string
}
```

## AI Integration Architecture

### Model Selection Logic

```
Device Detection
├── isLowMemoryDevice()
│   ├── deviceMemory < 2GB → No AI model
│   └── deviceMemory < 4GB → SmolLM2-135M
├── isMobile()
│   └── Mobile device → SmolLM2-360M
└── Desktop
    └── Phi-3.5-mini
```

### Context Management Strategy

#### 4-Tier Fallback System:
1. **Full Context**: Complete conversation history + all project data
2. **Trimmed History**: Last 8 messages + all project data
3. **Optimized Context**: Recent messages + relevant projects/skills only
4. **Minimal Context**: Basic info + last few messages

### Error Handling Flow

```
Message Send Request
├── Try Strategy 1 (Full Context)
│   ├── Success → Return Response
│   └── Context Error → Try Strategy 2
├── Try Strategy 2 (Trimmed)
│   ├── Success → Return Response
│   └── Context Error → Try Strategy 3
├── Try Strategy 3 (Optimized)
│   ├── Success → Return Response
│   └── Context Error → Try Strategy 4
└── Try Strategy 4 (Minimal)
    ├── Success → Return Response
    └── All Failed → Fallback Response
```

## Performance Architecture

### Bundle Splitting Strategy

```
Main Bundle (42KB)
├── App Logic (31.7KB)
├── CSS Styles (22.6KB)
└── HTML Shell (0.7KB)

Vendor Chunks
├── WebLLM (5.5MB) - Lazy loaded when chat opens
├── React Vendor (141KB) - Core React libraries
└── Icons (6.7KB) - Lucide React icons
```

### Loading Strategy

1. **Critical Path**: Main app loads immediately (~42KB)
2. **Progressive Enhancement**: AI model loads when chat is first opened
3. **Code Splitting**: Large dependencies loaded on-demand
4. **Caching**: Aggressive caching for static assets

### Device-Specific Optimizations

#### Mobile Optimizations:
- Smaller chat window dimensions
- Touch-friendly interface elements
- Reduced model size (SmolLM2-360M vs Phi-3.5)
- Memory usage warnings
- Simplified context management

#### Desktop Optimizations:
- Full-featured AI model (Phi-3.5-mini)
- Larger context window
- Enhanced streaming capabilities
- Advanced error recovery

## State Management

### React State Architecture

```javascript
// Global Portfolio State
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [isDarkMode, setIsDarkMode] = useState(/* system preference */);
const [activeFilter, setActiveFilter] = useState('all');
const [isLoading, setIsLoading] = useState(true);

// AI Chatbot State  
const [isOpen, setIsOpen] = useState(false);
const [messages, setMessages] = useState(/* initial message */);
const [isTyping, setIsTyping] = useState(false);
const [isModelLoading, setIsModelLoading] = useState(false);
const [isModelReady, setIsModelReady] = useState(false);
const [deviceWarning, setDeviceWarning] = useState('');
```

### State Flow Patterns

#### Theme Management:
```
User Toggle → State Update → DOM Class Toggle → localStorage Save
```

#### AI Chat Flow:
```
Chat Open → Device Detection → Model Selection → Model Loading → Ready State
```

#### Message Flow:
```
User Input → Add to History → Context Optimization → AI Processing → Stream Response → Update UI
```

## Security Architecture

### Content Security Policy
- **COOP**: `same-origin` for SharedArrayBuffer support
- **COEP**: `require-corp` for WebLLM threading
- **Asset Isolation**: Static assets served with proper headers

### Data Privacy
- **Local Processing**: All AI inference runs locally in browser
- **No Data Transmission**: User conversations never leave the device
- **Memory Management**: Proper cleanup of sensitive data

### Error Boundary Strategy
- Graceful degradation for AI failures
- Fallback responses for network issues
- User-friendly error messages
- Debug information in development

## Deployment Architecture

### Vercel Configuration
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "headers": [/* WebLLM-specific headers */]
}
```

### Build Process
```
Source Code → Vite Build → Code Splitting → Minification → Deployment
```

### CDN Strategy
- Static assets cached for 1 year
- Dynamic content with optimized TTL
- Geographic distribution via Vercel Edge Network

## Monitoring & Observability

### Performance Metrics
- Bundle size monitoring
- Load time tracking  
- AI model performance
- Error rate monitoring

### Debug Capabilities
- Console logging for AI decisions
- Device capability reporting
- Performance timing data
- Error stack traces

## Scalability Considerations

### Horizontal Scaling
- Stateless design enables easy scaling
- CDN handles static asset distribution
- Client-side AI removes server AI costs

### Performance Scaling
- Progressive loading reduces initial bundle
- Device-appropriate models prevent overload
- Caching strategy reduces bandwidth

### Feature Scaling
- Modular component architecture
- Easy to add new project categories
- Extensible AI model support

## Future Architecture Considerations

### Potential Enhancements
- **PWA Support**: Service worker for offline functionality
- **Multi-language Support**: i18n integration
- **Advanced Analytics**: User interaction tracking
- **Model Updates**: Dynamic model loading from CDN

### Technical Debt Management
- Regular dependency updates
- Bundle size monitoring
- Performance regression testing
- Security vulnerability scanning