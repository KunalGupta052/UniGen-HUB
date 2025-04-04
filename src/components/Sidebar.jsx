import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation();
  
  useEffect(() => {
    // Check if dark mode is enabled
    const prefersDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(prefersDark);
  }, []);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const menuItems = [
    { icon: '📊', label: 'Dashboard', path: '/', active: isActive('/') },
    { icon: '🧰', label: 'Tools', path: '/tools', active: isActive('/tools') },
    { icon: '📝', label: 'Documents', path: '/documents', active: isActive('/documents') },
    { icon: '📑', label: 'Templates', path: '/templates', active: isActive('/templates') },
    { icon: '🤖', label: 'AI Generator', path: '/generator', active: isActive('/generator') },
    { icon: '💼', label: 'Projects', path: '/projects', active: isActive('/projects') },
    { icon: '📚', label: 'Resources', path: '/resources', active: isActive('/resources') },
    { icon: '⚙️', label: 'Settings', path: '/settings', active: isActive('/settings') },
  ];

  const recentProjects = [
    { name: 'Marketing Campaign', date: '2 days ago', path: '/projects/marketing' },
    { name: 'Blog Post Series', date: '1 week ago', path: '/projects/blog' },
    { name: 'Product Descriptions', date: '2 weeks ago', path: '/projects/products' },
  ];

  return (
    <aside className={`w-64 min-h-screen p-4 border-r ${
      isDarkMode 
        ? 'bg-dark-secondary border-dark-tertiary text-white' 
        : 'bg-white border-gray-200 text-gray-800'
    } transition-colors duration-300`}>
      {/* Logo */}
      <Link to="/" className="flex items-center mb-8">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 border ${
          isDarkMode 
            ? 'bg-neon-blue/20 border-neon-blue/30 shadow-glow' 
            : 'bg-blue-100 border-blue-300'
        }`}>
          <span className={isDarkMode ? 'text-neon-blue' : 'text-blue-600'}>U</span>
        </div>
        <div>
          <span className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            UniGen
          </span>
          <span className={`text-xs block -mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Document Hub
          </span>
        </div>
      </Link>

      {/* Main Menu */}
      <div className="mb-8">
        <h3 className={`text-xs uppercase font-medium mb-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          Main Menu
        </h3>
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link 
                to={item.path} 
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  item.active 
                    ? isDarkMode
                      ? 'bg-neon-blue/10 text-neon-blue' 
                      : 'bg-blue-100 text-blue-800'
                    : isDarkMode
                      ? 'text-gray-300 hover:bg-dark-tertiary hover:text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
                {item.active && (
                  <span className={`ml-auto w-1.5 h-1.5 rounded-full ${
                    isDarkMode ? 'bg-neon-blue shadow-glow' : 'bg-blue-600'
                  }`}></span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Projects */}
      <div>
        <h3 className={`text-xs uppercase font-medium mb-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          Recent Projects
        </h3>
        <ul className="space-y-2">
          {recentProjects.map((project, index) => (
            <li key={index}>
              <Link 
                to={project.path} 
                className={`block p-3 rounded-md transition-colors ${
                  isDarkMode 
                    ? 'bg-dark-tertiary hover:bg-dark-tertiary/80' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className={isDarkMode ? 'text-white font-medium' : 'text-gray-900 font-medium'}>
                    {project.name}
                  </span>
                  <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    {project.date}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Create New */}
      <div className="mt-6">
        <Link 
          to="/create" 
          className={`flex items-center justify-center py-2 px-4 w-full rounded-lg ${
            isDarkMode 
              ? 'bg-neon-blue/20 text-white border border-neon-blue/50 hover:bg-neon-blue/30 shadow-glow' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          } transition-colors`}
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create New
        </Link>
      </div>

      {/* User Profile */}
      <div className={`mt-auto pt-8 border-t mt-8 ${isDarkMode ? 'border-dark-tertiary' : 'border-gray-200'}`}>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3 text-white font-medium">
            JS
          </div>
          <div>
            <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>John Smith</div>
            <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Free Plan</div>
          </div>
          <Link to="/settings/profile" className={`ml-auto ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 