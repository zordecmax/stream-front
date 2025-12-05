'use client';

import MuxPlayer from '@mux/mux-player-react';
// import MuxPlayer from '@mux/mux-player';

type MuxVideoPlayerProps = {
  playbackId: string;
  className?: string;
  /** Optional Mux metadata for analytics */
  metadata?: {
    video_id?: string;
    video_title?: string;
    viewer_user_id?: string;
    [key: string]: unknown;
  };
  /** Autoplay, muted, loop flags */
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
};

export default function MuxVideoPlayer({
  playbackId,
  className,
  metadata,
  autoPlay = false,
  muted = false,
  loop = false,
}: MuxVideoPlayerProps) {
  return (
    <MuxPlayer
      playbackId={playbackId}
      className={className}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      metadata={metadata}
    />
  );
}
