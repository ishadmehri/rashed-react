import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import './Slider.css'
import { Pagination} from 'swiper/modules'
import { Box } from '@mui/material'

export default function CategorySlider({ categories }) {

    const allCategories = categories?.map((el) => <SwiperSlide key={el._id} >{
        <Box component="img" src={el.images[0]} alt={el.name} sx={{ borderRadius: "100%" }} />
    }</SwiperSlide>)
    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    '@0.00': {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    '@0.75': {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    '@1.00': {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                    '@1.50': {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                }}
                modules={[Pagination]}
                className="Category-Slider"
            >
                {allCategories}
            </Swiper>
        </>
    )
}
