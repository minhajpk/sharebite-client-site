import React, { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/axiosSecure';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';
// import moment from 'moment';

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['myReviews', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?email=${user.email}`);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/reviews/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myReviews', user?.email]);
      Swal.fire('Deleted!', 'Your review has been removed.', 'success');
    },
    onError: () => {
      Swal.fire('Error!', 'Failed to delete the review.', 'error');
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this review!',
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

  if (isLoading) return <p className="text-center">Loading your reviews...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Reviews</h2>
      {reviews.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {reviews.map((review) => (
            <div key={review._id} className="border p-4 rounded shadow-sm">
              <h3 className="font-bold text-lg">{review.donationTitle || 'Donation Item'}</h3>
              <p className="text-sm text-gray-600 mb-1">Restaurant: {review.restaurantName || 'Unknown'}</p>
              {/* <p className="text-sm text-gray-500 mb-1">
                Reviewed on: {moment(review.createdAt).format('MMMM D, YYYY h:mm A')}
              </p> */}
              <p className="text-yellow-500 mb-1">Rating: {review.rating} ⭐</p>
              <p className="mb-2">{review.comment}</p>
              <button
                onClick={() => handleDelete(review._id)}
                className="btn btn-sm btn-error"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews submitted yet.</p>
      )}
    </div>
  );
};

export default MyReviews;
