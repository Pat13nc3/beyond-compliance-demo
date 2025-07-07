import React, { useState } from 'react';
import { X, ShieldCheck, Mail, Send, Check } from 'lucide-react';

// --- UPDATED: The modal now receives an onFileReport handler ---
const FilingModal = ({ report, onClose, onFileReport }) => {
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [isValidating, setIsValidating] = useState(false);
    const [validationPassed, setValidationPassed] = useState(false);

    const handleValidate = () => {
        setIsValidating(true);
        // Simulate a validation check
        setTimeout(() => {
            setValidationPassed(true);
            setIsValidating(false);
        }, 1500);
    };

    const handleFile = () => {
        if (!validationPassed || !selectedChannel) return;
        onFileReport({ reportId: report.id, channel: selectedChannel });
        onClose();
    };

    const filingChannels = [
        { id: 'email', name: 'Direct Email to Regulator', icon: Mail },
        { id: 'suptech', name: 'Regulator Suptech Platform', icon: Send },
        { id: 'beyond', name: 'Beyond Supervision API', icon: ShieldCheck },
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl text-gray-800">
                <div className="flex justify-between items-center mb-4 border-b pb-4">
                    <h2 className="text-2xl font-bold">File Report: {report.name}</h2>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-200"><X size={24} /></button>
                </div>

                <div className="space-y-6 mt-6">
                    {/* Step 1: Validation */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">1. Pre-Filing Validation</h3>
                        <div className={`p-4 rounded-lg flex items-center justify-between ${validationPassed ? 'bg-green-50' : 'bg-blue-50'}`}>
                            <div className="flex items-center">
                                <ShieldCheck className={`mr-3 ${validationPassed ? 'text-green-600' : 'text-blue-600'}`} />
                                <div>
                                    <p className="font-semibold">{validationPassed ? 'Validation Successful' : isValidating ? 'Validating...' : 'Ready to Validate'}</p>
                                    <p className="text-sm text-gray-600">{validationPassed ? 'Report aligns with all regulatory rules.' : 'Verify content against the rules engine.'}</p>
                                </div>
                            </div>
                            {!validationPassed && (
                                <button onClick={handleValidate} disabled={isValidating} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-blue-500 disabled:bg-gray-400">
                                    {isValidating ? 'Validating...' : 'Validate Now'}
                                </button>
                            )}
                            {validationPassed && <Check size={24} className="text-green-600" />}
                        </div>
                    </div>

                    {/* Step 2: Channel Selection */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">2. Select Filing Channel</h3>
                        <div className="space-y-2">
                            {filingChannels.map(channel => (
                                <div key={channel.id} onClick={() => setSelectedChannel(channel.id)} className={`p-4 border rounded-lg flex items-center cursor-pointer transition-all ${selectedChannel === channel.id ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-500' : 'border-gray-300 hover:border-gray-400'}`}>
                                    <channel.icon className="mr-4 text-gray-600" />
                                    <p className="font-medium">{channel.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end items-center pt-6 mt-6 border-t">
                    <button onClick={onClose} className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 mr-3">Cancel</button>
                    <button onClick={handleFile} className="bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={!validationPassed || !selectedChannel}>
                        File Report
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilingModal;