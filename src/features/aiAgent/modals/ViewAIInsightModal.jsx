// src/features/manage/modals/ViewAIInsightModal.jsx

import React from 'react';
import { X, Clock, Lightbulb, BarChart2, AlertTriangle, Bot } from 'lucide-react'; // Icons for insight types

const ViewAIInsightModal = ({ insight, onClose }) => {
    if (!insight) return null;

    const getInsightIcon = (type) => {
        switch (type) {
            case 'Recommendation': return <Lightbulb size={24} className="text-yellow-400" />;
            case 'Risk Analysis': return <BarChart2 size={24} className="text-red-400" />;
            case 'Alert': return <AlertTriangle size={24} className="text-orange-400" />;
            case 'Digital Asset Alert': return <Bot size={24} className="text-blue-400" />;
            default: return <Lightbulb size={24} className="text-gray-400" />;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="theme-bg-card rounded-2xl shadow-2xl p-6 w-full max-w-xl theme-text-primary">
                <div className="flex justify-between items-start mb-4 border-b theme-border-color pb-3">
                    <div className="flex items-center">
                        {getInsightIcon(insight.type)}
                        <h3 className="text-[24px] leading-[32px] font-bold theme-text-highlight-color ml-3">{insight.title}</h3>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full theme-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-4 theme-text-secondary max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
                    <p className="text-[14px] leading-[20px] font-semibold">Type: <span className="font-normal theme-text-primary">{insight.type}</span></p>
                    <p className="text-[14px] leading-[20px] font-semibold">Date: <span className="font-normal flex items-center theme-text-primary"><Clock size={14} className="mr-1"/>{insight.date}</span></p>
                    <div className="border-t theme-border-color pt-4">
                        <p className="font-semibold theme-text-primary mb-2">Details:</p>
                        <p className="text-base whitespace-pre-wrap theme-text-primary">{insight.details}</p>
                    </div>
                </div>
                <div className="flex justify-end pt-6 mt-6 border-t theme-border-color">
                    <button type="button" onClick={onClose} className="bg-gray-200 dark:bg-gray-700 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 theme-text-primary">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewAIInsightModal;