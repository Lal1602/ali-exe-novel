'use client';

import React, { useState } from 'react';
import { sound } from '@/utils/audio';

interface ChatTapperProps {
  onComplete: () => void;
}

const CHAT_LOG = [
  { sender: 'ali', text: 'Tadi file revisi proposal udah di-upload ke drive belum ya?' },
  { sender: 'cegil', text: 'Udah kok, barusan jam 5 sore tadi. Coba cek folder tim.' },
  { sender: 'ali', text: 'Sip, udah masuk. Makasih ya.' },
  { sender: 'cegil', text: 'Sama-sama Masli. Masih di kantor emangnya?' },
  { sender: 'ali', text: 'Udah di kos. Mau main ML sebentar.' },
];

export const ChatTapper: React.FC<ChatTapperProps> = ({ onComplete }) => {
  const [visibleCount, setVisibleCount] = useState(2);

  const handleNextMessage = () => {
    sound.playClick();
    if (visibleCount < CHAT_LOG.length) {
      setVisibleCount(visibleCount + 1);
    } else {
      onComplete();
    }
  };

  const isFinished = visibleCount >= CHAT_LOG.length;

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
          maxWidth: '500px',
          padding: '24px',
          background: 'rgba(18, 22, 34, 0.98)',
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
            💬 WHATSAPP: MASLI
          </span>
          <span style={{ fontSize: '0.55rem', color: '#73daca', fontFamily: 'var(--font-pixel)' }}>
            ONLINE
          </span>
        </div>

        {/* Chat Bubbles */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          marginBottom: '20px',
          minHeight: '220px',
        }}>
          {CHAT_LOG.slice(0, visibleCount).map((msg, i) => {
            const isMe = msg.sender === 'cegil';
            return (
              <div
                key={i}
                style={{
                  alignSelf: isMe ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  padding: '10px 14px',
                  background: isMe ? '#f7768e' : '#24283b',
                  color: isMe ? '#1a1b26' : '#e2e8f0',
                  fontWeight: isMe ? 600 : 400,
                  borderRadius: isMe ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  lineHeight: 1.4,
                  animation: 'fadeIn 0.25s ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                }}
              >
                {msg.text}
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <button
          onClick={handleNextMessage}
          className="pixel-btn pixel-btn-primary"
          style={{ width: '100%', padding: '12px', fontSize: '0.72rem' }}
        >
          {!isFinished ? 'KETUK UNTUK BALAS CHAT ▶' : 'SELESAI (AFFECTION +5%) ▶'}
        </button>
      </div>
    </div>
  );
};
