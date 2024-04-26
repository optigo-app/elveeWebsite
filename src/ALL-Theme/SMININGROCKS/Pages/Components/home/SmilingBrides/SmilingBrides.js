import React from 'react'
import './SmilingBrides.css'
// import bridesImage from '../../../assets/smilingBrides/brides1.webp'
import { Colors } from '../../../../lib/consts/Colors'
import { storImagePath } from '../../../../Utils/globalFunctions/GlobalFunction'

export default function SmilingBrides() {
    return (
        <div className='paddingTopMobileSet'>
            <div className='smilingBridesMain'>
                <div className='smilingBrides'>
                    <p style={{
                        color: Colors.fontColor,
                        fontSize: '25px',
                        textAlign: 'center',
                        fontFamily: 'FreightDispProMedium-Regular,Times New Roman,serif'
                    }} className='smilingBridesMainTitle'>SMILING BRIDES</p>
                    <button className='enagementBtn'>ENGAGEMENT COLLECTION</button>
                </div>
                <div className='smlingBridesImages'>
                    <img src={`${storImagePath()}/images/HomePage/Promo/Banner/PromoBanner2.png`} className='smilingMainImages' alt={''}/>
                </div>
            </div>
        </div>
    )
}
