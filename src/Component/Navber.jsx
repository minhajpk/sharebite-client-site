import React from 'react';
import Logo from '../assets/Sharebite Logo.png'
import { Link } from 'react-router';

const Navber = () => {
    const links = <>
    <Link to="/">Home</Link>
    <li>All Donations</li>
    <Link to="/dashboard">Dashboard</Link>
    </>
    return (
        <div className="bg-base-200 shadow-md">
            {/* Drawer Wrapper */}
            <div className="drawer z-50">
                <input id="nav-drawer" type="checkbox" className="drawer-toggle" />

                {/* Page content */}
                <div className="drawer-content">
                    {/* Navbar */}
                    <div className="navbar w-full max-w-7xl mx-auto px-4">
                        {/* Start */}
                        <div className="navbar-start">
                            {/* Hamburger for small devices */}
                            <label htmlFor="nav-drawer" className="btn btn-ghost lg:hidden">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16"
                                    />
                                </svg>
                            </label>
                            <img src={Logo} />
                            <a className=" text-xl font-bold">ShareBite</a>
                        </div>

                        {/* Center (for large screens only) */}
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal space-x-4 px-1">
                                {links}
                            </ul>
                        </div>

                        {/* End */}
                        <div className="navbar-end space-x-4 hidden lg:flex">
                            <Link to="/login"><button className='btn border border-green-700 bg-white'>Login</button></Link>
                            <Link to="/register"><button className='btn  border border-green-700 bg-white'>Register</button></Link>
                        </div>

                    </div>
                </div>

                {/* Drawer side panel */}
                <div className="drawer-side">
                    <label htmlFor="nav-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 space-x-4 w-64 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                      {links}
                        <li>Register</li>
                        <li>Login</li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Navber;
