import { mockMessages } from "@/data/mockData";
import StreamChat from "@/components/Chat/StreamChat";

export default function Video() {

  return (
    <div className="flex">
      <div className="md:basis-3/4 grow p-6 space-y-6">

        video

      </div>

      <StreamChat messages={mockMessages} />

    </div>
  );
}
