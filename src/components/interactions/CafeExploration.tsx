'use client';

import React, { useState } from 'react';
import { sound } from '@/utils/audio';

interface CafeExplorationProps {
  onComplete: () => void;
}

const OBJECTS = [
  {
    id: 'cangkir',
    icon: '🧋',
    name: 'Es Kopi Susu',
    thought: 'Dua gelas es kopi susu dengan bulir embun dingin di atas meja kayu. Tanganku memegang gelas dingin hanya agar dia tidak melihat jemariku yang sedikit gemetar.',
  },
  {
    id: 'lampu',
    icon: '💡',
    name: 'Lampu Gantung Edison',
    thought: 'Cahaya lampu temaramnya jatuh pas di wajah Ali. Suasana yang terlalu tenang untuk topik percakapan yang akan membuat jantungku melompat keluar.',
  },
  {
    id: 'kursi',
    icon: '🪑',
    name: 'Kursi Kayu Berhadapan',
    thought: 'Selama 8 bulan kerja bareng, kami belum pernah duduk berhadapan sedekat ini tanpa ada sekat laptop kantor.',
  },
];

export const CafeExploration: React.FC<CafeExplorationProps> = ({ onComplete }) => {
  const [visited, setVisited] = useState<string[]>([]);
  const [activeThought, setActiveThought] = useState<string | null>(null);

  const handleInspect = (obj: typeof OBJECTS[0]) => {
    sound.playClick();
    if (!visited.includes(obj.id)) {
      setVisited([...visited, obj.id]);
    }
    setActiveThought(obj.thought);
  };

  const canProceed = visited.length >= 2;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 45,
      backgroundColor: 'rgba(7, 9, 18, 0.82)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div
        className="pixel-box"
        style={{
          width: '100%',
          maxWidth: '620px',
          padding: '24px',
          background: 'rgba(20, 24, 38, 0.96)',
          border: '3px solid #e0af68',
          boxShadow: '0 0 24px rgba(224, 175, 104, 0.3)',
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px dashed #3b4261',
          paddingBottom: '12px',
          marginBottom: '16px',
        }}>
          <span style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.72rem',
            color: '#e0af68',
          }}>
            🔍 LITTLE CAVE: SEBELUM KATA-KATA ITU TERUCAP
          </span>
          <span style={{ fontSize: '0.55rem', color: '#73daca', fontFamily: 'var(--font-pixel)' }}>
            EKSPLORASI ({visited.length}/3)
          </span>
        </div>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.88rem',
          color: '#cbd5e1',
          marginBottom: '16px',
          lineHeight: 1.5,
        }}>
          Sore itu sebelum kalimat pengakuan meluncur, ada hening yang canggung. Klik objek-objek di meja untuk membaca apa yang berputar di kepala Cegil:
        </p>

        {/* 3 Clickable Objects */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '18px' }}>
          {OBJECTS.map((obj) => {
            const isDone = visited.includes(obj.id);
            return (
              <button
                key={obj.id}
                onClick={() => handleInspect(obj)}
                className="pixel-btn"
                style={{
                  padding: '14px 8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  borderColor: isDone ? '#e0af68' : '#3b4261',
                  background: isDone ? 'rgba(224, 175, 104, 0.15)' : '#161928',
                }}
              >
                <span style={{ fontSize: '1.4rem' }}>{obj.icon}</span>
                <span style={{ fontSize: '0.58rem', color: isDone ? '#ffffff' : '#94a3b8', textAlign: 'center' }}>
                  {obj.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Thought Display */}
        {activeThought && (
          <div style={{
            padding: '14px 18px',
            background: 'rgba(187, 154, 247, 0.12)',
            borderLeft: '3px solid #bb9af7',
            fontFamily: 'var(--font-body)',
            fontStyle: 'italic',
            fontSize: '0.95rem',
            color: '#e0def4',
            lineHeight: 1.6,
            marginBottom: '18px',
            animation: 'fadeIn 0.2s ease',
          }}>
            “{activeThought}”
          </div>
        )}

        {/* Proceed Button */}
        {canProceed ? (
          <button
            onClick={() => {
              sound.playClick();
              onComplete();
            }}
            className="pixel-btn pixel-btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '0.75rem' }}
          >
            TARIK NAPAS, MULAI BICARA... ▶
          </button>
        ) : (
          <div style={{
            textAlign: 'center',
            fontSize: '0.62rem',
            fontFamily: 'var(--font-pixel)',
            color: '#565f89',
          }}>
            (Periksa minimal 2 objek di meja untuk lanjut)
          </div>
        )}
      </div>
    </div>
  );
};
