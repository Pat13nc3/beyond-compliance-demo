// src/features/regulatoryUpdates/modals/ViewUpdateModal.jsx

import React from 'react';
import { X, Lightbulb } from 'lucide-react'; // Import Lightbulb icon

const ViewUpdateModal = ({ update, onClose, triggerAIAnalysis }) => { // NEW: Add triggerAIAnalysis prop
    if (!update) return null;

    const handleAIAnalyzeClick = () => {
        if (triggerAIAnalysis) {
            triggerAIAnalysis({
                regulationTitle: update.title,
                regulationSource: update.source,
                regulationDate: update.publishedDate,
                fullTextSample: update.fullText ? update.fullText.substring(0, 500) + '...' : 'No full text available.', // Pass a sample or full text
                // You can pass the entire 'update' object if needed
                fullUpdateObject: update
            }, 'RegulationReview'); // Analysis type: RegulationReview
        } else {
            console.error("triggerAIAnalysis prop is undefined in ViewUpdateModal.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="bg-[#1e252d] rounded-2xl shadow-2xl p-6 w-full max-w-3xl text-white flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                    <h3 className="text-2xl font-bold text-[#c0933e]">{update.title}</h3>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto pr-2">
                    <p className="text-sm text-gray-300 whitespace-pre-wrap">{update.fullText}</p>
                </div>
                <div className="flex justify-end pt-4 mt-4 border-t border-gray-700 space-x-2">
                    {/* NEW: AI Analyze Button */}
                    <button
                        onClick={handleAIAnalyzeClick}
                        className="bg-purple-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-purple-500 flex items-center"
                    >
                        <Lightbulb size={16} className="mr-2"/> AI Analyze
                    </button>
                    <button type="button" onClick={onClose} className="bg-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewUpdateModal;