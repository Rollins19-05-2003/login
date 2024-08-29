import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

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

    const fetchProducts = async () => {
        try {
            const url = "https://login-backend-indol.vercel.app/products";
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers);
            const result = await response.json();
            console.log(result);
            setProducts(result);
        } catch (err) {
            handleError(err);
        }
    }
    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div className='bg-gray-400 h-screen'>
            <div className='w-4/12 bg-black bg-opacity-85 relative top-[25%] left-[30%] p-20 rounded-lg'>
                <h1 className='text-white text-3xl'>Welcome {loggedInUser}</h1>
                <div className='text-white py-4'>
                    <p className='py-4'>The below product list is shown only to <span className='text-green-500'>authenticate user</span></p>
                    {
                        products && products?.map((item, index) => (
                            <ul key={index}>
                                <span>{item.name} : {item.price}</span>
                            </ul>
                        ))
                    }
                </div>
                <button onClick={handleLogout} className='text-white bg-red-600 px-4 py-2 rounded-md ml-[35%]'>Logout</button>

                <ToastContainer />
            </div>
        </div>
    )
}

export default Home
