'use client';

import { useCallback, useEffect, useRef } from 'react';

type WatchMap = Record<string, number>; // id -> percent (0-100)

const STORAGE_KEY = 'zenith_watch_history';

function readStorage(): WatchMap {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === 'object') return parsed as WatchMap;
    return {};
  } catch {
    return {};
  }
}

function writeStorage(map: WatchMap) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // ignore quota or JSON errors
  }
}

export function useWatchHistory() {
  // keep a ref so reads/writes don't cause re-renders
  const storeRef = useRef<WatchMap>({});

  useEffect(() => {
    storeRef.current = readStorage();
  }, []);

  const getProgress = useCallback((id: string): number => {
    const val = storeRef.current[id];
    if (typeof val !== 'number') return 0;
    // clamp to 0-100
    return Math.max(0, Math.min(100, val));
  }, []);

  const setProgress = useCallback((id: string, percent: number) => {
    const clamped = Math.max(0, Math.min(100, Math.round(percent)));
    const next = { ...storeRef.current, [id]: clamped };
    storeRef.current = next;
    writeStorage(next);
  }, []);

  return { getProgress, setProgress };
}

export type UseWatchHistoryReturn = ReturnType<typeof useWatchHistory>;
