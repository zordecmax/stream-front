'use client';

import { useState } from 'react';
import ContentCard from './ContentCard';
import type { BunnyVideoConfig } from './BunnyVideoPlayer';

export interface StreamContent {
  id: string;
  title: string;
  streamer: string;
  viewers: string;
  game: string;
  thumbnail: string;
  tags: string[];
  isLive?: boolean;
  bunnyConfig?: BunnyVideoConfig;
}

interface TrendingRowProps {
  title?: string;
  items: StreamContent[];
  onItemClick: (item: StreamContent) => void;
}

export default function TrendingRow({ 
  title = 'Trending Now', 
  items,
  onItemClick 
}: TrendingRowProps) {
  return (
    <section className="mb-8 md:mb-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 px-4 md:px-8 text-white">
        {title}
      </h2>
      
  {/* Horizontal Scroll Container */}
  <div className="relative group/row">
        <div className="overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth snap-x snap-mandatory px-4 md:px-8">
          <div className="flex gap-4 pb-4">
            {items.length === 0 ? (
              // Skeleton Placeholders
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
            ) : (
              // Content Cards
              items.map((item) => (
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
