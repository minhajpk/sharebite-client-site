import React from 'react';
import Lottie from 'lottie-react';
import Error from "../assets/Animation - 1749470242880.json";

import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router';
import Navber from '../Component/Navber';
import Footer from '../Component/Footer';

const ErrorPage = () => {
    return (
        <div className=' min-h-screen'>
            <Navber />
            <div className='mt-20 mb-20'>
                <Lottie className='lg:h-[650px]' loop={true} animationData={Error} />
                <div className='w-full flex justify-center'>
                    <Link to='/'>
                        <button className="bg-[#0e606e] btn w-full text-white hover:scale-105 transition duration-300 hover:bg-[#0e606e]">
                            Back to Home <FaArrowRightLong />
                        </button>
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ErrorPage;
