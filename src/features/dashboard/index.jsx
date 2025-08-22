// src/features/dashboard/index.jsx

import React, { useState, useMemo, useEffect } from 'react';
import { LayoutDashboard, UserCheck, Activity, SlidersHorizontal, Share2, FileText, Book, Plus, Building2 } from 'lucide-react'; // Removed SlidersHorizontal icon
// Component Imports
import ActionItem from './components/ActionItem';
import PulseItem from './components/PulseItem';
import KycDashboard from './components/KycDashboard.jsx';
import TransactionMonitoringDashboard from './components/TransactionMonitoringDashboard.jsx';
import WelcomeSignage from './components/WelcomeSignage';
import HeadquartersView from './components/HeadquartersView';
import BuildTeamCard from './components/BuildTeamCard';
// REMOVED: ComplianceHealthScorecard is no longer imported or rendered here.

// Modal Imports
import SubmitEvidenceModal from '../../components/modals/SubmitEvidenceModal.jsx';
import CustomizeDashboardModal from './modals/CustomizeDashboardModal.jsx';
import ExportDashboardModal from './modals/ExportDashboardModal.jsx';
import InviteUserModal from '../settings/modals/InviteUserModal';
import EntityComplianceDetailsModal from '../complianceFrameworks/modals/EntityComplianceDetailsModal';
import AddEntityModal from './modals/AddEntityModal.jsx'; // NEW: Import AddEntityModal

// Data Imports
import {
    initialPriorityActions,
    regulatoryPulseData,
    currentUser,
    companyStructure as initialCompanyStructure, // Renamed to initialCompanyStructure
    controlHotspotData,
    mockRoles,
    mockRules,
    mockFrameworks,
    productCategories // Import productCategories for the modal
} from '../../data/mockData'; // CORRECTED PATH

const initialLayout = [
    { id: 'welcome', name: 'Welcome Banner', visible: true, fullWidth: true },
    { id: 'scorecard', name: 'Compliance Health Scorecard', visible: true, fullWidth: true },
    { id: 'ai-alerts', name: 'AI-Powered Alerts & Insights', visible: true, fullWidth: false },
    { id: 'pulse', name: 'Regulatory Pulse', visible: true, fullWidth: false },
    { id: 'actions', name: 'Actionable Tasks & Deadlines', visible: true, fullWidth: true },
    { id: 'frameworks', name: 'Frameworks Overview', visible: true, fullWidth: true },
    { id: 'headquarters', name: 'Corporate Structure', visible: true, fullWidth: false },
    { id: 'team', name: 'Build Team', visible: true, fullWidth: false },
];

