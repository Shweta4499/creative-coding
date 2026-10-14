"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { Group } from "three";
import {
  BIRD_X,
  GRAVITY,
  GROUND_LEVEL,
  JUMP_COOLDOWN_MS,
  JUMP_SPEED,
} from "../../game/config";
import type { BirdPosition } from "../../game/types";

export function Bird({
  positionRef,
  isGameOver,
  onJump,
}: {
  positionRef: React.RefObject<BirdPosition>;
  isGameOver: boolean;
  onJump: (x: number, y: number) => void;
}) {
  const birdRef = useRef<Group>(null);
  const wingRef = useRef<Group>(null);
  const velocity = useRef(0);
  const jumpRequested = useRef(false);
  const lastJumpAt = useRef(0);
  const { viewport } = useThree();

  useEffect(() => {
    const requestJump = () => {
      const now = performance.now();

      if (now - lastJumpAt.current >= JUMP_COOLDOWN_MS) {
        jumpRequested.current = true;
        lastJumpAt.current = now;
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code !== "Space") return;

      event.preventDefault();
      if (!event.repeat && !isGameOver) requestJump();
    };

    const handlePointerDown = () => {
      if (!isGameOver) requestJump();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isGameOver]);

  useFrame((state, delta) => {
    const bird = birdRef.current;
    if (!bird || isGameOver) return;

    if (wingRef.current) {
      const wingIsUp = Math.floor(state.clock.elapsedTime * 7) % 2 === 0;
      wingRef.current.position.y = wingIsUp ? -0.02 : -0.25;
    }

    if (jumpRequested.current) {
      velocity.current = JUMP_SPEED;
      jumpRequested.current = false;
      onJump(bird.position.x - 0.55, bird.position.y - 0.1);
    }

    const frameTime = Math.min(delta, 0.05);
    velocity.current += GRAVITY * frameTime;
    bird.position.y += velocity.current * frameTime;

    const ceiling = viewport.height / 2 - 0.6;

    if (bird.position.y <= GROUND_LEVEL) {
      bird.position.y = GROUND_LEVEL;
      velocity.current = 0;
    } else if (bird.position.y >= ceiling) {
      bird.position.y = ceiling;
      velocity.current = Math.min(velocity.current, 0);
    }

    positionRef.current = { x: bird.position.x, y: bird.position.y };
  }, -1);

  return (
    <group ref={birdRef} position={[BIRD_X, -1, 0]}>
      <mesh>
        <boxGeometry args={[1.16, 0.72, 0.76]} />
        <meshBasicMaterial color="#6b3d1f" />
      </mesh>
      <mesh position={[-0.05, 0.02, 0.4]}>
        <boxGeometry args={[0.94, 0.54, 0.05]} />
        <meshBasicMaterial color="#f2b632" />
      </mesh>
      <mesh position={[0.3, 0.24, 0.05]}>
        <boxGeometry args={[0.54, 0.42, 0.78]} />
        <meshBasicMaterial color="#ffd45c" />
      </mesh>
      <mesh position={[0.34, 0.26, 0.46]}>
        <boxGeometry args={[0.2, 0.2, 0.06]} />
        <meshBasicMaterial color="#f8fafc" />
      </mesh>
      <mesh position={[0.38, 0.27, 0.5]}>
        <boxGeometry args={[0.08, 0.08, 0.04]} />
        <meshBasicMaterial color="#07111f" />
      </mesh>
      <mesh position={[0.72, 0.02, 0.05]}>
        <boxGeometry args={[0.34, 0.22, 0.56]} />
        <meshBasicMaterial color="#6b2d28" />
      </mesh>
      <mesh position={[0.77, 0.07, 0.34]}>
        <boxGeometry args={[0.28, 0.1, 0.04]} />
        <meshBasicMaterial color="#ff7b4d" />
      </mesh>
      <group position={[-0.68, 0.06, 0]}>
        <mesh position={[-0.12, 0.1, 0]}>
          <boxGeometry args={[0.34, 0.18, 0.5]} />
          <meshBasicMaterial color="#9c5128" />
        </mesh>
        <mesh position={[-0.08, -0.12, 0]}>
          <boxGeometry args={[0.3, 0.16, 0.5]} />
          <meshBasicMaterial color="#d9772f" />
        </mesh>
      </group>
      <group ref={wingRef} position={[-0.18, -0.02, 0.45]}>
        <mesh>
          <boxGeometry args={[0.58, 0.3, 0.08]} />
          <meshBasicMaterial color="#9c5128" />
        </mesh>
        <mesh position={[-0.08, -0.05, 0.05]}>
          <boxGeometry args={[0.34, 0.14, 0.04]} />
          <meshBasicMaterial color="#f08a32" />
        </mesh>
      </group>
      <mesh position={[-0.26, 0.24, 0.44]}>
        <boxGeometry args={[0.22, 0.1, 0.04]} />
        <meshBasicMaterial color="#ffe889" />
      </mesh>
    </group>
  );
}
