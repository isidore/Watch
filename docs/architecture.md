# Watch Project Architecture

## Overview
A steampunk-themed digital/analog clock web application designed for mobile-first usage with PWA capabilities.

## Core Architectural Decisions

### Technology Stack
- **Frontend**: Pure HTML5, CSS3, Vanilla JavaScript
- **Rationale**: Keep it simple, no build process needed, fast loading on mobile
- **Deployment**: GitHub Pages with automated CI/CD

### Architecture Pattern
- **Pattern**: Simple MVC-like separation
- **Structure**:
  - `index.html` - View structure
  - `css/styles.css` - Presentation layer with steampunk theming
  - `js/clock.js` - Controller logic for time display and view switching
- **Rationale**: Minimal complexity, easy to maintain and extend

### Design Principles
- **Mobile-First**: Responsive design optimized for phone usage
- **Progressive Enhancement**: Works without JavaScript, enhanced with it
- **Performance**: Minimal dependencies, fast load times
- **Accessibility**: Semantic HTML, proper contrast ratios

### Deployment Strategy
- **Local Development**: `run.sh` script using Python's built-in server
- **Production**: GitHub Pages with automatic deployment via GitHub Actions
- **PWA Features**: Manifest file for "Add to Home Screen" functionality

### Theming Architecture
- **CSS Custom Properties**: For consistent steampunk color scheme
- **Modular CSS**: Separate concerns (layout, theming, components)
- **Typography**: Web fonts for authentic steampunk feel

## Implementation Details

### Clock Logic
- **SteampunkClock Class**: Encapsulates all clock functionality
- **Real-time Updates**: 1-second intervals using `setInterval`
- **Dual Display**: Digital (Orbitron font) and analog (SVG-like CSS)
- **Smooth Animations**: CSS transitions for hand movements

### Visual Features
- **Animated Gears**: CSS keyframe animations for steampunk atmosphere
- **Glowing Effects**: Text shadows and box shadows for brass/copper glow
- **Responsive Design**: Mobile-first with breakpoints at 480px
- **Blinking Separators**: Digital clock colon animation

### PWA Implementation
- **Manifest**: Defines app metadata for installation
- **Service Worker**: Not implemented (static content doesn't require caching)
- **Icons**: Inline SVG icon for home screen

### Deployment Pipeline
- **GitHub Actions**: Automatic deployment on push to main
- **Static Hosting**: GitHub Pages serves files directly
- **No Build Step**: Pure HTML/CSS/JS for simplicity