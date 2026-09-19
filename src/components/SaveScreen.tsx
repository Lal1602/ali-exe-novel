'use client';

import React from 'react';
import { sound } from '@/utils/audio';

interface SaveScreenProps {
  onAccept: () => void;
}

export const SaveScreen: React.FC<SaveScreenProps> = ({ onAccept }) => {
  return (
    <div style={{
      position: 'absolute',
      inset: '80px 24px 24px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 45,
    }}>
      <div className="pixel-box pixel-box-glow-green" style={{
        width: '100%',
        maxWidth: '720px',
        padding: '32px',
        background: 'rgba(12, 16, 28, 0.97)',
        border: '3px solid #73daca',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-block',
          border: '2px solid #73daca',
          background: 'rgba(115, 218, 202, 0.12)',
          padding: '8px 18px',
          fontFamily: 'var(--font-pixel)',
          fontSize: '0.8rem',
          color: '#73daca',
          marginBottom: '20px',
          letterSpacing: '1px',
        }}>
          💾 MEMORY CARD — SAVE COMPLETE
        </div>

        <div style={{
          background: '#161928',
          border: '2px dashed #3b4261',
          padding: '20px',
          marginBottom: '24px',
          textAlign: 'left',
          fontFamily: 'var(--font-pixel)',
          fontSize: '0.72rem',
          lineHeight: 2,
        }}>
          <div style={{ color: '#9aa5ce' }}>
            DATE OF OFFICIAL ESTABLISHMENT:{' '}
            <span style={{ color: '#fff' }}>16 AGUSTUS 2026</span>
          </div>
          <div style={{ color: '#9aa5ce' }}>
            PARTY MEMBERS:{' '}
            <span style={{ color: '#7aa2f7' }}>PLAYER 1 (ALI)</span> +{' '}
            <span style={{ color: '#f7768e' }}>PLAYER 2 (CEGIL)</span>
          </div>
          <div style={{ color: '#9aa5ce' }}>
            CURRENT STATUS:{' '}
            <span style={{ color: '#73daca' }}>ONGOING & THRIVING</span>
          </div>
          <div style={{ color: '#9aa5ce' }}>
            AFFECTION RATING:{' '}
            <span style={{ color: '#f7768e' }}>100% UNCONDITIONAL</span>
          </div>
          <div style={{ color: '#e0af68', marginTop: '6px' }}>
            NEXT MISSION:{' '}
            <span>ANOTHER YEAR & FOREVER TOGETHER</span>
          </div>
        </div>

        {/* Birthday Message */}
        <div style={{
          background: 'rgba(247, 118, 142, 0.1)',
          border: '2px solid #f7768e',
          padding: '18px 20px',
          marginBottom: '28px',
          borderRadius: '4px',
        }}>
          <div style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.75rem',
            color: '#f7768e',
            marginBottom: '8px',
          }}>
            🎂 SPECIAL BIRTHDAY MESSAGE FOR ALI 🎂
          </div>
          <p style={{
            fontSize: '0.98rem',
            lineHeight: 1.7,
            color: '#e2e8f0',
            fontStyle: 'italic',
          }}>
            “Selamat ulang tahun yang ke-23, Mas Ali / Bocilku / Sayang!<br />
            Terima kasih sudah membiarkanku mengenal sisi lembutmu yang tidak semua orang bisa lihat.<br />
            Semoga tahun ini — dan tahun-tahun berikutnya — makin banyak level dan kebahagiaan yang kita buka bareng.”
          </p>
        </div>

        <button
          onClick={() => {
            sound.playFanfare();
            onAccept();
          }}
          className="pixel-btn pixel-btn-primary"
          style={{ fontSize: '0.85rem', padding: '16px 36px', letterSpacing: '1px' }}
        >
          [ ACCEPT NEXT QUEST ] ▶
        </button>
      </div>
    </div>
  );
};
