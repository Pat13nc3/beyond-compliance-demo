// src/features/manage/modals/ViewAIInsightModal.jsx

import React from 'react';
import { X, Clock, Lightbulb, BarChart2, AlertTriangle, Bot } from 'lucide-react'; // Icons for insight types

const ViewAIInsightModal = ({ insight, onClose }) => {
    if (!insight) return null;

    const getInsightIcon = (type) => {
        switch (type) {
            case 'Recommendation': return <Lightbulb size={24} className="text-yellow-300" />;
            case 'Risk Analysis': return <BarChart2 size={24} className="text-red-300" />;
            case 'Alert': return <AlertTriangle size={24} className="text-orange-300" />;
            case 'Digital Asset Alert': return <Bot size={24} className="text-blue-300" />;
            default: return <Lightbulb size={24} className="text-gray-400" />;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-xl text-white">
                <div className="flex justify-between items-start mb-4 border-b border-gray-700 pb-3">
                    <div className="flex items-center">
                        {getInsightIcon(insight.type)}
                        <h3 className="text-2xl font-bold text-[#c0933e] ml-3">{insight.title}</h3>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-4 text-gray-300 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
                    <p className="text-sm font-semibold">Type: <span className="font-normal">{insight.type}</span></p>
                    <p className="text-sm font-semibold">Date: <span className="font-normal flex items-center"><Clock size={14} className="mr-1"/>{insight.date}</span></p>
                    <div className="border-t border-gray-700 pt-4">
                        <p className="font-semibold text-gray-200 mb-2">Details:</p>
                        <p className="text-base whitespace-pre-wrap">{insight.details}</p>
                    </div>
                </div>
                <div className="flex justify-end pt-6 mt-6 border-t border-gray-700">
                    <button type="button" onClick={onClose} className="bg-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewAIInsightModal;