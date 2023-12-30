import React, { useState } from 'react'
import CustomButton from '../../components/CustomButton'
import { CircularProgress } from '@mui/material'
import AdminService from './../../services/Admin';

export default function Admin() { 
  const [show, setShow] = useState({
    loader: false
  })
  
  const handleUpdateFunc = async() => {
    setShow({...show, loader : true})
    const {response , error} = await AdminService.UpdateData({toaster : true});
    setShow({...show, loader : false})
  }

  return (
    <div className='mt_100 mb_100 ml_100 mr_100'>
        <h1>Welcome Admin!</h1>
        <CustomButton 
            btntext={"Update Database"}
            className={"mt_32"}
            icon={show.loader && <CircularProgress size={16} color='inherit' />}
            onClick={handleUpdateFunc}
            disabled={show.loader}

        />
    </div>
  )
}
