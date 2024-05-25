import React, { useEffect, useState } from 'react'
import './upload.css'
import Loading from '../loading/Loading';
import { changeIsLoading } from '../redux/UserSlice'
import app from '../firebase/Firebase';
import { Button } from 'react-bootstrap'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

function Upload() {

    const channelID = useLocation().state;
    const dispatch = useDispatch();
    const [vFile, setvFile] = useState()
    const [iFile, setiFile] = useState()
    const [vper, setvPer] = useState(null);
    const [iper, setiPer] = useState(null);
    const [iURL, setiURL] = useState()
    const [vURL, setvURL] = useState()
    const [err, setErr] = useState()
    const [vInfo, setvInfo] = useState({
        title: '',
        desc: '',
        tags: ''
    })
    const inputChange = (data) => {
        return setvInfo((prev) => {
            return { ...prev, ...data }
        })
    }

    const uploadFile = (file, urlType) => {
        const storage = getStorage(app);
        const fileName = Date.now() + file.name
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                urlType === 'imgURL' ? setiPer(progress) : setvPer(progress)
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
                    urlType === 'imgURL' ? setiURL(downloadURL) : setvURL(downloadURL)
                });
            }
        )
    }

    const uploadVideo = async () => {
        if (iURL && vURL) {
            dispatch(changeIsLoading(true))
            const newVideo = {
                channel_id: channelID,
                title: vInfo.title,
                desc: vInfo.desc,
                tags: vInfo.tags.split(','),
                video_image: iURL,
                video_video: vURL
            }
            await axios.post(`${process.env.REACT_APP_secret_backEnd}/video/video_reg`, newVideo)
                .then(() => {
                    dispatch(changeIsLoading(false))
                    setErr('');
                    setiFile(null);
                    setvFile(null);
                    setvInfo({ title: '', desc: '', tags: '' });
                    setiPer(null)
                    setvPer(null)
                    alert('video has been uploaded successfully..')
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

    useEffect(() => {
        vFile && uploadFile(vFile, 'vidURL')
    }, [vFile])

    return (
        <>
            <Loading />
            <div className='upload_topDiv total_back w_color'>
                <div className='upload_mainDiv faint_back'>
                    <h5>Upload Your Video</h5>
                    {err && <p style={{ color: 'red', textAlign: 'center' }}>{err}</p>}
                    <label className='my-2'>Video</label>
                    <input type='file' accept='video/*'
                        onChange={e => setvFile(e.target.files[0])} required />
                    {vper > 0 && <p className='mb-1' style={{ fontSize: '12px' }}>uploading: {Math.floor(vper)}%</p>}
                    <label className='my-2'>Title</label>
                    <input type='text' value={vInfo.title} placeholder='video title' className='faint_back w_color'
                        onChange={e => inputChange({ title: e.target.value })} required />
                    <label className='my-2'>Description</label>
                    <textarea rows={8} value={vInfo.desc} placeholder='video description' className='faint_back w_color'
                        onChange={e => inputChange({ desc: e.target.value })} required />
                    <label className='my-2'>Tags</label>
                    <input type='text' value={vInfo.tags} placeholder='Ex. health, movies, sports' className='faint_back w_color'
                        onChange={e => inputChange({ tags: e.target.value })} required />
                    <label className='my-2'>Image</label>
                    <input type='file' accept='image/*'
                        onChange={e => setiFile(e.target.files[0])} />
                    {iper > 0 && <p style={{ fontSize: '12px' }}>uploading: {Math.floor(iper)}%</p>}
                    <Button type='button' style={{ pointerEvents: !iper ? 'none' : 'pointer' }} className='my-2' onClick={uploadVideo}>Upload</Button>
                </div>
            </div>
        </>
    )
}

export default Upload