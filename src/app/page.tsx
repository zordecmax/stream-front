'use client';

import CategoryCard from '@/components/CategoryCard';
import VideoCard from '@/components/VideoCard';
import Badge from "@/components/ui/Badge";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="relative">
        <div className="video-container w-full aspect-2/1 md:aspect-4/1 lg:aspect-11/3 rounded-lg overflow-hidden">
          <video
            className="w-full h-full object-cover bg-black/20"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="https://vz-86921353-a1a.b-cdn.net/f176bd75-a4b7-4eb0-a320-b9afde87b9bc/play_720p.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <Badge variant="semitransparent" size="lg" className="absolute bottom-6 right-6">Zuschauer - 12,364</Badge>
      </div>

      <h1 className='text-3xl font-bold'>Live-Streams</h1>

      <div className="flex gap-5 w-full overflow-x-auto min-w-0 scroll-macos">
        <VideoCard
          title="Mein erster Stream"
          channelName="EliasN97"
          viewers={12364}
          category="Live"
          image="/images/thumbnails/i1.png"
          avatar="/images/avatars/11.png"
          game="Live-Gespräch"
          onClick={() => { router.push('/videos/0679d9f7-f626-4399-bb8b-1d37613681c9') }}
        />

        <VideoCard
          title="Spieldurchlauf"
          channelName="Rosemondy"
          viewers={89404}
          category="Live"
          image="/images/thumbnails/i2.png"
          avatar="/images/avatars/12.png"
          game="Apex Legends"
          onClick={() => { router.push('/videos/0679d9f7-f626-4399-bb8b-1d37613681c9') }}
        />

        <VideoCard
          title="Auf Sieg aus"
          channelName="AbuGoku999"
          viewers={18948}
          category="Live"
          image="/images/thumbnails/i3.png"
          avatar="/images/avatars/13.png"
          game="Poker"
          onClick={() => { router.push('/videos/0679d9f7-f626-4399-bb8b-1d37613681c9') }}
        />

        <VideoCard
          title="Lass uns den ganzen Tag spielen"
          channelName="Trymacs"
          viewers={1804}
          category="Live"
          image="/images/thumbnails/i4.png"
          avatar="/images/avatars/14.png"
          game="Fortnite"
          onClick={() => { router.push('/videos/0679d9f7-f626-4399-bb8b-1d37613681c9') }}
        />
      </div>

      <h2 className='text-3xl font-bold'>Kategorien</h2>

      <div className="flex gap-5 w-full overflow-x-auto min-w-0 scroll-macos">
        <CategoryCard
          title="Grand Theft Auto"
          viewers={128.404}
          category="IRL"
          image="/images/thumbnails/01.png"
        />

        <CategoryCard
          title="Interaktion"
          viewers={96.401}
          category="Action"
          image="/images/thumbnails/06.png"
        />

        <CategoryCard
          title="IRL"
          viewers={89.404}
          category="Abenteuer"
          image="/images/thumbnails/02.png"
        />

        <CategoryCard
          title="Fortnite"
          viewers={39.441}
          category="Action"
          image="/images/thumbnails/05.png"
        />

        <CategoryCard
          title="Musik"
          viewers={23.049}
          category="IRL"
          image="/images/thumbnails/07.png"
        />

        <CategoryCard
          title="EAFC"
          viewers={18.948}
          category="Action"
          image="/images/thumbnails/03.png"
        />

        <CategoryCard
          title="Sport"
          viewers={18.040}
          category="Abenteuer"
          image="/images/thumbnails/04.png"
        />
      </div>

      <h2 className='text-3xl font-bold mt-8'>Für dich empfohlen</h2>

      <div className="flex gap-5 w-full overflow-x-auto min-w-0 scroll-macos">
        <CategoryCard
          title="DiE GRÖSSTE SPENDE ALLER ZEITEN!"
          image="/images/vertical/01.png"
          width="min-w-[150px] w-[150px]"
        />
        <CategoryCard
          title="Schnelles Letsplay"
          image="/images/vertical/02.png"
          width="min-w-[150px] w-[150px]"
        />
        <CategoryCard
          title="Wie ich von 0 auf 100 Zuschauer..."
          image="/images/vertical/03.png"
          width="min-w-[150px] w-[150px]"
        />
        <CategoryCard
          title="Warum ich in Fortnite nicht..."
          image="/images/vertical/04.png"
          width="min-w-[150px] w-[150px]"
        />
        <CategoryCard
          title="EAFC 25: Ab Erscheinungs..."
          image="/images/vertical/05.png"
          width="min-w-[150px] w-[150px]"
        />
        <CategoryCard
          title="Ich werde das NIEMALS spielen..."
          image="/images/vertical/06.png"
          width="min-w-[150px] w-[150px]"
        />
        <CategoryCard
          title="Das geheime Ende NEIN AN..."
          image="/images/vertical/07.png"
          width="min-w-[150px] w-[150px]"
        />
        <CategoryCard
          title="Level 1 vs. Level 100"
          image="/images/vertical/08.png"
          width="min-w-[150px] w-[150px]"
        />
      </div>

    </>
  );
}
