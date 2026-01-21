import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

// Keyboard key component
const KeyboardKey = ({ position, rotation, scale }: { 
  position: [number, number, number]; 
  rotation?: [number, number, number];
  scale?: number;
}) => {
  return (
    <mesh position={position} rotation={rotation || [0, 0, 0]} scale={scale || 1}>
      <boxGeometry args={[0.08, 0.03, 0.08]} />
      <meshStandardMaterial 
        color="#2a2a2a" 
        roughness={0.3} 
        metalness={0.1}
      />
    </mesh>
  );
};

// Cable/wire component
const Cable = ({ 
  start, 
  end, 
  color = "#b87333" 
}: { 
  start: [number, number, number]; 
  end: [number, number, number]; 
  color?: string;
}) => {
  const curve = useMemo(() => {
    const midPoint: [number, number, number] = [
      (start[0] + end[0]) / 2 + (Math.random() - 0.5) * 0.3,
      (start[1] + end[1]) / 2 + (Math.random() - 0.5) * 0.2,
      (start[2] + end[2]) / 2 + (Math.random() - 0.5) * 0.3,
    ];
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(...start),
      new THREE.Vector3(...midPoint),
      new THREE.Vector3(...end),
    ]);
  }, [start, end]);

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 20, 0.015, 8, false);
  }, [curve]);

  return (
    <mesh geometry={tubeGeometry}>
      <meshStandardMaterial color={color} roughness={0.4} metalness={0.6} />
    </mesh>
  );
};

// Head - drum-like shape
const Head = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group position={[0, 1.4, 0]}>
      {/* Main head sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial 
          color="#8B4513" 
          roughness={0.6} 
          metalness={0.2}
        />
      </mesh>
      {/* Drum pattern rings */}
      <mesh position={[0, 0.1, 0]}>
        <torusGeometry args={[0.2, 0.02, 8, 32]} />
        <meshStandardMaterial color="#654321" roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <torusGeometry args={[0.18, 0.015, 8, 32]} />
        <meshStandardMaterial color="#654321" roughness={0.5} />
      </mesh>
      {/* Eyes - small screens/LEDs */}
      <mesh position={[0.08, 0.05, 0.22]}>
        <boxGeometry args={[0.04, 0.02, 0.01]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-0.08, 0.05, 0.22]}>
        <boxGeometry args={[0.04, 0.02, 0.01]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

// Body made of keyboard keys
const Body = () => {
  const keys = useMemo(() => {
    const positions: Array<{ pos: [number, number, number]; rot: [number, number, number] }> = [];
    
    // Create a grid of keys forming the torso
    for (let y = 0; y < 8; y++) {
      for (let angle = 0; angle < 12; angle++) {
        const theta = (angle / 12) * Math.PI * 2;
        const radius = 0.25 - y * 0.015;
        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;
        const yPos = 0.7 + y * 0.08;
        
        positions.push({
          pos: [x, yPos, z],
          rot: [0, -theta, 0],
        });
      }
    }
    
    return positions;
  }, []);

  return (
    <group>
      {keys.map((key, i) => (
        <KeyboardKey 
          key={i} 
          position={key.pos} 
          rotation={key.rot}
          scale={0.9 + Math.random() * 0.2}
        />
      ))}
    </group>
  );
};

// Arms made of cables
const Arms = () => {
  const cables = useMemo(() => {
    const result: Array<{ start: [number, number, number]; end: [number, number, number]; color: string }> = [];
    const colors = ["#b87333", "#cd7f32", "#8b4513", "#a0522d", "#d2691e"];
    
    // Left arm cables
    for (let i = 0; i < 8; i++) {
      result.push({
        start: [-0.25, 1.1 - i * 0.03, 0],
        end: [-0.6 - Math.random() * 0.2, 0.7 + Math.random() * 0.3, 0.2 + Math.random() * 0.2],
        color: colors[i % colors.length],
      });
    }
    
    // Right arm cables
    for (let i = 0; i < 8; i++) {
      result.push({
        start: [0.25, 1.1 - i * 0.03, 0],
        end: [0.6 + Math.random() * 0.2, 0.7 + Math.random() * 0.3, 0.2 + Math.random() * 0.2],
        color: colors[i % colors.length],
      });
    }
    
    return result;
  }, []);

  return (
    <group>
      {cables.map((cable, i) => (
        <Cable key={i} start={cable.start} end={cable.end} color={cable.color} />
      ))}
    </group>
  );
};

// Legs
const Legs = () => {
  return (
    <group>
      {/* Left leg */}
      <mesh position={[-0.12, 0.35, 0]}>
        <cylinderGeometry args={[0.08, 0.06, 0.7, 8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Right leg */}
      <mesh position={[0.12, 0.35, 0]}>
        <cylinderGeometry args={[0.08, 0.06, 0.7, 8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Base/feet */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.35, 0.4, 0.04, 16]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.5} metalness={0.4} />
      </mesh>
    </group>
  );
};

// Main sculpture component
const Sculpture = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} position={[0, -0.7, 0]}>
        <Head />
        <Body />
        <Arms />
        <Legs />
      </group>
    </Float>
  );
};

// Exported component with Canvas
interface SculptureRecyclee3DProps {
  className?: string;
}

export const SculptureRecyclee3D = ({ className }: SculptureRecyclee3DProps) => {
  return (
    <div className={`w-full h-64 sm:h-80 rounded-xl overflow-hidden bg-gradient-to-br from-amber-900/20 to-stone-900/40 ${className || ""}`}>
      <Canvas
        camera={{ position: [2, 1.5, 2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <pointLight position={[-3, 2, -3]} intensity={0.5} color="#ff9966" />
        <Sculpture />
        <OrbitControls 
          enablePan={false} 
          enableZoom={true}
          minDistance={1.5}
          maxDistance={5}
          autoRotate
          autoRotateSpeed={0.5}
        />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
};
