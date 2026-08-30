import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useScroll } from 'motion/react';

const Particles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const { scrollYProgress } = useScroll();
  const scrollRef = useRef(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      scrollRef.current = latest;
    });
  }, [scrollYProgress]);

  const count = 3000;
  
  const [positions, colors, randoms] = useMemo(() => {
    const p = new Float32Array(count * 3);
    const c = new Float32Array(count * 3);
    const r = new Float32Array(count);

    const color1 = new THREE.Color("#9b6738"); // Warm Gold / Primary
    const color2 = new THREE.Color("#1a1a1a"); // Charcoal
    const color3 = new THREE.Color("#c19a6b"); // Bronze-ish

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 12;
      
      p[i * 3] = x;
      p[i * 3 + 1] = y;
      p[i * 3 + 2] = z;

      const randColor = Math.random();
      let mixedColor;
      if (randColor < 0.4) mixedColor = color1;
      else if (randColor < 0.7) mixedColor = color2;
      else mixedColor = color3;

      c[i * 3] = mixedColor.r;
      c[i * 3 + 1] = mixedColor.g;
      c[i * 3 + 2] = mixedColor.b;
      
      r[i] = Math.random();
    }

    return [p, c, r];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    pointsRef.current.rotation.y += delta * 0.05;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;

    const scroll = scrollRef.current;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const random = randoms[i];
      
      const time = state.clock.elapsedTime;
      const noiseX = Math.sin(time * 0.5 + random * 100) * 0.01;
      const noiseY = Math.cos(time * 0.5 + random * 100) * 0.01;
      const noiseZ = Math.sin(time * 0.5 + random * 100) * 0.01;

      const contraction = 1 + Math.sin(scroll * Math.PI * 4) * 0.5;
      
      positions[i3] += noiseX * contraction;
      positions[i3 + 1] += noiseY * contraction;
      positions[i3 + 2] += noiseZ * contraction;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial 
        transparent 
        vertexColors 
        size={0.035} 
        sizeAttenuation={true} 
        depthWrite={false}
        blending={THREE.NormalBlending}
        opacity={0.4}
      />
    </Points>
  );
};

export default function BackgroundParticles() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <fog attach="fog" args={['#faf8f3', 2, 8]} />
        <Particles />
      </Canvas>
    </div>
  );
}
