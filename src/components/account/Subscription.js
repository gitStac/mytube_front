import axios from 'axios';
import Loading from '../loading/Loading';
import { changeIsLoading } from '../redux/UserSlice';
import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

function Subscription() {
  const userData = useSelector((state) => state.info.user);
  const dispatch = useDispatch();
  const [subC, setSubC] = useState([]);
  const [err, setErr] = useState();
  const [jChange, setjChange] = useState();

  const clickUnsub = async (id) => {
    let userId = userData._id
    await axios.put(`${process.env.REACT_APP_secret_backEnd}/channel/chaunsub_update/${id}`, { user_id: userId })
      .then(() => {
        setErr('');
        setjChange(prev => !prev)
      })
      .catch(() => setErr('something went wrong, please try again'))
  }

  useEffect(() => {
    let userId = userData._id
    const fetchData = async () => {
      await axios.get(`${process.env.REACT_APP_secret_backEnd}/user/usersub_pop/${userId}`)
        .then((res) => {
          dispatch(changeIsLoading(false))
          setSubC(res.data)
          setErr('')
        })
        .catch(() => {
          dispatch(changeIsLoading(false))
          setErr('difficulty in fetching data')
        })
    }
    dispatch(changeIsLoading(true))
    userData._id && fetchData()
  }, [userData._id, jChange, dispatch])

  return (
    <>
      <Loading />
      <div className='total_back w_color subs_mainDiv' >
        <div className='h-100 py-3 channel_existedChannel'>
          <h5 className='px-5 mb-3'>Subscribed Channels</h5>
          <Row>
            {
              subC.length > 0 ?
                subC.map((s) => {
                  return (
                    <Col key={s._id} sm={4} md={3} className='my-2'>
                      <div className='channels_imgDiv'>
                        <img className='rounded-circle' src={s.image} alt='img' />
                        <div>{s.name}</div>
                        <div className='w_mute'>{s.sub_num} subscribers</div>
                        <Button className='btn-danger rounded-pill px-3 m-2' onClick={() => clickUnsub(s._id)}>Unsubscribe</Button>
                      </div>
                    </Col>
                  )
                })
                :
                <div className='subError_div'>
                  {
                    err ?
                      <p style={{ color: 'red' }}>{err}</p>
                      :
                      <h4>Subscribed channels to stay updated</h4>
                  }
                </div>
            }
          </Row>
        </div>
      </div>
    </>
  )
}

export default Subscription