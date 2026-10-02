'use client';

import React, { useState } from 'react';
import { sound } from '@/utils/audio';
import { useSingleShot } from '@/hooks/useSingleShot';
import { InteractionShell } from './InteractionShell';

interface NameEvolutionProps {
  onComplete: () => void;
}

const STAGES = [
  { name: 'MAS ALI', caption: 'Dulu: formal dan berjarak.' },
  { name: 'MASLI', caption: 'Lalu: dari titip kopi jam istirahat.' },
  { name: 'SAYANG', caption: 'Sekarang: panggilan yang disimpan hanya untuk hubungan ini.' },
];

const letterTiles = (name: string) => {
  const letters = name.replace(/ /g, '').split('');
  const tiles = letters.map((letter, i) => ({ id: i, letter }));
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  return tiles;
};

export const NameEvolution: React.FC<NameEvolutionProps> = ({ onComplete }) => {
  const finish = useSingleShot(onComplete);
  const [stage, setStage] = useState(0);
  const [tiles, setTiles] = useState(() => letterTiles(STAGES[0].name));
  const [picked, setPicked] = useState<number[]>([]); // tile ids in the order chosen
  const [shake, setShake] = useState(false);
  const [stageDone, setStageDone] = useState(false);

  const allDone = stage >= STAGES.length;
  const currentStage = STAGES[Math.min(stage, STAGES.length - 1)];
  const target = currentStage.name.replace(/ /g, '');

  const handlePick = (tile: { id: number; letter: string }) => {
    if (stageDone || picked.includes(tile.id)) return;
    if (tile.letter !== target[picked.length]) {
      sound.playErrorBuzz();
      setShake(true);
      setTimeout(() => setShake(false), 300);
      return;
    }
    sound.playBlip(380 + picked.length * 70);
    const next = [...picked, tile.id];
    setPicked(next);
    if (next.length === target.length) {
      sound.playAffectionChime();
      setStageDone(true);
    }
  };

  const handleBackspace = () => {
    if (stageDone) return;
    sound.playClick();
    setPicked((p) => p.slice(0, -1));
  };

  const handleNextStage = () => {
    sound.playClick();
    const next = stage + 1;
    setStage(next);
    setPicked([]);
    setStageDone(false);
    if (next < STAGES.length) setTiles(letterTiles(STAGES[next].name));
  };

  // Show the target with the original spacing, filling letters as they are placed
  const display = STAGES[Math.min(stage, STAGES.length - 1)].name.split('').map((ch, i, all) => {
    if (ch === ' ') return { ch: ' ', filled: true, gap: true };
    const letterIndex = all.slice(0, i).filter((c) => c !== ' ').length;
    return { ch, filled: letterIndex < picked.length, gap: false };
  });

  return (
    <InteractionShell
      title="🔤 NAME EVOLUTION"
      hint={allDone ? undefined : 'Panggilannya berubah pelan-pelan. Susun huruf-huruf ini sesuai urutannya.'}
      accent="pink"
      maxWidth={520}
      onSkip={finish}
    >
      {!allDone ? (
        <>
          <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.55rem', color: '#565f89', marginBottom: '10px' }}>
            TAHAP {stage + 1} / {STAGES.length}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '6px',
              marginBottom: '8px',
              animation: shake ? 'shakeX 0.3s ease' : undefined,
            }}
          >
            {display.map((d, i) =>
              d.gap ? (
                <div key={i} style={{ width: '14px' }} />
              ) : (
                <div
                  key={i}
                  style={{
                    width: '38px',
                    height: '46px',
                    border: `2px solid ${d.filled ? '#f7768e' : '#3b4261'}`,
                    background: d.filled ? 'rgba(247, 118, 142, 0.15)' : '#161928',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-pixel)',
                    fontSize: '1rem',
                    color: '#e2e8f0',
                  }}
                >
                  {d.filled ? d.ch : ''}
                </div>
              )
            )}
          </div>

          <div style={{ textAlign: 'center', minHeight: '22px', fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: '#bb9af7', fontStyle: 'italic', marginBottom: '14px' }}>
            {stageDone ? STAGES[stage].caption : ''}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '14px' }}>
            {tiles.map((t) => {
              const used = picked.includes(t.id);
              return (
                <button
                  key={t.id}
                  onClick={() => handlePick(t)}
                  disabled={used || stageDone}
                  className="pixel-btn"
                  style={{ width: '44px', height: '44px', padding: 0, fontSize: '0.9rem', opacity: used ? 0.25 : 1, touchAction: 'manipulation' }}
                >
                  {t.letter}
                </button>
              );
            })}
          </div>

          {stageDone ? (
            <button onClick={handleNextStage} className="pixel-btn pixel-btn-primary" style={{ width: '100%', padding: '12px', fontSize: '0.75rem' }}>
              {stage + 1 < STAGES.length ? 'EVOLUSI BERIKUTNYA ▶' : 'SELESAI ▶'}
            </button>
          ) : (
            <button onClick={handleBackspace} disabled={picked.length === 0} className="pixel-btn" style={{ width: '100%', padding: '10px', fontSize: '0.65rem' }}>
              ⌫ HAPUS
            </button>
          )}
        </>
      ) : (
        <div style={{ textAlign: 'center', animation: 'fadeIn 0.4s ease' }}>
          <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.8rem', color: '#f7768e', lineHeight: 2, marginBottom: '14px' }}>
            MAS ALI → MASLI → SAYANG
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.98rem', color: '#e0def4', fontStyle: 'italic', lineHeight: 1.7, marginBottom: '18px' }}>
            Satu panggilan yang disimpan hanya untuk hubungan ini.
          </p>
          <button
            onClick={() => {
              sound.playAffectionChime();
              finish();
            }}
            className="pixel-btn pixel-btn-primary"
            style={{ fontSize: '0.75rem', padding: '12px 24px' }}
          >
            LANJUT ▶
          </button>
        </div>
      )}
    </InteractionShell>
  );
};
