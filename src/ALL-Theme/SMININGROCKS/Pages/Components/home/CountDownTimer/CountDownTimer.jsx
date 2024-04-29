import React from 'react';
import './Styles.css';
import featherImg from '../../../assets/LV Feather.png'

class TwoPartDiv extends React.Component {
    render() {
        return (
            <div className="Timercontainer">
                <div className="part1">
                    <p className='part1p1'>COUNTDOWN IS ON</p>
                    <p className='part1p2'>Shop Before It Ends</p>
                    <p className='part1p1'>THE LIMITED TIME</p>
                </div>
                <div className="part2" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <span className='spanData'>
                        <p className='ptitle'>0</p>
                        <p className='pcontent'>Day</p>
                    </span>
                    <span className='spanData'>
                        <p className='ptitle'>8</p>
                        <p className='pcontent'>Hours</p>
                    </span>
                    <span className='spanData'>
                        <p className='ptitle'>52</p>
                        <p className='pcontent'>Minutes</p>
                    </span>
                    <span className='Logo'>
                        <p className='ptitle'>
                            <img src={featherImg} style={{width:'100%', height:'20vh', objectFit:'cover'}}/>
                        </p>
                    </span>
                </div>
            </div>
        );
    }
}

export default TwoPartDiv;
