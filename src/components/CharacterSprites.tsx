'use client';

import React from 'react';
import Image from 'next/image';

interface CharacterSpritesProps {
  speaker?: string;
  speakerAvatar?: 'ali' | 'cegil' | null;
  textType?: 'dialogue' | 'inner-monologue' | 'narration';
  location?: string;
}

export const CharacterSprites: React.FC<CharacterSpritesProps> = ({
  speaker,
  speakerAvatar,
  textType = 'dialogue',
}) => {
  const isSpokenDialogue = textType === 'dialogue' && speaker !== 'Narator' && speaker !== 'System';
  const isAliSpeaking = isSpokenDialogue && (speaker === 'Ali' || speakerAvatar === 'ali');
  const isCegilSpeaking = isSpokenDialogue && !isAliSpeaking && (speaker === 'Cegil' || speakerAvatar === 'cegil');

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '224px', // Sits cleanly ABOVE the fixed 200px dialogue box (bottom: 16px + height: 200px = 216px)
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 64px)',
        maxWidth: '1040px',
        height: '210px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        pointerEvents: 'none',
        zIndex: 25,
      }}
    >
      {/* Cegil Sprite (Left) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
          transform: isCegilSpeaking ? 'translateY(-6px) scale(1.03)' : 'translateY(0) scale(1)',
          filter: isCegilSpeaking
            ? 'brightness(1.12) contrast(1.08) drop-shadow(0 0 16px rgba(247, 118, 142, 0.6))'
            : isSpokenDialogue && isAliSpeaking
              ? 'brightness(0.42) grayscale(0.35)'
              : 'brightness(0.68) contrast(0.95)', // Calm neutral ambient when narrator or kata hati
          opacity: 1,
        }}
      >
        {/* Nameplate only appears when speaking out loud */}
        {isCegilSpeaking && (
          <div
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.62rem',
              color: '#f7768e',
              background: 'rgba(26, 27, 38, 0.95)',
              border: '2px solid #f7768e',
              padding: '3px 10px',
              borderRadius: '2px',
              marginBottom: '6px',
              boxShadow: '0 0 10px rgba(247, 118, 142, 0.5)',
              animation: 'spriteBounce 0.25s ease-out',
            }}
          >
            CEGIL
          </div>
        )}

        {/* Bust Frame */}
        <div
          style={{
            width: '165px',
            height: '190px',
            position: 'relative',
            border: isCegilSpeaking ? '3px solid #f7768e' : '2px solid #3b4261',
            borderRadius: '4px 4px 0 0',
            overflow: 'hidden',
            backgroundColor: '#1a1b26',
            boxShadow: isCegilSpeaking ? '0 0 16px rgba(247, 118, 142, 0.4)' : 'none',
          }}
        >
          <Image
            src="/assets/portrait-cegil-glasses.jpg"
            alt="Cegil Bust"
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center top',
            }}
          />
        </div>
      </div>

      {/* Ali Sprite (Right) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
          transform: isAliSpeaking ? 'translateY(-6px) scale(1.03)' : 'translateY(0) scale(1)',
          filter: isAliSpeaking
            ? 'brightness(1.12) contrast(1.08) drop-shadow(0 0 16px rgba(122, 162, 247, 0.6))'
            : isSpokenDialogue && isCegilSpeaking
              ? 'brightness(0.42) grayscale(0.35)'
              : 'brightness(0.68) contrast(0.95)', // Calm neutral ambient when narrator or kata hati
          opacity: 1,
        }}
      >
        {/* Nameplate only appears when speaking out loud */}
        {isAliSpeaking && (
          <div
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.62rem',
              color: '#7aa2f7',
              background: 'rgba(26, 27, 38, 0.95)',
              border: '2px solid #7aa2f7',
              padding: '3px 10px',
              borderRadius: '2px',
              marginBottom: '6px',
              boxShadow: '0 0 10px rgba(122, 162, 247, 0.5)',
              animation: 'spriteBounce 0.25s ease-out',
            }}
          >
            ALI
          </div>
        )}

        {/* Bust Frame */}
        <div
          style={{
            width: '165px',
            height: '190px',
            position: 'relative',
            border: isAliSpeaking ? '3px solid #7aa2f7' : '2px solid #3b4261',
            borderRadius: '4px 4px 0 0',
            overflow: 'hidden',
            backgroundColor: '#1a1b26',
            boxShadow: isAliSpeaking ? '0 0 16px rgba(122, 162, 247, 0.4)' : 'none',
          }}
        >
          <Image
            src="/assets/portrait-ali-glasses.jpg"
            alt="Ali Bust"
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center top',
            }}
          />
        </div>
      </div>
    </div>
  );
};
