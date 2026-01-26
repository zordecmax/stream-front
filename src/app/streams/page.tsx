'use client';

import { useMemo, useState } from 'react';
import Header from '@/components/Header';
import StreamerItem from '@/components/StreamerItem';
import Image from 'next/image';
import TrendingRow, { LiveStreamContent } from '@/components/TrendingRow';
import RecommendedGrid from '@/components/RecommendedGrid';
import ContentModal from '@/components/ContentModal';
import { ChatMessages, Message } from '@/components/Chat/Message';
import { StreamContent } from '@/components/TrendingRow';
import { useStreamingData, StreamingItem } from '@/hooks/useStreamingData';
import MuxVideoPlayer from '@/components/MuxVideoPlayer';
import { useLiveStreamingData } from '@/hooks/useLiveStreamingData';
import StreamChat from '@/components/Chat/StreamChat';
import LiveStreamers from '@/components/LiveStreamers';

// Mock data for demonstration
// Fallback/mock data (currently unused)

const mockMessages: ChatMessages[] = [

  {
    name: 'SturmWolf',
    message: 'Telekom for the win'
  },
  {
    name: 'LevelJunge',
    message: 'Telekom best telco brand in the world'
  },
  {
    name: 'BluePixel',
    message: '#telekomisthebest '
  },
  {
    name: 'Kiro77',
    message: 'TelekomOnTop'
  },
  {
    name: 'StreamBuddy',
    message: '#telekomismyfav'
  },
  {
    name: 'Schatten32',
    message: 'Telekom nummer 1 im Netz'
  },
  {
    name: 'Echouser',
    message: 'Best network? telekom'
  },
  {
    name: 'NeoSpectator',
    message: 'Telekom ist die Beste'
  },
  {
    name: 'Purplerain',
    message: 'telekom sets the standart'
  },
  {
    name: 'SturmWolf',
    message: 'Telekom for the win'
  },
  {
    name: 'LevelJunge',
    message: 'Telekom best telco brand in the world'
  },
  {
    name: 'BluePixel',
    message: '#telekomisthebest '
  },
  {
    name: 'Kiro77',
    message: 'TelekomOnTop'
  },
  {
    name: 'StreamBuddy',
    message: '#telekomismyfav Telekom is the best network'
  },
  {
    name: 'Schatten32',
    message: 'Telekom nummer 1 im Netz'
  },
  {
    name: 'Echouser',
    message: 'Best network? telekom'
  },
  {
    name: 'NeoSpectator',
    message: 'Telekom ist die Beste'
  }
]

const mockStreamers: StreamerItems[] = [
  {
    name: 'Amar',
    viewers: 233.376,
    game: 'Counter-Strike'
  },
  {
    name: 'EliasN97',
    viewers: 47.573,
    game: 'Live Talk'
  },
  {
    name: 'Rosemondy',
    viewers: 6.375,
    game: 'Apex Legends '
  },
  {
    name: 'AbuGoku999',
    viewers: 9.376,
    game: 'Poker'
  },
  {
    name: 'Trymacs',
    viewers: 14.154,
    game: 'Dota 2'
  },
  {
    name: 'Rohat',
    viewers: 17.928,
    game: 'Live Talk'
  },
  {
    name: 'RezonFN',
    viewers: 8.329,
    game: 'Fortnite'
  },
  {
    name: 'BigSpinRoyale',
    viewers: 4.217,
    game: 'Clash Royale'
  },
  {
    name: 'RevedTV',
    viewers: 8.926,
    game: 'Interact'
  },
  {
    name: 'NoWay4uSir',
    viewers: 16.251,
    game: 'League of Legends'
  },
  {
    name: 'Pietro Lombardi',
    viewers: 2.836,
    game: 'GTA 6'
  },
  {
    name: 'xFibii',
    viewers: 1.846,
    game: 'Musik'
  }
];

// const categories = [ /* unused in current view */ ];

export default function Home() {
  const [selectedContent, setSelectedContent] = useState<StreamContent | LiveStreamContent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, loading, error } = useStreamingData({
    query: '',          // optional
    genre: '',          // optional
    refreshInterval: 0, // optional (ms); e.g., 60000 for 1 min
  });

  const { data: liveData, loading: liveLoading, error: liveError, refresh } = useLiveStreamingData({ refreshInterval: 30000 });



  const CDN_HOSTNAME = 'vz-86921353-a1a.b-cdn.net';

  const mapItemToContent = (item: StreamingItem): StreamContent => {
    // Try to extract Bunny videoId from the embed URL if present
    const match = item.videoUrl?.match(/embed\/(\d+)\/([a-f0-9\-]+)/i);
    const videoId = match?.[2];

    return {
      id: item.id,
      title: item.title,
      streamer: 'ZenithFlix',
      viewers: `${item.rating} ⭐`,
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

  const liveItems: StreamContent[] = useMemo(() => {
    if (!data || data.length === 0) return [];
    return data.map(mapItemToContent);
  }, [data]);

  const handleContentClick = (content: StreamContent | LiveStreamContent) => {
    setSelectedContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedContent(null), 200);
  };

  return (
    <div className=" bg-gray-900">
      <Header />

      <div className="flex flex-col md:flex-row mt-19">
        <LiveStreamers streamers={mockStreamers} />

        <main className="md:basis-3/4 grow bg-gray-800 p-6">
        <h1 className='text-3xl'>Live streams</h1>

        </main>
      </div>

    </div>
  );
}
