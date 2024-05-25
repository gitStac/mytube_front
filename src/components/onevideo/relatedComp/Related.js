import React, { useEffect, useState } from 'react'
import './related.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment';

function Related() {
  const [vExtra, setvExtra] = useState([]);
  const [err, setErr] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${process.env.REACT_APP_secret_backEnd}/video/videorel_get`)
        .then((res) => {
          setvExtra(res.data);
          setErr('')
        })
        .catch(() => setErr('something went wrong..'))
    }
    fetchData()
  }, [])
  
  return (
    <div className='related_topDiv'>
      {
        vExtra.length > 0 &&
        vExtra.map((v) => {
          return (
            <Link key={v._id} to={`/video/${v._id}`} state={v}>
              <div className='subSearchBar_mainDiv'>
                <div className='subSearchBar_videoDiv'>
                  <div className='ratio ratio-16x9'>
                    <img src={v.video_image} alt='img' />
                  </div>
                </div>
                <div className='subSearchBar_infoDiv p-md-3'>
                  <div className='related_title w_color'>
                    <b>{v.title}</b>
                  </div>
                  <div className='subSearchBar_channelInfo w_mute'>
                    {v.channel_id.name}
                  </div>
                  <div className='subSearchBar_views w_mute'>
                    <span>{v.views} views</span>
                    <span>{moment(v.createdAt).fromNow()}</span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })
      }
      {err && <p className='text-danger my-3'>{err}</p>}
    </div>
  )
}

export default Related