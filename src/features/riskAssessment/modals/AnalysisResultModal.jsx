// src/features/riskAssessment/modals/AnalysisResultModal.jsx

import React from 'react';
import { X, Lightbulb, CheckCircle, Target, FileText } from 'lucide-react';

const AnalysisResultModal = ({ result, onClose, onPromote }) => {
    if (!result) return null;
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="theme-bg-card rounded-2xl shadow-2xl p-6 w-full max-w-2xl theme-text-primary max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center mb-4 border-b theme-border-color pb-3">
                    <h3 className="text-[24px] leading-[32px] font-bold theme-text-highlight-color flex items-center">
                        <Lightbulb size={24} className="mr-3 theme-text-secondary" /> AI Analysis Result
                    </h3>
                    <button onClick={onClose} className="p-1 rounded-full theme-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 space-y-6">
                    {result.summary && (
                        <div>
                            <h4 className="text-[18px] leading-[28px] font-semibold theme-text-primary mb-2 flex items-center">
                                <FileText size={20} className="mr-2 text-blue-400" /> Summary
                            </h4>
                            <p className="theme-text-secondary text-base leading-[24px]">{result.summary}</p>
                        </div>
                    )}
                    {result.recommendedActions && result.recommendedActions.length > 0 && (
                        <div>
                            <h4 className="text-[18px] leading-[28px] font-semibold theme-text-primary mb-2 flex items-center">
                                <Target size={20} className="mr-2 text-red-400" /> Recommended Actions
                            </h4>
                            <ul className="list-disc list-inside theme-text-secondary text-base leading-[24px] space-y-1">
                                {result.recommendedActions.map((action, index) => (
                                    <li key={index}>{action}</li>
                                ))}
                            </ul>
                        </div>
                    )}
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

export default AnalysisResultModal;