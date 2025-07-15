import React, { use, useState } from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import useAxiosSecure from '../../Hooks/axiosSecure';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';
import RequestModal from './RequestModal';



const DonationDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { user } = use(AuthContext);

    const [showRequestModal, setShowRequestModal] = useState(false);
    const [reviewName, setReviewName] = useState(user?.name || '');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5);

    console.log('User:', user);
    


    const reviewMutation = useMutation({
        mutationFn: async () => {
            return await axiosSecure.post(`/reviews/${id}`, {
                name: reviewName,
                comment,
                rating: parseInt(rating),
            });

        },
        onSuccess: () => {
            Swal.fire({
                title: 'Success!',
                text: 'Review submitted successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
                timer: 2500,
                timerProgressBar: true,
            });

            queryClient.invalidateQueries(['reviews', id]);

            document.getElementById('review_modal').close();

            setComment('');
            setRating(5);
        },
        onError: () => {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to submit review.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    });


    const { data: donation, isLoading, isError } = useQuery({
        queryKey: ['donation', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donations/${id}`);
            return res.data;
        }
    });
    
   const { data: users = [] } = useQuery({
  queryKey: ['users'],
  queryFn: async () => {
    const res = await axiosSecure.get('/users');
    return res.data;
  }
});
const currentUser = users.find(u => u.email === user?.email);

console.log('User role:', currentUser?.role)


    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/${id}`);
            return res.data;
        }
    });

    const favoriteMutation = useMutation({
        mutationFn: async () => {
            return await axiosSecure.post('/favorites', {
                userEmail: user.email,
                donationId: id,
                title: donation.title,
                image: donation.image
            });
        },
        onSuccess: () => {
            toast.success('Added to favorites');
        }
    });

    const confirmPickupMutation = useMutation({
        mutationFn: async () => {
            return await axiosSecure.patch(`/donations/${id}/pickup`, { status: 'Picked Up' });
        },
        onSuccess: () => {
            toast.success('Donation marked as picked up');
            queryClient.invalidateQueries(['donation', id]);
        }
    });

    const handleSaveToFavorites = () => favoriteMutation.mutate();
    const handleConfirmPickup = () => confirmPickupMutation.mutate();

    if (isLoading) return <p className="text-center">Loading donation...</p>;
    if (isError || !donation) return <p className="text-center text-red-500">Donation not found.</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-6">
            <img src={donation.image} alt={donation.title} className="w-full h-72 object-cover rounded mb-6" />
            <h2 className="text-2xl font-bold mb-2">{donation.title}</h2>
            <p className="mb-2">{donation.description}</p>
            <p className="mb-1"><strong>Type:</strong> {donation.type}</p>
            <p className="mb-1"><strong>Quantity:</strong> {donation.quantity}</p>
            <p className="mb-1"><strong>Pickup Time:</strong> {donation.pickupTime}</p>
            <p className="mb-1"><strong>Restaurant:</strong> {donation.restaurantName}</p>
            <p className="mb-1"><strong>Location:</strong> {donation.location}</p>
            <p className="mb-1"><strong>Status:</strong> <span className={`badge ${donation.status === 'Available' ? 'badge-success' : donation.status === 'Requested' ? 'badge-warning' : 'badge-error'}`}>{donation.status}</span></p>

            <div className="flex gap-4 mt-4">
                <button onClick={handleSaveToFavorites} className="btn btn-outline btn-sm">Save to Favorites</button>

                {user?.role === 'charity' && donation.status === 'Accepted' && (
                    <button onClick={handleConfirmPickup} className="btn btn-success btn-sm">Confirm Pickup</button>
                )}
            </div>

            {/* Request Modal */}
            {currentUser?.role === 'charity' && donation.status === 'Available' && (
                <button
                    className="btn btn-primary btn-sm mt-5"
                    onClick={() => setShowRequestModal(true)}
                >
                    Request Donation
                </button>
            )}

            {showRequestModal && (
                <RequestModal
                    donation={donation}
                    user={user}
                    closeModal={() => setShowRequestModal(false)}
                />
            )}




            {/* Review Section */}
            <div className="mt-10 space-y-4">
                <h3 className="text-xl font-bold mb-2">Reviews</h3>
                {reviews.length ? reviews.map((r, idx) => (
                    <div key={idx} className="shadow-md  bg-white p-2 rounded mb-2">
                        <p className="font-semibold">{r.name}</p>
                        <p>{r.comment}</p>
                        <p className="text-yellow-500">Rating: {r.rating} ⭐</p>
                    </div>
                )) : <p>No reviews yet.</p>}

                {/* Button to open the modal */}
                <button className="btn btn-outline btn-sm mt-2" onClick={() => document.getElementById('review_modal').showModal()}>
                    Add Review
                </button>

                {/* Review Modal */}
                <dialog id="review_modal" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-2">Submit Your Review</h3>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                reviewMutation.mutate();
                            }}
                            className="space-y-3"
                        >
                            <div>
                                <label className="label">
                                    <span className="label-text">Your Name</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={reviewName}
                                    onChange={(e) => setReviewName(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">Comment</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered w-full"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Write your comment"
                                    required
                                ></textarea>
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">Rating (1 to 5)</span>
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="5"
                                    className="input input-bordered w-full"
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary" disabled={reviewMutation.isLoading}>
                                    {reviewMutation.isLoading ? 'Submitting...' : 'Submit'}
                                </button>
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => document.getElementById('review_modal').close()}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>

                    </div>
                </dialog>




            </div>
        </div>
    );
};

export default DonationDetails;