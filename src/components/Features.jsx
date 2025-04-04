import { useState, useEffect, useRef } from 'react'

function Features() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const sectionRef = useRef(null)
  
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
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    
    return () => {
      if (sectionRef.current) {
        observer.disconnect()
      }
    }
  }, [])
  
  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])
  
  const features = [
    {
      id: 1,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "AI-Driven Document Creation",
      description: "Generate comprehensive documents, reports, and papers with just a few inputs. Our AI understands context and produces relevant, high-quality content.",
      badge: "Core Feature",
      preview: (
        <div className="h-full w-full flex items-center justify-center p-6">
          <div className={`w-full max-w-sm ${isDarkMode ? 'bg-dark-bg' : 'bg-gray-100'} rounded-lg shadow-lg p-4 border ${isDarkMode ? 'border-neon-blue/20' : 'border-blue-300/50'}`}>
            <div className="h-6 flex items-center mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="space-y-2">
              <div className={`h-6 ${isDarkMode ? 'bg-neon-blue/20' : 'bg-blue-200'} rounded w-3/4`}></div>
              <div className={`h-4 ${isDarkMode ? 'bg-neon-blue/10' : 'bg-blue-100'} rounded w-full`}></div>
              <div className={`h-4 ${isDarkMode ? 'bg-neon-blue/10' : 'bg-blue-100'} rounded w-5/6`}></div>
              <div className={`h-4 ${isDarkMode ? 'bg-neon-blue/10' : 'bg-blue-100'} rounded w-full`}></div>
              <div className={`h-4 ${isDarkMode ? 'bg-neon-blue/10' : 'bg-blue-100'} rounded w-4/5`}></div>
              <div className={`mt-4 h-10 ${isDarkMode ? 'bg-neon-blue/20' : 'bg-blue-200'} rounded w-1/2`}></div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      title: "Dynamic Presentation Builder",
      description: "Create visually stunning presentations automatically. Our AI selects the best layouts, graphics, and content flow to maximize engagement.",
      badge: "Popular",
      preview: (
        <div className="h-full w-full flex items-center justify-center p-6">
          <div className={`w-full max-w-sm ${isDarkMode ? 'bg-dark-bg' : 'bg-gray-100'} rounded-lg shadow-lg overflow-hidden border ${isDarkMode ? 'border-neon-blue/20' : 'border-blue-300/50'}`}>
            <div className={`h-24 ${isDarkMode ? 'bg-gradient-to-r from-neon-blue/20 to-blue-500/20' : 'bg-gradient-to-r from-blue-200 to-blue-300'} flex items-center justify-center`}>
              <div className={isDarkMode ? 'text-neon-blue' : 'text-blue-700' + ' font-bold'}>SLIDE TITLE</div>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center">
                <div className={`w-2 h-2 ${isDarkMode ? 'bg-neon-blue' : 'bg-blue-600'} rounded-full mr-2`}></div>
                <div className={`h-4 ${isDarkMode ? 'bg-neon-blue/10' : 'bg-blue-100'} rounded w-2/3`}></div>
              </div>
              <div className="flex items-center">
                <div className={`w-2 h-2 ${isDarkMode ? 'bg-neon-blue' : 'bg-blue-600'} rounded-full mr-2`}></div>
                <div className={`h-4 ${isDarkMode ? 'bg-neon-blue/10' : 'bg-blue-100'} rounded w-3/4`}></div>
              </div>
              <div className="flex items-center">
                <div className={`w-2 h-2 ${isDarkMode ? 'bg-neon-blue' : 'bg-blue-600'} rounded-full mr-2`}></div>
                <div className={`h-4 ${isDarkMode ? 'bg-neon-blue/10' : 'bg-blue-100'} rounded w-1/2`}></div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Interactive Hologram Presentations",
      description: "Take your presentations to the next level with interactive 3D hologram elements that create immersive experiences for your audience.",
      badge: "Advanced",
      preview: (
        <div className="h-full w-full flex items-center justify-center p-6">
          <div className={`hologram w-full max-w-sm h-48 ${isDarkMode ? 'bg-dark-bg' : 'bg-gray-100'} rounded-lg shadow-lg border ${isDarkMode ? 'border-neon-blue/20' : 'border-blue-300/50'} flex items-center justify-center`}>
            <div className="animate-float w-24 h-24 relative">
              <div className={`absolute inset-0 border-2 ${isDarkMode ? 'border-neon-blue/50' : 'border-blue-500/80'} rounded-lg transform rotate-45 glow-border`}></div>
              <div className={`absolute inset-0 border-2 ${isDarkMode ? 'border-neon-blue/30' : 'border-blue-400/60'} rounded-lg transform -rotate-12 glow-border`}></div>
              <div className={`absolute inset-0 flex items-center justify-center ${isDarkMode ? 'text-neon-blue' : 'text-blue-600'} animate-pulse`}>
                <span className="text-xs">HOLOGRAM</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]
  
  return (
    <section 
      id="features" 
      ref={sectionRef}
      className={`section py-20 ${isDarkMode ? 'bg-gradient-dark' : 'bg-gradient-light'} relative overflow-hidden`}
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-10"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className={`max-w-3xl mx-auto text-center mb-20 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <span className={`inline-block py-1 px-3 mb-4 text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'bg-purple-accent/10 text-purple-accent' : 'bg-purple-200 text-purple-800'} rounded-full ${isDarkMode ? 'border border-purple-accent/20' : 'border border-purple-300'}`}>
            Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className={isDarkMode ? 'gradient-text' : 'text-blue-600'}>Features</span> Overview
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            UNIGEN HUB combines cutting-edge AI with intuitive interfaces to revolutionize how you create and present content.
          </p>
        </div>
        
        {/* Feature Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={feature.id}
              className={`card ${isDarkMode ? 'card-hover-effect' : 'shadow-lg'} cursor-pointer transition-all duration-300 ${
                activeFeature === index 
                  ? isDarkMode 
                    ? 'border-neon-blue shadow-neon bg-dark-secondary/80' 
                    : 'border-blue-500 shadow-blue-100 bg-white'
                  : isDarkMode
                    ? 'border-transparent border hover:border-neon-blue/30'
                    : 'border border-gray-200 hover:border-blue-300'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onClick={() => setActiveFeature(index)}
            >
              <div className="flex justify-between mb-4">
                <div className={`${isDarkMode ? 'text-neon-blue' : 'text-blue-600'} mr-4 transition-all duration-300 ${activeFeature === index ? 'scale-110' : 'scale-100'}`}>
                  {feature.icon}
                </div>
                {feature.badge && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    feature.badge === 'Core Feature' 
                      ? isDarkMode 
                        ? 'bg-neon-blue/10 text-neon-blue' 
                        : 'bg-blue-100 text-blue-700'
                      : feature.badge === 'Popular'
                        ? isDarkMode
                          ? 'bg-purple-accent/10 text-purple-accent' 
                          : 'bg-purple-100 text-purple-700'
                        : isDarkMode
                          ? 'bg-blue-accent/10 text-blue-accent'
                          : 'bg-cyan-100 text-cyan-700'
                  }`}>
                    {feature.badge}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 text-sm`}>
                {feature.description}
              </p>
              {activeFeature === index && (
                <div className="flex justify-end">
                  <span className={`${isDarkMode ? 'text-neon-blue' : 'text-blue-600'} text-sm font-medium flex items-center`}>
                    View Demo 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Feature Preview */}
        <div className={`${isDarkMode ? 'bg-dark-secondary/50 backdrop-blur-sm border-neon-blue/20 shadow-neon' : 'bg-white border-blue-200 shadow-lg'} rounded-xl overflow-hidden border transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className={`flex justify-between items-center px-6 py-4 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <h3 className={`text-lg font-medium ${isDarkMode ? 'gradient-text' : 'text-blue-700'}`}>Feature Preview</h3>
            <div className="flex space-x-1">
              {features.map((feature, index) => (
                <button
                  key={feature.id}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeFeature === index 
                      ? isDarkMode ? 'bg-neon-blue' : 'bg-blue-600' 
                      : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                  }`}
                  onClick={() => setActiveFeature(index)}
                />
              ))}
            </div>
          </div>
          
          <div className="h-[400px] overflow-hidden relative">
            {features.map((feature, index) => (
              <div 
                key={feature.id}
                className={`absolute inset-0 transition-all duration-700 transform ${
                  activeFeature === index 
                    ? 'opacity-100 translate-x-0'
                    : activeFeature > index
                      ? 'opacity-0 -translate-x-full'
                      : 'opacity-0 translate-x-full'
                }`}
              >
                {feature.preview}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features 