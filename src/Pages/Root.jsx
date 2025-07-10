import React from 'react';
import Navber from '../Component/Navber';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Root = () => {
    AOS.init({
        delay: 200, 
        duration: 1000, 
    });
    return (
        <div>
            <Navber></Navber>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;