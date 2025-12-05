# Content Type Icons

A simple Node.js application that renders Material Icons based on a JSON configuration file. The app displays various content type icons with customizable colors and styles using Bootstrap and Material Icons.

## Features

- **Configuration-driven**: Icons, colors, and styles are defined in `config/icons.json`
- **Material Icons**: Uses Google's Material Icons with outlined style
- **Bootstrap styling**: Responsive layout with Bootstrap 5
- **Custom color schemes**: Predefined color classes for consistent theming
- **API endpoint**: Exposes icons configuration via `/api/icons`

## Project Structure

```
content-type-icons/
├── app.js                 # Express server
├── package.json           # Node.js dependencies
├── config/
│   └── icons.json         # Icons configuration
├── views/
│   └── index.ejs          # Main HTML template
└── public/
    └── styles.css         # Custom CSS styles
```

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:3002`

## Configuration

The `config/icons.json` file defines the icons to display:

```json
{
  "icons": [
    {
      "id": "web_asset",
      "name": "Web Asset", 
      "icon": "web_asset",
      "iconClass": "material-icons-outlined",
      "textColor": "rgb(63, 81, 181)",
      "backgroundColor": "rgb(232, 234, 246)"
    }
  ]
}
```

### Icon Properties

- **id**: Unique identifier for the icon
- **name**: Display name shown below the icon
- **icon**: Material Icons icon name
- **iconClass**: CSS class for icon style (e.g., `material-icons-outlined`)
- **textColor**: RGB color value for icon color (e.g., `rgb(63, 81, 181)`)
- **backgroundColor**: RGB color value for background color (e.g., `rgb(232, 234, 246)`)

### RGB Color Format

Colors are now specified using RGB values for precise color control:

#### Example RGB Colors Used
- **Indigo**: Text `rgb(63, 81, 181)`, Background `rgb(232, 234, 246)`
- **Blue**: Text `rgb(25, 118, 210)`, Background `rgb(227, 242, 253)`
- **Green**: Text `rgb(56, 142, 60)`, Background `rgb(232, 245, 232)`
- **Red**: Text `rgb(211, 47, 47)`, Background `rgb(255, 235, 238)`
- **Orange**: Text `rgb(245, 124, 0)`, Background `rgb(255, 243, 224)`
- **Purple**: Text `rgb(123, 31, 162)`, Background `rgb(243, 229, 245)`
- **Yellow**: Text `rgb(249, 168, 37)`, Background `rgb(255, 253, 231)`
- **Gray**: Text `rgb(97, 97, 97)`, Background `rgb(245, 245, 245)`

## API Endpoints

- **GET /**: Main landing page displaying all configured icons
- **GET /api/icons**: Returns the icons configuration as JSON

## Dependencies

- **express**: Web server framework
- **ejs**: Templating engine for dynamic HTML
- **Material Icons**: Google's icon font
- **Bootstrap 5**: CSS framework for responsive design

## Development

To add new icons:

1. Edit `config/icons.json` to add new icon objects
2. Optionally add new color classes to `public/styles.css`
3. Restart the server to see changes

The application automatically loads the configuration on each request, so you can modify `icons.json` and refresh the browser to see updates.