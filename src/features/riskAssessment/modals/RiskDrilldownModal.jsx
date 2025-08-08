// src/features/riskAssessment/modals/RiskDrilldownModal.jsx

import React from 'react';
import { X } from 'lucide-react';

const RiskDrilldownModal = ({ riskPillar, onClose }) => {
    // UPDATED: Added mock data for all risk pillars to ensure the modal is never empty.
    const drilldownData = {
        'Compliance Risk': [
            { id: 'M-01', metric: 'Overdue KYC Verifications', value: '15', status: 'High' },
            { id: 'M-02', metric: 'Failed Transaction Monitoring Rules', value: '8', status: 'High' },
            { id: 'M-03', metric: 'Regulatory Reporting Accuracy', value: '98%', status: 'Low' },
        ],
        'Credit Risk': [
             { id: 'M-04', metric: 'Non-Performing Loan Ratio', value: '2.5%', status: 'Medium' },
             { id: 'M-05', metric: 'Portfolio Concentration', value: 'Sub-sector A - 35%', status: 'High' },
        ],
        'Market Risk': [
             { id: 'M-06', metric: 'Foreign Exchange Volatility', value: 'High', status: 'Medium' },
             { id: 'M-07', metric: 'Interest Rate Sensitivity', value: 'Low', status: 'Low' },
        ],
        'Operational Risk': [
             { id: 'M-08', metric: 'System Downtime Incidents', value: '2 (Last 30d)', status: 'Low' },
             { id: 'M-09', metric: 'Successful Phishing Attempts', value: '0', status: 'Low' },
        ],
        'Governance Risk': [
             { id: 'M-10', metric: 'Board Meeting Attendance', value: '95%', status: 'Low' },
             { id: 'M-11', metric: 'Policy Exception Rate', value: '3%', status: 'Medium' },
        ]
    };

    const data = drilldownData[riskPillar.name] || [];

    const statusColors = {
        'High': 'bg-red-500',
        'Medium': 'bg-yellow-500',
        'Low': 'bg-green-500'
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="theme-bg-card rounded-2xl shadow-2xl p-6 w-full max-w-2xl theme-text-primary">
                <div className="flex justify-between items-center mb-4 border-b theme-border-color pb-3">
                    <h3 className="text-2xl font-bold theme-text-highlight-color">Drill-Down: {riskPillar.name}</h3>
                    <button onClick={onClose} className="p-1 rounded-full theme-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b theme-border-color">
                                <th className="text-left py-3 px-4 text-sm font-medium uppercase theme-text-secondary">Metric ID</th>
                                <th className="text-left py-3 px-4 text-sm font-medium uppercase theme-text-secondary">Metric Name</th>
                                <th className="text-left py-3 px-4 text-sm font-medium uppercase theme-text-secondary">Value</th>
                                <th className="text-left py-3 px-4 text-sm font-medium uppercase theme-text-secondary">Risk Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(metric => (
                                <tr key={metric.id} className="border-b theme-border-color hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="py-3 px-4 theme-text-secondary">{metric.id}</td>
                                    <td className="py-3 px-4 font-semibold theme-text-primary">{metric.metric}</td>
                                    <td className="py-3 px-4 theme-text-primary">{metric.value}</td>
                                    <td className="py-3 px-4">
                                        <span className={`text-xs font-semibold px-2 py-1 rounded-full text-white ${statusColors[metric.status]}`}>
                                            {metric.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                             {data.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center py-8 theme-text-secondary">No detailed metrics available for this category.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RiskDrilldownModal;