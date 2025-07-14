import React, { useState } from 'react';
import { Newspaper, Filter, Eye, Sparkles, LoaderCircle } from 'lucide-react';
import AnalysisReviewModal from './modals/AnalysisReviewModal.jsx';
import ViewUpdateModal from './modals/ViewUpdateModal.jsx';
// --- CORRECTED: Importing the correct variable name and renaming it ---
import { regulatoryPulseData as mockUpdates } from '../../data/mockData.js';

const RegulatoryUpdates = ({ context, onClearContext, onNavigate }) => {
    const [updates, setUpdates] = useState(mockUpdates);
    const [updateToView, setUpdateToView] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [updateToAnalyze, setUpdateToAnalyze] = useState(null);
    const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);

    const handleViewDetails = (update) => {
        setUpdateToView(update);
        setIsViewModalOpen(true);
    };

    const handleStartAnalysis = (update) => {
        setUpdateToAnalyze(update);
        setIsAnalysisModalOpen(true);
    };
    
    const handleConfirmAnalysis = (analysisResult) => {
        console.log('Analysis Confirmed:', analysisResult);
        setIsAnalysisModalOpen(false);
    };

    return (
        <div className="p-6">
            <div className="space-y-6 animate-fade-in">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Regulatory Updates</h2>
                    <p className="text-gray-500">Monitor and manage the lifecycle of evolving regulatory information.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex space-x-4">
                            {/* Filter dropdowns can be added here */}
                        </div>
                    </div>
                    <div className="space-y-4">
                        {updates.map(update => (
                            <div key={update.id} className="p-4 border rounded-lg flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold text-lg">{update.title}</h4>
                                    <p className="text-sm text-gray-600">{update.source} - Published: {update.publishedDate}</p>
                                    <p className="text-sm mt-2">{update.summary}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button onClick={() => handleViewDetails(update)} className="text-blue-600 flex items-center"><Eye size={16} className="mr-1"/> View Details</button>
                                    <button onClick={() => handleStartAnalysis(update)} className="bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full flex items-center"><Sparkles size={16} className="mr-1"/> Analyze</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isAnalysisModalOpen && <AnalysisReviewModal update={updateToAnalyze} onClose={() => setIsAnalysisModalOpen(false)} onConfirm={handleConfirmAnalysis} />}
            {isViewModalOpen && <ViewUpdateModal update={updateToView} onClose={() => setIsViewModalOpen(false)} />}
        </div>
    );
};

export default RegulatoryUpdates;