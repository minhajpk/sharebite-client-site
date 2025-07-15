import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';
import useAxiosSecure from '../../Hooks/axiosSecure';

const RequestedDonations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading, isError } = useQuery({
    queryKey: ['requested_donations'],
    queryFn: async () => {
      const res = await axiosSecure.get('/request_donations'); 
      return res.data;
    },
  });

  const acceptMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/request_donations/${id}/accept`);
    },
    onSuccess: () => {
      toast.success('Request accepted');
      queryClient.invalidateQueries(['requested_donations']);
    },
    onError: () => {
      toast.error('Failed to accept request');
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/request_donations/${id}/reject`);
    },
    onSuccess: () => {
      toast.success('Request rejected');
      queryClient.invalidateQueries(['requested_donations']);
    },
    onError: () => {
      toast.error('Failed to reject request');
    },
  });

  if (isLoading) return <p className="text-center">Loading requests...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load requests.</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Requested Donations</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Donation Title</th>
              <th>Food Type</th>
              <th>Charity Name</th>
              <th>Charity Email</th>
              <th>Request Description</th>
              <th>Pickup Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.donationTitle}</td>
                <td>{req.foodType || 'N/A'}</td>
                <td>{req.requesterName}</td>
                <td>{req.requesterEmail}</td>
                <td>{req.description}</td>
                <td>{req.pickupTime}</td>
                <td>
                  <span
                    className={`badge ${
                      req.status === 'Pending'
                        ? 'badge-warning'
                        : req.status === 'Accepted'
                        ? 'badge-success'
                        : 'badge-error'
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="flex gap-2">
                  {req.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => acceptMutation.mutate(req._id)}
                        className="btn btn-sm btn-success"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => rejectMutation.mutate(req._id)}
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

export default RequestedDonations;
