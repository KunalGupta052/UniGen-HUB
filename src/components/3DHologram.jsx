import React, { useEffect, useRef, useState } from 'react';

const ThreeDHologram = ({ className = '', size = 'lg', type = 'sphere', color = 'primary' }) => {
  const hologramRef = useRef(null);
  const canvasRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Size classes
  const sizeMap = {
    sm: { width: 120, height: 120, className: 'w-[120px] h-[120px]' },
    md: { width: 180, height: 180, className: 'w-[180px] h-[180px]' },
    lg: { width: 240, height: 240, className: 'w-[240px] h-[240px]' },
    xl: { width: 300, height: 300, className: 'w-[300px] h-[300px]' }
  };

  // Color classes
  const colorMap = {
    primary: { main: '#6b46ed', accent: '#8255ff', glow: 'shadow-glow-strong' },
    blue: { main: '#3b82f6', accent: '#60a5fa', glow: 'shadow-blue-glow' },
    teal: { main: '#14b8a6', accent: '#2dd4bf', glow: 'shadow-teal-glow' },
    amber: { main: '#f59e0b', accent: '#fbbf24', glow: 'shadow-amber-glow' },
  };
  
  // Hologram rotation effect
  useEffect(() => {
    const hologram = hologramRef.current;
    if (!hologram) return;
    
    let rafId;
    let rotation = 0;
    
    const animate = () => {
      rotation += 0.005;
      hologram.style.transform = `perspective(1000px) rotateY(${rotation}rad)`;
      rafId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle mousemove for 3D effect
    const handleMouseMove = (e) => {
      const rect = hologram.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);
      
      // Limit rotation range
      const rotX = deltaY * 15;
      const rotY = -deltaX * 15;
      
      hologram.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    };
    
    const handleMouseEnter = () => {
      cancelAnimationFrame(rafId);
      setIsHovering(true);
    };
    
    const handleMouseLeave = () => {
      setIsHovering(false);
      animate();
    };
    
    hologram.addEventListener('mouseenter', handleMouseEnter);
    hologram.addEventListener('mouseleave', handleMouseLeave);
    hologram.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      cancelAnimationFrame(rafId);
      if (hologram) {
        hologram.removeEventListener('mouseenter', handleMouseEnter);
        hologram.removeEventListener('mouseleave', handleMouseLeave);
        hologram.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);
  
  // Canvas animation for the hologram content
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    
    const colorObj = colorMap[color] || colorMap.primary;
    const mainColor = colorObj.main;
    const accentColor = colorObj.accent;
    
    // Set canvas size based on the size prop
    const sizeObj = sizeMap[size] || sizeMap.lg;
    canvas.width = sizeObj.width;
    canvas.height = sizeObj.height;
    
    let particles = [];
    let lines = [];
    const particleCount = 80;
    
    // Initialize particles based on type
    if (type === 'sphere') {
      for (let i = 0; i < particleCount; i++) {
        // Create sphere using spherical coordinates
        const theta = Math.random() * 2 * Math.PI; // longitude
        const phi = Math.random() * Math.PI; // latitude
        const radius = 80 * (0.8 + Math.random() * 0.2);
        
        const x = width/2 + radius * Math.sin(phi) * Math.cos(theta);
        const y = height/2 + radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        particles.push({ x, y, z, radius: 1 + Math.random() * 2 });
      }
    } else if (type === 'cube') {
      const size = 70;
      const edges = [
        // 8 corners of a cube
        [-size, -size, -size], [size, -size, -size], 
        [size, size, -size], [-size, size, -size],
        [-size, -size, size], [size, -size, size], 
        [size, size, size], [-size, size, size]
      ];
      
      // Add points along the edges
      for (let i = 0; i < particleCount; i++) {
        const edge = Math.floor(Math.random() * edges.length);
        const [baseX, baseY, baseZ] = edges[edge];
        
        // Random position along edges
        const randomEdge = Math.floor(Math.random() * 3); // x, y, or z
        let x = baseX, y = baseY, z = baseZ;
        
        if (randomEdge === 0) {
          // Vary X
          x = Math.random() * size * 2 - size;
        } else if (randomEdge === 1) {
          // Vary Y
          y = Math.random() * size * 2 - size;
        } else {
          // Vary Z
          z = Math.random() * size * 2 - size;
        }
        
        particles.push({ 
          x: width/2 + x, 
          y: height/2 + y, 
          z: z, 
          radius: 1 + Math.random() * 1.5 
        });
      }
      
      // Define cube lines
      lines = [
        [0, 1], [1, 2], [2, 3], [3, 0], // bottom face
        [4, 5], [5, 6], [6, 7], [7, 4], // top face
        [0, 4], [1, 5], [2, 6], [3, 7]  // vertical edges
      ];
    } else if (type === 'pyramid') {
      const baseSize = 80;
      const height = 100;
      const corners = [
        [0, -height/2, 0], // top
        [-baseSize/2, height/2, -baseSize/2], // bottom left front
        [baseSize/2, height/2, -baseSize/2],  // bottom right front
        [baseSize/2, height/2, baseSize/2],   // bottom right back
        [-baseSize/2, height/2, baseSize/2]   // bottom left back
      ];
      
      // Add points
      for (let i = 0; i < particleCount; i++) {
        const cornerIdx = Math.floor(Math.random() * corners.length);
        const [baseX, baseY, baseZ] = corners[cornerIdx];
        
        // For the top, connect to any base point
        if (cornerIdx === 0) {
          const targetBase = 1 + Math.floor(Math.random() * 4);
          const [targetX, targetY, targetZ] = corners[targetBase];
          
          // Random point along the line
          const t = Math.random();
          const x = baseX * (1-t) + targetX * t;
          const y = baseY * (1-t) + targetY * t;
          const z = baseZ * (1-t) + targetZ * t;
          
          particles.push({ 
            x: width/2 + x, 
            y: height/2 + y, 
            z, 
            radius: 1 + Math.random() * 2 
          });
        } else {
          // For base points, connect to adjacent base points
          const nextIdx = ((cornerIdx - 1 + 1) % 4) + 1;
          const [targetX, targetY, targetZ] = corners[nextIdx];
          
          // Random point along the base edge
          const t = Math.random();
          const x = baseX * (1-t) + targetX * t;
          const y = baseY * (1-t) + targetY * t;
          const z = baseZ * (1-t) + targetZ * t;
          
          particles.push({ 
            x: width/2 + x, 
            y: height/2 + y, 
            z, 
            radius: 1 + Math.random() * 2 
          });
        }
      }
      
      // Define pyramid lines
      lines = [
        [0, 1], [0, 2], [0, 3], [0, 4], // edges from top to base
        [1, 2], [2, 3], [3, 4], [4, 1]  // base edges
      ];
    } else if (type === 'dna') {
      const helixRadius = 40;
      const helixHeight = 200;
      const turns = 2;
      
      // Create DNA helix
      for (let i = 0; i < particleCount; i++) {
        const t = Math.random();
        const angle = t * turns * Math.PI * 2;
        
        // First strand
        const x1 = width/2 + helixRadius * Math.cos(angle);
        const y1 = height/2 - helixHeight/2 + t * helixHeight;
        const z1 = helixRadius * Math.sin(angle);
        
        // Second strand (opposite)
        const x2 = width/2 + helixRadius * Math.cos(angle + Math.PI);
        const y2 = height/2 - helixHeight/2 + t * helixHeight;
        const z2 = helixRadius * Math.sin(angle + Math.PI);
        
        particles.push({ x: x1, y: y1, z: z1, radius: 1.5 + Math.random() });
        particles.push({ x: x2, y: y2, z: z2, radius: 1.5 + Math.random() });
        
        // Add connections between strands every quarter turn
        if (i % 10 === 0) {
          particles.push({ 
            x: (x1 + x2) / 2, 
            y: (y1 + y2) / 2, 
            z: (z1 + z2) / 2, 
            radius: 1, 
            isConnection: true 
          });
        }
      }
      
      // In DNA we don't need predefined lines, connections are drawn dynamically
    }
    
    let rotationX = 0;
    let rotationY = 0;
    let rotationZ = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update rotations
      if (!isHovering) {
        rotationX += 0.002;
        rotationY += 0.003;
        rotationZ += 0.001;
      }
      
      // Sort particles by z-index for proper rendering
      const sortedParticles = [...particles].sort((a, b) => b.z - a.z);
      
      // Draw connections if needed (for cube and pyramid)
      if (lines.length > 0 && (type === 'cube' || type === 'pyramid')) {
        ctx.strokeStyle = `${mainColor}33`; // semi-transparent
        ctx.lineWidth = 0.5;
        
        // Draw structure lines
        for (const [i1, i2] of lines) {
          const p1 = rotatePoint(corners[i1], rotationX, rotationY, rotationZ);
          const p2 = rotatePoint(corners[i2], rotationX, rotationY, rotationZ);
          
          ctx.beginPath();
          ctx.moveTo(width/2 + p1.x, height/2 + p1.y);
          ctx.lineTo(width/2 + p2.x, height/2 + p2.y);
          ctx.stroke();
        }
      }
      
      // Draw particles
      sortedParticles.forEach((p, i) => {
        // Rotate point
        const rotated = rotatePoint({ x: p.x - width/2, y: p.y - height/2, z: p.z }, rotationX, rotationY, rotationZ);
        const px = rotated.x + width/2;
        const py = rotated.y + height/2;
        const pz = rotated.z;
        
        // Size based on z position (perspective)
        const size = p.radius * (1 + pz / 200);
        
        // Color based on z position
        const alpha = 0.3 + 0.7 * (pz + 100) / 200;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        
        // Different color based on particle type
        if (p.isConnection) {
          ctx.fillStyle = `${accentColor}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
        } else {
          ctx.fillStyle = `${mainColor}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
        }
        ctx.fill();
        
        // Connect nearby particles for sphere or DNA
        if (type === 'sphere' || type === 'dna') {
          for (let j = i + 1; j < sortedParticles.length; j++) {
            const p2 = sortedParticles[j];
            const rotated2 = rotatePoint({ x: p2.x - width/2, y: p2.y - height/2, z: p2.z }, rotationX, rotationY, rotationZ);
            const px2 = rotated2.x + width/2;
            const py2 = rotated2.y + height/2;
            
            const distance = Math.sqrt(Math.pow(px - px2, 2) + Math.pow(py - py2, 2));
            
            if ((type === 'sphere' && distance < 40) || 
                (type === 'dna' && distance < 20)) {
              // Calculate opacity based on distance
              const opacity = type === 'sphere' 
                ? 1 - distance / 40
                : 1 - distance / 20;
              
              ctx.beginPath();
              ctx.moveTo(px, py);
              ctx.lineTo(px2, py2);
              ctx.strokeStyle = `${mainColor}${Math.floor(opacity * 100).toString(16).padStart(2, '0')}`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => cancelAnimationFrame(animate);
  }, [color, size, type, isHovering]);
  
  // Helper function to rotate points in 3D space
  const rotatePoint = (point, rotX, rotY, rotZ) => {
    let { x, y, z } = point;
    
    // Rotate around X axis
    let y1 = y * Math.cos(rotX) - z * Math.sin(rotX);
    let z1 = y * Math.sin(rotX) + z * Math.cos(rotX);
    
    // Rotate around Y axis
    let x2 = x * Math.cos(rotY) + z1 * Math.sin(rotY);
    let z2 = -x * Math.sin(rotY) + z1 * Math.cos(rotY);
    
    // Rotate around Z axis
    let x3 = x2 * Math.cos(rotZ) - y1 * Math.sin(rotZ);
    let y3 = x2 * Math.sin(rotZ) + y1 * Math.cos(rotZ);
    
    return { x: x3, y: y3, z: z2 };
  };
  
  const sizeClass = sizeMap[size]?.className || sizeMap.lg.className;
  const colorClass = colorMap[color]?.glow || colorMap.primary.glow;
  
  return (
    <div 
      ref={hologramRef}
      className={`relative ${sizeClass} ${className}`}
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease-out' }}
    >
      {/* Bottom glow effect */}
      <div className={`absolute -inset-4 rounded-full blur-xl ${colorClass} opacity-30`}></div>
      
      {/* Hologram container */}
      <div className="hologram w-full h-full rounded-full relative">
        {/* Semi-transparent base */}
        <div className="absolute inset-0 border border-dashed border-white/30 rounded-full"></div>
        
        {/* Canvas for the hologram content */}
        <canvas 
          ref={canvasRef} 
          className="w-full h-full absolute inset-0"
        ></canvas>
        
        {/* Floating rings */}
        <div className="absolute inset-2 border-2 border-dashed border-white/10 rounded-full animate-rotate" style={{ animationDuration: '40s' }}></div>
        <div className="absolute inset-4 border border-dashed border-primary/20 rounded-full animate-rotate" style={{ animationDuration: '30s', animationDirection: 'reverse' }}></div>
        
        {/* Central glow */}
        <div className={`absolute inset-1/4 rounded-full blur-md ${colorClass} opacity-20 animate-pulse-slow`}></div>
      </div>
      
      {/* Optional label */}
      {type !== 'sphere' && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <span className="text-xs text-glow uppercase tracking-wider">{type}</span>
        </div>
      )}
    </div>
  );
};

export default ThreeDHologram; 