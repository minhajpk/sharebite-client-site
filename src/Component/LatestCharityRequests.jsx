import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/axiosSecure';

const LatestCharityRequests = () => {
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['request_donations'],
    queryFn: async () => {
      const res = await axiosSecure.get('/request_donations'); // Replace with your actual API
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center mt-10">Loading requests...</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-[#0e606e] mb-6 text-center">Latest Charity Requests</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.slice(0, 3).map((req, index) => (
          <div key={index} className="bg-white shadow-md p-5 rounded-lg border">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={req.charityImage || 'https://i.ibb.co/YkWZbjH/default-charity.png'}
                alt={req.charityName}
                className="w-14 h-14 object-cover rounded-full border"
              />
              <h3 className="text-lg font-semibold">{req.requesterName}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Food Title:</strong> {req.donationTitle}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Description:</strong> {req.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCharityRequests;
