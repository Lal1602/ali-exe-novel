'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { sound } from '@/utils/audio';

interface TitleScreenProps {
  onStart: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({ onStart }) => {
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const handleStartGame = () => {
    sound.playClick();
    sound.playFanfare();
    onStart();
  };

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: '#070913',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-pixel)',
    }}>
      {/* Background Graphic with blur & dark purple overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        filter: 'blur(4px) brightness(0.4) contrast(1.2)',
        transform: 'scale(1.05)',
      }}>
        <Image
          src="/assets/bg-kantor.jpg"
          alt="Title Background"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Atmospheric Vignette & Color Wash */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        background: 'radial-gradient(ellipse at center, rgba(30, 20, 50, 0.6) 0%, rgba(7, 9, 19, 0.94) 85%)',
      }} />

      {/* CRT Scanline */}
      <div className="crt-scanlines" style={{ zIndex: 3 }} />

      {/* Floating Star Particles */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none' }}>
        {[
          { top: '20%', left: '15%', delay: '0s' },
          { top: '35%', left: '80%', delay: '1.2s' },
          { top: '65%', left: '25%', delay: '0.6s' },
          { top: '75%', left: '70%', delay: '2s' },
          { top: '15%', left: '60%', delay: '1.8s' },
        ].map((star, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: star.top,
              left: star.left,
              width: '4px',
              height: '4px',
              backgroundColor: '#4deeea',
              boxShadow: '0 0 8px #4deeea',
              animation: `starFloat 4s infinite ease-in-out ${star.delay}`,
            }}
          />
        ))}
      </div>

      {/* Main Title & Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 24px',
        maxWidth: '900px',
      }}>
        {/* Top Tagline */}
        <div style={{
          fontSize: '0.62rem',
          color: '#bb9af7',
          letterSpacing: '2px',
          marginBottom: '16px',
          textShadow: '0 0 10px rgba(187, 154, 247, 0.8)',
        }}>
          ✦ A SPECIAL 23RD BIRTHDAY STORY ✦
        </div>

        {/* Giant Pixel Game Title */}
        <h1 style={{
          fontSize: 'clamp(2.8rem, 6vw, 4.8rem)',
          lineHeight: 1.1,
          color: '#ffffff',
          textShadow: '0 0 20px #f7768e, 4px 4px 0 #1a1b26, -2px -2px 0 #f7768e',
          letterSpacing: '4px',
          marginBottom: '8px',
        }}>
          ALI.EXE
        </h1>

        {/* Subtitle */}
        <div style={{
          fontSize: 'clamp(0.85rem, 1.8vw, 1.25rem)',
          color: '#4deeea',
          letterSpacing: '3px',
          marginBottom: '28px',
          textShadow: '0 0 12px rgba(77, 238, 234, 0.7)',
        }}>
          : ANOMALI PENGUBAH KEPRIBADIAN
        </div>

        {/* Brief Hook Quote */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontStyle: 'italic',
          color: '#cbd5e1',
          fontSize: '0.95rem',
          maxWidth: '560px',
          lineHeight: 1.6,
          marginBottom: '36px',
        }}>
          “Dulu cuma teman kerja yang ga pernah ngobrol. Sampai kopi demi kopi, 50% di Tropodo, dan malam berbintang di Malang mengubah segalanya...”
        </p>

        {/* Buttons Menu */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          width: '260px',
        }}>
          <button
            onClick={handleStartGame}
            className="pixel-btn pixel-btn-primary"
            style={{
              padding: '16px 24px',
              fontSize: '0.82rem',
              letterSpacing: '2px',
              cursor: 'pointer',
            }}
          >
            ▶ START GAME
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setShowHowToPlay(true);
            }}
            className="pixel-btn"
            style={{
              padding: '12px 20px',
              fontSize: '0.68rem',
              letterSpacing: '1px',
              cursor: 'pointer',
            }}
          >
            ? HOW TO PLAY
          </button>
        </div>

        {/* Footer Meta */}
        <div style={{
          marginTop: '42px',
          fontSize: '0.55rem',
          color: '#64748b',
          letterSpacing: '1px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}>
          <div>BUILD 2026.10.24 — FOR ALI (23 TAHUN)</div>
          <div style={{ color: '#f7768e' }}>MADE WITH LOVE BY YOUR CEGIL ♡</div>
        </div>
      </div>

      {/* How to Play Modal */}
      {showHowToPlay && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 50,
          backgroundColor: 'rgba(5, 7, 14, 0.85)',
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
              maxWidth: '500px',
              padding: '24px',
              backgroundColor: '#111422',
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
              <span style={{ color: '#7aa2f7', fontSize: '0.8rem' }}>CARA BERMAIN</span>
              <button
                onClick={() => {
                  sound.playClick();
                  setShowHowToPlay(false);
                }}
                className="pixel-btn"
                style={{ padding: '4px 8px', fontSize: '0.6rem' }}
              >
                ✕
              </button>
            </div>

            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              lineHeight: 1.7,
              color: '#cbd5e1',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              <div>
                <strong style={{ color: '#4deeea' }}>• KLIK / [SPACE] / [ENTER]:</strong> Melanjutkan percakapan dan mempercepat ketikan teks.
              </div>
              <div>
                <strong style={{ color: '#f7768e' }}>• PILIHAN & INTERAKSI:</strong> Pilih respon atau mainkan mini-game di setiap chapter untuk melihat reaksi karakter.
              </div>
              <div>
                <strong style={{ color: '#73daca' }}>• MEMORY INVESTIGATION:</strong> Pada Chapter 05, klik dan baca 11 bukti anomali kepribadian Ali.
              </div>
              <div>
                <strong style={{ color: '#e0af68' }}>• AUDIO LO-FI:</strong> Pastikan audio aktif untuk merasakan nuansa sinematik indie terbaik.
              </div>
            </div>

            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <button
                onClick={() => {
                  sound.playClick();
                  setShowHowToPlay(false);
                }}
                className="pixel-btn pixel-btn-primary"
                style={{ width: '100%', fontSize: '0.72rem' }}
              >
                MENGERTI, AYO MULAI!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
