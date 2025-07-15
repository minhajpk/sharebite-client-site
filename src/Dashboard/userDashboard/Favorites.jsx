import React, { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../Context/AuthContext';
import useAxiosSecure from '../../Hooks/axiosSecure';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const Favorites = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch favorite donations of the user
  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ['favorites', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites?email=${user.email}`);
      return res.data;
    }
  });

  // Mutation to remove a favorite
  const removeMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/favorites/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['favorites', user?.email]);
      Swal.fire('Removed!', 'Donation removed from favorites.', 'success');
    },
    onError: () => {
      Swal.fire('Error!', 'Failed to remove donation.', 'error');
    }
  });

  const handleRemove = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This donation will be removed from your favorites.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        removeMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p className="text-center">Loading favorites...</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">My Favorite Donations</h2>

      {favorites.length === 0 ? (
        <p>No favorite donations found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav) => (
            <div key={fav._id} className="card shadow-md bg-base-100">
              <figure>
                <img src={fav.image} alt={fav.title} className="h-48 w-full object-cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{fav.title}</h2>
                <p><strong>Restaurant:</strong> {fav.restaurantName}, {fav.location}</p>
                <p><strong>Status:</strong> {fav.status}</p>
                <p><strong>Quantity:</strong> {fav.quantity}</p>
                <div className="flex justify-between mt-3">
                  <Link to={`/donation-details/${fav.donationId}`}>
                    <button className="btn btn-sm btn-info text-white">Details</button>
                  </Link>
                  <button onClick={() => handleRemove(fav._id)} className="btn btn-sm btn-error text-white">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
