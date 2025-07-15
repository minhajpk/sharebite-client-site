import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';
import useAxiosSecure from '../../Hooks/axiosSecure';

const ManageDonations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all donations
  const { data: donations = [], isLoading } = useQuery({
    queryKey: ['donations'],
    queryFn: async () => {
      const res = await axiosSecure.get('/donations');
      return res.data;
    },
  });

  // Verify donation
  const verifyMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/donations/${id}/verify`, {
        status: 'Available',
      });
    },
    onSuccess: () => {
      toast.success('Donation verified!');
      queryClient.invalidateQueries(['donations']);
    },
  });

  // Reject donation
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/donations/${id}/reject`, {
        status: 'Rejected',
      });
    },
    onSuccess: () => {
      toast.error('Donation rejected!');
      queryClient.invalidateQueries(['donations']);
    },
  });

  if (isLoading) return <p className="text-center">Loading donations...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Donations</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Food Type</th>
              <th>Restaurant</th>
              <th>Email</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, index) => (
              <tr key={donation._id}>
                <td>{index + 1}</td>
                <td>{donation.title}</td>
                <td>{donation.type}</td>
                <td>{donation.restaurantName}</td>
                <td>{donation.restaurantEmail}</td>
                <td>{donation.quantity}</td>
                <td>
                  <span className={`badge 
                    ${donation.status === 'Pending'
                      ? 'badge-warning'
                      : donation.status === 'Verified'
                      ? 'badge-success'
                      : 'badge-error'
                    }`}>
                    {donation.status}
                  </span>
                </td>
                <td className="flex gap-2">
                  {donation.status === 'Pending' && (
                    <>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => verifyMutation.mutate(donation._id)}
                      >
                        Verify
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => rejectMutation.mutate(donation._id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDonations;
