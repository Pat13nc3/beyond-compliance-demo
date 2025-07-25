// src/features/dashboard/index.jsx

import React, { useState, useMemo, useEffect } from 'react';
import { LayoutDashboard, UserCheck, Activity, SlidersHorizontal, Share2 } from 'lucide-react';

// Component Imports
import ActionItem from './components/ActionItem';
import PulseItem from './components/PulseItem';
import KycDashboard from './components/KycDashboard.jsx';
import TransactionMonitoringDashboard from './components/TransactionMonitoringDashboard.jsx';
import WelcomeSignage from './components/WelcomeSignage';
import HeadquartersView from './components/HeadquartersView';
import BuildTeamCard from './components/BuildTeamCard';
import ControlHotspotAnalysis from './components/ControlHotspotAnalysis';

// Modal Imports
import SubmitEvidenceModal from '../../components/modals/SubmitEvidenceModal.jsx';
import AnalyticsCenterModal from './modals/AnalyticsCenterModal.jsx';
import CustomizeDashboardModal from './modals/CustomizeDashboardModal.jsx';
import ExportDashboardModal from './modals/ExportDashboardModal.jsx';
import InviteUserModal from '../settings/modals/InviteUserModal';

// Data Imports
import {
    initialPriorityActions,
    regulatoryPulseData,
    currentUser,
    companyStructure,
    controlHotspotData
} from '../../data/mockData';

const initialLayout = [
    { id: 'welcome', name: 'Welcome Banner', visible: true, fullWidth: true },
    { id: 'actions', name: 'Priority Actions', visible: true, fullWidth: true },
    { id: 'headquarters', name: 'Corporate Structure', visible: true, fullWidth: false },
    { id: 'team', name: 'Build Team', visible: true, fullWidth: false },
    { id: 'hotspots', name: 'Control Hotspots', visible: true, fullWidth: false },
    { id: 'pulse', name: 'Regulatory Pulse', visible: true, fullWidth: false },
];

// The `onPrepareReport` prop is passed in from a higher-level component (like App.jsx)
const ActionOrientedDashboard = ({ onPrepareReport, onViewUpdate, jurisdiction }) => {
    const [dashboardLayout, setDashboardLayout] = useState([]);

    useEffect(() => {
        const savedLayout = localStorage.getItem('dashboard-layout');
        if (savedLayout) {
            setDashboardLayout(JSON.parse(savedLayout));
        } else {
            setDashboardLayout(initialLayout);
        }
    }, []);

    const handleSaveLayout = (newLayout) => {
        setDashboardLayout(newLayout);
        localStorage.setItem('dashboard-layout', JSON.stringify(newLayout));
    };

    const [modals, setModals] = useState({
        submitEvidence: false,
        analytics: false,
        customize: false,
        export: false,
        inviteUser: false,
    });
    const [selectedAction, setSelectedAction] = useState(null);
    const [activeDashboard, setActiveDashboard] = useState('overview');

    const filteredActions = useMemo(() => {
        if (jurisdiction === 'Global') return initialPriorityActions;
        return initialPriorityActions.filter(action => action.jurisdiction === 'Global' || action.jurisdiction === jurisdiction);
    }, [jurisdiction]);

    const filteredPulse = useMemo(() => {
        if (jurisdiction === 'Global') return regulatoryPulseData;
        return regulatoryPulseData.filter(pulse => pulse.jurisdiction === jurisdiction);
    }, [jurisdiction]);

    // This function now correctly uses the onPrepareReport prop for redirection
    const handleActionClick = (action) => {
        if (action.cta === "Prepare Report") {
            // This will call the function in the parent component to handle the redirect
            onPrepareReport({ category: 'Regulatory Filings', template: 'AML Summary' });
        }
        else if (action.cta === "Submit Evidence") {
            setSelectedAction(action);
            setModals(prev => ({ ...prev, submitEvidence: true }));
        }
    };

    const renderCard = (item) => {
        switch (item.id) {
            case 'welcome': return <WelcomeSignage user={currentUser} />;
            case 'actions': return (
                <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white">
                    <h3 className="text-xl font-semibold mb-4 text-[#c0933e]">Priority Actions</h3>
                    <div className="space-y-4">
                        {filteredActions.map(act => (
                            <ActionItem
                                key={act.id}
                                action={act}
                                onActionClick={handleActionClick}
                            />
                        ))}
                    </div>
                </div>
            );
            case 'headquarters': return <HeadquartersView structure={companyStructure} />;
            case 'team': return <BuildTeamCard onInvite={() => setModals(prev => ({ ...prev, inviteUser: true }))} />;
            case 'hotspots': return <ControlHotspotAnalysis data={controlHotspotData} />;
            case 'pulse': return (
                <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white flex flex-col h-full">
                    <h3 className="text-xl font-semibold mb-4 text-[#c0933e]">Regulatory Pulse</h3>
                    <div className="space-y-4 flex-grow">{filteredPulse.map(p => <PulseItem key={p.id} pulse={p} onClick={() => onViewUpdate(p)} />)}</div>
                </div>
            );
            default: return null;
        }
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
                    <button onClick={() => setModals(prev => ({ ...prev, customize: true }))} className="bg-gray-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600 flex items-center text-sm"><SlidersHorizontal size={16} className="mr-2"/> Customize</button>
                    <button onClick={() => setModals(prev => ({ ...prev, export: true }))} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center text-sm"><Share2 size={16} className="mr-2"/> Export / Share</button>
                </div>
            </div>

            {activeDashboard === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {dashboardLayout.filter(item => item.visible).map(item => (
                        <div key={item.id} className={item.fullWidth ? 'lg:col-span-2' : ''}>
                            {renderCard(item)}
                        </div>
                    ))}
                </div>
            )}

            {activeDashboard === 'kyc' && <KycDashboard />}
            {activeDashboard === 'transactions' && <TransactionMonitoringDashboard />}

            {modals.submitEvidence && <SubmitEvidenceModal action={selectedAction} onClose={() => setModals(prev => ({ ...prev, submitEvidence: false }))} onComplete={() => {}} />}
            {modals.analytics && <AnalyticsCenterModal onClose={() => setModals(prev => ({ ...prev, analytics: false }))} />}
            {modals.customize && <CustomizeDashboardModal items={dashboardLayout} onSave={handleSaveLayout} onClose={() => setModals(prev => ({ ...prev, customize: false }))} />}
            {modals.export && <ExportDashboardModal onClose={() => setModals(prev => ({ ...prev, export: false }))} />}
            {modals.inviteUser && <InviteUserModal onClose={() => setModals(prev => ({ ...prev, inviteUser: false }))} />}
        </div>
    );
};

export default ActionOrientedDashboard;