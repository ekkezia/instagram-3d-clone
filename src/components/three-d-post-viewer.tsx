'use client';
import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import Model from './model';

export default function ThreeDPostViewer({ postIdx }: { postIdx: number }) {
  useEffect(() => {
    console.log('post id', postIdx)
  }, [postIdx])

  return (
    <div className="relative aspect-square w-full">
      <Suspense 
        fallback={
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
              <p>Initializing 3D Scene...</p>
            </div>
          </div>
        }
      >
        <div className="w-full h-[480px] bg-black">
          <Canvas shadows camera={{ position: [0, 2, 6], fov: 50 }}>
            {/* soft ambient + hemisphere for better fill */}
            <ambientLight intensity={0.1} />
            <hemisphereLight args={[0xffffee, 0x080820, 0.3]} />
            <directionalLight position={[5, 10, 7]} intensity={0.8} castShadow />
            {/* small point light to reduce deep shadowing */}
            <pointLight position={[0, 4, 2]} intensity={0.8} />
            {/* add an environment map so PBR materials render nicely */}
            <React.Suspense fallback={<Html center>Loading model...</Html>}>
              <Model path="/models/shahnaz.glb" animationIndex={0} />
            </React.Suspense>
            <OrbitControls />
          </Canvas>
        </div>

      </Suspense>
    </div>
  );
}
