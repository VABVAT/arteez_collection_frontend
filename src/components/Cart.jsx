import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';

const Cart = () => {
    const { cart, removeFromCart, clearCart } = useCart();

    const total = cart.reduce((acc, item) => acc + item.price * item.cartQuantity, 0);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Your Shopping Cart</h1>

            {cart.length === 0 ? (
                <div className="text-center py-16 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
                    <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
                    <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
                    <Link
                        to="/"
                        className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-colors shadow-lg"
                    >
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
                    {/* Order Summary (Mobile) */}
                    <div className="lg:hidden bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 h-fit mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-medium">₹{total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Shipping</span>
                                <span className="font-medium">Free</span>
                            </div>
                            <div className="border-t border-white/30 my-3"></div>
                            <div className="flex justify-between text-xl font-bold">
                                <span className="text-gray-800">Total</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                        </div>
                        <Link to="/checkout" className="block text-center w-full mt-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-colors shadow-lg">
                            Proceed to Checkout
                        </Link>
                        <button
                            onClick={clearCart}
                            className="w-full mt-3 py-3 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium text-gray-700 hover:bg-white/30 transition-colors border border-white/30"
                        >
                            Clear Cart
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map(item => (
                            <div key={`${item.id}-${item.selectedSize}`} className="flex flex-col sm:flex-row items-start sm:items-center bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                                <img src={item.image} alt={item.name} className="w-full sm:w-24 h-auto sm:h-24 object-cover rounded-lg mr-0 sm:mr-4 mb-4 sm:mb-0" />
                                <div className="flex-grow">
                                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                    <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
                                    <p className="text-lg font-bold text-purple-600">₹{item.price}</p>
                                    <p className="text-sm text-gray-500">{item.quantity} in stock</p>
                                </div>
                                <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                                    <span className="px-4 py-2 bg-white/20 rounded-lg border border-white/30 font-medium">
                                        Quantity: 1
                                    </span>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id, item.selectedSize)}
                                    className="ml-0 sm:ml-6 mt-4 sm:mt-0 p-2 text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary (Desktop) */}
                    <div className="hidden lg:block bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 h-fit">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-medium">₹{total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Shipping</span>
                                <span className="font-medium">Free</span>
                            </div>
                            <div className="border-t border-white/30 my-3"></div>
                            <div className="flex justify-between text-xl font-bold">
                                <span className="text-gray-800">Total</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                        </div>
                        <Link to="/checkout" className="block text-center w-full mt-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-colors shadow-lg">
                            Proceed to Checkout
                        </Link>
                        <button
                            onClick={clearCart}
                            className="w-full mt-3 py-3 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium text-gray-700 hover:bg-white/30 transition-colors border border-white/30"
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
