import './search.css'
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function SubSearchBar() {
    const vidCat = useParams().searchData;
    const [videos, setVideos] = useState([])
    const [err, setErr] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${process.env.REACT_APP_secret_backEnd}/video/videocat_get?${vidCat}`)
                .then((res) => {
                    setVideos(res.data);
                    setErr('')
                })
                .catch(() => setErr('something went wrong, please try again'))
        }
        fetchData()
    }, [vidCat])

    return (
        <div>
            {
                videos.length > 0 ?
                    videos.map((v) => {
                        return (
                            <Link to={`/video/${v._id}`} key={v._id} state={v}>
                                <div className='subSearchBar_mainDiv'>
                                    <div className='subSearchBar_videoDiv'>
                                        <div className='ratio ratio-16x9'>
                                            <img src={v.video_image} alt='img' />
                                        </div>
                                    </div>
                                    <div className='subSearchBar_infoDiv py-md-3 px-md-4'>
                                        <h5 className='w_color'>{v.title}</h5>
                                        <div className='subSearchBar_views py-1 w_mute'>
                                            <span>{v.views} views</span>
                                            <span>{moment(v.createdAt).fromNow()}</span>
                                        </div>
                                        <p className='subSearchBar_channelInfo my-2 w_mute'>
                                            <span><img src={v.channel_id.image} alt='img' className='bg-light' /></span>
                                            <span style={{ marginLeft: '10px' }}>{v.channel_id.name}</span>
                                        </p>
                                        <div className='subSearchBar_desc w_mute'>
                                            {v.desc}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                    :
                    <div className='showError_div'>
                        <>
                            {
                                err ?
                                    <p style={{ color: 'red' }}>{err}</p>
                                    :
                                    <h4 className='w_color'>No Video Found</h4>
                            }
                        </>
                    </div>
            }
        </div>
    )
}

export default SubSearchBar