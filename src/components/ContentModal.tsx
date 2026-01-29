'use client';

import { useEffect, useRef } from 'react';
import { LiveStreamContent, StreamContent } from './TrendingRow';
import Image from 'next/image';
import BunnyVideoPlayer from './BunnyVideoPlayer';
import MuxVideoPlayer from './MuxVideoPlayer';

// interface LiveStreamContent  {
//   playbackId: string;
//   id: string;
//   title: string;
//   streamer: string;
//   viewers?: number;
// }

interface ContentModalProps {
  isOpen: boolean;
  content: StreamContent | LiveStreamContent | null;
  onClose: () => void;
  isLive?: boolean;
}

export default function ContentModal({ isOpen, content, onClose, isLive }: ContentModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';

      // Focus trap - focus the close button when modal opens
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !content) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      {/* Modal Container */}
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl bg-gray-900 rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-gray-800/90 hover:bg-gray-700 rounded-full transition-colors group"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video/Thumbnail Section */}
        <div className="relative aspect-video bg-black">
          {content && 'playbackId' in content && content.playbackId ? (
            <MuxVideoPlayer
              //   playbackId="7HBZewFQmdx2vj2VRHBf7LaBNnnkwB5XlmJw2lXmq4Q"
              playbackId={content.playbackId}
              metadata={{
                video_id: content.id,
                video_title: content.title
              }}
              autoPlay={true}
              muted={false}
              loop={false}
              className="w-full h-full object-contain"
            />
          ) : (<>

          </>)}
          {'bunnyConfig' in content && content.bunnyConfig ? (
            <BunnyVideoPlayer
              config={content.bunnyConfig}
              autoPlay
              muted
              watchId={content.id}
              poster={content.thumbnailUrl}
              className="w-full h-full object-contain"
            />
          ) : (
            <>
              <Image
                src={('thumbnailUrl' in content ? content.thumbnailUrl : null) || ('thumbnail' in content ? content.thumbnail : null) || '/window.svg'}
                alt={content.title}
                fill
                className="object-cover"
                priority
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  className="w-20 h-20 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
                  aria-label="Play stream"
                >
                  <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </>
          )}

          {/* Live Badge */}
          {content && 'playbackId' in content && content.playbackId && (
            <div className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold px-3 py-1.5 rounded flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              LIVE
            </div>
          )}
        </div>

        {/* Content Info Section */}
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h2
                id="modal-title"
                className="text-2xl md:text-3xl font-bold text-white mb-2"
              >
                {content.title}
              </h2>
              <div className="flex items-center gap-3 text-gray-400">
                <span className="font-semibold text-purple-400">{'streamer' in content ? content.streamer : 'Unbekannter Streamer'}</span>
                <span>•</span>
                {'viewers' in content && content.viewers && (<span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  {content.viewers} Zuschauer
                </span>)}
              </div>
            </div>
          </div>

          {/* Game/Category */}
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-1">Kategorie</p>
            <p className="text-white font-medium">{'game' in content ? content.game : 'Unbekannte Kategorie'}</p>
          </div>

          {/* Tags */}
          {'tags' in content && content.tags && content.tags.length > 0 && (
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">Tags</p>
              <div className="flex flex-wrap gap-2">
                {content.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button className="flex-1 min-w-[140px] bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Jetzt ansehen
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Folgen
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-lg transition-colors" aria-label="Teilen">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
