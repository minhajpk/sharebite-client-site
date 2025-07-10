import React from 'react';
import { NavLink, Outlet } from 'react-router';
import LogoD from '../../assets/Sharebite Logo.png';
import {
    HiOutlineHome,
    HiOutlineUser,
    HiOutlineClipboardList,
    HiOutlineHeart,
    HiOutlinePencilAlt,
    HiOutlineCurrencyDollar
} from 'react-icons/hi';

const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open min-h-screen">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            {/* Page content */}
            <div className="drawer-content flex flex-col">
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 font-semibold text-lg">Dashboard</div>
                </div>

                <div className="p-4">
                    <Outlet />
                </div>
            </div>

            {/* Sidebar content */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu bg-base-300 w-80 p-4 text-base-content min-h-full space-y-1">
                    <div className="p-3 flex justify-start items-center mt-2">
                        <img src={LogoD} />
                        <a className=" text-xl font-bold">ShareBite</a>
                    </div>

                    <li>
                        <NavLink to="/">
                            <HiOutlineHome className="inline mr-2 text-lg" /> Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/my-profile">
                            <HiOutlineUser className="inline mr-2 text-lg" /> My Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/request-charity-role">
                            <HiOutlineClipboardList className="inline mr-2 text-lg" /> Request Charity Role
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/favorite">
                            <HiOutlineHeart className="inline mr-2 text-lg" /> Favorites
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/my-reviews">
                            <HiOutlinePencilAlt className="inline mr-2 text-lg" /> My Reviews
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/transaction-history">
                            <HiOutlineCurrencyDollar className="inline mr-2 text-lg" /> Transaction History
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;
