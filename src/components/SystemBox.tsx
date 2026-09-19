'use client';

import React, { useState } from 'react';
import { SystemBoxData } from '@/types/game';
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';
import { sound } from '@/utils/audio';

interface SystemBoxProps {
  data: SystemBoxData;
}

const ProgressBarItem: React.FC<{ progress: number; color?: string }> = ({ progress, color }) => {
  const animatedProgress = useAnimatedNumber(Math.min(100, Math.max(0, progress)), 700);

  const barColor = color === 'red' ? '#f7768e' : color === 'pink' ? '#bb9af7' : '#7aa2f7';

  return (
    <div style={{ marginTop: '2px' }}>
      <div style={{
        height: '5px',
        background: 'rgba(19, 22, 34, 0.85)',
        border: '1px solid rgba(59, 66, 97, 0.8)',
        borderRadius: '1px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{
          height: '100%',
          width: `${animatedProgress}%`,
          background: barColor,
          boxShadow: `0 0 6px ${barColor}`,
          transition: 'width 0.1s linear',
        }} />
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        fontSize: '0.48rem',
        color: '#7aa2f7',
        marginTop: '1px',
      }}>
        {animatedProgress}%
      </div>
    </div>
  );
};

export const SystemBox: React.FC<SystemBoxProps> = ({ data }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const headerColor = data.accentColor === 'pink'
    ? '#f7768e'
    : data.accentColor === 'green'
      ? '#73daca'
      : data.accentColor === 'amber'
        ? '#e0af68'
        : '#7aa2f7';

  const borderColor = data.accentColor === 'pink'
    ? 'rgba(247, 118, 142, 0.45)'
    : data.accentColor === 'green'
      ? 'rgba(115, 218, 202, 0.45)'
      : data.accentColor === 'amber'
        ? 'rgba(224, 175, 104, 0.45)'
        : 'rgba(122, 162, 247, 0.45)';

  const handleToggleCollapse = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    setIsCollapsed(prev => !prev);
  };

  // Minimized Mode: Ultra-compact, unobtrusive cyber status pill
  if (isCollapsed) {
    return (
      <div
        onClick={handleToggleCollapse}
        title="Klik untuk membuka System Log"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 10px',
          background: 'rgba(10, 14, 26, 0.75)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: `1.5px solid ${borderColor}`,
          borderRadius: '2px',
          fontFamily: 'var(--font-pixel)',
          fontSize: '0.56rem',
          color: headerColor,
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(18, 24, 42, 0.9)';
          e.currentTarget.style.borderColor = headerColor;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(10, 14, 26, 0.75)';
          e.currentTarget.style.borderColor = borderColor;
        }}
      >
        <span style={{ fontSize: '0.7rem' }}>⚡</span>
        <span style={{ letterSpacing: '0.5px' }}>[{data.title}]</span>
        <span style={{
          color: '#565f89',
          fontSize: '0.50rem',
          borderLeft: '1px solid #3b4261',
          paddingLeft: '6px',
        }}>
          [+] BUKA
        </span>
      </div>
    );
  }

  // Expanded Mode: Slim, transparent glassmorphism cyber panel (no clipping, no obscuring)
  return (
    <div
      style={{
        width: '270px',
        background: 'rgba(10, 14, 26, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: '10px 12px',
        border: `1.5px solid ${borderColor}`,
        borderRadius: '3px',
        fontFamily: 'var(--font-pixel)',
        boxShadow: `0 6px 20px rgba(0, 0, 0, 0.5), inset 0 0 12px ${borderColor.replace('0.45', '0.08')}`,
        transition: 'all 0.25s ease',
      }}
    >
      {/* Title Header with Collapse Toggle */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `1px dashed ${borderColor}`,
        paddingBottom: '6px',
        marginBottom: '8px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            fontSize: '0.60rem',
            color: headerColor,
            letterSpacing: '0.8px',
          }}>
            [{data.title}]
          </span>
        </div>

        <button
          onClick={handleToggleCollapse}
          title="Sembunyikan panel data"
          style={{
            background: 'rgba(30, 36, 56, 0.6)',
            border: '1px solid rgba(122, 162, 247, 0.3)',
            borderRadius: '2px',
            color: '#9aa5ce',
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.48rem',
            padding: '2px 5px',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.borderColor = headerColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#9aa5ce';
            e.currentTarget.style.borderColor = 'rgba(122, 162, 247, 0.3)';
          }}
        >
          [-] HIDE
        </button>
      </div>

      {/* Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {data.lines.map((line, idx) => (
          <div key={idx} style={{ fontSize: '0.54rem', lineHeight: 1.3 }}>
            {line.label && (
              <div style={{ color: '#7aa2f7', fontSize: '0.50rem', marginBottom: '1px', opacity: 0.85 }}>
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
