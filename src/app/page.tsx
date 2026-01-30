'use client';

import { useMemo, useState } from 'react';
import TrendingRow, { LiveStreamContent } from '@/components/TrendingRow';
import RecommendedGrid from '@/components/RecommendedGrid';
import ContentModal from '@/components/ContentModal';
import { StreamContent } from '@/components/TrendingRow';
import { useStreamingData, StreamingItem } from '@/hooks/useStreamingData';
import SwiperHome from '@/components/SwiperHome';

// Mock data for demonstration
// Fallback/mock data (currently unused)
const mockStreams: StreamContent[] = [
  {
    id: '1',
    title: 'WTCS - Grand Finals 2025 | Highlights',
    streamer: 'WarThunder_Esports',
    viewers: '944',
    game: 'War Thunder',
    thumbnail: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=640&h=360&fit=crop',
    tags: ['Rerun', 'English', 'warthunder'],
    isLive: false,
  },
  {
    id: '2',
    title: 'World Creator To Challenger? 630LP',
    streamer: 'Naayil',
    viewers: '1.1K',
    game: 'League of Legends',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=640&h=360&fit=crop',
    tags: ['german', 'English'],
    isLive: true,
    bunnyConfig: {
      storageZoneId: 'vz-b63efbcf-f92',
      storageDomain: 'b-cdn.net',
      videoId: 'b98c3c67-402c-4471-9a9e-7fb2a1917ea8',
    },
  },
  {
    id: '3',
    title: '🐸 ALL NIGHT STREAM 🐸 DRAMA 🐸 N...',
    streamer: 'xQc',
    viewers: '14.9K',
    game: 'League of Legends',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=640&h=360&fit=crop',
    tags: ['English', 'femboy'],
    isLive: true,
  },
  {
    id: '4',
    title: 'Main Broadcast: [EN] Stream A | AST ...',
    streamer: 'StarLadder_cs_en',
    viewers: '70.9K',
    game: 'Counter-Strike',
    thumbnail: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=640&h=360&fit=crop',
    tags: ['Rerun', 'CS2', 'English', 'starladder'],
    isLive: true,
  },
  {
    id: '5',
    title: '[DROPS] WORKING ON BEST END ING ...',
    streamer: 'LVNDMARK',
    viewers: '18.8K',
    game: 'Escape from Tarkov',
    thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=640&h=360&fit=crop',
    tags: ['English', 'DropsEnabled'],
    isLive: true,
  },
  {
    id: '6',
    title: 'Just Chatting with the community!',
    streamer: 'BananaJuju',
    viewers: '3K',
    game: 'Just Chatting',
    thumbnail: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=640&h=360&fit=crop',
    tags: ['Scuff', 'MONKEY'],
    isLive: true,
  },
];

export default function Home() {
  const [selectedContent, setSelectedContent] = useState<StreamContent | LiveStreamContent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, loading, error } = useStreamingData({
    query: '',          // optional
    genre: '',          // optional
    refreshInterval: 0, // optional (ms); e.g., 60000 for 1 min
  });

  // const { data: liveData, loading: liveLoading, error: liveError, refresh } = useLiveStreamingData({ refreshInterval: 30000 });

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
    <>
      <SwiperHome
        items={liveItems}
        loading={loading}
        onItemClick={handleContentClick}
      />

      {/* Live Channels */}
      {/* <TrendingRow
        title="Live streams"
        items={liveData}
        loading={liveLoading}
        onItemClick={handleContentClick}
      /> */}
      {/* Recorded Videos */}
      <TrendingRow
        title="Aufgezeichnete Videos"
        items={liveItems}
        loading={loading}
        onItemClick={handleContentClick}
      />

      {/* Recommended Grid */}
      {/* <RecommendedGrid
        title="Empfohlen für Sie"
        items={liveItems.length ? liveItems : mockStreams}
        onItemClick={handleContentClick}
      /> */}

      {/* Modal */}
      {selectedContent && (
        <ContentModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          content={selectedContent}
        />
      )}
    </>
  );
}
