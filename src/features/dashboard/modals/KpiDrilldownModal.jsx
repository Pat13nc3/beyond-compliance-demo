// src/features/dashboard/modals/KpiDrilldownModal.jsx

import React from 'react';
import { X, TrendingUp, TrendingDown, Target, ShieldCheck, Database, FileText } from 'lucide-react';

const KpiDrilldownModal = ({ kpi, onClose, onNavigate }) => {
    if (!kpi) return null;

    const getStatusColor = (value, target, isKri = false) => {
        if (isKri) {
            // For KRI, lower is better. If value > target, it's bad.
            if (value > target) return 'text-red-500';
            if (value > target * 0.9) return 'text-yellow-500';
            return 'text-green-500';
        } else {
            // For KPI, higher is better. If value < target, it's bad.
            if (value < target * 0.8) return 'text-red-500';
            if (value < target) return 'text-yellow-500';
            return 'text-green-500';
        }
    };

    const getTrendIcon = (trend) => {
        if (trend === 'up') return <TrendingUp size={16} className="text-red-400" />;
        if (trend === 'down') return <TrendingDown size={16} className="text-green-400" />;
        return null;
    };

    const handleNavigateToDataManagement = (filters) => {
        if (onNavigate) {
            onNavigate('DataManagement', { initialTab: 'Detailed Records', detailedRecordsFilters: filters });
            onClose(); // Close the modal after navigation
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="theme-bg-card rounded-2xl shadow-2xl p-6 w-full max-w-2xl theme-text-primary max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center mb-4 border-b theme-border-color pb-3">
                    <h3 className="text-2xl font-bold theme-text-highlight-color flex items-center">
                        <Target size={24} className="mr-3 theme-text-secondary" /> KPI/KRI Details: {kpi.title}
                    </h3>
                    <button onClick={onClose} className="p-1 rounded-full theme-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 space-y-6">
                    {/* Current Value & Target */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 theme-bg-card-alt rounded-lg text-center">
                            <p className="text-sm theme-text-secondary">Current Value</p>
                            <p className={`text-4xl font-bold ${getStatusColor(kpi.value, kpi.target, kpi.type === 'KRI')}`}>
                                {kpi.value}{kpi.unit}
                            </p>
                        </div>
                        <div className="p-4 theme-bg-card-alt rounded-lg text-center">
                            <p className="text-sm theme-text-secondary">{kpi.type === 'KRI' ? 'Threshold' : 'Target'}</p>
                            <p className="text-4xl font-bold text-blue-500">
                                {kpi.target}{kpi.unit}
                            </p>
                        </div>
                    </div>

                    {/* Description and Trend */}
                    <div className="p-4 theme-bg-card-alt rounded-lg border theme-border-color">
                        <h4 className="text-lg font-semibold theme-text-primary mb-2">Description</h4>
                        <p className="text-sm theme-text-secondary">{kpi.description}</p>
                        {kpi.trend && (
                            <p className="text-sm theme-text-secondary flex items-center mt-2">
                                <span className="font-semibold mr-1">Trend:</span> {getTrendIcon(kpi.trend)} {kpi.trend}
                            </p>
                        )}
                    </div>

                    {/* Suggested Actions */}
                    <div className="p-4 theme-bg-card-alt rounded-lg border theme-border-color">
                        <h4 className="text-lg font-semibold theme-text-primary mb-2 flex items-center">
                            <ShieldCheck size={20} className="mr-2 text-green-400" /> Suggested Actions
                        </h4>
                        <ul className="list-disc list-inside text-sm theme-text-secondary space-y-2">
                            {kpi.suggestedActions?.length > 0 ? (
                                kpi.suggestedActions.map((action, index) => (
                                    <li key={index}>{action.text}
                                        {action.linkToDataManagement && (
                                            <button
                                                onClick={() => handleNavigateToDataManagement(action.dataFilters)}
                                                className="ml-2 text-blue-500 hover:underline flex items-center text-xs"
                                            >
                                                <Database size={14} className="mr-1" /> View Data
                                            </button>
                                        )}
                                        {action.linkToRulesEngine && (
                                            <button
                                                onClick={() => onNavigate('Manage', { initialTab: 'Rules Engine' })}
                                                className="ml-2 text-blue-500 hover:underline flex items-center text-xs"
                                            >
                                                <FileText size={14} className="mr-1" /> Go to Rules
                                            </button>
                                        )}
                                    </li>
                                ))
                            ) : (
                                <li>No specific actions suggested at this time.</li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t theme-border-color mt-6">
                    <button
                        onClick={onClose}
                        className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default KpiDrilldownModal;
