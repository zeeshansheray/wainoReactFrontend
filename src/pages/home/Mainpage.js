import React, { useContext, useEffect } from 'react'
import { LayoutContext } from '../../context/layout.context'

import {PngIcons} from '../../icons'

export default function Hero() {

  const layout = useContext(LayoutContext)

  useEffect(()=>{
    layout.setLayout({
      showNav: true,
      isHome : true,
    })
  },[])


  return (
    <div id="Hero">
        <section id="hero" style={{backgroundImage : `url(${PngIcons.heroImg})`}}>
            <h4 className='Heading22B'>Unlock discovering</h4>
            <h2 className='Heading50B'>The best rated wines in stores</h2>
            <p className='Heading16M'>Spend your money on with the wisdom of the crowd. Get in the ring</p>
            <button style={{backgroundImage: `url(${PngIcons.wallImage})`}}>Visit Now</button>
        </section>

    </div>
  )
}
