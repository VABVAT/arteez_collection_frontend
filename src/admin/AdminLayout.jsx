import React, { useState } from 'react';
import { Link, Outlet, Navigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { isAuthenticated, user, authLoading } = useAuth();

    if (authLoading) {
        return <div className="text-center py-16">Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" />;
    }

    return (
        <div className="flex">
            {/* Sidebar */}
            <aside className={`bg-gray-800 text-white min-h-screen p-4 fixed md:relative w-64 md:w-64 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out z-30`}>
                <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
                <nav>
                    <ul>
                        <li className="mb-4">
                            <Link to="dresses" className="hover:text-gray-300" onClick={() => setIsSidebarOpen(false)}>Dresses</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="orders" className="hover:text-gray-300" onClick={() => setIsSidebarOpen(false)}>Orders</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="users" className="hover:text-gray-300" onClick={() => setIsSidebarOpen(false)}>Users</Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 md:ml-0">
                {/* Mobile Header */}
                <div className="md:hidden flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">Admin</h1>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
