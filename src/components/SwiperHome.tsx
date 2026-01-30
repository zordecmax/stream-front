import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow, Scrollbar, Mousewheel } from 'swiper/modules';
import { StreamContent, LiveStreamContent } from './TrendingRow';
import ContentCard from './ContentCard';
import { useRouter } from 'next/navigation';

export interface SwiperProps {
    title?: string;
    items: StreamContent[] | LiveStreamContent[] | null;
    onItemClick: (item: StreamContent | LiveStreamContent) => void;
    loading?: boolean;
}

export default function SwiperHome({ title, items, onItemClick, loading }: SwiperProps) {
    const router = useRouter();
    return (

        <Swiper
            scrollbar={true}
            slidesPerView={1}
            spaceBetween={10}
            // Responsive breakpoints
            breakpoints={{
                // when window width is >= 320px
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                // when window width is >= 480px
                480: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                    coverflowEffect: {
                        rotate: 20,
                        stretch: 15,
                        depth: 150,
                        modifier: 1.2,
                        slideShadows: false,
                    },
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                    coverflowEffect: {
                        rotate: 10,
                        stretch: 20,
                        depth: 200,
                        modifier: 1.3,
                        slideShadows: false,
                    }
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                    coverflowEffect: {
                        rotate: 10,
                        stretch: 20,
                        depth: 200,
                        modifier: 1.3,
                        slideShadows: false,
                    }
                },
                2000: {
                    slidesPerView: 5,
                    spaceBetween: 40,
                    coverflowEffect: {
                        rotate: 10,
                        stretch: 20,
                        depth: 200,
                        modifier: 1.3,
                        slideShadows: false,
                    }
                },
            }}
            mousewheel={{
                thresholdDelta: 5,
                thresholdTime: 200,
            }}
            effect={'coverflow'}
            coverflowEffect={{
                rotate: 40,
                stretch: 20,
                depth: 200,
                modifier: 1.2,
                slideShadows: false,
            }}
            grabCursor={true}
            loop={true}
            pagination={false}
            modules={[EffectCoverflow, Scrollbar, Mousewheel]}
            slideToClickedSlide={true}
        >
            {
                loading ? (
                    // Loading state: skeletons
                    <>
                        {[...Array(6)].map((_, i) => (
                            <SwiperSlide className='bg-[var(--background)]' key={i}>
                                <div
                                    className="flex-none w-[280px] md:w-[320px] animate-pulse"
                                >
                                    <div className="bg-gray-700 rounded-lg aspect-video mb-3"></div>
                                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                                    <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </>
                ) : (
                    items?.map((item) => (
                        <SwiperSlide className='bg-[var(--background)]' key={item.id}>
                            <ContentCard
                                content={item}
                                onClick={() => router.push(`/videos/${item.id}`)}
                            />
                        </SwiperSlide>
                    ))
                )
            }
        </Swiper>
    );
}
