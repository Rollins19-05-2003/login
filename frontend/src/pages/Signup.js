import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('name, email and password are required')
        }
        try {
            const url = "http://localhost:8080/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
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
            <h1 className='text-2xl text-center text-white'>Sign up form</h1>
            <form onSubmit={handleSignup}>
            <div className='my-2'>
                    <label htmlFor='name' className='font-semibold p-2 text-white'>Name : </label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        placeholder='Enter your name...'
                        value={signupInfo.name}
                        className=' bg-transparent p-2 border-b-2 text-white'
                    />
                </div>
                <div className='my-2'>
                    <label htmlFor='email' className='font-semibold p-2 text-white'>Email : </label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={signupInfo.email}
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
                        value={signupInfo.password}
                        className=' p-2 bg-transparent border-b-2 text-white'
                    />
                </div>
                <button type='submit' className='bg-red-500 py-2 px-4 rounded-sm text-white font-semibold  ml-32 my-5'>Sign up</button>
                <br></br>
                <span className='font-semibold text-white'>Already an user ?
                    <Link to="/login" className='text-blue-500'> Login</Link>
                </span>
            </form>
            <ToastContainer />
            </div>
        </div>
    )
}

export default Signup
