// src/features/riskAssessment/components/KpiCard.jsx

import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import Tooltip from '../../../components/ui/Tooltip.jsx';
import { mockIndicators } from '../data/mockIndicators.js'; // The new centralized data source

const KpiCard = ({ title, value, unit, indicatorId, isGoodCondition = true, onClick }) => {
    const indicator = mockIndicators.find(ind => ind.id === indicatorId);

    const getTooltipContent = () => {
        if (!indicator) return <div className="p-2 text-sm text-theme-text-primary">No detailed indicator data available.</div>;

        const isKri = indicator.type === 'KRI';
        let statusText;
        let statusIcon;
        let statusColorClass;
        
        // Dynamically determine status based on value vs. target
        if (isGoodCondition) {
            statusText = isKri ? 'In Compliance' : 'On Track';
            statusIcon = <CheckCircle size={16} className="text-green-400 mr-2" />;
            statusColorClass = 'text-green-400';
        } else {
            statusText = isKri ? 'Breached' : 'Needs Attention';
            statusIcon = <XCircle size={16} className="text-red-400 mr-2" />;
            statusColorClass = 'text-red-400';
        }

        return (
            <div className="p-2 space-y-2">
                <p className="font-bold text-lg text-theme-accent">{indicator.name} ({indicator.type})</p>
                <div className="pt-2 border-t border-theme-border">
                    <p className="text-sm"><strong>Description:</strong> {indicator.description}</p>
                </div>
                <div className="pt-2 border-t border-theme-border">
                    <p className="text-sm"><strong>{isKri ? 'Threshold' : 'Target'}:</strong> {indicator.targetValue} {indicator.targetUnit}</p>
                </div>
                <div className="pt-2 border-t border-theme-border flex items-center">
                    {statusIcon}
                    <p className="text-sm"><strong>Status:</strong> <span className={statusColorClass}>{statusText}</span></p>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-theme-bg p-5 rounded-xl shadow-md border border-theme-border flex flex-col h-full hover:shadow-lg transition" onClick={onClick}>
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <h3 className="text-md font-semibold text-theme-text-primary">{title}</h3>
                    <Tooltip>{getTooltipContent()}</Tooltip>
                </div>
            </div>
            <div className="flex-grow flex items-center justify-center">
                <div className="text-center w-full">
                    <span className={`text-3xl font-bold ${isGoodCondition ? 'text-green-400' : 'text-red-400'}`}>{value}{unit}</span>
                </div>
            </div>
        </div>
    );
};

export default KpiCard;