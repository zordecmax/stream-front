'use client';

import { useEffect, useMemo, useState } from 'react';

export type LiveStreamItem = {
  id: string;
  playbackId: string;
  title: string;
  description: string;
  status: 'active' | 'idle' | string;
  playbackUrl: string; // m3u8 URL
  createdAt: string;
};

export type UseLiveStreamingOptions = {
  /** Optional search query to filter client-side */
  query?: string;
  /** Refetch interval in ms (0 = disabled) */
  refreshInterval?: number;
};

const API_URL = 'https://stream-be.onrender.com/api/live-streams/active';

async function fetchLiveStreams(signal?: AbortSignal): Promise<LiveStreamItem[]> {
  const res = await fetch(API_URL, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
    signal,
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`Live Streams API error: ${res.status} ${res.statusText}`);
  }
  const data = (await res.json()) as LiveStreamItem[];
  // Defensive filter: ensure only active status
  return Array.isArray(data) ? data.filter((d) => d.status === 'active') : [];
}

export function useLiveStreamingData(options: UseLiveStreamingOptions = {}) {
  const { query, refreshInterval = 0 } = options;
  const [data, setData] = useState<LiveStreamItem[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    setError(null);

    fetchLiveStreams(abortController.signal)
      .then((items) => setData(items))
      .catch((err) => setError(err as Error))
      .finally(() => setLoading(false));

    let intervalId: number | undefined;
    if (refreshInterval && refreshInterval > 0) {
      intervalId = window.setInterval(() => {
        fetchLiveStreams(abortController.signal)
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
        item.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [data, query]);

  return {
    data: filtered,
    raw: data,
    error,
    loading,
    refresh: async () => {
      setLoading(true);
      setError(null);
      try {
        const items = await fetchLiveStreams();
        setData(items);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
  };
}

export type UseLiveStreamingReturn = ReturnType<typeof useLiveStreamingData>;
