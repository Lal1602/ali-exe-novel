export type GameLocation = 
  | 'system-void'
  | 'kantor'
  | 'cafe-little-cave'
  | 'tropodo'
  | 'malang';

export type GamePhase =
  | 'boot'
  | 'prologue'
  | 'quest01'
  | 'quest02'
  | 'quest03'
  | 'chapter01'
  | 'chapter02'
  | 'chapter03'
  | 'chapter04'
  | 'chapter05'
  | 'chapter06'
  | 'chapter07'
  | 'chapter08'
  | 'final-quiz'
  | 'epilogue'
  | 'save-screen'
  | 'credits';

export interface SystemBoxData {
  title: string;
  lines: { label?: string; value: string; progress?: number; color?: string }[];
  accentColor?: 'cyan' | 'green' | 'amber' | 'pink' | 'red';
}

export interface ChoiceOption {
  id: string;
  text: string;
  reaction: string;
  reactionSpeaker?: 'Ali' | 'System';
}

export type TransitionType = 
  | 'fade-black' 
  | 'wipe-right' 
  | 'flash-white' 
  | 'glitch' 
  | 'vignette-pulse';

export interface StoryNode {
  id: string;
  phase: GamePhase;
  location: GameLocation;
  bgImage?: string;
  speaker?: 'Ali' | 'Cegil' | 'Player' | 'System' | 'Narator' | 'Female Coworker';
  speakerTitle?: string;
  speakerAvatar?: 'ali' | 'cegil' | null;
  textType?: 'dialogue' | 'inner-monologue' | 'narration';
  text: string;
  narration?: string[];
  systemBox?: SystemBoxData;
  affection?: number; // Target affection meter percentage
  affectionChangeText?: string;
  choices?: ChoiceOption[];
  specialEffect?: 'confetti' | 'heartburst' | 'screen-shake' | 'fade-to-black' | 'error-flash';
  transitionIn?: TransitionType;
  transitionOut?: TransitionType;
  isChapterStart?: boolean;
  chapterMeta?: {
    title: string;
    subtitle: string;
    date?: string;
    location?: string;
    affection?: number;
  };
  interactionType?: 
    | 'coffee-order' 
    | 'jealousy' 
    | 'draft-message' 
    | 'cafe-explore' 
    | 'chat-tapper' 
    | 'malang-explore' 
    | 'evidence-board';
  bgmMood?: 'ambient' | 'office' | 'cozy' | 'home' | 'romantic' | 'investigation' | 'celebration' | 'quiet';
  isMemoryHub?: boolean;
  isQuiz?: boolean;
  isInnerChildUnlock?: boolean;
  onNext?: string;
}

export interface MemoryFragment {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  date?: string;
  location: GameLocation;
  bgImage: string;
  previewText: string;
  fullStory: string[];
  dialogue?: { speaker: string; text: string }[];
  statGain?: { label: string; value: string };
  unlocked: boolean;
}
