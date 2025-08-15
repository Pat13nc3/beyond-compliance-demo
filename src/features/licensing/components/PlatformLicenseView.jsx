// src/features/licensing/components/PlatformLicenseView.jsx

import React, { useState } from 'react';
import { Award, Eye, Plus } from 'lucide-react';

const mockLicenseOptions = [
    { id: 'psp-ng', name: 'Payment Service Provider License', regulator: 'CBN', service: 'Payment', purpose: 'Facilitate payment processing and transactions for businesses and individuals, including payment gateways and merchant services.', jurisdiction: 'Nigeria' },
    { id: 'mto-ng', name: 'Money Transfer Operator License', regulator: 'CBN', service: 'Remittance', purpose: 'Facilitate payment processing and transactions for businesses and individuals, including payment gateways and merchant services.', jurisdiction: 'Nigeria' },
    { id: 'cf-ng', name: 'Crowdfunding Platform License', regulator: 'CBN', service: 'Crowdfunding', purpose: 'Facilitate payment processing and transactions for businesses and individuals, including payment gateways and merchant services.', jurisdiction: 'Nigeria' },
    { id: 'mb-ng', name: 'Microfinance Bank License', regulator: 'CBN', service: 'Lending', purpose: 'Facilitate payment processing and transactions for businesses and individuals, including payment gateways and merchant services.', jurisdiction: 'Nigeria' },
    { id: 'inv-ke', name: 'Investment Advisory License', regulator: 'CMA', service: 'Investment Advisory', purpose: 'Facilitate payment processing and transactions for businesses and individuals, including payment gateways and merchant services.', jurisdiction: 'Kenya' },
    { id: 'dw-ke', name: 'Digital Wallet License', regulator: 'CMA', service: 'Crowdfunding', purpose: 'Facilitate payment processing and transactions for businesses and individuals, including payment gateways and merchant services.', jurisdiction: 'Kenya' },
];

const jurisdictions = ['All', 'Nigeria', 'Ghana', 'United States', 'Kenya', 'Sierra Leone', 'Brazil'];

const PlatformLicenseView = ({ onApply, onStartRenewal, onViewDetails }) => { // NEW: Added onViewDetails prop
    const [selectedJurisdiction, setSelectedJurisdiction] = useState('All');
    const [selectedRegulator, setSelectedRegulator] = useState('All');

    const filteredLicenses = mockLicenseOptions.filter(license => 
        selectedJurisdiction === 'All' || license.jurisdiction === selectedJurisdiction
    );
    
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold theme-text-primary">Available Platform Licenses</h3>
            <div className="flex flex-wrap gap-2 mb-4">
                {jurisdictions.map(j => (
                    <button
                        key={j}
                        onClick={() => setSelectedJurisdiction(j)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedJurisdiction === j ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                    >
                        {j}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLicenses.map(license => (
                    <div key={license.id} className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                        <div className="flex items-center mb-4">
                            <Award size={24} className="text-blue-500 mr-3" />
                            <h4 className="font-bold text-lg theme-text-primary">{license.name}</h4>
                        </div>
                        <p className="text-sm theme-text-secondary mb-4 line-clamp-3">{license.purpose}</p>
                        <div className="flex items-center justify-between text-xs theme-text-secondary mb-4">
                            <span>Regulator: <span className="font-semibold theme-text-primary">{license.regulator}</span></span>
                            <span>Service: <span className="font-semibold theme-text-primary">{license.service}</span></span>
                        </div>
                        <div className="flex space-x-2">
                            <button onClick={() => onViewDetails(license)} className="flex-1 py-2 px-3 rounded-md text-sm font-medium bg-gray-700 text-white hover:bg-gray-600 flex items-center justify-center">
                                <Eye size={16} className="mr-1"/> View Details
                            </button>
                            <button onClick={() => onApply(license)} className="flex-1 py-2 px-3 rounded-md text-sm font-bold bg-blue-600 text-white hover:bg-blue-500 flex items-center justify-center">
                                <Plus size={16} className="mr-1"/> License Application
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlatformLicenseView;