"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh, MeshBasicMaterial } from "three";
import type { ParticleBurst } from "../../game/types";

const PARTICLE_COUNT = 28;
const PARTICLE_IDS = Array.from({ length: PARTICLE_COUNT }, (_, index) => index);
const JUMP_COLORS = ["#f8d878", "#ffe889", "#79d69d"];
const COLLISION_COLORS = ["#f07288", "#a27cff", "#55b7f3", "#f0a17f"];

type ParticleState = {
  active: boolean;
  life: number;
  velocityX: number;
  velocityY: number;
  gravity: number;
};

export function ParticleEffects({
  burstQueueRef,
}: {
  burstQueueRef: React.RefObject<ParticleBurst[]>;
}) {
  const meshRefs = useRef<Array<Mesh | null>>([]);
  const particlesRef = useRef<ParticleState[]>(
    PARTICLE_IDS.map(() => ({
      active: false,
      life: 0,
      velocityX: 0,
      velocityY: 0,
      gravity: 0,
    })),
  );
  const nextParticleRef = useRef(0);

  useFrame((_, delta) => {
    const frameTime = Math.min(delta, 0.05);

    while (burstQueueRef.current.length > 0) {
      const burst = burstQueueRef.current.shift();
      if (!burst) continue;

      const count = burst.type === "jump" ? 6 : 14;
      const colors =
        burst.type === "jump" ? JUMP_COLORS : COLLISION_COLORS;

      for (let index = 0; index < count; index += 1) {
        const particleIndex = nextParticleRef.current % PARTICLE_COUNT;
        nextParticleRef.current += 1;

        const particle = particlesRef.current[particleIndex];
        const mesh = meshRefs.current[particleIndex];
        if (!mesh) continue;

        if (burst.type === "jump") {
          particle.velocityX = -0.8 - Math.random() * 1.2;
          particle.velocityY = -0.5 + Math.random() * 1.1;
          particle.gravity = -1.6;
          particle.life = 0.28 + Math.random() * 0.18;
        } else {
          const angle = Math.random() * Math.PI * 2;
          const speed = 1.5 + Math.random() * 2.4;
          particle.velocityX = Math.cos(angle) * speed;
          particle.velocityY = Math.sin(angle) * speed;
          particle.gravity = -2.4;
          particle.life = 0.48 + Math.random() * 0.24;
        }

        particle.active = true;
        mesh.visible = true;
        mesh.position.set(
          burst.x + (Math.random() - 0.5) * 0.2,
          burst.y + (Math.random() - 0.5) * 0.2,
          1,
        );

        const size = 0.7 + Math.floor(Math.random() * 3) * 0.3;
        mesh.scale.setScalar(size);
        (mesh.material as MeshBasicMaterial).color.set(
          colors[index % colors.length],
        );
      }
    }

    particlesRef.current.forEach((particle, index) => {
      if (!particle.active) return;

      const mesh = meshRefs.current[index];
      if (!mesh) return;

      particle.life -= frameTime;
      if (particle.life <= 0) {
        particle.active = false;
        mesh.visible = false;
        return;
      }

      particle.velocityY += particle.gravity * frameTime;
      mesh.position.x += particle.velocityX * frameTime;
      mesh.position.y += particle.velocityY * frameTime;
    });
  });

  return (
    <group>
      {PARTICLE_IDS.map((particleId) => (
        <mesh
          key={particleId}
          ref={(mesh) => {
            meshRefs.current[particleId] = mesh;
          }}
          visible={false}
        >
          <boxGeometry args={[0.1, 0.1, 0.06]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  );
}
