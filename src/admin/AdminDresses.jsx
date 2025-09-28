import React, { useState, useEffect } from 'react';
import DressFormModal from './DressFormModal.jsx';
import { useAuth } from '../context/AuthContext';

const AdminDresses = () => {
    const [dresses, setDresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDress, setSelectedDress] = useState(null);
    const { token } = useAuth();
    console.log(token);
    const normalize = (item) => ({
        ...item,
        sizes: Array.isArray(item.sizes) ? item.sizes : (Array.isArray(item.size) ? item.size : []),
    });

    const fetchDresses = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/dresses`, {
                headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setDresses(data.map(normalize));
            } else {
                throw new Error('Failed to fetch dresses');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDresses();
    }, []);

    const handleSave = async (dressData) => {
        const method = dressData.id ? 'PUT' : 'POST';
        const url = dressData.id
            ? `${import.meta.env.VITE_BACKEND_URL}/api/admin/dresses/${dressData.id}`
            : `${import.meta.env.VITE_BACKEND_URL}/api/admin/dresses`;

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(dressData),
            });

            if (res.ok) {
                fetchDresses();
                setIsModalOpen(false);
                setSelectedDress(null);
            } else {
                throw new Error(`Failed to ${dressData.id ? 'edit' : 'add'} dress`);
            }
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDelete = async (dressId) => {
        if (window.confirm('Are you sure you want to delete this dress?')) {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/dresses/${dressId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                if (res.ok) {
                    fetchDresses();
                } else {
                    throw new Error('Failed to delete dress');
                }
            } catch (err) {
                alert(err.message);
            }
        }
    };

    if (loading) {
        return <div className="text-center py-16">Loading dresses...</div>;
    }

    if (error) {
        return <div className="text-center py-16 text-red-500">{error}</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Manage Dresses</h2>
                <button onClick={() => { setSelectedDress(null); setIsModalOpen(true); }} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Dress</button>
            </div>

            {/* Mobile View: Card Layout */}
            <div className="md:hidden">
                {dresses.map(dress => (
                    <div key={dress.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                        <div className="font-bold text-lg">{dress.name}</div>
                        <div>ID: {dress.id}</div>
                        <div>Price: ₹{dress.price}</div>
                        <div>Quantity: {dress.quantity}</div>
                        <div className="mt-4">
                            <button onClick={() => { setSelectedDress(dress); setIsModalOpen(true); }} className="text-blue-500 hover:underline mr-4">Edit</button>
                            <button onClick={() => handleDelete(dress.id)} className="text-red-500 hover:underline">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop View: Table Layout */}
            <div className="hidden md:block bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Price</th>
                            <th className="py-3 px-6 text-left">Quantity</th>
                            <th className="py-3 px-6 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {dresses.map(dress => (
                            <tr key={dress.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6">{dress.id}</td>
                                <td className="py-3 px-6">{dress.name}</td>
                                <td className="py-3 px-6">₹{dress.price}</td>
                                <td className="py-3 px-6">{dress.quantity}</td>
                                <td className="py-3 px-6">
                                    <button onClick={() => { setSelectedDress(dress); setIsModalOpen(true); }} className="text-blue-500 hover:underline mr-4">Edit</button>
                                    <button onClick={() => handleDelete(dress.id)} className="text-red-500 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <DressFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} dress={selectedDress} />
        </div>
    );
};

export default AdminDresses;
