import React, { useEffect, useState } from 'react'
import './Confirmation.css'
import Footer from '../home/Footer/Footer'
import { useNavigate } from 'react-router-dom';

export default function Confirmation() {

    const [orderNumber, setOrderNumber] = useState('');
    const navigation = useNavigate();

    useEffect(() => {
        let orderNum = localStorage.getItem('orderNumber');
        setOrderNumber(orderNum);
        window.scrollTo(0, 0);
    }, [])


    return (
        <div className='paddingTopMobileSet'>
            <div className='simlimgCofirmationMain'>
                <div className='confritmSubmain'>
                    <img src='https://gstore.orail.co.in/assets/newfolder/images/account/thankyou.svg' className='SmilingthanksImg' />
                    <p style={{ marginTop: '-30px', textAlign: 'center', color: 'gray' }}>Your Order number is <span style={{ fontWeight: 600, color: 'black', fontSize: '17px' }}>{orderNumber}</span></p>
                    <button className='contiShopiBtn' onClick={() => navigation('/productpage')}>Continue Shopping</button>
                </div>
            </div>
            <div className='mobileFooter' style={{ position: 'absolute', bottom: '0px', width: '100%' }}>
                <Footer />
            </div>
        </div>
    )
}
