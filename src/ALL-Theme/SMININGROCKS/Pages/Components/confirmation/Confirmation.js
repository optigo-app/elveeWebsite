import React, { useEffect, useState } from 'react';
import './Confirmation.css';
import Footer from '../home/Footer/Footer';
import { useNavigate } from 'react-router-dom';

export default function Confirmation() {
    const [orderNumber, setOrderNumber] = useState('');
    const navigate = useNavigate();

    useEffect(() => {

        let orderNum = localStorage.getItem('orderNumber');
        setOrderNumber(orderNum);
        window.scrollTo(0, 0);
        navigate('/confirmation', { replace: true });
        const handlePopState = (event) => {
            navigate('/productpage');
        };

        // Listen for popstate event
        window.addEventListener('popstate', handlePopState);

        return () => {
            // Cleanup the event listener on component unmount
            window.removeEventListener('popstate', handlePopState);
        };
    }, [navigate]);

    return (
        <div className='paddingTopMobileSet'>
            <div className='simlimgCofirmationMain'>
                <div className='confritmSubmain'>
                    <img src='https://gstore.orail.co.in/assets/newfolder/images/account/thankyou.svg' className='SmilingthanksImg' alt="Thank You" />
                    <p style={{ marginTop: '-30px', textAlign: 'center', color: 'gray' }}>
                        Your Order number is <span style={{ fontWeight: 600, color: 'black', fontSize: '17px' }}>{orderNumber}</span>
                    </p>
                    <button className='contiShopiBtn' onClick={() => navigate('/productpage')}>Continue Shopping</button>
                </div>
            </div>
            <div className='mobileFooter' style={{ position: 'absolute', bottom: '0px', width: '100%' }}>
                <Footer />
            </div>
        </div>
    );
}
