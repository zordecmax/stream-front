import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';

// import required modules
import { EffectCoverflow, Scrollbar, Mousewheel } from 'swiper/modules';

export default function SwiperHome() {
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
            centeredSlides={true}
            loop={true}
            pagination={false}
            modules={[EffectCoverflow, Scrollbar, Mousewheel]}
        >
            {Array.from({ length: 7 }, (_, i) => (
                <SwiperSlide>
                    <img src={`/images/slider/0${i}.jpg`} alt="stream" className='w-auto h-52 md:h-80 object-cover aspect-video' />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
