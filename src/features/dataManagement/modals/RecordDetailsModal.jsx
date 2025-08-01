// src/features/dataManagement/modals/RecordDetailsModal.jsx

import React from 'react';
import { X, CheckCircle, XCircle, Clock, Save } from 'lucide-react';

const RecordDetailsModal = ({ record, onClose, onUpdateRecordStatus }) => {
    if (!record) return null;

    const getStatusColorClass = (status) => {
        switch (status) {
            case 'Approved':
            case 'Success':
            case 'Active':
            case 'No Match': // Added for Sanctions Check
                return 'bg-green-700 text-green-100';
            case 'Pending':
            case 'In Review':
            case 'Potential Match': // Added for Sanctions Check
            case 'Flagged': // Added for AML Alert
            case 'Under Review': // Added for AML Alert
                return 'bg-yellow-700 text-yellow-100';
            case 'Rejected':
            case 'Failed':
            case 'Inactive':
            case 'Confirmed Hit': // Added for Sanctions Check
                return 'bg-red-700 text-red-100';
            default:
                return 'bg-gray-700 text-gray-300';
        }
    };

    const renderActionButtons = () => {
        // KYC-specific actions
        if (record.type === 'KYC') {
            if (record.status === 'Pending' || record.status === 'Rejected') {
                return (
                    <>
                        <button onClick={() => onUpdateRecordStatus(record.id, 'Approved')} className="bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 flex items-center">
                            <CheckCircle size={16} className="mr-2" /> Approve KYC
                        </button>
                        <button onClick={() => onUpdateRecordStatus(record.id, 'Rejected')} className="bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 flex items-center">
                            <XCircle size={16} className="mr-2" /> Reject KYC
                        </button>
                    </>
                );
            }
        }
        // User-specific actions
        else if (record.type === 'User') {
            if (record.status === 'Active') {
                return (
                    <button onClick={() => onUpdateRecordStatus(record.id, 'Inactive')} className="bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 flex items-center">
                        <XCircle size={16} className="mr-2" /> Deactivate User
                    </button>
                );
            } else if (record.status === 'Inactive') {
                return (
                    <button onClick={() => onUpdateRecordStatus(record.id, 'Active')} className="bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 flex items-center">
                        <CheckCircle size={16} className="mr-2" /> Activate User
                    </button>
                );
            }
        }
        // Payment-specific actions (e.g., if a payment needs manual retry or review status)
        else if (record.type === 'Payment' && record.status === 'Failed') {
             return (
                <button onClick={() => onUpdateRecordStatus(record.id, 'Pending Review')} className="bg-yellow-600 text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-700 flex items-center">
                    <Clock size={16} className="mr-2" /> Mark for Review
                </button>
            );
        }

        // Generic "Save" or "Close" if no specific actions are needed
        return null; // No specific action buttons needed for this record state/type
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in-up">
            <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
                <div className="flex justify-between items-center p-5 border-b border-gray-700 bg-gray-700">
                    <h2 className="text-2xl font-bold text-gray-100">Record Details: {record.type} - {record.description}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-100 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 text-gray-200 overflow-y-auto max-h-[70vh]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <p className="text-gray-400 text-sm">Date:</p>
                            <p className="text-lg">{record.date.toLocaleDateString()} {record.date.toLocaleTimeString()}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Source:</p>
                            <p className="text-lg">{record.source}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Status:</p>
                            <span className={`px-3 py-1 rounded-full text-md font-semibold ${getStatusColorClass(record.status)}`}>
                                {record.status}
                            </span>
                        </div>
                        {record.value !== 'N/A' && (
                            <div>
                                <p className="text-gray-400 text-sm">Value:</p>
                                <p className="text-lg">{record.value}</p>
                            </div>
                        )}
                    </div>

                    <h3 className="text-xl font-semibold text-gray-200 mb-4 border-b border-gray-700 pb-2">Additional Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        {record.details && Object.entries(record.details).map(([key, value]) => (
                            <div key={key}>
                                <p className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</p>
                                {/* CORRECTED: Stringify object values before rendering */}
                                <p className="text-base">
                                    {typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value)}
                                </p>
                            </div>
                        ))}
                        {!record.details && <p className="text-gray-400 md:col-span-2">No additional details available.</p>}
                    </div>
                </div>

                <div className="flex justify-end p-5 border-t border-gray-700 bg-gray-700 space-x-3">
                    {renderActionButtons()}
                    <button onClick={onClose} className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecordDetailsModal;