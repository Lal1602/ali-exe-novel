'use client';

import React, { useEffect } from 'react';
import { sound } from '@/utils/audio';
import { MiniGameGuideData, GuideAccent } from '@/data/minigameGuides';

const ACCENTS: Record<GuideAccent, { border: string; glow: string }> = {
  amber: { border: '#e0af68', glow: 'rgba(224, 175, 104, 0.35)' },
  pink: { border: '#f7768e', glow: 'rgba(247, 118, 142, 0.35)' },
  cyan: { border: '#7aa2f7', glow: 'rgba(122, 162, 247, 0.4)' },
  green: { border: '#73daca', glow: 'rgba(115, 218, 202, 0.35)' },
  purple: { border: '#bb9af7', glow: 'rgba(187, 154, 247, 0.4)' },
};

// Ignore keyboard for a moment so a Space/Enter held down to finish the previous
// dialogue line doesn't dismiss the guide before it is read.
const KEY_GRACE_MS = 700;

interface MiniGameGuideProps {
  guide: MiniGameGuideData;
  onStart: () => void;
}

export const MiniGameGuide: React.FC<MiniGameGuideProps> = ({ guide, onStart }) => {
  const colors = ACCENTS[guide.accent];

  useEffect(() => {
    const mountedAt = Date.now();
    const handleKey = (e: KeyboardEvent) => {
      if (e.code !== 'Enter' && e.code !== 'Space') return;
      e.preventDefault();
      if (e.repeat || Date.now() - mountedAt < KEY_GRACE_MS) return;
      sound.playClick();
      onStart();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onStart]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Petunjuk bermain: ${guide.title}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        backgroundColor: 'rgba(5, 6, 14, 0.92)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto',
      }}
    >
      <div
        className="pixel-box"
        style={{
          width: '100%',
          maxWidth: '520px',
          padding: '24px',
          background: 'rgba(18, 21, 34, 0.98)',
          border: `3px solid ${colors.border}`,
          boxShadow: `0 0 28px ${colors.glow}`,
          animation: 'fadeIn 0.25s ease',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.55rem',
            color: '#565f89',
            letterSpacing: '1px',
            marginBottom: '8px',
          }}
        >
          [ PETUNJUK BERMAIN ]
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            borderBottom: '2px dashed #3b4261',
            paddingBottom: '12px',
            marginBottom: '16px',
          }}
        >
          <span style={{ fontSize: '2rem' }}>{guide.icon}</span>
          <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.85rem', color: colors.border, lineHeight: 1.4 }}>
            {guide.title}
          </span>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.55rem', color: '#4deeea', marginBottom: '6px' }}>
            TUJUAN
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.98rem', color: '#e2e8f0', lineHeight: 1.5 }}>
            {guide.goal}
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.55rem', color: '#4deeea', marginBottom: '6px' }}>
            CARA MAIN
          </div>
          <ol style={{ margin: 0, paddingLeft: '20px', fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: '#c0caf5', lineHeight: 1.6 }}>
            {guide.steps.map((step, i) => (
              <li key={i} style={{ marginBottom: '4px' }}>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'baseline',
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.55rem',
            color: '#9aa5ce',
            marginBottom: guide.tip ? '12px' : '20px',
          }}
        >
          <span style={{ color: '#4deeea' }}>KONTROL:</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem' }}>{guide.controls}</span>
        </div>

        {guide.tip && (
          <div
            style={{
              padding: '10px 14px',
              background: 'rgba(187, 154, 247, 0.1)',
              borderLeft: '3px solid #bb9af7',
              fontFamily: 'var(--font-body)',
              fontSize: '0.86rem',
              fontStyle: 'italic',
              color: '#c0caf5',
              lineHeight: 1.5,
              marginBottom: '20px',
            }}
          >
            💡 {guide.tip}
          </div>
        )}

        <button
          autoFocus
          onClick={() => {
            sound.playClick();
            onStart();
          }}
          className="pixel-btn pixel-btn-primary"
          style={{ width: '100%', padding: '14px', fontSize: '0.8rem' }}
        >
          MULAI ▶
        </button>
        <div
          style={{
            textAlign: 'center',
            marginTop: '8px',
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.48rem',
            color: '#565f89',
          }}
        >
          atau tekan [ENTER] / [SPACE]
        </div>
      </div>
    </div>
  );
};
