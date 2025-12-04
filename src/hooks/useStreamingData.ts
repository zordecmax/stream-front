'use client';

import { useEffect, useMemo, useState } from 'react';

export type StreamingItem = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  year: number;
  genre: string;
  rating: string;
  duration: number; // minutes
  cast: string[];
  watchProgress: number;
  createdAt: string;
  updatedAt: string;
};

export type UseStreamingDataOptions = {
  /** Optional search query to filter client-side */
  query?: string;
  /** Optional genre to filter client-side */
  genre?: string;
  /** Refetch interval in ms (0 = disabled) */
  refreshInterval?: number;
};

const API_URL = 'https://stream-be.onrender.com/api/streaming';

async function fetchStreamingData(signal?: AbortSignal): Promise<StreamingItem[]> {
  const res = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
    signal,
    // Disable Next.js caching for client fetch
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`Streaming API error: ${res.status} ${res.statusText}`);
  }
  const data = (await res.json()) as StreamingItem[];
  return data;
}

export function useStreamingData(options: UseStreamingDataOptions = {}) {
  const { query, genre, refreshInterval = 0 } = options;
  const [data, setData] = useState<StreamingItem[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    setError(null);

    fetchStreamingData(abortController.signal)
      .then((items) => setData(items))
      .catch((err) => setError(err as Error))
      .finally(() => setLoading(false));

    let intervalId: number | undefined;
    if (refreshInterval && refreshInterval > 0) {
      intervalId = window.setInterval(() => {
        fetchStreamingData(abortController.signal)
          .then((items) => setData(items))
          .catch((err) => setError(err as Error));
      }, refreshInterval);
    }

    return () => {
      abortController.abort();
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [refreshInterval]);

  const filtered = useMemo(() => {
    if (!data) return null;
    let result = data;
    if (query && query.trim().length) {
      const q = query.toLowerCase();
      result = result.filter((item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.genre.toLowerCase().includes(q) ||
        item.cast.some((c) => c.toLowerCase().includes(q))
      );
    }
    if (genre && genre.trim().length) {
      const g = genre.toLowerCase();
      result = result.filter((item) => item.genre.toLowerCase() === g);
    }
    return result;
  }, [data, query, genre]);

  return {
    data: filtered,
    raw: data,
    error,
    loading,
    refresh: async () => {
      setLoading(true);
      setError(null);
      try {
        const items = await fetchStreamingData();
        setData(items);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
  };
}

export type UseStreamingDataReturn = ReturnType<typeof useStreamingData>;
