'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls, useGLTF } from '@react-three/drei';

function ModelContent() {
  // Loaded using your pencil.glb file from the public folder
  const { scene } = useGLTF('/pencil.glb');

  return (
    <Center>
      <primitive 
        object={scene} 
        scale={2.0}          // Adjust this number if your pencil model is too big or too small
        position={[0, 0, 0]}   // Centers the model
      />
    </Center>
  );
}

useGLTF.preload('/pencil.glb');

export default function ModelViewer() {
  return (
    <div className="w-full h-full min-h-[200px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={2.5} />
        <directionalLight position={[10, 10, 5]} intensity={3} />
        <pointLight position={[-10, -10, -5]} intensity={1} />
        
        <ModelContent />
        
        {/* Allows users to rotate the 3D pencil model with their mouse */}
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
      </Canvas>
    </div>
  );
}