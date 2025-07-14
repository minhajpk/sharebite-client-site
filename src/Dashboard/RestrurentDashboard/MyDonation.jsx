import React from 'react';
import { useNavigate } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/axiosSecure';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';

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
        Swal.fire({
            title: "Are you sure?",
            text: "This donation will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id, {
                    onSuccess: () => {
                        Swal.fire("Deleted!", "Donation has been removed.", "success");
                    },
                    onError: () => {
                        Swal.fire("Error", "Something went wrong!", "error");
                    }
                });
            }
        });
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
                        <div key={donation._id} className="card bg-base-100 w-96 shadow-sm">
                            <figure>
                                <img
                                    src={donation.image}
                                    alt={donation.title}
                                    className="h-48 w-full object-cover"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {donation.title}
                                    {donation.status === 'Pending' && (
                                        <div className="badge badge-warning text-white">Pending</div>
                                    )}
                                    {donation.status === 'Verified' && (
                                        <div className="badge badge-success text-white">Verified</div>
                                    )}
                                    {donation.status === 'Rejected' && (
                                        <div className="badge badge-error text-white">Rejected</div>
                                    )}
                                </h2>
                                <p><strong>Food Type:</strong> {donation.type}</p>
                                <p><strong>Quantity:</strong> {donation.quantity}</p>
                                <p><strong>Restaurant By:</strong> {donation.restaurantName}</p>
                                <div className="space-x-5 mt-4">
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
                        </div>
                    ))
                )}
            </div>

        </div>
    );
};

export default MyDonations;
