import { useState } from 'react'
import axios from 'axios';
import './sign.css'
import { useNavigate } from 'react-router-dom';

function SignUp() {

    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({
        name: '',
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
        await axios.post(`${process.env.REACT_APP_secret_backEnd}/user/user_reg`, loginInfo)
            .then(() => {
                alert('you has been registered successfully..');
                setErr('');
                navigate('/signin');
            })
            .catch(() => setErr('something went wrong, please tyr again'))
    }

    return (
        <>
            <div className='sign__topDiv total_back w_color'>
                <div className='brand__logo'><i className="fa-brands fa-youtube nav_brandlogo fa-3x"></i></div>
                <div className='sign__title'>Sign Up</div>
                {err && <p style={{ color: 'red' }}>{err}</p>}
                <form onSubmit={submitForm}>
                    <div>
                        <input type='text' placeholder='name' className='w_color'
                            onChange={(e) => inputChange({ name: e.target.value })} required />
                    </div>
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
            </div>
        </>
    )
}

export default SignUp