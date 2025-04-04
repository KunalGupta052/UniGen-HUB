import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  useEffect(() => {
    // Check if dark mode is enabled
    const prefersDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(prefersDark);
    
    // Add listener for dark mode changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          setIsDarkMode(isDark);
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`pt-16 pb-24 ${isDarkMode ? 'bg-dark-bg' : 'bg-light-bg'} relative overflow-hidden`}>
      {/* Background effects */}
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-radial opacity-30' : 'bg-gradient-radial-light opacity-20'}`}></div>
      <div className="absolute inset-0 grid-bg"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} leading-tight mb-6`}>
              Create Any Document <br />
              <span className={`${isDarkMode ? 'text-glow text-neon-blue' : 'text-blue-600'}`}>In One Platform</span>
            </h1>
            
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-lg md:text-xl mb-8 max-w-xl`}>
              UniGenHub streamlines your document creation workflow by providing all the tools you need in one seamless platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className={`btn-primary ${isDarkMode ? 'bg-neon-blue/20 text-white border border-neon-blue/50 hover:bg-neon-blue/30 shadow-glow' : 'bg-blue-600 text-white hover:bg-blue-700'} py-3 px-8 rounded-lg font-medium transition-all duration-300`}>
                Get Started Free
              </button>
              <button className={`btn-outline ${isDarkMode ? 'text-white border border-white/20 hover:bg-white/10' : 'text-gray-800 border border-gray-300 hover:bg-gray-50'} py-3 px-8 rounded-lg font-medium transition-all duration-300`}>
                View Templates
              </button>
            </div>
            
            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-gray-700 border-dark-bg' : 'bg-gray-200 border-white'} border-2 flex items-center justify-center text-xs ${isDarkMode ? 'text-white' : 'text-gray-800'} font-medium`}>
                    {['JS', 'KL', 'MR', 'TN'][i-1]}
                  </div>
                ))}
              </div>
              <div className="ml-4">
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className={`w-4 h-4 ${isDarkMode ? 'text-neon-blue' : 'text-yellow-500'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className={`ml-2 ${isDarkMode ? 'text-white' : 'text-gray-800'} text-sm`}>4.9/5 from 2,500+ reviews</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className={`${isDarkMode ? 'bg-dark-secondary border-dark-tertiary shadow-glow' : 'bg-white border-gray-200 shadow-lg'} rounded-xl border p-1 relative`}>
              <div className="hologram-container">
                <div className="hologram-scan"></div>
                <div className="hologram-glitch"></div>
                <img 
                  src="/images/document-platform.png" 
                  alt="UniGenHub Document Platform"
                  className="rounded-lg w-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/600x400/1a2438/ffffff?text=UniGenHub+Document+Platform";
                  }}
                />
              </div>
              
              <div className={`absolute -bottom-3 -right-3 ${isDarkMode ? 'bg-dark-tertiary border-dark-tertiary shadow-glow-strong' : 'bg-gray-100 border-gray-300 shadow-md'} rounded-lg p-3 border`}>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${isDarkMode ? 'bg-neon-blue' : 'bg-blue-600'} animate-pulse-slow`}></div>
                  <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'} text-xs font-medium`}>20+ Document Types</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 