import React from 'react'
import './loading.css'
import { useSelector } from 'react-redux'
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
  const isLoading = useSelector((state) => state.info.isLoading)
  return (
    isLoading &&
    <div className='w_color spinnerDiv' >
      <Spinner animation="grow" />
      <h5>Loading.....</h5>
    </div>
  )
}

export default Loading