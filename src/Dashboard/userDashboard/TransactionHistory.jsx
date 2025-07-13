import React, { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Context/AuthContext';
import useAxiosSecure from '../../Hooks/axiosSecure';

const formatDate = (iso) => new Date(iso).toLocaleString();

const PaymentHistory = () => {
    const { user } = use(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { isPending, data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    });

    if (isPending) {
        return '...loading';
    }

    return (
        <div className="overflow-x-auto rounded-xl">
            <h2 className='text-2xl font-bold m-5'>Transaction History</h2>
            <table className="table table-zebra max-w-7xl">
                <thead className="bg-base-200 text-base font-semibold">
                    <tr>
                        <th>#</th>
                        <th>Charity / Purpose</th>
                        <th>Email</th>
                        <th>Amount</th>
                        <th>Transaction ID</th>
                        <th>Paid At</th>
                    </tr>
                </thead>
                <tbody>
                    {payments?.length > 0 ? (
                        payments.map((p, index) => (
                            <tr key={p.transactionId}>
                                <td>{index + 1}</td>
                                <td className="truncate" title={p.paymentFor || 'N/A'}>
                                    {p.paymentFor || 'N/A'}
                                </td>
                                 <td>{p.email}</td>
                                <td>${p.amount}</td>
                                <td className="font-mono text-sm" title={p.transactionId}>
                                    {p.transactionId?.slice(0, 10)}...
                                </td>
                                <td>{formatDate(p.paid_at_string)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center text-gray-500 py-6">
                                No payment history found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;
