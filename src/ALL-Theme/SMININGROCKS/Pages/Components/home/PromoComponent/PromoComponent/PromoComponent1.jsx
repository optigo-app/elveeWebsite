import React from 'react'
import demo1img from '../../../../assets/demoImg1.jpg'
import './Styles.css'
import { useNavigate } from 'react-router-dom'

const PromoComponent1 = () => {

    const navigation = useNavigate();
    
    return (
        <div className='mt-5'>
            <div className='promo-daimondBoxMain'>
                <div className='promo-daimondBox2'>
                    <img src={demo1img} className='promo-daimondBox2-image' onClick={() => navigation('/productpage')}/>
                </div>
                <div className='promo-daimondBox1'>
                    <p style={{  fontSize: '25px', color: '#7d7f85', fontFamily: 'FreightDispProMedium-Regular,Times New Roman,serif' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>
        </div>
    )
}

export default PromoComponent1