// src/features/dataManagement/modals/EtlProcessDetailsModal.jsx

import React from 'react';
import { X, CheckCircle, AlertCircle, Clock, Server, Cpu, Layers } from 'lucide-react';

const EtlProcessDetailsModal = ({ etlProcess, onClose }) => {
    if (!etlProcess) return null;

    const getStatusIcon = (status) => {
        if (status === 'Completed') return <CheckCircle size={18} className="text-green-500 mr-2" />;
        if (status === 'Failed') return <AlertCircle size={18} className="text-red-500 mr-2" />;
        if (status === 'Running') return <Clock size={18} className="text-blue-500 mr-2" />;
        return <Clock size={18} className="theme-text-secondary mr-2" />;
    };

    const formatTimestamp = (isoString) => {
        if (!isoString) return 'N/A';
        const date = new Date(isoString);
        return date.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
    };

    const formatDuration = (ms) => {
        if (ms === undefined || ms === null) return 'N/A';
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    const getMethodIcon = (method) => {
        if (method.includes('AI-driven')) return <Cpu size={18} className="text-purple-400 mr-2" />;
        if (method.includes('Internal System')) return <Server size={18} className="text-teal-400 mr-2" />;
        if (method.includes('Hybrid')) return <Layers size={18} className="text-orange-400 mr-2" />;
        return null;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="theme-bg-card rounded-lg shadow-xl w-full max-w-3xl overflow-hidden animate-fade-in-up">
                <div className="flex justify-between items-center p-5 border-b theme-border-color bg-gray-700">
                    <h2 className="text-2xl font-bold theme-text-primary flex items-center">
                        {getStatusIcon(etlProcess.status)} {etlProcess.name} Details
                    </h2>
                    <button onClick={onClose} className="theme-text-secondary hover:theme-text-primary transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 theme-text-primary overflow-y-auto max-h-[80vh]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <p className="theme-text-secondary text-sm">Description:</p>
                            <p className="text-lg">{etlProcess.description}</p>
                        </div>
                        <div>
                            <p className="theme-text-secondary text-sm">Current Status:</p>
                            <div className="flex items-center text-lg">
                                {getStatusIcon(etlProcess.status)} {etlProcess.status}
                            </div>
                        </div>
                        <div>
                            <p className="theme-text-secondary text-sm">Last Run:</p>
                            <p className="text-lg">{formatTimestamp(etlProcess.lastRun)}</p>
                        </div>
                        <div>
                            <p className="theme-text-secondary text-sm">Transformation Method:</p>
                            <p className="text-lg flex items-center">
                                {getMethodIcon(etlProcess.transformationMethod)} {etlProcess.transformationMethod}
                            </p>
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold theme-text-primary mb-4 border-b theme-border-color pb-2">Run History</h3>
                    {etlProcess.runHistory && etlProcess.runHistory.length > 0 ? (
                        <div className="space-y-4">
                            {etlProcess.runHistory.map((run, index) => (
                                <div key={index} className="bg-gray-700 p-4 rounded-lg shadow-md border theme-border-color">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center text-md font-semibold">
                                            {getStatusIcon(run.status)} Run on {formatTimestamp(run.timestamp)}
                                        </div>
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                                            run.status === 'Completed' ? 'bg-green-700 text-green-200' :
                                            run.status === 'Failed' ? 'bg-red-700 text-red-200' :
                                            'bg-blue-700 text-blue-200'
                                        }`}>
                                            {run.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="text-sm theme-text-secondary grid grid-cols-2 gap-2">
                                        <p><strong>Records Processed:</strong> {run.recordsProcessed !== undefined ? run.recordsProcessed.toLocaleString() : 'N/A'}</p>
                                        <p><strong>Duration:</strong> {formatDuration(run.durationMs)}</p>
                                        <p className="col-span-2"><strong>Errors:</strong> {run.errors !== undefined ? run.errors : 'N/A'}</p>
                                        {run.log && <p className="col-span-2 theme-text-secondary italic text-xs">Log: {run.log}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="theme-text-secondary text-center">No run history available for this ETL process.</p>
                    )}
                </div>

                <div className="p-5 border-t theme-border-color bg-gray-700 flex justify-end">
                    <button onClick={onClose} className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EtlProcessDetailsModal;