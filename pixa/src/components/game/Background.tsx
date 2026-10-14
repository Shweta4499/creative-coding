"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { Group } from "three";
import {
  CLOUD_POSITIONS,
  GROUND_TOP,
  LARGE_STAR_POSITIONS,
  STAR_POSITIONS,
} from "../../game/config";

function PixelCloud() {
  return (
    <group>
      <mesh>
        <boxGeometry args={[1.35, 0.22, 0.08]} />
        <meshBasicMaterial color="#1d3150" />
      </mesh>
      <mesh position={[-0.32, 0.2, 0]}>
        <boxGeometry args={[0.48, 0.22, 0.08]} />
        <meshBasicMaterial color="#1d3150" />
      </mesh>
      <mesh position={[0.18, 0.28, 0]}>
        <boxGeometry args={[0.65, 0.34, 0.08]} />
        <meshBasicMaterial color="#263e62" />
      </mesh>
      <mesh position={[0.53, 0.12, 0.01]}>
        <boxGeometry args={[0.4, 0.18, 0.08]} />
        <meshBasicMaterial color="#263e62" />
      </mesh>
    </group>
  );
}

export function Background({ isGameOver }: { isGameOver: boolean }) {
  const { viewport } = useThree();
  const cloudRefs = useRef<Array<Group | null>>([]);
  const hillRefs = useRef<Array<Group | null>>([]);
  const silhouetteRefs = useRef<Array<Group | null>>([]);

  useFrame((_, delta) => {
    if (isGameOver) return;

    cloudRefs.current.forEach((cloud) => {
      if (!cloud) return;
      cloud.position.x -= delta * 0.12;

      if (cloud.position.x < -viewport.width / 2 - 1.5) {
        cloud.position.x = viewport.width / 2 + 1.5;
      }
    });

    hillRefs.current.forEach((hill) => {
      if (!hill) return;
      hill.position.x -= delta * 0.18;

      if (hill.position.x < -viewport.width / 2 - viewport.width * 0.2) {
        hill.position.x += viewport.width * 1.25;
      }
    });

    silhouetteRefs.current.forEach((silhouette) => {
      if (!silhouette) return;
      silhouette.position.x -= delta * 0.42;

      if (silhouette.position.x < -viewport.width / 2 - 0.5) {
        silhouette.position.x += viewport.width + 1;
      }
    });
  });

  const skyHeight = Math.max(viewport.height / 2 - GROUND_TOP, 4.5);

  return (
    <group>
      {STAR_POSITIONS.map(([x, y], index) => (
        <mesh
          key={`star-${index}`}
          position={[x * viewport.width, GROUND_TOP + y * skyHeight, -5]}
        >
          <boxGeometry args={[index % 3 === 0 ? 0.1 : 0.06, 0.06, 0.04]} />
          <meshBasicMaterial color={index % 2 === 0 ? "#8aa4c7" : "#526d94"} />
        </mesh>
      ))}

      {LARGE_STAR_POSITIONS.map(([x, y], index) => (
        <group
          key={`large-star-${index}`}
          position={[x * viewport.width, GROUND_TOP + y * skyHeight, -4.8]}
        >
          <mesh>
            <boxGeometry args={[0.42, 0.08, 0.04]} />
            <meshBasicMaterial color="#f8d878" />
          </mesh>
          <mesh>
            <boxGeometry args={[0.08, 0.42, 0.04]} />
            <meshBasicMaterial color="#f8d878" />
          </mesh>
          <mesh>
            <boxGeometry args={[0.14, 0.14, 0.05]} />
            <meshBasicMaterial color="#fff1ad" />
          </mesh>
        </group>
      ))}

      {CLOUD_POSITIONS.map(([x, y], index) => (
        <group
          key={`cloud-${index}`}
          ref={(cloud) => {
            cloudRefs.current[index] = cloud;
          }}
          position={[x * viewport.width, GROUND_TOP + y * skyHeight, -4]}
        >
          <PixelCloud />
        </group>
      ))}

      {[-0.45, -0.15, 0.17, 0.48].map((x, index) => (
        <group
          key={`hill-${index}`}
          ref={(hill) => {
            hillRefs.current[index] = hill;
          }}
          position={[x * viewport.width, GROUND_TOP, -3]}
        >
          <mesh position={[0, 0.35, 0]}>
            <boxGeometry args={[viewport.width * 0.34, 0.7, 0.12]} />
            <meshBasicMaterial color="#102541" />
          </mesh>
          <mesh position={[0, 0.85, 0]}>
            <boxGeometry args={[viewport.width * 0.2, 0.45, 0.12]} />
            <meshBasicMaterial color="#142b49" />
          </mesh>
          <mesh position={[0, 1.2, 0]}>
            <boxGeometry args={[viewport.width * 0.09, 0.28, 0.12]} />
            <meshBasicMaterial color="#193250" />
          </mesh>
        </group>
      ))}

      {[-0.42, -0.24, -0.05, 0.16, 0.34, 0.46].map((x, index) => (
        <group
          key={`silhouette-${index}`}
          ref={(silhouette) => {
            silhouetteRefs.current[index] = silhouette;
          }}
          position={[x * viewport.width, GROUND_TOP, -2]}
        >
          <mesh position={[0, 0.34, 0]}>
            <boxGeometry args={[0.18, 0.68, 0.12]} />
            <meshBasicMaterial color="#0b1b30" />
          </mesh>
          <mesh position={[0, 0.76, 0]}>
            <boxGeometry args={[0.5, 0.2, 0.12]} />
            <meshBasicMaterial color="#0b1b30" />
          </mesh>
          <mesh position={[0, 1.02, 0]}>
            <boxGeometry args={[0.32, 0.32, 0.12]} />
            <meshBasicMaterial color="#0b1b30" />
          </mesh>
        </group>
      ))}
    </group>
  );
}
