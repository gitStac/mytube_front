import React from 'react'
import './upload.css'
import ExistedChannel from '../account/ExistedChannel'

function SelectChannel() {
  return (
    <div className='selectChannel_mainDiv total_back w_color'>
        <h4 className='mb-4'>Select Your Channel</h4>
        <ExistedChannel />
    </div>
  )
}

export default SelectChannel