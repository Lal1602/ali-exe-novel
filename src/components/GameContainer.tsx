'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { STORY_NODES } from '@/data/scenes';
import { StoryNode, ChoiceOption, TransitionType } from '@/types/game';
import { sound } from '@/utils/audio';
import { AffectionHUD } from './AffectionHUD';
import { DialogueBox } from './DialogueBox';
import { SystemBox } from './SystemBox';
import { ChoicePrompt } from './ChoicePrompt';
import { MemoryInvestigation } from './MemoryInvestigation';
import { QuizScreen } from './QuizScreen';
import { InnerChildUnlock } from './InnerChildUnlock';
import { SaveScreen } from './SaveScreen';
import { CreditsScreen } from './CreditsScreen';
import { SceneTransition } from './SceneTransition';
import { ChapterCard } from './ChapterCard';
import { CharacterSprites } from './CharacterSprites';
import { AmbientElements } from './AmbientElements';
import { AffectionToast } from './AffectionToast';

// Mini-game interactions
import { CoffeeOrderPuzzle } from './interactions/CoffeeOrderPuzzle';
import { JealousyMiniGame } from './interactions/JealousyMiniGame';
import { DraftMessagePicker } from './interactions/DraftMessagePicker';
import { CafeExploration } from './interactions/CafeExploration';
import { ChatTapper } from './interactions/ChatTapper';
import { MalangExploration } from './interactions/MalangExploration';
import { EvidenceBoard } from './interactions/EvidenceBoard';

export const GameContainer: React.FC<{ onReturnToTitle?: () => void }> = ({ onReturnToTitle }) => {
  const [currentNodeId, setCurrentNodeId] = useState<string>('boot-init');
  const [affection, setAffection] = useState<number>(0);
  const [prevAffection, setPrevAffection] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | undefined>(undefined);
  const [showToast, setShowToast] = useState<boolean>(false);

  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasStartedAudio, setHasStartedAudio] = useState<boolean>(false);

  // Transition states
  const [transitionType, setTransitionType] = useState<TransitionType>('fade-black');
  const [isTransitionActive, setIsTransitionActive] = useState<boolean>(false);

  // Chapter card state
  const [showChapterCard, setShowChapterCard] = useState<boolean>(false);
  const chapterSeenRef = useRef<Set<string>>(new Set());

  const currentNode: StoryNode = STORY_NODES[currentNodeId] || STORY_NODES['boot-init'];

  // Start audio on first user click
  const ensureAudio = useCallback(() => {
    if (!hasStartedAudio) {
      setHasStartedAudio(true);
      sound.startBGM(currentNode.bgmMood || 'ambient');
    }
  }, [hasStartedAudio, currentNode.bgmMood]);

  // Sync BGM mood when scene changes
  useEffect(() => {
    if (currentNode.bgmMood) {
      sound.setMood(currentNode.bgmMood);
    }
  }, [currentNode.bgmMood]);

  // Check if node is chapter start and hasn't been shown yet
  useEffect(() => {
    if (currentNode.isChapterStart && currentNode.chapterMeta && !chapterSeenRef.current.has(currentNode.id)) {
      chapterSeenRef.current.add(currentNode.id);
      setShowChapterCard(true);
    }
  }, [currentNode]);

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

  const changeSceneWithTransition = (targetNodeId: string) => {
    ensureAudio();
    const nextNode = STORY_NODES[targetNodeId];
    if (!nextNode) return;

    // Determine transition type: explicit on node, or location difference -> fade-black
    const needsTransition = currentNode.transitionOut || nextNode.transitionIn || (currentNode.location !== nextNode.location);
    const chosenTransition = currentNode.transitionOut || nextNode.transitionIn || 'fade-black';

    if (needsTransition) {
      sound.playWhoosh();
      setTransitionType(chosenTransition);
      setIsTransitionActive(true);
      setTimeout(() => {
        setCurrentNodeId(targetNodeId);
      }, 300);
    } else {
      setCurrentNodeId(targetNodeId);
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
    sound.playClick();
    if (onReturnToTitle) {
      onReturnToTitle();
    } else {
      setCurrentNodeId('boot-init');
    }
  };

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  // Determine background
  const bgImage = currentNode.bgImage || (
    currentNode.location === 'kantor'
      ? '/assets/bg-kantor.jpg'
      : currentNode.location === 'cafe-little-cave'
        ? '/assets/bg-cafe.jpg'
        : currentNode.location === 'tropodo'
          ? '/assets/bg-tropodo.jpg'
          : currentNode.location === 'malang'
            ? '/assets/bg-malang.jpg'
            : null
  );

  const isModalActive = 
    currentNode.isMemoryHub || 
    currentNode.isQuiz || 
    currentNode.isInnerChildUnlock || 
    Boolean(currentNode.choices) || 
    Boolean(currentNode.interactionType) ||
    currentNode.phase === 'save-screen' || 
    currentNode.phase === 'credits' ||
    showChapterCard;

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

      {/* Cinematic Scene Transition Overlay */}
      <SceneTransition
        type={transitionType}
        isActive={isTransitionActive}
        duration={500}
        onFinished={() => setIsTransitionActive(false)}
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
            src={bgImage}
            alt={currentNode.location}
            fill
            priority
            unoptimized
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
          {/* Subtle vignette gradient */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.08) 0%, rgba(7,9,19,0.75) 100%)',
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
      />

      {/* Character Sprites Layer (Above background, below dialogue) */}
      {!isModalActive && currentNode.location !== 'system-void' && (
        <CharacterSprites
          speaker={currentNode.speaker}
          speakerAvatar={currentNode.speakerAvatar}
          textType={currentNode.textType}
          location={currentNode.location}
        />
      )}

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

      {/* Bottom Dialogue Box (Visible when not in full modal screens) */}
      {!isModalActive && (
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
      )}
    </div>
  );
};
