import React from 'react'
import './Styles.css'
import { storImagePath } from '../../../../../Utils/globalFunctions/GlobalFunction'

const BrandsComponent = () => {
    return (
        <div id='brandsComponentID'>
            <p className='brandsCompoents'>introducing our exclusive brands</p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={`${storImagePath()}/images/HomePage/BrandsLogoImg/BrandsLogo01.png`} style={{ width: '10%', objectFit: 'cover', marginRight: '90px' }} />
                <img src={`${storImagePath()}/images/HomePage/BrandsLogoImg/BrandsLogo02.png`} style={{ width: '10%', objectFit: 'cover', marginRight: '90px' }} />
                <img src={`${storImagePath()}/images/HomePage/BrandsLogoImg/BrandsLogo03.png`} style={{ width: '10%', objectFit: 'cover', marginRight: '90px' }} />
                <img src={`${storImagePath()}/images/HomePage/BrandsLogoImg/BrandsLogo04.png`} style={{ width: '10%', objectFit: 'cover', marginRight: '90px' }} />
                <img src={`${storImagePath()}/images/HomePage/BrandsLogoImg/BrandsLogo05.png`} style={{ width: '10%', objectFit: 'cover' }} />

            </div>
        </div>
    )
}

export default BrandsComponent