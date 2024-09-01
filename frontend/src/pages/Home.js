import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }

    const fetchUserData = async () => {
        try {
            const url = "http://localhost:8080/data";
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await axios.get(url, headers);
            const result = response.data;
            console.log(result);
            setProducts(result);
        } catch (err) {
            handleError(err);
        }
    }
    useEffect(() => {
        fetchUserData()
    }, [])

    return (
        <div className='bg-gray-400 h-screen w-screen'>
            <div className='w-6/12 bg-black bg-opacity-85 relative top-[25%] left-[25%] p-20 rounded-lg'>
                <h1 className='text-white text-3xl'>Welcome {loggedInUser}</h1>
                <div className='text-white py-4'>
                    <p className='py-4'>The below user list is shown only to <span className='text-green-500'>authenticate user</span></p>
                    {
                        products && products?.slice(0,6).map((item, index) => (
                            <ul key={index}>
                                <span><b>Name</b> : {item.name}, <b>Email</b> : {item.email}</span>
                            </ul>
                        ))
                    }
                </div>
                <button onClick={handleLogout} className='text-white bg-red-600 px-4 py-2 rounded-md ml-[40%]'>Logout</button>

                <ToastContainer />
            </div>
        </div>
    )
}

export default Home
