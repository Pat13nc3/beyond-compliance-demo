// src/features/dashboard/modals/AddEntityModal.jsx

import React, { useState } from "react";
import { X, Save, Building2 } from "lucide-react";
import { productCategories } from "../../../data/mockData.js";  // Corrected path

const AddEntityModal = ({ onClose, onSave }) => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState('Active');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [jurisdiction, setJurisdiction] = useState('');

    const handleProductChange = (e) => {
        const { value, checked } = e.target;
        setSelectedProducts(prev =>
            checked ? [...prev, value] : prev.filter(p => p !== value)
        );
    };

    const handleSubmit = () => {
        if (!name.trim() || !location.trim() || !jurisdiction.trim() || selectedProducts.length === 0) {
            alert('Please fill out all required fields: Name, Location, Jurisdiction, and select at least one Product.');
            return;
        }

        const newEntity = {
            id: `sub-${Date.now()}`, // Generate a unique ID
            name: name.trim(),
            location: location.trim(),
            status: status,
            products: selectedProducts,
            jurisdiction: jurisdiction.trim(),
            // Add other default properties as needed
            complianceScore: Math.floor(Math.random() * 30) + 70, // Mock score
        };
        onSave(newEntity);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="theme-bg-card rounded-2xl shadow-2xl p-6 w-full max-w-lg theme-text-primary">
                <div className="flex justify-between items-center mb-4 border-b theme-border-color pb-3">
                    <h3 className="text-2xl font-bold theme-text-highlight-color flex items-center">
                        <Building2 size={24} className="mr-3 theme-text-secondary" /> Add New Entity
                    </h3>
                    <button onClick={onClose} className="p-1 rounded-full theme-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium theme-text-secondary mb-2">Entity Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., Innovate Kenya Ltd."
                            className="w-full p-2 border theme-border-color rounded-md theme-bg-card theme-text-primary focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium theme-text-secondary mb-2">Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="e.g., Nairobi, Kenya"
                            className="w-full p-2 border theme-border-color rounded-md theme-bg-card theme-text-primary focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium theme-text-secondary mb-2">Jurisdiction</label>
                        <input
                            type="text"
                            value={jurisdiction}
                            onChange={(e) => setJurisdiction(e.target.value)}
                            placeholder="e.g., Kenya"
                            className="w-full p-2 border theme-border-color rounded-md theme-bg-card theme-text-primary focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium theme-text-secondary mb-2">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full p-2 border theme-border-color rounded-md theme-bg-card theme-text-primary focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="Active">Active</option>
                            <option value="In Review">In Review</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium theme-text-secondary mb-2">Associated Products</label>
                        <div className="grid grid-cols-2 gap-2 p-3 theme-bg-card-alt rounded-md max-h-40 overflow-y-auto custom-scrollbar">
                            {productCategories.filter(p => p !== 'All Products').map(p => (
                                <label key={p} className="flex items-center text-sm theme-text-primary">
                                    <input
                                        type="checkbox"
                                        value={p}
                                        checked={selectedProducts.includes(p)}
                                        onChange={handleProductChange}
                                        className="h-4 w-4 text-blue-600 rounded border-gray-600 focus:ring-blue-500 bg-gray-900"
                                    />
                                    <span className="ml-2">{p}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end pt-6 mt-6 border-t theme-border-color">
                    <button type="button" onClick={onClose} className="bg-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 text-white mr-2">
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-blue-500 flex items-center"
                    >
                        <Save size={16} className="mr-2"/> Add Entity
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddEntityModal;