'use client';

import React, { useState } from 'react';
import { MEMORY_FRAGMENTS } from '@/data/memories';
import { MemoryFragment } from '@/types/game';
import { sound } from '@/utils/audio';

interface MemoryInvestigationProps {
  onComplete: () => void;
}

export const MemoryInvestigation: React.FC<MemoryInvestigationProps> = ({ onComplete }) => {
  const [memories, setMemories] = useState<MemoryFragment[]>(MEMORY_FRAGMENTS);
  const [activeMemory, setActiveMemory] = useState<MemoryFragment | null>(null);

  const inspectedCount = memories.filter((m) => m.unlocked).length;
  const canFinish = inspectedCount >= 8; // At least 8 or all 11

  const handleOpenMemory = (mem: MemoryFragment) => {
    sound.playClick();
    setActiveMemory(mem);
    // Mark as unlocked
    setMemories((prev) =>
      prev.map((item) => (item.id === mem.id ? { ...item, unlocked: true } : item))
    );
  };

  const handleCloseModal = () => {
    sound.playClick();
    setActiveMemory(null);
  };

  return (
    <div style={{
      position: 'absolute',
      inset: '76px 20px 20px 20px',
      zIndex: 40,
      display: 'flex',
      flexDirection: 'column',
      background: 'rgba(13, 16, 26, 0.95)',
      border: '3px solid #3b4261',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
      padding: '20px',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '2px solid #24283b',
        paddingBottom: '12px',
        marginBottom: '16px',
        fontFamily: 'var(--font-pixel)',
      }}>
        <div>
          <div style={{ fontSize: '0.85rem', color: '#7aa2f7' }}>
            CHAPTER 05: MEMORY INVESTIGATION
          </div>
          <div style={{ fontSize: '0.62rem', color: '#9aa5ce', marginTop: '4px' }}>
            KLIK MEMORY FRAGMENT UNTUK MENGUNGKAP ANOMALI KEPRIBADIAN ALI
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            fontSize: '0.68rem',
            color: '#c0caf5',
            background: '#1a1b26',
            padding: '8px 14px',
            border: '2px solid #3b4261',
          }}>
            TERUNGKAP: <span style={{ color: '#4deeea', fontWeight: 'bold' }}>{inspectedCount} / 11</span>
          </div>

          {canFinish && (
            <button
              onClick={() => {
                sound.playAffectionChime();
                onComplete();
              }}
              className="pixel-btn pixel-btn-primary"
              style={{ fontSize: '0.68rem', padding: '8px 16px' }}
            >
              LANJUT KE CHAPTER 06 ▶
            </button>
          )}
        </div>
      </div>

      {/* Grid of 11 Memory Cards */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '14px',
        paddingRight: '8px',
      }}>
        {memories.map((m) => (
          <div
            key={m.id}
            onClick={() => handleOpenMemory(m)}
            className="pixel-box"
            style={{
              padding: '14px',
              cursor: 'pointer',
              borderColor: m.unlocked ? '#7aa2f7' : '#3b4261',
              background: m.unlocked ? 'rgba(26, 31, 50, 0.9)' : 'rgba(15, 18, 28, 0.75)',
              transition: 'transform 0.15s ease, border-color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.borderColor = '#4deeea';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = m.unlocked ? '#7aa2f7' : '#3b4261';
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px',
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.65rem',
            }}>
              <span style={{ color: m.unlocked ? '#bb9af7' : '#565f89' }}>
                FRAG #{String(m.number).padStart(2, '0')}
              </span>
              <span style={{
                color: m.unlocked ? '#73daca' : '#f7768e',
                fontSize: '0.55rem',
              }}>
                {m.unlocked ? '✓ UNLOCKED' : '🔒 TERSEMBUNYI'}
              </span>
            </div>

            <div style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.75rem',
              color: m.unlocked ? '#fff' : '#c0caf5',
              marginBottom: '6px',
            }}>
              {m.title}
            </div>

            <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.4 }}>
              {m.previewText}
            </div>

            <div style={{
              marginTop: '10px',
              fontSize: '0.6rem',
              color: '#4deeea',
              fontFamily: 'var(--font-pixel)',
            }}>
              [ BUKA CATATAN ]
            </div>
          </div>
        ))}
      </div>

      {/* Modal Detail for Active Memory */}
      {activeMemory && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '20px',
          backdropFilter: 'blur(4px)',
        }}>
          <div className="pixel-box pixel-box-glow-cyan" style={{
            width: '100%',
            maxWidth: '640px',
            maxHeight: '90%',
            overflowY: 'auto',
            background: '#131622',
            padding: '24px',
            border: '3px solid #7aa2f7',
          }}>
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '2px solid #24283b',
              paddingBottom: '12px',
              marginBottom: '16px',
            }}>
              <div>
                <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.9rem', color: '#7aa2f7' }}>
                  {activeMemory.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
                  {activeMemory.subtitle}
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="pixel-btn"
                style={{ fontSize: '0.65rem', padding: '6px 12px', color: '#f7768e' }}
              >
                ✕ TUTUP
              </button>
            </div>

            {/* Story Paragraphs */}
            <div style={{ marginBottom: '16px', lineHeight: 1.7, color: '#e2e8f0', fontSize: '0.95rem' }}>
              {activeMemory.fullStory.map((p, idx) => (
                <p key={idx} style={{ marginBottom: '8px' }}>
                  {p}
                </p>
              ))}
            </div>

            {/* Dialogue section */}
            {activeMemory.dialogue && activeMemory.dialogue.length > 0 && (
              <div style={{
                background: '#1a1b26',
                border: '1px solid #3b4261',
                padding: '12px 16px',
                borderRadius: '4px',
                marginBottom: '16px',
              }}>
                <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.65rem', color: '#bb9af7', marginBottom: '8px' }}>
                  [ RECORDED CONVERSATION ]
                </div>
                {activeMemory.dialogue.map((d, idx) => (
                  <div key={idx} style={{ marginBottom: '6px', fontSize: '0.88rem' }}>
                    <strong style={{ color: d.speaker === 'Ali' ? '#7aa2f7' : d.speaker === 'Cegil' ? '#f7768e' : '#73daca' }}>
                      {d.speaker}:
                    </strong>{' '}
                    <span style={{ color: '#c0caf5' }}>{d.text}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Stat Gain */}
            {activeMemory.statGain && (
              <div style={{
                background: 'rgba(115, 218, 202, 0.1)',
                border: '1px dashed #73daca',
                padding: '10px 14px',
                fontFamily: 'var(--font-pixel)',
                fontSize: '0.68rem',
                color: '#73daca',
                marginBottom: '16px',
              }}>
                {activeMemory.statGain.label}: {activeMemory.statGain.value}
              </div>
            )}

            <div style={{ textAlign: 'right' }}>
              <button
                onClick={handleCloseModal}
                className="pixel-btn pixel-btn-primary"
                style={{ fontSize: '0.7rem', padding: '10px 20px' }}
              >
                SIMPAN FRAGMENT & KEMBALI
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
