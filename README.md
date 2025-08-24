# Julius Eric Tuliao - Portfolio Website

A modern, responsive portfolio website featuring an AI-powered chatbot assistant built with React, Vite, and WebLLM.

## 🚀 Features

### 💼 Portfolio Showcase
- **17 Featured Projects** across AI/ML, Data Engineering, Automation, and Full Stack development
- **Interactive Project Filtering** by category (AI & ML, Data Engineering, Automation, Full Stack)
- **Image Carousel** for project showcases with multiple images per project
- **Responsive Design** optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode** toggle with system preference detection

### 🤖 AI-Powered Chatbot
- **WebLLM Integration** - Local AI models running entirely in the browser
- **Smart Device Detection** - Automatically selects optimal model based on device capabilities:
  - **Desktop**: Phi-3.5-mini (3.8B parameters, ~2.4GB)
  - **Mobile**: SmolLM2-360M (360M parameters, ~600MB) 
  - **Low Memory**: SmolLM2-135M (135M parameters, ~150MB)
- **Context-Aware Responses** with knowledge of all projects and skills
- **Streaming Responses** for real-time conversation experience
- **Progressive Fallback System** with 4-tier context optimization
- **Mobile Crash Prevention** with memory usage warnings

### 🎨 Modern UI/UX
- **Green Color Scheme** with emerald accents
- **Smooth Animations** and transitions
- **Loading States** and progress indicators
- **Professional Typography** and spacing
- **Sticky Navigation** with smooth scrolling

## 🛠️ Tech Stack

### Frontend
- **React 18** - Component-based UI library
- **Vite 6** - Fast build tool and dev server
- **Tailwind CSS 3** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

### AI/ML
- **WebLLM** - Browser-based large language model inference
- **Multiple Model Support**:
  - Phi-3.5-mini (Desktop)
  - SmolLM2-360M (Mobile)  
  - SmolLM2-135M (Low Memory)
- **Advanced Optimization** - See [WEBLLM_OPTIMIZATION.md](./WEBLLM_OPTIMIZATION.md) for Web Workers and caching

### Development
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### Deployment
- **Vercel** - Serverless deployment platform
- **Custom Headers** - WebLLM-optimized COOP/COEP headers
- **Code Splitting** - Optimized bundle loading

## 📁 Project Structure

