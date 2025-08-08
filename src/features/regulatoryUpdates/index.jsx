// src/features/regulatoryUpdates/index.jsx

import React, { useState } from 'react';
import { Newspaper, Filter, Eye } from 'lucide-react'; // Removed Sparkles, LoaderCircle
// REMOVED: AnalysisReviewModal import
import ViewUpdateModal from './modals/ViewUpdateModal.jsx';
import { regulatoryPulseData as mockUpdates } from '../../data/mockData.js';

// Receive triggerAIAnalysis from App.jsx
const RegulatoryUpdates = ({ context, onClearContext, onNavigate, triggerAIAnalysis }) => {
    const [updates, setUpdates] = useState(mockUpdates);
    const [updateToView, setUpdateToView] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    // REMOVED: updateToAnalyze and isAnalysisModalOpen states
    // const [updateToAnalyze, setUpdateToAnalyze] = useState(null);
    // const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);

    const handleViewDetails = (update) => {
        setUpdateToView(update);
        setIsViewModalOpen(true);
    };

    // REMOVED: handleStartAnalysis and handleConfirmAnalysis handlers
    // const handleStartAnalysis = (update) => { ... };
    // const handleConfirmAnalysis = (analysisResult) => { ... };

    return (
        <div className="p-6 theme-bg-page min-h-screen">
            <div className="space-y-6 animate-fade-in">
                <div>
                    <h2 className="text-3xl font-bold theme-text-primary">Regulatory Updates</h2>
                    <p className="theme-text-secondary">Monitor and manage the lifecycle of evolving regulatory information.</p>
                </div>
                
                <div className="theme-bg-card p-4 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex space-x-4">
                            {/* Filter dropdowns can be added here */}
                        </div>
                    </div>
                    <div className="space-y-4">
                        {updates.map(update => (
                            <div key={update.id} className="p-4 border theme-border-color rounded-lg flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold text-lg theme-text-primary">{update.title}</h4>
                                    <p className="text-sm theme-text-secondary">{update.source} - Published: {update.publishedDate}</p>
                                    <p className="text-sm mt-2 theme-text-primary">{update.summary}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button onClick={() => handleViewDetails(update)} className="text-blue-600 flex items-center"><Eye size={16} className="mr-1"/> View Details</button>
                                    {/* REMOVED: The old "Analyze" button */}
                                    {/* <button onClick={() => handleStartAnalysis(update)} className="bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full flex items-center"><Sparkles size={16} className="mr-1"/> Analyze</button> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* REMOVED: AnalysisReviewModal conditional rendering */}
            {/* {isAnalysisModalOpen && <AnalysisReviewModal update={updateToAnalyze} onClose={() => setIsAnalysisModalOpen(false)} onConfirm={handleConfirmAnalysis} />} */}
            {isViewModalOpen && (
                // Pass triggerAIAnalysis to ViewUpdateModal
                <ViewUpdateModal update={updateToView} onClose={() => setIsViewModalOpen(false)} triggerAIAnalysis={triggerAIAnalysis} />
            )}
        </div>
    );
};

export default RegulatoryUpdates;