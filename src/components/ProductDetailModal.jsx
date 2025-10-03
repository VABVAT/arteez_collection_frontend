import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";

const ProductDetailModal = ({ product, isOpen, onClose }) => {
    const [selectedSize, setSelectedSize] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { addToCart, cart } = useCart();

    const images = product?.image ? product.image.split(',').filter(Boolean) : [];

    useEffect(() => {
        if (isOpen) {
            setSelectedSize(null);
            setCurrentImageIndex(0);
        }
    }, [isOpen]);

    if (!isOpen || !product) return null;

    const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL', 'XXXXXL'];

    const cartItem = cart.find(item => item.id === product.id && item.selectedSize === selectedSize);
    const availableQuantity = product.quantity - (cartItem ? cartItem.cartQuantity : 0);

    const handleAddToCart = () => {
        const productWithSingleImage = { ...product, image: images[0] };
        addToCart({ ...productWithSingleImage, selectedSize });
        onClose();
    };

    const handlePrevImage = () => {
        setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75">
            {/* Backdrop */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Modal */}
            <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors sm:top-6 sm:right-6"
                >
                    <X className="w-6 h-6 text-gray-700" />
                </button>

                <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Product Image Carousel */}
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                            {images.length > 0 ? (
                                <img
                                    src={images[currentImageIndex]}
                                    alt={`${product.name} ${currentImageIndex + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-500">
                                    <span>No Image</span>
                                </div>
                            )}

                            {images.length > 1 && (
                                <>
                                    <button onClick={handlePrevImage} className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 backdrop-blur-sm rounded-full p-2 z-10 transition-opacity">
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button onClick={handleNextImage} className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 backdrop-blur-sm rounded-full p-2 z-10 transition-opacity">
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                        {images.map((_, index) => (
                                            <div key={index} className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`} />
                                        ))}
                                    </div>
                                </>
                            )}
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
                                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
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
                                <a
                                    href={`https://wa.me/7340996140?text=Hi, I have a query about the dress: ${product.name}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-4 bg-green-500 text-white rounded-2xl text-lg font-semibold hover:bg-green-600 transition-colors shadow-lg text-center"
                                >
                                    Chat on WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailModal;
