import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import { FloatingShapes } from './FloatingShapes';
import { DataVisualization } from './DataVisualization';
import { ParticleField } from './ParticleField';

interface Scene3DProps {
  variant?: 'hero' | 'features' | 'data';
  height?: string;
  enableControls?: boolean;
}

export const Scene3D = ({ 
  variant = 'hero', 
  height = '400px', 
  enableControls = false 
}: Scene3DProps) => {
  return (
    <div style={{ height, width: '100%' }} className="rounded-lg overflow-hidden">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <pointLight position={[-5, -5, -5]} intensity={0.3} color="#3b82f6" />
        
        {/* Environment */}
        <Environment preset="city" />
        
        {/* Scene Content */}
        <Suspense fallback={null}>
          {variant === 'hero' && (
            <>
              <ParticleField count={1000} />
              <FloatingShapes />
            </>
          )}
          
          {variant === 'features' && (
            <FloatingShapes />
          )}
          
          {variant === 'data' && (
            <>
              <DataVisualization />
              <ParticleField count={500} />
            </>
          )}
        </Suspense>
        
        {/* Controls */}
        {enableControls && (
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={1}
          />
        )}
        
        {!enableControls && (
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        )}
      </Canvas>
    </div>
  );
};