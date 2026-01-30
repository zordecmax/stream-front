import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import required modules
import { EffectCoverflow, Scrollbar, Mousewheel } from 'swiper/modules';

export default function SwiperHome() {
  return (
    <>
      <Swiper
        scrollbar={true}
        mousewheel={{
            thresholdDelta: 5,
            thresholdTime: 200,
        }}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        loop={true}
        coverflowEffect={{
          rotate: 40,
          stretch: 20,
          depth: 200,
          modifier: 1.2,
          slideShadows: false,
        }}
        pagination={false}
        modules={[EffectCoverflow, Scrollbar, Mousewheel]}
      >

        <SwiperSlide>
            <img src="https://media.istockphoto.com/id/2222954676/photo/caucasian-teenager-boy-wearing-headphones-gaming-and-streaming-online-at-desk.jpg?s=2048x2048&w=is&k=20&c=3h-xZSvg0W1XbjAdPdO-quWzxRHGIfelRGH-5eg5BQk=" alt="stream" className='w-lg' />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://media.istockphoto.com/id/1447239783/photo/young-teenager-plays-the-computer-and-celebrates-victory-in-video-game-with-a-clenched-fist.jpg?s=2048x2048&w=is&k=20&c=_ENUesD-MmkHV9FeNlqLGxQAgpww5rUi-I7JDlt5t-s=" alt="stream" className='w-lg' />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://media.istockphoto.com/id/2170026270/photo/casually-clothed-gamer-celebrating-video-game-victory-while-playing-games-at-home.jpg?s=2048x2048&w=is&k=20&c=iGfCMDeQXJHLWa3p8TbvpILXfCYG6utf3Ld4BGnKoio=" alt="stream" className='w-lg' />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://media.istockphoto.com/id/1563409200/photo/man-watching-tv-with-remote-control-in-hand.jpg?s=2048x2048&w=is&k=20&c=DTwbPsmkle-7t6Sm8KCM_JGVKDzY5eWzVnwWnBfV1wg=" alt="stream" className='w-lg' />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://media.istockphoto.com/id/2240283461/photo/attractive-asian-male-gamer-enjoys-playing-online-games-on-his-computer-feeling-happy-while.jpg?s=2048x2048&w=is&k=20&c=8LR_IVvEa-sy1xGj5nMfgRLUa3W3mfyo3Wd2jE5sHiY=" alt="stream" className='w-lg' />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://media.istockphoto.com/id/1320976219/photo/young-asia-lady-fashion-designer-using-mobile-phone-receiving-purchase-order-and-showing.jpg?s=2048x2048&w=is&k=20&c=_p_CRWYZBD7cy4JFLVuMGAFWnzXoIbd7nAqXpswGOIE=" alt="stream" className='w-lg' />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://media.istockphoto.com/id/1397054568/photo/girl-plays-video-game-online-and-streaming-at-home.jpg?s=2048x2048&w=is&k=20&c=H5qZ1ilACV5-JoP_L8kH2Pb0ymzk-3W-UIQIdTqk-bo=" alt="stream" className='w-lg' />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://media.istockphoto.com/id/1705746330/photo/closeup-of-young-asian-women-live-streaming-on-phone-show-new-collection-fashion-clothes-to.jpg?s=2048x2048&w=is&k=20&c=4k0wc2s-_anqQKnJlZe_wZSUrcSUFUFu4dzzO1F-cZE=" alt="stream" className='w-lg' />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
