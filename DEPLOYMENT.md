# Deployment Guide

## Overview

This portfolio application is optimized for deployment on Vercel with specific configurations for WebLLM compatibility and optimal performance across devices.

## Prerequisites

- Node.js 18+
- Vercel CLI (optional but recommended)
- Git repository

## Deployment Configuration

### Vercel Configuration (`vercel.json`)

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control", 
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
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

### Key Configuration Elements

#### Framework Detection
- `"framework": "vite"` - Tells Vercel to use Vite-optimized build process

#### Build Configuration  
- `"buildCommand": "npm run build"` - Custom build command
- `"outputDirectory": "dist"` - Vite's default output directory

#### WebLLM Headers
- **COOP**: `same-origin` - Required for SharedArrayBuffer access
- **COEP**: `require-corp` - Enables WebAssembly threading
- **Cache-Control**: Long-term caching for static assets

## Build Process

### Local Build Verification

```bash
# Clean previous builds
rm -rf dist

# Run production build
npm run build

# Verify output structure
ls -la dist/
# Should show:
# - index.html
# - assets/ (with JS/CSS chunks)
# - images/ (project screenshots)
# - icon.png, vite.svg
```

### Build Output Analysis

Expected build results:
```
dist/index.html                           0.69 kB │ gzip:     0.35 kB
dist/assets/index-DowmCxZT.css           22.63 kB │ gzip:     4.71 kB
dist/assets/icons-CfiYf-Vy.js             6.75 kB │ gzip:     1.89 kB
dist/assets/index-BiYcaLQo.js            31.72 kB │ gzip:    10.49 kB
dist/assets/react-vendor-ogjpKoOq.js    141.15 kB │ gzip:    45.33 kB
dist/assets/webllm-BeMKBVrM.js        5,512.84 kB │ gzip: 1,975.30 kB
```

## Deployment Methods

### Method 1: Git Integration (Recommended)

1. **Connect Repository**
   ```bash
   # Push to GitHub/GitLab/Bitbucket
   git add .
   git commit -m "Deploy portfolio"
   git push origin main
   ```

2. **Import to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository
   - Vercel automatically detects Vite and uses `vercel.json` config

3. **Automatic Deployments**
   - Every push to `main` triggers deployment
   - Preview deployments for other branches
   - Automatic domain assignment

### Method 2: Vercel CLI

1. **Install CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # Development deployment
   vercel
   
   # Production deployment
   vercel --prod
   ```

### Method 3: Manual Upload

1. **Build Locally**
   ```bash
   npm run build
   ```

2. **Drag & Drop**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Drag the `dist/` folder to the upload area

## Environment Variables

### Required Variables
None - All functionality runs client-side

### Optional Variables
- `VITE_ANALYTICS_ID` - Analytics tracking ID
- `VITE_DEBUG_MODE` - Enable debug logging

### Setting Variables in Vercel
1. Go to Project Settings
2. Navigate to Environment Variables
3. Add variables for Production/Preview environments

## Domain Configuration

### Custom Domain Setup

1. **Add Domain in Vercel**
   - Project Settings → Domains
   - Add your custom domain

2. **DNS Configuration**
   ```
   # For apex domain (example.com)
   A record: 76.76.19.61

   # For subdomain (www.example.com)  
   CNAME: cname.vercel-dns.com
   ```

3. **SSL Certificate**
   - Automatically provisioned by Vercel
   - Includes wildcard support for subdomains

## Performance Optimization

### Bundle Analysis

Monitor bundle sizes:
```bash
# Analyze bundle
npm run build
# Check output sizes in terminal

# Optional: Use bundle analyzer
npm install --save-dev rollup-plugin-visualizer
```

### Caching Strategy

#### Static Assets (1 Year Cache)
- Images, fonts, icons
- Versioned JS/CSS files
- Cache-Control: `public, max-age=31536000, immutable`

#### Dynamic Content
- HTML files
- API responses
- Cache-Control: `public, max-age=0, must-revalidate`

### Code Splitting Verification

Ensure proper chunk splitting:
```javascript
// vite.config.js chunks
manualChunks: {
  'webllm': ['@mlc-ai/web-llm'],        // ~5.5MB
  'react-vendor': ['react', 'react-dom'], // ~141KB
  'icons': ['lucide-react']              // ~7KB
}
```

## Monitoring and Observability

### Vercel Analytics

Enable in Project Settings:
- Real User Monitoring (RUM)
- Web Vitals tracking
- Geographic performance data

### Performance Monitoring

Key metrics to track:
- **First Contentful Paint (FCP)**: <1.5s target
- **Largest Contentful Paint (LCP)**: <2.5s target  
- **Cumulative Layout Shift (CLS)**: <0.1 target
- **First Input Delay (FID)**: <100ms target

### Error Monitoring

Monitor for:
- WebLLM loading failures
- Memory errors on mobile devices
- Network connectivity issues
- Build failures

## Troubleshooting

### Common Deployment Issues

#### 1. "No Output Directory" Error
**Solution**: Verify `vercel.json` configuration
```json
{
  "outputDirectory": "dist"
}
```

#### 2. WebLLM Not Working
**Solution**: Check COOP/COEP headers
```bash
# Test headers
curl -I https://your-domain.com
# Should include:
# cross-origin-embedder-policy: require-corp
# cross-origin-opener-policy: same-origin
```

#### 3. Large Bundle Size Warnings
**Solution**: Verify code splitting in `vite.config.js`
```javascript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'webllm': ['@mlc-ai/web-llm']
      }
    }
  }
}
```

#### 4. Mobile Performance Issues
**Solution**: Check device detection logic
```javascript
// Verify mobile model selection
console.log('Selected model:', getOptimalModel());
console.log('Is mobile:', isMobile());
console.log('Device memory:', navigator.deviceMemory);
```

### Build Failures

#### Node.js Version Issues
```json
// package.json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

#### Dependency Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Memory Issues During Build
```bash
# Increase Node memory limit
export NODE_OPTIONS="--max_old_space_size=4096"
npm run build
```

## Security Considerations

### Content Security Policy

WebLLM requires specific headers:
- SharedArrayBuffer access
- WebAssembly execution  
- Worker thread creation

### HTTPS Requirement

WebLLM features require HTTPS:
- SharedArrayBuffer
- Service Workers
- Secure contexts only

### Data Privacy

- All AI processing happens locally
- No data sent to external servers
- User conversations stay in browser

## Rollback Strategy

### Immediate Rollback
```bash
# Via Vercel CLI
vercel --rollback

# Via Dashboard
# Go to Deployments → Select previous → Promote
```

### Gradual Rollout
```bash
# Deploy to staging first
vercel --target staging

# Test thoroughly
# Promote to production
vercel --prod
```

## Maintenance

### Regular Tasks

#### Monthly
- Update dependencies: `npm update`
- Check security vulnerabilities: `npm audit`
- Monitor bundle size growth
- Review performance metrics

#### Quarterly  
- Update Node.js version
- Review and update WebLLM models
- Performance optimization review
- Security audit

### Backup Strategy

- Git repository serves as primary backup
- Vercel maintains deployment history
- Static assets stored in Git LFS if needed

## Scaling Considerations

### Traffic Growth
- Vercel automatically scales
- CDN handles global distribution
- No server-side resources to manage

### Feature Additions
- New project data requires rebuild
- AI model updates need testing
- Bundle size monitoring important

### Cost Optimization
- Monitor bandwidth usage
- Optimize image sizes
- Consider image CDN for large galleries

## Support and Resources

### Vercel Documentation
- [Vercel Docs](https://vercel.com/docs)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)
- [Custom Headers](https://vercel.com/docs/concepts/projects/project-configuration#headers)

### WebLLM Resources  
- [WebLLM GitHub](https://github.com/mlc-ai/web-llm)
- [Model List](https://github.com/mlc-ai/web-llm/blob/main/examples/simple-chat/src/gh-config.js)
- [Browser Requirements](https://webllm.mlc.ai/#requirements)

### Community Support
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [React Community](https://reactjs.org/community/support.html)
- [Vite Community](https://vitejs.dev/guide/community.html)