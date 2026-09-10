'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls, useGLTF } from '@react-three/drei';

interface ModelViewerProps {
  modelPath: string;
}

function ModelContent({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);

  return (
    <Center>
      <primitive 
        object={scene} 
        scale={0.8} 
        position={[0, 0, 0]} 
      />
    </Center>
  );
}

export default function ModelViewer({ modelPath }: ModelViewerProps) {
  return (
    <div className="w-full h-full min-h-[200px]">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={2.0} />
        <directionalLight position={[5, 5, 5]} intensity={2.5} />
        
        <ModelContent modelPath={modelPath} />
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.0} />
      </Canvas>
    </div>
  );
}