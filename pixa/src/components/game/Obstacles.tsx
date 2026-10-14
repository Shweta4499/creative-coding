"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { Group } from "three";
import {
  GROUND_TOP,
  INITIAL_OBSTACLES,
  OBSTACLE_HEIGHTS,
  OBSTACLE_SPACING,
  OBSTACLE_SPEED,
  OBSTACLE_VARIANT_COUNT,
} from "../../game/config";
import type { BirdPosition } from "../../game/types";
import {
  CrystalObstacle,
  MeteorObstacle,
  StoneObstacle,
  ThornObstacle,
} from "./ObstacleVariants";

export function Obstacles({
  birdPositionRef,
  isGameOver,
  onCollision,
  onGameOver,
}: {
  birdPositionRef: React.RefObject<BirdPosition>;
  isGameOver: boolean;
  onCollision: (x: number, y: number) => void;
  onGameOver: () => void;
}) {
  const { viewport } = useThree();
  const obstacleRefs = useRef<Array<Group | null>>([]);
  const variantRefs = useRef<Array<Array<Group | null>>>([]);
  const obstacleData = useRef(
    INITIAL_OBSTACLES.map((obstacle) => ({ ...obstacle })),
  );
  const nextHeight = useRef(3);
  const initialized = useRef(false);
  const collisionTriggered = useRef(false);

  useFrame((_, delta) => {
    if (isGameOver || collisionTriggered.current) return;

    const rightEdge = viewport.width / 2;
    const leftEdge = -rightEdge;

    if (!initialized.current) {
      obstacleData.current.forEach((obstacle, index) => {
        obstacle.x = rightEdge + 3 + index * OBSTACLE_SPACING;
        obstacle.variant = Math.floor(Math.random() * OBSTACLE_VARIANT_COUNT);
        variantRefs.current[index]?.forEach((variant, variantIndex) => {
          if (variant) variant.visible = variantIndex === obstacle.variant;
        });
      });
      initialized.current = true;
    }

    for (const [index, obstacle] of obstacleData.current.entries()) {
      const obstacleRef = obstacleRefs.current[index];
      if (!obstacleRef) continue;

      obstacle.x -= OBSTACLE_SPEED * Math.min(delta, 0.05);

      if (obstacle.x < leftEdge - 1) {
        const furthestX = Math.max(
          rightEdge,
          ...obstacleData.current.map((item) => item.x),
        );
        obstacle.x = furthestX + OBSTACLE_SPACING;
        obstacle.height =
          OBSTACLE_HEIGHTS[nextHeight.current % OBSTACLE_HEIGHTS.length];
        obstacle.variant = Math.floor(Math.random() * OBSTACLE_VARIANT_COUNT);
        nextHeight.current += 1;
        obstacleRef.scale.y = obstacle.height;
        variantRefs.current[index]?.forEach((variant, variantIndex) => {
          if (variant) variant.visible = variantIndex === obstacle.variant;
        });
      }

      obstacleRef.position.x = obstacle.x;

      const bird = birdPositionRef.current;
      const overlapsHorizontally =
        Math.abs(bird.x - obstacle.x) < 0.95;
      const obstacleTop = GROUND_TOP + obstacle.height;
      const birdBottom = bird.y - 0.4;

      if (overlapsHorizontally && birdBottom < obstacleTop) {
        collisionTriggered.current = true;
        onCollision(obstacle.x, bird.y);
        onGameOver();
        return;
      }
    }
  });

  return (
    <>
      {INITIAL_OBSTACLES.map((obstacle, index) => (
        <group
          key={index}
          ref={(obstacleRef) => {
            obstacleRefs.current[index] = obstacleRef;
          }}
          position={[obstacle.x, GROUND_TOP, 0]}
          scale={[1, obstacle.height, 1]}
        >
          <group
            ref={(variant) => {
              variantRefs.current[index] ??= [];
              variantRefs.current[index][0] = variant;
            }}
          >
            <CrystalObstacle />
          </group>
          <group
            ref={(variant) => {
              variantRefs.current[index] ??= [];
              variantRefs.current[index][1] = variant;
            }}
            visible={false}
          >
            <StoneObstacle />
          </group>
          <group
            ref={(variant) => {
              variantRefs.current[index] ??= [];
              variantRefs.current[index][2] = variant;
            }}
            visible={false}
          >
            <ThornObstacle />
          </group>
          <group
            ref={(variant) => {
              variantRefs.current[index] ??= [];
              variantRefs.current[index][3] = variant;
            }}
            visible={false}
          >
            <MeteorObstacle />
          </group>
        </group>
      ))}
    </>
  );
}
