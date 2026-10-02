import { useCallback, useEffect, useRef } from 'react';

/**
 * Wraps a completion callback so it fires at most once per mount,
 * even if the player double-taps or a timer and a button race each other.
 */
export const useSingleShot = (fn: () => void): (() => void) => {
  const firedRef = useRef(false);
  const fnRef = useRef(fn);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  return useCallback(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    fnRef.current();
  }, []);
};
