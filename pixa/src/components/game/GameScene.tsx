"use client";

import { useRef } from "react";
import { BIRD_X } from "../../game/config";
import type { BirdPosition, ParticleBurst } from "../../game/types";
import { Background } from "./Background";
import { Bird } from "./Bird";
import { Ground } from "./Ground";
import { Obstacles } from "./Obstacles";
import { ParticleEffects } from "./ParticleEffects";

export function GameScene({
  isGameOver,
  onGameOver,
}: {
  isGameOver: boolean;
  onGameOver: () => void;
}) {
  const birdPositionRef = useRef<BirdPosition>({ x: BIRD_X, y: -1 });
  const burstQueueRef = useRef<ParticleBurst[]>([]);

  return (
    <>
      <Background isGameOver={isGameOver} />
      <Bird
        positionRef={birdPositionRef}
        isGameOver={isGameOver}
        onJump={(x, y) => {
          burstQueueRef.current.push({ type: "jump", x, y });
        }}
      />
      <Obstacles
        birdPositionRef={birdPositionRef}
        isGameOver={isGameOver}
        onCollision={(x, y) => {
          burstQueueRef.current.push({ type: "collision", x, y });
        }}
        onGameOver={onGameOver}
      />
      <ParticleEffects burstQueueRef={burstQueueRef} />
      <Ground isGameOver={isGameOver} />
    </>
  );
}
