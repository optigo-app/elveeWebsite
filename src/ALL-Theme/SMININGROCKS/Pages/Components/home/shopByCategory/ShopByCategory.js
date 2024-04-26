import React from 'react'
import './ShopByCategory.css'
import { Colors } from '../../../../lib/consts/Colors'
import { storImagePath } from '../../../../Utils/globalFunctions/GlobalFunction'

export default function ShopByCategory() {
  return (
    <div>
      <div>
        <p className='shopbycategoryTitle'>Shop By Category</p>
        <div className='shopbycategoryDesc'>
          <p style={{
            color: 'rgb(125, 127, 133)',
            fontSize: '13px',
            width: '240px',
            textAlign: 'center'
          }}>Discover KayraCreation Fine Jewelry! Brilliant and Better!</p>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }} className='smilingSopCateMain'>
          <div className='shopByCategoryBox1Main'>
            <div className='shopByCategoryBox'>
              <img src={`${storImagePath()}/images/HomePage/shopByCategory/shopByCategory1.png`} className='shopByCategoryBoxImg' />
              <p style={{ fontWeight: 500, color: Colors.fontColor, textAlign: 'center' }}>EARRING</p>
            </div>
            <div className='shopByCategoryBox'>
              <img src={`${storImagePath()}/images/HomePage/shopByCategory/shopByCategory2.png`} className='shopByCategoryBoxImg' />
              <p style={{ fontWeight: 500, color: Colors.fontColor, textAlign: 'center' }}>NACKLACES</p>
            </div >
          </div>
          <div className='shopByCategoryBox2Main'>
            <div className='shopByCategoryBox'>
              <img src={`${storImagePath()}/images/HomePage/shopByCategory/shopByCategory3.png`} className='shopByCategoryBoxImg' />
              <p style={{ fontWeight: 500, color: Colors.fontColor, textAlign: 'center' }}>PENDANT</p>
            </div>
          <div className='shopByCategoryBox'>
              <img src={`${storImagePath()}/images/HomePage/shopByCategory/shopByCategory4.png`} className='shopByCategoryBoxImg' />
              <p style={{ fontWeight: 500, color: Colors.fontColor, textAlign: 'center' }}>RING</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
