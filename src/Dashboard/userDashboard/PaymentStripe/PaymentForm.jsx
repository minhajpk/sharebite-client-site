import React, { useContext, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Context/AuthContext';
import useAxiosSecure from '../../../Hooks/axiosSecure';

const CharityPaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
      const navigate = useNavigate();
    const { id } = useParams();
    console.log('Request ID:', id);

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const [name, setName] = useState(user?.displayName || '');
    const [email, setEmail] = useState(user?.email || '');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const amount = 25;


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setError('');
        setSuccess('');
        setLoading(true);

        const card = elements.getElement(CardElement);
        if (!card) return;

        const billingDetails = {
            name,
            email,
            address: {
                country: country || undefined,
                postal_code: postalCode || undefined,
            },
        };

        try {
            const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card,
                billing_details: billingDetails,
            });

            if (pmError) {
                setError(pmError.message);
                setLoading(false);
                return;
            }


            const res = await axiosSecure.post('/create-payment-intent', { amount });
            const clientSecret = res.data.clientSecret;
            console.log(res)


            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
            });
            console.log(result)
            if (result.error) {
                setError(result.error.message);
            } else if (result.paymentIntent.status === 'succeeded') {
                const transactionId = result.paymentIntent.id;


                const paymentData = {
                    requestId: id,
                    email,
                    amount: amount,
                    transactionId,
                    paymentFor: 'charity-role',
                    paymentMethod: result.paymentIntent.payment_method_types,
                };

                const paymentRes = await axiosSecure.post('/payments', paymentData);

                if (paymentRes.data.insertedId) {
                    await axiosSecure.patch(`/request/${id}/payment-status`, {
                        status: 'paid',
                    });

                    await Swal.fire({
                        icon: 'success',
                        title: 'Payment Successful!',
                        html: `
              <strong>Transaction ID:</strong> <code>${transactionId}</code><br/>
              <strong>Amount:</strong> <code>$${amount}</code>
            `,
                        confirmButtonText: 'Go to Dashboard',
                    });
                    

                      navigate('/dashboard/transaction-history');
                }
            }
        } catch (err) {
            console.error('Stripe Error:', err);
            setError('An unexpected error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg space-y-4"
            >
                <h2 className="text-xl font-bold text-center">Charity Role Payment</h2>
                <p className="text-sm text-center text-gray-500 mb-2">
                    Use Stripe test card: <code>4242 4242 4242 4242</code>
                </p>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        className="input input-bordered w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label>Card Info</label>
                    <div className="border p-3 rounded-md">
                        <CardElement />
                    </div>
                </div>

                <div>
                    <label>Name on Card</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label>Country</label>
                    <select
                        className="input input-bordered w-full"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                        <option value="">Select Country</option>
                        <option value="BD">Bangladesh</option>
                        <option value="US">United States</option>
                        <option value="GB">United Kingdom</option>
                        <option value="IN">India</option>
                    </select>
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Postal Code"
                        className="input input-bordered w-full"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}

                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="w-full btn bg-[#0e606e] text-white hover:scale-105 transition duration-300 hover:bg-[#0e606e]"
                >
                    {loading ? 'Processing...' :   'Pay $25'}
                </button>
            </form>
        </div>
    );
};

export default CharityPaymentForm;
