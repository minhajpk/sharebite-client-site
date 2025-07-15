import React, { useContext, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/axiosSecure';
import { AuthContext } from '../../Context/AuthContext';
import toast from 'react-hot-toast';

const ReceivedDonations = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedDonation, setSelectedDonation] = useState(null);
  const [reviewName, setReviewName] = useState(user?.displayName || '');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [requesterEmail, setRequesterEmail] = useState(user?.email || '');

  // Fetch all requests for the logged-in user
  const { data: receivedDonations = [], isLoading } = useQuery({
    queryKey: ['request_donations', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/request_donations?email=${user.email}`);
      return res.data;
    },
  });

  // Filter only "Picked Up" donations
  const filteredDonations = receivedDonations.filter(
    (donation) => donation.status === 'Picked Up'
  );

  const reviewMutation = useMutation({
    mutationFn: async () => {
      const reviewData = {
        donationId: selectedDonation._id,
        donationTitle: selectedDonation.donationTitle,
        restaurantName: selectedDonation.restaurantName,
        name: reviewName,
        requesterEmail,
        comment,
        rating: parseInt(rating),
        createdAt: new Date()
      };
      const res = await axiosSecure.post(`/reviews/${selectedDonation._id}`, reviewData);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Review submitted!');
      document.getElementById('review_modal').close();
      queryClient.invalidateQueries(['request_donations']);
      setComment('');
      setRating(5);
    },
    onError: () => {
      toast.error('Failed to submit review.');
    }
  });

  if (isLoading) return <p className="text-center">Loading received donations...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Received Donations</h2>

      {filteredDonations.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDonations.map((donation) => (
            <div key={donation._id} className="border p-4 rounded shadow">
              <h3 className="text-xl font-semibold mb-2">{donation.donationTitle}</h3>
              <p><strong>Restaurant:</strong> {donation.restaurantName}</p>
              <p><strong>Food Type:</strong> {donation.foodType || 'N/A'}</p>
              <p><strong>Quantity:</strong> {donation.quantity}</p>
              <p><strong>Pickup Date:</strong> {new Date(donation.pickupTime).toLocaleString()}</p>
              <button
                onClick={() => {
                  setSelectedDonation(donation);
                  document.getElementById('review_modal').showModal();
                }}
                className="mt-3 btn btn-sm bg-[#0e606e] text-white hover:bg-[#0e606e]/90"
              >
                Review
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No donations received yet.</p>
      )}

      {/* Review Modal */}
      <dialog id="review_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-2">Submit Your Review</h3>

          <form onSubmit={(e) => {
            e.preventDefault();
            reviewMutation.mutate();
          }} className="space-y-3">

            <input type="text" value={reviewName} onChange={(e) => setReviewName(e.target.value)} className="input input-bordered w-full" placeholder="Your Name" required />

            <input type="email" value={requesterEmail} onChange={(e) => setRequesterEmail(e.target.value)} className="input input-bordered w-full" placeholder="Your Email" required />

            <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="textarea textarea-bordered w-full" placeholder="Write your comment" required></textarea>

            <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} className="input input-bordered w-full" required />

            <div className="modal-action">
              <button type="submit" className="btn bg-[#0e606e] text-white hover:bg-[#0e606e]/90" disabled={reviewMutation.isLoading}>
                {reviewMutation.isLoading ? 'Submitting...' : 'Submit'}
              </button>
              <button type="button" className="btn bg-red-600 text-white hover:bg-red-700"
                onClick={() => document.getElementById('review_modal').close()}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ReceivedDonations;
