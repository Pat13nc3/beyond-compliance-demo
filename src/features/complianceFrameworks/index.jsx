// src/features/complianceFrameworks/index.jsx

import React, { useState, useMemo, useEffect } from 'react';
import { Plus, Edit, FileText, UploadCloud, Shield, CheckCheck, Link, Database, Sparkles, Eye, Link2, X, AlertTriangle, Layers, Save, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { mockRules, mockRegulatorySections } from '../../data/mockData';
import CreateComplianceRuleModal from './modals/CreateComplianceRuleModal';
import IngestRegulationModal from './modals/IngestRegulationModal';
import CreateFrameworkModal from './modals/CreateFrameworkModal';
import LinkFrameworkModal from './modals/LinkFrameworkModal';

const mockFrameworks = [
    { id: 'fw-1', name: 'AML Act 2023 Compliance', status: 'Published', totalRequirements: 52, linkedProducts: ['Payments', 'Lending'] },
    { id: 'fw-2', name: 'VASP Bill 2024 Framework', status: 'Published', totalRequirements: 11, linkedProducts: ['Digital Assets'] },
    { id: 'fw-3', name: 'KYC Regulation 2022', status: 'Published', totalRequirements: 25, linkedProducts: ['All'] },
    { id: 'fw-4', name: 'Novice Framework', status: 'Not Published', totalRequirements: 2, linkedProducts: [] },
    { id: 'fw-5', name: 'NEX TAX FRAMEWORK', status: 'Not Published', totalRequirements: 3, linkedProducts: [] },
];

const FrameworksView = ({ frameworks, onCreateFramework, onViewFramework, onEditFramework, onLinkFramework }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
            className="theme-bg-card p-6 rounded-xl shadow-lg border-2 border-dashed border-gray-500 hover:border-blue-500 transition-colors flex flex-col items-center justify-center text-center cursor-pointer min-h-[200px]"
            onClick={onCreateFramework}
        >
            <Plus size={32} className="theme-text-secondary" />
            <span className="mt-4 font-semibold theme-text-primary">Create New Framework</span>
        </div>
        {frameworks.map(fw => (
            <div key={fw.id} className="theme-bg-card p-6 rounded-xl shadow-lg border-2 theme-border-color flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold theme-text-primary">{fw.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${fw.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                            {fw.status}
                        </span>
                    </div>
                    <p className="text-sm theme-text-secondary">Total Requirements: {fw.totalRequirements}</p>
                    <p className="text-sm theme-text-secondary">Linked Products: {fw.linkedProducts.join(', ')}</p>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t theme-border-color">
                    <button onClick={() => onViewFramework(fw)} className="text-blue-500 hover:text-blue-400 flex items-center text-sm font-medium">
                        <FileText size={16} className="mr-1" /> View Framework
                    </button>
                    <div className="flex space-x-2">
                        <button onClick={() => onEditFramework(fw)} className="text-gray-500 hover:text-gray-400 flex items-center text-sm font-medium">
                            <Edit size={16} className="mr-1" /> Edit
                        </button>
                        <button onClick={() => onLinkFramework(fw)} className="text-purple-500 hover:text-purple-400 flex items-center text-sm font-medium">
                            <Link2 size={16} className="mr-1" /> Link
                        </button>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

const ViewFrameworkDetailsModal = ({ framework, onClose, onEdit, rules, onEditRule }) => {
    const filteredRules = useMemo(() => {
        return rules.filter(rule => rule.context === framework.name);
    }, [rules, framework]);

    const getStatusClasses = (status) => {
        return status === 'Active'
            ? 'bg-green-700 text-green-200'
            : 'bg-gray-600 text-gray-300';
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="theme-bg-card rounded-2xl shadow-2xl p-6 w-full max-w-3xl theme-text-primary max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4 border-b theme-border-color pb-3">
                    <h3 className="text-2xl font-bold theme-text-highlight-color">Framework Details</h3>
                    <button onClick={onClose} className="p-1 rounded-full theme-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-4">
                    <h4 className="text-xl font-bold">{framework.name}</h4>
                    <p className="text-sm theme-text-secondary">Status: {framework.status}</p>
                    <p className="text-sm theme-text-secondary">Total Requirements: {framework.totalRequirements}</p>
                    <p className="text-sm theme-text-secondary">Linked Products: {framework.linkedProducts.join(', ')}</p>
                </div>
                
                <div className="mt-6">
                    <h4 className="text-xl font-bold theme-text-highlight-color mb-3">Linked Rules ({filteredRules.length})</h4>
                    <div className="space-y-3">
                        {filteredRules.length > 0 ? (
                            filteredRules.map(rule => (
                                <div key={rule.id} className="theme-bg-card-alt p-4 rounded-lg border theme-border-color">
                                    <div className="flex items-center justify-between mb-2">
                                        <div>
                                            <p className="font-bold theme-text-primary">{rule.name} <span className="text-sm theme-text-secondary">({rule.type})</span></p>
                                            <p className="text-sm theme-text-secondary">{rule.description}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses(rule.status)}`}>
                                                {rule.status}
                                            </span>
                                            <button onClick={() => onEditRule(rule)} className="p-1 rounded-full theme-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-theme-text-primary" title="Edit Rule">
                                                <Edit size={20} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-xs theme-text-secondary mt-2 space-y-1">
                                        <p className="flex items-center">
                                            <Layers size={14} className="mr-1 inline-block theme-text-secondary" />
                                            <span className="font-semibold theme-text-primary">IF: </span>
                                            {rule.conditions && rule.conditions.map((c, i) => (
                                                <span key={i} className="ml-1 px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-sm">
                                                    {c.field} {c.operator} "{c.value}"{i < rule.conditions.length - 1 && <span className="theme-text-secondary"> AND</span>}
                                                </span>
                                            ))}
                                        </p>
                                        <p className="flex items-center">
                                            <AlertTriangle size={14} className="mr-1 inline-block theme-text-secondary" />
                                            <span className="font-semibold theme-text-primary">THEN: </span>
                                            {rule.actions && rule.actions.map((a, i) => (
                                                <span key={i} className="ml-1 px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-sm">
                                                    {a.type}{i < rule.actions.length - 1 && <span className="theme-text-secondary"> AND</span>}
                                                </span>
                                            ))}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="theme-text-secondary text-center py-4">No rules are currently linked to this framework.</p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end mt-4 pt-4 border-t theme-border-color">
                    <button onClick={() => onEdit(framework)} className="bg-blue-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 text-white mr-2">
                        <Edit size={16} className="mr-2" /> Edit Framework
                    </button>
                    <button onClick={onClose} className="bg-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 text-white">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};


const ComplianceFrameworks = ({ context, onClearContext }) => {
    const [rules, setRules] = useState(mockRules);
    const [isCreateRuleModalOpen, setIsCreateRuleModalOpen] = useState(false);
    const [editingRule, setEditingRule] = useState(null);
    const [frameworks, setFrameworks] = useState(mockFrameworks);
    const [isIngestModalOpen, setIsIngestModalOpen] = useState(false);
    const [isCreateFrameworkModalOpen, setIsCreateFrameworkModalOpen] = useState(false);
    const [isLinkFrameworkModalOpen, setIsLinkFrameworkModalOpen] = useState(false);
    const [selectedFramework, setSelectedFramework] = useState(null);

    const [isViewFrameworkModalOpen, setIsViewFrameworkModalOpen] = useState(false);
    const [selectedFrameworkToView, setSelectedFrameworkToView] = useState(null);

    // New state for editing
    const [isEditFrameworkModalOpen, setIsEditFrameworkModalOpen] = useState(false);
    const [editingFramework, setEditingFramework] = useState(null);

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

    const handleCreateFramework = () => {
        setEditingFramework(null); // Ensure a blank form for new creation
        setIsCreateFrameworkModalOpen(true);
    };

    const handleViewFramework = (framework) => {
        setSelectedFrameworkToView(framework);
        setIsViewFrameworkModalOpen(true);
    };
    
    // New handler for opening the edit modal
    const handleEditFramework = (framework) => {
        setEditingFramework(framework);
        setIsEditFrameworkModalOpen(true);
        setIsViewFrameworkModalOpen(false); // Close view modal if open
    };
    
    // New handler for saving/updating a framework
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
                <h2 className="text-3xl font-bold theme-text-highlight-color">Compliance Frameworks</h2>
                <p className="theme-text-secondary">
                    Create and manage your compliance frameworks, ingest new laws, and define the rules that govern your platform.
                </p>

                <div className="flex justify-between items-center">
                     <h3 className="text-xl font-semibold theme-text-primary">Frameworks Library</h3>
                     <button onClick={handleIngestRegulation} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center text-sm">
                        <UploadCloud size={16} className="mr-2" /> Ingest New Regulation
                     </button>
                </div>
                
                <FrameworksView
                    frameworks={mockFrameworks}
                    onCreateFramework={handleCreateFramework}
                    onViewFramework={handleViewFramework}
                    onEditFramework={handleEditFramework}
                    onLinkFramework={handleLinkFramework}
                />
            </div>
             {isCreateRuleModalOpen && (
                <CreateComplianceRuleModal
                    onClose={() => { setIsCreateRuleModalOpen(false); setEditingRule(null); }}
                    onSave={handleSaveRule}
                    initialData={editingRule}
                />
            )}
            {isIngestModalOpen && <IngestRegulationModal onClose={() => setIsIngestModalOpen(false)} onSave={() => {}} />}

            {/* This modal is now used for both creation and editing */}
            {isCreateFrameworkModalOpen && (
                <CreateFrameworkModal onClose={() => setIsCreateFrameworkModalOpen(false)} onSave={handleSaveFramework} />
            )}
            {isEditFrameworkModalOpen && (
                <CreateFrameworkModal onClose={() => setIsEditFrameworkModalOpen(false)} onSave={handleSaveFramework} initialData={editingFramework} />
            )}

            {isLinkFrameworkModalOpen && <LinkFrameworkModal framework={selectedFramework} onClose={() => setIsLinkFrameworkModalOpen(false)} />}
            
            {isViewFrameworkModalOpen && selectedFrameworkToView && (
                <ViewFrameworkDetailsModal 
                    framework={selectedFrameworkToView} 
                    onClose={() => setIsViewFrameworkModalOpen(false)}
                    onEdit={handleEditFramework}
                    rules={rules}
                    onEditRule={handleEditRule}
                />
            )}
        </div>
    );
};

export default ComplianceFrameworks;