import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxiosSecure from '../Hooks/axiosSecure';

const AllDonationPage = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(''); 
  const { data: donations = [], isLoading } = useQuery({
    queryKey: ['featured-donations'],
    queryFn: async () => {
      const res = await axiosSecure.get('/donations/all-donation');
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  // ✅ Step 1: Filter by location (search)
  const filteredDonations = donations.filter((donation) =>
    donation.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Step 2: Sort by quantity or pickup time
  const sortedDonations = [...filteredDonations].sort((a, b) => {
    if (sortBy === 'quantity-asc') return a.quantity - b.quantity;
    if (sortBy === 'quantity-desc') return b.quantity - a.quantity;
    if (sortBy === 'pickup-asc')
      return new Date(a.pickupTime) - new Date(b.pickupTime);
    if (sortBy === 'pickup-desc')
      return new Date(b.pickupTime) - new Date(a.pickupTime);
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">All Donations</h2>

      {/* 🔍 Search + Sort */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by city or location..."
          className="input input-bordered w-full md:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="select select-bordered w-full md:w-1/3"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="quantity-asc">Quantity: Low to High</option>
          <option value="quantity-desc">Quantity: High to Low</option>
          <option value="pickup-asc">Pickup Time: Earliest First</option>
          <option value="pickup-desc">Pickup Time: Latest First</option>
        </select>
      </div>

      {/* 🧾 Donation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedDonations.map((donation) => (
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
              <p className="text-sm text-gray-600">
                <strong>Food Type:</strong> {donation.type}
              </p>
              <p className="text-sm">
                <strong>Quantity:</strong> {donation.quantity}
              </p>
              <p className="text-sm">
                <strong>Pickup Time:</strong> {new Date(donation.pickupTime).toLocaleString()}
              </p>
              <p className="text-sm">
                <strong>Restaurant By:</strong> {donation.restaurantName}
              </p>
              <p className="text-sm">
                <strong>Location:</strong> {donation.location}
              </p>
              <div className="mt-2">
                <Link to={`/donation-details/${donation._id}`}>
                  <button
                    type="submit"
                    className="btn bg-[#0e606e] w-full text-white hover:scale-105 transition duration-300 hover:bg-[#0e606e]"
                  >
                    Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}

        {sortedDonations.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No donations found for this location.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllDonationPage;
