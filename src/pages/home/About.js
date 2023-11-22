import React, { useContext, useEffect } from 'react'
import { LayoutContext } from '../../context/layout.context'

export default function About() {


  const layout = useContext(LayoutContext)

  useEffect(()=>{
    
    layout.setLayout({
      showNav : true,
      showFooter: true,
      isHome : false,

    })

  },[])

  return (
    <div>About</div>
  )
}
