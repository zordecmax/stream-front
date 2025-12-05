'use client';

import Image from 'next/image';
import BunnyVideoPlayer from './BunnyVideoPlayer';
import { LiveStreamContent, StreamContent } from './TrendingRow';

// interface LiveStreamContent  {
//   playbackId: string;
//   id: string;
//   title: string;
//   streamer: string;
//   viewers: number;
//   game: string;
//   tags?: string[];
// }

interface ContentCardProps {
  content: StreamContent | LiveStreamContent;
  onClick: () => void;
}

export default function ContentCard({ content, onClick }: ContentCardProps) {

  return (
    <div 
      className="group/card cursor-pointer transition-transform duration-300 ease-out hover:scale-105"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Thumbnail/Player Container */}
      <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800 mb-3">
        {
          'playbackId' in content && content.playbackId ? (
            <Image
              src={`https://image.mux.com/${content.playbackId}/thumbnail.png?width=320&height=180&time=0`}
              alt={`${content.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 280px, 320px"
            />
          ) : ('thumbnailUrl' in content && content.thumbnailUrl) || ('thumbnail' in content && content.thumbnail) ? (
            <Image
              src={('thumbnailUrl' in content ? content.thumbnailUrl : content.thumbnail)!}
              alt={`${content.title} `}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 280px, 320px"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-700" aria-hidden="true" />
          )
        }
        
        {/* Live Badge */}
        {'playbackId' in content && content.playbackId && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            LIVE
          </div>
        )}
        
        {/* Viewers Count */}
        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          {'viewers' in content ? content.viewers : 0} viewers
        </div>
        
        {/* Hover Overlay with Play Icon */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
            {/* Play Icon */}
            <svg 
              className="w-8 h-8 text-gray-900 ml-1" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Content Info */}
      <div className="space-y-1">
        <h3 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-purple-400 transition-colors">
          {content.title}
        </h3>
        <p className="text-gray-400 text-sm">
          {'streamer' in content ? content.streamer : 'Unknown Streamer'}
        </p>
        <p className="text-gray-500 text-xs">
          {'game' in content ? content.game : 'Unknown Game'}
        </p>
        
        {/* Tags */}
        {'tags' in content && content.tags && content.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {content.tags.slice(0, 2).map((tag, index) => (
              <span 
                key={index}
                className="bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
