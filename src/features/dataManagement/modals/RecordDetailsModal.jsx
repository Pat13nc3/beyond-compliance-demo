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
            case 'No Match':
                return 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100';
            case 'Pending':
            case 'In Review':
            case 'Potential Match':
            case 'Flagged':
            case 'Under Review':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100';
            case 'Rejected':
            case 'Failed':
            case 'Inactive':
            case 'Confirmed Hit':
                return 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    const renderActionButtons = () => {
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
        else if (record.type === 'Payment' && record.status === 'Failed') {
             return (
                <button onClick={() => onUpdateRecordStatus(record.id, 'Pending Review')} className="bg-yellow-600 text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-700 flex items-center">
                    <Clock size={16} className="mr-2" /> Mark for Review
                </button>
            );
        }

        return null;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in-up">
            <div className="theme-bg-card rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
                <div className="flex justify-between items-center p-5 border-b theme-border-color bg-gray-100 dark:bg-gray-700">
                    <h2 className="text-2xl font-bold theme-text-primary">Record Details: {record.type} - {record.description}</h2>
                    <button onClick={onClose} className="theme-text-secondary hover:theme-text-primary transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 theme-text-primary overflow-y-auto max-h-[70vh]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <p className="theme-text-secondary text-sm">Date:</p>
                            <p className="text-lg theme-text-primary">{record.date.toLocaleDateString()} {record.date.toLocaleTimeString()}</p>
                        </div>
                        <div>
                            <p className="theme-text-secondary text-sm">Source:</p>
                            <p className="text-lg theme-text-primary">{record.source}</p>
                        </div>
                        <div>
                            <p className="theme-text-secondary text-sm">Status:</p>
                            <span className={`px-3 py-1 rounded-full text-md font-semibold ${getStatusColorClass(record.status)}`}>
                                {record.status}
                            </span>
                        </div>
                        {record.value !== 'N/A' && (
                            <div>
                                <p className="theme-text-secondary text-sm">Value:</p>
                                <p className="text-lg theme-text-primary">{record.value}</p>
                            </div>
                        )}
                    </div>

                    <h3 className="text-xl font-semibold theme-text-primary mb-4 border-b theme-border-color pb-2">Additional Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        {record.details && Object.entries(record.details).map(([key, value]) => (
                            <div key={key}>
                                <p className="theme-text-secondary capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</p>
                                <p className="text-base theme-text-primary">
                                    {typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value)}
                                </p>
                            </div>
                        ))}
                        {!record.details && <p className="theme-text-secondary md:col-span-2">No additional details available.</p>}
                    </div>
                </div>

                <div className="flex justify-end p-5 border-t theme-border-color bg-gray-100 dark:bg-gray-700 space-x-3">
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