import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeDHologram = ({ size = 'md', type = 'cube', color = 'neon-blue', className = '' }) => {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);

  // Size mappings
  const sizes = {
    sm: 100,
    md: 150,
    lg: 200,
    xl: 300
  };

  // Color mappings
  const colors = {
    'neon-blue': 0x00ffff,
    'blue-accent': 0x3a86ff,
    'neon-purple': 0x9d4edd,
    'primary': 0x6b46ed
  };

  useEffect(() => {
    // Scene setup
    const width = sizes[size] || sizes.md;
    const height = sizes[size] || sizes.md;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    
    // Clear any existing canvas
    if (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }
    
    mountRef.current.appendChild(renderer.domElement);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.rotateSpeed = 0.5;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;
    controlsRef.current = controls;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(colors[color] || colors['neon-blue'], 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // Create hologram object based on type
    let geometry;
    switch (type) {
      case 'sphere':
        geometry = new THREE.SphereGeometry(1.5, 32, 32);
        break;
      case 'torus':
        geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
        break;
      case 'pyramid':
        geometry = new THREE.ConeGeometry(1.5, 2, 4);
        break;
      case 'cube':
      default:
        geometry = new THREE.BoxGeometry(2, 2, 2);
    }
    
    // Materials for hologram effect
    const mainMaterial = new THREE.MeshPhongMaterial({
      color: colors[color] || colors['neon-blue'],
      transparent: true,
      opacity: 0.7,
      wireframe: false,
    });
    
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: colors[color] || colors['neon-blue'],
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    
    // Create main mesh
    const mesh = new THREE.Mesh(geometry, mainMaterial);
    scene.add(mesh);
    
    // Create wireframe mesh
    const wireframe = new THREE.Mesh(geometry, wireframeMaterial);
    wireframe.scale.multiplyScalar(1.05);
    scene.add(wireframe);
    
    // Add hologram scan line effect
    const scanGeometry = new THREE.PlaneGeometry(4, 0.05);
    const scanMaterial = new THREE.MeshBasicMaterial({
      color: colors[color] || colors['neon-blue'],
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide
    });
    
    const scanLine = new THREE.Mesh(scanGeometry, scanMaterial);
    scene.add(scanLine);
    
    // Animation loop
    let scanDirection = 1;
    let scanPosition = -2;
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the object
      mesh.rotation.x += 0.003;
      mesh.rotation.y += 0.005;
      wireframe.rotation.x += 0.003;
      wireframe.rotation.y += 0.005;
      
      // Animate scan line
      scanPosition += 0.02 * scanDirection;
      if (scanPosition > 2) {
        scanDirection = -1;
      } else if (scanPosition < -2) {
        scanDirection = 1;
      }
      scanLine.position.y = scanPosition;
      
      // Update controls
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Clean up
    return () => {
      if (mountRef.current && mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
    };
  }, [size, type, color]);
  
  return (
    <div ref={mountRef} className={`hologram-container ${className}`}></div>
  );
};

export default ThreeDHologram; 