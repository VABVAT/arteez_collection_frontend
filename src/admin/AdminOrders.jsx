import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { token } = useAuth();

    const fetchOrders = async () => {
        try {
            setLoading(true);
            // TODO: Add authentication headers when ready
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setOrders(data);
            } else {
                throw new Error('Failed to fetch orders');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleMarkAsDelivered = async (orderId) => {
        try {
            // TODO: Add authentication headers when ready
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${orderId}/deliver`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (res.ok) {
                fetchOrders(); // Refetch orders to update the status
            } else {
                throw new Error('Failed to mark order as delivered');
            }
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) {
        return <div className="text-center py-16">Loading orders...</div>;
    }

    if (error) {
        return <div className="text-center py-16 text-red-500">{error}</div>;
    }

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8">Manage Orders</h2>

            {/* Mobile View: Card Layout */}
            <div className="md:hidden">
                {orders.map(order => (
                    <div key={order.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                        <div className="font-bold text-lg">Order: {order.razorpayOrderId}</div>
                        <div>User: {order.user.name}</div>
                        <div>Amount: ₹{(order.amount / 100).toFixed(2)}</div>
                        <div>Status: {order.status}</div>
                        <div>Delivered: {order.delivered ? 'Yes' : 'No'}</div>
                        <div className="mt-4">
                            {!order.delivered && (
                                <button 
                                    onClick={() => handleMarkAsDelivered(order.id)}
                                    className="text-blue-500 hover:underline"
                                >
                                    Mark as Delivered
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop View: Table Layout */}
            <div className="hidden md:block bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-3 px-6 text-left">Order ID</th>
                            <th className="py-3 px-6 text-left">User</th>
                            <th className="py-3 px-6 text-left">Amount</th>
                            <th className="py-3 px-6 text-left">Status</th>
                            <th className="py-3 px-6 text-left">Delivered</th>
                            <th className="py-3 px-6 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {orders.map(order => (
                            <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6">{order.razorpayOrderId}</td>
                                <td className="py-3 px-6">{order.user.name}</td>
                                <td className="py-3 px-6">₹{(order.amount / 100).toFixed(2)}</td>
                                <td className="py-3 px-6">{order.status}</td>
                                <td className="py-3 px-6">{order.delivered ? 'Yes' : 'No'}</td>
                                <td className="py-3 px-6">
                                    {!order.delivered && (
                                        <button 
                                            onClick={() => handleMarkAsDelivered(order.id)}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Mark as Delivered
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOrders;
