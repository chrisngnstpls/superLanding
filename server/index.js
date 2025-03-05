const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-production-domain.com' 
    : 'http://localhost:5173', // Vite dev server default port
  methods: 'GET',
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Helmet for security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "connect-src": process.env.NODE_ENV === 'development' 
        ? ["'self'", "ws://localhost:*"] 
        : ["'self'"],
      "img-src": ["'self'", "data:", "https://via.placeholder.com"],
      "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      "style-src": ["'self'", "'unsafe-inline'"]
    }
  }
}));

// Serve static files
app.use('/home', express.static(path.join(__dirname, '../client/dist')));

// Serve the static news page
app.use('/news', express.static(path.join(__dirname, '../public/news')));

// Handle React routing, return all requests to React app
app.get('/home/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Default route
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Welcome to devsden.xyz portal</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #1a1a2e; }
          .link { display: block; margin: 20px 0; padding: 15px; background: #16213e; color: white; text-decoration: none; border-radius: 5px; }
          .link:hover { background: #0f3460; }
        </style>
      </head>
      <body>
        <h1>Choose from below</h1>
        <p>-----------------------------------------------</p>
        <a class="link" href="/home">devsden.projects</a>
        <a class="link" href="/news">Static placeholder for under construction</a>
      </body>
    </html>
  `);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`- Home page: http://localhost:${PORT}/`);
  console.log(`- React app: http://localhost:${PORT}/home`);
  console.log(`- News page: http://localhost:${PORT}/news`);
});
