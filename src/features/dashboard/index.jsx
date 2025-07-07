import React, { useState, useMemo } from 'react';
import { ExternalLink, Filter, LayoutDashboard, UserCheck, Activity, SlidersHorizontal, Share2 } from 'lucide-react';
import ActionItem from './components/ActionItem';
import PulseItem from './components/PulseItem';
import KpiCard from './components/KpiCard';
import SubmitEvidenceModal from '../../components/modals/SubmitEvidenceModal.jsx';
import AnalyticsCenterModal from './modals/AnalyticsCenterModal.jsx';
import KycDashboard from './components/KycDashboard.jsx';
import TransactionMonitoringDashboard from './components/TransactionMonitoringDashboard.jsx';
import CustomizeDashboardModal from './modals/CustomizeDashboardModal.jsx';
import ExportDashboardModal from './modals/ExportDashboardModal.jsx';
import { initialPriorityActions, regulatoryPulseData, kpiData } from '../../data/mockData';

// --- UPDATED: The component now receives the 'jurisdiction' prop ---
const ActionOrientedDashboard = ({ onPrepareReport, onViewUpdate, jurisdiction }) => {
    const [isSubmitEvidenceModalOpen, setIsSubmitEvidenceModalOpen] = useState(false);
    const [isAnalyticsCenterOpen, setIsAnalyticsCenterOpen] = useState(false);
    const [selectedAction, setSelectedAction] = useState(null);
    const [activeDashboard, setActiveDashboard] = useState('overview');
    const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);

    // --- NEW: Filter logic that responds to the selected jurisdiction ---
    const filteredActions = useMemo(() => {
        if (jurisdiction === 'Global') {
            return initialPriorityActions;
        }
        // Show items that are 'Global' or match the selected jurisdiction
        return initialPriorityActions.filter(
            action => action.jurisdiction === 'Global' || action.jurisdiction === jurisdiction
        );
    }, [jurisdiction]);

    const filteredPulse = useMemo(() => {
        if (jurisdiction === 'Global') {
            return regulatoryPulseData;
        }
        return regulatoryPulseData.filter(
            pulse => pulse.jurisdiction === jurisdiction
        );
    }, [jurisdiction]);


    const handleActionClick = (action) => {
        if (action.cta === "Prepare Report") {
            onPrepareReport({ category: 'Regulatory Filings', template: 'AML Summary' });
        } else if (action.cta === "Submit Evidence") {
            setSelectedAction(action);
            setIsSubmitEvidenceModalOpen(true);
        }
    };
    
    const completeAction = (actionId) => {
        // This would be more complex in a real app, for now, it's a console log
        console.log(`Action ${actionId} completed.`);
        setIsSubmitEvidenceModalOpen(false);
    };

    const handlePulseClick = (pulse) => { 
        onViewUpdate(pulse);
    };

    return (
        <div id="dashboard-content" className="space-y-6 animate-fade-in p-6">
            <div className="flex justify-between items-center">
                <div className="bg-gray-800 rounded-lg p-1 flex space-x-1">
                    <button onClick={() => setActiveDashboard('overview')} className={`flex-1 justify-center flex items-center space-x-2 py-2 px-4 text-sm font-bold rounded-md transition-colors ${activeDashboard === 'overview' ? 'bg-[#c0933e] text-[#1e252d]' : 'text-gray-400 hover:bg-gray-700'}`}><LayoutDashboard size={16} /><span>Main Overview</span></button>
                    <button onClick={() => setActiveDashboard('kyc')} className={`flex-1 justify-center flex items-center space-x-2 py-2 px-4 text-sm font-bold rounded-md transition-colors ${activeDashboard === 'kyc' ? 'bg-[#c0933e] text-[#1e252d]' : 'text-gray-400 hover:bg-gray-700'}`}><UserCheck size={16} /><span>KYC Dashboard</span></button>
                    <button onClick={() => setActiveDashboard('transactions')} className={`flex-1 justify-center flex items-center space-x-2 py-2 px-4 text-sm font-bold rounded-md transition-colors ${activeDashboard === 'transactions' ? 'bg-[#c0933e] text-[#1e252d]' : 'text-gray-400 hover:bg-gray-700'}`}><Activity size={16} /><span>Transaction Monitoring</span></button>
                </div>
                <div className="flex items-center space-x-2">
                    <button onClick={() => setIsCustomizeModalOpen(true)} className="bg-gray-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600 flex items-center text-sm"><SlidersHorizontal size={16} className="mr-2"/> Customize</button>
                    <button onClick={() => setIsExportModalOpen(true)} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center text-sm"><Share2 size={16} className="mr-2"/> Export / Share</button>
                </div>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-4 items-center p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center"><Filter size={18} className="text-gray-400 mr-2"/><h4 className="font-semibold text-white">Filter by:</h4></div>
                <select className="bg-gray-700 text-white border-gray-600 rounded p-2 text-sm"><option>Regulator: All</option></select>
                <select className="bg-gray-700 text-white border-gray-600 rounded p-2 text-sm"><option>License Type: All</option></select>
                <select className="bg-gray-700 text-white border-gray-600 rounded p-2 text-sm"><option>Product Type: All</option></select>
                <div className="flex items-center space-x-2"><span className="text-sm text-gray-400">Period:</span><input type="date" className="bg-gray-700 text-white border-gray-600 rounded p-1.5 text-sm" /><span className="text-gray-500">-</span><input type="date" className="bg-gray-700 text-white border-gray-600 rounded p-1.5 text-sm" /></div>
            </div>

            {activeDashboard === 'overview' && (
                <>
                    <div className="lg:flex gap-6">
                        {/* --- UPDATED: Use the filtered data --- */}
                        <div className="lg:w-2/3 bg-[#1e252d] p-6 rounded-xl shadow-lg text-white mb-6 lg:mb-0"><h3 className="text-xl font-semibold mb-4 text-[#c0933e]">Priority Actions</h3><div className="space-y-4">{filteredActions.map(item => <ActionItem key={item.id} action={item} onActionClick={handleActionClick} />)}</div></div>
                        <div className="lg:w-1/3 bg-[#1e252d] p-6 rounded-xl shadow-lg text-white flex flex-col"><h3 className="text-xl font-semibold mb-4 text-[#c0933e]">Regulatory Pulse</h3><div className="space-y-4 flex-grow">{filteredPulse.map(item => <PulseItem key={item.id} pulse={item} onClick={handlePulseClick} />)}</div></div>
                    </div>
                    <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white"><div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-[#c0933e]">Compliance Health Snapshot</h3><button onClick={() => setIsAnalyticsCenterOpen(true)} className="text-sm font-bold text-[#c0933e] flex items-center hover:underline"><ExternalLink size={14} className="ml-1"/> View Detailed Analytics</button></div><div className="grid grid-cols-1 md:grid-cols-3 gap-4">{kpiData.map(kpi => <KpiCard key={kpi.title} {...kpi} />)}</div></div>
                </>
            )}

            {activeDashboard === 'kyc' && <KycDashboard />}
            {activeDashboard === 'transactions' && <TransactionMonitoringDashboard />}
            
            {isSubmitEvidenceModalOpen && <SubmitEvidenceModal action={selectedAction} onClose={() => setIsSubmitEvidenceModalOpen(false)} onComplete={completeAction} />}
            {isAnalyticsCenterOpen && <AnalyticsCenterModal onClose={() => setIsAnalyticsCenterOpen(false)} />}
            {isCustomizeModalOpen && <CustomizeDashboardModal onClose={() => setIsCustomizeModalOpen(false)} />}
            {isExportModalOpen && <ExportDashboardModal onClose={() => setIsExportModalOpen(false)} />}
        </div>
    );
};

export default ActionOrientedDashboard;