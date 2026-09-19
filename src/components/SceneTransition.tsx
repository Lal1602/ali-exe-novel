'use client';

import React, { useEffect, useState } from 'react';
import { TransitionType } from '@/types/game';

interface SceneTransitionProps {
  type: TransitionType;
  isActive: boolean;
  duration?: number;
  onFinished?: () => void;
}

export const SceneTransition: React.FC<SceneTransitionProps> = ({
  type,
  isActive,
  duration = 600,
  onFinished,
}) => {
  const [render, setRender] = useState(isActive);

  useEffect(() => {
    if (isActive) {
      setRender(true);
      const timer = setTimeout(() => {
        if (onFinished) onFinished();
        setRender(false);
      }, duration);
      return () => clearTimeout(timer);
    } else {
      setRender(false);
    }
  }, [isActive, duration, onFinished]);

  if (!render) return null;

  if (type === 'fade-black') {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#000000',
          zIndex: 90,
          animation: `fadeToBlackIn ${duration / 2}ms ease-out alternate 2`,
          pointerEvents: 'none',
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
          zIndex: 90,
          animation: `wipeRightIn ${duration}ms cubic-bezier(0.65, 0, 0.35, 1) forwards`,
          pointerEvents: 'none',
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
          zIndex: 95,
          animation: `flashWhiteIn ${duration}ms ease-out forwards`,
          pointerEvents: 'none',
        }}
      />
    );
  }

  if (type === 'vignette-pulse') {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 90,
          animation: `vignettePulseIn ${duration}ms ease-in-out forwards`,
          pointerEvents: 'none',
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
          zIndex: 90,
          backgroundColor: 'rgba(77, 238, 234, 0.15)',
          animation: `glitchPixelEffect ${duration}ms steps(4) forwards`,
          backdropFilter: 'invert(0.2) contrast(1.4)',
          pointerEvents: 'none',
        }}
      />
    );
  }

  return null;
};
