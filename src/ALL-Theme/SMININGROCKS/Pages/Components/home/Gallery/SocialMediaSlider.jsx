import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Styles.css'

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';

const sliderData = [
  {
    imageUrl: 'https://via.placeholder.com/600x400',
  },
  {
    imageUrl: 'https://via.placeholder.com/600x400',
  },
  {
    imageUrl: 'https://via.placeholder.com/600x400',
  },
  {
    imageUrl: 'https://via.placeholder.com/600x400',
  },
  {
    imageUrl: 'https://via.placeholder.com/600x400',
  },
  {
    imageUrl: 'https://via.placeholder.com/600x400',
  },
  {
    imageUrl: 'https://via.placeholder.com/600x400',
  },
  // Add more sliderData items as needed
];

export default function SocialMedia() {
  return (
    <div className='mainSocialMediaConatiner'>
      <div>
        <p className='mt-5 mb-4' style={{ textAlign: 'center', fontSize: '20px' }}>Social Media</p>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide key={index} style={{ marginRight: '10px' }}>
            <img src={slide.imageUrl} alt={`Slide ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}