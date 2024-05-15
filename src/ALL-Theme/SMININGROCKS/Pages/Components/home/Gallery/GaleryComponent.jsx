import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Styles.css'

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import { storImagePath } from '../../../../Utils/globalFunctions/GlobalFunction';

const sliderData = [
  {
    imageUrl: "/images/HomePage/Gallery/GalleryImg01.jpg",
  },
  {
    imageUrl: "/images/HomePage/Gallery/GalleryImg02.jpg",
  },
  {
    imageUrl: "/images/HomePage/Gallery/GalleryImg03.jpg",
  },
  {
    imageUrl: "/images/HomePage/Gallery/GalleryImg04.jpg",
  },
  {
    imageUrl: "/images/HomePage/Gallery/GalleryImg05.jpg",
  },
  {
    imageUrl: "/images/HomePage/Gallery/GalleryImg06.jpg",
  },
  {
    imageUrl: "/images/HomePage/Gallery/GalleryImg07.jpg",
  },
  {
    imageUrl: "/images/HomePage/Gallery/GalleryImg08.jpg",
  },
  {
    imageUrl: "/images/HomePage/Gallery/GalleryImg09.jpg",
  },
  {
    imageUrl: "/images/HomePage/Gallery/GalleryImg10.jpg",
  },
];

export default function App() {
  return (
    <div id='mainGalleryConatinerID' className='mainSocialMediaConatiner'>
      <div>
        <p className='galeryComponents'>Gallery</p>
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
            <img src={storImagePath() + slide.imageUrl} alt={`Slide ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}