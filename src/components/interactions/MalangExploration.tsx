'use client';

import React, { useState } from 'react';
import { sound } from '@/utils/audio';

interface MalangExplorationProps {
  onComplete: () => void;
}

const SPOTS = [
  {
    id: 'spot-city',
    icon: '🌃',
    name: 'Kelap-kelip Kota di Bawah',
    desc: 'Lampu-lampu kota Malang yang terbentang di bawah bukit terlihat seperti taburan berlian. Rasanya dunia di luar bukit ini berhenti berputar sebentar.',
  },
  {
    id: 'spot-wind',
    icon: '💨',
    name: 'Angin Dingin Pegunungan',
    desc: 'Udara Malang malam itu dingin menusuk tulang. Tapi anehnya, berada di samping Ali membuat dinginnya sama sekali tidak terasa mengganggu.',
  },
  {
    id: 'spot-together',
    icon: '✨',
    name: 'Hening yang Paling Nyaman',
    desc: 'Kami berdua duduk bersebelahan, tidak banyak bicara. Kadang hubungan yang tepat bukan diukur dari seberapa banyak obrolan, tapi seberapa nyaman heningnya.',
  },
];

export const MalangExploration: React.FC<MalangExplorationProps> = ({ onComplete }) => {
  const [visited, setVisited] = useState<string[]>([]);
  const [activeSpot, setActiveSpot] = useState<typeof SPOTS[0] | null>(null);

  const handleInspect = (spot: typeof SPOTS[0]) => {
    sound.playClick();
    if (!visited.includes(spot.id)) {
      setVisited([...visited, spot.id]);
    }
    setActiveSpot(spot);
  };

  const isAllVisited = visited.length >= SPOTS.length;

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
          maxWidth: '620px',
          padding: '24px',
          background: 'rgba(16, 20, 36, 0.96)',
          border: '3px solid #7aa2f7',
          boxShadow: '0 0 24px rgba(122, 162, 247, 0.4)',
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
            color: '#7aa2f7',
          }}>
            🌃 MALANG VIEWPOINT: 16 AGUSTUS 2026
          </span>
          <span style={{ fontSize: '0.55rem', color: '#f7768e', fontFamily: 'var(--font-pixel)' }}>
            EKSPLORASI ({visited.length}/3)
          </span>
        </div>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          color: '#cbd5e1',
          marginBottom: '16px',
          lineHeight: 1.5,
        }}>
          Sebelum momen penting itu tiba, mari nikmati suasana malam di ketinggian bukit Malang:
        </p>

        {/* 3 Spot Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '18px' }}>
          {SPOTS.map((s) => {
            const isDone = visited.includes(s.id);
            return (
              <button
                key={s.id}
                onClick={() => handleInspect(s)}
                className="pixel-btn"
                style={{
                  padding: '14px 8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  borderColor: isDone ? '#4deeea' : '#3b4261',
                  background: isDone ? 'rgba(77, 238, 234, 0.15)' : '#161928',
                }}
              >
                <span style={{ fontSize: '1.4rem' }}>{s.icon}</span>
                <span style={{ fontSize: '0.58rem', color: isDone ? '#ffffff' : '#94a3b8', textAlign: 'center' }}>
                  {s.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Spot Detail */}
        {activeSpot && (
          <div style={{
            padding: '14px 18px',
            background: 'rgba(122, 162, 247, 0.12)',
            borderLeft: '3px solid #7aa2f7',
            fontFamily: 'var(--font-body)',
            fontStyle: 'italic',
            fontSize: '0.92rem',
            color: '#e2e8f0',
            lineHeight: 1.6,
            marginBottom: '18px',
            animation: 'fadeIn 0.2s ease',
          }}>
            {activeSpot.desc}
          </div>
        )}

        {isAllVisited ? (
          <button
            onClick={() => {
              sound.playClick();
              sound.playAffectionChime();
              onComplete();
            }}
            className="pixel-btn pixel-btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '0.75rem' }}
          >
            MENATAP ALI... (SAATNYA KATA-KATA ITU) ▶
          </button>
        ) : (
          <div style={{
            textAlign: 'center',
            fontSize: '0.62rem',
            fontFamily: 'var(--font-pixel)',
            color: '#565f89',
          }}>
            (Buka semua 3 pemandangan untuk melanjutkan)
          </div>
        )}
      </div>
    </div>
  );
};
