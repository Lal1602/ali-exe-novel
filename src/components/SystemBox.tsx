'use client';

import React from 'react';
import { SystemBoxData } from '@/types/game';
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';

interface SystemBoxProps {
  data: SystemBoxData;
}

const ProgressBarItem: React.FC<{ progress: number; color?: string }> = ({ progress, color }) => {
  const animatedProgress = useAnimatedNumber(Math.min(100, Math.max(0, progress)), 700);

  const barColor = color === 'red' ? '#f7768e' : color === 'pink' ? '#bb9af7' : '#7aa2f7';

  return (
    <div style={{ marginTop: '4px' }}>
      <div style={{
        height: '8px',
        background: '#131622',
        border: '1px solid #3b4261',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{
          height: '100%',
          width: `${animatedProgress}%`,
          background: barColor,
          boxShadow: `0 0 8px ${barColor}`,
          transition: 'width 0.1s linear',
        }} />
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        fontSize: '0.52rem',
        color: '#565f89',
        marginTop: '2px',
      }}>
        {animatedProgress}%
      </div>
    </div>
  );
};

export const SystemBox: React.FC<SystemBoxProps> = ({ data }) => {
  const glowClass = data.accentColor === 'pink' 
    ? 'pixel-box-glow-pink' 
    : data.accentColor === 'green'
      ? 'pixel-box-glow-green'
      : data.accentColor === 'amber'
        ? 'pixel-box-glow-amber'
        : 'pixel-box-glow-cyan';

  const headerColor = data.accentColor === 'pink'
    ? '#f7768e'
    : data.accentColor === 'green'
      ? '#73daca'
      : data.accentColor === 'amber'
        ? '#e0af68'
        : '#7aa2f7';

  return (
    <div
      className={`pixel-box ${glowClass}`}
      style={{
        width: '380px',
        background: 'rgba(16, 20, 32, 0.95)',
        padding: '16px',
        border: '3px solid #3b4261',
        fontFamily: 'var(--font-pixel)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
      }}
    >
      {/* Title Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '2px dashed #3b4261',
        paddingBottom: '8px',
        marginBottom: '12px',
      }}>
        <span style={{
          fontSize: '0.68rem',
          color: headerColor,
          letterSpacing: '1px',
        }}>
          [{data.title}]
        </span>
        <span style={{ fontSize: '0.55rem', color: '#565f89' }}>SYS_LOG</span>
      </div>

      {/* Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {data.lines.map((line, idx) => (
          <div key={idx} style={{ fontSize: '0.62rem', lineHeight: 1.4 }}>
            {line.label && (
              <div style={{ color: '#9aa5ce', marginBottom: '3px' }}>
                {line.label}:
              </div>
            )}
            <div style={{
              color: line.color === 'red' ? '#f7768e' : line.color === 'pink' ? '#bb9af7' : '#c0caf5',
              fontWeight: 'bold',
            }}>
              {line.value}
            </div>

            {/* Optional Animated Progress Bar */}
            {typeof line.progress === 'number' && (
              <ProgressBarItem progress={line.progress} color={line.color} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
