"use client";

import ContentCard from './ContentCard';
import type { BunnyVideoConfig } from './BunnyVideoPlayer';

export interface StreamContent {
  id: string;
  title: string;
  streamer: string;
  viewers: string;
  game: string;
  thumbnail?: string;
  thumbnailUrl?: string;
  tags: string[];
  isLive?: boolean;
  bunnyConfig?: BunnyVideoConfig;
}

export interface LiveStreamContent  {
  id: string;
  playbackId: string;
  title: string;
  description: string;
  status: 'active' | 'idle' | string;
  playbackUrl: string; // m3u8 URL
  createdAt: string;
};

export interface TrendingRowProps {
  title?: string;
  items: StreamContent[] | LiveStreamContent[] | null;
  onItemClick: (item: StreamContent | LiveStreamContent) => void;
  loading?: boolean;
}

export default function TrendingRow({
  title = 'Trending Now',
  items,
  onItemClick,
  loading = false,
}: TrendingRowProps) {
  const list = items ?? [];

  return (
    <section className="mb-8 md:mb-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
        {title}
      </h2>

      {/* Horizontal Scroll Container */}
      <div className="relative group/row">
        <div className="overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth snap-x snap-mandatory">
          <div className="flex gap-4 pb-4">
            {loading ? (
              // Loading state: skeletons
              <>
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-none w-[280px] md:w-[320px] animate-pulse"
                  >
                    <div className="bg-gray-700 rounded-lg aspect-video mb-3"></div>
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                  </div>
                ))}
              </>
            ) : list.length === 0 ? (
              // Empty state: no data
              <div className="flex items-center justify-center w-full py-8">
                <div className="text-center text-gray-400">
                  <svg className="w-12 h-12 mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p>No items available</p>
                </div>
              </div>
            ) : (
              // Data state: render cards
              list.map((item) => (
                <div
                  key={item.id}
                  className="flex-none w-[280px] md:w-[320px] snap-start"
                >
                  <ContentCard
                    content={item}
                    onClick={() => onItemClick(item)}
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Optional: Scroll Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
}
