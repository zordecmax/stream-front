'use client';

import { IconArrowBarToLeft } from '@tabler/icons-react';
import StreamerItem from './StreamerItem';

interface StreamerData {
    name: string;
    viewers: number;
    game: string;
}

interface LiveStreamersProps {
    streamers: StreamerData[];
}

export default function LiveStreamers({ streamers }: LiveStreamersProps) {
    return (
        <aside className="md:basis-75 p-4 space-y-8 sticky top-20 h-fit">
            <div className="flex justify-between items-center">
                <h3 className="text-lg md:text-xl font-bold text-white">
                    Jetzt live
                </h3>
                <IconArrowBarToLeft className="w-6 h-6" />
            </div>
            <div className="space-y-4">
                {streamers.map((streamer, index) => (
                    <StreamerItem
                        key={index}
                        avatar={`/images/avatars/0${String(index + 1)}.png`}
                        name={streamer.name}
                        game={streamer.game}
                        viewers={streamer.viewers}
                        isLive={true}
                    />
                ))}
            </div>
        </aside>
    );
}
