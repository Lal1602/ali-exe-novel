'use client';

import React from 'react';
import Image from 'next/image';

export interface CharacterPortraitProps {
  character: 'cegil' | 'ali';
  name: string;
  speaker?: string;
  speakerAvatar?: 'ali' | 'cegil' | null;
  textType?: 'dialogue' | 'inner-monologue' | 'narration';
}

export const CharacterPortrait: React.FC<CharacterPortraitProps> = ({
  character,
  name,
  speaker,
  speakerAvatar,
  textType = 'dialogue',
}) => {
  const isSpokenDialogue = textType === 'dialogue' && speaker !== 'Narator' && speaker !== 'System';

  const isCegil = character === 'cegil';
  const isAli = character === 'ali';

  const isSpeaking = isSpokenDialogue && (
    isCegil
      ? (speaker === 'Cegil' || speakerAvatar === 'cegil')
      : (speaker === 'Ali' || speakerAvatar === 'ali')
  );

  const isThinking = isCegil && textType === 'inner-monologue';

  const isOtherSpeaking = isSpokenDialogue && (
    isCegil
      ? (speaker === 'Ali' || speakerAvatar === 'ali')
      : (speaker === 'Cegil' || speakerAvatar === 'cegil')
  );

  const imageSrc = isCegil ? '/assets/portrait-cegil-glasses.jpg' : '/assets/portrait-ali-glasses.jpg';
  const accentColor = isCegil ? '#f7768e' : '#7aa2f7';
  const thinkingColor = '#bb9af7';

  // Dynamic status text
  let statusText = '○ IDLE';
  let statusColor = '#565f89';
  if (isSpeaking) {
    statusText = '● BERBICARA';
    statusColor = accentColor;
  } else if (isThinking) {
    statusText = '💭 KATA HATI';
    statusColor = thinkingColor;
  } else if (isOtherSpeaking) {
    statusText = '○ MENDENGARKAN';
    statusColor = '#7982a9';
  }

  // Dynamic Border & Shadow
  let borderColor = '#282e44';
  let boxShadow = '0 6px 20px rgba(0, 0, 0, 0.55)';
  if (isSpeaking) {
    borderColor = accentColor;
    boxShadow = `0 0 16px ${accentColor}80, inset 0 0 10px ${accentColor}33`;
  } else if (isThinking) {
    borderColor = thinkingColor;
    boxShadow = `0 0 14px ${thinkingColor}66, inset 0 0 8px ${thinkingColor}22`;
  } else if (isOtherSpeaking) {
    borderColor = '#1f2335';
  }

  return (
    <div
      style={{
        width: '145px',
        minWidth: '145px',
        maxWidth: '145px',
        height: '100%',
        minHeight: '200px',
        maxHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '6px',
        overflow: 'hidden',
        boxSizing: 'border-box',
        backgroundColor: 'rgba(15, 18, 32, 0.94)',
        backdropFilter: 'blur(10px)',
        border: `2px solid ${borderColor}`,
        boxShadow,
        transition: 'all 0.25s cubic-bezier(0.25, 1, 0.5, 1)',
        transform: isSpeaking ? 'translateY(-2px)' : 'none',
        position: 'relative',
        zIndex: 42,
        flexShrink: 0,
      }}
    >
      {/* Top Header Tag */}
      <div
        style={{
          height: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: isSpeaking
            ? isCegil ? 'rgba(247, 118, 142, 0.18)' : 'rgba(122, 162, 247, 0.18)'
            : isThinking
              ? 'rgba(187, 154, 247, 0.15)'
              : 'rgba(26, 27, 38, 0.75)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.62rem',
            letterSpacing: '1px',
            color: isSpeaking ? accentColor : isThinking ? thinkingColor : '#94a3b8',
            textShadow: isSpeaking ? `0 0 8px ${accentColor}` : 'none',
          }}
        >
          {name}
        </span>

        {/* Dynamic Voice Equalizer / Speaking Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '12px' }}>
          {isSpeaking ? (
            <>
              <span
                style={{
                  display: 'inline-block',
                  width: '3px',
                  backgroundColor: accentColor,
                  borderRadius: '1px',
                  animation: 'soundWaveBar 0.45s ease-in-out infinite alternate',
                  animationDelay: '0s',
                }}
              />
              <span
                style={{
                  display: 'inline-block',
                  width: '3px',
                  backgroundColor: accentColor,
                  borderRadius: '1px',
                  animation: 'soundWaveBar 0.45s ease-in-out infinite alternate',
                  animationDelay: '0.15s',
                }}
              />
              <span
                style={{
                  display: 'inline-block',
                  width: '3px',
                  backgroundColor: accentColor,
                  borderRadius: '1px',
                  animation: 'soundWaveBar 0.45s ease-in-out infinite alternate',
                  animationDelay: '0.30s',
                }}
              />
            </>
          ) : isThinking ? (
            <span style={{ fontSize: '0.65rem', color: thinkingColor, animation: 'pulse 1.2s infinite' }}>
              ♡
            </span>
          ) : (
            <span style={{ fontSize: '0.55rem', color: '#565f89' }}>
              {isOtherSpeaking ? '○' : '·'}
            </span>
          )}
        </div>
      </div>

      {/* Portrait Image Frame */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#0a0d18',
        }}
      >
        <Image
          src={imageSrc}
          alt={name}
          fill
          unoptimized
          style={{
            objectFit: 'cover',
            objectPosition: isCegil ? 'center 12%' : 'center 8%',
            filter: isSpeaking
              ? 'brightness(1.12) contrast(1.06)'
              : isThinking
                ? 'brightness(1.02) contrast(1.0)'
                : isOtherSpeaking
                  ? 'brightness(0.52) contrast(0.88) grayscale(0.3)'
                  : 'brightness(0.82)',
            transition: 'filter 0.25s ease',
          }}
        />

        {/* Subtle scanline overlay for retro CRT aesthetic */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.2) 50%)',
            backgroundSize: '100% 4px',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Bottom Status Bar */}
      <div
        style={{
          height: '22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: 'rgba(10, 12, 22, 0.95)',
          padding: '0 4px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.50rem',
            letterSpacing: '0.5px',
            color: statusColor,
          }}
        >
          {statusText}
        </span>
      </div>
    </div>
  );
};

// Also export CharacterSprites as CharacterPortrait for backward compatibility
export const CharacterSprites = CharacterPortrait;
