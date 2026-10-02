'use client';

import React, { useState } from 'react';
import { sound } from '@/utils/audio';
import { useSingleShot } from '@/hooks/useSingleShot';
import { InteractionShell } from './InteractionShell';

interface EffortBarProps {
  onComplete: () => void;
}

const DAYS_NEEDED = 8;
const GAIN_RATIO = 0.22; // each effort closes 22% of the remaining gap, so it never reaches 100

const GUARANTEE_REPLIES = [
  'Tombol ini tidak bisa diklik sungguhan. Tidak ada yang bisa menjamin 100%.',
  'Masih tidak bisa. Yang bisa cuma: besok diusahakan lagi.',
  'Janji manis gampang diucapkan. Usaha harus dijalani.',
];

export const EffortBar: React.FC<EffortBarProps> = ({ onComplete }) => {
  const finish = useSingleShot(onComplete);
  const [days, setDays] = useState(0);
  const [effort, setEffort] = useState(0);
  const [tries, setTries] = useState(0);
  const [message, setMessage] = useState('Tekan USAHAKAN. Satu tekanan sama dengan satu hari.');

  const done = days >= DAYS_NEEDED;

  const tryHard = () => {
    if (done) return;
    sound.playBlip(300 + days * 40);
    const next = effort + (100 - effort) * GAIN_RATIO;
    setEffort(next);
    setDays((d) => d + 1);
    setMessage(`Hari ke-${days + 1}: usaha bertambah. Barnya makin penuh, tapi tidak pernah penuh.`);
  };

  const askGuarantee = () => {
    sound.playErrorBuzz();
    setMessage(GUARANTEE_REPLIES[Math.min(tries, GUARANTEE_REPLIES.length - 1)]);
    setTries((t) => t + 1);
  };

  return (
    <InteractionShell
      title="📈 USAHA, BUKAN JAMINAN"
      hint={done ? undefined : 'Tidak ada yang bisa menjamin akhirnya. Yang bisa dilakukan setiap hari adalah mengusahakan.'}
      accent="green"
      maxWidth={520}
      onSkip={finish}
    >
      <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.55rem', color: '#73daca', marginBottom: '6px' }}>
        USAHA {effort.toFixed(1)}%
      </div>
      <div style={{ height: '16px', border: '2px solid #3b4261', background: '#161928', marginBottom: '16px' }}>
        <div
          style={{
            height: '100%',
            width: `${effort}%`,
            background: 'linear-gradient(90deg, #7aa2f7, #73daca)',
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.55rem', color: '#565f89', marginBottom: '6px' }}>
        JAMINAN 100%
      </div>
      <div
        style={{
          height: '16px',
          border: '2px dashed #3b4261',
          background: 'repeating-linear-gradient(45deg, #161928, #161928 6px, #1c2033 6px, #1c2033 12px)',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-pixel)',
          fontSize: '0.45rem',
          color: '#565f89',
        }}
      >
        TIDAK TERSEDIA
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-pixel)', fontSize: '0.55rem', color: '#e0af68', marginBottom: '12px' }}>
        <span>
          HARI: {days} / {DAYS_NEEDED}
        </span>
      </div>

      <div style={{ minHeight: '40px', fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: '#bb9af7', fontStyle: 'italic', marginBottom: '14px', lineHeight: 1.5 }}>
        {done ? 'Barnya tidak pernah menyentuh 100%. Tapi delapan hari berturut-turut sudah bukan angka kecil.' : message}
      </div>

      {done ? (
        <button
          onClick={() => {
            sound.playAffectionChime();
            finish();
          }}
          className="pixel-btn pixel-btn-primary"
          style={{ width: '100%', padding: '12px', fontSize: '0.75rem' }}
        >
          TERUSKAN, BESOK DIUSAHAKAN LAGI ▶
        </button>
      ) : (
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={tryHard}
            className="pixel-btn pixel-btn-primary"
            style={{ flex: 2, padding: '14px', fontSize: '0.75rem', touchAction: 'manipulation' }}
          >
            USAHAKAN ▲
          </button>
          <button
            onClick={askGuarantee}
            className="pixel-btn"
            style={{ flex: 1, padding: '14px', fontSize: '0.6rem', color: '#565f89', touchAction: 'manipulation' }}
          >
            JAMIN?
          </button>
        </div>
      )}
    </InteractionShell>
  );
};
