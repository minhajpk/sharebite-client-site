import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxiosSecure from '../Hooks/axiosSecure';


const FeaturedDonations = () => {
  const axiosSecure = useAxiosSecure();

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ['featured-donations'],
    queryFn: async () => {
      const res = await axiosSecure.get('/donations/featured');
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className='mb-6 space-y-3'>
        <h2 className="text-2xl text-center text-[#0e606e] font-bold ">Featured Donations</h2>
      <p className='lg:w-1/2 w-fit text-center mx-auto mb-3'>Handpicked donations from our generous partners, ready to feed communities and reduce food waste. View details, act fast, and support the cause.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {donations.map((donation) => (
          <div key={donation._id} className="card bg-base-100 w-96 shadow-sm">
            <figure>
              <img
                src={donation.image}
                alt={donation.title}
                className="h-48 object-cover w-full"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {donation.title}
                {donation.status === 'Available' && (
                  <div className="badge badge-secondary">NEW</div>
                )}
                  <span
                  className={`badge ${
                    donation.status === 'Available'
                      ? 'badge-success'
                      : 'badge-warning'
                  }`}
                >
                  {donation.status}
                </span>
              </h2>
              <p className="text-sm text-gray-600"> <strong>Food Type</strong> {donation.type}</p>
              <p className="text-sm">
                <strong>Restaruant By:</strong> {donation.restaurantName}
              </p>
              <p className="text-sm">
                <strong>Location:</strong> {donation.location}
              </p>
              <div className=" mt-2">
              
                <Link to={`donation-details/${donation._id}`}>
                  <button type="submit" className="btn bg-[#0e606e] w-full text-white hover:scale-105 transition duration-300 hover:bg-[#0e606e]">
                                Details
                            </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedDonations;
