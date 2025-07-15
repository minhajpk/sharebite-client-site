import React, { use } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/axiosSecure';

import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthContext';

const MyRequests = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch charity's requests
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['my-requests', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/request_donations?email=${user.email}`);
      return res.data;
    }
  });

  // Cancel request mutation
  const cancelMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/request_donations/${id}`);
    },
    onSuccess: () => {
      toast.success('Request canceled');
      queryClient.invalidateQueries(['my-requests', user.email]);
    }
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This request will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        cancelMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p className="text-center">Loading requests...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {requests.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">No requests found.</p>
      ) : (
        requests.map((req) => (
          <div key={req._id} className="card bg-base-100 shadow-sm w-96 ">
            <div className="card-body">
              <img src={req.donationImage} alt="" />
              <h2 className="card-title">{req.donationTitle}</h2>
              <p><strong>Restaurant:</strong> {req.restaurantName}</p>
              <p><strong>Type:</strong> {req.
                type}</p>
              <p><strong>Quantity:</strong> {req.quantity}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span className={`badge ${req.status === 'Pending' ? 'badge-warning' : req.status === 'Accepted' ? 'badge-success' : 'badge-error'}`}>
                  {req.status}
                </span>
              </p>
              {req.status === 'Pending' && (
                <button onClick={() => handleCancel(req._id)} className="btn btn-sm btn-error mt-3">
                  Cancel Request
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyRequests;
