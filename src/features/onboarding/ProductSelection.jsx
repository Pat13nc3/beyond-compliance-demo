// src/onboarding/ProductSelection.jsx

import React, { useState } from 'react';

const ProductSelection = ({ onNext }) => {
    const [selectedProduct, setSelectedProduct] = useState('');

    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold theme-text-primary">Choose a Product</h2>
            <p className="theme-text-secondary">Select the product that best fits your needs.</p>

            <div className="grid grid-cols-1 gap-4">
                <button
                    onClick={() => handleSelectProduct('Beyond Compliance')}
                    className={`p-6 rounded-lg border-2 text-left transition-colors duration-200 ${selectedProduct === 'Beyond Compliance' ? 'border-blue-500 theme-bg-card-alt' : 'theme-border-color theme-bg-card'}`}
                >
                    <h3 className="font-bold text-lg theme-text-primary">Beyond Compliance</h3>
                    <p className="text-sm theme-text-secondary">Our flagship regulatory compliance and risk management platform.</p>
                </button>
                <button
                    onClick={() => handleSelectProduct('Beyond Sandbox')}
                    className={`p-6 rounded-lg border-2 text-left transition-colors duration-200 ${selectedProduct === 'Beyond Sandbox' ? 'border-blue-500 theme-bg-card-alt' : 'theme-border-color theme-bg-card'}`}
                >
                    <h3 className="font-bold text-lg theme-text-primary">Beyond Sandbox</h3>
                    <p className="text-sm theme-text-secondary">A test environment for new integrations and regulatory models.</p>
                </button>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={() => onNext({ product: selectedProduct })}
                    disabled={!selectedProduct}
                    className="px-6 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-500 disabled:bg-gray-600"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductSelection;
