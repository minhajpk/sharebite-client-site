import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/axiosSecure';
import { toast } from 'react-hot-toast';

const ManageDonations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all donations
 const { data: donations = [] } = useQuery({
  queryKey: ['donations'],
  queryFn: async () => {
    const res = await axiosSecure.get('/donations');
    return res.data;
  },
});

  // Mutation for verifying donation
  const verifyMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/donations/${id}/verify`);
    },
    onSuccess: () => {
      toast.success('Donation verified!');
      queryClient.invalidateQueries(['donations']);
    },
  });

  // Mutation for rejecting donation
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/donations/${id}/reject`);
    },
    onSuccess: () => {
      toast.error('Donation rejected!');
      queryClient.invalidateQueries(['donations']);
    },
  });

//   if (isLoading) return <p className="text-center">Loading donations...</p>;

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
                <th>{index + 1}</th>
                <td>{donation.title}</td>
                <td>{donation.type}</td>
                <td>{donation.restaurantName}</td>
                <td>{donation.restaurantEmail}</td>
                <td>{donation.quantity}</td>
                <td>
                  <span className={`badge ${donation.status === 'Pending'
                    ? 'badge-warning'
                    : donation.status === 'Available'
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
                        onClick={() => verifyMutation.mutate(donation._id)}
                        className="btn btn-sm btn-success"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() => rejectMutation.mutate(donation._id)}
                        className="btn btn-sm btn-error"
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
