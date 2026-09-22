'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { STORY_NODES } from '@/data/scenes';
import { StoryNode, ChoiceOption, TransitionType, DialogueLogEntry } from '@/types/game';
import { sound } from '@/utils/audio';
import { saveGameState, loadGameState, clearGameState } from '@/utils/storage';
import { prefetchNextSceneAssets } from '@/utils/preloader';
import { AffectionHUD } from './AffectionHUD';
import { DialogueBox } from './DialogueBox';
import { SystemBox } from './SystemBox';
import { ChoicePrompt } from './ChoicePrompt';
import { MemoryInvestigation } from './MemoryInvestigation';
import { QuizScreen } from './QuizScreen';
import { InnerChildUnlock } from './InnerChildUnlock';
import { SaveScreen } from './SaveScreen';
import { CreditsScreen } from './CreditsScreen';
import { SceneTransition, TransitionPhase } from './SceneTransition';
import { ChapterCard } from './ChapterCard';
import { CharacterPortrait } from './CharacterSprites';
import { AmbientElements } from './AmbientElements';
import { AffectionToast } from './AffectionToast';
import { NowPlayingToast } from './NowPlayingToast';
import { DialogueHistoryModal } from './DialogueHistoryModal';

// Mini-game interactions
import { CoffeeOrderPuzzle } from './interactions/CoffeeOrderPuzzle';
import { JealousyMiniGame } from './interactions/JealousyMiniGame';
import { DraftMessagePicker } from './interactions/DraftMessagePicker';
import { CafeExploration } from './interactions/CafeExploration';
import { ChatTapper } from './interactions/ChatTapper';
import { MalangExploration } from './interactions/MalangExploration';
import { EvidenceBoard } from './interactions/EvidenceBoard';

// Helper to resolve fallback background from location
const getDefaultBg = (location?: string) => {
  switch (location) {
    case 'kantor':
      return '/assets/bg-kantor.jpg';
    case 'cafe-little-cave':
      return '/assets/bg-cafe.jpg';
    case 'tropodo':
      return '/assets/bg-tropodo.jpg';
    case 'malang':
      return '/assets/bg-malang.jpg';
    default:
      return null;
  }
};

interface GameContainerProps {
  continueFromSave?: boolean;
  onReturnToTitle?: () => void;
}

