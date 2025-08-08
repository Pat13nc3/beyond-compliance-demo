// src/features/dataManagement/modals/AuditLogModal.jsx

import React from 'react';
import { X } from 'lucide-react';

const AuditLogModal = ({ source, onClose }) => {
    if (!source) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="theme-bg-card rounded-lg shadow-xl p-8 w-full max-w-4xl theme-text-primary animate-fade-in-up">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Audit Trail: <span className="text-yellow-400">{source.name}</span></h2>
                    <button onClick={onClose} className="theme-text-secondary hover:theme-text-primary"><X size={24} /></button>
                </div>
                <div className="overflow-y-auto max-h-[60vh]">
                    <table className="w-full text-sm text-left theme-text-secondary">
                        <thead className="text-xs text-yellow-400 uppercase bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3">Timestamp</th>
                                <th scope="col" className="px-6 py-3">Event</th>
                                <th scope="col" className="px-6 py-3">Triggered By</th>
                                <th scope="col" className="px-6 py-3">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {source.logHistory.map((log, index) => (
                                <tr key={index} className="bg-gray-800 border-b theme-border-color hover:bg-gray-600">
                                    <td className="px-6 py-4">{log.timestamp}</td>
                                    <td className="px-6 py-4">{log.event}</td>
                                    <td className="px-6 py-4">{log.triggeredBy}</td>
                                    <td className="px-6 py-4">{log.details}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AuditLogModal;