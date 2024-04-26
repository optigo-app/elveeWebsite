import React, { useState } from 'react'
import './FeaturedCollection.css'
import { Cards } from '../HomeCards/Cards'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import { storImagePath } from '../../../../Utils/globalFunctions/GlobalFunction';

export default function FeaturedCollection() {

    const [ring1ImageChange, setRing1ImageChange] = useState(false);
    const [ring2ImageChange, setRing2ImageChange] = useState(false);
    const [ring3ImageChange, setRing3ImageChange] = useState(false);
    const [ring4ImageChange, setRing4ImageChange] = useState(false);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        // prevArrow: false, 
        // nextArrow: false,
    };

    

    const handleMouseEnterRing1 = () => {
        setRing1ImageChange(true)
    }
    const handleMouseLeaveRing1 = () => {
        setRing1ImageChange(false)
    }

    const handleMouseEnterRing2 = () => {
        setRing2ImageChange(true)
    }
    const handleMouseLeaveRing2 = () => {
        setRing2ImageChange(false)
    }

    const handleMouseEnterRing3 = () => {
        setRing3ImageChange(true)
    }
    const handleMouseLeaveRing3 = () => {
        setRing3ImageChange(false)
    }

    const handleMouseEnterRing4 = () => {
        setRing4ImageChange(true)
    }
    const handleMouseLeaveRing4 = () => {
        setRing4ImageChange(false)
    }
    return (
        <div>
            <div className='linkingLoveMain'>
                <div className='linkingLove'>
                    <p className='linkingTitle'>LINKING LOVE</p>
                    <p className='linkingDesc'>Ready to share link with your loved ones!</p>
                    <p className='linkingShopCol'>SHOP COLLECTION</p>
                    <Slider {...settings} >
                        <div className='linkRingLove'>

                            <div>
                                <div className='linkLoveRing1'>
                                    <img src={!ring1ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img1.png`:`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img1Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing1} onMouseLeave={handleMouseLeaveRing1} />
                                </div>
                                <div className='linkLoveRing1Desc'>
                                    <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
                                </div>
                            </div>
                            <div>
                                <div className='linkLoveRing2'>
                                    <img src={!ring2ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img2.png`:`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img2Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing2} onMouseLeave={handleMouseLeaveRing2} />
                                </div>
                                <div className='linkLoveRing1Desc'>
                                    <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
                                </div>
                            </div>
                        </div>

                        <div className='linkRingLove'>

                            <div>
                                <div className='linkLoveRing1'>
                                    <img src={!ring1ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img1.png`:`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img1Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing1} onMouseLeave={handleMouseLeaveRing1} />
                                </div>
                                <div className='linkLoveRing1Desc'>
                                    <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
                                </div>
                            </div>
                            <div>
                                <div className='linkLoveRing2'>
                                    <img src={!ring2ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img2.png`:`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img2Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing2} onMouseLeave={handleMouseLeaveRing2} />
                                </div>
                                <div className='linkLoveRing1Desc'>
                                    <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
                                </div>
                            </div>
                        </div>

                        <div className='linkRingLove'>

                            <div>
                                <div className='linkLoveRing1'>
                                    <img src={!ring1ImageChange ?  `${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img1.png`:`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img1Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing1} onMouseLeave={handleMouseLeaveRing1} />
                                </div>
                                <div className='linkLoveRing1Desc'>
                                    <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
                                </div>
                            </div>
                            <div>
                                <div className='linkLoveRing2'>
                                    <img src={!ring2ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img2.png`:`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img2Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing2} onMouseLeave={handleMouseLeaveRing2} />
                                </div>
                                <div className='linkLoveRing1Desc'>
                                    <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </div>
                <div className='linkingLoveImage'>
                    <img src={`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetMainBanner.jpg`} className='linkingLoveImageDesign' />
                </div>
            </div>


            <div className='linkingLoveMain'>
                <div className='linkingLoveImage'>
                    <img src={`${storImagePath()}/images/HomePage/Promo/Set/2/promoSetMainBanner2.jpg`} className='linkingLoveImageDesign' />
                </div>
                <div className='linkingLove'>
                    <p className='linkingTitle'>FLORA</p>
                    <p className='linkingDesc'>High end affordable luxury with sophisticated designs for your every day.</p>
                    <p className='linkingShopCol'>SHOP COLLECTION</p>
                    <Slider {...settings} >
                        <div className='linkRingLove'>
                            <div>
                                <div className='linkLoveRing1'>
                                    <img src={!ring3ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img1.png` : `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img1Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing3} onMouseLeave={handleMouseLeaveRing3} />
                                </div>
                                <div className='linkLoveRing1Desc'>
                                    <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
                                </div>
                            </div>
                            <div>
                                <div className='linkLoveRing2'>
                                    <img src={!ring4ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img2.png` : `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img2Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing4} onMouseLeave={handleMouseLeaveRing4} />
                                </div>
                                <div className='linkLoveRing1Desc'>
                                    <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
                                </div>
                            </div>

                        </div>

                        <div className='linkRingLove'>
                            <div>
                                <div className='linkLoveRing1'>
                                    <img src={!ring3ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img1.png` : `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img1Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing3} onMouseLeave={handleMouseLeaveRing3} />
                                </div>
                                <div className='linkLoveRing1Desc'>
                                    <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
                                </div>
                            </div>
                            <div>
                                <div className='linkLoveRing2'>
                                    <img src={!ring4ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img2.png` : `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img2Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing4} onMouseLeave={handleMouseLeaveRing4} />
                                </div>
                                <div className='linkLoveRing1Desc'>
                                    <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
                                </div>
                            </div>

                        </div>

                        <div className='linkRingLove'>
                            <div>
                                <div className='linkLoveRing1'>
                                    <img src={!ring3ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img1.png` : `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img1Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing3} onMouseLeave={handleMouseLeaveRing3} />
                                </div>
                                <div className='linkLoveRing1Desc'>
                                    <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
                                </div>
                            </div>
                            <div>
                                <div className='linkLoveRing2'>
                                    <img src={!ring4ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img2.png` : `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img2Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing4} onMouseLeave={handleMouseLeaveRing4} />
                                </div>
                                <div className='linkLoveRing1Desc'>
                                    <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
                                </div>
                            </div>

                        </div>
                    </Slider>
                </div>

            </div>
        </div>
    )
}
