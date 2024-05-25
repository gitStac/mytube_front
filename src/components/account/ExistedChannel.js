import React, { useEffect, useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import axios from 'axios'

function ExistedChannel() {

    const userData = useSelector((state) => state.info.user);
    const [chan, setChan] = useState([]);
    const [err, setErr] = useState();

    useEffect(() => {
        let userId = userData._id
        const fetchChannels = async () => {
            await axios.get(`${process.env.REACT_APP_secret_backEnd}/channel/userchannels_get/${userId}`)
                .then((res) => {
                    setChan(res.data)
                    setErr('')
                })
                .catch(() => {
                    setErr('getting difficulty in fetching data')
                })
        }
        userData._id && fetchChannels()
    }, [userData._id])
    
    return (
        <div className='channel_existedChannel'>
            <p><b>Your Channels</b></p>
            {err && <p style={{ color: 'red' }}>{err}</p>}
            <Row>
                {
                    chan.length ?
                    chan.map((c) => {
                        return (
                            <Col key={c._id} sm={4} md={2} className='my-2'>
                                <Link to='/upload' state={c._id}>
                                    <div className='channels_imgDiv'>
                                        <img className='rounded-circle bg-light' src={c.image} alt='img' />
                                        <div><b>{c.name}</b></div>
                                        <div className='w_mute'>{c.sub_num} subs</div>
                                    </div>
                                </Link>
                            </Col>
                        )
                    })
                    :
                    <div>
                        <p>You dont have any channel, please create a channel</p>
                        <Link to='/channel'><Button>Create</Button></Link>
                    </div>
                }
            </Row>
        </div>
    )
}

export default ExistedChannel