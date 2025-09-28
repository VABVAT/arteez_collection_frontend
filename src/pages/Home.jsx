import React, { useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ProductDetailModal from "../components/ProductDetailModal.jsx";
import ProductCard from "../components/ProductCard.jsx";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"; // e.g. http://localhost:4000

const Home = () => {
    const { searchTerm, setSearchTerm } = useOutletContext();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ⬇️ New: products from backend
    const [products, setProducts] = useState([]);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState("");

    // normalize any backend shape to your UI shape
    const normalize = (item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        originalPrice: item.originalPrice ?? item.original_price ?? null,
        rating: item.rating ?? 0,
        reviews: item.reviews ?? 0,
        image: item.image ?? "",
        category: item.category ?? "suit", // fallback if backend doesn’t send category
        quantity: item.quantity ?? 10,
        sizes: item.sizes ?? ['S', 'M', 'L'],
        description: item.description ?? "",
    });

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                setLoading(true);
                setError("");
                const res = await fetch(`${API_BASE}/api/dresses`, {
                    headers: { 'Accept': 'application/json' }
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                if (!cancelled) setProducts(Array.isArray(data) ? data.map(normalize) : []);
            } catch (e) {
                if (!cancelled) setError("Failed to load products. Please try again.");
                console.error(e);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return () => { cancelled = true; };
    }, []);

    // filter as before, but using fetched products
    const filteredProducts = useMemo(() => {
        const term = searchTerm.toLowerCase();
        return products.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term)
        );
    }, [products, searchTerm]);

    const handleViewDetails = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            

            {/* Loading / Error */}
            {loading && (
                <div className="text-center py-16">
                    <p className="text-gray-600">Loading products…</p>
                </div>
            )}
            {!loading && error && (
                <div className="text-center py-8">
                    <p className="text-red-600">{error}</p>
                </div>
            )}

            {/* Search Results Info */}
            {!loading && !error && searchTerm && (
                <div className="mb-8">
                    <p className="text-lg text-gray-600">
                        {filteredProducts.length === 0
                            ? `No results found for "${searchTerm}"`
                            : `Showing ${filteredProducts.length} result${filteredProducts.length !== 1 ? 's' : ''} for "${searchTerm}"`}
                    </p>
                </div>
            )}

            {/* Product Grid */}
            {!loading && !error && (filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onViewDetails={handleViewDetails}
                        />
                    ))}
                </div>
            ) : searchTerm ? (
                <div className="text-center py-16">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-12 border border-white/30">
                        <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-semibold text-gray-600 mb-2">No products found</h3>
                        <p className="text-gray-500 mb-4">
                            Try searching for "dress", "suit", "formal", "casual", or browse all products
                        </p>
                        <button
                            onClick={() => setSearchTerm('')}
                            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-colors"
                        >
                            Clear Search
                        </button>
                    </div>
                </div>
            ) : null)}

            <ProductDetailModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </main>
    );
};

export default Home;
