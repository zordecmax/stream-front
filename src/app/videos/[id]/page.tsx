'use client';

import { useParams } from 'next/navigation';
import { useStreamingData, StreamingItem } from '@/hooks/useStreamingData';
import VideoContent from '@/components/video/VideoContent';

import { useEffect, useState } from "react";
import { mockMessages } from "@/data/mockData";
import StreamChat from "@/components/Chat/StreamChat";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { IconHeart, IconPointFilled, IconUpload, IconDotsVertical } from '@tabler/icons-react';
import { useLayout } from "@/context/LayoutContext";
import { StreamContent, LiveStreamContent } from '@/components/TrendingRow';
import { useMemo } from 'react';

const CDN_HOSTNAME = 'vz-86921353-a1a.b-cdn.net';

const mapItemToContent = (item: StreamingItem): StreamContent => {
  // Try to extract Bunny videoId from the embed URL if present
  const match = item.videoUrl?.match(/embed\/(\d+)\/([a-f0-9\-]+)/i);
  const videoId = match?.[2];

  return {
    id: item.id,
    title: item.title,
    streamer: 'HYPE',
    streamerAvatar: '/images/avatars/01.png',
    viewers: `${Math.floor(Math.random() * 10000).toLocaleString('de-DE')}`,
    game: item.genre,
    thumbnail: item.thumbnailUrl,
    tags: item.cast?.slice(0, 3) ?? [],
    isLive: true,
    bunnyConfig: {
      cdnHostname: CDN_HOSTNAME,
      videoId: videoId ?? undefined,
    },
  };
};

export default function VideoPage() {
  const { setRightSidebarEnabled } = useLayout();
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useStreamingData({});

  const item = data?.find(item => item.id === id);

  const content = useMemo(() => {
    return item ? mapItemToContent(item) : null;
  }, [item]);

  useEffect(() => {
    setRightSidebarEnabled(true);
    return () => setRightSidebarEnabled(false);
  }, [setRightSidebarEnabled]);

  return (
    <div className="flex flex-col gap-8 relative  overflow-y-auto scroll-macos">
      {loading ? (
        <>
          <div className=" w-full animate-pulse">
            <div className="bg-gray-700 rounded-lg aspect-video mb-3"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
          </div>
        </>
      ) : (
        <>
          {!content ? <div>Video not found</div> :
            <>
              <VideoContent content={content} autoPlay={true} />

              <div className='flex flex-wrap sm:flex-nowrap gap-2 gap-y-6 items-center w-full'>

                <img src="/images/avatars/00.png" alt="user" className='w-18 h-18 object-cover aspect-square flex-none' />
                <div className='flex flex-col grow gap-1 flex-1'>
                  <h4 className='font-semibold text-2xl'>{content.streamer}</h4>
                  <span className='font-medium text-secondary'>Telekom ist das beste Netzwerk</span>

                </div>
                <div className="flex gap-2 basis-full sm:basis-auto">
                  <Button variant="secondary"><IconHeart /></Button>
                  <Button variant="primary" className="">Abonnieren</Button>
                </div>
              </div>

              <div className="flex gap-2 gap-y-6 -mt-2 m-0 sm:ms-20 justify-between items-center flex-wrap">
                <div className="flex gap-2">
                  <Badge variant="primary" className="w-fit">{content.game}</Badge>
                  <Badge variant="primary" className="w-fit">Live <IconPointFilled /></Badge>
                </div>
                <div className="flex gap-2">
                  <IconUpload />
                  <IconDotsVertical />
                </div>
              </div>

              <div className="bg-gray-800/80 p-4 rounded-lg space-y-4">
                <h3 className="text-lg font-semibold">{content.title}</h3>
                <p className="text-lg">
                  {content.viewers} Zuschauer
                </p>
                <p className="text-gray-300">
                  Willkommen zu meinem Stream! Heute werden wir spannende Spiele spielen und viel Spaß haben. Vergesst nicht, den Kanal zu abonnieren und die Glocke zu aktivieren, um keine Streams zu verpassen!
                </p>
              </div>

              <StreamChat messages={mockMessages} />
            </>
          }
        </>
      )}
    </div>
  );
}
