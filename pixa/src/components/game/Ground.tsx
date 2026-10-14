"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { Group } from "three";
import { OBSTACLE_SPEED } from "../../game/config";

export function Ground({ isGameOver }: { isGameOver: boolean }) {
  const { viewport } = useThree();
  const width = Math.max(18, viewport.width + 2);
  const detailRefs = useRef<Array<Group | null>>([]);
  const details = Array.from({ length: Math.ceil(width / 1.2) }, (_, index) => {
    const x = -width / 2 + index * 1.2 + 0.6;
    return { x, high: index % 3 === 0 };
  });

  useFrame((_, delta) => {
    if (isGameOver) return;

    detailRefs.current.forEach((detail) => {
      if (!detail) return;
      detail.position.x -= OBSTACLE_SPEED * Math.min(delta, 0.05);

      if (detail.position.x < -width / 2 - 0.6) {
        detail.position.x += width;
      }
    });
  });

  return (
    <group position={[0, -3.6, 0]}>
      <mesh>
        <boxGeometry args={[width, 1.2, 1]} />
        <meshBasicMaterial color="#172a3b" />
      </mesh>
      <mesh position={[0, 0.08, 0.51]}>
        <boxGeometry args={[width, 0.82, 0.04]} />
        <meshBasicMaterial color="#5a4431" />
      </mesh>
      <mesh position={[0, -0.53, 0.52]}>
        <boxGeometry args={[width, 0.14, 0.05]} />
        <meshBasicMaterial color="#0b1723" />
      </mesh>
      <mesh position={[0, 0.5, 0.53]}>
        <boxGeometry args={[width, 0.2, 0.06]} />
        <meshBasicMaterial color="#43b581" />
      </mesh>
      <mesh position={[0, 0.63, 0.54]}>
        <boxGeometry args={[width, 0.08, 0.07]} />
        <meshBasicMaterial color="#79d69d" />
      </mesh>
      {details.map(({ x, high }, index) => (
        <group
          key={index}
          ref={(detail) => {
            detailRefs.current[index] = detail;
          }}
          position={[x, 0, 0]}
        >
          <mesh position={[0, high ? 0.28 : 0.12, 0.55]}>
            <boxGeometry args={[0.2, high ? 0.24 : 0.14, 0.06]} />
            <meshBasicMaterial color="#342d27" />
          </mesh>
          <mesh position={[0.38, -0.2, 0.55]}>
            <boxGeometry args={[0.28, 0.12, 0.06]} />
            <meshBasicMaterial color="#765a3d" />
          </mesh>
          <mesh position={[-0.3, 0.58, 0.57]}>
            <boxGeometry args={[0.16, high ? 0.18 : 0.1, 0.04]} />
            <meshBasicMaterial color="#2b8d68" />
          </mesh>
        </group>
      ))}
    </group>
  );
}
