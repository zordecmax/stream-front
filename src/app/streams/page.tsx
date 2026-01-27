import VideoCard from '@/components/VideoCard';
import Badge from "@/components/Badge";

export default function Streams() {
  return (
    <>
    <div className="relative">
      <img src="images/thumbnails/stream-pic.png" alt="" className='w-full' />
              <Badge variant="semitransparent" size="lg" className="absolute bottom-6 right-6">Zuschauer - 223.900</Badge>
      </div>
      <h1 className='text-3xl font-bold'>Live streams</h1>

      <div className="flex gap-5">
        <VideoCard
          title="My first stream"
          name="EliasN97"
          viewers={128404}
          category="Live"
          image="images/thumbnails/i1.png"
          game="Live Talk"
        />

        <VideoCard
          title="Spieldurchlauf"
          name="Rosemondy"
          viewers={89404}
          category="Live"
          image="images/thumbnails/i2.png"
          game="Apex Legends"
        />

        <VideoCard
          title="Auf Sieg aus"
          name="AbuGoku999"
          viewers={18948}
          category="Live"
          image="images/thumbnails/i3.png"
          game="Poker"
        />

        <VideoCard
          title="Lass uns den ganzen Tag spielen"
          name="Trymacs"
          viewers={1804}
          category="Live"
          image="images/thumbnails/i4.png"
          game="Fortnite"
        />

      </div>
    </>
  );
}
