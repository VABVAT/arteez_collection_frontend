import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ProfilePage = () => {
    const { user, token, login } = useAuth();
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setAddress(user.address);
        }
    }, [user]);

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
                body: JSON.stringify({ address }),
            });

            if (res.ok) {
                const updatedUser = await res.json();
                // The login function in AuthContext will update the user
                // This is a bit of a hack, a better way would be to have a dedicated setUser function in AuthContext
                const newToken = localStorage.getItem('token');
                login(newToken);
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

    if (!user) {
        return <div className="text-center py-16">Loading profile...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Your Profile</h1>
            <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
                <div className="space-y-4 mb-8">
                    <div>
                        <label className="block text-gray-700 font-bold mb-1">Name</label>
                        <p className="text-lg">{user.name}</p>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-1">Email</label>
                        <p className="text-lg">{user.email}</p>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-1">Phone</label>
                        <p className="text-lg">{user.phone}</p>
                    </div>
                </div>

                <form onSubmit={handleUpdateAddress}>
                    <div className="mb-6">
                        <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address</label>
                        <textarea
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="3"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition duration-300"
                    >
                        {loading ? 'Updating...' : 'Update Address'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;
