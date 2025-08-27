# 🕰️ Steampunk Watch

 
A beautiful steampunk-themed digital and analog clock web application designed for mobile devices.

## 🌐 Live Demo

- **GitHub Pages**: https://isidore.github.io/Watch/
- **Repository**: https://github.com/isidore/Watch

## ✨ Features

- **Dual Display Modes**: Toggle between digital and analog clock views
- **Steampunk Aesthetic**: Brass, copper, and bronze color scheme with animated gears
- **Mobile-First Design**: Optimized for phone usage with responsive layout
- **PWA Support**: Install to home screen for native app experience
- **Real-Time Updates**: Live clock with smooth animations

## 🚀 Local Development

### Quick Start
```bash
./run.sh
```

This will start a local development server and automatically open the app in your browser at `http://localhost:8000`.

### Manual Setup
If you prefer to run it manually:
```bash
# Using Python 3
python3 -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000
```

## 📱 Mobile Installation

1. Visit the live demo on your phone
2. Tap "Add to Home Screen" (iOS) or "Install" (Android)
3. Enjoy the app like a native mobile application

## 🏗️ Architecture

- **Pure Web Technologies**: HTML5, CSS3, Vanilla JavaScript
- **No Build Process**: Direct deployment to GitHub Pages
- **Progressive Enhancement**: Works without JavaScript, enhanced with it
- **Steampunk Design System**: CSS custom properties for consistent theming

## 📁 Project Structure

```
/
├── run.sh                    # Local development server
├── index.html               # Main HTML file
├── css/styles.css           # Steampunk styling
├── js/clock.js             # Clock logic and controls
├── manifest.json           # PWA configuration
├── .github/workflows/      # GitHub Actions deployment
└── docs/                   # Project documentation
```

## 🎨 Design Features

- **Typography**: Cinzel (headers) and Orbitron (digital display)
- **Color Palette**: Brass (#B8860B), Copper (#B87333), Bronze (#CD7F32)
- **Animations**: Rotating gears, blinking separators, smooth hand movements
- **Responsive**: Optimized for screens from 320px to desktop

## 🔧 Development

The app follows a simple MVC-like architecture:
- `index.html` - View structure
- `css/styles.css` - Presentation layer
- `js/clock.js` - Controller logic

## 📄 License

Open source project - feel free to use and modify!
