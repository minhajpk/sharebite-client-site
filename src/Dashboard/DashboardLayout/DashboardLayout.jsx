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
import { FaClipboardList, FaHandsHelping, FaListAlt, FaPlus, FaRegHandshake, FaStar, FaUserCheck, FaUsersCog, FaUtensils } from 'react-icons/fa';
import useUserRole from '../../Hooks/useUserRole';

const navLinkClass = ({ isActive }) =>
    isActive
        ? "bg-[#0e606e] text-white px-3 py-2 rounded-md block font-bold"
        : "text-gray-700 hover:bg-[#0e606e] hover:text-white px-3 py-2 rounded-md block font-bold ";

const DashboardLayout = () => {
    const { role, roleLoading } = useUserRole();
    console.log(role);
    return (
        <div className="drawer lg:drawer-open min-h-screen">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            {/* Page content */}
            <div className="drawer-content flex flex-col">
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
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
                        <img src={LogoD} className="w-10 h-10 mr-2" alt="Logo" />
                        <span className="text-xl font-bold">ShareBite</span>
                    </div>

                    <li>
                        <NavLink to="/" className={navLinkClass}>
                            <HiOutlineHome className="inline mr-2 text-lg" /> Dashboard Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/my-profile" className={navLinkClass}>
                            <HiOutlineUser className="inline mr-2 text-lg" /> My Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/request-charity-role" className={navLinkClass}>
                            <HiOutlineClipboardList className="inline mr-2 text-lg" /> Request Charity Role
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/favorite" className={navLinkClass}>
                            <HiOutlineHeart className="inline mr-2 text-lg" /> Favorites
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/my-reviews" className={navLinkClass}>
                            <HiOutlinePencilAlt className="inline mr-2 text-lg" /> My Reviews
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/transaction-history" className={navLinkClass}>
                            <HiOutlineCurrencyDollar className="inline mr-2 text-lg" /> Transaction History
                        </NavLink>
                    </li>
                    {/* Admin dashboard */}
                    {!roleLoading && role === 'admin' &&
                        <>
                            <li>
                                <NavLink to="/dashboard/admin-profile" className={navLinkClass}>
                                    <HiOutlineUser className="inline mr-2 text-lg" /> Admin Profile
                                </NavLink>
                            </li>
                            <NavLink to="/dashboard/manage-user" className={navLinkClass}>
                                <FaUsersCog className="inline mr-2 text-lg" /> Manage Users
                            </NavLink>

                            <NavLink to="/dashboard/manage-donations" className={navLinkClass}>
                                <FaHandsHelping className="inline mr-2 text-lg" /> Manage Donations
                            </NavLink>

                            <NavLink to="/dashboard/manage-role-requests" className={navLinkClass}>
                                <FaUserCheck className="inline mr-2 text-lg" /> Manage Role Requests
                            </NavLink>

                            <NavLink to="/dashboard/manage-requests" className={navLinkClass}>
                                <FaClipboardList className="inline mr-2 text-lg" /> Manage Requests
                            </NavLink>

                            <NavLink to="/dashboard/feature-donations" className={navLinkClass}>
                                <FaStar className="inline mr-2 text-lg" /> Feature Donations
                            </NavLink>
                        </>
                    }
                    {!roleLoading && role === 'restaurant' &&
                        <>
                            <div className="space-y-2">
                                <NavLink to="/dashboard/restaurant-profile" className={navLinkClass}>
                                    <FaUtensils className="inline mr-2 text-lg" />
                                    Restaurant Profile
                                </NavLink>

                                <NavLink to="/dashboard/add-donation" className={navLinkClass}>
                                    <FaPlus className="inline mr-2 text-lg" />
                                    Add Donation
                                </NavLink>

                                <NavLink to="/dashboard/my-donations" className={navLinkClass}>
                                    <FaListAlt className="inline mr-2 text-lg" />
                                    My Donations
                                </NavLink>

                                <NavLink to="/dashboard/requested-donations" className={navLinkClass}>
                                    <FaRegHandshake className="inline mr-2 text-lg" />
                                    Requested Donations
                                </NavLink>
                            </div>

                        </>

                    }
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;
