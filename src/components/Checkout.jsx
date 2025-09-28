import React, { useState, useEffect } from 'react';
import useRazorpay from '../hooks/useRazorpay';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Checkout = () => {
    const { cart } = useCart();
    const { processPayment, loading: paymentLoading } = useRazorpay();
    const { token, user, login } = useAuth();

    const [addressStep, setAddressStep] = useState('select'); // 'select', 'form', 'summary'
    const [newAddress, setNewAddress] = useState('');
    const [selectedAddress, setSelectedAddress] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            if (user.address) {
                setAddressStep('select');
                setSelectedAddress(user.address);
            } else {
                setAddressStep('form');
            }
        }
    }, [user]);

    const truncateAddress = (address) => {
        if (address.length > 50) {
            return address.substring(0, 50) + '...';
        }
        return address;
    };

    const handleUpdateAddress = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/me/address`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ address: newAddress }),
            });

            if (res.ok) {
                const newToken = localStorage.getItem('token');
                login(newToken); // This will refetch the user and update the context
                setSelectedAddress(newAddress);
                setAddressStep('summary');
                toast.success('Address updated successfully!');
            } else {
                const data = await res.json();
                throw new Error(data.error || 'Failed to update address');
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.cartQuantity, 0);

    const handlePayment = async () => {
        try {
            const dresses = cart.map(item => ({ dressId: item.id, size: item.selectedSize }));
            const orderResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    amount: totalAmount * 100, // Amount in paise
                    currency: 'INR',
                    dresses,
                    addressTo: selectedAddress, // Add selected address to the order
                }),
            });

            const orderData = await orderResponse.json();
            if (orderResponse.status !== 200) {
                throw new Error(orderData.error || 'Failed to create order');
            }

            await processPayment({
                order: orderData,
                user: user,
            });

        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10 p-8 border border-gray-300 rounded-lg shadow-lg">
            {addressStep === 'select' && user && user.address && (
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-center">Shipping Address</h2>
                    <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                        <p className="font-semibold">Previous Address:</p>
                        <p>{truncateAddress(user.address)}</p>
                    </div>
                    <button
                        onClick={() => setAddressStep('summary')}
                        className="w-full mb-2 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Use this address
                    </button>
                    <button
                        onClick={() => setAddressStep('form')}
                        className="w-full bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300"
                    >
                        Enter new address
                    </button>
                </div>
            )}

            {addressStep === 'form' && (
                <form onSubmit={handleUpdateAddress}>
                    <h2 className="text-2xl font-bold mb-6 text-center">Enter Shipping Address</h2>
                    <div className="mb-6">
                        <textarea
                            value={newAddress}
                            onChange={(e) => setNewAddress(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                            placeholder="Enter your full address"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition duration-300"
                    >
                        {loading ? 'Saving...' : 'Save and Continue'}
                    </button>
                </form>
            )}

            {addressStep === 'summary' && (
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-center">Order Summary</h2>
                    <div className="space-y-4 mb-6">
                        {cart.map(item => (
                            <div key={item.id} className="flex justify-between">
                                <span>{item.name} (x{item.cartQuantity})</span>
                                <span>₹{(item.price * item.cartQuantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mb-6">
                        <p className="text-lg font-semibold">Total: ₹{totalAmount.toFixed(2)}</p>
                    </div>
                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-2">Shipping to:</h3>
                        <p>{selectedAddress}</p>
                    </div>
                    <button
                        onClick={handlePayment}
                        disabled={paymentLoading || cart.length === 0}
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition duration-300"
                    >
                        {paymentLoading ? 'Processing...' : 'Pay with Razorpay'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Checkout;