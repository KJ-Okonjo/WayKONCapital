#!/bin/bash

# WayKon Capital - Local Development Server
# Simple script to launch a local web server

echo "============================================"
echo "  WayKon Capital - Development Server"
echo "============================================"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "Starting server with Python 3..."
    echo "Access your site at: http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "============================================"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "Starting server with Python 2..."
    echo "Access your site at: http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "============================================"
    echo ""
    python -m SimpleHTTPServer 8000
else
    echo "Error: Python is not installed"
    echo ""
    echo "Please install Python 3 and try again:"
    echo "  - macOS: brew install python3"
    echo "  - Ubuntu/Debian: sudo apt install python3"
    echo "  - Windows: Download from python.org"
    echo ""
    echo "Or open index.html directly in your browser"
    exit 1
fi
