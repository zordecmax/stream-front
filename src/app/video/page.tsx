import { mockMessages } from "@/data/mockData";
import StreamChat from "@/components/Chat/StreamChat";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import { IconHeart, IconPointFilled } from '@tabler/icons-react';

export default function Video() {

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:basis-3/4 grow space-y-6">

        {/* video */}
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">

          <iframe
            src="https://player.mux.com/rR8P8mSaKDzz02TsftugTUdI00cQPJX00oy?metadata-video-title=Test+Video&video-title=Test+Video"
            className="w-full h-full border-0 aspect-video"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen
          ></iframe>
        </div>


        <div className='flex gap-2 items-center'>
          <img src="images/avatars/00.png" alt="user" className='w-18 h-18 object-cover aspect-square' />
          <div className='flex flex-col grow gap-1'>
            <h4 className='font-semibold text-2xl'>MckyTV</h4>
            <span className='font-medium text-secondary'>Telekom is the best network</span>

          </div>
          <Button variant="secondary"><IconHeart /></Button>
          <Button variant="primary">Abonnieren</Button>
        </div>
        <div className="flex gap-2 -mt-2 ms-20">
          <Badge variant="primary" className="w-fit">Unterhaltung</Badge>
          <Badge variant="primary" className="w-fit">Live <IconPointFilled /></Badge>
        </div>

        <div className="bg-gray-800/80 p-4 rounded-lg space-y-4">
          <h3 className="text-lg font-semibold">Benutzerinformationen: MckyTV</h3>
          <p className="text-lg">1 339 585 Abonnenten</p>
          <p className="text-gray-300">
            Willkommen zu meinem Stream! Heute werden wir spannende Spiele spielen und viel Spaß haben. Vergesst nicht, den Kanal zu abonnieren und die Glocke zu aktivieren, um keine Streams zu verpassen!
          </p>
        </div>
      </div>

      <StreamChat messages={mockMessages} />

    </div>
  );
}
