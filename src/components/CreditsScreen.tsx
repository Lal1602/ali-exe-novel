'use client';

import React from 'react';
import { sound } from '@/utils/audio';

interface CreditsScreenProps {
  onRestart: () => void;
}

export const CreditsScreen: React.FC<CreditsScreenProps> = ({ onRestart }) => {
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
        maxWidth: '680px',
        padding: '36px 28px',
        background: 'rgba(10, 13, 24, 0.98)',
        border: '3px solid #7aa2f7',
        textAlign: 'center',
        fontFamily: 'var(--font-pixel)',
      }}>
        <div style={{
          fontSize: '1.1rem',
          color: '#4deeea',
          marginBottom: '8px',
          letterSpacing: '2px',
        }}>
          ALI.EXE
        </div>
        <div style={{
          fontSize: '0.65rem',
          color: '#565f89',
          marginBottom: '28px',
          letterSpacing: '1px',
        }}>
          A SPECIAL 2D PIXEL STORY GAME FOR ALI
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          fontSize: '0.72rem',
          lineHeight: 1.8,
          marginBottom: '32px',
          borderTop: '2px dashed #24283b',
          borderBottom: '2px dashed #24283b',
          padding: '20px 0',
        }}>
          <div>
            <span style={{ color: '#565f89' }}>WRITTEN BY:</span>{' '}
            <span style={{ color: '#f7768e' }}>YOUR CEGIL</span>
          </div>
          <div>
            <span style={{ color: '#565f89' }}>DESIGNED BY:</span>{' '}
            <span style={{ color: '#f7768e' }}>YOUR CEGIL</span>
          </div>
          <div>
            <span style={{ color: '#565f89' }}>PROGRAMMED BY:</span>{' '}
            <span style={{ color: '#73daca' }}>YOUR ADIK IPAR</span>
          </div>
          <div>
            <span style={{ color: '#565f89' }}>ART DIRECTION:</span>{' '}
            <span style={{ color: '#f7768e' }}>YOUR CEGIL</span>
          </div>
          <div>
            <span style={{ color: '#565f89' }}>QUALITY ASSURANCE:</span>{' '}
            <span style={{ color: '#f7768e' }}>YOUR CEGIL</span>
          </div>
          <div>
            <span style={{ color: '#565f89' }}>EMOTIONAL DAMAGE:</span>{' '}
            <span style={{ color: '#7aa2f7' }}>ALI</span>
          </div>
          <div style={{ marginTop: '10px' }}>
            <span style={{ color: '#bb9af7' }}>SPECIAL THANKS TO:</span>
            <div style={{ color: '#ffe600', fontSize: '0.85rem', marginTop: '4px' }}>
              THE PERSON WHO KEEPS SAYING &quot;Love you, Cegilku.&quot;
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onRestart();
          }}
          className="pixel-btn pixel-btn-primary"
          style={{ fontSize: '0.75rem', padding: '12px 28px' }}
        >
          ↺ MAIN LAGI DARI AWAL
        </button>
      </div>
    </div>
  );
};
