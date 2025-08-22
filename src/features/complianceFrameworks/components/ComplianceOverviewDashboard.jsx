// src/features/complianceFrameworks/components/ComplianceOverviewDashboard.jsx

import React, { useMemo, useState } from 'react'; // Import useState
import { Shield, Book, FileText, Activity, Lightbulb, Link2, UserCheck, Settings, Award } from 'lucide-react';
// Import necessary components from dashboard
import ComplianceHealthScorecard from '../../dashboard/components/ComplianceHealthScorecard.jsx'; 
import ActionItem from '../../dashboard/components/ActionItem.jsx'; 
import PulseItem from '../../dashboard/components/PulseItem.jsx'; 
// REMOVED: HeadquartersView and BuildTeamCard components are no longer imported here.
import ControlHotspotAnalysis from '../../dashboard/components/ControlHotspotAnalysis.jsx'; 
// Import mock data needed for the dashboard view
import {
    mockFrameworks,
    currentUser,
    initialPriorityActions,
    regulatoryPulseData,
    companyStructure,
    controlHotspotData,
    mockRules // Import mockRules
} from '../../../data/mockData.js'; // Verified path
import EntityComplianceDetailsModal from '../modals/EntityComplianceDetailsModal.jsx'; // Verified path

const ComplianceOverviewDashboard = ({ onNavigate, jurisdiction, activeProduct, selectedEntity, onSelectEntity }) => {
    const [isEntityDetailsModalOpen, setIsEntityDetailsModalOpen] = useState(false);
    const [selectedEntityForDetails, setSelectedEntityForDetails] = useState(null);

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
            default:
                console.log(`Unhandled action: ${action.cta} for ${action.title}`);
                break;
        }
    };
    
    // UPDATED: handleHotspotClick function for correct navigation
    const handleHotspotClick = (item) => {
        switch (item.id) {
            case 'CTRL-01': // Review KYC records
                onNavigate('DataManagement', { initialTab: 'Detailed Records', detailedRecordsFilters: { type: 'KYC', status: 'Pending' } });
                break;
            case 'CTRL-02': // Transaction Monitoring Rules
                onNavigate('Manage', { initialTab: 'rules' }); // Navigate to 'Manage' and activate the 'rules' tab
                break;
            case 'CTRL-03': // Sanctions Screening
                onNavigate('DataManagement', { initialTab: 'Detailed Records', detailedRecordsFilters: { type: 'Sanctions Check', status: 'All' } });
                break;
            default:
                console.log(`Unhandled hotspot action for ${item.name}`);
                break;
        }
    };
    
    // CORRECTED: This function now navigates to the Regulatory Updates page with the pulse item ID in the context.
    const handlePulseClick = (pulseItem) => {
        onNavigate('RegulatoryUpdates', { initialUpdateId: pulseItem.id });
    };

    // NEW: Handle entity selection from HeadquartersView to open modal
    const handleSelectEntityForDetails = (entityId) => {
        const entity = companyStructure.parent.id === entityId 
            ? { ...companyStructure.parent, products: ['All'], jurisdiction: 'Global' } // Add mock products and jurisdiction for parent
            : companyStructure.subsidiaries.find(sub => sub.id === entityId);
        
        if (entity) {
            // Add mock products and jurisdiction if not already present for subsidiaries
            if (!entity.products) {
                entity.products = ['Payments', 'Digital Assets']; // Example products
            }
            if (!entity.jurisdiction) {
                entity.jurisdiction = entity.location.includes('Nairobi') ? 'Kenya' : 
                                      entity.location.includes('London') ? 'Global' :
                                      entity.location.includes('São Paulo') ? 'Brazil' : 'Global';
            }

            setSelectedEntityForDetails(entity);
            setIsEntityDetailsModalOpen(true);
        }
        // Also call the original onSelectEntity if needed for other dashboard components
        onSelectEntity(entityId);
    };


    return (
        <div className="space-y-6">
            <ComplianceHealthScorecard onNavigate={onNavigate} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div className="theme-bg-card p-6 rounded-xl shadow-lg theme-text-primary">
                    <h3 className="text-xl font-semibold theme-text-highlight-color mb-4 flex items-center">
                        <FileText size={20} className="mr-3" /> Actionable Tasks & Deadlines
                    </h3>
                    <div className="space-y-4">
                        {filteredActions.length > 0 ? (
                           filteredActions.map(act => (
                               <ActionItem
                                   key={act.id}
                                   action={act}
                                   onActionClick={handleActionClick}
                               />
                           ))
                        ) : (
                            <div className="text-center py-4 theme-text-secondary">No urgent actions for this entity.</div>
                        )}
                    </div>
                </div>
                 <div className="theme-bg-card p-6 rounded-xl shadow-lg theme-text-primary flex flex-col h-full">
                    <h3 className="text-xl font-semibold theme-text-highlight-color mb-4 flex items-center">
                        <Book size={20} className="mr-3" /> Regulatory Pulse
                    </h3>
                    <div className="space-y-4 flex-grow">{filteredPulse.map(p => <PulseItem key={p.id} pulse={p} onClick={handlePulseClick} />)}</div>
                </div>
            </div>
            
            {/* REMOVED: HeadquartersView and BuildTeamCard components were previously rendered here. */}
             <ControlHotspotAnalysis data={controlHotspotData} onActionClick={handleHotspotClick} />

            {/* NEW: Render EntityComplianceDetailsModal */}
            {isEntityDetailsModalOpen && selectedEntityForDetails && (
                <EntityComplianceDetailsModal
                    entity={selectedEntityForDetails}
                    frameworks={mockFrameworks} // Pass mockFrameworks
                    rules={mockRules} // Pass mockRules
                    onClose={() => setIsEntityDetailsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default ComplianceOverviewDashboard;
