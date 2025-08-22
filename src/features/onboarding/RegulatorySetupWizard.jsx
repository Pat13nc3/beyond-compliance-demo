// src/features/onboarding/RegulatorySetupWizard.jsx

import React, { useState, useEffect } from 'react';
import { mockRegulatorySections, mockTemplates, mockRegulators } from '../../data/mockData.js';


const RegulatorySetupWizard = ({ onComplete, onboardingData }) => {
    // Corrected: Dynamically create the list of jurisdictions from mockRegulators
    const allJurisdictions = Object.keys(mockRegulators);
    const jurisdictions = allJurisdictions.includes('Global') ? allJurisdictions : ['Global', ...allJurisdictions];

    const [selectedJurisdiction, setSelectedJurisdiction] = useState(onboardingData.jurisdiction || 'Nigeria');

    // FIX: Robust initialization for selectedRegulator
    const [selectedRegulator, setSelectedRegulator] = useState(() => {
        const defaultJurisdiction = onboardingData.jurisdiction || 'Nigeria';
        const regulatorsForDefaultJurisdiction = mockRegulators[defaultJurisdiction] || [];
        return onboardingData.regulator || regulatorsForDefaultJurisdiction[0] || '';
    });

    const [productName, setProductName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Ensure selectedJurisdiction is a valid key before accessing mockRegulators
        const currentRegulators = mockRegulators[selectedJurisdiction] || [];
        const firstRegulator = currentRegulators[0];
        setSelectedRegulator(firstRegulator || '');
    }, [selectedJurisdiction]);

    const handleConfigure = () => {
        setIsLoading(true);
        // Simulate API call or complex logic
        setTimeout(() => {
            const setupConfig = {
                productName,
                jurisdiction: selectedJurisdiction,
                regulator: selectedRegulator,
                // Additional configurations can be added here
            };
            onComplete(setupConfig);
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div className="space-y-6 flex flex-col h-full theme-text-primary">
            <h2 className="text-xl font-bold">Regulatory Framework Configuration</h2>
            <p className="text-gray-400">Select a jurisdiction and regulator to auto-configure your platform with relevant rules and documents.</p>

            <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300">Jurisdiction</label>
                    <select
                        value={selectedJurisdiction}
                        onChange={(e) => setSelectedJurisdiction(e.target.value)}
                        className="mt-1 w-full p-2 rounded-md bg-gray-700 border border-gray-600 theme-text-primary"
                    >
                        {jurisdictions.map(j => <option key={j} value={j}>{j}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300">Regulator</label>
                    <select
                        value={selectedRegulator}
                        onChange={(e) => setSelectedRegulator(e.target.value)}
                        className="mt-1 w-full p-2 rounded-md bg-gray-700 border border-gray-600 theme-text-primary"
                    >
                        {mockRegulators[selectedJurisdiction]?.length > 0 ? (
                            mockRegulators[selectedJurisdiction].map(reg => (
                                <option key={reg} value={reg}>{reg}</option>
                            ))
                        ) : (
                            <option value="">No regulators for this jurisdiction</option>
                        )}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300">Product Name</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="e.g., PSP Payments"
                        className="mt-1 w-full p-2 rounded-md bg-gray-700 border border-gray-600 theme-text-primary"
                    />
                </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-700">
                <button
                    onClick={handleConfigure}
                    disabled={!productName || isLoading}
                    className="px-6 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-500 disabled:bg-gray-600"
                >
                    {isLoading ? 'Configuring...' : 'Configure'}
                </button>
            </div>
        </div>
    );
};

export default RegulatorySetupWizard;
