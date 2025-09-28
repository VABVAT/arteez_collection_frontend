import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { token } = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // TODO: Add authentication headers when ready
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
                if (res.ok) {
                    const data = await res.json();
                    setUsers(data);
                } else {
                    throw new Error('Failed to fetch users');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div className="text-center py-16">Loading users...</div>;
    }

    if (error) {
        return <div className="text-center py-16 text-red-500">{error}</div>;
    }

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8">Manage Users</h2>

            {/* Mobile View: Card Layout */}
            <div className="md:hidden">
                {users.map(user => (
                    <div key={user.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                        <div className="font-bold text-lg">{user.name}</div>
                        <div>ID: {user.id}</div>
                        <div>Email: {user.email}</div>
                        <div>Phone: {user.phone}</div>
                        <div>Role: {user.role}</div>
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
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Phone</th>
                            <th className="py-3 px-6 text-left">Role</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {users.map(user => (
                            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6">{user.id}</td>
                                <td className="py-3 px-6">{user.name}</td>
                                <td className="py-3 px-6">{user.email}</td>
                                <td className="py-3 px-6">{user.phone}</td>
                                <td className="py-3 px-6">{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;
