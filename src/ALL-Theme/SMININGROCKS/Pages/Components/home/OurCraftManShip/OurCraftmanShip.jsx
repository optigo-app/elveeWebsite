import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Styles.css'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { storImagePath } from '../../../../Utils/globalFunctions/GlobalFunction';


const sliderData = [
  {
    imageUrl: "/images/HomePage/Craftmenship/craftingImg01.jpg",
  },
  {
    imageUrl:"/images/HomePage/Craftmenship/craftingImg02.jpg",
  },
  {
    imageUrl:"/images/HomePage/Craftmenship/craftingImg03.jpg",
  },
];

export default function App() {
  return (
    <div id='craftmenshipId'>
    <div>
    <p className='craftmenship'>Our Craftmenship</p>
    </div>
      <Swiper
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
      {sliderData.map((slide, index) => (
          <SwiperSlide key={index}>
            <img loading="lazy" src={storImagePath() + slide.imageUrl} alt={`Slide ${index}`} style={{width:'100%', height:'40vh', objectFit:'cover'}} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}