'use client';

import React, { useState } from 'react';
import { sound } from '@/utils/audio';

interface DraftMessagePickerProps {
  onComplete: () => void;
}

const DRAFTS = [
  {
    id: 'draft-a',
    title: 'DRAFT A: Tipe Formal & Ragu-ragu',
    text: '“Masli, nanti sore setelah jam kantor ada waktu luang ga ya? Ada sedikit yang mau aku omongin, tapi santai kok bukan soal kerjaan.”',
    note: 'Dihapus karena terasa kaku banget kayak mau rapat tahunan.',
  },
  {
    id: 'draft-b',
    title: 'DRAFT B: Tipe Santai Tapi Ngeselin',
    text: '“Masli, sore ini temenin ke Little Cave dong. Gaada penolakan ya, kopinya aku bayarin.”',
    note: 'Terlalu maksa, tapi seru sih.',
  },
  {
    id: 'draft-c',
    title: 'DRAFT C: Pilihan Final (Jujur & Berani)',
    text: '“Masli, nanti sore bisa ketemu di Little Cave sebentar? Ada yang mau aku sampein langsung.”',
    note: 'Singkat, tegas, dan bikin jantung berdebar kencang saat tombol KIRIM ditekan.',
  },
];

export const DraftMessagePicker: React.FC<DraftMessagePickerProps> = ({ onComplete }) => {
  const [selectedDraft, setSelectedDraft] = useState<string>('draft-c');
  const [isSent, setIsSent] = useState(false);

  const active = DRAFTS.find((d) => d.id === selectedDraft) || DRAFTS[2];

  const handleSend = () => {
    sound.playClick();
    sound.playAffectionChime();
    setIsSent(true);
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

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
          maxWidth: '540px',
          padding: '24px',
          background: 'rgba(18, 22, 36, 0.96)',
          border: '3px solid #7aa2f7',
          boxShadow: '0 0 24px rgba(122, 162, 247, 0.35)',
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
            color: '#7aa2f7',
          }}>
            📱 CHAT DRAFT: KETIK PESAN KE MASLI
          </span>
          <span style={{ fontSize: '0.55rem', color: '#73daca', fontFamily: 'var(--font-pixel)' }}>
            ONLINE
          </span>
        </div>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.88rem',
          color: '#cbd5e1',
          lineHeight: 1.5,
          marginBottom: '16px',
        }}>
          Malam sebelum 26 Juli. Di kamar, jempolmu bolak-balik ngetik lalu hapus draft pesan WhatsApp untuk Ali. Draft mana yang akhirnya kamu putuskan kirim?
        </p>

        {/* Draft Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {DRAFTS.map((d) => (
            <button
              key={d.id}
              onClick={() => {
                if (isSent) return;
                sound.playClick();
                setSelectedDraft(d.id);
              }}
              className="pixel-btn"
              style={{
                flex: 1,
                padding: '8px 6px',
                fontSize: '0.58rem',
                borderColor: selectedDraft === d.id ? '#7aa2f7' : '#3b4261',
                background: selectedDraft === d.id ? '#24283b' : '#161928',
                color: selectedDraft === d.id ? '#ffffff' : '#94a3b8',
              }}
            >
              {d.id.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Message Bubble Display */}
        <div style={{
          background: '#1a1b26',
          border: '2px solid #3b4261',
          padding: '16px',
          marginBottom: '16px',
          borderRadius: '4px',
        }}>
          <div style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.62rem',
            color: '#bb9af7',
            marginBottom: '8px',
          }}>
            {active.title}
          </div>

          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.98rem',
            lineHeight: 1.6,
            color: '#e2e8f0',
            background: 'rgba(122, 162, 247, 0.1)',
            padding: '12px',
            borderLeft: '3px solid #7aa2f7',
            marginBottom: '8px',
          }}>
            {active.text}
          </div>

          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            color: '#94a3b8',
            fontStyle: 'italic',
          }}>
            Catatan: {active.note}
          </div>
        </div>

        {/* Send Button */}
        {!isSent ? (
          <button
            onClick={handleSend}
            className="pixel-btn pixel-btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '0.75rem' }}
          >
            KIRIM KE MASLI (READ ✓✓) ▶
          </button>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '12px',
            color: '#73daca',
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.68rem',
            animation: 'fadeIn 0.3s ease',
          }}>
            ✓✓ TERKIRIM. MASLI: “OKE, NANTI KETEMU DI SANA YA.”
          </div>
        )}
      </div>
    </div>
  );
};
