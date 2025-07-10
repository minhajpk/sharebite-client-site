import React, { use } from 'react';
import Logo from '../assets/Sharebite Logo.png'
import { Link } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import Icon from '../assets/user.png'

const Navber = () => {
    const { user, logOut } = use(AuthContext)
    const links = <>
        <Link to="/">Home</Link>
        <li>All Donations</li>
        <Link to="/dashboard">Dashboard</Link>
    </>
    const handleLogOut = () => {
        logOut();
    }
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
                        <div className="navbar-end space-x-4  lg:flex">
                            {
                                user ? (
                                    <div className="dropdown dropdown-end">
                                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                            <div className="w-10 rounded-full">
                                                <img src={user?.photoURL
                                                    || Icon} alt="User" />
                                            </div>
                                        </div>
                                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-28">

                                            <li>
                                                <button onClick={handleLogOut} className="text-green-800 font-bold">Signout</button>
                                            </li>
                                        </ul>
                                    </div>

                                ) : (
                                    <div className='space-x-3 hidden lg:glock lg:flex'>
                                        <Link to="/login" className="btn bg-white text-[#0e606e] hover:bg-[#0e606e] hover:text-white">Login</Link>
                                        <Link to="/register" className="btn bg-white text-[#0e606e] hover:bg-[#0e606e] hover:text-white">Sign Up</Link>
                                    </div>

                                )
                            }            </div>

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
