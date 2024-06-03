import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Styles.css'

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import { storImagePath } from '../../../../Utils/globalFunctions/GlobalFunction';

const sliderData = [
  {
    imageUrl: "/images/HomePage/SocialMedia/socialMedia1.jpg",
  },
  {
    imageUrl: "/images/HomePage/SocialMedia/socialMedia2.jpg",
  },
  {
    imageUrl: "/images/HomePage/SocialMedia/socialMedia3.jpg",
  },
  {
    imageUrl: "/images/HomePage/SocialMedia/socialMedia4.jpg",
  },
  {
    imageUrl: "/images/HomePage/SocialMedia/socialMedia5.jpg",
  },
];

export default function SocialMedia() {
  return (
    <div id='mainSocialMediaConatinerID' className='mainSocialMediaConatiner'>
      <div>
        <p className='socialmediaptag'>Social Media</p>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 0,
          },  
          1024: {
            slidesPerView: 5,
            spaceBetween: 0,
          },
          1240: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
        }}
        modules={[Pagination]}
        // pagination={{ clickable: true }}
        className="mySwiper"
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide key={index} style={{ marginRight: '0px' }}>
            <img loading="lazy" src={storImagePath() + slide.imageUrl} alt={`Slide ${index}`} style={{objectFit:'contain', width:'100%'}} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}