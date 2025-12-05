const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3002;

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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

// Route for the main landing page
app.get('/', (req, res) => {
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