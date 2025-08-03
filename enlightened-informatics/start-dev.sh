#!/bin/bash

echo "🚀 Starting Enlightened Informatics Landing Page..."
echo "📍 Server will be available at: http://localhost:8081"
echo ""

# Kill any existing processes on port 8081
lsof -ti:8081 | xargs kill -9 2>/dev/null || true

# Start the development server
cd "$(dirname "$0")"
npm run dev