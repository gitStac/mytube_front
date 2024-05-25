import React from 'react'
import './search.css'
// import Filter from './Filter'
import SubSearchBar from './SubSearchBar'

function VideoSearchBar() {
  return (
    <div className='videoSearchBar_topDiv total_back'>
        {/* <Filter/> */}
        <SubSearchBar />
    </div>
  )
}

export default VideoSearchBar