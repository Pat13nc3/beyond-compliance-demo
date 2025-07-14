import React, { useState } from 'react';
import { X, Database, Key, Server } from 'lucide-react';

const AddDataSourceModal = ({ onClose, onAddSource }) => {
    const [sourceType, setSourceType] = useState('API');
    const [sourceName, setSourceName] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [serverAddress, setServerAddress] = useState('');

    const handleSubmit = () => {
        const newSource = {
            id: Date.now(), // Use timestamp for a unique ID
            name: sourceName,
            type: sourceType,
            status: 'Pending' // New sources are pending validation
        };
        onAddSource(newSource);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="bg-[#1e252d] rounded-2xl shadow-2xl p-6 w-full max-w-lg text-white">
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                    <h3 className="text-2xl font-bold text-[#c0933e]">Add New Data Source</h3>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Source Name</label>
                        <input
                            type="text"
                            value={sourceName}
                            onChange={(e) => setSourceName(e.target.value)}
                            placeholder="e.g., Plaid Banking Data"
                            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Source Type</label>
                        <select
                            value={sourceType}
                            onChange={(e) => setSourceType(e.target.value)}
                            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e]"
                        >
                            <option value="API">API</option>
                            <option value="SFTP">SFTP</option>
                            <option value="Database">Database</option>
                        </select>
                    </div>

                    {/* Dynamic fields based on source type */}
                    {sourceType === 'API' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">API Key</label>
                             <div className="relative">
                                <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20}/>
                                <input type="password" placeholder="Paste API Key here" className="w-full p-2 pl-10 border border-gray-600 rounded-md bg-gray-800 text-white"/>
                            </div>
                        </div>
                    )}
                    {sourceType === 'SFTP' && (
                         <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Server Address</label>
                             <div className="relative">
                                <Server className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20}/>
                                <input type="text" placeholder="sftp.example.com:22" className="w-full p-2 pl-10 border border-gray-600 rounded-md bg-gray-800 text-white"/>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex justify-end pt-6 mt-6 border-t border-gray-700">
                    <button type="button" onClick={onClose} className="bg-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 mr-2">
                        Cancel
                    </button>
                    <button type="button" onClick={handleSubmit} className="bg-[#c0933e] text-[#1e252d] font-bold py-2 px-4 rounded-md text-sm hover:bg-opacity-90">
                        Add Source
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddDataSourceModal;