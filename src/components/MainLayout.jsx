import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Header from './Header';

const MainLayout = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex flex-col">
            {!isAdminRoute && <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />}
            <main className="flex-grow">
                <Outlet context={{ searchTerm, setSearchTerm }} />
            </main>
            {!isAdminRoute && (
                <footer className="bg-white/50 backdrop-blur-sm shadow-inner mt-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800">Shop</h3>
                            <ul className="space-y-2">
                                <li><Link to="/" className="text-gray-600 hover:text-purple-600">Home</Link></li>
                                <li><Link to="/cart" className="text-gray-600 hover:text-purple-600">Cart</Link></li>
                                <li><Link to="/orders" className="text-gray-600 hover:text-purple-600">My Orders</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800">Legal</h3>
                            <ul className="space-y-2">
                                <li><Link to="/terms-and-conditions" className="text-gray-600 hover:text-purple-600">Terms & Conditions</Link></li>
                                <li><Link to="/privacy" className="text-gray-600 hover:text-purple-600">Privacy Policy</Link></li>
                                <li><Link to="/cancellation-refund" className="text-gray-600 hover:text-purple-600">Cancellation & Refund</Link></li>
                                <li><Link to="/shipping" className="text-gray-600 hover:text-purple-600">Shipping Policy</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800">About</h3>
                            <ul className="space-y-2">
                                <li><Link to="/contact-us" className="text-gray-600 hover:text-purple-600">Contact Us</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800">Connect</h3>
                            <p className="text-gray-600">Follow us on social media for updates and promotions.</p>
                            {/* Social media icons can be added here */}
                        </div>
                    </div>
                    <div className="mt-8 border-t border-gray-200 pt-8 text-center">
                        <p className="text-gray-500">&copy; {new Date().getFullYear()} arteez collection. All rights reserved.</p>
                    </div>
                </footer>
            )}
        </div>
    );
};

export default MainLayout;
