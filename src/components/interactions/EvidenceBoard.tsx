'use client';

import React, { useState } from 'react';
import { sound } from '@/utils/audio';

interface EvidenceBoardProps {
  onComplete: () => void;
}

const EVIDENCES = [
  {
    id: 'ev-1',
    title: 'BUKTI 01: SISI JALAN RAYA',
    tag: 'PROTECTIVE',
    desc: 'Setiap kali jalan kaki berdua di trotoar, Ali refleks selalu bertukar posisi ke sisi yang dekat dengan kendaraan lalu lalang.',
  },
  {
    id: 'ev-2',
    title: 'BUKTI 02: PENDENGAR YANG TENANG',
    tag: 'MATURE',
    desc: 'Saat aku mulai panik atau bercerita menggebu-gebu, dia tidak memotong. Menunggu sampai emosiku reda, baru memberi pandangan yang menenangkan.',
  },
  {
    id: 'ev-3',
    title: 'BUKTI 03: TANGGUNG JAWAB NYATA',
    tag: 'RESPONSIBLE',
    desc: 'Tidak pernah mengobral janji manis yang muluk-muluk. Tapi apa yang sudah dia janjikan, pasti dia usahakan sampai selesai.',
  },
  {
    id: 'ev-4',
    title: 'BUKTI 04: SISI MANJA YANG LUCU',
    tag: 'CUTE SIDE',
    desc: 'Meskipun di luar bersikap dewasa dan tenang, saat berdua dia punya sisi manja dan konyol yang hanya boleh kulihat.',
  },
];

export const EvidenceBoard: React.FC<EvidenceBoardProps> = ({ onComplete }) => {
  const [unlocked, setUnlocked] = useState<string[]>([]);

  const handleUnlock = (id: string) => {
    sound.playClick();
    if (!unlocked.includes(id)) {
      setUnlocked([...unlocked, id]);
    }
  };

  const isAllUnlocked = unlocked.length >= EVIDENCES.length;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 45,
      backgroundColor: 'rgba(7, 9, 18, 0.88)',
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
          maxWidth: '680px',
          padding: '24px',
          background: 'rgba(16, 22, 34, 0.98)',
          border: '3px solid #73daca',
          boxShadow: '0 0 24px rgba(115, 218, 202, 0.35)',
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
            color: '#73daca',
          }}>
            📋 BUKTI ANOMALI: KELAS “BOCIL MATANG”
          </span>
          <span style={{ fontSize: '0.55rem', color: '#e0af68', fontFamily: 'var(--font-pixel)' }}>
            STATUS: {unlocked.length}/{EVIDENCES.length} TERBUKA
          </span>
        </div>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.88rem',
          color: '#cbd5e1',
          marginBottom: '16px',
          lineHeight: 1.5,
        }}>
          Klik setiap kartu di bawah ini untuk membuka arsip bukti mengapa Ali disebut “bocil yang jauh lebih matang dari usianya”:
        </p>

        {/* 4 Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          marginBottom: '20px',
        }}>
          {EVIDENCES.map((ev) => {
            const isOpen = unlocked.includes(ev.id);
            return (
              <div
                key={ev.id}
                onClick={() => handleUnlock(ev.id)}
                style={{
                  padding: '12px 14px',
                  background: isOpen ? 'rgba(115, 218, 202, 0.12)' : '#161928',
                  border: isOpen ? '2px solid #73daca' : '1px dashed #3b4261',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  minHeight: '100px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '6px',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-pixel)',
                      fontSize: '0.6rem',
                      color: isOpen ? '#ffffff' : '#7aa2f7',
                    }}>
                      {ev.title}
                    </span>
                    {isOpen && (
                      <span style={{
                        fontSize: '0.5rem',
                        fontFamily: 'var(--font-pixel)',
                        color: '#73daca',
                        background: '#1a1b26',
                        padding: '2px 4px',
                      }}>
                        {ev.tag}
                      </span>
                    )}
                  </div>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.82rem',
                    color: isOpen ? '#c0caf5' : '#565f89',
                    lineHeight: 1.4,
                  }}>
                    {isOpen ? ev.desc : '🔒 Klik untuk mengungkap bukti...'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {isAllUnlocked ? (
          <button
            onClick={() => {
              sound.playClick();
              sound.playAffectionChime();
              onComplete();
            }}
            className="pixel-btn pixel-btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '0.75rem' }}
          >
            SEMUA BUKTI TERKONFIRMASI! LANJUTKAN ▶
          </button>
        ) : (
          <div style={{
            textAlign: 'center',
            fontSize: '0.62rem',
            fontFamily: 'var(--font-pixel)',
            color: '#565f89',
          }}>
            (Buka semua 4 kartu bukti untuk melanjutkan)
          </div>
        )}
      </div>
    </div>
  );
};
