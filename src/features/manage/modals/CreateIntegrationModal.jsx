// src/features/manage/modals/CreateIntegrationModal.jsx

import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

const CreateIntegrationModal = ({ onClose, onSave, initialData = null }) => {
    const [name, setName] = useState(initialData?.name || '');
    const [type, setType] = useState(initialData?.type || 'API'); // Default type
    const [description, setDescription] = useState(initialData?.description || '');
    const [status, setStatus] = useState(initialData?.status || 'Inactive');
    const [configuration, setConfiguration] = useState(JSON.stringify(initialData?.configuration || {}, null, 2)); // Stringify for textarea

    // Effect to reset form or pre-fill when initialData changes
    useEffect(() => {
        if (initialData) {
            setName(initialData.name || '');
            setType(initialData.type || 'API');
            setDescription(initialData.description || '');
            setStatus(initialData.status || 'Inactive');
            setConfiguration(JSON.stringify(initialData.configuration || {}, null, 2));
        } else {
            // Reset for new integration
            setName('');
            setType('API');
            setDescription('');
            setStatus('Inactive');
            setConfiguration('{}'); // Default empty JSON
        }
    }, [initialData]);

    const handleSave = () => {
        if (!name || !type) {
            alert('Please enter integration name and type.');
            return;
        }

        let parsedConfig = {};
        try {
            parsedConfig = JSON.parse(configuration);
        } catch (e) {
            alert('Invalid JSON in Configuration. Please correct it.');
            return;
        }

        const integrationToSave = {
            id: initialData?.id || `INT-${Date.now()}`,
            name,
            type,
            description,
            status,
            configuration: parsedConfig,
            lastSync: initialData?.lastSync || 'Never', // Preserve or default
            dataQuality: initialData?.dataQuality || 0, // Preserve or default
            recordsSynced: initialData?.recordsSynced || 0, // Preserve or default
            // You might want to pass linkedDataSources or manage them separately
            linkedDataSources: initialData?.linkedDataSources || [],
        };
        onSave(integrationToSave);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="bg-[#1e252d] rounded-2xl shadow-2xl p-6 w-full max-w-2xl text-white">
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                    <h3 className="text-2xl font-bold text-[#c0933e]">
                        {initialData?.id ? 'Edit Integration' : 'Add New Integration'}
                    </h3>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Integration Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., Stripe Payments API"
                            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Integration Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e]"
                        >
                            <option value="API">API</option>
                            <option value="Payment Gateway">Payment Gateway</option>
                            <option value="Blockchain Analytics">Blockchain Analytics</option>
                            <option value="CRM System">CRM System</option>
                            <option value="Regulatory Platform">Regulatory Platform (Suptech)</option>
                            <option value="Audit Management">Audit Management System</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Briefly describe this integration and its purpose."
                            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e] h-20"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e]"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Pending">Pending Setup</option>
                            <option value="Error">Error</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Configuration (JSON)</label>
                        <textarea
                            value={configuration}
                            onChange={(e) => setConfiguration(e.target.value)}
                            placeholder='e.g., {"apiKey": "your_key", "endpoint": "https://api.example.com"}'
                            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e] font-mono text-sm h-32 resize-y"
                        />
                        <p className="text-xs text-gray-500 mt-1">Enter configuration details as a JSON object.</p>
                    </div>
                </div>
                <div className="flex justify-end pt-6 mt-6 border-t border-gray-700">
                    <button type="button" onClick={onClose} className="bg-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 mr-2">
                        Cancel
                    </button>
                    <button type="button" onClick={handleSave} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-blue-500 flex items-center">
                        <Save size={16} className="mr-2"/> {initialData?.id ? 'Save Changes' : 'Add Integration'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateIntegrationModal;