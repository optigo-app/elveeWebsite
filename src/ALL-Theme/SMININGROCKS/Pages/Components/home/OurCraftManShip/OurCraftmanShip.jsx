import React from 'react'
import './Styles.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
    "https://via.placeholder.com/800x400",
    "https://via.placeholder.com/800x400",
    "https://via.placeholder.com/800x400"
  ];

const OurCraftmanShip = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
      };
    
      return (
        <>
        <div className='' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <h5>Our CraftmenShip</h5>
        </div>
        <div style={{marginTop:'50px'}}>
        <Slider {...settings}>
          {images.map((imageUrl, index) => (
            <div key={index}>
              <img src={imageUrl} alt={`Slide ${index + 1}`} width='100%'/>
            </div>
          ))}
        </Slider>
        </div>
        </>
      );
    }

export default OurCraftmanShip