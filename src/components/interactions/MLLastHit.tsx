'use client';

import React, { useEffect, useRef, useState } from 'react';
import { sound } from '@/utils/audio';
import { useSingleShot } from '@/hooks/useSingleShot';
import { InteractionShell } from './InteractionShell';

interface MLLastHitProps {
  onComplete: () => void;
}

const LANES = 3;
const TARGET_HITS = 5;
const TICK_MS = 100;
const LAST_HIT_ZONE = 30; // hp% at or below which a tap counts as a last hit
const RESPAWN_MS = 700;

const CHAT_LINES = [
  'Masli, udah makan belum?',
  'Jangan lupa istirahat ya, jangan ML terus 😤',
  'Menang nggak? Awas kalau kalah 😝',
];

interface Minion {
  hp: number;
  speed: number; // hp lost per tick
  respawnAt: number | null;
  flash: 'hit' | 'early' | 'miss' | null;
}

const spawnMinion = (): Minion => ({
  hp: 100,
  speed: 2.4 + Math.random() * 1.6,
  respawnAt: null,
  flash: null,
});

export const MLLastHit: React.FC<MLLastHitProps> = ({ onComplete }) => {
  const finish = useSingleShot(onComplete);
  const [minions, setMinions] = useState<Minion[]>(() => Array.from({ length: LANES }, spawnMinion));
  const [hits, setHits] = useState(0);
  const [replies, setReplies] = useState(0);
  const [chat, setChat] = useState<string | null>(null);
  const chatIndexRef = useRef(0);
  const chatVisibleRef = useRef(false);

  const done = hits >= TARGET_HITS;

  useEffect(() => {
    if (done) return;
    const timer = setInterval(() => {
      const now = Date.now();
      setMinions((prev) =>
        prev.map((m) => {
          if (m.respawnAt !== null) {
            return now >= m.respawnAt ? spawnMinion() : m;
          }
          const hp = m.hp - m.speed;
          if (hp <= 0) return { ...m, hp: 0, respawnAt: now + RESPAWN_MS, flash: 'miss' };
          return { ...m, hp, flash: null };
        })
      );
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [done]);

  // Cegil's chat pings in every ~7s and stays for 5s
  useEffect(() => {
    if (done) return;
    const timer = setInterval(() => {
      if (chatVisibleRef.current) {
        chatVisibleRef.current = false;
        setChat(null);
        return;
      }
      const line = CHAT_LINES[chatIndexRef.current % CHAT_LINES.length];
      chatIndexRef.current += 1;
      chatVisibleRef.current = true;
      sound.playBlip(880);
      setChat(line);
    }, 5000);
    return () => clearInterval(timer);
  }, [done]);

  const handleTap = (lane: number) => {
    if (done) return;
    const m = minions[lane];
    if (m.respawnAt !== null) return;

    if (m.hp <= LAST_HIT_ZONE) {
      sound.playAffectionChime();
      setHits((h) => h + 1);
      setMinions((prev) =>
        prev.map((x, i) => (i === lane ? { ...x, hp: 0, respawnAt: Date.now() + RESPAWN_MS, flash: 'hit' } : x))
      );
    } else {
      sound.playErrorBuzz();
      setMinions((prev) =>
        prev.map((x, i) => (i === lane ? { ...x, hp: Math.min(100, x.hp + 15), flash: 'early' } : x))
      );
    }
  };

  const handleReply = () => {
    sound.playClick();
    setReplies((r) => r + 1);
    chatVisibleRef.current = false;
    setChat(null);
  };

  return (
    <InteractionShell
      title="⚔️ RANK PUSH: ML LAST HIT"
      hint="Ali lagi main ML sebentar. Tap minion tepat saat HP-nya di zona merah (last hit). Kalau ada chat masuk dari Cegil, boleh dibalas dulu."
      accent="cyan"
      maxWidth={560}
      onSkip={finish}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-pixel)',
          fontSize: '0.58rem',
          marginBottom: '12px',
        }}
      >
        <span style={{ color: '#e0af68' }}>
          💰 LAST HIT: {hits} / {TARGET_HITS}
        </span>
        <span style={{ color: '#f7768e' }}>💌 BALAS CHAT: {replies}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${LANES}, 1fr)`, gap: '10px', marginBottom: '14px' }}>
        {minions.map((m, lane) => {
          const inZone = m.respawnAt === null && m.hp <= LAST_HIT_ZONE;
          return (
            <button
              key={lane}
              onClick={() => handleTap(lane)}
              className="pixel-btn"
              style={{
                padding: '14px 8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                borderColor: inZone ? '#f7768e' : '#3b4261',
                background: inZone ? 'rgba(247, 118, 142, 0.15)' : '#161928',
                touchAction: 'manipulation',
              }}
            >
              <span style={{ fontSize: '1.8rem', opacity: m.respawnAt === null ? 1 : 0.2 }}>
                {m.flash === 'hit' ? '💥' : '🪖'}
              </span>
              <div style={{ width: '100%', height: '10px', border: '2px solid #1a1b26', background: '#0f111a', position: 'relative' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${m.hp}%`,
                    background: inZone ? '#f7768e' : '#73daca',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: `${LAST_HIT_ZONE}%`,
                    width: '1px',
                    background: '#ffffff55',
                  }}
                />
              </div>
              <span style={{ fontSize: '0.45rem', color: '#94a3b8', minHeight: '10px' }}>
                {m.flash === 'early' ? 'TERLALU CEPAT!' : m.flash === 'miss' ? 'KELEWAT...' : inZone ? 'SEKARANG!' : ''}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ minHeight: '48px', marginBottom: '12px' }}>
        {chat && !done && (
          <button
            onClick={handleReply}
            className="pixel-btn"
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '10px 14px',
              borderColor: '#f7768e',
              background: 'rgba(247, 118, 142, 0.12)',
              animation: 'fadeIn 0.2s ease',
            }}
          >
            <span style={{ fontSize: '0.5rem', color: '#f7768e', fontFamily: 'var(--font-pixel)' }}>CEGIL · tap untuk membalas</span>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: '#e2e8f0', marginTop: '4px' }}>
              {chat}
            </div>
          </button>
        )}
      </div>

      {done && (
        <div style={{ animation: 'fadeIn 0.4s ease' }}>
          <div
            style={{
              padding: '12px 16px',
              borderLeft: '3px solid #73daca',
              background: 'rgba(115, 218, 202, 0.1)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.92rem',
              color: '#e0def4',
              lineHeight: 1.6,
              marginBottom: '14px',
            }}
          >
            {replies > 0
              ? 'VICTORY! Dan Ali sempat membalas chat sebelum last hit terakhir. Prioritas yang benar.'
              : 'VICTORY! Tapi chat dari Cegil belum dibalas... nanti ya, Masli.'}
          </div>
          <button
            onClick={() => {
              sound.playClick();
              finish();
            }}
            className="pixel-btn pixel-btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '0.75rem' }}
          >
            LANJUT ▶
          </button>
        </div>
      )}
    </InteractionShell>
  );
};
