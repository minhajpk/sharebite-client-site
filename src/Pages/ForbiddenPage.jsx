import React from 'react';
import Image from '../assets/forbidden.png'
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from 'react-router';

const ForbiddenPage = () => {
    return (
        <div className=' max-w-7xl mx-auto'>
             
           <div><img src={Image} className='max-w-7xl mx-auto mt-10 bg-white' alt="forbidden" /> 
           </div>
           <div className='flex justify-center'><Link to='/'><button className="bg-[#0e606e] btn mb-10 text-white hover:scale-105 transition duration-300 hover:bg-[#0e606e]">
                                       Back to Home <FaArrowRightLong />
                                   </button></Link></div>
           
        </div>
    );
};

export default ForbiddenPage;