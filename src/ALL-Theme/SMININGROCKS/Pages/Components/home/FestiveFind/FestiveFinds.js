import React from 'react'
import './FestiveFinds.css'
import { useNavigate } from 'react-router-dom'
// import banner1 from '../../../assets/banner1.jpg'
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState } from '../../../../../../Recoil/atom';
import { storImagePath } from '../../../../Utils/globalFunctions/GlobalFunction';

export default function FestiveFinds() {

    const navigation = useNavigate();
    const islogin = useRecoilValue(loginState);


    const handleNaviagtion = () => {
        islogin === 'true' && navigation('/productpage');
    }

    return (
        <div id='elveeGiftMainId'>
            <p className='gorGiftBoxMainTitleMobile'>Gifting Made Easy</p>
            <div className='gorGiftMain'>
                <div className='gorGiftBox1'>
                    <div>
                        <p className='gorGiftBoxMainTitleWeb'>WOMEN</p>
                        <img loading="lazy" src={`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img1.jpg`} className='gorGiftBox1Images' />
                    </div>
                    <div className='gorGiftBox1Sub1'>
                        <p className='gorGiftBoxMainTitleWeb'>KIDS</p>
                        <img loading="lazy" src={`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img3.jpg`} className='gorGiftBox1Images' />
                    </div>
                </div>
                <div className='gorGiftBox1'>
                    <div>
                        <p className='gorGiftBoxMainTitleWeb'>MEN</p>
                        <img loading="lazy" src={`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img2.jpg`} className='gorGiftBox1Images' />
                    </div>
                    <div className='gorGiftBox2Sub1' >
                        <p className='gorGiftBoxMainTitleWeb'>GIFTS</p>
                        <img loading="lazy" src={`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img4.jpg`} className='gorGiftBox1Images' />
                    </div>
                </div>
            </div>

            {/* <div className='gorLookBookMain' style={{
                display: 'flex',
                marginTop: '70px'
            }}>
                <div className='gorViewLookBookimg'>
                    <img src='https://www.gorjana.com/cdn/shop/files/Feature-Catalog_1.jpg?v=1711663131&width=1000&em-format=avif&em-width=1000' className='gorViewLookBookImage' />
                </div>
                <div className='gorViewLookBookDesc'>
                    <p style={{ fontSize: '30px', margin: '0px', fontFamily: 'Freight Big Pro,serif' }}>The Spring Catalog Is Here</p>
                    <p style={{ fontSize: '13px', fontWeight: 500, cursor: 'pointer', textDecoration: 'underline' }}>View Lookbook</p>
                </div>
            </div> */}


            {/* <div style={{marginTop: '100px'}}>
                <div className='gorjanaTrade1Web'>
                    <img src='https://www.gorjana.com/cdn/shop/files/Substory-D_11_feec347d-4772-405a-b9e5-dc7884357391.jpg?v=1711663592&width=2800' className='gorjanaFaveImage' />
                    <div className='gorjanaTrideBox'>
                        <p style={{
                            fontFamily: 'Freight Big Pro,serif',
                            fontSize: '60px',
                            color: 'black',
                            fontWeight: 400
                        }}>Tried and True </p>
                        <p style={{
                            fontFamily: 'Freight Big Pro,serif',
                            fontSize: '21px',
                            color: 'black',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: '-30px',
                            fontWeight: 300
                        }}>Easy-to-style layers you'll love. </p>
                        <p className='gorjanaFavBoxLink' style={{color: 'black'}}>Shop File Jewelry</p>
                    </div>
                </div>

                <div className='gorjanaTrade1Mobile'>
                    <img src='https://www.gorjana.com/cdn/shop/files/Substory-M_10_0bce971b-bbab-4654-8757-bb777ad4da80.jpg?v=1711663594&width=750' className='gorjanaFaveImage' />
                    <div className='gorjanaTrideBoxMobile'>
                        <p style={{
                            fontFamily: 'Freight Big Pro,serif',
                            fontSize: '60px',
                            color: 'black',
                            fontWeight: 400
                        }}>Tried and True </p>
                        <p style={{
                            fontFamily: 'Freight Big Pro,serif',
                            fontSize: '18px',
                            color: 'black',
                            marginTop: '-20px',
                            fontWeight: 300
                        }}>Easy-to-style layers you'll love. </p>
                        <p className='gorjanaFavBoxLinkMobile'>Shop File Jewelry</p>
                    </div>
                </div>
            </div> */}
        </div>
    )
}
