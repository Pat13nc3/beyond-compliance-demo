// src/features/riskAssessment/components/SystemAlertsTab.jsx

import React from 'react';
import { AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

const SystemAlertsTab = ({ alerts }) => {
    const getSeverityStyles = (severity) => {
        switch (severity) {
            case 'High':
                return 'bg-red-500/20 border-red-500 text-red-400';
            case 'Medium':
                return 'bg-yellow-500/20 border-yellow-500 text-yellow-400';
            case 'Low':
                return 'bg-green-500/20 border-green-500 text-green-400';
            default:
                return 'bg-gray-500/20 border-gray-500 text-gray-400';
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                <h3 className="text-xl font-semibold theme-text-primary mb-4 flex items-center">
                    <AlertTriangle size={20} className="mr-2 text-yellow-400" /> Alert Timeline
                </h3>
                <div className="space-y-4">
                    {alerts.map(alert => (
                        <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${getSeverityStyles(alert.severity)}`}>
                            <div className="flex items-center justify-between">
                                <p className="font-semibold text-lg">{alert.name}</p>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityStyles(alert.severity)}`}>{alert.severity}</span>
                            </div>
                            <p className="text-sm mt-1">{alert.details}</p>
                            <p className="text-xs text-right mt-2">{alert.date}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SystemAlertsTab;