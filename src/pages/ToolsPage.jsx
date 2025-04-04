import React, { useState, useEffect } from 'react';
import { Header, Sidebar, Footer } from '../components';

const ToolsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Inherit dark mode setting from main app
    const prefersDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(prefersDark);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const filterTools = (tools) => {
    const filtered = tools.filter(tool => {
      const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    return filtered;
  };

  const documentTools = [
    {
      name: "Word",
      icon: "/icons/word.svg",
      description: "Create professional documents, reports, and letters",
      category: "document",
      color: "#2b579a",
      darkIcon: "/icons/word-white.svg"
    },
    {
      name: "Excel",
      icon: "/icons/excel.svg",
      description: "Analyze data, create spreadsheets and visualizations",
      category: "spreadsheet",
      color: "#217346",
      darkIcon: "/icons/excel-white.svg"
    },
    {
      name: "PowerPoint",
      icon: "/icons/powerpoint.svg",
      description: "Create impactful presentations and slideshows",
      category: "presentation",
      color: "#d24726",
      darkIcon: "/icons/powerpoint-white.svg"
    },
    {
      name: "OneNote",
      icon: "/icons/onenote.svg",
      description: "Take notes, organize ideas, and collaborate",
      category: "notes",
      color: "#7719aa",
      darkIcon: "/icons/onenote-white.svg"
    },
    {
      name: "Outlook",
      icon: "/icons/outlook.svg",
      description: "Manage emails, calendar, and contacts",
      category: "communication",
      color: "#0078d4",
      darkIcon: "/icons/outlook-white.svg"
    },
    {
      name: "Teams",
      icon: "/icons/teams.svg",
      description: "Chat, meet, call, and collaborate in one place",
      category: "communication",
      color: "#6264a7",
      darkIcon: "/icons/teams-white.svg"
    },
    {
      name: "SharePoint",
      icon: "/icons/sharepoint.svg",
      description: "Create and share content with your team",
      category: "collaboration",
      color: "#0078d4",
      darkIcon: "/icons/sharepoint-white.svg"
    },
    {
      name: "OneDrive",
      icon: "/icons/onedrive.svg",
      description: "Store, access, and share your files securely",
      category: "storage",
      color: "#0078d4",
      darkIcon: "/icons/onedrive-white.svg"
    },
    {
      name: "Forms",
      icon: "/icons/forms.svg",
      description: "Create surveys, quizzes, and polls",
      category: "data",
      color: "#008272",
      darkIcon: "/icons/forms-white.svg"
    },
    {
      name: "Planner",
      icon: "/icons/planner.svg",
      description: "Organize teamwork and manage projects",
      category: "productivity",
      color: "#31752f",
      darkIcon: "/icons/planner-white.svg"
    },
    {
      name: "Power BI",
      icon: "/icons/powerbi.svg",
      description: "Create interactive data visualizations",
      category: "data",
      color: "#f2c811",
      darkIcon: "/icons/powerbi-white.svg"
    },
    {
      name: "Sway",
      icon: "/icons/sway.svg",
      description: "Create and share interactive reports and presentations",
      category: "presentation",
      color: "#008272",
      darkIcon: "/icons/sway-white.svg"
    }
  ];

  const documentTypes = [
    { name: "Business Plan", icon: "📊", category: "business" },
    { name: "Resume/CV", icon: "📄", category: "personal" },
    { name: "Cover Letter", icon: "📝", category: "personal" },
    { name: "Project Proposal", icon: "🚀", category: "business" },
    { name: "Financial Report", icon: "💰", category: "business" },
    { name: "Meeting Minutes", icon: "⏱️", category: "business" },
    { name: "Marketing Plan", icon: "📈", category: "marketing" },
    { name: "Press Release", icon: "📰", category: "marketing" },
    { name: "Product Specification", icon: "🔍", category: "technical" },
    { name: "White Paper", icon: "📋", category: "technical" },
    { name: "Email Template", icon: "📧", category: "communication" },
    { name: "Newsletter", icon: "📮", category: "communication" },
    { name: "Case Study", icon: "🔬", category: "marketing" },
    { name: "Contract", icon: "⚖️", category: "legal" },
    { name: "Invoice", icon: "🧾", category: "finance" },
    { name: "Presentation", icon: "🎯", category: "presentation" },
    { name: "User Manual", icon: "📚", category: "technical" },
    { name: "Standard Operating Procedure", icon: "📜", category: "business" },
    { name: "Research Paper", icon: "🔎", category: "academic" },
    { name: "Thesis", icon: "🎓", category: "academic" }
  ];

  // Filter tools based on search and category
  const filteredTools = filterTools(documentTools);
  
  const categories = [
    { id: 'all', name: 'All Tools', icon: '🧰' },
    { id: 'document', name: 'Documents', icon: '📝' },
    { id: 'spreadsheet', name: 'Spreadsheets', icon: '📊' },
    { id: 'presentation', name: 'Presentations', icon: '📊' },
    { id: 'communication', name: 'Communication', icon: '💬' },
    { id: 'collaboration', name: 'Collaboration', icon: '👥' },
    { id: 'data', name: 'Data & Analytics', icon: '📈' },
    { id: 'productivity', name: 'Productivity', icon: '⚡' },
    { id: 'storage', name: 'Storage', icon: '☁️' },
    { id: 'notes', name: 'Notes', icon: '📔' },
  ];

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-dark-bg text-white' : 'bg-light-bg text-gray-900'}`}>
      <Header />
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        
        {/* Mobile sidebar toggle */}
        <button 
          className="lg:hidden fixed top-20 left-4 z-20 p-2 rounded-full bg-dark-tertiary text-white shadow-md"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Mobile sidebar */}
        <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden transition-transform duration-300 ease-in-out z-40`}>
          <Sidebar />
        </div>
        
        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={toggleSidebar}
          ></div>
        )}
        
        {/* Main content */}
        <main className="flex-1 p-4 md:p-8">
          <div className="container mx-auto">
            <div className="mb-10">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Document Creation Tools
              </h1>
              <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Access all Microsoft 365 tools and document templates in one place
              </p>
              
              {/* Search bar */}
              <div className={`relative mb-8 max-w-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full p-3 pl-12 rounded-lg ${
                    isDarkMode
                      ? 'bg-dark-tertiary border-dark-tertiary focus:border-neon-blue/50'
                      : 'bg-white border-gray-200 focus:border-blue-500'
                  } border focus:outline-none focus:ring-1 ${
                    isDarkMode ? 'focus:ring-neon-blue/50' : 'focus:ring-blue-500'
                  }`}
                />
                <svg
                  className={`absolute left-4 top-3.5 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              
              {/* Tool Categories */}
              <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeCategory === category.id
                        ? isDarkMode
                          ? 'bg-neon-blue/20 text-white border border-neon-blue shadow-glow' 
                          : 'bg-blue-100 text-blue-800 border border-blue-300'
                        : isDarkMode
                          ? 'bg-dark-tertiary text-gray-300 border border-dark-tertiary hover:border-neon-blue/30'
                          : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    <span>{category.icon} {category.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Microsoft 365 Tools Grid */}
            <div className="mb-16">
              <h2 className={`text-xl md:text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Microsoft 365 Apps
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTools.map((tool) => (
                  <div
                    key={tool.name}
                    className={`rounded-xl p-6 transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-dark-secondary border border-dark-tertiary hover:border-neon-blue/50 hover:shadow-glow'
                        : 'bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg'
                    }`}
                  >
                    <div 
                      className="w-12 h-12 rounded-full mb-4 flex items-center justify-center"
                      style={{ backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.8)' : tool.color + '20' }}
                    >
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: tool.color }}
                      >
                        {tool.name.charAt(0)}
                      </div>
                    </div>
                    <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {tool.name}
                    </h3>
                    <p className={`mb-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {tool.description}
                    </p>
                    <button
                      className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                        isDarkMode
                          ? 'bg-dark-tertiary text-white hover:bg-dark-tertiary/80 border border-dark-tertiary hover:border-neon-blue/30'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200'
                      }`}
                    >
                      Open Tool
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Document Templates */}
            <div className="mb-16">
              <h2 className={`text-xl md:text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Document Templates
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {documentTypes.map((doc) => (
                  <div
                    key={doc.name}
                    className={`rounded-lg p-4 flex items-center transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-dark-secondary border border-dark-tertiary hover:border-neon-blue/50'
                        : 'bg-white border border-gray-200 hover:border-blue-300 hover:shadow'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                      isDarkMode ? 'bg-dark-tertiary' : 'bg-gray-100'
                    }`}>
                      <span className="text-lg">{doc.icon}</span>
                    </div>
                    <div>
                      <h3 className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {doc.name}
                      </h3>
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {doc.category.charAt(0).toUpperCase() + doc.category.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* AI Document Generator */}
            <div className="mb-16">
              <h2 className={`text-xl md:text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                AI Document Generator
              </h2>
              
              <div className={`p-6 rounded-xl ${
                isDarkMode 
                  ? 'bg-dark-secondary border border-dark-tertiary' 
                  : 'bg-white border border-gray-200'
              }`}>
                <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Create professional documents in seconds with our AI-powered document generator.
                  Just select a document type and describe what you need.
                </p>
                
                <button className={`px-6 py-3 rounded-lg font-medium ${
                  isDarkMode
                    ? 'bg-neon-blue/20 text-white border border-neon-blue shadow-glow hover:bg-neon-blue/30'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } transition-colors`}>
                  Open AI Document Generator
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default ToolsPage; 