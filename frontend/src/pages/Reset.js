import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils';

const Reset = () => {
    const [userInfo, setUserInfo] = useState({
        email: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyUserInfo = { ...userInfo };
        copyUserInfo[name] = value;
        setUserInfo(copyUserInfo);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email } = userInfo;
        console.log(email)
        if (!email) {
            return handleError('email is required')
        }
        try {
            const url = `http://localhost:8080/auth/reset`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
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
    <h1 className='text-2xl text-center text-white'>Forgot Password</h1>
    <form onSubmit={handleSubmit}>
        <div className='my-2'>
            <label htmlFor='email' className='font-semibold p-2 text-white'>Email address: </label>
            <input
                onChange={handleChange}
                type='email'
                name='email'
                value={userInfo.email}
                placeholder='Enter your email...'
                className=' bg-transparent p-2 border-b-2 text-white'
            />
        </div>
        
        <button type='submit' className='bg-red-500 py-2 px-4 rounded-sm text-white font-semibold  ml-32 my-5'>Submit</button>
        <br></br>
        <span className='font-semibold text-white'>
            <Link to="/signup" className='text-blue-500'> Signup</Link>
        </span>
    </form>
    <ToastContainer />
    </div>
</div>
  )
}

export default Reset
