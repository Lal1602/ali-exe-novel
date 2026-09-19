'use client';

import React, { useState } from 'react';
import { sound } from '@/utils/audio';

interface CoffeeOrderPuzzleProps {
  onComplete: (choiceText: string) => void;
}

const COFFEE_OPTIONS = [
  {
    id: 'kopi-susu-aren',
    name: 'Es Kopi Susu Gula Aren',
    tag: 'FAVORIT MASLI',
    desc: 'Pilihan khas Masli — Ali paling sering pesan es kopi susu gula aren.',
    reaction: '“‘Gula arennya dikurangin kan, Mas?’ — tanyaku. ‘Udah, tenang aja,’ jawabnya santai sambil nyerahin cup kopi yang masih berembun.”',
  },
  {
    id: 'kopi-tubruk',
    name: 'Kopi Hitam / Americano',
    tag: 'PAHIT & SERIUS',
    desc: 'Pilihan cadangan saat butuh kafein ekstra tanpa rasa manis.',
    reaction: '“Masli senyum tipis waktu kopinya sampai di mejaku: ‘Tumben pesen yang ini.’ Padahal aku cuma mau keliatan keren di depannya.”',
  },
  {
    id: 'caramel-macchiato',
    name: 'Caramel Macchiato',
    tag: 'AGAK MEWAH',
    desc: 'Biar ada alasan ngobrol lebih lama soal rasanya yang manis.',
    reaction: '“‘Banyak gaya pesen caramel,’ ledeknya pelan. Tapi besoknya, dia inget tanpa perlu kutulis di catatan chat.”',
  },
];

export const CoffeeOrderPuzzle: React.FC<CoffeeOrderPuzzleProps> = ({ onComplete }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const activeOption = COFFEE_OPTIONS.find((o) => o.id === selected);

  const handleConfirm = () => {
    if (!activeOption) return;
    sound.playClick();
    sound.playAffectionChime();
    setConfirmed(true);
    setTimeout(() => {
      onComplete(activeOption.reaction);
    }, 1600);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 45,
      backgroundColor: 'rgba(7, 9, 18, 0.85)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div
        className="pixel-box"
        style={{
          width: '100%',
          maxWidth: '560px',
          padding: '24px',
          background: 'rgba(20, 24, 38, 0.96)',
          border: '3px solid #e0af68',
          boxShadow: '0 0 24px rgba(224, 175, 104, 0.35)',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px dashed #3b4261',
          paddingBottom: '12px',
          marginBottom: '16px',
        }}>
          <span style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.75rem',
            color: '#e0af68',
            letterSpacing: '1px',
          }}>
            ☕ PANTRY ORDER: TITIP KOPI MASLI
          </span>
          <span style={{ fontSize: '0.55rem', color: '#565f89', fontFamily: 'var(--font-pixel)' }}>
            INTERACTIVE
          </span>
        </div>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.92rem',
          color: '#cbd5e1',
          lineHeight: 1.5,
          marginBottom: '18px',
        }}>
          Jam istirahat kantor. Kamu berdiri di depan pantry, menatap Mas Ali yang bersiap keluar beli kopi. Apa yang mau kamu titip?
        </p>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          {COFFEE_OPTIONS.map((opt) => {
            const isSelected = selected === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => {
                  if (confirmed) return;
                  sound.playClick();
                  setSelected(opt.id);
                }}
                style={{
                  padding: '12px 16px',
                  background: isSelected ? 'rgba(224, 175, 104, 0.15)' : '#161928',
                  border: isSelected ? '2px solid #e0af68' : '1px solid #2e3440',
                  cursor: confirmed ? 'default' : 'pointer',
                  transition: 'all 0.15s ease',
                  borderRadius: '2px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{
                    fontFamily: 'var(--font-pixel)',
                    fontSize: '0.72rem',
                    color: isSelected ? '#ffffff' : '#c0caf5',
                  }}>
                    {opt.name}
                  </span>
                  <span style={{
                    fontSize: '0.52rem',
                    fontFamily: 'var(--font-pixel)',
                    color: '#e0af68',
                    background: '#1f2335',
                    padding: '2px 6px',
                  }}>
                    {opt.tag}
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.4 }}>
                  {opt.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        {selected && !confirmed && (
          <button
            onClick={handleConfirm}
            className="pixel-btn pixel-btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '0.75rem' }}
          >
            “MASLI, TITIP INI YA!” ▶
          </button>
        )}

        {confirmed && activeOption && (
          <div style={{
            padding: '12px',
            background: 'rgba(115, 218, 202, 0.12)',
            border: '1px solid #73daca',
            color: '#73daca',
            fontFamily: 'var(--font-body)',
            fontStyle: 'italic',
            fontSize: '0.88rem',
            textAlign: 'center',
            animation: 'fadeIn 0.3s ease',
          }}>
            {activeOption.reaction}
          </div>
        )}
      </div>
    </div>
  );
};
