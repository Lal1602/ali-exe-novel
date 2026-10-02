'use client';

import React, { useEffect, useRef, useState } from 'react';
import { sound } from '@/utils/audio';
import { useSingleShot } from '@/hooks/useSingleShot';
import { InteractionShell } from './InteractionShell';

interface DailyQuestMatchProps {
  onComplete: () => void;
}

interface CardDef {
  key: string;
  icon: string;
  label: string;
  gain: string;
}

const PAIRS: CardDef[] = [
  { key: 'coffee', icon: '☕', label: 'COFFEE', gain: '+1' },
  { key: 'talk', icon: '💬', label: 'CONVERSATION', gain: '+1' },
  { key: 'time', icon: '🕰️', label: 'TIME TOGETHER', gain: '+1' },
  { key: 'tease', icon: '😜', label: 'TEASING', gain: '+1' },
  { key: 'jealous', icon: '💢', label: 'JEALOUSY', gain: '+5' },
];

const DENIAL: CardDef = { key: 'denial', icon: '🙈', label: 'DENIAL', gain: '−2' };

interface Card extends CardDef {
  uid: string;
}

const buildDeck = (): Card[] => {
  const deck: Card[] = [
    ...PAIRS.flatMap((p) => [
      { ...p, uid: `${p.key}-a` },
      { ...p, uid: `${p.key}-b` },
    ]),
    { ...DENIAL, uid: 'denial-a' },
    { ...DENIAL, uid: 'denial-b' },
  ];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

export const DailyQuestMatch: React.FC<DailyQuestMatchProps> = ({ onComplete }) => {
  const finish = useSingleShot(onComplete);
  const [deck] = useState<Card[]>(buildDeck);
  const [open, setOpen] = useState<string[]>([]); // uids currently face-up (unmatched)
  const [matched, setMatched] = useState<string[]>([]); // card keys fully matched
  const [message, setMessage] = useState<string>('Balik dua kartu yang sama. Awas, ada kartu DENIAL yang cuma bikin mundur.');
  const [locked, setLocked] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  const later = (fn: () => void, ms: number) => {
    timersRef.current.push(setTimeout(fn, ms));
  };

  const done = matched.length === PAIRS.length;

  const handleFlip = (card: Card) => {
    if (locked || done) return;
    if (matched.includes(card.key) || open.includes(card.uid)) return;
    sound.playClick();

    if (card.key === 'denial') {
      setOpen((prev) => [...prev, card.uid]);
      setLocked(true);
      setMessage('DENIAL −2... tenang, kartu ini nggak dihitung. Dibalik lagi aja.');
      sound.playErrorBuzz();
      later(() => {
        setOpen((prev) => prev.filter((id) => id !== card.uid));
        setLocked(false);
      }, 900);
      return;
    }

    const next = [...open, card.uid];
    setOpen(next);
    if (next.length < 2) return;

    const [first, second] = next.map((id) => deck.find((c) => c.uid === id)!);
    setLocked(true);
    if (first.key === second.key) {
      later(() => {
        setMatched((prev) => [...prev, first.key]);
        setOpen([]);
        setLocked(false);
        setMessage(`${first.label} ${first.gain}. Satu momen kecil tersimpan.`);
        sound.playAffectionChime();
      }, 450);
    } else {
      setMessage('Belum cocok. Ingat posisinya.');
      later(() => {
        setOpen([]);
        setLocked(false);
      }, 800);
    }
  };

  return (
    <InteractionShell
      title="🃏 DAILY QUEST MATCH"
      hint="26 Juli – 8 Agustus: kejadian-kejadian kecil yang pelan-pelan menumpuk. Cocokkan semuanya."
      accent="green"
      maxWidth={600}
      onSkip={finish}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '10px',
          marginBottom: '14px',
        }}
      >
        {deck.map((card) => {
          const isMatched = matched.includes(card.key);
          const isOpen = isMatched || open.includes(card.uid);
          return (
            <button
              key={card.uid}
              onClick={() => handleFlip(card)}
              className="pixel-btn"
              disabled={isMatched}
              style={{
                aspectRatio: '1 / 1.05',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                padding: '6px 2px',
                borderColor: isMatched ? '#73daca' : card.key === 'denial' && isOpen ? '#f7768e' : '#3b4261',
                background: isOpen ? 'rgba(115, 218, 202, 0.12)' : '#161928',
                opacity: isMatched ? 0.7 : 1,
              }}
            >
              {isOpen ? (
                <>
                  <span style={{ fontSize: '1.5rem' }}>{card.icon}</span>
                  <span style={{ fontSize: '0.42rem', color: '#e2e8f0', textAlign: 'center', lineHeight: 1.3 }}>
                    {card.label}
                  </span>
                </>
              ) : (
                <span style={{ fontSize: '1.4rem', color: '#3b4261' }}>?</span>
              )}
            </button>
          );
        })}
      </div>

      <div
        style={{
          minHeight: '44px',
          fontFamily: 'var(--font-body)',
          fontSize: '0.88rem',
          color: '#bb9af7',
          fontStyle: 'italic',
          marginBottom: '14px',
        }}
      >
        {message}
      </div>

      <div
        style={{
          fontFamily: 'var(--font-pixel)',
          fontSize: '0.58rem',
          color: '#73daca',
          marginBottom: done ? '14px' : 0,
        }}
      >
        MOMEN TERKUMPUL: {matched.length} / {PAIRS.length}
      </div>

      {done && (
        <button
          onClick={() => {
            sound.playAffectionChime();
            finish();
          }}
          className="pixel-btn pixel-btn-primary"
          style={{ width: '100%', padding: '12px', fontSize: '0.75rem', animation: 'fadeIn 0.4s ease' }}
        >
          BENIH ITU SUDAH TERTANAM ▶
        </button>
      )}
    </InteractionShell>
  );
};
