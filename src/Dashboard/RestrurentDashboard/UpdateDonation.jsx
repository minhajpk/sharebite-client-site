import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/axiosSecure';
import { toast } from 'react-hot-toast';

const UpdateDonation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const donation = location.state;
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        quantity: '',
        image: '',
        description: '',
        pickupTime: ''
    });

    useEffect(() => {
        if (donation) {
            setFormData({
                title: donation.title || '',
                type: donation.type || '',
                quantity: donation.quantity || '',
                image: donation.image || '',
                description: donation.description || '',
                pickupTime: donation.pickupTime?.slice(0, 16) || ''
            });
        }
    }, [donation]);
    console.log(donation)

    const updateMutation = useMutation({
        mutationFn: async () => {
            const res = await axiosSecure.put(`/donations/${donation._id}`, formData);
            return res.data;
        },
        onSuccess: () => {
            toast.success('Donation updated successfully!');
            queryClient.invalidateQueries(['my-donations']);
            navigate('/dashboard/my-donations');
        },
        onError: () => {
            toast.error('Failed to update donation');
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateMutation.mutate();
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-6 text-center">Update Donation</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    name="title"
                    placeholder="Donation Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />

                <input
                    type="text"
                    name="type"
                    placeholder="Food Type"
                    value={formData.type}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />

                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={formData.quantity
                    }
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />

                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                    rows={4}
                ></textarea>

                <input
                    type="datetime-local"
                    name="pickupTime"
                    value={formData.pickupTime}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="btn bg-[#0e606e] text-white hover:bg-[#0e606e]/90"
                        disabled={updateMutation.isLoading}
                    >
                        {updateMutation.isLoading ? 'Updating...' : 'Update Donation'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateDonation;
