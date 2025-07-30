// src/features/manage/components/Integrations.jsx

import React from 'react';
import { Plus, Wifi, WifiOff, Info, Clock, CheckCircle, XCircle, Slash } from 'lucide-react'; // Added relevant icons

const IntegrationCard = ({ integration, onConnectToggle, onViewDetails, onAddIntegration }) => {
    const getStatusClasses = (status) => {
        switch (status) {
            case 'Active':
                return 'bg-green-700 text-green-200';
            case 'Inactive':
                return 'bg-gray-600 text-gray-300';
            case 'Pending':
                return 'bg-yellow-700 text-yellow-200';
            case 'Error':
                return 'bg-red-700 text-red-200';
            default:
                return 'bg-blue-700 text-blue-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Active': return <CheckCircle size={14} className="inline-block mr-1" />;
            case 'Inactive': return <Slash size={14} className="inline-block mr-1" />;
            case 'Pending': return <Clock size={14} className="inline-block mr-1" />;
            case 'Error': return <XCircle size={14} className="inline-block mr-1" />;
            default: return null;
        }
    };

    return (
        <div className="bg-gray-900 p-4 rounded-lg shadow-md flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-lg text-gray-100">{integration.name}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center ${getStatusClasses(integration.status)}`}>
                        {getStatusIcon(integration.status)} {integration.status}
                    </span>
                </div>
                <p className="text-sm text-gray-400 mb-2">{integration.type}</p>
                <p className="text-xs text-gray-500 line-clamp-2">{integration.description}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-700 text-xs text-gray-400">
                <p className="flex items-center mb-1">
                    <Clock size={12} className="mr-1" /> Last Sync: {integration.lastSync || 'N/A'}
                </p>
                <p className="flex items-center">
                    <CheckCircle size={12} className="mr-1" /> Data Quality: {integration.dataQuality || 'N/A'}%
                </p>
            </div>
            <div className="mt-4 flex space-x-2">
                <button
                    onClick={() => onConnectToggle(integration.id, integration.status)}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                        integration.status === 'Active' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                    } text-white flex items-center justify-center`}
                >
                    {integration.status === 'Active' ? <WifiOff size={16} className="mr-1"/> : <Wifi size={16} className="mr-1"/>}
                    {integration.status === 'Active' ? 'Disconnect' : 'Connect'}
                </button>
                <button
                    onClick={() => onViewDetails(integration)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md text-sm font-medium flex items-center justify-center"
                >
                    <Info size={16} className="mr-1"/> Details
                </button>
            </div>
        </div>
    );
};

// Integrations component receives integrations data and handlers from parent
const Integrations = ({ integrations, onConnectToggle, onViewDetails, onAddIntegration }) => {
    return (
        <div className="p-6 bg-[#1e252d] rounded-xl shadow-lg text-white">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-[#c0933e]">Platform Integrations</h3>
                <button
                    onClick={onAddIntegration} // This will trigger adding a new integration
                    className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center text-sm"
                >
                    <Plus size={16} className="mr-2" /> Add New Integration
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {integrations && integrations.length > 0 ? (
                    integrations.map(integration => (
                        <IntegrationCard
                            key={integration.id}
                            integration={integration}
                            onConnectToggle={onConnectToggle}
                            onViewDetails={onViewDetails}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-gray-400 text-center py-8">
                        No integrations configured yet. Click "Add New Integration" to get started.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Integrations;