import React from "react";
import { Star } from "lucide-react";

const ProductCard = ({ product, onViewDetails }) => {

    return (
        <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl">
            {/* Quantity Badge */}
            <div className="absolute top-4 left-4 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-full">
                {product.quantity} in stock
            </div>

            {/* Product Image */}
            <div className="aspect-square mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 cursor-pointer" onClick={() => onViewDetails(product)}>
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                    }}
                />
                <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-gray-500" style={{display: 'none'}}>
                    <span>Image Loading...</span>
                </div>
            </div>

            {/* Product Info */}
            <div className="space-y-2">
                <h3 className="font-semibold text-gray-800 line-clamp-2">{product.name}</h3>

                {/* Rating */}
                <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-4 h-4 ${i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                    ))}
                    <span className="text-sm text-gray-600">({product.reviews})</span>
                </div>

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
