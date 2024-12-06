import React, { useContext } from 'react';
import Navbar from './Navbar';
import { GoogleLogin } from '@react-oauth/google';
import { FaArrowAltCircleDown } from "react-icons/fa";
import { jwtDecode } from 'jwt-decode';
import { AccountContext } from '../context/AccountProvider';
import { addUser } from '../service/Api';
import { GiShieldEchoes } from "react-icons/gi";

const Login = () => {
    const { account, setaccount } = useContext(AccountContext);

    const onLoginSuccess = async (res) => {
        const decoded = jwtDecode(res.credential);
        setaccount(decoded);
        console.log(decoded);
        await addUser(decoded);

    }

    const onLoginError = (res) => {
        console.log(res);
    }

    return (
        <>
            <Navbar />
            <div className="relative flex flex-col items-center justify-center h-screen bg-gray-100">
                <div className="absolute top-[-10%] w-[90%] sm:w-[80%] md:w-[70%] h-[85vh] bg-white rounded-lg shadow-lg flex flex-col items-center justify-center p-8">
                    <div className="first flex flex-col sm:flex-row gap-5 items-center justify-center sm:justify-start">
                        <h1 className="text-2xl font-semibold mb-4 text-gray-800 text-center sm:text-left">Welcome to EchoChat </h1>
                        <div className="logo">
                            <GiShieldEchoes className='text-3xl' />
                        </div>
                    </div>
                    <button className="px-6 py-3 bg-zinc-300 text-black rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 w-full sm:w-auto">
                        Login with Google
                    </button>
                    <div className="arrow">
                        <FaArrowAltCircleDown className='text-3xl mt-5' />
                    </div>
                    <div className="login mt-5 w-[60%] sm:w-[30%]">
                        <GoogleLogin
                            onSuccess={onLoginSuccess}
                            onError={onLoginError} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
