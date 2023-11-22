import React, { useContext, useEffect } from 'react'
import { LayoutContext } from '../../context/layout.context'

export default function Profile() {

  const layout = useContext(LayoutContext)

  useEffect(()=>{
    
    layout.setLayout({
      showNav : true,
      showFooter: true,
      isHome : false,

    })

  },[])


  return (
    <div>Blog</div>
  )
}
