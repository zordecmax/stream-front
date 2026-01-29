'use client';

import ContentCard from './ContentCard';
import type { StreamContent } from './TrendingRow';

interface RecommendedGridProps {
  title?: string;
  items: StreamContent[];
  onItemClick: (item: StreamContent) => void;
  loading?: boolean;
}

export default function RecommendedGrid({ title = 'Empfohlen für Sie', items, onItemClick, loading = false }: RecommendedGridProps) {
  const showSkeleton = loading;

  return (
    <section className="mb-8 md:mb-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-4  text-white">
        {title}
      </h2>

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {showSkeleton ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-700 rounded-lg aspect-video mb-3" />
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-700 rounded w-1/2" />
              </div>
            ))
          ) : (
            items.map((item) => (
              <ContentCard key={item.id} content={item} onClick={() => onItemClick(item)} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
