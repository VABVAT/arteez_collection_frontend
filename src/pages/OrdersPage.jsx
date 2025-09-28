import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { token, user } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/me`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    const sortedOrders = data.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
                    setOrders(sortedOrders);
                } else {
                    throw new Error('Failed to fetch orders');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchOrders();
        }
    }, [token]);

    if (loading) {
        return <div className="text-center py-16">Loading your orders...</div>;
    }

    if (error) {
        return <div className="text-center py-16 text-red-500">{error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Your Orders</h1>
            {orders.length === 0 ? (
                <p>You have no paid orders.</p>
            ) : (
                <div className="space-y-8">
                    {orders.map(order => (
                        <div key={order.id} className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                                <div>
                                    <p className="font-semibold">Order ID: {order.razorpayOrderId}</p>
                                    <p className="text-sm text-gray-600">Date: {new Date(order.completedAt).toLocaleString()}</p>
                                    {order.addressTo && (
                                        <p className="text-sm text-gray-600">Delivering to: {order.addressTo}</p>
                                    )}
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">Total: ₹{(order.amount / 100).toFixed(2)}</p>
                                    <p className={`text-sm font-medium ${order.status === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                                        Status: {order.status}
                                    </p>
                                    {order.isDelivered && (
                                        <p className="text-sm font-medium text-green-600 animate-pulse">
                                            Delivered
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Items:</h3>
                                <div className="space-y-4">
                                    {order.dresses.map(item => (
                                        <div key={item.dress.id} className="flex items-center space-x-4">
                                            <img src={item.dress.image} alt={item.dress.name} className="w-16 h-16 object-cover rounded-lg"/>
                                            <div>
                                                <p className="font-semibold">{item.dress.name}</p>
                                                <p className="text-sm text-gray-600">Size: {item.size}</p>
                                                <p className="text-sm">Price: ₹{item.dress.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
