import React, { useState, useEffect } from 'react';

const Feature = ({ icon, title, description, className, isDarkMode }) => {
  return (
    <div className={`${className} ${
      isDarkMode 
        ? 'bg-dark-secondary border-dark-tertiary hover:border-neon-blue/50 hover:shadow-glow' 
        : 'bg-white border-gray-200 hover:border-blue-500/50 hover:shadow-lg'
      } rounded-xl border p-6 transition-all duration-300`}>
      <div className={`w-12 h-12 ${
        isDarkMode 
          ? 'bg-dark-tertiary border-dark-tertiary text-neon-blue' 
          : 'bg-blue-50 border-blue-100 text-blue-600'
        } rounded-lg flex items-center justify-center mb-4 border`}>
        {icon}
      </div>
      <h3 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-xl font-bold mb-2`}>{title}</h3>
      <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
    </div>
  );
};

const PlatformUniqueness = () => {
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

  const features = [
    {
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
      title: "All Documents in One Place",
      description: "Create, edit, and manage all your documents within a single platform, eliminating the need for multiple specialized tools."
    },
    {
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>,
      title: "Customizable Templates",
      description: "Start with professionally designed templates for any document type, then customize them to meet your specific requirements."
    },
    {
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
      title: "Modern Design Tools",
      description: "Access powerful yet intuitive design tools that help you create visually stunning documents that stand out."
    },
    {
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
      title: "Instant Document Generation",
      description: "Generate professional documents in seconds just by describing what you need, powered by advanced template technology."
    },
    {
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      title: "Time-Saving Workflows",
      description: "Streamlined processes and intelligent suggestions help you create documents up to 10x faster than traditional methods."
    },
    {
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
      title: "Team Collaboration",
      description: "Work together with your team in real-time with shared documents, comments, and version history tracking."
    }
  ];

  return (
    <section id="uniqueness" className={`py-16 ${isDarkMode ? 'bg-dark-bg' : 'bg-light-bg'} relative overflow-hidden`}>
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-radial opacity-30' : 'bg-gradient-radial-light opacity-20'}`}></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Why UniGenHub is Different
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            We've reimagined document creation from the ground up to provide a unified solution that eliminates complexity and boosts productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Feature 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              className={index === 0 ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>

        <div className={`mt-16 ${
          isDarkMode 
            ? 'bg-dark-tertiary border-dark-tertiary' 
            : 'bg-blue-50 border-blue-100'
          } rounded-xl p-8 border relative overflow-hidden`}>
          <div className={`absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 ${
            isDarkMode ? 'bg-neon-blue/10' : 'bg-blue-200/50'
          } rounded-full filter blur-3xl`}></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
            <div className="mb-6 md:mb-0 md:mr-10">
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                Ready to transform your document workflow?
              </h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Join thousands of professionals who create better documents in less time.
              </p>
            </div>
            
            <button className={`px-8 py-3 ${
              isDarkMode 
                ? 'bg-neon-blue/20 text-white border-neon-blue shadow-glow hover:bg-neon-blue/30' 
                : 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
              } border rounded-lg transition-all duration-300 whitespace-nowrap`}>
              Start Creating Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformUniqueness; 