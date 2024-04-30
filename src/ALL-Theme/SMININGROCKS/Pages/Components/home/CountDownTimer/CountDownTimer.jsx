import React, { useState, useEffect } from 'react';
import './Styles.css';
import featherImg from '../../../assets/LV Feather.png';

const TwoPartDiv = () => {
    const [countdown, setCountdown] = useState(calculateCountdown());
    const [showDays, setShowDays] = useState(true);

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return () => clearInterval(timerID);
    }, []);

    function calculateCountdown() {
        const endDate = new Date("2024-05-06T17:53:01.437").getTime();
        const now = new Date().getTime();
        const timeDifference = endDate - now;

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        return {
            days,
            hours,
            minutes
        };
    }

    function tick() {
        setCountdown(calculateCountdown());
    }

    return (
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
                <span className='spanData'>
                    <p className='ptitle'>{countdown.minutes}</p>
                    <p className='pcontent'>Minutes</p>
                </span>
                <span className='Logo'>
                    <p className='ptitle'>
                        <img className='featherImg' src={featherImg} style={{ width: '100%', height: '20vh', objectFit: 'cover' }} alt="feather"/>
                    </p>
                </span>
            </div>
        </div>
    );
};

export default TwoPartDiv;
