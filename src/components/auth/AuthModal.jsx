import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

const AuthModal = ({ isOpen, onClose, isDarkMode, onAuthenticate }) => {
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  const handleAuthentication = () => {
    onAuthenticate();
    onClose();
    navigate('/');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70" 
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div 
        className={`relative w-full max-w-lg p-6 rounded-2xl ${
          isDarkMode ? 'bg-dark-bg border border-dark-tertiary' : 'bg-white'
        } animate-fadeIn z-10`}
      >
        {/* Close button */}
        <button 
          className={`absolute top-4 right-4 p-2 rounded-full ${
            isDarkMode ? 'text-gray-400 hover:text-white hover:bg-dark-tertiary' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
          onClick={onClose}
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path 
              fillRule="evenodd" 
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>
        
        {/* Tabs */}
        <div className="flex border-b mb-6 -mx-6 px-6 pb-4">
          <button
            className={`pb-4 px-4 text-center font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'login'
                ? isDarkMode 
                  ? 'border-neon-blue text-neon-blue'
                  : 'border-blue-600 text-blue-600'
                : isDarkMode
                  ? 'border-transparent text-gray-400 hover:text-gray-300'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('login')}
          >
            Log in
          </button>
          <button
            className={`pb-4 px-4 text-center font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'signup'
                ? isDarkMode 
                  ? 'border-neon-blue text-neon-blue'
                  : 'border-blue-600 text-blue-600'
                : isDarkMode
                  ? 'border-transparent text-gray-400 hover:text-gray-300'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('signup')}
          >
            Sign up
          </button>
        </div>
        
        {/* Content */}
        <div>
          {activeTab === 'login' ? (
            <Login 
              isDarkMode={isDarkMode} 
              onLogin={handleAuthentication}
            />
          ) : (
            <Signup 
              isDarkMode={isDarkMode} 
              onSignup={handleAuthentication}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal; 