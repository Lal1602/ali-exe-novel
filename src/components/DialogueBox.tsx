'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { sound } from '@/utils/audio';

interface DialogueBoxProps {
  speaker?: string;
  speakerTitle?: string;
  speakerAvatar?: 'ali' | 'cegil' | null;
  textType?: 'dialogue' | 'inner-monologue' | 'narration';
  text: string;
  narration?: string[];
  onComplete: () => void;
  canAdvance?: boolean;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  speaker,
  speakerTitle,
  speakerAvatar,
  textType = 'dialogue',
  text,
  narration,
  onComplete,
  canAdvance = true,
}) => {
  const fullText = text;
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isAli = speaker === 'Ali' || speakerAvatar === 'ali';
  const isCegil = speaker === 'Cegil' || speakerAvatar === 'cegil';
  const isInner = textType === 'inner-monologue';
  const characterType: 'cegil' | 'ali' | 'inner' | 'system' = isCegil
    ? 'cegil'
    : isAli
    ? 'ali'
    : isInner
    ? 'inner'
    : 'system';

  // Restart typewriter whenever text changes
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let index = 0;

    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
    }

    const typingSpeed = 26; // 26ms per character gives authentic visual novel reading rhythm

    typingTimerRef.current = setInterval(() => {
      index++;
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        const char = fullText[index - 1];
        const isWhitespace = !char || char === ' ' || char === '\n' || char === '\t';

        // Play authentic character speech blip on syllables/letters, skipping spaces
        if (!isWhitespace && (index % 2 === 1 || char === '.' || char === '!' || char === '?')) {
          sound.playTypewriterBlip(characterType);
        }
      } else {
        setIsTyping(false);
        if (typingTimerRef.current) {
          clearInterval(typingTimerRef.current);
          typingTimerRef.current = null;
        }
      }
    }, typingSpeed);

    return () => {
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
      }
    };
  }, [fullText, characterType]);

  const handleAdvance = useCallback(() => {
    sound.initContext();
    if (!canAdvance && !isTyping) return;

    if (isTyping) {
      // User pressed Space/clicked while typing -> instantly reveal text
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
      setDisplayedText(fullText);
      setIsTyping(false);
      sound.playTextSkip();
    } else {
      // User pressed Space/clicked when text is finished -> advance to next dialogue line!
      sound.playDialogueAdvance();
      onComplete();
    }
  }, [canAdvance, isTyping, fullText, onComplete]);

  // Spacebar and Enter shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        sound.initContext();
        handleAdvance();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleAdvance]);

  // Common fixed-size container style (never expands/shrinks, never covers characters)
  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '16px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'calc(100% - 64px)',
    maxWidth: '1040px',
    height: '200px', // Strict constant height!
    minHeight: '200px',
    maxHeight: '200px',
    zIndex: 40,
    cursor: canAdvance ? 'pointer' : 'default',
    boxSizing: 'border-box',
  };

  const isNarration = textType === 'narration' || speaker === 'Narator' || speaker === 'System';

  // Mode 2: Inner-Monologue (Kata Hati) — No quotes, lavender italic, dashed border
  if (isInner) {
    return (
      <div onClick={handleAdvance} style={containerStyle}>
        <div
          className="pixel-box dialogue-box-inner"
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '16px 24px',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.65rem',
            color: '#bb9af7',
            letterSpacing: '1px',
            flexShrink: 0,
            marginBottom: '6px',
          }}>
            <span>♡ KATA HATI CEGIL</span>
          </div>

          {/* Body */}
          <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
              fontSize: '1.05rem',
              lineHeight: 1.6,
              color: '#e0def4',
              fontWeight: 400,
            }}>
              {displayedText}
              {isTyping && <span className="blink" style={{ color: '#bb9af7' }}>▋</span>}
            </div>

            {!isTyping && narration && narration.length > 0 && (
              <div style={{
                marginTop: '10px',
                paddingTop: '8px',
                borderTop: '1px dashed rgba(187, 154, 247, 0.25)',
                fontSize: '0.88rem',
                color: '#9aa5ce',
                lineHeight: 1.5,
              }}>
                {narration.map((para, i) => (
                  <p key={i} style={{ marginBottom: '4px' }}>{para}</p>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.58rem',
            color: '#bb9af7',
            letterSpacing: '1px',
            flexShrink: 0,
            marginTop: '4px',
          }}>
            {canAdvance && !isTyping && (
              <span className="blink">TEKAN [SPACE] / KLIK UNTUK LANJUT ▶</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Mode 3: Narration (Narator / System)
  if (isNarration) {
    return (
      <div onClick={handleAdvance} style={containerStyle}>
        <div
          className="pixel-box dialogue-box-narration"
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '16px 24px',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px dashed #2ac3de',
            paddingBottom: '6px',
            marginBottom: '8px',
            fontSize: '0.65rem',
            color: '#4deeea',
            letterSpacing: '1px',
            flexShrink: 0,
          }}>
            <span>╔══ [ {speaker || 'NARASI'} ] ══╗</span>
            <span style={{ fontSize: '0.52rem', color: '#565f89' }}>TERMINAL_ACTIVE</span>
          </div>

          {/* Body */}
          <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
            <div style={{
              fontSize: '0.85rem',
              lineHeight: 1.6,
              color: '#73daca',
              whiteSpace: 'pre-line',
              letterSpacing: '0.4px',
            }}>
              {displayedText}
              {isTyping && <span className="blink" style={{ color: '#4deeea' }}>▋</span>}
            </div>

            {!isTyping && narration && narration.length > 0 && (
              <div style={{
                marginTop: '8px',
                paddingTop: '6px',
                borderTop: '1px solid #1f2335',
                fontSize: '0.78rem',
                color: '#c0caf5',
                lineHeight: 1.5,
                fontFamily: 'var(--font-body)',
              }}>
                {narration.map((para, i) => (
                  <p key={i} style={{ marginBottom: '4px' }}>{para}</p>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            fontSize: '0.55rem',
            color: '#4deeea',
            letterSpacing: '1px',
            flexShrink: 0,
            marginTop: '4px',
          }}>
            {canAdvance && !isTyping && (
              <span className="blink">TEKAN [SPACE] / KLIK UNTUK LANJUT ▶</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Mode 1: Spoken Dialogue — Dialogue actually spoken out loud with quotes ""
  const boxClass = isCegil ? 'dialogue-box-chat dialogue-box-chat-cegil' : 'dialogue-box-chat';

  return (
    <div onClick={handleAdvance} style={containerStyle}>
      <div
        className={`pixel-box ${boxClass}`}
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '16px 24px',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        {/* Header with speaker badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'var(--font-pixel)',
          fontSize: '0.72rem',
          color: isCegil ? '#f7768e' : isAli ? '#7aa2f7' : '#e2e8f0',
          textShadow: '0 0 8px currentColor',
          flexShrink: 0,
          marginBottom: '6px',
        }}>
          <span style={{
            background: isCegil ? 'rgba(247, 118, 142, 0.15)' : 'rgba(122, 162, 247, 0.15)',
            border: `1px solid ${isCegil ? '#f7768e' : '#7aa2f7'}`,
            padding: '2px 8px',
            borderRadius: '3px',
            letterSpacing: '1px',
          }}>
            [{isCegil ? 'CEGIL' : isAli ? 'ALI' : (speaker || 'DIALOG')}]
          </span>
          {speakerTitle && (
            <span style={{
              fontSize: '0.52rem',
              color: '#94a3b8',
              background: '#1f2335',
              padding: '2px 6px',
              borderRadius: '2px',
              textShadow: 'none',
            }}>
              {speakerTitle}
            </span>
          )}
        </div>

        {/* Body */}
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
          <div style={{
            fontSize: '1.02rem',
            lineHeight: 1.6,
            color: '#ffffff',
            whiteSpace: 'pre-line',
            fontWeight: 500,
            letterSpacing: '0.2px',
          }}>
            {displayedText}
            {isTyping && <span className="blink" style={{ color: '#4deeea' }}>▋</span>}
          </div>

          {!isTyping && narration && narration.length > 0 && (
            <div style={{
              marginTop: '8px',
              paddingTop: '6px',
              borderTop: '1px dashed #2e3440',
              fontSize: '0.85rem',
              color: '#94a3b8',
              lineHeight: 1.5,
              fontStyle: 'italic',
            }}>
              {narration.map((para, i) => (
                <p key={i} style={{ marginBottom: '4px' }}>{para}</p>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          fontFamily: 'var(--font-pixel)',
          fontSize: '0.58rem',
          color: '#4deeea',
          letterSpacing: '1px',
          flexShrink: 0,
          marginTop: '4px',
        }}>
          {canAdvance && !isTyping && (
            <span className="blink">TEKAN [SPACE] / KLIK UNTUK LANJUT ▶</span>
          )}
        </div>
      </div>
    </div>
  );
};
