'use client';

import Image from 'next/image';
import BunnyVideoPlayer from './BunnyVideoPlayer';
import { LiveStreamContent, StreamContent } from './TrendingRow';
import Button from './ui/Button';
import Badge from './ui/Badge';
import { IconPlayerPlay } from '@tabler/icons-react';

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
  onClick?: () => void;
}

export default function ContentCard({ content, onClick }: ContentCardProps) {

  return (
    <div
      className="group/card cursor-pointer flex flex-col gap-2"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick && onClick();
        }
      }}
    >
      {/* Thumbnail/Player Container */}
      <div className="relative aspect-video rounded-lg bg-gray-800 mb-3 overflow-hidden">
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
        {/* {'playbackId' in content && content.playbackId && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            LIVE
          </div>
        )} */}

        {'isLive' in content && content.isLive && (
          <Button size="sm" className="absolute top-2 right-2">
            {content.isLive ? 'Live' : 'Aufgenommen'}
          </Button>
        )}

        {/* Viewers Count */}
        <Badge variant="semitransparent" className="absolute bottom-2 right-2">
          {'viewers' in content ? content.viewers : 0} Zuschauer
        </Badge>

      </div>

      {/* Content Info */}

      <div className='flex gap-3 items-center'>
        <img src={'streamerAvatar' in content ? content.streamerAvatar : 'images/avatars/default.png'} alt={'streamer' in content ? content.streamer : 'Unbekannter Streamer'} className='w-10 h-10 object-cover aspect-square rounded-full' />
        <div className='flex flex-col grow'>
          <h4 className='font-semibold'>{content.title}</h4>
          <span className='font-medium text-secondary'>
            {'streamer' in content ? content.streamer : 'Unbekannter Streamer'}
          </span>
        </div>
        {'game' in content && content.game && (
        <span className='font-medium text-muted'>
          {content.game ?? 'Unbekanntes Spiel'}
        </span>
        )}
      </div>

    </div>
  );
}
