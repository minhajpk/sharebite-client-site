import React from 'react';
import CountUp from 'react-countup';
import { FaCloud, FaLeaf, FaUtensils } from 'react-icons/fa';

const DashboardHome = () => {
    return (
        <div className='max-w-7xl'>
                        <section className="bg-white max-w-7xl mx-auto py-12">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-bold text-[#0e606e]">Welcome to Dashboard</h2>
                                <p className="text-gray-600 mt-2">Together we're creating real change</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 text-center">
                                <div className="flex flex-col items-center">
                                    <FaLeaf className="text-green-600 text-5xl mb-4" />
                                    <h3 className="text-4xl font-bold text-green-800">
                                        <CountUp end={12500} duration={2} separator="," /> kg
                                    </h3>
                                    <p className="text-gray-600 mt-2">Food Donated</p>
                                </div>

                                <div className="flex flex-col items-center">
                                    <FaUtensils className="text-green-600 text-5xl mb-4" />
                                    <h3 className="text-4xl font-bold text-green-800">
                                        <CountUp end={25000} duration={2} separator="," />+
                                    </h3>
                                    <p className="text-gray-600 mt-2">Meals Saved</p>
                                </div>

                                <div className="flex flex-col items-center">
                                    <FaCloud className="text-green-600 text-5xl mb-4" />
                                    <h3 className="text-4xl font-bold text-green-800">
                                        <CountUp end={5200} duration={2} separator="," /> kg
                                    </h3>
                                    <p className="text-gray-600 mt-2">CO₂ Emissions Prevented</p>
                                </div>
                            </div>
                        </section>
                    </div>
    );
};

export default DashboardHome;