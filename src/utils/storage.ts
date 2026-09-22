import { DialogueLogEntry } from '@/types/game';

export interface SaveState {
  currentNodeId: string;
  affection: number;
  prevAffection: number;
  chapterSeen: string[];
  isMuted: boolean;
  timestamp: number;
  location?: string;
  phase?: string;
  previewTitle?: string;
  dialogueHistory?: DialogueLogEntry[];
}

const SAVE_STORAGE_KEY = 'ali_exe_save_data_v1';

export const saveGameState = (state: SaveState): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const serialized = JSON.stringify({
      ...state,
      timestamp: Date.now(),
    });
    localStorage.setItem(SAVE_STORAGE_KEY, serialized);
    return true;
  } catch (err) {
    console.warn('[ALI.EXE] Gagal menyimpan ke localStorage:', err);
    return false;
  }
};

export const loadGameState = (): SaveState | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SAVE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SaveState;
    if (parsed && typeof parsed.currentNodeId === 'string') {
      return parsed;
    }
    return null;
  } catch (err) {
    console.warn('[ALI.EXE] Gagal membaca data tersimpan dari localStorage:', err);
    return null;
  }
};

export const clearGameState = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(SAVE_STORAGE_KEY);
  } catch (err) {
    console.warn('[ALI.EXE] Gagal menghapus save data:', err);
  }
};

export const hasSavedGame = (): boolean => {
  const state = loadGameState();
  // We consider it a valid continuable save if it's beyond initial boot
  return Boolean(state && state.currentNodeId && state.currentNodeId !== 'boot-init');
};
