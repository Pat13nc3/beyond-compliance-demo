// src/features/manage/modals/CreateEditPartnerModal.jsx

import React, { useState, useEffect } from 'react';
import { X, Save, Share2, Send } from 'lucide-react'; // Import Send icon

// Predefined list of data categories that can be shared
const availableDataCategories = [
    'KYC Records (Limited)',
    'Transaction Data (Filtered)',
    'Compliance Reports',
    'Audit Documentation',
    'Regulatory Updates',
    'Risk Assessment Reports',
];

const partnerTypes = ['Bank Partner', 'Legal Firm', 'Auditor', 'Technology Provider', 'Other'];
const partnerStatuses = ['Active', 'Inactive', 'Pending', 'Under Review'];

const CreateEditPartnerModal = ({ onClose, onSave, initialData = null }) => {
    const [name, setName] = useState(initialData?.name || '');
    const [type, setType] = useState(initialData?.type || partnerTypes[0]);
    const [status, setStatus] = useState(initialData?.status || partnerStatuses[0]);
    const [sharedData, setSharedData] = useState(initialData?.sharedData || []); // Array of selected shared data categories

    // Determine if we are in "edit" or "create" mode
    const isEditing = initialData?.id;

    // Effect to reset form or pre-fill when initialData changes
    useEffect(() => {
        if (initialData) {
            setName(initialData.name || '');
            setType(initialData.type || partnerTypes[0]);
            setStatus(initialData.status || partnerStatuses[0]);
            setSharedData(initialData.sharedData || []);
        } else {
            // Reset for new partner
            setName('');
            setType(partnerTypes[0]);
            setStatus(partnerStatuses[0]);
            setSharedData([]);
        }
    }, [initialData]);

    const handleSharedDataChange = (category) => {
        setSharedData(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category) // Remove if already selected
                : [...prev, category] // Add if not selected
        );
    };

    const handleSave = () => {
        if (!name.trim() || !type || !status) {
            alert('Please fill out partner name, type, and status.'); // Simple alert for validation
            return;
        }

        const partnerToSave = {
            id: initialData?.id || `PARTNER-${Date.now()}`,
            name: name.trim(),
            type,
            status,
            sharedData,
            lastActivity: initialData?.lastActivity || 'Never', // Preserve or default
        };

        onSave(partnerToSave);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="theme-bg-card rounded-2xl shadow-2xl p-6 w-full max-w-lg theme-text-primary">
                <div className="flex justify-between items-center mb-4 border-b theme-border-color pb-3">
                    <h3 className="text-2xl font-bold theme-text-highlight-color">
                        {isEditing ? 'Edit Partner' : 'Add New Partner'}
                    </h3>
                    <button onClick={onClose} className="p-1 rounded-full theme-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium theme-text-secondary mb-2">Partner Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., First National Bank"
                            className="w-full p-2 border theme-border-color rounded-md theme-bg-card theme-text-primary focus:ring-yellow-500 focus:border-yellow-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium theme-text-secondary mb-2">Partner Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full p-2 border theme-border-color rounded-md theme-bg-card theme-text-primary focus:ring-yellow-500 focus:border-yellow-500"
                        >
                            {partnerTypes.map(pType => (
                                <option key={pType} value={pType}>{pType}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium theme-text-secondary mb-2">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full p-2 border theme-border-color rounded-md theme-bg-card theme-text-primary focus:ring-yellow-500 focus:border-yellow-500"
                        >
                            {partnerStatuses.map(pStatus => (
                                <option key={pStatus} value={pStatus}>{pStatus}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium theme-text-secondary mb-2">Shared Data Categories</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-md max-h-48 overflow-y-auto custom-scrollbar">
                            {availableDataCategories.map(category => (
                                <label key={category} className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={sharedData.includes(category)}
                                        onChange={() => handleSharedDataChange(category)}
                                        className="h-4 w-4 text-blue-600 rounded border-gray-600 focus:ring-blue-500 bg-gray-900"
                                    />
                                    <span className="ml-2 text-sm theme-text-primary">{category}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end pt-6 mt-6 border-t theme-border-color">
                    <button type="button" onClick={onClose} className="bg-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 text-white mr-2">
                        Cancel
                    </button>
                    <button type="button" onClick={handleSave} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-blue-500 flex items-center">
                        {isEditing ? (
                            <>
                                <Save size={16} className="mr-2"/> Save Changes
                            </>
                        ) : (
                            <>
                                <Send size={16} className="mr-2"/> Send Invite
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateEditPartnerModal;