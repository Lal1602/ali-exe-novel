'use client';

import React from 'react';
import { GameLocation } from '@/types/game';

interface AmbientElementsProps {
  location: GameLocation;
}

export const AmbientElements: React.FC<AmbientElementsProps> = ({ location }) => {
  if (location === 'kantor') {
    return (
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 12 }}>
        {/* Subtle office fluorescent buzz & dust */}
        {[
          { top: '25%', left: '30%', delay: '0s' },
          { top: '45%', left: '70%', delay: '1.5s' },
          { top: '65%', left: '40%', delay: '2.5s' },
          { top: '80%', left: '85%', delay: '0.8s' },
        ].map((p, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: p.top,
              left: p.left,
              width: '3px',
              height: '3px',
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              boxShadow: '0 0 6px rgba(255, 255, 255, 0.5)',
              animation: `starFloat 6s infinite ease-in-out ${p.delay}`,
            }}
          />
        ))}
      </div>
    );
  }

  if (location === 'cafe-little-cave') {
    return (
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 12 }}>
        {/* Warm cafe amber particles & coffee steam embers */}
        {[
          { top: '30%', left: '20%', delay: '0s' },
          { top: '50%', left: '55%', delay: '1.2s' },
          { top: '70%', left: '35%', delay: '2.1s' },
          { top: '40%', left: '80%', delay: '0.5s' },
          { top: '60%', left: '15%', delay: '2.8s' },
        ].map((p, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: p.top,
              left: p.left,
              width: '4px',
              height: '4px',
              backgroundColor: '#ffb86c',
              boxShadow: '0 0 8px #ffb86c',
              animation: `starFloat 5s infinite ease-in-out ${p.delay}`,
            }}
          />
        ))}
      </div>
    );
  }

  if (location === 'tropodo') {
    return (
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 12 }}>
        {/* Warm home afternoon sunlight motes */}
        {[
          { top: '20%', left: '45%', delay: '0s' },
          { top: '40%', left: '25%', delay: '1.7s' },
          { top: '60%', left: '75%', delay: '0.9s' },
          { top: '75%', left: '30%', delay: '2.4s' },
        ].map((p, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: p.top,
              left: p.left,
              width: '4px',
              height: '4px',
              backgroundColor: '#ffeaa7',
              boxShadow: '0 0 10px #ffeaa7',
              animation: `starFloat 7s infinite ease-in-out ${p.delay}`,
            }}
          />
        ))}
      </div>
    );
  }

  if (location === 'malang') {
    return (
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 12 }}>
        {/* Mountain night stars & sparkling lights */}
        {[
          { top: '15%', left: '15%', delay: '0s' },
          { top: '25%', left: '85%', delay: '1.1s' },
          { top: '35%', left: '45%', delay: '2.2s' },
          { top: '45%', left: '70%', delay: '0.7s' },
          { top: '10%', left: '60%', delay: '1.9s' },
          { top: '55%', left: '25%', delay: '2.9s' },
        ].map((p, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: p.top,
              left: p.left,
              width: '3px',
              height: '3px',
              backgroundColor: '#4deeea',
              boxShadow: '0 0 10px #4deeea, 0 0 20px #bb9af7',
              animation: `starFloat 4.5s infinite ease-in-out ${p.delay}`,
            }}
          />
        ))}
      </div>
    );
  }

  // system-void
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 12 }}>
      {[
        { top: '10%', left: '20%', delay: '0s' },
        { top: '30%', left: '75%', delay: '1s' },
        { top: '50%', left: '40%', delay: '2s' },
        { top: '70%', left: '85%', delay: '0.5s' },
      ].map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: p.top,
            left: p.left,
            width: '2px',
            height: '14px',
            backgroundColor: '#4deeea',
            opacity: 0.6,
            boxShadow: '0 0 8px #4deeea',
            animation: `starFloat 3s infinite linear ${p.delay}`,
          }}
        />
      ))}
    </div>
  );
};
