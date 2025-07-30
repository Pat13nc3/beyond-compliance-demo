// src/features/settings/components/SystemConfigView.jsx

import React, { useState, useEffect } from 'react';
import { Save, AlertCircle } from 'lucide-react';

const SystemConfigView = ({ onSaveConfig }) => { // onSaveConfig will be passed from Settings/index.jsx
    // State for example system parameters
    const [defaultCurrency, setDefaultCurrency] = useState('USD');
    const [dataRetentionDays, setDataRetentionDays] = useState(365);
    const [auditLogRetentionDays, setAuditLogRetentionDays] = useState(180);
    const [enableAiRecommendations, setEnableAiRecommendations] = useState(true);

    // In a real application, these would be loaded from a backend
    // For now, simulating 'loading' initial config if it were passed as a prop
    // useEffect(() => {
    //     if (initialConfig) {
    //         setDefaultCurrency(initialConfig.defaultCurrency || 'USD');
    //         setDataRetentionDays(initialConfig.dataRetentionDays || 365);
    //         setAuditLogRetentionDays(initialConfig.auditLogRetentionDays || 180);
    //         setEnableAiRecommendations(initialConfig.enableAiRecommendations || false);
    //     }
    // }, [initialConfig]);

    const handleSave = () => {
        // Basic validation
        if (dataRetentionDays <= 0 || auditLogRetentionDays <= 0) {
            alert('Retention days must be positive numbers.'); // Use alert for simplicity, could be a toast
            return;
        }

        const configToSave = {
            defaultCurrency,
            dataRetentionDays: parseInt(dataRetentionDays, 10),
            auditLogRetentionDays: parseInt(auditLogRetentionDays, 10),
            enableAiRecommendations,
        };

        onSaveConfig(configToSave); // Call parent's save handler
        // In a real app, this would send to backend and then refresh state
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white space-y-6">
            <h3 className="text-xl font-semibold text-[#c0933e] mb-4">General System Parameters</h3>

            {/* Default Currency */}
            <div>
                <label htmlFor="defaultCurrency" className="block text-sm font-medium text-gray-300 mb-2">Default Reporting Currency</label>
                <select
                    id="defaultCurrency"
                    value={defaultCurrency}
                    onChange={(e) => setDefaultCurrency(e.target.value)}
                    className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="NGN">NGN - Nigerian Naira</option>
                    <option value="KES">KES - Kenyan Shilling</option>
                </select>
                <p className="mt-1 text-xs text-gray-400">This currency will be used for all financial reporting unless specified otherwise.</p>
            </div>

            {/* Data Retention Period */}
            <div>
                <label htmlFor="dataRetentionDays" className="block text-sm font-medium text-gray-300 mb-2">Data Retention Period (Days)</label>
                <input
                    type="number"
                    id="dataRetentionDays"
                    value={dataRetentionDays}
                    onChange={(e) => setDataRetentionDays(e.target.value)}
                    min="1"
                    className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-xs text-gray-400">Data older than this period will be archived or purged.</p>
            </div>

            {/* Audit Log Retention Period */}
            <div>
                <label htmlFor="auditLogRetentionDays" className="block text-sm font-medium text-gray-300 mb-2">Audit Log Retention Period (Days)</label>
                <input
                    type="number"
                    id="auditLogRetentionDays"
                    value={auditLogRetentionDays}
                    onChange={(e) => setAuditLogRetentionDays(e.target.value)}
                    min="1"
                    className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-xs text-gray-400">Audit trails and user activity logs will be retained for this period.</p>
            </div>

            {/* Enable AI Recommendations Toggle */}
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-md">
                <div className="flex items-center">
                    <AlertCircle size={20} className="mr-3 text-yellow-400" />
                    <div>
                        <span className="text-sm font-medium text-gray-200">Enable AI Recommendations</span>
                        <p className="text-xs text-gray-400">Allow the system to provide AI-powered insights and task recommendations.</p>
                    </div>
                </div>
                <label htmlFor="aiToggle" className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        id="aiToggle"
                        className="sr-only peer"
                        checked={enableAiRecommendations}
                        onChange={() => setEnableAiRecommendations(!enableAiRecommendations)}
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4 border-t border-gray-700">
                <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-blue-500 flex items-center"
                >
                    <Save size={16} className="mr-2"/> Save Configuration
                </button>
            </div>
        </div>
    );
};

export default SystemConfigView;