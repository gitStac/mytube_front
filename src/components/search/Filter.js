import React from 'react'
import './search.css'

function Filter() {
  return (
    <div className='filter_topDiv'>
        <div>
            <label>Upload Time: </label>
            <select>
                <option>This Week</option>
                <option>This Month</option>
                <option>This Year</option>
            </select>
        </div>
        <div>
            <label>Sort: </label>
            <select>
                <option>Upload Time</option>
                <option>Views+</option>
                <option>Views-</option>
            </select>
        </div>
    </div>
  )
}

export default Filter
