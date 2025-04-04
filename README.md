# UNIGEN HUB

A modern, AI-powered website for content and data generation services. UNIGEN HUB features a sleek, futuristic design with dark-themed UI, neon-blue highlights, and smooth animations.

## Features

- **Dynamic Hero Section**: Interactive hologram animation showcasing the AI capabilities
- **Problem Statement**: Explains how UNIGEN HUB solves content creation challenges
- **Features Overview**: Displays core functionalities like AI-driven document creation
- **Interactive AI Chatbot**: Generate documents, presentations, and images using OpenAI
- **Call to Action**: Contact forms for user engagement

## Technologies Used

- React
- Vite
- Tailwind CSS
- OpenAI API integration

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key (for AI generation features)

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd unigen-hub
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```
   
   Alternatively, you can enter your API key directly in the UI when using the AI features.

4. Start the development server
   ```
   npm run dev
   ```

5. Open your browser and go to http://localhost:5173

## Using the AI Features

UNIGEN HUB includes an interactive AI demo that allows you to:

1. **Generate Documents**: Create well-structured documents on any topic
2. **Create Presentations**: Build presentation outlines with slides
3. **Generate Images**: Create custom images using AI

To use these features, you need an OpenAI API key. You can either:

- Add it to your `.env` file as shown above
- Enter it directly in the UI when prompted

## Building for Production

To create a production build:

```
npm run build
```

The built files will be in the `dist` directory, ready to be deployed to your hosting service.

## License

[MIT](LICENSE)

## Acknowledgements

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

# UniGenHub Project

A modern document generation platform with Google OAuth integration and dark/light theme support.

![UniGenHub Dashboard](/images/dashboard-screenshot.png)

## Features

- **Google OAuth Integration**: Secure login with Google
- **Dark/Light Theme Support**: Toggle between themes with consistent styling
- **Responsive Design**: Works on all device sizes
- **Modern UI**: Clean, professional interface with animations and transitions

## Screenshots

<div align="center">
  <img src="/images/landing-dark.png" alt="Landing Page (Dark)" width="45%" />
  <img src="/images/landing-light.png" alt="Landing Page (Light)" width="45%" />
  <br/><br/>
  <img src="/images/login-dark.png" alt="Login Modal (Dark)" width="45%" />
  <img src="/images/login-light.png" alt="Login Modal (Light)" width="45%" />
  <br/><br/>
  <img src="/images/dashboard-dark.png" alt="Dashboard (Dark)" width="45%" />
  <img src="/images/dashboard-light.png" alt="Dashboard (Light)" width="45%" />
</div>

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Configure Google OAuth:
   - Create a project in the [Google Cloud Console](https://console.cloud.google.com/)
   - Set up OAuth 2.0 credentials
   - Add your domain to the authorized JavaScript origins (e.g., http://localhost:5173 for development)
   - Update the `GOOGLE_CLIENT_ID` in `src/main.jsx` with your own client ID

4. Start the development server:
```bash
npm run dev
```

## Troubleshooting

### Google OAuth Not Working
- Ensure you've created a valid Google OAuth client ID
- Check that your authorized JavaScript origins includes your development URL
- Make sure jwt-decode is installed with the correct version:
```bash
npm uninstall jwt-decode
npm install jwt-decode@3.1.2
```

### Theme Issues
- If the dark theme appears inconsistent, check that the CSS variables in `src/index.css` are properly defined
- Make sure the `document.documentElement.classList.contains('dark')` check is present in components
- Verify that the MutationObserver is correctly set up to detect theme changes

### Import Errors
If you see errors related to module imports, try these solutions:
- Use the import name `jwtDecode` instead of `jwt_decode`
- Make sure all dependencies are properly installed in package.json
- Try restarting the development server

## Dependencies

The main dependencies for this project are:
- React + React Router
- Tailwind CSS for styling
- @react-oauth/google for Google authentication
- jwt-decode@3.1.2 for handling JWT tokens

## Code Structure

- `/src/components`: UI components
- `/src/components/auth`: Authentication components (Login, Signup)
- `/src/pages`: Page components
- `/src/index.css`: Global CSS including theme variables

## Adding Screenshots

To add your own screenshots to this README:

1. Create an `/images` folder in the root of your project
2. Take screenshots of your application in both dark and light modes
3. Save them to the `/images` folder with descriptive names
4. Update the image paths in this README to match your screenshot filenames
