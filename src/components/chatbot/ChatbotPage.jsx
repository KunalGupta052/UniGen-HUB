import React, { useState, useEffect } from 'react';
import Chatbot from './Chatbot';

const ChatbotPage = () => {
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyForm, setShowApiKeyForm] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Check if API key is available on component mount
  useEffect(() => {
    try {
      const envKey = import.meta.env.VITE_OPENAI_API_KEY;
      const localKey = localStorage.getItem('tempOpenAiKey');
      
      if (envKey || localKey) {
        setIsApiKeySet(true);
      }
    } catch (error) {
      console.error('Error checking API key:', error);
      setIsApiKeySet(false);
    }
    
    // Add animation
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);
  
  const handleSubmitApiKey = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      try {
        // In a real app, you would securely store this or use auth
        // This is just for demo purposes
        localStorage.setItem('tempOpenAiKey', apiKey);
        setIsApiKeySet(true);
        setApiKey('');
      } catch (error) {
        console.error('Error storing API key:', error);
        alert('Failed to store API key. Please try again.');
      }
    }
  };

  const handleRemoveApiKey = () => {
    try {
      localStorage.removeItem('tempOpenAiKey');
      setIsApiKeySet(false);
    } catch (error) {
      console.error('Error removing API key:', error);
    }
  };
  
  return (
    <section id="demo" className="section py-16 bg-gradient-light relative">
      <div className="container mx-auto relative z-10">
        <div className={`max-w-3xl mx-auto text-center mb-12 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-text-darker">
            <span className="gradient-text">Interactive AI</span> Demo
          </h2>
          <p className="text-lg text-text-primary font-medium mb-6 max-w-2xl mx-auto">
            Generate documents, presentations, and images with our AI assistant.
          </p>
          
          {!isApiKeySet ? (
            <div className={`bg-white shadow-sm rounded-lg p-6 mb-8 border border-gray-100 max-w-lg mx-auto`}>
              <div className="flex justify-center mb-5">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-text-darker">OpenAI API Key Required</h3>
              <p className="text-text-primary mb-5 max-w-md mx-auto">
                To use the AI features, you need to provide your OpenAI API key. It will be stored locally for demo purposes only.
              </p>
              
              {!showApiKeyForm ? (
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowApiKeyForm(true)}
                >
                  Enter API Key
                </button>
              ) : (
                <form onSubmit={handleSubmitApiKey} className="max-w-md mx-auto">
                  <div className="flex mb-2">
                    <input
                      type="password"
                      className="input flex-1 rounded-r-none"
                      placeholder="sk-..."
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      required
                    />
                    <button 
                      type="submit"
                      className="bg-primary text-white px-4 py-2.5 rounded-r-lg font-medium hover:bg-primary-dark transition-colors"
                    >
                      Submit
                    </button>
                  </div>
                  <div className="flex items-center text-xs text-text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-text-secondary/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Your API key is only used to make requests and is never stored on our servers.
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div className={`bg-white rounded-lg p-3 mb-6 border border-gray-100 flex justify-between items-center shadow-sm max-w-lg mx-auto`}>
              <div className="flex items-center">
                <div className="bg-primary/10 p-1 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-text-secondary text-sm">
                  API Key is set and ready to use
                </p>
              </div>
              <button 
                className="text-xs text-text-secondary hover:text-primary flex items-center transition-colors"
                onClick={handleRemoveApiKey}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Remove
              </button>
            </div>
          )}
        </div>
        
        <div className={`max-w-3xl mx-auto transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {isApiKeySet ? (
            <Chatbot />
          ) : (
            <div className="h-[550px] bg-white rounded-lg flex items-center justify-center border border-gray-100 p-6 text-center shadow-sm">
              <div>
                <div className="w-16 h-16 mx-auto mb-6 text-primary opacity-40">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 gradient-text">AI Features Locked</h3>
                <p className="text-text-secondary mb-6 max-w-md mx-auto">
                  Enter your OpenAI API key above to unlock the AI-powered features.
                </p>
                <button 
                  className="btn btn-outline"
                  onClick={() => setShowApiKeyForm(true)}
                >
                  Enter API Key
                </button>
              </div>
            </div>
          )}
          
          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
            {featureCards.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm"
              >
                <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mb-3 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold mb-1.5 text-text-darker">{feature.title}</h3>
                <p className="text-text-primary text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Feature card data
const featureCards = [
  {
    title: "Create Documents",
    description: "Generate comprehensive, well-structured documents on any topic with minimal input.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    title: "Build Presentations",
    description: "Automatically generate presentation slides with proper structure and formatting.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    )
  },
  {
    title: "Generate Images",
    description: "Create custom images based on your descriptions using DALL-E AI technology.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  }
];

export default ChatbotPage;