// src/features/complianceFrameworks/modals/LinkFrameworkModal.jsx
import React, { useState } from 'react';
import { X, Link2 } from 'lucide-react';
import { mockProjects } from '../../../data/mockData';

const LinkFrameworkModal = ({ framework, onClose }) => {
    const [selectedProducts, setSelectedProducts] = useState(framework?.linkedProducts || []);

    const handleProductChange = (e) => {
        const { value, checked } = e.target;
        setSelectedProducts(prev => 
            checked ? [...prev, value] : prev.filter(p => p !== value)
        );
    };

    const handleSave = () => {
        alert(`Linking framework "${framework.name}" to products: ${selectedProducts.join(', ')}`);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="theme-bg-card rounded-2xl shadow-2xl p-6 w-full max-w-lg theme-text-primary">
                <div className="flex justify-between items-center mb-4 border-b theme-border-color pb-3">
                    <h3 className="text-2xl font-bold theme-text-highlight-color">Link Framework: {framework?.name}</h3>
                    <button onClick={onClose} className="p-1 rounded-full theme-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-4">
                    <p className="text-sm theme-text-secondary">Select the products or projects you want to link this framework to.</p>
                    <div className="grid grid-cols-2 gap-2 p-3 theme-bg-card-alt rounded-md max-h-40 overflow-y-auto">
                        {mockProjects.map(p => (
                            <label key={p.id} className="flex items-center text-sm theme-text-primary">
                                <input
                                    type="checkbox"
                                    value={p.name}
                                    checked={selectedProducts.includes(p.name)}
                                    onChange={handleProductChange}
                                    className="h-4 w-4 text-blue-600 rounded"
                                />
                                <span className="ml-2">{p.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex justify-end pt-6 mt-6 border-t theme-border-color">
                    <button type="button" onClick={onClose} className="bg-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 text-white mr-2">
                        Cancel
                    </button>
                    <button type="button" onClick={handleSave} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-blue-500 flex items-center">
                        <Link2 size={16} className="mr-2"/> Save Links
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LinkFrameworkModal;