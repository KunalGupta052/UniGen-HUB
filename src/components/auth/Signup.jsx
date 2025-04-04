import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';

const Signup = ({ isDarkMode, onSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!acceptTerms) {
      setError('You must accept the Terms and Conditions');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Mock signup process
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, always succeed
      onSignup();
    }, 1500);
  };

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      // Decode the JWT token received from Google
      const decoded = jwtDecode(credentialResponse.credential);
      console.log('Google signup success:', decoded);
      
      // You would normally send this token to your backend to verify and create an account
      // For demo, we'll simulate a successful signup
      onSignup();
    } catch (error) {
      console.error('Error decoding Google token:', error);
      setError('Failed to process Google signup. Please try again.');
    }
  };

  const handleGoogleError = () => {
    setError('Google signup failed. Please try again or use email registration.');
  };

  return (
    <div className={`w-full max-w-md mx-auto p-6 rounded-2xl ${
      isDarkMode ? 'bg-dark-secondary border border-dark-tertiary' : 'bg-white shadow-lg'
    }`}>
      <div className="text-center mb-8">
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Create an account</h2>
        <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Join UniGenHub to start creating amazing documents
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label 
            htmlFor="name" 
            className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
          >
            Full name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg ${
              isDarkMode 
                ? 'bg-dark-tertiary border-dark-tertiary text-white focus:border-neon-blue/50' 
                : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
            } border focus:outline-none focus:ring-1 ${
              isDarkMode ? 'focus:ring-neon-blue/50' : 'focus:ring-blue-500'
            }`}
            placeholder="John Smith"
            required
          />
        </div>

        <div className="mb-4">
          <label 
            htmlFor="email" 
            className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg ${
              isDarkMode 
                ? 'bg-dark-tertiary border-dark-tertiary text-white focus:border-neon-blue/50' 
                : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
            } border focus:outline-none focus:ring-1 ${
              isDarkMode ? 'focus:ring-neon-blue/50' : 'focus:ring-blue-500'
            }`}
            placeholder="name@company.com"
            required
          />
        </div>

        <div className="mb-4">
          <label 
            htmlFor="password" 
            className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg ${
              isDarkMode 
                ? 'bg-dark-tertiary border-dark-tertiary text-white focus:border-neon-blue/50'
                : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
            } border focus:outline-none focus:ring-1 ${
              isDarkMode ? 'focus:ring-neon-blue/50' : 'focus:ring-blue-500'
            }`}
            placeholder="••••••••"
            required
          />
        </div>

        <div className="mb-4">
          <label 
            htmlFor="confirm-password" 
            className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
          >
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg ${
              isDarkMode 
                ? 'bg-dark-tertiary border-dark-tertiary text-white focus:border-neon-blue/50'
                : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
            } border focus:outline-none focus:ring-1 ${
              isDarkMode ? 'focus:ring-neon-blue/50' : 'focus:ring-blue-500'
            }`}
            placeholder="••••••••"
            required
          />
        </div>

        <div className="flex items-center mb-6">
          <input
            id="accept-terms"
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className={`w-4 h-4 rounded ${
              isDarkMode 
                ? 'bg-dark-tertiary border-dark-tertiary text-neon-blue focus:ring-neon-blue/50'
                : 'bg-white border-gray-300 text-blue-600 focus:ring-blue-500'
            } focus:outline-none focus:ring-1`}
          />
          <label 
            htmlFor="accept-terms" 
            className={`ml-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}
          >
            I accept the{' '}
            <Link 
              to="/terms" 
              className={`font-medium ${
                isDarkMode ? 'text-neon-blue hover:text-neon-blue/80' : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              Terms and Conditions
            </Link>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2.5 px-4 rounded-lg font-medium ${
            isDarkMode
              ? 'bg-neon-blue/20 text-white border border-neon-blue/50 hover:bg-neon-blue/30 shadow-glow'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          } transition-colors flex justify-center items-center`}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
              <circle 
                className="opacity-25" 
                cx="12" cy="12" r="10" 
                stroke="currentColor" 
                strokeWidth="4"
                fill="none"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : "Create Account"}
        </button>
      </form>

      <div className={`my-6 flex items-center ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
        <div className="flex-grow h-px bg-gray-500/20"></div>
        <span className="px-3 text-sm">or continue with</span>
        <div className="flex-grow h-px bg-gray-500/20"></div>
      </div>

      {/* Google OAuth Button */}
      <div className="flex justify-center mb-6">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          type="standard"
          theme={isDarkMode ? "filled_black" : "outline"}
          text="signup_with"
          shape="rectangular"
          logo_alignment="center"
          width="320"
        />
      </div>

      <p className={`mt-6 text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Already have an account?{' '}
        <Link 
          to="/login" 
          className={`font-medium ${
            isDarkMode ? 'text-neon-blue hover:text-neon-blue/80' : 'text-blue-600 hover:text-blue-800'
          }`}
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Signup; 