'use client';

import React, { useState } from 'react';
import { sound } from '@/utils/audio';

interface QuizScreenProps {
  onComplete: () => void;
}

interface QuizOption {
  id: string;
  label: string;
  text: string;
  wrongMessage: string;
}

const QUIZ_OPTIONS: QuizOption[] = [
  {
    id: 'a',
    label: 'A',
    text: 'LITTLE CAVE (MOMEN PENGAKUAN)',
    wrongMessage: 'SALAH! Pengakuan di Little Cave baru permulaan, saat itu affection masih 0%. Bukan ini penyebab utamanya.',
  },
  {
    id: 'b',
    label: 'B',
    text: 'MALANG (OFFICIAL PACARAN)',
    wrongMessage: 'SALAH! Perjalanan ke Malang adalah puncak peresmiannya, tapi benih anomali sudah tumbuh jauh sebelum 16 Agustus.',
  },
  {
    id: 'c',
    label: 'C',
    text: 'COFFEE (TITIP KOPI DI KANTOR)',
    wrongMessage: 'SALAH! Titip kopi cuma perantara awal yang manis, tapi segelas kopi saja tidak cukup mengubah kepribadian seseorang.',
  },
  {
    id: 'd',
    label: 'D',
    text: 'CEGIL (KEHADIRAN PACAR)',
    wrongMessage: 'HAMPIR! Tapi bukan sekadar keberadaannya semata. Ada sesuatu yang jauh lebih luas dan mendalam...',
  },
  {
    id: 'e',
    label: 'E',
    text: 'RASA CEMBURU YANG DISAMBUT HANGAT',
    wrongMessage: 'HAMPIR! Cemburu saat itu memang jadi salah satu katalis besar ketika disambut hangat, tapi anomali kepribadian ini lahir dari akumulasi banyak hal kecil...',
  },
];

export const QuizScreen: React.FC<QuizScreenProps> = ({ onComplete }) => {
  const [triedOptions, setTriedOptions] = useState<Record<string, boolean>>({});
  const [currentWrongMessage, setCurrentWrongMessage] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  const allTried = QUIZ_OPTIONS.every((opt) => triedOptions[opt.id]);

  const handleSelectOption = (opt: QuizOption) => {
    sound.playErrorBuzz();
    setCurrentWrongMessage(opt.wrongMessage);
    const newTried = { ...triedOptions, [opt.id]: true };
    setTriedOptions(newTried);

    if (QUIZ_OPTIONS.every((o) => newTried[o.id])) {
      setTimeout(() => {
        setIsRevealed(true);
        sound.playAffectionChime();
      }, 1200);
    }
  };

  return (
    <div style={{
      position: 'absolute',
      inset: '80px 24px 24px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 45,
    }}>
      <div className="pixel-box pixel-box-glow-cyan" style={{
        width: '100%',
        maxWidth: '780px',
        padding: '28px',
        background: 'rgba(11, 14, 24, 0.96)',
        border: '3px solid #7aa2f7',
      }}>
        {!isRevealed ? (
          <>
            <div style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.75rem',
              color: '#f7768e',
              marginBottom: '10px',
              letterSpacing: '1px',
            }}>
              [ FINAL CHAPTER: THE ANOMALY ]
            </div>

            <h2 style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.95rem',
              color: '#e2e8f0',
              lineHeight: 1.6,
              marginBottom: '20px',
            }}>
              SEBENARNYA APA YANG MENYEBABKAN ANOMALI KEPRIBADIAN INI?
            </h2>

            {/* Current Wrong Message Alert */}
            {currentWrongMessage && (
              <div style={{
                background: 'rgba(247, 118, 142, 0.15)',
                border: '2px solid #f7768e',
                padding: '12px 16px',
                marginBottom: '18px',
                color: '#ff9e64',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-pixel)',
                lineHeight: 1.4,
              }}>
                {currentWrongMessage}
              </div>
            )}

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {QUIZ_OPTIONS.map((opt) => {
                const wasTried = triedOptions[opt.id];
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt)}
                    className="pixel-btn"
                    style={{
                      padding: '14px 18px',
                      justifyContent: 'flex-start',
                      fontSize: '0.75rem',
                      borderColor: wasTried ? '#f7768e' : '#3b4261',
                      color: wasTried ? '#f7768e' : '#c0caf5',
                      opacity: wasTried ? 0.75 : 1,
                    }}
                  >
                    <span style={{ color: wasTried ? '#f7768e' : '#4deeea', marginRight: '10px' }}>
                      [{opt.label}]
                    </span>
                    {opt.text}
                    {wasTried && <span style={{ marginLeft: 'auto', fontSize: '0.65rem' }}>✕ SALAH</span>}
                  </button>
                );
              })}
            </div>

            <div style={{
              fontSize: '0.65rem',
              color: '#565f89',
              fontFamily: 'var(--font-pixel)',
              textAlign: 'center',
            }}>
              PETUNJUK: COBA SEMUA KEMUNGKINAN UNTUK MEMECAHKAN KODE SYSTEM
            </div>
          </>
        ) : (
          /* Reveal Section */
          <div style={{ textAlign: 'left', animation: 'fadeIn 0.5s ease' }}>
            <div style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.8rem',
              color: '#73daca',
              marginBottom: '16px',
              borderBottom: '2px dashed #73daca',
              paddingBottom: '8px',
            }}>
              [ ANOMALY CAUSE: REVEALED ]
            </div>

            <div style={{
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: '#e2e8f0',
              marginBottom: '24px',
            }}>
              <p style={{ marginBottom: '12px' }}>
                <strong>Bukan satu momen.</strong> Bukan satu percakapan. Bukan satu perjalanan. Bahkan bukan satu pengakuan.
              </p>
              <p style={{ marginBottom: '12px', color: '#bb9af7' }}>
                Mungkin semuanya terjadi dari akumulasi hal-hal kecil yang bahkan waktu itu tidak terasa penting.
              </p>
              <p style={{ marginBottom: '12px', color: '#9aa5ce' }}>
                Dari delapan bulan menjadi rekan kerja yang hampir tidak pernah bicara... Dari “Mas Ali” yang kaku menjadi “Masli” yang ditunggu setiap jam istirahat... Dari titip kopi, rasa penasaran, rasa cemburu, hingga keberanian untuk jujur di Little Cave.
              </p>
              <p style={{ color: '#f7768e', fontWeight: 600 }}>
                Dari 0%... Menjadi 50%... Lalu 60%... Sampai akhirnya 100% utuh di Malang.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => {
                  sound.playAffectionChime();
                  onComplete();
                }}
                className="pixel-btn pixel-btn-primary"
                style={{ fontSize: '0.8rem', padding: '14px 28px' }}
              >
                LANJUT KE EPILOGUE: SAYANG ▶
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
