import React, { useState } from 'react';
import { X } from 'lucide-react';

const ApplyLicenseModal = ({ onClose, onApply }) => {
    const [jurisdiction, setJurisdiction] = useState('Nigeria');
    const [licenseType, setLicenseType] = useState('Payment Service Provider (PSP)');

    const handleSubmit = () => {
        const newApplication = {
            id: `LIC-${Date.now()}`,
            name: licenseType,
            jurisdiction: jurisdiction,
            regulator: 'TBD', // This would be looked up in a real app
            status: 'Application in Progress',
            expiryDate: 'N/A'
        };
        onApply(newApplication);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="bg-[#1e252d] rounded-2xl shadow-2xl p-6 w-full max-w-lg text-white">
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                    <h3 className="text-2xl font-bold text-[#c0933e]">Apply for New License</h3>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Select Jurisdiction</label>
                        <select
                            value={jurisdiction}
                            onChange={(e) => setJurisdiction(e.target.value)}
                            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e]"
                        >
                            <option>Nigeria</option>
                            <option>Kenya</option>
                            <option>Ghana</option>
                             <option>South Africa</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Select License Type</label>
                        <select
                            value={licenseType}
                            onChange={(e) => setLicenseType(e.target.value)}
                            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e]"
                        >
                            <option>Payment Service Provider (PSP)</option>
                            <option>Digital Asset Service Provider (DASP)</option>
                            <option>Money Transmitter License</option>
                            <option>E-Money Issuer</option>
                        </select>
                    </div>
                    <p className="text-xs text-gray-400">The platform will guide you through the requirements and necessary documentation for the selected license and jurisdiction.</p>
                </div>
                <div className="flex justify-end pt-6 mt-6 border-t border-gray-700">
                    <button type="button" onClick={onClose} className="bg-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 mr-2">
                        Cancel
                    </button>
                    <button type="button" onClick={handleSubmit} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-blue-500">
                        Start Application
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApplyLicenseModal;