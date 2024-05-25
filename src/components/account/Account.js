import { Button } from 'react-bootstrap';
import './account.css'
import app from '../firebase/Firebase';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from 'axios';

function Account() {

    const userData = useSelector((state) => state.info.user)
    const [iFile, setiFile] = useState();
    const [iper, setiPer] = useState();
    const [iURL, setiURL] = useState()
    const [err, setErr] = useState()
    const [formInfo, setFormInfo] = useState({
        name: userData.name,
        email: userData.email,
        address: userData.address,
        city: userData.city,
        zip: userData.zip,
        image: ''
    })

    const inputChange = (data) => {
        return setFormInfo((prev) => {
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

    const formSubmit = async (e) => {
        e.preventDefault();
        let userId = userData._id

        const updatedUser = {
            name: formInfo.name,
            email: formInfo.email,
            address: formInfo.address,
            city: formInfo.city,
            zip: formInfo.zip,
            image: iURL || userData.image
        }
        await axios.put(`${process.env.REACT_APP_secret_backEnd}/user/userone_update/${userId}`, updatedUser)
            .then(() => {
                setErr('');
                setiPer(0)
                alert('Information has been updated..')
            })
            .catch(() => {
                setErr('something went wrong, please try again')
            })

    }

    useEffect(() => {
        iFile && uploadFile(iFile, 'imgURL')
    }, [iFile])

    return (
        <div className='account_topDiv total_back w_color'>
            <Row>
                <Col md={5} className='py-2'>
                    <div className='account_imgDiv'>
                        <label htmlFor='profile-img'>
                            <i className="fa-solid fa-circle-plus fa-2x"></i>
                        </label>
                        <input id='profile-img' style={{ display: 'none' }} type='file' accept='image/*'
                            onChange={(e) => setiFile(e.target.files[0])} />
                        <img src={iFile ? (URL.createObjectURL(iFile)) : userData.image} alt='img' />
                    </div>
                    {iper > 0 && <p style={{ color: 'green', textAlign: 'center' }}>uploading: {Math.floor(iper)}%</p>}
                    {err && <p style={{ color: 'red', textAlign: 'center' }}>{err}</p>}
                </Col>
                <Col md={7} className='py-2'>
                    <Form onSubmit={formSubmit}>
                        <Form.Group className="mb-3" controlId="formGridEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" defaultValue={userData.name}
                                onChange={(e) => inputChange({ name: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' defaultValue={userData.email}
                                onChange={(e) => inputChange({ email: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridAddress2">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type='text' placeholder='address' defaultValue={userData.address}
                                onChange={(e) => inputChange({ address: e.target.value })} />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} className='account_firstName' controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control type='text' placeholder='city' defaultValue={userData.city}
                                    onChange={(e) => inputChange({ city: e.target.value })} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control type='text' placeholder='zip' defaultValue={userData.zip}
                                    onChange={(e) => inputChange({ zip: e.target.value })} />
                            </Form.Group>
                        </Row>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default Account;