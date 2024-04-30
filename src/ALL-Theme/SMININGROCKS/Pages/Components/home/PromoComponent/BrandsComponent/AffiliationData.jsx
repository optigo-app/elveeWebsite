import React from 'react'
import './Styles.css'
import { storImagePath } from '../../../../../Utils/globalFunctions/GlobalFunction'

const AffiliationData = () => {
    return (
        <div>
            <p className='AffiliationComponents'>Affiliation</p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={`${storImagePath()}/images/HomePage/Affiliation/AffiliationLogo01.png`} style={{ width: '10%', objectFit: 'cover', marginRight: '90px' }} />
                <img src={`${storImagePath()}/images/HomePage/Affiliation/AffiliationLogo02.png`} style={{ width: '10%', objectFit: 'cover', marginRight: '90px' }} />
                <img src={`${storImagePath()}/images/HomePage/Affiliation/AffiliationLogo03.png`} style={{ width: '10%', objectFit: 'cover', marginRight: '90px' }} />
                <img src={`${storImagePath()}/images/HomePage/Affiliation/AffiliationLogo04.png`} style={{ width: '10%', objectFit: 'cover', marginRight: '90px' }} />
                <img src={`${storImagePath()}/images/HomePage/Affiliation/AffiliationLogo05.png`} style={{ width: '10%', objectFit: 'cover' }} />

            </div>
        </div>
    )
}

export default AffiliationData