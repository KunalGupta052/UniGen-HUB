import React, { useEffect, useRef } from 'react';

const Hologram = ({ size = 'lg', color = 'primary', className = '', children }) => {
  const hologramRef = useRef(null);
  
  // Size classes
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64'
  };
  
  // Color classes
  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-accent',
    blue: 'text-blue-500',
    purple: 'text-purple-500',
    teal: 'text-teal-500'
  };
  
  useEffect(() => {
    // Add 3D rotation effect
    const el = hologramRef.current;
    if (!el) return;
    
    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate rotation angles based on mouse position
      const xRatio = (x / rect.width) - 0.5;
      const yRatio = (y / rect.height) - 0.5;
      
      // Limit rotation amount
      const maxRotate = 15;
      const xRotation = yRatio * maxRotate;
      const yRotation = -xRatio * maxRotate;
      
      // Apply rotation transform
      el.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    };
    
    const handleMouseLeave = () => {
      // Reset rotation when mouse leaves
      el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    };
    
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <div 
      ref={hologramRef}
      className={`hologram relative ${sizeClasses[size]} ${colorClasses[color]} transition-transform duration-200 ${className}`}
    >
      {/* Base circle with glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 shadow-glow animate-pulse-slow"></div>
      
      {/* Rotating outer ring */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full border-2 border-dashed border-current opacity-30 rounded-full animate-rotate"></div>
      </div>
      
      {/* Small orbiting dot */}
      <div className="absolute w-2 h-2 bg-current rounded-full shadow-glow-strong" style={{ 
        animation: 'orbit 4s linear infinite',
        top: '10%',
        left: '50%',
        transformOrigin: '0 250%'
      }}></div>
      
      {/* Main content in center */}
      <div className="absolute inset-0 flex items-center justify-center animate-float">
        {children}
      </div>
      
      {/* Custom animation for the orbiting dot */}
      <style jsx>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(40%);
          }
          to {
            transform: rotate(360deg) translateX(40%);
          }
        }
      `}</style>
    </div>
  );
};

export default Hologram; 