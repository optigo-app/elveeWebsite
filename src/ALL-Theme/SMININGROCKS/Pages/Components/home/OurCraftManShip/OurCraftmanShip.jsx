import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';


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
  // Add more sliderData items as needed
];

export default function App() {
  return (
    <>
    <div>
    <p className='mt-5 mb-4' style={{textAlign:'center', fontSize:'20px'}}>Our Craftmenship</p>
    </div>
      <Swiper
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
      {sliderData.map((slide, index) => (
          <SwiperSlide key={index}>
            <img src={slide.imageUrl} alt={`Slide ${index}`} style={{width:'100%', height:'40vh', objectFit:'cover'}} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}