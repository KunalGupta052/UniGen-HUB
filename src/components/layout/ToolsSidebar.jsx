import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ToolsCategory = ({ title, tools }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Function to handle tool click
  const handleToolClick = (link) => {
    if (link.startsWith('http') || link.startsWith('file')) {
      window.open(link, '_blank');
    }
  };

  return (
    <div className="mb-4">
      <div 
        className="flex items-center justify-between cursor-pointer px-3 py-2 hover:bg-light-secondary rounded-md mb-1.5"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-sm font-bold text-text-darker">{title}</h3>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'transform rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {isExpanded && (
        <div className="grid grid-cols-2 gap-2 px-2 transition-all duration-300 animate-fade-in">
          {tools.map((tool, index) => (
            tool.link && tool.link.startsWith('http') || tool.link.startsWith('file') ? (
              <div
                key={index}
                onClick={() => handleToolClick(tool.link)}
                className="tool-icon group flex flex-col items-center justify-center py-2 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="text-xl mb-1.5 text-text-darker group-hover:text-primary transition-colors duration-300">
                  {tool.icon}
                </div>
                <span className="text-xs font-medium text-text-primary group-hover:text-primary transition-colors duration-300">{tool.name}</span>
              </div>
            ) : (
              <Link 
                key={index}
                to={tool.link || `/tool/${tool.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="tool-icon group flex flex-col items-center justify-center py-2 hover:shadow-md transition-all duration-300"
              >
                <div className="text-xl mb-1.5 text-text-darker group-hover:text-primary transition-colors duration-300">
                  {tool.icon}
                </div>
                <span className="text-xs font-medium text-text-primary group-hover:text-primary transition-colors duration-300">{tool.name}</span>
              </Link>
            )
          ))}
        </div>
      )}
    </div>
  );
};

const ToolsRecommendation = ({ title }) => {
  return (
    <div className="mb-6 px-4">
      <div className="p-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/10 relative overflow-hidden">
        {/* Animated glow effect */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full filter blur-[30px] animate-pulse-slow"></div>
        <h4 className="text-sm font-bold text-text-darker mb-2 relative z-10">{title}</h4>
        <p className="text-xs font-medium text-text-primary mb-3 relative z-10">
          Try these tools that match your current project needs and boost productivity
        </p>
        <div className="flex justify-between">
          <Link to="/tool/data-visualization" className="tool-icon w-12 h-12 p-1 relative z-10">
            <div className="text-xl text-primary">📊</div>
          </Link>
          <Link to="/tool/document-writer" className="tool-icon w-12 h-12 p-1 relative z-10">
            <div className="text-xl text-primary">📝</div>
          </Link>
          <Link to="/tool/analytics-dashboard" className="tool-icon w-12 h-12 p-1 relative z-10">
            <div className="text-xl text-primary">📈</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const ToolsSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [recentTools, setRecentTools] = useState([]);

  useEffect(() => {
    // Simulating fetching recent tools from local storage or API
    const fetchRecentTools = () => {
      // Mock data for recent tools
      const mockRecentTools = [
        { name: 'Word', icon: '📝', link: '/tool/word' },
        { name: 'Canva', icon: '🎨', link: '/tool/canva' },
        { name: 'PowerPoint', icon: '📊', link: '/tool/powerpoint' }
      ];
      
      setRecentTools(mockRecentTools);
    };
    
    fetchRecentTools();
  }, []);

  // MS Office tools category
  const officeTools = [
    { name: 'Word', icon: '📝', link: 'https://www.office.com/' },
    { name: 'Excel', icon: '📊', link: 'https://www.microsoft.com/en-us/microsoft-365/excel' },
    { name: 'PowerPoint', icon: '📊', link: 'https://www.microsoft.com/en-us/microsoft-365/powerpoint' },
    { name: 'VS Code', icon: '🖥️', link: 'https://code.visualstudio.com/' },
    { name: 'Photo Edit', icon: '🎨', link: 'https://www.canva.com/' },
    { name: 'Open File', icon: '📂', link: 'file:///' },
  ];

  // Design tools
  const designTools = [
    { name: 'Canva', icon: '🎨', link: 'https://www.canva.com/' },
    { name: 'Figma', icon: '✏️', link: 'https://www.figma.com/' },
    { name: 'Illustrator', icon: '🖌️', link: 'https://www.adobe.com/products/illustrator.html' },
    { name: 'Photoshop', icon: '📷', link: 'https://www.adobe.com/products/photoshop.html' },
    { name: 'Design AI', icon: '🤖', link: 'https://www.hotpot.ai/' },
    { name: 'Sketch', icon: '📐', link: 'https://www.sketch.com/' },
  ];

  // Text & Writing Tools
  const textTools = [
    { name: 'Text Editor', icon: '✍️', link: '/tool/text-editor' },
    { name: 'Grammar Check', icon: '📚', link: '/tool/grammar-check' },
    { name: 'Turnitin', icon: '🔍', link: '/tool/turnitin' },
    { name: 'AI Classifier', icon: '🤖', link: '/tool/ai-classifier' },
    { name: 'Paraphraser', icon: '🔄', link: '/tool/paraphraser' },
    { name: 'Citation Tool', icon: '📑', link: '/tool/citation-tool' },
  ];

  // Development Tools
  const devTools = [
    { name: 'Code Generator', icon: '👨‍💻', link: '/tool/code-generator' },
    { name: 'HTML Editor', icon: '🖥️', link: '/tool/html-editor' },
    { name: 'CSS Editor', icon: '🎭', link: '/tool/css-editor' },
    { name: 'JS Console', icon: '📜', link: '/tool/js-console' },
    { name: 'Git Manager', icon: '📂', link: '/tool/git-manager' },
    { name: 'API Tester', icon: '🔌', link: '/tool/api-tester' },
  ];

  // Language Tools
  const languageTools = [
    { name: 'Translator', icon: '🌐', link: '/tool/translator' },
    { name: 'Dictionary', icon: '📖', link: '/tool/dictionary' },
    { name: 'Thesaurus', icon: '📚', link: '/tool/thesaurus' },
    { name: 'Language AI', icon: '🗣️', link: '/tool/language-ai' },
    { name: 'Pronunciation', icon: '🔊', link: '/tool/pronunciation' },
    { name: 'Vocabulary', icon: '🔤', link: '/tool/vocabulary' },
  ];

  // Media Tools
  const mediaTools = [
    { name: 'Image Editor', icon: '🖼️', link: '/tool/image-editor' },
    { name: 'Video Editor', icon: '🎬', link: '/tool/video-editor' },
    { name: 'Audio Editor', icon: '🎵', link: '/tool/audio-editor' },
    { name: 'Screen Recorder', icon: '📹', link: '/tool/screen-recorder' },
    { name: 'GIF Maker', icon: '📱', link: '/tool/gif-maker' },
    { name: 'Media Converter', icon: '🔄', link: '/tool/media-converter' },
  ];

  // All tools combined for search functionality
  const allTools = [
    ...officeTools, 
    ...designTools, 
    ...textTools, 
    ...devTools, 
    ...languageTools,
    ...mediaTools,
    { name: 'Add Custom', icon: '➕', link: '/tool/add-custom' }
  ];

  // Filter tools based on search
  const filteredTools = searchTerm.trim() === '' 
    ? [] 
    : allTools.filter(tool => 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <>
      {/* Toggle button - visible when sidebar is closed */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed top-20 left-0 bg-primary text-white p-2.5 rounded-r-lg shadow-md z-50 animate-pulse-slow"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      )}

      {/* Main sidebar */}
      <div className={`sidebar ${isOpen ? 'translate-x-0' : '-translate-x-full'} pt-16`}>
        {/* Close button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-primary transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Sidebar header */}
        <div className="px-4 mb-6">
          <h2 className="text-lg font-bold mb-1 text-text-darker flex items-center">
            <span className="text-primary mr-2">🧰</span>
            Toolbox
          </h2>
          <p className="text-xs font-medium text-text-primary">Enhance your productivity with these tools</p>
        </div>

        {/* Search bar */}
        <div className="px-4 mb-4">
          <div className="relative">
            <input
              type="text"
              className="w-full pl-8 pr-3 py-2 text-sm bg-light-secondary rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-2.5 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Search results */}
        {searchTerm.trim() !== '' && (
          <div className="px-4 mb-4">
            <h3 className="text-xs uppercase font-semibold text-gray-700 mb-2">Search Results</h3>
            <div className="grid grid-cols-2 gap-2">
              {filteredTools.length > 0 ? (
                filteredTools.map((tool, index) => (
                  tool.link && (tool.link.startsWith('http') || tool.link.startsWith('file')) ? (
                    <div 
                      key={index}
                      onClick={() => window.open(tool.link, '_blank')}
                      className="tool-icon group flex flex-col items-center justify-center py-2 cursor-pointer"
                    >
                      <div className="text-xl mb-1 text-text-darker group-hover:text-primary transition-colors">
                        {tool.icon}
                      </div>
                      <span className="text-xs font-medium text-text-primary group-hover:text-primary transition-colors">{tool.name}</span>
                    </div>
                  ) : (
                    <Link 
                      key={index}
                      to={tool.link || `/tool/${tool.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="tool-icon group flex flex-col items-center justify-center py-2"
                    >
                      <div className="text-xl mb-1 text-text-darker group-hover:text-primary transition-colors">
                        {tool.icon}
                      </div>
                      <span className="text-xs font-medium text-text-primary group-hover:text-primary transition-colors">{tool.name}</span>
                    </Link>
                  )
                ))
              ) : (
                <p className="text-sm font-medium text-gray-700 col-span-2 py-2 text-center">No tools found</p>
              )}
            </div>
          </div>
        )}

        {/* Recent Tools */}
        {searchTerm.trim() === '' && recentTools.length > 0 && (
          <div className="px-4 mb-4">
            <h3 className="text-xs uppercase font-semibold text-gray-700 mb-2">Recent Tools</h3>
            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
              {recentTools.map((tool, index) => (
                <Link
                  key={index}
                  to={tool.link || `/tool/${tool.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="tool-icon flex-shrink-0 flex flex-col items-center justify-center w-16 h-16"
                >
                  <div className="text-xl mb-1 text-text-darker">
                    {tool.icon}
                  </div>
                  <span className="text-xs font-medium text-text-primary">{tool.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* AI Recommendations */}
        {searchTerm.trim() === '' && (
          <ToolsRecommendation title="AI-Suggested Tools" />
        )}
        
        {/* Tool Categories */}
        {searchTerm.trim() === '' && (
          <div className="px-2 space-y-2 overflow-y-auto max-h-[calc(100vh-320px)] pb-4">
            <ToolsCategory title="Office Suite" tools={officeTools} />
            <ToolsCategory title="Design Tools" tools={designTools} />
            <ToolsCategory title="Text & Writing" tools={textTools} />
            <ToolsCategory title="Development" tools={devTools} />
            <ToolsCategory title="Language Tools" tools={languageTools} />
            <ToolsCategory title="Media Tools" tools={mediaTools} />
          </div>
        )}
      </div>
    </>
  );
};

export default ToolsSidebar; 