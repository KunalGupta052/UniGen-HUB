import React, { useState, useEffect } from 'react';

// Chat message component
const ChatMessage = ({ message, isSelf }) => {
  return (
    <div className={`flex mb-3 ${isSelf ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div className={`max-w-[80%] rounded-lg p-2.5 ${
        isSelf 
          ? 'bg-primary text-white rounded-tr-none hover:bg-primary-dark' 
          : 'bg-light-secondary text-text-primary rounded-tl-none hover:bg-light-tertiary'
      } transition-colors duration-300 shadow-sm hover:shadow-md`}>
        <div className="flex mb-1">
          <span className={`text-xs ${isSelf ? 'text-white/80' : 'text-text-secondary'}`}>
            {message.sender} • {message.time}
          </span>
        </div>
        <p className="text-sm">{message.text}</p>
      </div>
    </div>
  );
};

// Team member component for the sidebar
const TeamMember = ({ name, avatar, status, isActive, onClick, typing }) => {
  const statusColors = {
    online: 'bg-green-500',
    away: 'bg-amber-400',
    busy: 'bg-red-500',
    offline: 'bg-gray-400'
  };

  return (
    <div 
      className={`flex items-center p-2 rounded-lg cursor-pointer transition-all duration-300 ${
        isActive ? 'bg-primary/10' : 'hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <div className="relative mr-3 group">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium overflow-hidden group-hover:scale-105 transition-transform duration-300">
          {avatar ? (
            <img src={avatar} alt={name} className="w-full h-full object-cover" />
          ) : (
            name.charAt(0).toUpperCase()
          )}
        </div>
        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ${statusColors[status]} border-2 border-white group-hover:animate-pulse`}></div>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-text-primary truncate">{name}</h4>
        {typing ? (
          <div className="flex items-center">
            <span className="text-xs text-primary mr-1">typing</span>
            <span className="flex space-x-1">
              <span className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
              <span className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
              <span className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
            </span>
          </div>
        ) : (
          <span className="text-xs text-text-secondary capitalize">{status}</span>
        )}
      </div>
    </div>
  );
};

// Holographic message preview component
const HolographicPreview = () => {
  return (
    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 hologram">
      <div className="relative bg-primary/10 rounded-lg p-3 shadow-glow w-44 backdrop-blur-sm animate-float">
        <div className="absolute inset-0 rounded-lg opacity-50 overflow-hidden">
          <div className="absolute -inset-[10px] bg-gradient-to-r from-primary/5 to-primary/20 animate-rotate" style={{ animationDuration: '15s' }}></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex-shrink-0 mr-2"></div>
            <div className="h-2 bg-primary/30 rounded-full w-16"></div>
          </div>
          <div className="space-y-1.5">
            <div className="h-2 bg-primary/20 rounded-full w-full"></div>
            <div className="h-2 bg-primary/20 rounded-full w-3/4"></div>
            <div className="h-2 bg-primary/20 rounded-full w-1/2"></div>
          </div>
          <div className="flex justify-end mt-2">
            <div className="h-4 w-10 bg-primary/30 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main TeamChat component
const TeamChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMember, setActiveMember] = useState(null);
  const [inputText, setInputText] = useState('');
  const [conversations, setConversations] = useState({
    1: [
      { id: 1, sender: 'John Doe', text: 'Hey, how\'s the project going?', time: '10:30 AM', isSelf: false },
      { id: 2, sender: 'You', text: 'Going well! I\'ve finished the intro section.', time: '10:32 AM', isSelf: true },
      { id: 3, sender: 'John Doe', text: 'Great! Can you share your progress in our next meeting?', time: '10:35 AM', isSelf: false },
    ],
    2: [
      { id: 1, sender: 'Sarah Miller', text: 'Have you reviewed the presentation slides?', time: '9:45 AM', isSelf: false },
      { id: 2, sender: 'You', text: 'Yes, they look good. I made some small edits.', time: '9:50 AM', isSelf: true },
    ],
    3: [
      { id: 1, sender: 'You', text: 'When is our next team meeting?', time: 'Yesterday', isSelf: true },
      { id: 2, sender: 'Alex Johnson', text: 'Tomorrow at 2PM. I\'ll send a calendar invite.', time: 'Yesterday', isSelf: false },
    ],
    4: [],
  });
  const [typing, setTyping] = useState(null);
  const [showHologram, setShowHologram] = useState(true);

  // Team members data
  const teamMembers = [
    { id: 1, name: 'John Doe', avatar: null, status: 'online' },
    { id: 2, name: 'Sarah Miller', avatar: null, status: 'busy' },
    { id: 3, name: 'Alex Johnson', avatar: null, status: 'away' },
    { id: 4, name: 'Emma Wilson', avatar: null, status: 'offline' },
  ];

  useEffect(() => {
    // Show hologram for 5 seconds after loading
    const timer = setTimeout(() => {
      setShowHologram(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Simulate team member typing randomly
    if (!isOpen) return;
    
    const randomTyping = () => {
      if (Math.random() > 0.7) {
        const randomMemberId = Math.floor(Math.random() * 3) + 1;
        setTyping(randomMemberId);
        
        setTimeout(() => {
          setTyping(null);
          
          // Add a message after typing
          if (Math.random() > 0.5 && randomMemberId !== activeMember) {
            const randomMessages = [
              "How's your part of the project coming along?",
              "Just sent you the latest documents",
              "Can we schedule a quick call later?",
              "I've updated the shared document"
            ];
            
            const newMessage = {
              id: conversations[randomMemberId].length + 1,
              sender: teamMembers.find(m => m.id === randomMemberId).name,
              text: randomMessages[Math.floor(Math.random() * randomMessages.length)],
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isSelf: false
            };
            
            setConversations(prev => ({
              ...prev,
              [randomMemberId]: [...prev[randomMemberId], newMessage]
            }));
          }
        }, 3000);
      }
    };
    
    const interval = setInterval(randomTyping, 8000);
    return () => clearInterval(interval);
  }, [isOpen, activeMember, conversations]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!inputText.trim() || !activeMember) return;
    
    const newMessage = {
      id: conversations[activeMember].length + 1,
      sender: 'You',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSelf: true
    };
    
    setConversations({
      ...conversations,
      [activeMember]: [...conversations[activeMember], newMessage]
    });
    
    setInputText('');
  };

  // Toggle chat panel
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && !activeMember && teamMembers.length > 0) {
      setActiveMember(teamMembers[0].id);
    }
  };

  return (
    <>
      {/* Chat toggle button - fixed at bottom right */}
      <button 
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-primary text-white shadow-glow hover:shadow-glow-strong transition-all z-50 flex items-center justify-center group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
        
        {/* Notification indicator */}
        {Object.entries(conversations).some(([id, msgs]) => {
          const lastMsg = msgs[msgs.length - 1];
          return lastMsg && !lastMsg.isSelf && parseInt(id) !== activeMember;
        }) && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        )}
      </button>

      {/* Main chat panel */}
      <div className={`fixed bottom-6 right-6 w-80 h-96 bg-white rounded-lg shadow-lg z-40 transition-all transform ${
        isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
      } flex flex-col border border-gray-200 overflow-hidden hologram`}>
        {/* Chat header */}
        <div className="bg-gradient-astra p-3 text-white flex items-center justify-between">
          <h3 className="font-medium">Team Chat</h3>
          <div className="flex space-x-1">
            <button 
              onClick={() => setIsOpen(false)}
              className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Chat body */}
        <div className="flex-1 flex overflow-hidden">
          {/* Team members sidebar */}
          <div className="w-1/3 border-r border-gray-100 overflow-y-auto p-2">
            {teamMembers.map(member => (
              <TeamMember 
                key={member.id}
                name={member.name}
                avatar={member.avatar}
                status={member.status}
                isActive={activeMember === member.id}
                onClick={() => setActiveMember(member.id)}
                typing={typing === member.id}
              />
            ))}
          </div>

          {/* Conversation area */}
          <div className="w-2/3 flex flex-col">
            {activeMember ? (
              <>
                {/* Messages container */}
                <div className="flex-1 p-3 overflow-y-auto bg-gradient-light">
                  {conversations[activeMember].length > 0 ? (
                    conversations[activeMember].map(message => (
                      <ChatMessage 
                        key={message.id}
                        message={message}
                        isSelf={message.isSelf}
                      />
                    ))
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-sm text-text-secondary">No messages yet.</p>
                    </div>
                  )}
                </div>

                {/* Input area */}
                <div className="p-2 border-t border-gray-100">
                  <form onSubmit={handleSendMessage} className="flex">
                    <input
                      type="text"
                      className="flex-1 bg-light-secondary border border-gray-200 rounded-l-lg px-3 py-1.5 text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                      placeholder="Type a message..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                    />
                    <button
                      type="submit"
                      disabled={!inputText.trim()}
                      className={`px-3 py-1.5 ${!inputText.trim() ? 'bg-gray-300 text-gray-500' : 'bg-primary hover:bg-primary-dark text-white'} rounded-r-lg transition-colors duration-300 group`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center p-4 text-center">
                <div>
                  <div className="w-12 h-12 mx-auto mb-3 text-primary/40">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full animate-pulse-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <p className="text-sm text-text-secondary">Select a team member to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Holographic preview - shows briefly on first load */}
        {showHologram && !isOpen && (
          <HolographicPreview />
        )}
      </div>
    </>
  );
};

export default TeamChat; 