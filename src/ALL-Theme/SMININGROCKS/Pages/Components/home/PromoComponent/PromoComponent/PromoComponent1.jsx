import React from 'react'
import demo1img from '../../../../assets/demoImg1.jpg'
import './Styles.css'
import { storImagePath } from '../../../../../Utils/globalFunctions/GlobalFunction'
import { useNavigate } from 'react-router-dom'

const PromoComponent1 = () => {

    const navigation = useNavigate();
    
    return (
        <div className='mt-5'>
            <div className='promo-daimondBoxMain'>
                <div className='promo-daimondBox2'>
                    <img src={`${storImagePath()}/images/HomePage/Promo/Banner/PromoBanner1.jpg`} className='promo-daimondBox2-image' onClick={() => navigation('/productpage')}/>
                </div>
                <div className='promo-daimondBox1'>
                    <p style={{  fontSize: '22px', color: 'rgba(29, 50, 88, 0.8)' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>
        </div>
    )
}

export default PromoComponent1