import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";

const ProductDetailModal = ({ product, isOpen, onClose }) => {
    const [selectedSize, setSelectedSize] = useState(null);
    const { addToCart, cart } = useCart();
    // const { toggleWishlist, isInWishlist } = useWishlist();

    useEffect(() => {
        if (isOpen) {
            setSelectedSize(null);
        }
    }, [isOpen]);

    if (!isOpen || !product) return null;

    const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    

    const cartItem = cart.find(item => item.id === product.id && item.selectedSize === selectedSize);
    const availableQuantity = product.quantity - (cartItem ? cartItem.cartQuantity : 0);

    const handleAddToCart = () => {
        addToCart({ ...product, selectedSize });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-colors sm:top-6 sm:right-6"
                >
                    <X className="w-6 h-6 text-gray-700" />
                </button>

                <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Product Image */}
                        <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-gray-500" style={{display: 'none'}}>
                                <span>Image Loading...</span>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h2>

                                

                                {/* Price */}
                                <div className="flex items-center space-x-3 mb-6">
                                    <span className="text-3xl font-bold text-purple-600">₹{product.price}</span>
                                    {product.originalPrice && (
                                        <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                                    )}
                                    {product.originalPrice && (
                                        <span className="px-3 py-1 bg-green-100 text-green-600 text-sm font-medium rounded-full">
                                            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {product.description || "Premium quality garment crafted with attention to detail. Perfect for both casual and formal occasions. Made with high-quality materials ensuring comfort and durability."}
                                </p>
                            </div>

                            {/* Size Selection */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Select Size</h3>
                                <div className="flex flex-wrap gap-2">
                                    {allSizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            disabled={!product.sizes.includes(size)}
                                            className={`px-4 py-2 rounded-lg border transition-colors ${
                                                selectedSize === size
                                                    ? 'bg-purple-500 text-white border-purple-500'
                                                    : 'bg-white/20 text-gray-700 border-white/30 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed'
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-2 pt-2">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={!selectedSize || availableQuantity <= 0}
                                    className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {availableQuantity <= 0 ? 'Out of Stock' : `Add to Cart`}
                                </button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailModal;
