'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef } from 'react';
import Hls, { Events as HlsEvents, ErrorTypes as HlsErrorTypes } from 'hls.js';

export type BunnyVideoConfig = {
  /** Storage Zone ID, e.g. "vz-86921353-a1a" */
  storageZoneId?: string;
  /** Storage domain (host), default: "b-cdn.net" */
  storageDomain?: string;
  /** Optional full CDN hostname, e.g. "vz-86921353-a1a.b-cdn.net". If provided, it takes precedence over storageZoneId+storageDomain. */
  cdnHostname?: string;
  /** Bunny Stream video GUID (optional, falls back to default if missing) */
  videoId?: string;
};

export type BunnyVideoPlayerProps = {
  config: BunnyVideoConfig;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
};

const DEFAULT_VIDEO_ID = 'e0911256-b712-4b72-83ed-4b046a654e81';

function buildManifestUrl({ storageZoneId, storageDomain = 'b-cdn.net', cdnHostname, videoId }: BunnyVideoConfig) {
  const host = cdnHostname ?? (storageZoneId ? `${storageZoneId}.${storageDomain}` : undefined);
  if (!host) throw new Error('BunnyVideoPlayer: Missing CDN host. Provide cdnHostname or storageZoneId.');
  const id = videoId && videoId.length > 0 ? videoId : DEFAULT_VIDEO_ID;
//   console.log('BunnyVideoPlayer: Using manifest URL', { host, id });
  console.log('Video id:', videoId);
  return `https://${host}/${id}/playlist.m3u8`;
}

export default function BunnyVideoPlayer({ config, autoPlay = false, muted = false, loop = false, className }:
  BunnyVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const plyrRef = useRef<Plyr | null>(null);
console.log('BunnyVideoPlayer config:', config);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Dynamically import Plyr on client to avoid SSR "document is not defined"
  let plyrInstance: unknown;
    const setupPlyr = async () => {
      const mod = await import('plyr');
      const PlyrCtor: any = (mod as any).default ?? mod;
      plyrInstance = new PlyrCtor(video, {
        controls: [
          'play-large', 'play', 'progress', 'current-time', 'duration', 'mute', 'volume', 'settings', 'pip', 'airplay', 'fullscreen'
        ],
        autoplay: autoPlay,
        muted,
        loop: { active: loop },
      });
      plyrRef.current = plyrInstance as Plyr;
    };
    setupPlyr();

    const manifestUrl = buildManifestUrl(config);

    // If HLS is supported natively (Safari), set src directly
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = manifestUrl;
  } else if (Hls.isSupported()) {
      // Use hls.js for other browsers
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(manifestUrl);
      hls.attachMedia(video);

  const onError = (_event: string, data: { fatal?: boolean; type?: string }) => {
        // Try to recover on certain errors
        if (data.fatal) {
          switch (data.type) {
            case HlsErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case HlsErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
        console.error('HLS error', data);
      };
  hls.on(HlsEvents.ERROR, onError);

      // Cleanup hls and plyr on unmount
      return () => {
        hls.destroy();
      };
    } else {
      // Fallback: set src; browser may not play HLS
      video.src = manifestUrl;
    }

    return () => {
      if (plyrRef.current) {
        plyrRef.current.destroy();
        plyrRef.current = null;
      }
    };
  }, [config, autoPlay, muted, loop]);

  return (
    <video
      ref={videoRef}
      className={className}
      playsInline
      controls
    />
  );
}
