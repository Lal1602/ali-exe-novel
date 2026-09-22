'use client';

import React, { useEffect, useState } from 'react';

export const TRACK_INFO: Record<string, { title: string; subtitle: string; icon: string }> = {
  ambient: { title: 'Midnight Code', subtitle: 'Lofi Ambient • Surabaya Night', icon: '🌃' },
  office: { title: 'Gen Epistree Workday', subtitle: 'Lofi Cozy • Office Hours', icon: '🏢' },
  cozy: { title: 'Little Cave Coffee', subtitle: 'Lofi Cozy • Warm Espresso', icon: '☕' },
  home: { title: '50% di Tropodo', subtitle: 'Lofi Romance • Sidoarjo Dusk', icon: '🏠' },
  romantic: { title: 'Malam Berbintang Malang', subtitle: 'Lofi Romance • Hilltop View', icon: '✨' },
  investigation: { title: 'Anomali Arsip 2026', subtitle: 'Lofi Ambient • Deep Memory', icon: '🔍' },
  celebration: { title: 'Sayang & Selamanya', subtitle: 'Lofi Romance • Birthday Special', icon: '🎂' },
  quiet: { title: 'Bisikan Hati', subtitle: 'Lofi Ambient • Inner Monologue', icon: '💭' },
};

interface NowPlayingToastProps {
  mood: string;
  onClose?: () => void;
}

export const NowPlayingToast: React.FC<NowPlayingToastProps> = ({ mood, onClose }) => {
  const [visible, setVisible] = useState(true);
  const [animatingOut, setAnimatingOut] = useState(false);

  const track = TRACK_INFO[mood] || TRACK_INFO.ambient;

  useEffect(() => {
    setVisible(true);
    setAnimatingOut(false);

    const timer = setTimeout(() => {
      setAnimatingOut(true);
      const closeTimer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, 400);
      return () => clearTimeout(closeTimer);
    }, 3600);

    return () => clearTimeout(timer);
  }, [mood, onClose]);

  if (!visible) return null;

  return (
    <div
      onClick={() => {
        setAnimatingOut(true);
        setTimeout(() => {
          setVisible(false);
          if (onClose) onClose();
        }, 300);
      }}
      style={{
        position: 'absolute',
        top: '78px',
        left: '20px',
        zIndex: 48,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'rgba(13, 16, 28, 0.95)',
        backdropFilter: 'blur(10px)',
        border: '2px solid #7aa2f7',
        boxShadow: '0 0 18px rgba(122, 162, 247, 0.4), 0 8px 24px rgba(0, 0, 0, 0.7)',
        padding: '8px 14px',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: animatingOut ? 0 : 1,
        transform: animatingOut ? 'translateX(-20px) scale(0.96)' : 'translateX(0) scale(1)',
        animation: 'slideInLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        maxWidth: '340px',
        pointerEvents: 'auto',
      }}
      title="Klik untuk menutup notifikasi lagu"
    >
      {/* Vinyl Disc / Cassette Animated Icon */}
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #2ac3de 25%, #1a1b26 35%, #070913 70%)',
          border: '2px solid #4deeea',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 10px rgba(77, 238, 234, 0.6)',
          animation: 'spinVinyl 3s linear infinite',
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: '0.75rem' }}>{track.icon}</span>
      </div>

      {/* Track Details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' }}>
        <div
          style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.52rem',
            color: '#4deeea',
            letterSpacing: '1px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span style={{ animation: 'pulse 1s infinite' }}>●</span>
          <span>NOW PLAYING</span>
        </div>

        <div
          style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.68rem',
            color: '#ffffff',
            letterSpacing: '0.5px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textShadow: '0 0 6px rgba(255, 255, 255, 0.5)',
          }}
        >
          {track.title}
        </div>

        <div
          style={{
            fontSize: '0.60rem',
            color: '#9aa5ce',
            fontFamily: 'var(--font-pixel)',
            letterSpacing: '0.2px',
          }}
        >
          {track.subtitle}
        </div>
      </div>
    </div>
  );
};
