import React, { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../Context/AuthContext';
import useAxiosSecure from '../../Hooks/axiosSecure';
import toast from 'react-hot-toast';

const MyPickups = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch accepted requests for the logged-in charity user
    const { data: pickups = [], isLoading } = useQuery({
        queryKey: ['myPickups', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/request_donations/pickups?email=${user.email}`);
            return res.data;
        },
    });

    // Confirm pickup mutation
    const confirmPickup = useMutation({
        mutationFn: async (id) => {
            return await axiosSecure.patch(`/request_donations/${id}/pickup`);
        },
        onSuccess: () => {
            toast.success('Pickup confirmed');
            queryClient.invalidateQueries(['myPickups', user?.email]);
        },
        onError: () => {
            toast.error('Failed to confirm pickup');
        },
    });

    if (isLoading) return <p className="text-center">Loading pickups...</p>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">My Pickups</h2>
            {pickups.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                    {pickups.map((pickup) => (
                        <div key={pickup._id} className="border rounded-lg p-4 shadow-md">
                            <img src={pickup.
                                donationImage} alt="" />
                            <h3 className="text-xl font-semibold">{pickup.donationTitle}</h3>
                            <p><strong>Restaurant:</strong> {pickup.restaurantName}</p>
                            <p><strong>Location:</strong> {pickup.location || 'N/A'}</p>
                            <p><strong>Food Type:</strong> {pickup.foodType || 'N/A'}</p>
                            <p><strong>Quantity:</strong> {pickup.quantity || 'N/A'}</p>
                            <p><strong>Pickup Time:</strong> {pickup.pickupTime}</p>
                            <p><strong>Status:</strong>
                                <span className={`badge ${pickup.status === 'Picked Up' ? 'badge-success' : 'badge-warning'} ml-2`}>
                                    {pickup.status}
                                </span>
                            </p>
                            {pickup.status === 'Accepted' && (
                                <button
                                    onClick={() => confirmPickup.mutate(pickup._id)}
                                    className="btn btn-sm mt-2 bg-[#0e606e] text-white hover:bg-[#0e606e]/90"
                                >
                                    Confirm Pickup
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className='text-center mt-50'>No pickups assigned yet.</p>
            )}
        </div>
    );
};

export default MyPickups;
