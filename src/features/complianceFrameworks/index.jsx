// src/features/complianceFrameworks/index.jsx

import React, { useState, useMemo, useEffect } from 'react';
import { Plus, Edit, FileText, UploadCloud, Shield, CheckCheck, Link, Database, Sparkles, Eye, Link2, X, AlertTriangle, Layers, Save, Trash2, ToggleLeft, ToggleRight, Lightbulb, UserCheck, Book, LayoutDashboard } from 'lucide-react';
// Import necessary components from dashboard
import WelcomeSignage from '../dashboard/components/WelcomeSignage.jsx';
import ComplianceHealthScorecard from '../dashboard/components/ComplianceHealthScorecard.jsx';
import ActionItem from '../dashboard/components/ActionItem.jsx';
import PulseItem from '../dashboard/components/PulseItem.jsx';
import HeadquartersView from '../dashboard/components/HeadquartersView.jsx';
import BuildTeamCard from '../dashboard/components/BuildTeamCard.jsx';
import ControlHotspotAnalysis from '../dashboard/components/ControlHotspotAnalysis.jsx';
// Import mock data needed for the dashboard view
import {
    mockRules, // Ensure mockRules is imported
    mockRegulatorySections,
    mockFrameworks, // Ensure mockFrameworks is imported
    currentUser,
    initialPriorityActions,
    regulatoryPulseData,
    companyStructure,
    controlHotspotData,
} from '../../data/mockData.js';
import CreateComplianceRuleModal from './modals/CreateComplianceRuleModal.jsx';
import IngestRegulationModal from './modals/IngestRegulationModal.jsx';
import CreateFrameworkModal from './modals/CreateFrameworkModal.jsx';
import LinkFrameworkModal from './modals/LinkFrameworkModal.jsx';
import ComplianceOverviewDashboard from './components/ComplianceOverviewDashboard.jsx';
import FrameworksView from './components/FrameworksView.jsx';
import EntityComplianceDetailsModal from './modals/EntityComplianceDetailsModal.jsx'; // Import the new modal