```
my_port/
├── public/                 # Static assets
│   ├── icon.png           # Favicon
│   ├── images/            # Project screenshots
│   └── vite.svg           # Vite logo
├── src/
│   ├── components/
│   │   └── Portfolio.jsx  # Main portfolio component
│   ├── App.jsx           # Root application
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles
├── dist/                  # Build output (generated)
├── vercel.json           # Vercel deployment config
├── vite.config.js        # Vite configuration
├── tailwind.config.cjs   # Tailwind CSS config
├── postcss.config.cjs    # PostCSS config
└── package.json          # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my_port
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📱 Device Compatibility

### Desktop
- **Model**: Phi-3.5-mini (3.8B parameters)
- **Memory**: ~4GB RAM usage
- **Features**: Full context window, streaming responses
- **Performance**: Optimal AI experience

### Mobile
- **Model**: SmolLM2-360M (360M parameters)  
- **Memory**: ~1.2GB RAM usage
- **Features**: Mobile-optimized, good performance
- **Performance**: Balanced experience

### Low Memory Devices
- **Model**: SmolLM2-135M (135M parameters)
- **Memory**: ~300MB RAM usage  
- **Features**: Basic AI responses, very fast
- **Performance**: Lightweight experience

## 🤖 AI Chatbot Features

### Smart Context Management
- **Dynamic Context Selection** - Only relevant projects/skills included based on user query
- **4-Tier Fallback System**:
  1. Full context with complete conversation history
  2. Trimmed conversation history (last 8 messages)
  3. Optimized context with relevant info only
  4. Minimal context as last resort

### Error Handling
- **Context Window Exceeded** - Automatic optimization and retry
- **Memory Insufficient** - Graceful degradation to text responses
- **Network Issues** - Offline fallback responses
- **Model Loading Failures** - Smart error messages with alternatives

### Conversation Features
- **Streaming Responses** - Real-time text generation
- **Typing Indicators** - Visual feedback during generation
- **Message History** - Persistent conversation within session
- **Professional Knowledge** - Pre-loaded with all project and skill data

## 📊 Performance Optimizations

### Code Splitting
- **WebLLM Library**: 5.5MB chunk (loads only when needed)
- **React Vendor**: 141KB chunk (shared libraries)
- **Icons**: 6.7KB chunk (Lucide React icons)
- **Main App**: 31.7KB chunk (portfolio code)

### Caching Strategy
- **Static Assets**: Long-term caching (1 year)
- **Dynamic Content**: Optimized cache headers
- **Build Optimization**: Minified and compressed bundles

### Mobile Optimizations
- **Responsive Chat Window**: Smaller dimensions on mobile
- **Touch-Friendly Interface**: Optimized for mobile interactions
- **Performance Monitoring**: Device capability detection

## 🌐 Deployment

### Vercel Configuration

The project is optimized for Vercel deployment with:

```json
{
  "framework": "vite",
  "buildCommand": "npm run build", 
  "outputDirectory": "dist",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cross-Origin-Embedder-Policy",
          "value": "require-corp"
        },
        {
          "key": "Cross-Origin-Opener-Policy",
          "value": "same-origin"
        }
      ]
    }
  ]
}
```

### Required Headers for WebLLM
- **COOP**: `same-origin` - Required for SharedArrayBuffer
- **COEP**: `require-corp` - Enables WebLLM threading
- **Cache Control**: Optimized for static assets

## 📝 Configuration Files

### Vite Configuration (`vite.config.js`)
```javascript
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'webllm': ['@mlc-ai/web-llm'],
          'react-vendor': ['react', 'react-dom'],
          'icons': ['lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 6000,
  },
  optimizeDeps: {
    exclude: ['@mlc-ai/web-llm']
  }
})
```

### Tailwind Configuration (`tailwind.config.cjs`)
- **Green Color Scheme** with emerald accents
- **Dark Mode Support** with system preference detection
- **Responsive Breakpoints** for mobile-first design

## 🎨 Design System

### Color Palette
- **Primary**: Green-600 to Emerald-600 gradient
- **Accent**: Green-500 for interactive elements
- **Background**: White/Gray-900 (light/dark mode)
- **Text**: Gray-600 to Gray-300 (light/dark mode)

### Typography
- **Headers**: Bold, gradient text with Tailwind gradients
- **Body**: Clean, readable sans-serif
- **Code**: Monospace for technical content

### Components
- **ProjectCard**: Showcases individual projects with images and tags
- **ImageCarousel**: Multi-image display with navigation
- **AIChatbot**: Floating chat interface with AI integration
- **ThemeToggle**: Light/dark mode switcher

## 🔧 Development Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production  
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Deployment
vercel               # Deploy to Vercel
vercel --prod        # Deploy to production
```

## 📈 Performance Metrics

### Bundle Sizes
- **Total**: ~5.7MB (1.98MB gzipped)
- **Main App**: 31.7KB (10.5KB gzipped)
- **React Vendor**: 141KB (45KB gzipped)
- **WebLLM**: 5.5MB (1.97MB gzipped)

### Loading Strategy
- **Critical Path**: Main app loads first (~42KB)
- **Progressive Enhancement**: AI features load when chat opens
- **Cache Optimization**: Static assets cached for 1 year

## 🐛 Troubleshooting

### Common Issues

1. **Chat not working on mobile**
   - Check device memory (requires 2GB+ for basic model)
   - Ensure WebLLM headers are properly set
   - Verify network connection for model download

2. **Build failing**
   - Clear node_modules and reinstall dependencies
   - Check Vite configuration for proper chunking
   - Verify all imports are correct

3. **Deployment issues**
   - Confirm vercel.json points to correct output directory
   - Check build command generates dist/ folder
   - Verify headers configuration for WebLLM

### Debug Mode
Enable console logging to see:
- Model selection decisions
- Context optimization strategies
- Performance metrics
- Error details

## 📄 License

This project is for portfolio purposes. All rights reserved.

## 🤝 Contributing

This is a personal portfolio project, but feedback and suggestions are welcome!

## 📞 Contact

- **Email**: juliuserictuliao@gmail.com
- **LinkedIn**: [linkedin.com/in/juliustuliao](https://www.linkedin.com/in/juliustuliao)
- **HuggingFace**: [huggingface.co/juliuserictuliao](https://huggingface.co/juliuserictuliao)
- **Medium**: [@juliuserictuliao](https://medium.com/@juliuserictuliao)

---

Built with ❤️ using React, WebLLM, and modern web technologies.