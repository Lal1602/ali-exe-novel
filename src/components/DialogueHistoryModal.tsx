'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { DialogueLogEntry } from '@/types/game';
import { sound } from '@/utils/audio';

interface DialogueHistoryModalProps {
  history: DialogueLogEntry[];
  onClose: () => void;
}

export const DialogueHistoryModal: React.FC<DialogueHistoryModalProps> = ({ history, onClose }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom of log when opened
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  // Keyboard shortcut: Escape or 'L' to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'l' || e.key === 'L') {
        e.preventDefault();
        sound.playClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 80,
        backgroundColor: 'rgba(5, 7, 14, 0.88)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        boxSizing: 'border-box',
        animation: 'fadeIn 0.2s ease-out',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="pixel-box"
        style={{
          width: '100%',
          maxWidth: '820px',
          height: '85vh',
          maxHeight: '750px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgba(13, 16, 28, 0.98)',
          border: '3px solid #7aa2f7',
          boxShadow: '0 0 30px rgba(122, 162, 247, 0.4), 0 16px 40px rgba(0, 0, 0, 0.8)',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '2px solid #24283b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(10, 12, 22, 0.95)',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.2rem' }}>📜</span>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: '0.82rem',
                  color: '#7aa2f7',
                  letterSpacing: '1px',
                }}
              >
                RIWAYAT PERCAKAPAN [LOG]
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: '0.52rem',
                  color: '#565f89',
                  marginTop: '2px',
                }}
              >
                SEMUA DIALOG & KATA HATI YANG TELAH DILALUI
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="pixel-btn"
            style={{
              padding: '6px 14px',
              fontSize: '0.62rem',
              color: '#f7768e',
              cursor: 'pointer',
            }}
            title="Tutup riwayat (ESC)"
          >
            ✕ TUTUP [ESC]
          </button>
        </div>

        {/* Scrollable Conversation List */}
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxSizing: 'border-box',
          }}
        >
          {history.length === 0 ? (
            <div
              style={{
                margin: 'auto',
                fontFamily: 'var(--font-pixel)',
                fontSize: '0.75rem',
                color: '#565f89',
                textAlign: 'center',
              }}
            >
              [ BELUM ADA RIWAYAT DIALOG TERSIMPAN ]
            </div>
          ) : (
            history.map((entry, idx) => {
              const isCegil = entry.speaker === 'Cegil' || entry.speakerAvatar === 'cegil';
              const isAli = entry.speaker === 'Ali' || entry.speakerAvatar === 'ali';
              const isInner = entry.textType === 'inner-monologue';
              const isNarration = entry.textType === 'narration' || entry.speaker === 'Narator' || entry.speaker === 'System';

              const accentColor = isInner
                ? '#bb9af7'
                : isCegil
                  ? '#f7768e'
                  : isAli
                    ? '#7aa2f7'
                    : '#4deeea';

              const badgeBg = isInner
                ? 'rgba(187, 154, 247, 0.15)'
                : isCegil
                  ? 'rgba(247, 118, 142, 0.15)'
                  : isAli
                    ? 'rgba(122, 162, 247, 0.15)'
                    : 'rgba(77, 238, 234, 0.12)';

              const avatarSrc = isCegil
                ? '/assets/portrait-cegil-glasses.jpg'
                : isAli
                  ? '/assets/portrait-ali-glasses.jpg'
                  : null;

              return (
                <div
                  key={`${entry.id}-${idx}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    padding: '12px 16px',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(18, 22, 38, 0.7)',
                    borderLeft: `4px solid ${accentColor}`,
                    borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                    borderRight: '1px solid rgba(255, 255, 255, 0.04)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                  }}
                >
                  {/* Speaker Header with Avatar Thumbnail */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {avatarSrc && !isInner && (
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '3px',
                          overflow: 'hidden',
                          position: 'relative',
                          border: `1px solid ${accentColor}`,
                          flexShrink: 0,
                        }}
                      >
                        <Image
                          src={avatarSrc}
                          alt={entry.speaker || 'Speaker'}
                          fill
                          unoptimized
                          style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
                        />
                      </div>
                    )}

                    <span
                      style={{
                        fontFamily: 'var(--font-pixel)',
                        fontSize: '0.62rem',
                        color: accentColor,
                        backgroundColor: badgeBg,
                        border: `1px solid ${accentColor}`,
                        padding: '2px 8px',
                        borderRadius: '2px',
                        letterSpacing: '1px',
                      }}
                    >
                      {isInner
                        ? '♡ KATA HATI CEGIL'
                        : isNarration
                          ? `[ ${entry.speaker || 'NARASI'} ]`
                          : `[ ${entry.speaker?.toUpperCase() || 'DIALOG'} ]`}
                    </span>

                    {entry.speakerTitle && (
                      <span
                        style={{
                          fontFamily: 'var(--font-pixel)',
                          fontSize: '0.50rem',
                          color: '#94a3b8',
                          background: '#161928',
                          padding: '2px 6px',
                          borderRadius: '2px',
                        }}
                      >
                        {entry.speakerTitle}
                      </span>
                    )}

                    <span
                      style={{
                        marginLeft: 'auto',
                        fontSize: '0.50rem',
                        fontFamily: 'var(--font-pixel)',
                        color: '#414868',
                      }}
                    >
                      #{idx + 1}
                    </span>
                  </div>

                  {/* Main Text Content */}
                  <div
                    style={{
                      fontSize: '0.92rem',
                      lineHeight: 1.6,
                      color: isInner ? '#e0def4' : isNarration ? '#73daca' : '#ffffff',
                      fontStyle: isInner ? 'italic' : 'normal',
                      paddingLeft: avatarSrc && !isInner ? '36px' : '0px',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {entry.text}
                  </div>

                  {/* Additional Narration Paragraphs if any */}
                  {entry.narration && entry.narration.length > 0 && (
                    <div
                      style={{
                        paddingLeft: avatarSrc && !isInner ? '36px' : '0px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        marginTop: '4px',
                        fontSize: '0.84rem',
                        color: '#94a3b8',
                        lineHeight: 1.5,
                        fontStyle: 'italic',
                      }}
                    >
                      {entry.narration.map((p, pIdx) => (
                        <p key={pIdx} style={{ margin: 0 }}>
                          {p}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer info bar */}
        <div
          style={{
            padding: '10px 20px',
            borderTop: '2px solid #24283b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(10, 12, 22, 0.95)',
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.54rem',
            color: '#7aa2f7',
            flexShrink: 0,
          }}
        >
          <div>TOTAL: {history.length} BARIS PERCAKAPAN</div>
          <div style={{ color: '#565f89' }}>
            TIP: BISA TEKAN TOMBOL [L] ATAU [ESC] UNTUK KEMBALI
          </div>
        </div>
      </div>
    </div>
  );
};