export const GameContainer: React.FC<GameContainerProps> = ({ continueFromSave = false, onReturnToTitle }) => {
  const [currentNodeId, setCurrentNodeId] = useState<string>('boot-init');
  const [affection, setAffection] = useState<number>(0);
  const [prevAffection, setPrevAffection] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | undefined>(undefined);
  const [showToast, setShowToast] = useState<boolean>(false);

  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasStartedAudio, setHasStartedAudio] = useState<boolean>(false);

  // Background image loading error state & retry counter
  const [imageError, setImageError] = useState<boolean>(false);
  const [imageRetryKey, setImageRetryKey] = useState<number>(0);

  // Transition state machine
  const [transitionType, setTransitionType] = useState<TransitionType>('fade-black');
  const [transitionPhase, setTransitionPhase] = useState<TransitionPhase>('idle');

  // Chapter card state
  const [showChapterCard, setShowChapterCard] = useState<boolean>(false);
  const chapterSeenRef = useRef<Set<string>>(new Set());

  // Dialogue backlog history & log modal
  const [dialogueHistory, setDialogueHistory] = useState<DialogueLogEntry[]>([]);
  const [showLogModal, setShowLogModal] = useState<boolean>(false);

  // Now Playing music track notification
  const [nowPlayingMood, setNowPlayingMood] = useState<string | null>(null);
  const [showNowPlaying, setShowNowPlaying] = useState<boolean>(false);
  const prevMoodRef = useRef<string | null>(null);

  // Restore game state from localStorage if continueFromSave was selected
  useEffect(() => {
    if (continueFromSave) {
      const saved = loadGameState();
      if (saved && STORY_NODES[saved.currentNodeId]) {
        setCurrentNodeId(saved.currentNodeId);
        setAffection(saved.affection ?? 0);
        setPrevAffection(saved.prevAffection ?? 0);
        if (Array.isArray(saved.chapterSeen)) {
          saved.chapterSeen.forEach((id) => chapterSeenRef.current.add(id));
        }
        if (Array.isArray(saved.dialogueHistory)) {
          setDialogueHistory(saved.dialogueHistory);
        }
        if (typeof saved.isMuted === 'boolean' && saved.isMuted !== sound.getMuted()) {
          sound.toggleMute();
          setIsMuted(saved.isMuted);
        }
      }
    }
  }, [continueFromSave]);

  const currentNode: StoryNode = STORY_NODES[currentNodeId] || STORY_NODES['boot-init'];

  // Record dialogue entries to backlog history
  useEffect(() => {
    if (currentNode && currentNode.text && currentNodeId !== 'boot-init') {
      setDialogueHistory((prev) => {
        const last = prev[prev.length - 1];
        if (last && last.id === currentNode.id) return prev;
        return [
          ...prev,
          {
            id: currentNode.id,
            speaker: currentNode.speaker,
            speakerTitle: currentNode.speakerTitle,
            speakerAvatar: currentNode.speakerAvatar,
            textType: currentNode.textType,
            text: currentNode.text,
            narration: currentNode.narration,
            location: currentNode.location,
            phase: currentNode.phase,
          },
        ];
      });
    }
  }, [currentNode, currentNodeId]);

  // Auto-Save progress to localStorage whenever scene, affection, or dialogueHistory changes
  useEffect(() => {
    if (currentNodeId && currentNodeId !== 'boot-init') {
      const node = STORY_NODES[currentNodeId];
      if (node) {
        saveGameState({
          currentNodeId,
          affection,
          prevAffection,
          chapterSeen: Array.from(chapterSeenRef.current),
          isMuted,
          timestamp: Date.now(),
          location: node.location,
          phase: node.phase,
          previewTitle: node.chapterMeta?.title
            ? `${node.chapterMeta.title}: ${node.chapterMeta.subtitle}`
            : (node.location || 'Surabaya').toUpperCase(),
          dialogueHistory,
        });
      }
    }
  }, [currentNodeId, affection, prevAffection, isMuted, dialogueHistory]);

  // Speculative asset prefetching for upcoming scene while player is reading current dialogue
  useEffect(() => {
    if (currentNode.onNext) {
      const nextNode = STORY_NODES[currentNode.onNext];
      if (nextNode) {
        const nextBg = nextNode.bgImage || getDefaultBg(nextNode.location);
        if (nextBg) prefetchNextSceneAssets(nextBg);
      }
    }
  }, [currentNode]);

  // Start audio on first user click
  const ensureAudio = useCallback(() => {
    if (!hasStartedAudio) {
      setHasStartedAudio(true);
      sound.startBGM(currentNode.bgmMood || 'ambient');
    }
  }, [hasStartedAudio, currentNode.bgmMood]);

  // Sync BGM mood when scene changes & trigger NowPlaying toast
  useEffect(() => {
    if (currentNode.bgmMood) {
      sound.setMood(currentNode.bgmMood);
      if (prevMoodRef.current !== currentNode.bgmMood) {
        prevMoodRef.current = currentNode.bgmMood;
        setNowPlayingMood(currentNode.bgmMood);
        setShowNowPlaying(true);
      }
    }
  }, [currentNode.bgmMood]);

  // Check if node is chapter start on initial load
  useEffect(() => {
    if (currentNode.isChapterStart && currentNode.chapterMeta && !chapterSeenRef.current.has(currentNode.id)) {
      chapterSeenRef.current.add(currentNode.id);
      setShowChapterCard(true);
    }
  }, [currentNode]);

  // Keyboard shortcut: Press L to toggle Dialogue Backlog History Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'l' || e.key === 'L') {
        const isModalOpen =
          currentNode.isMemoryHub ||
          currentNode.isQuiz ||
          currentNode.isInnerChildUnlock ||
          Boolean(currentNode.choices) ||
          Boolean(currentNode.interactionType) ||
          currentNode.phase === 'save-screen' ||
          currentNode.phase === 'credits' ||
          showChapterCard;

        if (!isModalOpen) {
          sound.playClick();
          setShowLogModal((prev) => !prev);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentNode, showChapterCard]);

  // Handle special effects (confetti, heartburst)
  useEffect(() => {
    if (currentNode.specialEffect === 'confetti') {
      sound.playFanfare();
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#f7768e', '#7aa2f7', '#73daca', '#ffe600', '#bb9af7'],
      });
    } else if (currentNode.specialEffect === 'heartburst') {
      sound.playAffectionChime();
      confetti({
        particleCount: 100,
        spread: 110,
        origin: { y: 0.5 },
        shapes: ['circle'],
        colors: ['#ff3864', '#f000ff', '#ff9e64', '#ffffff'],
      });
    }
  }, [currentNode.specialEffect]);

  // Update affection with toast trigger
  useEffect(() => {
    if (typeof currentNode.affection === 'number' && currentNode.affection > affection) {
      setPrevAffection(affection);
      setAffection(currentNode.affection);
      setToastMessage(currentNode.affectionChangeText);
      setShowToast(true);
      sound.playAffectionChime();
    }
  }, [currentNode.affection, currentNode.affectionChangeText, affection]);

  // Smooth, leak-proof scene transition with 4-phase curtain state machine
  const changeSceneWithTransition = (targetNodeId: string) => {
    ensureAudio();
    const nextNode = STORY_NODES[targetNodeId];
    if (!nextNode) return;

    // Resolve current and next background to detect background changes accurately
    const currentBg = currentNode.bgImage || getDefaultBg(currentNode.location);
    const nextBg = nextNode.bgImage || getDefaultBg(nextNode.location);

    const needsTransition =
      Boolean(currentNode.transitionOut) ||
      Boolean(nextNode.transitionIn) ||
      currentNode.location !== nextNode.location ||
      currentBg !== nextBg ||
      currentNode.phase !== nextNode.phase ||
      Boolean(nextNode.isChapterStart);

    const chosenTransition: TransitionType =
      currentNode.transitionOut || nextNode.transitionIn || 'fade-black';

    if (needsTransition) {
      sound.playWhoosh();
      setTransitionType(chosenTransition);
      setTransitionPhase('closing');

      const closeDuration = chosenTransition === 'flash-white' ? 250 : 320;
      const holdDuration = 100;
      const openDuration = 320;

      // Phase 1: Closing curtain (320ms) -> Screen reaches 100% solid opacity
      setTimeout(() => {
        // Phase 2: Screen is now 100% COVERED in solid barrier (zero light leaks)
        setTransitionPhase('covered');

        // Immediately mount chapter card if needed so it mounts behind the blackout
        if (nextNode.isChapterStart && nextNode.chapterMeta && !chapterSeenRef.current.has(nextNode.id)) {
          chapterSeenRef.current.add(nextNode.id);
          setShowChapterCard(true);
        }

        // Swap the scene node in the DOM behind the 100% solid curtain
        setCurrentNodeId(targetNodeId);

        // Reset image error state for the new background
        setImageError(false);

        // Hold in solid blackout for 100ms so Next.js Image decode and DOM painting finish
        setTimeout(() => {
          // Phase 3: Open curtain smoothly revealing the ready scene
          setTransitionPhase('opening');

          setTimeout(() => {
            // Phase 4: Complete and idle
            setTransitionPhase('idle');
          }, openDuration);
        }, holdDuration);
      }, closeDuration);
    } else {
      setCurrentNodeId(targetNodeId);
      setImageError(false);
    }
  };

  const handleNext = () => {
    ensureAudio();
    if (currentNode.onNext && STORY_NODES[currentNode.onNext]) {
      changeSceneWithTransition(currentNode.onNext);
    }
  };

  const handleChoiceSelect = (_choice: ChoiceOption) => {
    ensureAudio();
    if (currentNode.onNext && STORY_NODES[currentNode.onNext]) {
      changeSceneWithTransition(currentNode.onNext);
    }
  };

  const handleRestart = () => {
    chapterSeenRef.current.clear();
    setAffection(0);
    setPrevAffection(0);
    setShowChapterCard(false);
    setDialogueHistory([]);
    sound.playClick();
    clearGameState(); // Clear persistent save data on restart
    if (onReturnToTitle) {
      onReturnToTitle();
    } else {
      setTransitionType('fade-black');
      setTransitionPhase('closing');
      setTimeout(() => {
        setTransitionPhase('covered');
        setCurrentNodeId('boot-init');
        setTimeout(() => {
          setTransitionPhase('opening');
          setTimeout(() => {
            setTransitionPhase('idle');
          }, 320);
        }, 100);
      }, 320);
    }
  };

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  // Determine background
  const bgImage = currentNode.bgImage || getDefaultBg(currentNode.location);

  const isModalActive = 
    currentNode.isMemoryHub || 
    currentNode.isQuiz || 
    currentNode.isInnerChildUnlock || 
    Boolean(currentNode.choices) || 
    Boolean(currentNode.interactionType) ||
    currentNode.phase === 'save-screen' || 
    currentNode.phase === 'credits' ||
    showChapterCard ||
    showLogModal;

  const isBedroom = Boolean(bgImage?.includes('kamar') || currentNode.bgImage?.includes('kamar'));

  return (
    <div
      onClick={ensureAudio}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#070913',
      }}
    >
      {/* CRT Scanlines Overlay */}
      <div className="crt-scanlines" />

      {/* Cinematic Scene Transition Overlay (Zero-leakage 4-phase curtain) */}
      <SceneTransition
        type={transitionType}
        phase={transitionPhase}
        duration={320}
      />

      {/* Chapter Transition Card */}
      {showChapterCard && currentNode.chapterMeta && (
        <ChapterCard
          title={currentNode.chapterMeta.title}
          subtitle={currentNode.chapterMeta.subtitle}
          date={currentNode.chapterMeta.date}
          location={currentNode.chapterMeta.location}
          affection={currentNode.chapterMeta.affection ?? currentNode.affection}
          bgImage={bgImage || undefined}
          onFinish={() => setShowChapterCard(false)}
        />
      )}

      {/* Now Playing Music Notification Toast */}
      {showNowPlaying && nowPlayingMood && !showChapterCard && (
        <NowPlayingToast
          mood={nowPlayingMood}
          onClose={() => setShowNowPlaying(false)}
        />
      )}

      {/* Dialogue Backlog History Modal */}
      {showLogModal && (
        <DialogueHistoryModal
          history={dialogueHistory}
          onClose={() => setShowLogModal(false)}
        />
      )}

      {/* Affection Rise Notification Toast */}
      {showToast && (
        <AffectionToast
          prevAffection={prevAffection}
          currentAffection={affection}
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}

      {/* Background Graphic Layer */}
      {bgImage ? (
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          filter: 'brightness(0.88) contrast(1.05)',
        }}>
          <Image
            key={`${bgImage}-${imageRetryKey}`}
            src={bgImage}
            alt={currentNode.location}
            fill
            priority
            unoptimized
            onError={() => setImageError(true)}
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              imageRendering: 'pixelated',
            }}
          />
          {/* Subtle edge shadow only at extreme borders to preserve image clarity */}
          <div style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.4)',
          }} />
        </div>
      ) : (
        /* Void / Terminal Background */
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: 'radial-gradient(circle at center, #141a2e 0%, #070913 100%)',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(to right, rgba(77, 238, 234, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(77, 238, 234, 0.05) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }} />
        </div>
      )}

      {/* Network Image Load Failure Notification & Retry Button */}
      {imageError && (
        <div
          style={{
            position: 'absolute',
            top: '78px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 48,
            backgroundColor: 'rgba(26, 27, 38, 0.94)',
            border: '2px solid #f7768e',
            padding: '8px 16px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.62rem',
            color: '#f7768e',
            boxShadow: '0 0 16px rgba(247, 118, 142, 0.5)',
          }}
        >
          <span>⚠️ KONEKSI TERPUTUS — GAMBAR LATAR BELUM TERMUAT</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setImageError(false);
              setImageRetryKey((k) => k + 1);
            }}
            className="pixel-btn pixel-btn-primary"
            style={{ fontSize: '0.55rem', padding: '4px 8px', cursor: 'pointer' }}
          >
            ↺ MUAT ULANG GAMBAR
          </button>
        </div>
      )}

      {/* Ambient Particles & Lighting */}
      <AmbientElements location={currentNode.location} />

      {/* Top HUD: Affection & Location */}
      <AffectionHUD
        affection={affection}
        location={currentNode.location}
        phase={currentNode.phase}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onRestart={handleRestart}
        onOpenLog={() => setShowLogModal(true)}
      />

      {/* Top-Right Floating System Panel */}
      {currentNode.systemBox && !isModalActive && (
        <div style={{
          position: 'absolute',
          top: '68px',
          right: '20px',
          zIndex: 35,
          animation: 'fadeIn 0.3s ease',
        }}>
          <SystemBox data={currentNode.systemBox} />
        </div>
      )}

      {/* Interactive Sub-Screens & Minigames */}
      {currentNode.choices && (
        <ChoicePrompt
          choices={currentNode.choices}
          onSelect={handleChoiceSelect}
        />
      )}

      {/* Chapter 01 Coffee Order Puzzle */}
      {currentNode.interactionType === 'coffee-order' && (
        <CoffeeOrderPuzzle onComplete={() => handleNext()} />
      )}

      {/* Quest 02 Jealousy Mini Game */}
      {currentNode.interactionType === 'jealousy' && (
        <JealousyMiniGame onComplete={handleNext} />
      )}

      {/* Quest 03 Draft Message Picker */}
      {currentNode.interactionType === 'draft-message' && (
        <DraftMessagePicker onComplete={handleNext} />
      )}

      {/* Chapter 01 Cafe Exploration */}
      {currentNode.interactionType === 'cafe-explore' && (
        <CafeExploration onComplete={handleNext} />
      )}

      {/* Chapter 02 Chat Tapper */}
      {currentNode.interactionType === 'chat-tapper' && (
        <ChatTapper onComplete={handleNext} />
      )}

      {/* Chapter 04 Malang Exploration */}
      {currentNode.interactionType === 'malang-explore' && (
        <MalangExploration onComplete={handleNext} />
      )}

      {/* Chapter 06 Evidence Board */}
      {currentNode.interactionType === 'evidence-board' && (
        <EvidenceBoard onComplete={handleNext} />
      )}

      {/* Chapter 05 Memory Investigation Hub */}
      {currentNode.isMemoryHub && (
        <MemoryInvestigation onComplete={handleNext} />
      )}

      {/* Final Chapter Quiz */}
      {currentNode.isQuiz && (
        <QuizScreen onComplete={handleNext} />
      )}

      {/* Chapter 07 Inner Child Unlock */}
      {currentNode.isInnerChildUnlock && (
        <InnerChildUnlock onComplete={handleNext} />
      )}

      {/* Save Screen */}
      {currentNode.phase === 'save-screen' && (
        <SaveScreen onAccept={handleNext} />
      )}

      {/* Credits Roll */}
      {currentNode.phase === 'credits' && (
        <CreditsScreen onRestart={handleRestart} />
      )}

      {/* Bottom Visual Novel HUD: Dialogue Box flanked directly by Cegil & Ali Portraits */}
      {!isModalActive && (
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 32px)',
            maxWidth: '1280px',
            height: '200px',
            display: 'flex',
            alignItems: 'stretch',
            gap: '12px',
            zIndex: 40,
            boxSizing: 'border-box',
          }}
        >
          {/* Cegil Portrait Card (Left) */}
          {currentNode.location !== 'system-void' && !currentNode.hideCegil && (
            <CharacterPortrait
              character="cegil"
              name="CEGIL"
              speaker={currentNode.speaker}
              speakerAvatar={currentNode.speakerAvatar}
              textType={currentNode.textType}
            />
          )}

          {/* Central Dialogue Box */}
          <div style={{ flex: 1, minWidth: 0, height: '100%' }}>
            <DialogueBox
              speaker={currentNode.speaker}
              speakerTitle={currentNode.speakerTitle}
              speakerAvatar={currentNode.speakerAvatar}
              textType={currentNode.textType}
              text={currentNode.text}
              narration={currentNode.narration}
              onComplete={handleNext}
              canAdvance={Boolean(currentNode.onNext)}
            />
          </div>

          {/* Ali Portrait Card (Right) - Automatically hidden in Cegil's bedroom */}
          {currentNode.location !== 'system-void' && !currentNode.hideAli && !isBedroom && (
            <CharacterPortrait
              character="ali"
              name="ALI"
              speaker={currentNode.speaker}
              speakerAvatar={currentNode.speakerAvatar}
              textType={currentNode.textType}
            />
          )}
        </div>
      )}
    </div>
  );
};
