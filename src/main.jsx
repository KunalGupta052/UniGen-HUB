import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import App from './App.jsx'

// Demo client ID - replace with your own in production
// Get a real client ID from https://console.cloud.google.com/apis/credentials
// This is a fake client ID for demonstration purposes
const GOOGLE_CLIENT_ID = '397136856394-p4t8n8k0rr8i30heaclahm5oi6q9c89o.apps.googleusercontent.com'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
)
