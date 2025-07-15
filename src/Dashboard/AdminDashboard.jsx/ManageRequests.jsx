import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/axiosSecure';
import Swal from 'sweetalert2';

const ManageRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Get all requests
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['requests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/request_donations');
      return res.data;
    },
  });

  // Delete request mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/request_donations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['requests']);
      Swal.fire('Deleted!', 'Request has been deleted.', 'success');
    },
    onError: () => {
      Swal.fire('Error!', 'Failed to delete the request.', 'error');
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This request will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p className="text-center">Loading requests...</p>;

  return (
    <div className="max-w-7xl  p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Requests</h2>
      {requests.length ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra max-w-7xl">
            <thead>
              <tr>
                <th>#</th>
                <th>Donation Title</th>
                <th>Charity Name</th>
                <th>Charity Email</th>
                <th>Request Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
                <tr key={req._id}>
                  <th>{index + 1}</th>
                  <td>{req.donationTitle}</td>
                  <td>{req.requesterEmail}</td>
                  <td>{req.requesterEmail}</td>
                  <td>{req.description}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No requests found.</p>
      )}
    </div>
  );
};

export default ManageRequests;
