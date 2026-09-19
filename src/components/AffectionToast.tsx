'use client';

import React, { useEffect, useState } from 'react';

interface AffectionToastProps {
  prevAffection: number;
  currentAffection: number;
  message?: string;
  onClose?: () => void;
}

export const AffectionToast: React.FC<AffectionToastProps> = ({
  prevAffection,
  currentAffection,
  message,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);
  const delta = currentAffection - prevAffection;

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible || delta <= 0) return null;

  const isMax = currentAffection >= 100;

  return (
    <div
      style={{
        position: 'fixed',
        top: '84px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 55,
        animation: 'slideDownToast 0.4s cubic-bezier(0.16, 1, 0.3, 1), pulseGlow 1.5s infinite alternate',
        pointerEvents: 'none',
      }}
    >
      <div
        className="pixel-box"
        style={{
          padding: '12px 24px',
          background: isMax ? 'rgba(247, 118, 142, 0.96)' : 'rgba(26, 27, 38, 0.96)',
          border: isMax ? '3px solid #ffffff' : '3px solid #f7768e',
          boxShadow: isMax
            ? '0 0 24px rgba(247, 118, 142, 0.9), 0 8px 32px rgba(0,0,0,0.8)'
            : '0 0 16px rgba(247, 118, 142, 0.5), 0 8px 32px rgba(0,0,0,0.8)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'var(--font-pixel)',
          fontSize: '0.78rem',
          color: isMax ? '#1a1b26' : '#f7768e',
          textShadow: isMax ? 'none' : '0 0 8px rgba(247, 118, 142, 0.8)',
          fontWeight: 700,
        }}>
          <span>❤️</span>
          <span>AFFECTION NAIK!</span>
          <span style={{
            background: isMax ? '#1a1b26' : '#f7768e',
            color: isMax ? '#ffffff' : '#1a1b26',
            padding: '2px 6px',
            borderRadius: '2px',
            fontSize: '0.7rem',
          }}>
            +{delta}%
          </span>
        </div>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
          color: isMax ? '#1a1b26' : '#e2e8f0',
          fontWeight: 600,
        }}>
          {message || `STATUS: ${prevAffection}% → ${currentAffection}%`}
        </div>

        {/* Mini Segmented Bar */}
        <div style={{
          display: 'flex',
          gap: '3px',
          marginTop: '4px',
          width: '180px',
        }}>
          {Array.from({ length: 10 }).map((_, i) => {
            const threshold = (i + 1) * 10;
            const isFilled = currentAffection >= threshold;
            const wasFilled = prevAffection >= threshold;
            const isNew = isFilled && !wasFilled;

            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: '8px',
                  backgroundColor: isFilled
                    ? isMax
                      ? '#ffffff'
                      : '#f7768e'
                    : 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: isNew ? '0 0 8px #ffffff' : 'none',
                  animation: isNew ? 'popSegment 0.5s ease-out' : 'none',
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
