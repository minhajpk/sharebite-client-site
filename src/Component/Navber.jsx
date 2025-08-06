import React, { useContext } from 'react';
import Logo from '../assets/Sharebite Logo.png';
import { Link, NavLink } from 'react-router';  // Note: use 'react-router-dom' for web apps
import { AuthContext } from '../Context/AuthContext';
import Icon from '../assets/user.png';

// Import React Icons
import { FaHome, FaGift, FaTachometerAlt, FaUserPlus, FaSignInAlt } from 'react-icons/fa';

const Navber = () => {
    const { user, logOut } = useContext(AuthContext);

    const links = (
        <>
            <li>
                <NavLink to="/" className={({ isActive }) => isActive ? "bg-[#0e606e] font-bold text-xl text-white rounded flex items-center space-x-2" : "hover:bg-gray-100 font-bold text-xl text-[#0e606e] rounded flex items-center space-x-2"}>
                    <FaHome /> <span>Home</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/all-donation" className={({ isActive }) => isActive ? "bg-[#0e606e] text-white font-bold text-xl rounded flex items-center space-x-2" : "hover:bg-gray-100 font-bold text-xl rounded text-[#0e606e] flex items-center space-x-2"}>
                    <FaGift />  <span> All Donation</span>
                </NavLink>
            </li>
            
            <li>
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? "bg-[#0e606e] font-bold text-xl text-white rounded flex items-center space-x-2" : "hover:bg-gray-100 font-bold text-xl text-[#0e606e] rounded flex items-center space-x-2"}>
                    <FaTachometerAlt /> <span>Dashboard</span>
                </NavLink>
            </li>
           

        </>
    );

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
                        <div className="navbar-start flex items-center space-x-2">
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
                            <img src={Logo} alt="ShareBite Logo" className="w-10 h-10" />
                            <a className="text-xl font-bold">ShareBite</a>
                        </div>

                        {/* Center (for large screens only) */}
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal space-x-4 px-1">
                                {links}
                            </ul>
                        </div>

                        {/* End */}
                        <div className="navbar-end space-x-4  lg:flex">
                            {user ? (
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={user?.photoURL || Icon} alt="User" />
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-28">
                                        <li>
                                            <button onClick={handleLogOut} className="text-green-800 font-bold">Signout</button>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <div className='space-x-3 hidden lg:flex'>
                                    <Link to="/login" className="btn bg-white text-[#0e606e] hover:bg-[#0e606e] hover:text-white flex items-center space-x-1">
                                        <FaSignInAlt /> <span>Login</span>
                                    </Link>
                                    <Link to="/register" className="btn bg-white text-[#0e606e] hover:bg-[#0e606e] hover:text-white flex items-center space-x-1">
                                        <FaUserPlus /> <span>Sign Up</span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Drawer side panel */}
                <div className="drawer-side">
                    <label htmlFor="nav-drawer" className="drawer-overlay"></label>
                    <ul className="menu bg-base-300 w-80 p-4 text-base-content min-h-full space-y-1">
                        {/* Logo in Sidebar */}
                        <li className="mb-4">
                            <div className="flex items-center space-x-2">
                                <img src={Logo} className="w-10 h-10" alt="Logo" />
                                <span className="text-xl font-bold">ShareBite</span>
                            </div>
                        </li>
                        {links}
                        <li>
                            <NavLink to="/register" className={({ isActive }) =>
                                isActive ? "bg-[#0e606e] text-white font-bold text-xl rounded flex items-center space-x-2" : "hover:bg-gray-100 font-bold text-xl rounded flex text-[#0e606e] items-center space-x-2"}>
                                <FaUserPlus /> <span>Register</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/login" className={({ isActive }) =>
                                isActive ? "bg-[#0e606e] text-white text-xl font-bold rounded flex items-center space-x-2" : "hover:bg-gray-100 font-bold text-xl rounded text-[#0e606e] flex items-center space-x-2"}>
                                <FaSignInAlt /> <span>Login</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navber;
