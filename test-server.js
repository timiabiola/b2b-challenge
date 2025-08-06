const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Test Server Working</title>
      <style>
        body {
          background: #0B3142;
          color: #00F0FF;
          font-family: Arial, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
        }
        .container {
          text-align: center;
        }
        h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        p {
          font-size: 1.5rem;
          color: #FFF6D6;
        }
        a {
          color: #FF2C6D;
          text-decoration: none;
          font-size: 1.2rem;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>✅ Node.js Server is Working!</h1>
        <p>If you can see this, Node.js is functioning correctly.</p>
        <p>Port 8081 is accessible.</p>
        <br>
        <a href="/">Try loading the Next.js app instead</a>
      </div>
    </body>
    </html>
  `);
});

const PORT = 8081;
server.listen(PORT, () => {
  console.log(`🚀 Test server running at http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop');
});