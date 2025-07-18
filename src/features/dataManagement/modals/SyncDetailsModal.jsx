// src/features/dataManagement/modals/SyncDetailsModal.jsx

import React from 'react';
import { X, CheckCircle } from 'lucide-react';

const SyncDetailsModal = ({ syncDetails, onClose }) => {
    if (!syncDetails) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 animate-fade-in">
            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-6 w-full max-w-2xl text-white">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold flex items-center">
                        <CheckCircle size={22} className="mr-3 text-green-400" />
                        Sync Successful
                    </h3>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-700">
                        <X size={24} />
                    </button>
                </div>

                {/* Sync Summary */}
                <p className="text-gray-300 mb-4">
                    Successfully ingested <span className="font-bold text-yellow-400">{syncDetails.recordCount}</span> records from <span className="font-bold text-blue-400">{syncDetails.sourceName}</span>.
                </p>

                {/* Data Preview Table */}
                <div className="overflow-y-auto max-h-80 rounded-lg border border-gray-700">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-900 sticky top-0">
                            <tr>
                                {syncDetails.headers.map(header => (
                                    <th key={header} className="p-3 text-left font-medium text-gray-300">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800">
                            {syncDetails.previewRows.map((row, index) => (
                                <tr key={index} className="border-t border-gray-700">
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex} className="p-3 text-gray-400 whitespace-nowrap">{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                 <div className="flex justify-end pt-6">
                    <button onClick={onClose} className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SyncDetailsModal;