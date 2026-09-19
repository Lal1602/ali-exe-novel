'use client';

import React, { useState } from 'react';
import { sound } from '@/utils/audio';

interface JealousyMiniGameProps {
  onComplete: () => void;
}

const REACTIONS = [
  {
    id: 'act-pretend',
    title: 'Pura-pura Sibuk Buka Excel Kosong',
    desc: 'Biar keliatan profesional dan ga peduli sama sekali.',
    narration: 'Jari-jariku mengetik cepat di keyboard tanpa arah. Di layar: tabel excel sheet1 yang bahkan belum ada rumusnya sama sekali. Padahal telingaku 100% mendengarkan arah suara mereka.',
  },
  {
    id: 'act-water',
    title: 'Minum Air Putih Sampai Kembung',
    desc: 'Menenangkan detak jantung yang mendadak tidak beraturan.',
    narration: 'Dua botol air mineral habis dalam waktu 20 menit. Tenggorokanku terasa kering bukan karena haus, tapi karena rasa kesal aneh yang tidak punya hak untuk kuutarakan.',
  },
  {
    id: 'act-admit',
    title: 'Menghela Napas & Sadar Diri',
    desc: 'Berhenti menyangkal apa yang sebenarnya terjadi di dalam hati.',
    narration: 'Aku meletakkan pulpen, menatap langit-langit kantor yang putih. “Gila,” bisikku dalam hati. “Aku beneran cemburu. Aku beneran suka sama Masli.”',
  },
];

export const JealousyMiniGame: React.FC<JealousyMiniGameProps> = ({ onComplete }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const activeReaction = REACTIONS.find((r) => r.id === selectedId);

  const handleSelect = (id: string) => {
    sound.playClick();
    setSelectedId(id);
    setShowResult(true);
  };

  const handleFinish = () => {
    sound.playClick();
    onComplete();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 45,
      backgroundColor: 'rgba(7, 9, 18, 0.88)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div
        className="pixel-box pixel-box-glow-pink"
        style={{
          width: '100%',
          maxWidth: '580px',
          padding: '24px',
          background: 'rgba(24, 18, 36, 0.96)',
          border: '3px solid #f7768e',
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px dashed #f7768e',
          paddingBottom: '12px',
          marginBottom: '16px',
        }}>
          <span style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.72rem',
            color: '#f7768e',
          }}>
            ⚡ INTERNAL OVERLOAD: RESPON CEGIL
          </span>
          <span style={{ fontSize: '0.55rem', color: '#ff9e64', fontFamily: 'var(--font-pixel)' }}>
            JEALOUSY: 100%
          </span>
        </div>

        {!showResult ? (
          <>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.92rem',
              color: '#e2e8f0',
              lineHeight: 1.6,
              marginBottom: '20px',
            }}>
              Di meja seberang kantin, Masli sedang tertawa santai saat mengobrol dengan rekan kerja perempuan. Apa respon insting pertama Cegil?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {REACTIONS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => handleSelect(r.id)}
                  className="pixel-btn"
                  style={{
                    padding: '14px',
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '4px',
                    border: '2px solid #3b4261',
                  }}
                >
                  <span style={{ color: '#f7768e', fontSize: '0.72rem' }}>
                    ▶ {r.title}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    color: '#94a3b8',
                    textTransform: 'none',
                  }}>
                    {r.desc}
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{
              padding: '16px',
              background: 'rgba(247, 118, 142, 0.12)',
              border: '1px solid #f7768e',
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
              fontSize: '0.98rem',
              lineHeight: 1.7,
              color: '#f2e9e4',
            }}>
              {activeReaction?.narration}
            </div>

            <button
              onClick={handleFinish}
              className="pixel-btn pixel-btn-primary"
              style={{ padding: '12px', fontSize: '0.75rem' }}
            >
              LANJUTKAN CERITA ▶
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
