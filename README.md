
# ⚡️ UNIGEN HUB 🧠

> A modern, AI-powered website for content and data generation services.  
> **UNIGEN HUB** features a sleek, futuristic design with dark-themed UI, neon-blue highlights, and smooth animations.

---

## ✨ Features

- 🤖 **Dynamic Hero Section**: Interactive hologram animation showcasing the AI capabilities  
- 🧩 **Problem Statement**: Explains how UNIGEN HUB solves content creation challenges  
- 🛠️ **Features Overview**: Displays core functionalities like AI-driven document creation  
- 💬 **Interactive AI Chatbot**: Generate documents, presentations, and images using OpenAI  
- 📩 **Call to Action**: Contact forms for user engagement  

---

## 🧰 Technologies Used

- ⚛️ React  
- ⚡ Vite  
- 🎨 Tailwind CSS  

---

## 🛫 Getting Started

### ✅ Prerequisites

- 🔧 Node.js (v14 or higher)  
- 📦 npm or yarn  
- 🔐 OpenAI API key (for AI generation features)  

### 📥 Installation

```bash
git clone <repository-url>
cd unigen-hub
```

```bash
npm install
```

### 🔑 Set Up Environment Variables

Create a `.env` file in the root directory with the following:
```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

Or, enter your API key directly in the UI when using the AI features.

### 🚀 Start the Development Server

```bash
npm run dev
```

🌐 Open your browser and go to: [http://localhost:5173](http://localhost:5173)

---

## 🤖 Using the AI Features

UNIGEN HUB includes an interactive AI demo that allows you to:

- 📝 **Generate Documents**: Create well-structured documents on any topic  
- 📊 **Create Presentations**: Build presentation outlines with slides  
- 🎨 **Generate Images**: Create custom images using AI  

You can use your OpenAI API key by:

- Adding it to your `.env` file  
- Entering it directly in the UI when prompted  

---

## 🏗️ Building for Production

```bash
npm run build
```

📁 The built files will be in the `dist` directory, ready for deployment.

---

## 🧾 License

🪪 [MIT](LICENSE)

---

## 🙌 Acknowledgements

- 🌐 [React](https://reactjs.org/)  
- 💨 [Tailwind CSS](https://tailwindcss.com/)  
- ⚡ [Vite](https://vitejs.dev/)  

---

# 📚 UniGenHub Project

> A modern document generation platform with Google OAuth integration and dark/light theme support.

![UniGenHub Dashboard](/images/Landing.png)

---

## 🌟 Features

- 🔐 **Google OAuth Integration**: Secure login with Google  
- 🌙🌞 **Dark/Light Theme Support**: Toggle between themes with consistent styling  
- 📱 **Responsive Design**: Works on all device sizes  
- 🖥️ **Modern UI**: Clean, professional interface with animations and transitions  

---

## 🖼️ Screenshots

<div align="center">
  <img src="/images/Document-Creator.png" alt="Landing Page (Dark)" width="45%" />
  <br/><br/>
  <img src="/images/Dashboard.png" alt="Login Modal (Dark)" width="45%" />
  <br/><br/>
  <img src="/images/Tools.png" alt="Dashboard (Dark)" width="45%" />
</div>

---

## ⚙️ Setup Instructions

```bash
git clone <repository-url>
cd project
```

```bash
npm install
```

### 🔧 Configure Google OAuth

1. Create a project in the [Google Cloud Console](https://console.cloud.google.com/)  
2. Set up OAuth 2.0 credentials  
3. Add your domain to the authorized JavaScript origins (e.g., `http://localhost:5173`)  
4. Update the `GOOGLE_CLIENT_ID` in `src/main.jsx` with your client ID  

```bash
npm run dev
```

---

## 🛠️ Troubleshooting

### ❌ Google OAuth Not Working

- Ensure valid OAuth client ID  
- Check `authorized JavaScript origins`  
- Reinstall `jwt-decode`:
  ```bash
  npm uninstall jwt-decode
  npm install jwt-decode@3.1.2
  ```

### 🌘 Theme Issues

- Check CSS variables in `src/index.css`  
- Validate `dark` class in DOM  
- Confirm MutationObserver setup  

### 🧩 Import Errors

- Use `jwtDecode` instead of `jwt_decode`  
- Reinstall dependencies  
- Restart dev server  

---

## 📦 Dependencies

- ⚛️ React + React Router  
- 🎨 Tailwind CSS  
- 🔐 @react-oauth/google  
- 🧾 jwt-decode@3.1.2  

---

## 🗂️ Code Structure

```
/src/components        → UI components  
/src/components/auth   → Auth components (Login, Signup)  
/src/pages             → Page components  
/src/index.css         → Global styles & theme variables  
```

---
