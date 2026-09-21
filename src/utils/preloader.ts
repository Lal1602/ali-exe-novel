// Asset Preloader & Cache Manager for ALI.EXE
// Handles progressive caching, next-scene speculative prefetching, and network retry

export const CRITICAL_BACKGROUNDS = [
  '/assets/bg-kantor.jpg',
  '/assets/bg-cafe.jpg',
  '/assets/bg-tropodo.jpg',
  '/assets/bg-malang.jpg',
  '/assets/bg-kamar-cegil.jpg',
  '/assets/bg-kantor-coffee.jpg',
  '/assets/bg-kantor-approach.jpg',
  '/assets/bg-cafe-closing.jpg',
  '/assets/bg-tropodo-dusk.jpg',
];

export const CRITICAL_PORTRAITS = [
  '/assets/portrait-cegil-glasses.jpg',
  '/assets/portrait-ali-glasses.jpg',
];

// Memory cache to track already preloaded URLs
const preloadedUrls = new Set<string>();

/**
 * Preload a single image with retry logic in case of network drops
 */
export const preloadImage = (src: string, retries = 3, delayMs = 1000): Promise<boolean> => {
  if (typeof window === 'undefined' || !src) return Promise.resolve(false);
  if (preloadedUrls.has(src)) return Promise.resolve(true);

  return new Promise((resolve) => {
    let attempts = 0;

    const tryLoad = () => {
      attempts++;
      const img = new Image();
      img.src = src;

      img.onload = () => {
        preloadedUrls.add(src);
        resolve(true);
      };

      img.onerror = () => {
        if (attempts < retries) {
          setTimeout(tryLoad, delayMs * attempts);
        } else {
          // Resolve false rather than rejecting so overall app continues
          resolve(false);
        }
      };
    };

    tryLoad();
  });
};

/**
 * Preloads critical tier-1 assets (portraits & starting background) then progressively caches the rest
 */
export const preloadCriticalAssets = async (
  onProgress?: (loaded: number, total: number) => void
): Promise<void> => {
  if (typeof window === 'undefined') return;

  const allAssets = [...CRITICAL_PORTRAITS, ...CRITICAL_BACKGROUNDS];
  const total = allAssets.length;
  let loaded = 0;

  // 1. Immediately load portraits + first background concurrently
  const tier1 = ['/assets/portrait-cegil-glasses.jpg', '/assets/portrait-ali-glasses.jpg', '/assets/bg-kantor.jpg'];
  await Promise.all(
    tier1.map(async (url) => {
      await preloadImage(url, 3);
      loaded++;
      if (onProgress) onProgress(loaded, total);
    })
  );

  // 2. Progressively load remaining backgrounds in small batches
  const remaining = allAssets.filter((url) => !tier1.includes(url));
  const batchSize = 2;

  for (let i = 0; i < remaining.length; i += batchSize) {
    const batch = remaining.slice(i, i + batchSize);
    await Promise.all(
      batch.map(async (url) => {
        await preloadImage(url, 2);
        loaded++;
        if (onProgress) onProgress(loaded, total);
      })
    );
  }
};

/**
 * Speculatively preloads the background of the upcoming scene while the player is reading the current dialogue
 */
export const prefetchNextSceneAssets = (bgSrc?: string | null): void => {
  if (!bgSrc || typeof window === 'undefined') return;
  if (!preloadedUrls.has(bgSrc)) {
    preloadImage(bgSrc, 2, 800);
  }
};
