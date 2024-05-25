import React, { useEffect } from 'react'
import './comments.css'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Comments() {
  const videoId = useParams().id;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const userData = useSelector((state) => state.info.user)
  const [loadComm, setLoadComm] = useState([]);
  const [comm, setComm] = useState();
  const [err, setErr] = useState();
  const [jchange, setjChnage] = useState(false);

  const addComment = async () => {
    if (userData._id) {
      await axios.post(`${process.env.REACT_APP_secret_backEnd}/comment/comment_reg`, {
        video_id: videoId,
        user_id: userData._id,
        comment: comm
      })
        .then(() => {
          setComm('')
          setErr('');
          setjChnage(prev=>!prev)
        })
        .catch(() => setErr('something went wrong, please try again'))
    } else {
      navigate('/signin')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      axios.get(`${process.env.REACT_APP_secret_backEnd}/comment/comment_get/${videoId}`)
        .then((res) => {
          setLoadComm(res.data);
          setErr('')
        })
        .catch(() => setErr('something went wrong, please try again'))
    }
    fetchData()
  }, [videoId,jchange])

  return (
    <>
      <Button
        className='mb-md-4 mx-md-3 btn btn-dark rounded-pill px-3'
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open} >
        Check Comments
      </Button>
      <hr />
      <Collapse in={open}>
        <div className='comments_topDiv w_color'>
          <div className='comments_add'>
            <input type='text' className='faint_back w_color' placeholder='add comment..' value={comm} onChange={(e) => setComm(e.target.value)} />
            <button className='btn btn-dark rounded-pill' onClick={addComment}>comment</button>
          </div>
          <p>Comments..</p>
          {err && <p className='text-danger my-2'>{err}</p>}
          {
            loadComm.length > 0 ?
            loadComm.map((c) => {
              return (
                <div key={c._id} className='comments_userComments'>
                  <img src={c.user_id.image} className='bg-light' alt='img' />
                  <div>
                    <p>{c.user_id.name}</p>
                    <p>{c.comment}</p>
                  </div>
                </div>
              )
            })
            :
            <p>This video has no comments</p>
          }
        </div>
      </Collapse>
    </>
  )
}

export default Comments