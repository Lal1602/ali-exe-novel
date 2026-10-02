'use client';

import React, { useEffect, useRef, useState } from 'react';
import { sound } from '@/utils/audio';
import { useSingleShot } from '@/hooks/useSingleShot';
import { InteractionShell } from './InteractionShell';

interface PoliteSimonProps {
  onComplete: () => void;
}

const ACTIONS = [
  { icon: '🤝', label: 'SALIM' },
  { icon: '🪑', label: 'DUDUK' },
  { icon: '🍵', label: 'TERIMA TEH' },
  { icon: '💬', label: 'JAWAB' },
];

const ROUND_LENGTHS = [2, 3, 4, 4];
const ROUND_LINES = [
  'Bapak mengangguk. "Silakan masuk, Nak."',
  'Ibu tersenyum dan membawakan teh hangat.',
  'Bapak mulai bertanya soal pekerjaan. Kamu menjawab dengan tenang.',
  'Ibu berbisik ke Cegil: "Anaknya baik ya."',
];

const buildSequence = (): number[] =>
  Array.from({ length: Math.max(...ROUND_LENGTHS) }, () => Math.floor(Math.random() * ACTIONS.length));

type Phase = 'showing' | 'input' | 'done';

export const PoliteSimon: React.FC<PoliteSimonProps> = ({ onComplete }) => {
  const finish = useSingleShot(onComplete);
  const [sequence] = useState<number[]>(buildSequence);
  const [round, setRound] = useState(0);
  const [phase, setPhase] = useState<Phase>('showing');
  const [replayKey, setReplayKey] = useState(0);
  const [lit, setLit] = useState<number | null>(null);
  const [inputPos, setInputPos] = useState(0);
  const [message, setMessage] = useState('Perhatikan urutannya...');
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const length = ROUND_LENGTHS[round];

  // Play the sequence for the current round
  useEffect(() => {
    if (phase !== 'showing') return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const STEP = 800;
    const START = 600;
    for (let i = 0; i < length; i++) {
      timers.push(
        setTimeout(() => {
          setLit(sequence[i]);
          sound.playBlip(300 + sequence[i] * 120);
        }, START + i * STEP)
      );
      timers.push(setTimeout(() => setLit(null), START + i * STEP + 520));
    }
    timers.push(
      setTimeout(() => {
        setPhase('input');
        setInputPos(0);
        setMessage('Giliranmu. Ulangi urutannya.');
      }, START + length * STEP)
    );
    timersRef.current = timers;
    return () => timers.forEach(clearTimeout);
  }, [phase, round, replayKey, length, sequence]);

  const press = (index: number) => {
    if (phase !== 'input') return;
    sound.playBlip(300 + index * 120);
    setLit(index);
    setTimeout(() => setLit(null), 180);

    if (sequence[inputPos] !== index) {
      sound.playErrorBuzz();
      setMessage('Urutannya agak berbeda. Perhatikan sekali lagi.');
      setInputPos(0);
      setPhase('showing');
      setReplayKey((k) => k + 1);
      return;
    }

    const nextPos = inputPos + 1;
    if (nextPos < length) {
      setInputPos(nextPos);
      return;
    }

    sound.playAffectionChime();
    if (round === ROUND_LENGTHS.length - 1) {
      setMessage(ROUND_LINES[round]);
      setPhase('done');
    } else {
      setMessage(ROUND_LINES[round]);
      setRound(round + 1);
      setInputPos(0);
      setPhase('showing');
    }
  };

  return (
    <InteractionShell
      title="🍵 SOPAN SANTUN SIMON"
      hint="Pertama kali bertemu orang tua Cegil. Ulangi urutan sikap yang menyala."
      accent="amber"
      maxWidth={520}
      onSkip={finish}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-pixel)', fontSize: '0.55rem', marginBottom: '14px' }}>
        <span style={{ color: '#e0af68' }}>
          RONDE {Math.min(round + 1, ROUND_LENGTHS.length)} / {ROUND_LENGTHS.length}
        </span>
        <span style={{ color: phase === 'input' ? '#73daca' : '#565f89' }}>
          {phase === 'showing' ? 'PERHATIKAN...' : phase === 'input' ? 'GILIRANMU' : 'SELESAI'}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
        {ACTIONS.map((a, i) => (
          <button
            key={a.label}
            onClick={() => press(i)}
            disabled={phase !== 'input'}
            className="pixel-btn"
            style={{
              padding: '18px 8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              borderColor: lit === i ? '#e0af68' : '#3b4261',
              background: lit === i ? 'rgba(224, 175, 104, 0.3)' : '#161928',
              transform: lit === i ? 'scale(1.04)' : 'none',
              transition: 'transform 0.1s ease, background 0.1s ease',
              opacity: phase === 'showing' && lit !== i ? 0.75 : 1,
              touchAction: 'manipulation',
            }}
          >
            <span style={{ fontSize: '1.8rem' }}>{a.icon}</span>
            <span style={{ fontSize: '0.6rem' }}>{a.label}</span>
          </button>
        ))}
      </div>

      <div style={{ minHeight: '44px', fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#bb9af7', fontStyle: 'italic', marginBottom: '14px' }}>
        {message}
      </div>

      {phase === 'done' && (
        <div style={{ animation: 'fadeIn 0.4s ease' }}>
          <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.58rem', color: '#73daca', marginBottom: '12px' }}>
            AFFECTION 50% → 60% (+10%): MEETING THE PARENTS
          </div>
          <button
            onClick={() => {
              sound.playClick();
              finish();
            }}
            className="pixel-btn pixel-btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '0.75rem' }}
          >
            LANJUT ▶
          </button>
        </div>
      )}
    </InteractionShell>
  );
};
