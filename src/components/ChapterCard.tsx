'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { sound } from '@/utils/audio';

interface ChapterCardProps {
  title: string;
  subtitle: string;
  date?: string;
  location?: string;
  affection?: number;
  bgImage?: string;
  onFinish: () => void;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({
  title,
  subtitle,
  date,
  location,
  affection,
  bgImage,
  onFinish,
}) => {
  const [animatingOut, setAnimatingOut] = useState(false);

  useEffect(() => {
    sound.playWhoosh();
    const timer = setTimeout(() => {
      handleComplete();
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  const handleComplete = () => {
    setAnimatingOut(true);
    setTimeout(() => {
      onFinish();
    }, 400);
  };

  return (
    <div
      onClick={handleComplete}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 85,
        backgroundColor: '#070913',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        opacity: animatingOut ? 0 : 1,
        transition: 'opacity 0.4s ease-out',
        animation: 'chapterCardIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden',
      }}
    >
      {/* Background with blur and darkening */}
      {bgImage && (
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          filter: 'blur(8px) brightness(0.35)',
          transform: 'scale(1.1)',
        }}>
          <Image
            src={bgImage}
            alt="Chapter Background"
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}

      {/* Dark Vignette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        background: 'radial-gradient(circle at center, rgba(10, 13, 24, 0.7) 0%, rgba(7, 9, 19, 0.96) 80%)',
      }} />

      {/* CRT scanline */}
      <div className="crt-scanlines" style={{ zIndex: 3 }} />

      {/* Central Content Card */}
      <div
        className="pixel-box"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '90%',
          maxWidth: '680px',
          padding: '36px 32px',
          background: 'rgba(15, 18, 32, 0.95)',
          border: '3px solid #7aa2f7',
          boxShadow: '0 0 30px rgba(122, 162, 247, 0.35), 0 16px 40px rgba(0,0,0,0.8)',
          textAlign: 'center',
        }}
      >
        {/* Chapter Header */}
        <div style={{
          fontFamily: 'var(--font-pixel)',
          fontSize: 'clamp(0.75rem, 1.5vw, 0.95rem)',
          color: '#bb9af7',
          letterSpacing: '2px',
          marginBottom: '8px',
          textShadow: '0 0 10px rgba(187, 154, 247, 0.7)',
        }}>
          ✦ {title} ✦
        </div>

        {/* Chapter Subtitle */}
        <h2 style={{
          fontFamily: 'var(--font-pixel)',
          fontSize: 'clamp(1.1rem, 2.4vw, 1.8rem)',
          color: '#ffffff',
          letterSpacing: '2px',
          lineHeight: 1.3,
          marginBottom: '20px',
          textShadow: '0 0 14px rgba(255, 255, 255, 0.6), 2px 2px 0 #000',
        }}>
          {subtitle}
        </h2>

        <div style={{
          width: '100px',
          height: '2px',
          backgroundColor: '#4deeea',
          margin: '0 auto 24px',
          boxShadow: '0 0 8px #4deeea',
        }} />

        {/* Metadata Badges */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center',
          fontFamily: 'var(--font-pixel)',
          fontSize: '0.65rem',
          color: '#cbd5e1',
        }}>
          {location && (
            <div style={{
              background: '#1a1b26',
              border: '1px solid #3b4261',
              padding: '6px 12px',
              borderRadius: '2px',
            }}>
              📍 {location}
            </div>
          )}

          {date && (
            <div style={{
              background: '#1a1b26',
              border: '1px solid #3b4261',
              padding: '6px 12px',
              borderRadius: '2px',
            }}>
              📅 {date}
            </div>
          )}

          {typeof affection === 'number' && (
            <div style={{
              background: '#1a1b26',
              border: '1px solid #f7768e',
              color: '#f7768e',
              padding: '6px 12px',
              borderRadius: '2px',
            }}>
              ❤️ AFFECTION: {affection}%
            </div>
          )}
        </div>

        {/* Skip Tip */}
        <div style={{
          marginTop: '28px',
          fontFamily: 'var(--font-pixel)',
          fontSize: '0.55rem',
          color: '#565f89',
          letterSpacing: '1px',
        }}>
          KLIK ATAU TEKAN [SPACE] UNTUK LANJUT ▶
        </div>
      </div>
    </div>
  );
};
