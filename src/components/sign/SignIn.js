import './sign.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkUser } from '../redux/UserSlice';
import axios from 'axios';


function SignIn() {

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });
    const [err, setErr] = useState();

    const inputChange = (data) => {
        return setLoginInfo((prev) => {
            return { ...prev, ...data }
        })
    }

    const submitForm = async (e) => {
        e.preventDefault();
        await axios.post(`${process.env.REACT_APP_secret_backEnd}/user/login`, loginInfo)
            .then((res) => {
                setErr('');
                dispatch(checkUser())
                navigate('/');
            })
            .catch(() => { setErr('something went wrong, please try again') })
    }

    return (
        <>
            <div className='sign__topDiv total_back w_color'>
                <div className='brand__logo'><i className="fa-brands fa-youtube nav_brandlogo fa-3x"></i></div>
                <div className='sign__title'>Sign In</div>
                {err && <p style={{ color: 'red' }}>{err}</p>}
                <form onSubmit={submitForm}>
                    <div>
                        <input type='email' placeholder='email' className='w_color'
                            onChange={(e) => inputChange({ email: e.target.value })} required />
                    </div>
                    <div>
                        <input type='password' placeholder='password' className='w_color'
                            onChange={(e) => inputChange({ password: e.target.value })} required />
                    </div>
                    <button type='submit'>SUBMIT</button>
                </form>
                <Link to='/signup' className='text-decoration-underline text-primary'>
                    <p>Sign up</p>
                </Link>
            </div>
        </>
    )
}

export default SignIn