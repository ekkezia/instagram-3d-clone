'use client';

import React, { useEffect, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

function Model({ path, animationIndex }: { path: string; animationIndex: number }) {
  const gltf = useLoader(GLTFLoader, path) as unknown as { scene: THREE.Group; animations?: THREE.AnimationClip[] };

  const groupRef = useRef<THREE.Group | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    if (!gltf) return;
    const clips = gltf.animations ?? [];
    if (clips.length === 0) return;

    mixerRef.current = new THREE.AnimationMixer(gltf.scene);
    const idx = Math.max(0, Math.min(animationIndex, clips.length - 1));
    const clip = clips[idx];
    const action = mixerRef.current.clipAction(clip);
    action.reset().play();

    return () => {
      try {
        mixerRef.current?.stopAllAction();
        mixerRef.current = null;
      } catch {}
    };
  }, [gltf, animationIndex]);

  useFrame((_, delta) => {
    if (mixerRef.current) mixerRef.current.update(delta);
  });

  return <primitive ref={groupRef} object={gltf.scene} />;
}

export default Model;