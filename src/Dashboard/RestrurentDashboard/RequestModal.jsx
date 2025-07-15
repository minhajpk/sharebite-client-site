import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../Hooks/axiosSecure';

const RequestModal = ({ donation, user, closeModal }) => {
  const [pickupTime, setPickupTime] = useState('');
  const [description, setDescription] = useState('');
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const requestMutation = useMutation({
    mutationFn: async () => {
      const requestData = {
        donationId: donation._id,
        donationTitle: donation.title,
        restaurantName: donation.restaurantName,
        requesterName: user.displayName,
        requesterEmail: user.email,
        description,
        pickupTime,
        status: 'Pending'
      };
      return await axiosSecure.post('/requests', requestData);
    },
    onSuccess: () => {
      toast.success('Request submitted');
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
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" className="btn" onClick={closeModal}>Close</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default RequestModal;
