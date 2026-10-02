'use client';

import React from 'react';
import { sound } from '@/utils/audio';

type Accent = 'amber' | 'pink' | 'cyan' | 'green' | 'purple';

const ACCENTS: Record<Accent, { border: string; glow: string }> = {
  amber: { border: '#e0af68', glow: 'rgba(224, 175, 104, 0.3)' },
  pink: { border: '#f7768e', glow: 'rgba(247, 118, 142, 0.3)' },
  cyan: { border: '#7aa2f7', glow: 'rgba(122, 162, 247, 0.35)' },
  green: { border: '#73daca', glow: 'rgba(115, 218, 202, 0.3)' },
  purple: { border: '#bb9af7', glow: 'rgba(187, 154, 247, 0.35)' },
};

interface InteractionShellProps {
  title: string;
  hint?: string;
  accent?: Accent;
  maxWidth?: number;
  onSkip: () => void;
  children: React.ReactNode;
}

/**
 * Shared full-screen overlay for mini-games: dimmed backdrop, pixel-box card,
 * title bar and an always-available "Lewati" button so nobody gets stuck.
 */
export const InteractionShell: React.FC<InteractionShellProps> = ({
  title,
  hint,
  accent = 'amber',
  maxWidth = 620,
  onSkip,
  children,
}) => {
  const colors = ACCENTS[accent];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 45,
        backgroundColor: 'rgba(7, 9, 18, 0.88)',
        backdropFilter: 'blur(6px)',
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
          maxWidth: `${maxWidth}px`,
          padding: '24px',
          background: 'rgba(20, 24, 38, 0.96)',
          border: `3px solid ${colors.border}`,
          boxShadow: `0 0 24px ${colors.glow}`,
          touchAction: 'manipulation',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            borderBottom: '2px dashed #3b4261',
            paddingBottom: '12px',
            marginBottom: '16px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.72rem',
              color: colors.border,
            }}
          >
            {title}
          </span>
          <button
            onClick={() => {
              sound.playClick();
              onSkip();
            }}
            className="pixel-btn"
            style={{ fontSize: '0.52rem', padding: '4px 8px', color: '#565f89', flexShrink: 0 }}
            title="Lewati mini-game ini"
          >
            LEWATI ▶▶
          </button>
        </div>

        {hint && (
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.88rem',
              color: '#cbd5e1',
              marginBottom: '16px',
              lineHeight: 1.5,
            }}
          >
            {hint}
          </p>
        )}

        {children}
      </div>
    </div>
  );
};
