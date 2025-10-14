'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Torus, MeshWobbleMaterial, Environment } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Animated 3D Object Component
function AnimatedShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Rotate the object continuously
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group>
      {/* Main wobbling sphere */}
      <Sphere ref={meshRef} args={[1, 64, 64]} position={[0, 0, 0]}>
        <MeshWobbleMaterial
          color="#ff6b6b"
          attach="material"
          factor={1} // Strength of the wobble
          speed={2} // Speed of the wobble
          roughness={0}
          metalness={0.1}
        />
      </Sphere>
      
      {/* Orbiting smaller objects */}
      <OrbitingSphere position={[3, 0, 0]} color="#4ecdc4" />
      <OrbitingSphere position={[-3, 0, 0]} color="#45b7d1" />
      <OrbitingSphere position={[0, 3, 0]} color="#f9ca24" />
      <OrbitingSphere position={[0, -3, 0]} color="#6c5ce7" />
      
      {/* Static torus ring */}
      <Torus args={[2, 0.1, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#a55eea" metalness={0.8} roughness={0.2} />
      </Torus>
    </group>
  );
}

// Orbiting sphere component
function OrbitingSphere({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.position.x = Math.cos(time) * position[0];
      meshRef.current.position.z = Math.sin(time) * position[0];
      meshRef.current.position.y = position[1];
    }
  });

  return (
    <Sphere ref={meshRef} args={[0.3, 32, 32]}>
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.1} />
    </Sphere>
  );
}

// Main 3D Scene Component
export default function ThreeDScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[0, 10, 0]} angle={0.3} penumbra={0.2} intensity={0.5} />
        
        {/* Environment for reflections */}
        <Environment preset="city" />
        
        {/* 3D Objects */}
        <AnimatedShape />
        
        {/* Camera Controls */}
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          minDistance={3}
          maxDistance={15}
        />
      </Canvas>
    </div>
  );
}
