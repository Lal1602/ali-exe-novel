'use client';

import React, { useState } from 'react';
import { sound } from '@/utils/audio';

interface InnerChildUnlockProps {
  onComplete: () => void;
}

export const InnerChildUnlock: React.FC<InnerChildUnlockProps> = ({ onComplete }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isHolding, setIsHolding] = useState(false);

  const handleUnlock = () => {
    setIsHolding(true);
    sound.playClick();
    setTimeout(() => {
      setIsHolding(false);
      setIsUnlocked(true);
      sound.playAffectionChime();
    }, 1000);
  };

  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 45,
      width: '90%',
      maxWidth: '640px',
    }}>
      <div className="pixel-box pixel-box-glow-pink" style={{
        padding: '28px',
        background: 'rgba(17, 19, 32, 0.96)',
        border: '3px solid #bb9af7',
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: 'var(--font-pixel)',
          fontSize: '0.75rem',
          color: '#bb9af7',
          marginBottom: '14px',
          letterSpacing: '1px',
        }}>
          [ CHAPTER 07: INNER CHILD REVELATION ]
        </div>

        {!isUnlocked ? (
          <>
            <div style={{
              display: 'inline-block',
              background: '#1a1b26',
              border: '2px solid #f7768e',
              padding: '12px 24px',
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.85rem',
              color: '#f7768e',
              marginBottom: '20px',
            }}>
              🔒 STATUS INNER CHILD: LOCKED / GUARDED
            </div>

            <p style={{
              fontSize: '0.98rem',
              color: '#c0caf5',
              lineHeight: 1.7,
              marginBottom: '24px',
            }}>
              Anak kecil dalam dirinya terlalu lama belajar berdiri sendirian.<br />
              Rasa aman tidak bisa dipaksa dengan kata-kata cepat.<br />
              Apakah kamu bersedia menemaninya dan memberinya ruang untuk menjadi dirinya sendiri?
            </p>

            <button
              onClick={handleUnlock}
              disabled={isHolding}
              className="pixel-btn pixel-btn-primary"
              style={{
                fontSize: '0.78rem',
                padding: '14px 28px',
                cursor: isHolding ? 'wait' : 'pointer',
              }}
            >
              {isHolding ? '⏳ MENEMANI DENGAN SABAR...' : '🤍 [ TEMANI & TUNGGU ]'}
            </button>
          </>
        ) : (
          <div style={{ animation: 'fadeIn 0.6s ease' }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(115, 218, 202, 0.15)',
              border: '2px solid #73daca',
              padding: '12px 24px',
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.85rem',
              color: '#73daca',
              marginBottom: '18px',
            }}>
              ✨ STATUS INNER CHILD: UNLOCKED!
            </div>

            <div style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.7rem',
              color: '#4deeea',
              marginBottom: '14px',
            }}>
              NEW PASSIVE SKILL: [ SAFE TO BE YOURSELF ]
            </div>

            <p style={{
              fontSize: '0.95rem',
              color: '#e2e8f0',
              lineHeight: 1.7,
              marginBottom: '24px',
              fontStyle: 'italic',
            }}>
              “Marahku kamu peluk. Riangku kamu sambut.<br />
              Keinginan spontanku kamu iyakan. Dan nakalku pun kamu arahkan.”
            </p>

            <button
              onClick={() => {
                sound.playClick();
                onComplete();
              }}
              className="pixel-btn pixel-btn-primary"
              style={{ fontSize: '0.75rem', padding: '12px 26px' }}
            >
              LANJUTKAN PERJALANAN ▶
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
