'use client';

import React from 'react';
import { TransitionType } from '@/types/game';

export type TransitionPhase = 'idle' | 'closing' | 'covered' | 'opening';

interface SceneTransitionProps {
  type: TransitionType;
  phase?: TransitionPhase;
  // Backwards compatibility props
  isActive?: boolean;
  duration?: number;
  onFinished?: () => void;
}

export const SceneTransition: React.FC<SceneTransitionProps> = ({
  type,
  phase = 'idle',
  duration = 320,
}) => {
  if (phase === 'idle') return null;

  if (type === 'fade-black') {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#000000',
          zIndex: 99,
          pointerEvents: 'none',
          animation:
            phase === 'closing'
              ? `fadeToBlackClose ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`
              : phase === 'opening'
                ? `fadeToBlackOpen ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`
                : undefined,
          opacity: phase === 'covered' ? 1 : undefined,
        }}
      />
    );
  }

  if (type === 'wipe-right') {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#070913',
          zIndex: 99,
          pointerEvents: 'none',
          animation:
            phase === 'closing'
              ? `wipeRightClose ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`
              : phase === 'opening'
                ? `wipeRightOpen ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`
                : undefined,
          clipPath:
            phase === 'covered'
              ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
              : undefined,
        }}
      />
    );
  }

  if (type === 'flash-white') {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#ffffff',
          zIndex: 99,
          pointerEvents: 'none',
          animation:
            phase === 'closing'
              ? `flashWhiteClose 250ms ease-in forwards`
              : phase === 'opening'
                ? `flashWhiteOpen ${duration}ms ease-out forwards`
                : undefined,
          opacity: phase === 'covered' ? 1 : undefined,
        }}
      />
    );
  }

  if (type === 'glitch') {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99,
          backgroundColor: phase === 'covered' ? '#070913' : 'rgba(7, 9, 19, 0.96)',
          animation:
            phase === 'closing'
              ? `fadeToBlackClose ${duration}ms ease-out forwards`
              : phase === 'opening'
                ? `fadeToBlackOpen ${duration}ms ease-out forwards`
                : undefined,
          backdropFilter: 'invert(0.2) contrast(1.4)',
          pointerEvents: 'none',
        }}
      />
    );
  }

  // Default fallback (fade-black)
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#000000',
        zIndex: 99,
        pointerEvents: 'none',
        opacity: phase === 'covered' ? 1 : undefined,
        animation:
          phase === 'closing'
            ? `fadeToBlackClose ${duration}ms forwards`
            : phase === 'opening'
              ? `fadeToBlackOpen ${duration}ms forwards`
              : undefined,
      }}
    />
  );
};
