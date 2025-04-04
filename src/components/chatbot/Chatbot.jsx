import React, { useState, useRef, useEffect } from 'react';
import OpenAI from 'openai';

// Message component for rendering individual chat messages
const Message = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3 animate-fade-in`}>
      <div className={`max-w-[75%] rounded-lg py-2.5 px-3.5 ${
        isUser 
          ? 'bg-primary text-white' 
          : 'bg-light-secondary text-text-primary'
      }`}>
        <div className="flex items-start">
          {!isUser && (
            <div className="flex-shrink-0 mr-2.5">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
          )}
          <div className="flex-1">
            {message.split('\n').map((paragraph, i) => (
              <p key={i} className={`${i > 0 ? 'mt-2' : ''} text-sm leading-relaxed`}>
                {paragraph}
              </p>
            ))}
          </div>
          {isUser && (
            <div className="flex-shrink-0 ml-2.5">
              <div className="w-7 h-7 rounded-full bg-primary-dark flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Loading indicator component
const LoadingIndicator = () => {
  return (
    <div className="flex justify-start mb-3 animate-fade-in">
      <div className="max-w-[75%] rounded-lg py-2.5 px-3.5 bg-light-secondary text-text-primary">
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-2.5">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
          <div className="flex space-x-1.5">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0ms" }}></div>
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: "300ms" }}></div>
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: "600ms" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Suggestion chip component
const SuggestionChip = ({ text, onClick }) => (
  <button 
    onClick={onClick}
    className="text-xs bg-light-tertiary px-3 py-1.5 rounded-full text-text-secondary hover:text-primary transition-colors"
  >
    {text}
  </button>
);

const ProjectHistoryModal = ({ isOpen, onClose }) => {
  const projectHistory = [
    { id: 1, title: 'Research Paper on Quantum Physics', date: 'May 10, 2023', icon: '📝' },
    { id: 2, title: 'Marketing Strategy Presentation', date: 'April 28, 2023', icon: '📊' },
    { id: 3, title: 'Product Design Mockup', date: 'April 15, 2023', icon: '🎨' },
    { id: 4, title: 'Financial Analysis Report Q1', date: 'April 5, 2023', icon: '📈' },
    { id: 5, title: 'Mobile App Development Plan', date: 'March 22, 2023', icon: '📱' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fade-in">
      <div className="bg-white rounded-lg w-full max-w-md transform transition-all p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-text-darker">Project History</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          {projectHistory.map(project => (
            <div 
              key={project.id}
              className="flex items-center p-3 hover:bg-light-secondary rounded-lg cursor-pointer mb-2 transition-colors"
              onClick={() => {
                alert(`Loading project: ${project.title}`);
                onClose();
              }}
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl mr-3">
                {project.icon}
              </div>
              <div>
                <h4 className="font-medium text-text-primary">{project.title}</h4>
                <p className="text-xs text-text-secondary">{project.date}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button 
            className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            onClick={onClose}
          >
            Start New Project
          </button>
        </div>
      </div>
    </div>
  );
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isQuotaExceeded, setIsQuotaExceeded] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  
  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);
  
  // Initialize with a welcome message
  useEffect(() => {
    setMessages([{
      content: "Hello! I'm UNIGEN's AI assistant. How can I help you today? I can help you generate documents, presentations, or images based on your ideas.",
      isUser: false
    }]);
  }, []);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleRemoveApiKey = () => {
    try {
      localStorage.removeItem('tempOpenAiKey');
      setIsQuotaExceeded(false);
      setError(null);
      window.location.reload();
    } catch (error) {
      console.error('Error removing API key:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim() || isQuotaExceeded) return;
    
    const userMessage = input.trim();
    setInput('');
    setError(null);
    
    // Add user message to chat
    setMessages(prev => [...prev, { content: userMessage, isUser: true }]);
    
    setIsLoading(true);
    
    try {
      let apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      
      if (!apiKey) {
        // Try to get from localStorage as fallback
        apiKey = localStorage.getItem('tempOpenAiKey');
      }
      
      if (!apiKey) {
        throw new Error('API key not found');
      }
      
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Only for demo purposes
      });
      
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant for UNIGEN, an academic content generation platform. Be concise, helpful, and informative." },
          ...messages.map(msg => ({
            role: msg.isUser ? "user" : "assistant",
            content: msg.content
          })),
          { role: "user", content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      });
      
      if (response.choices && response.choices.length > 0) {
        setMessages(prev => [...prev, {
          content: response.choices[0].message.content,
          isUser: false
        }]);
      } else {
        throw new Error('No response from API');
      }
    } catch (err) {
      console.error('Error calling OpenAI:', err);
      
      // Handle quota exceeded error specifically
      if (err.message && err.message.includes('quota')) {
        setIsQuotaExceeded(true);
        setError('Your API key has reached its quota limit. Please use a different API key or upgrade your plan.');
        
        // Add system message about quota limit
        setMessages(prev => [...prev, {
          content: "I'm sorry, but your OpenAI API key has reached its quota limit. You'll need to use a different API key or upgrade your plan to continue using the AI features.",
          isUser: false
        }]);
      } else {
        setError('Error: ' + (err.message || 'Failed to communicate with AI service'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    { text: "Document: Renewable Energy", value: "Create a document about renewable energy sources" },
    { text: "Presentation: Business Proposal", value: "Generate a presentation outline for a business proposal" },
    { text: "Image: Futuristic City", value: "Create an image of a futuristic city with flying cars" }
  ];

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 flex flex-col h-[550px] shadow-md">
      {/* Chat header */}
      <div className="bg-gradient-astra p-3 flex items-center justify-between text-white">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-white">UNIGEN AI Assistant</h3>
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
              <span className="text-xs text-white/90">Online</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          {/* Project history button with animation */}
          <button 
            className="history-icon animate-float" 
            title="View Project History"
            onClick={() => setShowHistoryModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Chat messages */}
      <div 
        ref={messageContainerRef}
        className="flex-1 overflow-y-auto p-4 bg-gradient-light"
      >
        {messages.map((message, index) => (
          <Message key={index} message={message.content} isUser={message.isUser} />
        ))}
        
        {isLoading && <LoadingIndicator />}
        
        {error && !isQuotaExceeded && (
          <div className="bg-red-50 border border-red-100 text-red-500 p-2.5 rounded-lg mb-3 text-sm animate-fade-in">
            {error}
          </div>
        )}
        
        {isQuotaExceeded && (
          <div className="bg-amber-50 border border-amber-100 text-amber-700 p-3 rounded-lg mb-3 text-sm animate-fade-in">
            <p className="mb-2 font-medium">API Quota Limit Reached</p>
            <p className="mb-3">Your OpenAI API key has reached its quota limit. Please provide a different API key to continue using the AI features.</p>
            <button 
              onClick={handleRemoveApiKey}
              className="text-xs bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-md text-amber-700 transition-colors inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Change API Key
            </button>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="bg-white p-3 border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            className="flex-1 bg-light-secondary border border-gray-200 rounded-l-lg px-3.5 py-2.5 text-text-primary placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder={isQuotaExceeded ? "Please change your API key to continue..." : "Type your message..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading || isQuotaExceeded}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim() || isQuotaExceeded}
            className={`px-4 py-2.5 ${isLoading || !input.trim() || isQuotaExceeded ? 'bg-gray-300 text-gray-500' : 'bg-primary hover:bg-primary-dark text-white'} font-medium rounded-r-lg transition-colors`}
          >
            <span>Send</span>
          </button>
        </form>
        
        {/* Suggestion chips or API key error message */}
        {isQuotaExceeded ? (
          <div className="mt-2.5 text-center">
            <button 
              onClick={handleRemoveApiKey}
              className="text-sm bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-md text-primary transition-colors inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              Enter a Different API Key
            </button>
          </div>
        ) : (
          <div className="mt-2.5 flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <SuggestionChip 
                key={index}
                text={suggestion.text}
                onClick={() => setInput(suggestion.value)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Project History Modal */}
      <ProjectHistoryModal 
        isOpen={showHistoryModal} 
        onClose={() => setShowHistoryModal(false)} 
      />
    </div>
  );
};

export default Chatbot; 