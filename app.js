const express = require('express');
const path = require('path');
const fs = require('fs');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3002;

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'ping-rocks-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Serve static files
app.use('/public', express.static(path.join(__dirname, 'public')));

// Load icons configuration
const loadIconsConfig = () => {
  try {
    const configPath = path.join(__dirname, 'config', 'icons.json');
    const configData = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(configData);
  } catch (error) {
    console.error('Error loading icons configuration:', error);
    return { icons: [] };
  }
};

// Authentication middleware
const requireAuth = (req, res, next) => {
  if (req.session && req.session.authenticated) {
    return next();
  } else {
    return res.redirect('/login');
  }
};

// Route for login page
app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// Handle login form submission
app.post('/login', (req, res) => {
  const { password } = req.body;

  if (password === 'ping-rocks') {
    req.session.authenticated = true;
    res.redirect('/');
  } else {
    res.render('login', { error: 'Invalid password. Please try again.' });
  }
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/login');
  });
});

// Route for the main landing page (protected)
app.get('/', requireAuth, (req, res) => {
  const iconsConfig = loadIconsConfig();
  res.render('index', {
    icons: iconsConfig.icons,
    title: 'Content Type Icons'
  });
});

// API endpoint to get icons configuration
app.get('/api/icons', (req, res) => {
  const iconsConfig = loadIconsConfig();
  res.json(iconsConfig);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});