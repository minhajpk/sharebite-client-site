import React, { use } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';
import useAxiosSecure from '../../Hooks/axiosSecure';
import { AuthContext } from '../../Context/AuthContext';

const ManageRoleRequests = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { user } = use(AuthContext)

    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['charity-requests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/charity-requests');
            return res.data;
        },
    });

    const approveRequest = useMutation({
        mutationFn: async (req) => {
            await axiosSecure.patch(`/request/${req._id}/status`, { status: 'Approved' });
            await axiosSecure.patch(`/users/${req.email}/role`, { role: 'charity' });
        },
        onSuccess: () => {
            toast.success('Charity role approved!');
            queryClient.invalidateQueries(['charity-requests']);
        },
    });

    const rejectRequest = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.patch(`/request/${id}/status`, { status: 'Rejected' });
        },
        onSuccess: () => {
            toast.success('Request rejected');
            queryClient.invalidateQueries(['charity-requests']);
        },
    });

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="overflow-x-auto  rounded-xl">
            <h2 className="text-2xl m-5 font-semibold mb-4">Paid Charity Role Requests</h2>
            <table className="table max-w-7xl table-zebra">
                <thead className="bg-base-200 text-base font-bold">
                    <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Organization</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((req, idx) => (
                        <tr key={req._id}>
                            <td>{idx + 1}</td>
                            <td>{req.name}</td>
                            <td>{req.email}</td>
                            <td>{req.
                                organization
                            }</td>
                            <td>{req.role}</td>

                            <td>
                                <span className="badge badge-warning text-white">{req.status || 'Pending'}</span>
                            </td>
                            <td className="space-x-2">
                               {req.status?.toLowerCase() === 'pending' && req.paymentStatus?.toLowerCase() === 'paid' && (
                                        <>
                                            <button
                                                onClick={() => approveRequest.mutate(req)}
                                                className="btn btn-xs btn-success"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => rejectRequest.mutate(req._id)}
                                                className="btn btn-xs btn-error"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageRoleRequests;
