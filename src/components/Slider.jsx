import React, { useRef } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Slider.css'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Slider() {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                loop={true}
                speed={500}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide><img src={process.env.PUBLIC_URL + "/assets/slide01.webp"} alt="" /></SwiperSlide>
                <SwiperSlide><img src={process.env.PUBLIC_URL + "/assets/slide02.webp"} alt="" /></SwiperSlide>
            </Swiper>
        </>
    )
}
