import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const DressFormModal = ({ isOpen, onClose, onSave, dress }) => {
    const [formData, setFormData] = useState({});
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const { token } = useAuth();

    useEffect(() => {
        if (dress) {
            setFormData({
                ...dress,
                images: dress.image ? dress.image.split(',').filter(Boolean) : [],
            });
        } else {
            const storedImages = JSON.parse(localStorage.getItem('newDressImages') || '[]');
            setFormData({
                name: '',
                price: '',
                original_price: '',
                images: storedImages,
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
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setUploading(true);
        setUploadError('');

        const newUrls = [];
        for (const file of files) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/uploadphoto`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formData,
                });

                if (!res.ok) {
                    throw new Error(`Upload failed for ${file.name}`);
                }

                const data = await res.json();
                newUrls.push(data.url);
            } catch (err) {
                setUploadError(err.message);
                // Stop further uploads if one fails
                break;
            }
        }

        if (newUrls.length > 0) {
            const updatedImages = [...(formData.images || []), ...newUrls];
            setFormData(prev => ({ ...prev, images: updatedImages }));

            if (!dress) {
                localStorage.setItem('newDressImages', JSON.stringify(updatedImages));
            }
        }

        setUploading(false);
    };

    const handleSave = (e) => {
        e.preventDefault();
        const dataToSave = {
            ...formData,
            image: (formData.images || []).join(','),
        };
        delete dataToSave.images;
        
        onSave(dataToSave);
        localStorage.removeItem('newDressImages');
    };

    const handleClose = () => {
        onClose();
        if (!dress) {
            localStorage.removeItem('newDressImages');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75">
            <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">{dress ? 'Edit Dress' : 'Add New Dress'}</h2>
                <form onSubmit={handleSave} className="space-y-4">
                    <input name="name" value={formData.name || ''} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" required />
                    <input name="price" type="number" value={formData.price || ''} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" required />
                    <input name="original_price" type="number" value={formData.original_price || ''} onChange={handleChange} placeholder="Original Price" className="w-full p-2 border rounded" />
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Dress Images</label>
                        <input type="file" onChange={handlePhotoUpload} className="w-full p-2 border rounded mt-1" accept="image/*" multiple />
                        {uploading && <p className="text-sm text-blue-500 mt-1">Uploading...</p>}
                        {uploadError && <p className="text-sm text-red-500 mt-1">{uploadError}</p>}
                        
                        <div className="mt-2 flex flex-wrap gap-2">
                            {(formData.images || []).map((image, index) => (
                                <div key={index} className="relative">
                                    <img src={image} alt={`Preview ${index + 1}`} className="w-24 h-24 object-cover rounded"/>
                                </div>
                            ))}
                        </div>
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
                        <button type="button" onClick={handleClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
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