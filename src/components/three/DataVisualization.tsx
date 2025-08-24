import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface DataPoint {
  position: [number, number, number];
  value: number;
  color: string;
}

export const DataVisualization = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const dataPoints = useMemo(() => {
    const points: DataPoint[] = [];
    for (let i = 0; i < 30; i++) {
      points.push({
        position: [
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 2
        ],
        value: Math.random() * 100,
        color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`
      });
    }
    return points;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central hub */}
      <Sphere position={[0, 0, 0]} scale={0.3}>
        <meshStandardMaterial color="#3b82f6" emissive="#1e40af" emissiveIntensity={0.3} />
      </Sphere>
      
      {/* Connection lines */}
      {dataPoints.map((point, index) => {
        const geometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(...point.position)
        ]);
        
        return (
          <line key={`line-${index}`} geometry={geometry}>
            <lineBasicMaterial color="#6366f1" opacity={0.3} transparent />
          </line>
        );
      })}
      
      {/* Data points */}
      {dataPoints.map((point, index) => (
        <group key={index} position={point.position}>
          <Sphere scale={point.value * 0.005 + 0.05}>
            <meshStandardMaterial 
              color={point.color}
              emissive={point.color}
              emissiveIntensity={0.2}
            />
          </Sphere>
          <Text
            position={[0, 0.2, 0]}
            fontSize={0.1}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {Math.round(point.value)}%
          </Text>
        </group>
      ))}
    </group>
  );
};