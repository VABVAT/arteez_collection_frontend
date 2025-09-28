import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const DressFormModal = ({ isOpen, onClose, onSave, dress }) => {
    const [formData, setFormData] = useState({});
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const { token } = useAuth();

    useEffect(() => {
        if (dress) {
            setFormData(dress);
        } else {
            setFormData({
                name: '',
                price: '',
                original_price: '',
                image: '',
                description: '',
                quantity: '',
                sizes: [],
            });
        }
        setUploadError('');
    }, [dress, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSizeChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prev => {
            const newSizes = checked
                ? [...prev.sizes, value]
                : prev.sizes.filter(size => size !== value);
            return { ...prev, sizes: newSizes };
        });
    };

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);
        setUploadError('');

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/uploadphoto`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!res.ok) {
                throw new Error('Photo upload failed');
            }

            const data = await res.json();
            setFormData(prev => ({ ...prev, image: data.url }));
        } catch (err) {
            setUploadError(err.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">{dress ? 'Edit Dress' : 'Add New Dress'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="name" value={formData.name || ''} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" required />
                    <input name="price" type="number" value={formData.price || ''} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" required />
                    <input name="original_price" type="number" value={formData.original_price || ''} onChange={handleChange} placeholder="Original Price" className="w-full p-2 border rounded" />
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Dress Image</label>
                        <input type="file" onChange={handlePhotoUpload} className="w-full p-2 border rounded mt-1" accept="image/*" />
                        {uploading && <p className="text-sm text-blue-500 mt-1">Uploading...</p>}
                        {uploadError && <p className="text-sm text-red-500 mt-1">{uploadError}</p>}
                        {formData.image && !uploading && (
                            <div className="mt-2">
                                <img src={formData.image} alt="Preview" className="w-32 h-32 object-cover rounded"/>
                                <p className="text-xs text-gray-500 mt-1">Image URL: {formData.image}</p>
                            </div>
                        )}
                    </div>

                    <textarea name="description" value={formData.description || ''} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" />
                    <input name="quantity" type="number" value={formData.quantity || ''} onChange={handleChange} placeholder="Quantity" className="w-full p-2 border rounded" required />
                    
                    <div>
                        <label className="block font-bold mb-2">Sizes</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                <label key={size} className="flex items-center space-x-2">
                                    <input type="checkbox" value={size} checked={formData.sizes?.includes(size)} onChange={handleSizeChange} />
                                    <span>{size}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300" disabled={uploading}>
                            {uploading ? 'Uploading...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DressFormModal;
