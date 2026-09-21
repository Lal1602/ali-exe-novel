'use client';

import React, { useState } from 'react';
import { TitleScreen } from '@/components/TitleScreen';
import { GameContainer } from '@/components/GameContainer';

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [continueFromSave, setContinueFromSave] = useState(false);

  const handleStart = (shouldContinue = false) => {
    setContinueFromSave(shouldContinue);
    setGameStarted(true);
  };

  return (
    <main>
      {!gameStarted ? (
        <TitleScreen onStart={handleStart} />
      ) : (
        <GameContainer
          continueFromSave={continueFromSave}
          onReturnToTitle={() => {
            setGameStarted(false);
            setContinueFromSave(false);
          }}
        />
      )}
    </main>
  );
}
