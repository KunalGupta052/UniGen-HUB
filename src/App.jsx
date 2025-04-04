import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { 
  Header, 
  Footer, 
  Hero, 
  Features,
  DocumentGenerator,
  PlatformUniqueness,
  Pricing,
  Sidebar,
  Dashboard
} from './components';
import ToolsPage from './pages/ToolsPage';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle login/signup
  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  useEffect(() => {
    // Set initial dark mode based on system preference or saved preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Close sidebar when route changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-dark-bg text-white' : 'bg-light-bg text-gray-900'}`}>
      <Header 
        isAuthenticated={isAuthenticated} 
        onAuthenticate={handleAuthentication} 
      />
      
      <div className="flex flex-1">
        {/* Sidebar for desktop - only show when authenticated */}
        {isAuthenticated && (
          <div className="hidden lg:block">
            <Sidebar />
          </div>
        )}
        
        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && isAuthenticated && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={toggleSidebar}
          ></div>
        )}
        
        {/* Mobile sidebar */}
        {isAuthenticated && (
          <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden transition-transform duration-300 ease-in-out z-40`}>
            <Sidebar />
          </div>
        )}
        
        {/* Main content */}
        <main className="flex-1 overflow-hidden">
          {/* Toggle sidebar button - only visible on mobile when authenticated */}
          {isAuthenticated && (
            <button 
              className="lg:hidden fixed top-20 left-4 z-20 p-2 rounded-full bg-dark-tertiary text-white shadow-md"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
          
          {/* Routes */}
          <Routes>
            {/* Main Dashboard Route */}
            <Route path="/" element={
              isAuthenticated ? (
                <Dashboard />
              ) : (
                <>
                  <Hero />
                  <DocumentGenerator />
                  <PlatformUniqueness />
                  <Features />
                  <Pricing />
                  <Footer />
                </>
              )
            } />
            
            {/* Tools Page */}
            <Route path="/tools" element={<ToolsPage />} />
            
            {/* Add more routes as needed */}
            <Route path="/documents" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/templates" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/projects" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/resources" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/settings" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/generator" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
          </Routes>
          
          {/* Dark mode toggle button */}
          <button 
            className="fixed bottom-8 right-8 p-3 rounded-full bg-dark-tertiary text-white shadow-md z-20"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          
          {/* Auth toggle button (for demo purposes) - only show when authenticated */}
          {isAuthenticated && (
            <button 
              className="fixed bottom-8 left-8 p-3 rounded-full bg-red-500/20 border border-red-500/50 text-white shadow-red-glow z-20"
              onClick={handleLogout}
              aria-label="Log out"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
