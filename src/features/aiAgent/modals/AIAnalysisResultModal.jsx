// src/components/modals/AIAnalysisResultModal.jsx

import React from 'react';
import { X, Lightbulb, CheckCircle, Target, FileText, Book, Send } from 'lucide-react';

const AIAnalysisResultModal = ({ title, result, onClose, onPromote }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="theme-bg-card rounded-2xl shadow-2xl p-6 w-full max-w-2xl theme-text-primary max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center mb-4 border-b theme-border-color pb-3">
                    <h3 className="text-[24px] leading-[32px] font-bold theme-text-highlight-color flex items-center">
                        <Lightbulb size={24} className="mr-3 theme-text-secondary" /> {title || "AI Analysis Result"}
                    </h3>
                    <button onClick={onClose} className="p-1 rounded-full theme-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 space-y-6">
                    {/* Summary */}
                    {result.summary && (
                        <div>
                            <h4 className="text-[18px] leading-[28px] font-semibold theme-text-primary mb-2 flex items-center">
                                <FileText size={20} className="mr-2 text-blue-400" /> Summary
                            </h4>
                            <p className="theme-text-secondary text-base leading-[24px]">{result.summary}</p>
                        </div>
                    )}

                    {/* Key Points */}
                    {result.keyPoints && result.keyPoints.length > 0 && (
                        <div>
                            <h4 className="text-[18px] leading-[28px] font-semibold theme-text-primary mb-2 flex items-center">
                                <CheckCircle size={20} className="mr-2 text-green-400" /> Key Points
                            </h4>
                            <ul className="list-disc list-inside theme-text-secondary text-base leading-[24px] space-y-1">
                                {result.keyPoints.map((point, index) => (
                                    <li key={index}>{point}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Recommended Actions */}
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

                    {/* Promote/Apply Options */}
                    {onPromote && (
                        <div className="pt-6 border-t theme-border-color mt-6">
                            <h4 className="text-[18px] leading-[28px] font-semibold theme-text-primary mb-4">Promote AI Output</h4>
                            <p className="text-sm theme-text-secondary mb-4">Select where you'd like to use this AI-generated content:</p>
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => onPromote('ComplianceReport', result.originalContext, result)}
                                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-md text-sm flex items-center"
                                >
                                    <FileText size={16} className="mr-2"/> Use in Report
                                </button>
                                <button
                                    onClick={() => onPromote('Library', result.originalContext, result)}
                                    className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-md text-sm flex items-center"
                                >
                                    <Book size={16} className="mr-2"/> Add to Library
                                </button>
                                <button
                                    onClick={() => onPromote('Email', result.originalContext, result)}
                                    className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-md text-sm flex items-center"
                                >
                                    <Send size={16} className="mr-2"/> Share via Email
                                </button>
                            </div>
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

export default AIAnalysisResultModal;