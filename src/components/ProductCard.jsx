import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductCard = ({ product, onViewDetails }) => {
    const images = product.image ? product.image.split(',').filter(Boolean) : [];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePrevImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNextImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-black hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl">
            {/* Quantity Badge */}
            <div className="absolute top-4 left-4 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                {product.quantity} in stock
            </div>

            {/* Product Image Carousel */}
            <div className="relative aspect-square mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200" onClick={() => onViewDetails(product)}>
                {images.length > 0 ? (
                    <img
                        src={images[currentImageIndex]}
                        alt={`${product.name} ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-gray-500">
                        <span>No Image</span>
                    </div>
                )}

                {images.length > 1 && (
                    <>
                        <button onClick={handlePrevImage} className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/50 backdrop-blur-sm rounded-full p-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button onClick={handleNextImage} className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/50 backdrop-blur-sm rounded-full p-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </>
                )}
            </div>

            {/* Product Info */}
            <div className="space-y-2">
                <h3 className="font-semibold text-gray-800 line-clamp-2">{product.name}</h3>

                {/* Price */}
                <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-purple-600">₹{product.price}</span>
                    {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                    <button
                        onClick={() => onViewDetails(product)}
                        className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-colors shadow-lg"
                    >
                        View Options
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
