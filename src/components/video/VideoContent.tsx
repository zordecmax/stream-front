'use client';

import Image from 'next/image';
import { LiveStreamContent, StreamContent } from '../TrendingRow';
import BunnyVideoPlayer from '../BunnyVideoPlayer';
import MuxVideoPlayer from '../MuxVideoPlayer';

interface VideoContentProps {
    content: StreamContent | LiveStreamContent;
    autoPlay?: boolean;
}

export default function VideoContent({ content, autoPlay = true }: VideoContentProps) {
    return (
        <>
            {/* Video / Thumbnail */}
            {'playbackId' in content && content.playbackId ? (
                <MuxVideoPlayer
                    playbackId={content.playbackId}
                    metadata={{
                        video_id: content.id,
                        video_title: content.title,
                    }}
                    autoPlay={autoPlay}
                    muted={false}
                    loop={false}
                    className="w-full h-full object-contain"
                />
            ) : 'bunnyConfig' in content && content.bunnyConfig ? (
                <BunnyVideoPlayer
                    config={content.bunnyConfig}
                    autoPlay={autoPlay}
                    muted
                    watchId={content.id}
                    poster={content.thumbnailUrl}
                    className="w-full h-full object-contain"
                />
            ) : (
                <>
                    <Image
                        src={
                            ('thumbnailUrl' in content && content.thumbnailUrl) ||
                            ('thumbnail' in content && content.thumbnail) ||
                            '/window.svg'
                        }
                        alt={content.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </>
            )}
        </>
    );
}
