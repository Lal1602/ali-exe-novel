'use client';

import React, { useState } from 'react';
import { TitleScreen } from '@/components/TitleScreen';
import { GameContainer } from '@/components/GameContainer';

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <main>
      {!gameStarted ? (
        <TitleScreen onStart={() => setGameStarted(true)} />
      ) : (
        <GameContainer onReturnToTitle={() => setGameStarted(false)} />
      )}
    </main>
  );
}
