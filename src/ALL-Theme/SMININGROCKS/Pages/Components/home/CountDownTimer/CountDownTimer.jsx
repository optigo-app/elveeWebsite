import React, { useState, useEffect } from 'react';
import './Styles.css';
import featherImg from '../../../assets/LV Feather.png';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { loginState } from '../../../../../../Recoil/atom';
import { storImagePath } from '../../../../Utils/globalFunctions/GlobalFunction';

const TwoPartDiv = () => {
    const navigation = useNavigate();
    const [showTimer, setShowTimer] = useState(true);
    const [checkTimeStatus, setShowTimeStatus] = useState();
    const setIsLoginState = useSetRecoilState(loginState)
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });
    const [startDateData, setStartDateData] = useState();
    const [endDateData, setEndDateData] = useState();

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('loginUserDetail')) || {};
        const entryDate = storedData.adhoc_startdate1;
        const expiryDate = storedData.adhoc_enddate1;
        setShowTimeStatus(storedData?.IsTimeShow)

        if (entryDate && expiryDate) {
            setStartDateData(entryDate);
            setEndDateData(expiryDate);
            const timerID = setInterval(() => tick(entryDate, expiryDate), 1000);
            return () => clearInterval(timerID);
        }
    }, []);

    function calculateCountdown(startDate, endDate) {
        const startTimestamp = new Date(startDate).getTime();
        const endTimestamp = new Date(endDate).getTime();
        const now = new Date().getTime();
        let timeDifference;

        if (now < startTimestamp) {
            timeDifference = startTimestamp - now;
        } else if (now > endTimestamp) {
            return { days: 0, hours: 0, minutes: 0 };
        } else {
            timeDifference = endTimestamp - now;
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        return {
            days,
            hours,
            minutes
        };
    }

    function tick(startDate, endDate) {
        setCountdown(calculateCountdown(startDate, endDate));
    }

    useEffect(() => {
        if (countdown.days == 0 && countdown.hours == 0 && countdown.minutes == 0 && checkTimeStatus == 0) {
                handleLogout();
                setShowTimer(false);
        }
    }, [countdown]);

    const handleLogout = () => {
        setIsLoginState('false')
        localStorage.clear();
        localStorage.setItem('LoginUser', 'false');
        localStorage.removeItem('storeInit');
        localStorage.removeItem('loginUserDetail');
        localStorage.removeItem('remarks');
        localStorage.removeItem('selectedAddressId');
        localStorage.removeItem('orderNumber');
        localStorage.removeItem('registerEmail');
        localStorage.removeItem('UploadLogicalPath');
        localStorage.removeItem('remarks');
        localStorage.removeItem('registerMobile');
        navigation('/')
        window.location.reload();
    };


    return (
        <>
            {showTimer &&
                <div className="Timercontainer">
                    <div className="part1">
                        <p className='part1p1'>COUNTDOWN IS ON</p>
                        <p className='part1p2'>Shop Before It Ends</p>
                        <p className='part1p1'>THE LIMITED TIME</p>
                    </div>
                    <div
                        className="part2"
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <span className='spanData'>
                            <p className='ptitle'>{countdown.days}</p>
                            <p className='pcontent'>Days</p>
                        </span>
                        <span className='spanData'>
                            <p className='ptitle'>{countdown.hours}</p>
                            <p className='pcontent'>Hours</p>
                        </span>
                        <span className='spanData lastspanData'>
                            <p className='ptitle'>{countdown.minutes}</p>
                            <p className='pcontent'>Minutes</p>
                        </span>
                        <span className='Logo'>
                            <p className='ptitle'>
                                <img className='featherImg' src={`${storImagePath()}/images/HomePage/MainBanner/image/featuresImage.png`} style={{ width: '100%', height: '20vh', objectFit: 'cover' }} alt="feather" />
                            </p>
                        </span>
                    </div>
                </div>
            }
        </>
    );
};

export default TwoPartDiv;
