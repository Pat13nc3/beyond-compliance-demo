import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import ActionItem from './ActionItem';
import PulseItem from './PulseItem';
import KpiCard from './KpiCard';
import SubmitEvidenceModal from '../modals/SubmitEvidenceModal.jsx';
import AnalyticsCenterModal from '../modals/AnalyticsCenterModal.jsx';
import { initialPriorityActions, regulatoryPulseData, kpiData } from '../../data/mockData';

// UPDATED: Now accepts the userMode prop
const ActionOrientedDashboard = ({ setActiveTab, onPrepareReport, onViewUpdate, userMode }) => {
    const [priorityActions, setPriorityActions] = useState(initialPriorityActions);
    const [isSubmitEvidenceModalOpen, setIsSubmitEvidenceModalOpen] = useState(false);
    const [isAnalyticsCenterOpen, setIsAnalyticsCenterOpen] = useState(false);
    const [selectedAction, setSelectedAction] = useState(null);

    const handleActionClick = (action) => {
        if (action.cta === "Start Renewal") {
            setActiveTab('Licensing');
        } else if (action.cta === "Prepare Report") {
            onPrepareReport({ category: 'Regulatory Filings', template: 'AML Summary' });
        } else if (action.cta === "Submit Evidence") {
            setSelectedAction(action);
            setIsSubmitEvidenceModalOpen(true);
        }
    };
    
    const completeAction = (actionId) => {
        setPriorityActions(prevActions => prevActions.filter(action => action.id !== actionId));
        setIsSubmitEvidenceModalOpen(false);
    };

    const handlePulseClick = (pulse) => { 
        onViewUpdate(pulse);
    };

    const handleKpiClick = (kpi) => { /* Future modal logic */ };

    return (
        <>
            <div className="space-y-6 animate-fade-in">
                <div className="lg:flex gap-6">
                    <div className="lg:w-2/3 bg-[#1e252d] p-6 rounded-xl shadow-lg text-white mb-6 lg:mb-0">
                        <h3 className="text-xl font-semibold mb-4 text-[#c0933e]">Priority Actions</h3>
                        <div className="space-y-4">
                            {priorityActions.map(item => (
                                <ActionItem key={item.id} action={item} onActionClick={handleActionClick} />
                            ))}
                            {priorityActions.length === 0 && <p className="text-gray-400 text-center py-4">No priority actions. Well done!</p>}
                        </div>
                    </div>
                    <div className="lg:w-1/3 bg-[#1e252d] p-6 rounded-xl shadow-lg text-white flex flex-col">
                        <h3 className="text-xl font-semibold mb-4 text-[#c0933e]">Regulatory Pulse</h3>
                        <div className="space-y-4 flex-grow">{regulatoryPulseData.map(item => <PulseItem key={item.id} pulse={item} onClick={handlePulseClick} />)}</div>
                    </div>
                </div>
                
                {/* --- UPDATED: This widget is now conditional --- */}
                {/* It will only be rendered if the userMode is 'Pro' */}
                {userMode === 'Pro' && (
                    <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white">
                        <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-[#c0933e]">Compliance Health Snapshot</h3>
                        <button onClick={() => setIsAnalyticsCenterOpen(true)} className="text-sm font-bold text-[#c0933e] flex items-center hover:underline">
                            View Detailed Analytics <ExternalLink size={14} className="ml-1"/>
                        </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{kpiData.map(kpi => <KpiCard key={kpi.title} {...kpi} onClick={() => handleKpiClick(kpi)} />)}</div>
                    </div>
                )}
            </div>

            {isSubmitEvidenceModalOpen && <SubmitEvidenceModal action={selectedAction} onClose={() => setIsSubmitEvidenceModalOpen(false)} onComplete={completeAction} />}
            {isAnalyticsCenterOpen && <AnalyticsCenterModal onClose={() => setIsAnalyticsCenterOpen(false)} />}
        </>
    );
};

export default ActionOrientedDashboard;
