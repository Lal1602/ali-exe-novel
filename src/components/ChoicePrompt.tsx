'use client';

import React, { useState } from 'react';
import { ChoiceOption } from '@/types/game';
import { sound } from '@/utils/audio';

interface ChoicePromptProps {
  choices: ChoiceOption[];
  onSelect: (choice: ChoiceOption) => void;
}

export const ChoicePrompt: React.FC<ChoicePromptProps> = ({ choices, onSelect }) => {
  const [selected, setSelected] = useState<ChoiceOption | null>(null);

  const handleChoose = (choice: ChoiceOption) => {
    sound.playClick();
    setSelected(choice);
  };

  const handleProceed = () => {
    if (selected) {
      sound.playAffectionChime();
      onSelect(selected);
    }
  };

  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 45,
      width: '90%',
      maxWidth: '680px',
    }}>
      <div className="pixel-box pixel-box-glow-cyan" style={{
        padding: '24px',
        background: 'rgba(15, 18, 30, 0.96)',
        border: '3px solid #7aa2f7',
      }}>
        <div style={{
          fontFamily: 'var(--font-pixel)',
          fontSize: '0.75rem',
          color: '#7aa2f7',
          marginBottom: '16px',
          letterSpacing: '1px',
          textAlign: 'center',
        }}>
          [ PILIHAN RESPONS ALI ]
        </div>

        {!selected ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {choices.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => handleChoose(c)}
                className="pixel-btn"
                style={{
                  padding: '14px 18px',
                  textAlign: 'left',
                  justifyContent: 'flex-start',
                  fontSize: '0.78rem',
                  lineHeight: 1.4,
                  border: '2px solid #3b4261',
                  color: '#e2e8f0',
                }}
              >
                <span style={{ color: '#4deeea', marginRight: '8px' }}>
                  [{String.fromCharCode(65 + idx)}]
                </span>
                {c.text}
              </button>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <div style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.8rem',
              color: '#ffe600',
              marginBottom: '12px',
            }}>
              PILIHANMU: {selected.text}
            </div>
            <p style={{
              fontSize: '0.98rem',
              color: '#c0caf5',
              lineHeight: 1.6,
              marginBottom: '20px',
              fontStyle: 'italic',
            }}>
              {selected.reaction}
            </p>
            <button
              onClick={handleProceed}
              className="pixel-btn pixel-btn-primary"
              style={{ fontSize: '0.75rem', padding: '12px 24px' }}
            >
              LANJUTKAN CERITA ▶
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
