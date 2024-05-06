import React, { useState } from 'react'
import './Footer.css'
import { useNavigate } from 'react-router-dom';
import { IoLocationOutline } from "react-icons/io5";
import { IoMdCall } from "react-icons/io";
import { IoMdMail } from "react-icons/io";
import axios from 'axios';

export default function Footer() {
    const [email, setEmail] = useState();
    const [selectedFooteVal, setSelectedVal] = useState(0);
    const navigation = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmitNewlater = async () => {
        const storeInit = JSON.parse(localStorage.getItem('storeInit'));
        const newslater = storeInit?.newslatter;
        console.log('newsletter', newslater);
        if (newslater) {
            const newsletterUrl = `${newslater}${email}`;
            fetch(newsletterUrl)
                .then((response) => response.text())
                .then((result) => console.log(result))
                .catch((error) => console.error(error));
        }

    };
    const handleNavigte = (navigateUrl) => {
        navigation(navigateUrl)
    }

    return (
        <div>
            <div className='ElveFooterMain'>
                <div className='ElveFooter1'>
                    <p className='elveBox1Title'>Sign Up For Newslatter</p>
                    <div className='ElveFooter1Input' style={{ marginTop: '20px', display: 'flex' }}>
                        <input type='text' placeholder='Enter Your Email' className='eleBox1InputBox' value={email} onChange={handleEmailChange} />
                        <button className='elevBox1Btn' onClick={handleSubmitNewlater}>Subscribe</button>
                    </div>
                </div>
                <div className='ElveFooter2'>
                    <p className='ElevFooterBoxTitle'>Our Company</p>
                    <p className='ElveFooterDesc' onClick={() => handleNavigte('/aboutUs')}>About Us</p>
                    <p className='ElveFooterDesc'>Careers</p>
                    <p className='ElveFooterDesc' onClick={() => handleNavigte('/history')}>History</p>
                    <p className='ElveFooterDesc'>Contact Us</p>
                    <p className='ElveFooterDesc' onClick={() => handleNavigte('/term&condition')}>Terms and Conditions</p>
                </div>
                <div className='ElveFooter3'>
                    <p className='ElevFooterBoxTitle' onClick={() => handleNavigte('/customerCare')}>Customer Care</p>
                    <p className='ElveFooterDesc' onClick={() => handleNavigte('/customerServices')}>Customer Services</p>
                    <p className='ElveFooterDesc'>Book an Appoinment</p>
                    <p className='ElveFooterDesc' onClick={() => handleNavigte('/customize')}>Customize</p>
                    <p className='ElveFooterDesc'>FAQ</p>
                </div>
                <div className='ElveFooter4'>
                    <p className='ElevFooterBoxTitle'>Office</p>
                    <div style={{ display: 'flex' }}>
                        <p className='ElevBox4Title' onClick={() => setSelectedVal(0)} style={{ textDecoration: selectedFooteVal === 0 && 'underline' }}>INDIA</p>
                        <p className='ElevBox4Title' onClick={() => setSelectedVal(1)} style={{ textDecoration: selectedFooteVal === 1 && 'underline', marginLeft: '50px' }}>USA</p>
                    </div>
                    {
                        selectedFooteVal === 0 ?
                            <div>
                                <p className='footerOfficeDesc' style={{ display: 'flex', fontFamily: 'PT Sans, sans-serif', height: '70px' }}>
                                    <IoLocationOutline style={{ width: '50px', height: 'fit-content' }} />
                                    <span>Plot No. – M1 To M6, Gujarat Hira Bourse Gem & Jewellery Park, Pal-Hazira Road, Ichchhapore, Surat - 394510</span>
                                </p>
                                <p style={{ fontFamily: 'PT Sans, sans-serif' }}>
                                    <IoMdCall />
                                    +91 261 6105100
                                </p>
                                <p style={{ fontFamily: 'PT Sans, sans-serif' }}>
                                    <IoMdMail />
                                    <span style={{ marginLeft: '5px' }}>info@elvee.in</span>
                                </p>
                            </div>
                            :
                            <div>
                                <p className='footerOfficeDesc' style={{ display: 'flex', fontFamily: 'PT Sans, sans-serif', height: '70px' }}>
                                    <IoLocationOutline style={{ width: '22px', height: '22px' }} />
                                    <span>1177 6th Avenue, Suite 5099, New York,NY 10036.</span>
                                </p>
                                <p style={{ fontFamily: 'PT Sans, sans-serif' }}>
                                    <IoMdCall />
                                    (646) 284-4466
                                </p>
                                <p style={{ fontFamily: 'PT Sans, sans-serif' }}>
                                    <IoMdMail />
                                    <span style={{ marginLeft: '5px' }}>Contact.usa@elveepromise.com</span>
                                </p>
                            </div>

                    }
                </div>
            </div>
        </div>
    )
}