const ActionOrientedDashboard = ({ onNavigate, jurisdiction, activeProduct, selectedEntity, onSelectEntity }) => {
    const [dashboardLayout, setDashboardLayout] = useState([]);
    const [selectedEntityForDetails, setSelectedEntityForDetails] = useState(null);
    const [isEntityDetailsModalOpen, setIsEntityDetailsModalOpen] = useState(false);
    const [isAddEntityModalOpen, setIsAddEntityModalOpen] = useState(false); // NEW: State for AddEntityModal
    const [localCompanyStructure, setLocalCompanyStructure] = useState(initialCompanyStructure); // NEW: Local state for company structure

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
        let filtered = initialPriorityActions.filter(action => action.entityId === selectedEntity);

        if (jurisdiction && jurisdiction !== 'Global') {
            filtered = filtered.filter(action => action.jurisdiction === 'Global' || action.jurisdiction === jurisdiction);
        }

        return filtered;
    }, [jurisdiction, selectedEntity]);

    const filteredPulse = useMemo(() => {
        if (jurisdiction === 'Global') return regulatoryPulseData;
        return regulatoryPulseData.filter(pulse => pulse.jurisdiction === jurisdiction);
    }, [jurisdiction]);

    const handleActionClick = (action) => {
        switch (action.cta) {
            case "Prepare Report":
                onNavigate('ComplianceReporting', { action: 'initiateReportGeneration' });
                break;
            case "Review Now":
                onNavigate('DataManagement', { initialTab: 'Detailed Records', detailedRecordsFilters: { type: 'KYC', status: 'Pending' } });
                break;
            case "Start Renewal":
                onNavigate('Licensing');
                break;
            case "Submit Evidence":
                setSelectedAction(action);
                setModals(prev => ({ ...prev, submitEvidence: true }));
                break;
            default:
                console.log(`Unhandled action: ${action.cta} for ${action.title}`);
                break;
        }
    };
    
    // Fix: Add a placeholder handlePulseClick function to prevent the ReferenceError
    const handlePulseClick = (pulseItem) => {
        console.log(`Clicked Regulatory Pulse: ${pulseItem.title}.`);
    };

    // NEW: Function to handle adding a new entity
    const handleAddEntity = (newEntityData) => {
        const newEntity = {
            id: `sub-${Date.now()}`, // Generate a unique ID
            name: newEntityData.name,
            location: newEntityData.location,
            status: newEntityData.status,
            products: newEntityData.products,
            jurisdiction: newEntityData.jurisdiction,
            complianceScore: newEntityData.complianceScore,
        };
        setLocalCompanyStructure(prev => ({
            ...prev,
            subsidiaries: [...prev.subsidiaries, newEntity]
        }));
        setIsAddEntityModalOpen(false);
        // Optionally, you could trigger a toast message here
        console.log("New entity added:", newEntity);
    };

    // NEW: Handle entity click to show the drill-down modal
    const handleSelectEntityAndShowDetails = (entityId) => {
        onSelectEntity(entityId); // Still update the selected entity state
        const entity = localCompanyStructure.parent.id === entityId 
            ? { ...localCompanyStructure.parent, products: ['All'], jurisdiction: 'Global' } 
            : localCompanyStructure.subsidiaries.find(sub => sub.id === entityId);
        
        if (entity) {
             if (!entity.products) {
                entity.products = ['Payments', 'Digital Assets']; 
            }
            if (!entity.jurisdiction) {
                entity.jurisdiction = entity.location.includes('Nairobi') ? 'Kenya' : 
                                      entity.location.includes('London') ? 'Global' :
                                      entity.location.includes('São Paulo') ? 'Brazil' : 'Global';
            }
            setSelectedEntityForDetails(entity);
            setIsEntityDetailsModalOpen(true);
        }
    };

    return (
        <div id="dashboard-content" className="space-y-6 animate-fade-in p-6 theme-bg-page theme-text-primary">
            <div className="flex justify-between items-center">
                <div className="theme-bg-card rounded-lg p-1 flex space-x-1">
                    <button onClick={() => setActiveDashboard('overview')} className={`flex-1 justify-center flex items-center space-x-2 py-2 px-4 text-sm font-bold rounded-md transition-colors ${activeDashboard === 'overview' ? 'theme-bg-highlight-color text-black' : 'bg-transparent text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}><LayoutDashboard size={16} /><span>Main Overview</span></button>
                    <button onClick={() => setActiveDashboard('kyc')} className={`flex-1 justify-center flex items-center space-x-2 py-2 px-4 text-sm font-bold rounded-md transition-colors ${activeDashboard === 'kyc' ? 'theme-bg-highlight-color text-black' : 'bg-transparent text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}><UserCheck size={16} /><span>KYC Dashboard</span></button>
                    <button onClick={() => setActiveDashboard('transactions')} className={`flex-1 justify-center flex items-center space-x-2 py-2 px-4 text-sm font-bold rounded-md transition-colors ${activeDashboard === 'transactions' ? 'theme-bg-highlight-color text-black' : 'bg-transparent text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}><Activity size={16} /><span>Transaction Monitoring</span></button>
                </div>
                <div className="flex items-center space-x-2">
                    <button onClick={() => setModals(prev => ({ ...prev, export: true }))} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center text-sm"><Share2 size={16} className="mr-2"/> Export / Share</button>
                </div>
            </div>
            
            {activeDashboard === 'overview' && (
                <>
                    <WelcomeSignage user={currentUser} />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="theme-bg-card p-6 rounded-xl shadow-lg theme-text-primary h-full">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold theme-text-highlight-color">Corporate Structure</h2>
                                <button
                                    onClick={() => setIsAddEntityModalOpen(true)} // NEW: Open AddEntityModal
                                    className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center text-sm"
                                >
                                    <Plus size={16} className="mr-2" /> Add Entity
                                </button>
                            </div>
                            <HeadquartersView
                                structure={localCompanyStructure} // Use local state
                                selectedEntityId={selectedEntity}
                                onSelectEntity={handleSelectEntityAndShowDetails}
                                jurisdiction={jurisdiction}
                                activeProduct={activeProduct}
                            />
                        </div>
                         <BuildTeamCard onInvite={() => onNavigate('Settings', { openModal: 'inviteUser' })} />
                    </div>
                </>
            )}

            {activeDashboard === 'kyc' && <KycDashboard />}
            {activeDashboard === 'transactions' && <TransactionMonitoringDashboard jurisdiction={jurisdiction} />}

            {modals.submitEvidence && <SubmitEvidenceModal action={selectedAction} onClose={() => setModals(prev => ({ ...prev, submitEvidence: true }))} onComplete={() => {}} />}
            {modals.export && <ExportDashboardModal onClose={() => setModals(prev => ({ ...prev, export: false }))} />}
            {modals.inviteUser && (
                <InviteUserModal
                    roles={mockRoles}
                    onClose={() => setModals(prev => ({ ...prev, inviteUser: false }))}
                    onSave={(newUser) => {
                        console.log("New user invited from Dashboard:", newUser);
                        setModals(prev => ({ ...prev, inviteUser: false }));
                    }}
                />
            )}
             {isEntityDetailsModalOpen && selectedEntityForDetails && (
                <EntityComplianceDetailsModal
                    entity={selectedEntityForDetails}
                    frameworks={mockFrameworks}
                    rules={mockRules}
                    onClose={() => setIsEntityDetailsModalOpen(false)}
                />
            )}

            {/* NEW: Render AddEntityModal */}
            {isAddEntityModalOpen && (
                <AddEntityModal
                    onClose={() => setIsAddEntityModalOpen(false)}
                    onSave={handleAddEntity}
                />
            )}
        </div>
    );
};

export default ActionOrientedDashboard;