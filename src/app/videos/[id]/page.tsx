"use client";

import { useEffect } from "react";
import { mockMessages } from "@/data/mockData";
import StreamChat from "@/components/Chat/StreamChat";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { IconHeart, IconPointFilled, IconUpload, IconDotsVertical } from '@tabler/icons-react';
import { useLayout } from "@/context/LayoutContext";

interface VideoPageProps {
  params: {
    id: string;
  };
}

export default function Video({ params }: VideoPageProps) {
  const { setRightSidebarEnabled } = useLayout();

  useEffect(() => {
    setRightSidebarEnabled(true);
    return () => setRightSidebarEnabled(false);
  }, [setRightSidebarEnabled]);

  return (
    <div className="flex flex-col gap-8 relative  overflow-y-auto scroll-macos">
      ID: {params.id}

      {/* video */}
      <div className="relative aspect-video bg-black rounded-lg">
        <iframe
          src="https://player.mux.com/rR8P8mSaKDzz02TsftugTUdI00cQPJX00oy?metadata-video-title=Test+Video&video-title=Test+Video"
          className="w-full h-full border-0 aspect-video"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
        ></iframe>
      </div>

      <div className='flex flex-wrap sm:flex-nowrap gap-2 gap-y-6 items-center w-full'>

        <img src="images/avatars/00.png" alt="user" className='w-18 h-18 object-cover aspect-square flex-none' />
        <div className='flex flex-col grow gap-1 flex-1'>
          <h4 className='font-semibold text-2xl'>MckyTV</h4>
          <span className='font-medium text-secondary'>Telekom ist das beste Netzwerk</span>

        </div>
        <div className="flex gap-2 basis-full sm:basis-auto">
          <Button variant="secondary"><IconHeart /></Button>
          <Button variant="primary" className="">Abonnieren</Button>
        </div>
      </div>

      <div className="flex gap-2 gap-y-6 -mt-2 m-0 sm:ms-20 justify-between items-center flex-wrap">
        <div className="flex gap-2">
          <Badge variant="primary" className="w-fit">Unterhaltung</Badge>
          <Badge variant="primary" className="w-fit">Live <IconPointFilled /></Badge>
        </div>
        <div className="flex gap-2">
          <IconUpload />
          <IconDotsVertical />
        </div>
      </div>

      <div className="bg-gray-800/80 p-4 rounded-lg space-y-4">
        <h3 className="text-lg font-semibold">Benutzerinformationen: MckyTV</h3>
        <p className="text-lg">1 339 585 Abonnenten</p>
        <p className="text-gray-300">
          Willkommen zu meinem Stream! Heute werden wir spannende Spiele spielen und viel Spaß haben. Vergesst nicht, den Kanal zu abonnieren und die Glocke zu aktivieren, um keine Streams zu verpassen!
        </p>
      </div>

      <StreamChat messages={mockMessages} />

    </div>
  );
}
