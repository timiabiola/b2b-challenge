# Quick Start Guide - Enlightened Informatics Landing Page

## 🚀 How to Run the Development Server

### Option 1: Using the start script (Recommended)
```bash
cd "/Users/timiabiola/EI Landing Page/enlightened-informatics"
./start-dev.sh
```

### Option 2: Using npm directly on port 8081
```bash
cd "/Users/timiabiola/EI Landing Page/enlightened-informatics"
npm run dev
```

### Option 3: Alternative ports
If port 8081 is not working, try these alternatives:

```bash
# Port 3001
npm run dev:3001

# Port 3000 (default)
npm run dev:3000
```

### Option 4: Manual port specification
```bash
npx next dev --port 8082
```

## 🌐 Accessing the Site

Once the server is running, open your browser and go to:
- Port 8081: http://localhost:8081
- Port 3001: http://localhost:3001
- Port 3000: http://localhost:3000

## 🔧 Troubleshooting

### If the server won't start:

1. **Kill any processes using the port:**
   ```bash
   # For port 8081
   lsof -ti:8081 | xargs kill -9
   
   # For port 3000
   lsof -ti:3000 | xargs kill -9
   ```

2. **Check if Node.js is installed:**
   ```bash
   node --version
   ```
   Should show v20.x or higher

3. **Reinstall dependencies:**
   ```bash
   rm -rf node_modules
   npm install
   ```

4. **Try a different terminal:**
   - Open a new Terminal window
   - Navigate to the project directory
   - Run `npm run dev`

5. **Check firewall settings:**
   - Make sure your firewall isn't blocking localhost connections
   - On Mac: System Preferences > Security & Privacy > Firewall

## 📱 Testing on Mobile

To test on your phone while on the same network:
1. Find your computer's IP address (shown when server starts)
2. On your phone, navigate to: http://[YOUR-IP]:8081
   Example: http://192.168.1.95:8081

## 🛑 Stopping the Server

Press `Ctrl + C` in the terminal where the server is running.

## 📧 Need Help?

If you're still having issues, try:
1. Restart your computer
2. Use a different browser
3. Clear your browser cache
4. Contact support with the error message