import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxiosSecure from '../../Hooks/axiosSecure';

const FeaturedDonations2 = () => {
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
      <h2 className="text-2xl font-bold mb-6">Featured Donations</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra max-w-7xl">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Food Type</th>
              <th>Restaurant</th>
              <th>Location</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id}>
                <td className="font-semibold">{donation.title}</td>
                <td>
                  {donation.status === 'Available' && (
                    <span className="badge badge-secondary mr-2">NEW</span>
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
                </td>
                <td>{donation.type}</td>
                <td>{donation.restaurantName}</td>
                <td>{donation.location}</td>
                <td>
                  <Link to='/'>
                    <button className="btn bg-[#0e606e] text-white btn-sm hover:scale-105 transition duration-300 hover:bg-[#0e606e]">
                     Feature
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeaturedDonations2;
