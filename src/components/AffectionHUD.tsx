'use client';

import React, { useEffect, useState } from 'react';
import { GameLocation, GamePhase } from '@/types/game';
import { sound } from '@/utils/audio';
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';

interface AffectionHUDProps {
  affection: number;
  location: GameLocation;
  phase: GamePhase;
  isMuted: boolean;
  onToggleMute: () => void;
  onRestart: () => void;
}

const LOCATION_LABELS: Record<GameLocation, { icon: string; name: string; tag: string }> = {
  'kantor': { icon: '🏢', name: 'GEN EPISTREE', tag: 'SURABAYA' },
  'cafe-little-cave': { icon: '☕', name: 'CAFE LITTLE CAVE', tag: 'SECRET SPOT' },
  'tropodo': { icon: '🏠', name: 'RUMAH CEGIL (TROPODO)', tag: 'SIDOARJO' },
  'malang': { icon: '🌃', name: 'VIEWPOINT BUKIT MALANG', tag: 'SPECIAL EVENT' },
  'system-void': { icon: '💾', name: 'ANOMALY ARCHIVE', tag: 'SYSTEM ROOT' },
};

const PHASE_TITLES: Record<GamePhase, string> = {
  'boot': 'BOOT_SEQUENCE',
  'prologue': 'PROLOGUE — BEFORE ANOMALY',
  'quest01': 'QUEST 01: COFFEE BREAK',
  'quest02': 'QUEST 02: THE OTHER GIRL',
  'quest03': 'QUEST 03: SAY IT OR KEEP IT',
  'chapter01': 'CHAPTER 01: LITTLE CAVE',
  'chapter02': 'CHAPTER 02: THE APPROACH',
  'chapter03': 'CHAPTER 03: 50% AFFECTION',
  'chapter04': 'CHAPTER 04: MALANG (OFFICIAL)',
  'chapter05': 'CHAPTER 05: MEMORY INVESTIGATION',
  'chapter06': 'CHAPTER 06: BOCIL MATANG',
  'chapter07': 'CHAPTER 07: INNER CHILD UNLOCKED',
  'chapter08': 'CHAPTER 08: NO GUARANTEES',
  'final-quiz': 'FINAL CHAPTER: THE ANOMALY',
  'epilogue': 'EPILOGUE: SAYANG',
  'save-screen': 'SAVE ARCHIVE',
  'credits': 'CREDITS ROLL',
};

export const AffectionHUD: React.FC<AffectionHUDProps> = ({
  affection,
  location,
  phase,
  isMuted,
  onToggleMute,
  onRestart,
}) => {
  const loc = LOCATION_LABELS[location] || LOCATION_LABELS['kantor'];
  const title = PHASE_TITLES[phase] || 'ALI.EXE';
  const animatedAffection = useAnimatedNumber(affection, 700);

  const [lastAffection, setLastAffection] = useState(affection);
  const [justIncreased, setJustIncreased] = useState(false);

  useEffect(() => {
    if (affection > lastAffection) {
      setJustIncreased(true);
      const timer = setTimeout(() => setJustIncreased(false), 1200);
      setLastAffection(affection);
      return () => clearTimeout(timer);
    }
    setLastAffection(affection);
  }, [affection, lastAffection]);

  const segments = 10;
  const filledSegments = Math.round((animatedAffection / 100) * segments);

  return (
    <header style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '68px',
      background: 'rgba(10, 12, 20, 0.94)',
      borderBottom: '3px solid #24283b',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      zIndex: 50,
      fontFamily: 'var(--font-pixel)',
      backdropFilter: 'blur(8px)',
    }}>
      {/* Left: Location & Phase */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          background: '#1a1b26',
          border: '2px solid #3b4261',
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.65rem',
          color: '#7aa2f7',
        }}>
          <span style={{ fontSize: '1rem' }}>{loc.icon}</span>
          <div>
            <div style={{ color: '#c0caf5', fontWeight: 'bold' }}>{loc.name}</div>
            <div style={{ fontSize: '0.55rem', color: '#565f89', marginTop: '2px' }}>{loc.tag}</div>
          </div>
        </div>

        <div style={{
          fontSize: '0.62rem',
          color: '#bb9af7',
          background: 'rgba(187, 154, 247, 0.12)',
          padding: '6px 10px',
          border: '1px solid rgba(187, 154, 247, 0.3)',
          letterSpacing: '1px',
        }}>
          {title}
        </div>
      </div>

      {/* Center: Affection Meter */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        transform: justIncreased ? 'scale(1.06)' : 'scale(1)',
        transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.68rem',
          color: animatedAffection >= 100 ? '#f7768e' : '#ff9e64',
        }}>
          <span
            className="anim-heart"
            style={{
              fontSize: '0.9rem',
              color: justIncreased ? '#ff0055' : 'inherit',
              filter: justIncreased ? 'drop-shadow(0 0 6px #ff0055)' : 'none',
            }}
          >
            ❤️
          </span>
          <span style={{ letterSpacing: '0.5px' }}>ALI'S AFFECTION:</span>
          <span style={{
            color: '#fff',
            background: animatedAffection >= 100 ? '#f7768e' : '#e0af68',
            padding: '2px 6px',
            borderRadius: '2px',
            fontWeight: 'bold',
            boxShadow: justIncreased ? '0 0 10px #ffffff' : 'none',
            transition: 'all 0.3s ease',
          }}>
            {animatedAffection}%
          </span>
        </div>

        {/* Pixel Progress Bar */}
        <div style={{
          display: 'flex',
          gap: '3px',
          background: '#131622',
          padding: '3px',
          border: '2px solid #3b4261',
        }}>
          {Array.from({ length: segments }).map((_, i) => {
            const isFilled = i < filledSegments;
            return (
              <div
                key={i}
                style={{
                  width: '13px',
                  height: '8px',
                  background: isFilled 
                    ? (animatedAffection >= 100 ? '#f7768e' : '#e0af68')
                    : '#1f2335',
                  boxShadow: isFilled ? '0 0 6px rgba(247, 118, 142, 0.6)' : 'none',
                  transition: 'background 0.3s ease, transform 0.2s ease',
                  transform: isFilled && justIncreased && i === filledSegments - 1 ? 'scale(1.25)' : 'scale(1)',
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Right: Audio & Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={() => {
            sound.playClick();
            onToggleMute();
          }}
          className="pixel-btn"
          style={{ fontSize: '0.6rem', padding: '6px 12px' }}
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? '🔇 SOUND: OFF' : '🔊 LO-FI: ON'}
        </button>

        <button
          onClick={() => {
            sound.playClick();
            if (confirm('Kembali ke awal cerita?')) {
              onRestart();
            }
          }}
          className="pixel-btn"
          style={{ fontSize: '0.6rem', padding: '6px 10px', color: '#f7768e' }}
          title="Restart Game"
        >
          ↺ RESET
        </button>
      </div>
    </header>
  );
};
