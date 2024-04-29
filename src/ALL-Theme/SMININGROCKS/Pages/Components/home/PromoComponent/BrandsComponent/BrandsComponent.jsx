import React from 'react'
import './Styles.css'

const BrandsComponent = () => {
    return (
        <div>
            <p className='mt-5 mb-4' style={{textAlign:'center', fontSize:'20px'}}>introducing our exclusive brands</p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src='https://logos-world.net/wp-content/uploads/2020/04/Puma-Logo.png' style={{ width: '10%', objectFit: 'cover', marginRight: '90px' }} />
                <img src='https://logos-world.net/wp-content/uploads/2020/04/Puma-Logo.png' style={{ width: '10%', objectFit: 'cover', marginRight: '90px' }} />
                <img src='https://logos-world.net/wp-content/uploads/2020/04/Puma-Logo.png' style={{ width: '10%', objectFit: 'cover', marginRight: '90px' }} />
                <img src='https://logos-world.net/wp-content/uploads/2020/04/Puma-Logo.png' style={{ width: '10%', objectFit: 'cover' }} />

            </div>
        </div>
    )
}

export default BrandsComponent