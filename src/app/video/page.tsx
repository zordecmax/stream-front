import { mockMessages } from "@/data/mockData";
import StreamChat from "@/components/Chat/StreamChat";
import MuxVideoPlayer from "@/components/MuxVideoPlayer";

export default function Video() {

  return (
    <div className="flex">
      <div className="md:basis-3/4 grow p-6 space-y-6">

        {/* video */}
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          <MuxVideoPlayer
            playbackId="7HBZewFQmdx2vj2VRHBf7LaBNnnkwB5XlmJw2lXmq4Q"
            metadata={{
              video_id: "video-1",
              video_title: "Sample Video"
            }}
            autoPlay={false}
            muted={false}
            loop={false}
            className="w-full h-full"
          />
        </div>

      </div>

      <StreamChat messages={mockMessages} />

    </div>
  );
}
