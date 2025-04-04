import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthModal } from './auth';

const Navbar = ({ isAuthenticated, onAuthenticate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Check the dark mode from document
  React.useEffect(() => {
    // Check if dark mode is enabled
    const prefersDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(prefersDark);
  }, []);

  return (
    <>
      <nav className="bg-dark-bg text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-neon-blue font-bold text-2xl mr-2">UniGen</span>
              <span className="text-white font-light">Hub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-neon-blue transition-colors">Home</Link>
            <Link to="/#features" className="hover:text-neon-blue transition-colors">Features</Link>
            <Link to="/tools" className="hover:text-neon-blue transition-colors">Tools</Link>
            <Link to="/#pricing" className="hover:text-neon-blue transition-colors">Pricing</Link>
            <Link to="/#contact" className="hover:text-neon-blue transition-colors">Contact</Link>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <Link to="/" className="flex items-center px-4 py-2 border border-neon-blue/50 rounded-lg hover:bg-neon-blue/20 transition-colors">
                <span className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-2 text-white font-medium">
                  JS
                </span>
                <span>Dashboard</span>
              </Link>
            ) : (
              <>
                <button 
                  onClick={openAuthModal}
                  className="px-4 py-2 border border-neon-blue/50 rounded-lg hover:bg-neon-blue/20 transition-colors"
                >
                  Login
                </button>
                <button 
                  onClick={openAuthModal}
                  className="px-4 py-2 bg-neon-blue/20 border border-neon-blue/50 rounded-lg hover:bg-neon-blue/30 transition-colors shadow-glow"
                >
                  Try Demo
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-dark-tertiary mt-2 py-4 px-4 rounded-lg shadow-lg absolute left-4 right-4 z-50 border border-neon-blue/20">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="hover:text-neon-blue transition-colors">Home</Link>
              <Link to="/#features" className="hover:text-neon-blue transition-colors">Features</Link>
              <Link to="/tools" className="hover:text-neon-blue transition-colors">Tools</Link>
              <Link to="/#pricing" className="hover:text-neon-blue transition-colors">Pricing</Link>
              <Link to="/#contact" className="hover:text-neon-blue transition-colors">Contact</Link>
              
              <div className="pt-4 flex flex-col space-y-3 border-t border-gray-700">
                {isAuthenticated ? (
                  <Link to="/" className="flex items-center w-full px-4 py-2 border border-neon-blue/50 rounded-lg hover:bg-neon-blue/20 transition-colors">
                    <span className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-2 text-white font-medium">
                      JS
                    </span>
                    <span>Dashboard</span>
                  </Link>
                ) : (
                  <>
                    <button 
                      onClick={openAuthModal}
                      className="w-full px-4 py-2 border border-neon-blue/50 rounded-lg hover:bg-neon-blue/20 transition-colors text-center"
                    >
                      Login
                    </button>
                    <button 
                      onClick={openAuthModal}
                      className="w-full px-4 py-2 bg-neon-blue/20 border border-neon-blue/50 rounded-lg hover:bg-neon-blue/30 transition-colors shadow-glow text-center"
                    >
                      Try Demo
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        isDarkMode={isDarkMode}
        onAuthenticate={onAuthenticate}
      />
    </>
  );
};

export default Navbar; 