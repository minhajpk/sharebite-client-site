import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../Hooks/axiosSecure';
import Swal from 'sweetalert2';

const RequestModal = ({ donation, user, closeModal }) => {
    const [pickupTime, setPickupTime] = useState('');
    const [description, setDescription] = useState('');
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const requestMutation = useMutation({
        mutationFn: async () => {
            const requestData = {
                donationId: donation._id,
                donationImage: donation.image,
                donationTitle: donation.title,
                restaurantName: donation.restaurantName,
                requesterName: user.displayName,
                requesterEmail: user.email,
                description,
                pickupTime,
                status: 'Pending'
            };
            return await axiosSecure.post('/request_donations', requestData);
        },
        onSuccess: () => {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your Donations Request has been successfully Submitted!",
                showConfirmButton: false,
                timer: 2000,
            });
            queryClient.invalidateQueries(['donation', donation._id]);
            closeModal();
        },
        onError: () => {
            toast.error('Failed to send request');
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!pickupTime || !description) {
            toast.error('Please fill all fields');
            return;
        }
        requestMutation.mutate();
    };

    return (
        <dialog open className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Request Donation</h3>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input type="text" value={donation.image} readOnly className="input input-bordered w-full" />
                    <input type="text" value={donation.title} readOnly className="input input-bordered w-full" />
                    <input type="text" value={donation.restaurantName} readOnly className="input input-bordered w-full" />
                    <input type="text" value={user.displayName} readOnly className="input input-bordered w-full" />
                    <input type="email" value={user.email} readOnly className="input input-bordered w-full" />

                    <textarea
                        className="textarea textarea-bordered w-full"
                        placeholder="Why are you requesting this donation?"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <input
                        type="datetime-local"
                        className="input input-bordered w-full"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        required
                    />

                    <div className="modal-action">
                        <button type="submit" className="bg-[#0e606e] btn text-white hover:scale-105 transition duration-300 hover:bg-[#0e606e]">Submit</button>
                        <button type="button" className="bg-red-600 btn  text-white hover:scale-105 transition duration-300 hover:bg-red-700"
                            onClick={closeModal}>Close</button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default RequestModal;
