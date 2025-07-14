import React from 'react';
import { useNavigate } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/axiosSecure';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-hot-toast';

const MyDonations = () => {
  const { user } = React.useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch donations by restaurant email
  const { data: donations = [], isLoading } = useQuery({
    queryKey: ['my-donations', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations?email=${user.email}`);
      return res.data;
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/donations/${id}`);
    },
    onSuccess: () => {
      toast.success('Donation deleted');
      queryClient.invalidateQueries(['my-donations']);
    },
  });

  const handleUpdate = (donation) => {
    navigate(`/dashboard/update-donation/${donation._id}`, { state: donation });
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this donation?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <p className="text-center">Loading donations...</p>;

  return (
   <div className='max-w-7xl p-10 '>
    <h2 className='text-2xl font-bold'>My Donatios</h2>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto my-10">
      {donations.length === 0 ? (
        <p className="text-center col-span-full text-gray-500">No donations found.</p>
      ) : (
        donations.map((donation) => (
          <div key={donation._id} className="card shadow-xl p-4 rounded-lg ">
            <img
              src={donation.image}
              alt={donation.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold">{donation.title}</h3>
            <p><strong>Type:</strong> {donation.type}</p>
            <p><strong>Quantity:</strong> {donation.quantity}</p>
            <p><strong>Restaurant:</strong> {donation.restaurantName}</p>
            <p>
              <strong>Status:</strong>{' '}
              <span className={`badge ${donation.status === 'Pending' ? 'badge-warning' : donation.status === 'Verified' ? 'badge-success' : 'badge-error'}`}>
                {donation.status}
              </span>
            </p>

            <div className="mt-4 flex gap-3">
              {donation.status !== 'Rejected' && (
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => handleUpdate(donation)}
                >
                  Update
                </button>
              )}
              <button
                className="btn btn-sm btn-error"
                onClick={() => handleDelete(donation._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
   </div>
  );
};

export default MyDonations;
