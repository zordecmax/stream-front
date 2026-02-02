'use client';

import { IconArrowBarToLeft } from '@tabler/icons-react';
import StreamerItem from './StreamerItem';
import { useLayout } from "@/context/LayoutContext";
import { useRouter } from 'next/navigation';

interface StreamerData {
    name: string;
    viewers: number;
    game: string;
    avatar: string;
    link?: string;
}

interface LiveStreamersProps {
    streamers: StreamerData[];
}

export default function LiveStreamers({ streamers }: LiveStreamersProps) {
    const { toggleLeftSidebar, leftSidebarCollapsed } = useLayout();
    const router = useRouter();
    return (
        <aside className={`
        fixed h-[calc(100vh-var(--navbar-height))] left-0 p-4 top-[var(--navbar-height)] w-[var(--sidebar-width-left)] transition-all duration-300 ease-in-out
        flex flex-col gap-4
        `}>
            {/* title with toggle */}
            <div className={`flex items-center shrink-0
                ${leftSidebarCollapsed ? "justify-center" : "justify-between"}
                `}>
                {!leftSidebarCollapsed &&
                    <h3 className="text-lg md:text-xl font-bold text-white">
                        Jetzt live
                    </h3>
                }
                <IconArrowBarToLeft className={`w-6 h-6 cursor-pointer ${leftSidebarCollapsed ? "rotate-180" : ""}`} onClick={() => toggleLeftSidebar()} />
            </div>

            {/* list of streamers */}
            <div className="flex flex-col gap-4 flex-1 overflow-y-auto scroll-macos">
                {streamers.map((streamer, index) => (
                    <StreamerItem
                        key={index}
                        avatar={streamer.avatar}
                        name={streamer.name}
                        game={streamer.game}
                        viewers={streamer.viewers}
                        isLive={true}
                        {...streamer.link && streamer.link.length > 0 ?
                        { onClick: () => { router.push(streamer.link!) } }
                        : {}
                        }
                    />
                ))}
            </div>
        </aside>
    );
}
