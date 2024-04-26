import React from 'react'
import './FestiveFinds.css'
import { useNavigate } from 'react-router-dom'
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
        <div>
            <div className='FestiveMainImage'>
                <img src={`${storImagePath()}/images/HomePage/Promo/Banner/PromoBanner1.jpg`} style={{ width: '100%' }} alt={"#promoBanner1"} />
                {islogin === 'true' && <div className='festiveBox'>
                    <p className='smilingFestiMainTitle1' style={{ color: 'gray' }}>LAB GROWN DIAMONDS</p>
                    <p className='smilingFestiMainTitle2' style={{ color: 'gray', fontSize: '40px', margin: '0px' }}>Festive Finds!</p>
                    <p className='smilingFestiMainTitle3' style={{ color: 'gray', margin: '0px', fontSize: '13px' }}>
                        Explore your jewelry for upcoming holiday!
                    </p>
                    <div>
                        <button className='DiscoverBtn' onClick={handleNaviagtion}>DISCOVER MORE</button>
                    </div>
                </div>}
            </div>
        </div>
    )
}
