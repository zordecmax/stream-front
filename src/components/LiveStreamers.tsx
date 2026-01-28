'use client';

import { IconArrowBarToLeft } from '@tabler/icons-react';
import StreamerItem from './StreamerItem';
import { useLayout } from "@/context/LayoutContext";

interface StreamerData {
    name: string;
    viewers: number;
    game: string;
}

interface LiveStreamersProps {
    streamers: StreamerData[];
}

export default function LiveStreamers({ streamers }: LiveStreamersProps) {
    const { toggleLeftSidebar, leftSidebarCollapsed } = useLayout();
    return (
        <aside className="
        fixed h-[calc(100vh-var(--navbar-height))] left-0 p-4 space-y-8 top-[var(--navbar-height)] w-[var(--sidebar-width-left)] overflow-y-auto scroll-macos
">
            <div className="flex flex-col gap-6 overflow-y-auto scroll-macos">
                <div className={`flex items-center
                    ${leftSidebarCollapsed ? "justify-center" : "justify-between"}
                `}>
                    {!leftSidebarCollapsed &&
                        <h3 className="text-lg md:text-xl font-bold text-white">
                            Jetzt live
                        </h3>
                    }
                    <IconArrowBarToLeft className={`w-6 h-6 hidden md:block cursor-pointer ${leftSidebarCollapsed ? "rotate-180" : ""}`} onClick={() => toggleLeftSidebar()} />
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
            </div>
        </aside>
    );
}
