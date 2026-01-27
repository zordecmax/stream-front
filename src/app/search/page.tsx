'use client';

import { useEffect, useMemo, useState } from 'react';
import RecommendedGrid from '@/components/RecommendedGrid';
import type { StreamingItem } from '@/hooks/useStreamingData';
import type { StreamContent } from '@/components/TrendingRow';
import Header from '@/components/Header';
import ContentModal from '@/components/ContentModal';

const SEARCH_API = 'https://stream-be.onrender.com/api/streaming/search/query';
const CDN_HOSTNAME = 'vz-86921353-a1a.b-cdn.net';

export default function SearchPage() {
  const [q, setQ] = useState<string>('');
  const [data, setData] = useState<StreamingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedContent, setSelectedContent] = useState<StreamContent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Read query from URL on client to avoid Suspense requirements
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const qs = new URLSearchParams(window.location.search).get('q') || '';
    // microtask to align with React state timing
    Promise.resolve().then(() => setQ(qs));
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    async function run() {
      if (!q) { setData([]); return; }
      setLoading(true);
      setError(null);
      try {
        const url = `${SEARCH_API}?q=${encodeURIComponent(q)}`;
        const res = await fetch(url, { signal: controller.signal, cache: 'no-store' });
        if (!res.ok) throw new Error(`Search error: ${res.status} ${res.statusText}`);
        const json = await res.json();
        setData(json as StreamingItem[]);
      } catch (e) {
        const isAbort = e instanceof DOMException && e.name === 'AbortError';
        if (!isAbort) setError(e instanceof Error ? e.message : 'Search failed');
      } finally {
        setLoading(false);
      }
    }
    run();
    return () => controller.abort();
  }, [q]);

  const toStreamContent = (item: StreamingItem): StreamContent => {
    const match = item.videoUrl?.match(/embed\/(\d+)\/([a-f0-9\-]+)/i);
    const videoId = match?.[2];
    return {
      id: item.id,
      title: item.title,
      streamer: 'HYPE',
      viewers: `${item.rating} ⭐`,
      game: item.genre,
      thumbnailUrl: item.thumbnailUrl,
      tags: item.cast?.slice(0, 3) ?? [],
      isLive: true,
      bunnyConfig: {
        cdnHostname: CDN_HOSTNAME,
        videoId,
      },
    };
  };

  const items: StreamContent[] = useMemo(() => data.map(toStreamContent), [data]);

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="px-4 md:px-8 lg:px-12 py-8 space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Search results for: {q || '—'}</h1>
        {error && (
          <div className="text-red-400">{error}</div>
        )}
        {loading && (
          <div className="text-gray-300">Loading…</div>
        )}
        {!loading && !error && q && items.length === 0 && (
          <div className="px-4 md:px-8">
            <div className="flex flex-col items-center justify-center rounded-lg border border-gray-800 bg-gray-900 p-8 text-center">
              <svg className="w-12 h-12 text-gray-600 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h2 className="text-white text-xl font-semibold">No results found</h2>
              <p className="text-gray-400 mt-1">Try a different keyword or check your spelling.</p>
            </div>
          </div>
        )}
        <RecommendedGrid
          title="Results"
          items={items}
          onItemClick={(item) => { setSelectedContent(item); setIsModalOpen(true); }}
          loading={loading}
        />
      </main>
      {/* Modal */}
      {selectedContent && (
        <ContentModal
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setTimeout(() => setSelectedContent(null), 200); }}
          content={selectedContent}
        />
      )}
    </div>
  );
}
