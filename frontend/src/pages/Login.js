import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('email and password are required')
        }
        try {
            const url = `https://login-backend-taupe.vercel.app/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }

    return (
        <div className='bg-gray-400 h-screen'>
            <div className='w-4/12 bg-black bg-opacity-85 relative top-[25%] left-[30%] p-20 rounded-lg'>
            <h1 className='text-2xl text-center text-white'>Login form</h1>
            <form onSubmit={handleLogin}>
                <div className='my-2'>
                    <label htmlFor='email' className='font-semibold p-2 text-white'>Email : </label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={loginInfo.email}
                        className=' bg-transparent p-2 border-b-2 text-white'
                    />
                </div>
                <div className='my-2'>
                    <label htmlFor='password' className='font-semibold p-2 text-white'>Password : </label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={loginInfo.password}
                        className=' p-2 bg-transparent border-b-2 text-white'
                    />
                </div>
                <button type='submit' className='bg-red-500 py-2 px-4 rounded-sm text-white font-semibold  ml-32 my-5'>Login</button>
                <br></br>
                <span className='font-semibold text-white'>Does't have an account ?
                    <Link to="/signup" className='text-blue-500'> Signup now</Link>
                </span>
            </form>
            <ToastContainer />
            </div>
        </div>
    )
}

export default Login