const ComplianceFrameworks = ({ activeProduct, jurisdiction, context, onClearContext, selectedEntity, onSelectEntity, onNavigate }) => {
    const [rules, setRules] = useState(mockRules);
    const [isCreateRuleModalOpen, setIsCreateRuleModalOpen] = useState(false);
    const [editingRule, setEditingRule] = useState(null);
    const [frameworks, setFrameworks] = useState(mockFrameworks);
    const [isIngestModalOpen, setIsIngestModalOpen] = useState(false);
    const [isCreateFrameworkModalOpen, setIsCreateFrameworkModalOpen] = useState(false);
    const [isLinkFrameworkModalOpen, setIsLinkFrameworkModalOpen] = useState(false);
    const [selectedFramework, setSelectedFramework] = useState(null);

    const [isEditFrameworkModalOpen, setIsEditFrameworkModalOpen] = useState(false);
    const [editingFramework, setEditingFramework] = useState(null);

    const [regulatorySections, setRegulatorySections] = useState(mockRegulatorySections);
    const [activeTab, setActiveTab] = useState('overview');

    const filteredFrameworks = useMemo(() => {
        let filtered = frameworks;
        if (activeProduct && activeProduct !== 'All Products') {
            filtered = filtered.filter(fw => fw.linkedProducts.includes(activeProduct) || fw.linkedProducts.includes('All'));
        }
        if (jurisdiction && jurisdiction !== 'Global') {
             filtered = filtered.filter(fw => fw.jurisdiction === jurisdiction || fw.jurisdiction === 'Global');
        }
        return filtered;
    }, [frameworks, activeProduct, jurisdiction]);

    useEffect(() => {
        if (context?.initialData) {
            setEditingRule(context.initialData);
            setIsCreateRuleModalOpen(true);
            onClearContext();
        }
    }, [context, onClearContext]);

    const handleIngestRegulation = () => {
        setIsIngestModalOpen(true);
    };

    const handleSaveRegulation = (newRegulation, newFramework) => {
        setRegulatorySections(prev => [...prev, newRegulation]);
        setFrameworks(prev => [...prev, newFramework]);
        setIsIngestModalOpen(false);
    };

    const handleCreateFramework = () => {
        setEditingFramework(null);
        setIsCreateFrameworkModalOpen(true);
    };

    const handleViewFramework = (framework) => {
        console.log("View Framework Details for:", framework.name);
    };

    const handleEditFramework = (framework) => {
        setEditingFramework(framework);
        setIsEditFrameworkModalOpen(true);
    };

    const handleSaveFramework = (frameworkToSave) => {
        if (frameworkToSave.id) {
            setFrameworks(prev => prev.map(fw => fw.id === frameworkToSave.id ? frameworkToSave : fw));
        } else {
            setFrameworks(prev => [...prev, { ...frameworkToSave, id: `fw-${Date.now()}` }]);
        }
        setIsCreateFrameworkModalOpen(false);
        setIsEditFrameworkModalOpen(false);
        setEditingFramework(null);
    };


    const handleLinkFramework = (framework) => {
        setSelectedFramework(framework);
        setIsLinkFrameworkModalOpen(true);
    };

    const handleCreateRule = () => {
        setEditingRule(null);
        setIsCreateRuleModalOpen(true);
    };

    const handleEditRule = (rule) => {
        setEditingRule(rule);
        setIsCreateRuleModalOpen(true);
    };

    const handleSaveRule = (ruleToSave) => {
        if (ruleToSave.id) {
            setRules(prevRules => prevRules.map(rule =>
                rule.id === ruleToSave.id ? ruleToSave : rule
            ));
        } else {
            setRules(prevRules => [...prevRules, { ...ruleToSave, id: `rule-${Date.now()}` }]);
        }
        setIsCreateRuleModalOpen(false);
        setEditingRule(null);
    };

    const handleToggleRuleStatus = (ruleId) => {
        setRules(prevRules => prevRules.map(rule =>
            rule.id === ruleId ? { ...rule, status: rule.status === 'Active' ? 'Inactive' : 'Active' } : rule
        ));
    };

    return (
        <div className="p-6 theme-bg-page min-h-screen theme-text-primary">
            <div className="space-y-6 animate-fade-in">
                 <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold theme-text-primary">Compliance Frameworks</h1>
                        <p className="theme-text-secondary">Manage and create compliance frameworks and their associated rules.</p>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="border-b-2 theme-border-color">
                    <nav className="-mb-0.5 flex space-x-6">
                        <button onClick={() => setActiveTab('overview')} className={`py-3 px-1 text-sm font-medium whitespace-nowrap ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'theme-text-secondary hover:text-blue-600'}`}>
                            <LayoutDashboard size={18} className="inline-block mr-2" /> Overview
                        </button>
                        <button onClick={() => setActiveTab('frameworks')} className={`py-3 px-1 text-sm font-medium whitespace-nowrap ${activeTab === 'frameworks' ? 'text-blue-600 border-b-2 border-blue-600' : 'theme-text-secondary hover:text-blue-600'}`}>
                            <Shield size={18} className="inline-block mr-2" /> Frameworks
                        </button>
                    </nav>
                </div>

                {/* Conditional Content Rendering */}
                {activeTab === 'overview' && (
                    <ComplianceOverviewDashboard
                        onNavigate={onNavigate}
                        jurisdiction={jurisdiction}
                        activeProduct={activeProduct}
                        selectedEntity={selectedEntity}
                        onSelectEntity={onSelectEntity}
                        // Pass mock data for frameworks and rules
                        frameworks={frameworks} 
                        rules={rules} 
                    />
                )}
                
                {activeTab === 'frameworks' && (
                    <FrameworksView
                        frameworks={filteredFrameworks}
                        onCreateFramework={handleCreateFramework}
                        onViewFramework={handleViewFramework}
                        onEditFramework={handleEditFramework}
                        onLinkFramework={handleLinkFramework}
                        onIngestRegulation={handleIngestRegulation}
                    />
                )}
            </div>
             {isCreateRuleModalOpen && (
                <CreateComplianceRuleModal
                    onClose={() => { setIsCreateRuleModalOpen(false); setEditingRule(null); }}
                    onSave={handleSaveRule}
                    initialData={editingRule}
                />
            )}
            {isIngestModalOpen && <IngestRegulationModal onClose={() => setIsIngestModalOpen(false)} onSave={handleSaveRegulation} />}

            {/* This modal is now used for both creation and editing */}
            {isCreateFrameworkModalOpen && (
                <CreateFrameworkModal onClose={() => setIsCreateFrameworkModalOpen(false)} onSave={handleSaveFramework} regulatorySections={regulatorySections} />
            )}
            {isEditFrameworkModalOpen && (
                <CreateFrameworkModal onClose={() => setIsEditFrameworkModalOpen(false)} onSave={handleSaveFramework} initialData={editingFramework} regulatorySections={regulatorySections} />
            )}

            {isLinkFrameworkModalOpen && <LinkFrameworkModal framework={selectedFramework} onClose={() => setIsLinkFrameworkModalOpen(false)} />}
        </div>
    );
};

export default ComplianceFrameworks;
