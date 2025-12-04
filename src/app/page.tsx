'use client';

import { useMemo, useState } from 'react';
import Header from '@/components/Header';
import Image from 'next/image';
import TrendingRow from '@/components/TrendingRow';
import RecommendedGrid from '@/components/RecommendedGrid';
import ContentModal from '@/components/ContentModal';
import { StreamContent } from '@/components/TrendingRow';
import { useStreamingData, StreamingItem } from '@/hooks/useStreamingData';

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

// const categories = [ /* unused in current view */ ];

export default function Home() {
  const [selectedContent, setSelectedContent] = useState<StreamContent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, loading, error } = useStreamingData({
    query: '',          // optional
    genre: '',          // optional
    refreshInterval: 0, // optional (ms); e.g., 60000 for 1 min
  });

  console.log('Streaming Data:', { data, loading, error });

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

  const handleContentClick = (content: StreamContent) => {
    setSelectedContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedContent(null), 200);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <main className="px-4 md:px-8 lg:px-12 py-8 space-y-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image 
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&h=400&fit=crop" 
              alt="Featured content"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <h1 className="text-4xl font-bold text-white mb-2">Featured Live Stream</h1>
              <p className="text-gray-300 text-lg">Watch the best content right now</p>
            </div>
          </div>
        </section>

        {/* Live Channels */}
        <TrendingRow 
          title="Live Channels"
          items={liveItems}
          onItemClick={handleContentClick}
        />

        {/* Browse Categories */}
        {/* <TrendingRow 
          title="Browse Categories"
          items={categories}
          onItemClick={handleContentClick}
        /> */}

        {/* Recommended Grid */}
        <RecommendedGrid
          title="Recommended for You"
          items={liveItems.length ? liveItems : mockStreams}
          onItemClick={handleContentClick}
        />
      </main>

      {/* Modal */}
      {selectedContent && (
        <ContentModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          content={selectedContent}
        />
      )}
    </div>
  );
}
