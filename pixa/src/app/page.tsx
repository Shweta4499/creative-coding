"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { GameScene } from "../components/game/GameScene";
import { StartScreen } from "../components/game/StartScreen";

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false);
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [isStartScreenLeaving, setIsStartScreenLeaving] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameId, setGameId] = useState(0);

  useEffect(() => {
    if (hasStarted) return;

    const startGame = () => {
      setHasStarted(true);
      setIsStartScreenLeaving(true);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code !== "Space") return;
      event.preventDefault();
      startGame();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pointerdown", startGame);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", startGame);
    };
  }, [hasStarted]);

  const restartGame = () => {
    setIsGameOver(false);
    setGameId((currentId) => currentId + 1);
  };

  return (
    <main className="game-screen" aria-label="Pixa game scene">
      <div className="game-title">PIXA</div>
      <Canvas
        orthographic
        camera={{ position: [0, 0, 10], zoom: 70 }}
        dpr={1}
        gl={{ antialias: false, alpha: true }}
      >
        <GameScene
          key={gameId}
          isGameOver={!hasStarted || isGameOver}
          onGameOver={() => setIsGameOver(true)}
        />
      </Canvas>
      {showStartScreen && (
        <StartScreen
          isLeaving={isStartScreenLeaving}
          onExitComplete={() => setShowStartScreen(false)}
        />
      )}
      {isGameOver && (
        <div className="game-over" role="dialog" aria-modal="true">
          <div className="game-over-panel">
            <h1>GAME OVER</h1>
            <button type="button" onClick={restartGame}>
              RESTART
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
