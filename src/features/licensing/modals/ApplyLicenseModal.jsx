// src/features/licensing/modals/ApplyLicenseModal.jsx

import React, { useState, useEffect } from 'react';
import { X, Lightbulb, Save, Plus } from 'lucide-react';

const ApplyLicenseModal = ({ onClose, onApply, triggerAIAnalysis, mode = 'application', initialData = null }) => {
    const [jurisdiction, setJurisdiction] = useState(initialData?.jurisdiction || 'Nigeria (CBN)');
    const [licenseType, setLicenseType] = useState(initialData?.name || 'Payment Service Provider (PSP)');
    const [isAIAssisted, setIsAIAssisted] = useState(false);

    useEffect(() => {
        if (initialData) {
            setJurisdiction(initialData.jurisdiction);
            setLicenseType(initialData.name);
        } else {
            setJurisdiction('Nigeria (CBN)');
            setLicenseType('Payment Service Provider (PSP)');
        }
    }, [initialData]);

    const handleAIAssistClick = () => {
        if (triggerAIAnalysis) {
            triggerAIAnalysis({
                mode: mode,
                licenseType: licenseType,
                jurisdiction: jurisdiction,
            }, 'LicenseApplication');
            setIsAIAssisted(true);
        } else {
            console.error("triggerAIAnalysis prop is undefined in ApplyLicenseModal.");
        }
    };

    const handleSubmit = () => {
        const newApplication = {
            id: `LIC-${Date.now()}`,
            name: licenseType,
            jurisdiction: jurisdiction,
            regulator: jurisdiction.includes('CBN') ? 'CBN' : 'CMA',
            status: 'Application in Progress',
            expiry: 'N/A'
        };
        onApply(newApplication);
        onClose();
    };

    const modalTitle = mode === 'renewal' ? 'Renew Existing License' : 'Apply for New License';
    const buttonText = mode === 'renewal' ? 'Start Renewal' : 'Start Application';
    const buttonIcon = mode === 'renewal' ? <Lightbulb size={16} className="mr-2"/> : <Plus size={16} className="mr-2"/>;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="bg-[#1e252d] rounded-2xl shadow-2xl p-6 w-full max-w-lg text-white">
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                    <h3 className="text-2xl font-bold text-[#c0933e]">{modalTitle}</h3>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-4">
                    {mode === 'renewal' && (
                        <div className="p-4 bg-yellow-900/50 rounded-lg flex items-center text-yellow-300 border border-yellow-700">
                           <Lightbulb size={20} className="mr-3" />
                           <p className="text-sm">The AI has analyzed your current license details and is ready to assist with the renewal process.</p>
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Select Jurisdiction</label>
                        <select
                            value={jurisdiction}
                            onChange={(e) => setJurisdiction(e.target.value)}
                            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e]"
                            disabled={mode === 'renewal'}
                        >
                            <option>Nigeria (CBN)</option>
                            <option>Kenya (CMA)</option>
                            <option>Ghana (BOG)</option>
                            <option>South Africa (SARB)</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Select License Type</label>
                        <select
                            value={licenseType}
                            onChange={(e) => setLicenseType(e.target.value)}
                            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e]"
                            disabled={mode === 'renewal'}
                        >
                            <option>Payment Service Provider (PSP)</option>
                            <option>Digital Asset Service Provider (DASP)</option>
                            <option>Money Transmitter License</option>
                            <option>E-Money Issuer</option>
                        </select>
                    </div>
                    {!isAIAssisted && (
                        <p className="text-xs text-gray-400">
                            The platform will guide you through the requirements and necessary documentation for the selected license and jurisdiction.
                        </p>
                    )}
                </div>
                <div className="flex justify-between pt-6 mt-6 border-t border-gray-700">
                    <button
                        onClick={handleAIAssistClick}
                        className="bg-purple-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-purple-500 flex items-center"
                    >
                        <Lightbulb size={16} className="mr-2"/> AI Assist
                    </button>
                    <div className="flex items-center space-x-2">
                        <button type="button" onClick={onClose} className="bg-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 text-white mr-2">
                            Cancel
                        </button>
                        <button type="button" onClick={handleSubmit} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-blue-500 flex items-center">
                            {buttonIcon}
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplyLicenseModal;