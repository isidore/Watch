#!/bin/bash

# Steampunk Watch - Local Development Server
echo "🍀 Starting Steampunk Watch development server..."

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "Using Python 3 HTTP server"
    echo "Opening http://localhost:8000"
    echo "Press Ctrl+C to stop the server"
    
    # Open browser after a short delay
    (sleep 2 && open http://localhost:8000) &
    
    # Start Python HTTP server
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "Using Python 2 HTTP server"
    echo "Opening http://localhost:8000"
    echo "Press Ctrl+C to stop the server"
    
    # Open browser after a short delay
    (sleep 2 && open http://localhost:8000) &
    
    # Start Python HTTP server
    python -m SimpleHTTPServer 8000
else
    echo "❌ Python not found. Please install Python to run the development server."
    echo "Alternatively, you can open index.html directly in your browser."
    exit 1
fi
