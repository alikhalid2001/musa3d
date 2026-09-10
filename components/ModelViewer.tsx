'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls, useGLTF } from '@react-three/drei';

function ModelContent() {
  const { scene } = useGLTF('/pencil.glb');

  return (
    <Center>
      <primitive 
        object={scene} 
        scale={0.8}          // Reduced scale size for quicker rendering and optimal fit
        position={[0, 0, 0]}   // Centers the model precisely
      />
    </Center>
  );
}

useGLTF.preload('/pencil.glb');

export default function ModelViewer() {
  return (
    <div className="w-full h-full min-h-[200px]">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={2.0} />
        <directionalLight position={[5, 5, 5]} intensity={2.5} />
        
        <ModelContent />
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.0} />
      </Canvas>
    </div>
  );
}