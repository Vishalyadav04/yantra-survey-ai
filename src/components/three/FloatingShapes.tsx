import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box, Octahedron, Torus } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingShapeProps {
  position: [number, number, number];
  type: 'sphere' | 'box' | 'octahedron' | 'torus';
  color: string;
  scale: number;
  speed: number;
}

const FloatingShape = ({ position, type, color, scale, speed }: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed * 0.01;
      meshRef.current.rotation.y += speed * 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
    }
  });

  const ShapeComponent = {
    sphere: Sphere,
    box: Box,
    octahedron: Octahedron,
    torus: Torus
  }[type];

  return (
    <ShapeComponent
      ref={meshRef}
      position={position}
      scale={scale}
      args={type === 'torus' ? [0.3, 0.1, 16, 32] : undefined}
    >
      <meshStandardMaterial color={color} wireframe />
    </ShapeComponent>
  );
};

export const FloatingShapes = () => {
  const shapes = [
    { position: [-2, 0, -1], type: 'sphere', color: '#3b82f6', scale: 0.5, speed: 1 },
    { position: [2, 1, -2], type: 'box', color: '#8b5cf6', scale: 0.4, speed: 1.5 },
    { position: [0, -1, -1.5], type: 'octahedron', color: '#06b6d4', scale: 0.6, speed: 0.8 },
    { position: [-1, 2, -3], type: 'torus', color: '#10b981', scale: 0.7, speed: 1.2 },
    { position: [3, -0.5, -2.5], type: 'sphere', color: '#f59e0b', scale: 0.3, speed: 2 },
    { position: [-3, -1.5, -2], type: 'box', color: '#ef4444', scale: 0.45, speed: 1.3 },
  ] as const;

  return (
    <group>
      {shapes.map((shape, index) => (
        <FloatingShape key={index} {...shape} />
      ))}
    </group>
  );
};