import React, { useState } from "react";
import { Menu, Search, ShoppingCart, User, X, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

import { useAuth } from "../context/AuthContext.jsx";

const Header = ({ searchTerm, onSearchChange }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cart } = useCart();
    const { isAuthenticated, logout } = useAuth();

    const navLinks = (
        <>
            {isAuthenticated ? (
                <>
                    <Link to="/profile" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                    <Link to="/orders" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Orders</Link>
                    <button onClick={logout} className="block w-full text-left py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Login</Link>
                    <Link to="/register" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Register</Link>
                </>
            )}
        </>
    );

    return (
        <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-white/20 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            <Link to="/">Arteez collection</Link>
                        </h1>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Search */}
                        <button
                            className="p-2 rounded-lg hover:bg-white/20 transition-colors md:hidden" // Only show on mobile
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                        >
                            <Search className="w-5 h-5 text-gray-700" />
                        </button>

                        {/* Cart */}
                        <Link to="/cart" className="relative p-2 rounded-lg hover:bg-white/20 transition-colors">
                            <ShoppingCart className="w-5 h-5 text-gray-700" />
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {cart.length}
                                </span>
                            )}
                        </Link>

                        {/* Desktop User Actions */}
                        <div className="hidden md:flex items-center space-x-4">
                            {isAuthenticated ? (
                                <>
                                    <Link to="/profile" className="p-2 rounded-lg hover:bg-white/20 transition-colors">
                                        <User className="w-5 h-5 text-gray-700" />
                                    </Link>
                                    <Link to="/orders" className="p-2 rounded-lg hover:bg-white/20 transition-colors">
                                        <ShoppingBag className="w-5 h-5 text-gray-700" />
                                    </Link>
                                    <button onClick={logout} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white/20 rounded-lg hover:bg-white/30 border border-white/30">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white/20 rounded-lg hover:bg-white/30 border border-white/30">
                                        Login
                                    </Link>
                                    <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded-lg hover:bg-purple-600">
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <Menu className="w-6 h-6 text-gray-700" />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4">
                        {navLinks}
                    </div>
                )}

                {/* Search Bar */}
                {isSearchOpen && (
                    <div className="pb-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for suits, dresses..."
                                value={searchTerm}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="w-full px-4 py-2 pl-10 pr-4 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                            {searchTerm && (
                                <button
                                    onClick={() => onSearchChange('')}
                                    className="absolute right-3 top-2.5 p-1 hover:bg-white/20 rounded-full transition-colors"
                                >
                                    <X className="w-4 h-4 text-gray-500" />
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
