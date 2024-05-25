import React, { Suspense, useEffect, useState } from 'react'
import app from '../firebase/Firebase';
import Loading from '../loading/Loading';
import { changeIsLoading } from '../redux/UserSlice';
import { Button, Col, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from 'axios';
const ExistedChannel = React.lazy(() => import('./ExistedChannel'))

function Channels() {

    const userData = useSelector((state) => state.info.user);
    const dispatch = useDispatch();
    const [channelName, setChannelName] = useState('')
    const [iFile, setiFile] = useState(null)
    const [iper, setiPer] = useState();
    const [iURL, setiURL] = useState()
    const [err, setErr] = useState()

    const uploadFile = (file, urlType) => {
        const storage = getStorage(app);
        const fileName = Date.now() + file.name
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (urlType === 'imgURL') { setiPer(progress) }
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        console.log('Upload stopped');
                        break;
                }
            },
            (error) => { setErr('something went wrong, please try again') },

            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setiURL(downloadURL)
                });
            }
        )
    }

    const createChannel = async (e) => {
        dispatch(changeIsLoading(true))
        e.preventDefault();
        let userId = userData._id
        if (iURL) {
            const newChannel = {
                user_id: userId,
                name: channelName,
                image: iURL
            }
            await axios.post(`${process.env.REACT_APP_secret_backEnd}/channel/channel_reg`, newChannel)
                .then(() => {
                    dispatch(changeIsLoading(false))
                    setErr('');
                    setChannelName('');
                    setiPer('')
                    alert('new channel created successfully..')
                })
                .catch(() => {
                    dispatch(changeIsLoading(false))
                    setErr('something went wrong, please try again')
                })
        }
    }

    useEffect(() => {
        iFile && uploadFile(iFile, 'imgURL')
    }, [iFile])

    return (
        <>
            <Loading />
            <div className='channels_topDiv total_back w_color'>
                <h6>Hi, {userData.name}</h6>
                <h3>Unleash your creativity on myTube</h3>
                <div className='my-4'>
                    <p className='my-2'><b>Create your channel</b></p>
                    <form onSubmit={createChannel}>
                        <Row>
                            <Col sm={3} className='p-0 my-2'>
                                <div className='channel_createAll'>
                                    <label htmlFor='channel-img'>
                                        <i className="fa-solid fa-circle-plus fa-3x"></i>
                                    </label>
                                    <input id='channel-img' style={{ display: 'none' }} type='file'
                                        accept='image/*' onChange={e => setiFile(e.target.files[0])} required />
                                    {iFile && <img className='channel_uploadImg w-100' src={URL.createObjectURL(iFile)} alt='img' />}
                                    {iper > 0 && <p style={{ fontSize: '12px', color: 'green' }}>uploading: {Math.round(iper)}%</p>}
                                    {err && <p style={{ color: 'red', fontSize: '14px' }}>{err}</p>}
                                </div>
                            </Col>
                            <Col sm={9} className='my-2 channel_secondCol'>
                                <div>
                                    <input type='text' className='channel_nameInput faint_back w_color' value={channelName}
                                        placeholder='channel name..' onChange={(e) => setChannelName(e.target.value)} required />
                                </div>
                                <Button type='submit' className='my-2'>Create</Button>
                            </Col>
                        </Row>
                    </form>
                </div>
                <hr />

                <Suspense fallback={<h5 className='w_color'>Loading</h5>}>
                    <ExistedChannel />
                </Suspense>
            </div>
        </>
    )
}

export default Channels