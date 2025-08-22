// src/features/complianceFrameworks/modals/EntityComplianceDetailsModal.jsx

import React from 'react';
import { X, Shield, FileText, CheckCircle, AlertTriangle, Building2, Link2 } from 'lucide-react';

const EntityComplianceDetailsModal = ({ entity, frameworks, rules, onClose }) => {
    if (!entity) return null;

    // Filter frameworks applicable to this entity
    const applicableFrameworks = frameworks.filter(fw =>
        (fw.linkedProducts.includes('All') || entity.products.some(p => fw.linkedProducts.includes(p))) &&
        (fw.jurisdiction === 'Global' || fw.jurisdiction === entity.jurisdiction)
    );

    // Filter rules associated with these frameworks or directly with the entity's context
    const applicableRules = rules.filter(rule =>
        applicableFrameworks.some(fw => fw.name === rule.context) ||
        rule.context.includes(entity.companyName) // Assuming some rules might be directly named for entities
    );

    // Mock compliance health score for the entity
    const mockComplianceScore = entity.complianceScore || Math.floor(Math.random() * 30) + 70; // Random score between 70-99
    const complianceStatus = mockComplianceScore >= 90 ? 'Excellent' : mockComplianceScore >= 80 ? 'Good' : 'Needs Attention';
    const complianceColor = mockComplianceScore >= 90 ? 'text-green-500' : mockComplianceScore >= 80 ? 'text-yellow-500' : 'text-red-500';
    const complianceIcon = mockComplianceScore >= 80 ? <CheckCircle size={20} className={complianceColor} /> : <AlertTriangle size={20} className={complianceColor} />;


    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="theme-bg-card rounded-2xl shadow-2xl p-6 w-full max-w-3xl theme-text-primary max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center mb-4 border-b theme-border-color pb-3">
                    <h3 className="text-2xl font-bold theme-text-highlight-color flex items-center">
                        <Building2 size={24} className="mr-3 theme-text-secondary" /> Compliance Details: {entity.companyName}
                    </h3>
                    <button onClick={onClose} className="p-1 rounded-full theme-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 space-y-6">
                    {/* Entity Overview */}
                    <div className="p-4 theme-bg-card-alt rounded-lg border theme-border-color">
                        <h4 className="text-lg font-semibold theme-text-primary mb-2">Overview</h4>
                        <p className="text-sm theme-text-secondary">
                            **Location:** {entity.location}
                        </p>
                        <p className="text-sm theme-text-secondary">
                            **Status:** <span className="font-semibold">{entity.status}</span>
                        </p>
                        <p className="text-sm theme-text-secondary flex items-center mt-2">
                            **Overall Compliance Health:**
                            <span className={`ml-2 font-bold flex items-center ${complianceColor}`}>
                                {complianceIcon} {mockComplianceScore}% ({complianceStatus})
                            </span>
                        </p>
                    </div>

                    {/* Applicable Frameworks */}
                    <div className="p-4 theme-bg-card-alt rounded-lg border theme-border-color">
                        <h4 className="text-lg font-semibold theme-text-primary mb-2 flex items-center">
                            <Shield size={20} className="mr-2 text-blue-400" /> Applicable Compliance Frameworks
                        </h4>
                        {applicableFrameworks.length > 0 ? (
                            <ul className="space-y-2">
                                {applicableFrameworks.map(fw => (
                                    <li key={fw.id} className="text-sm theme-text-secondary flex items-center">
                                        <Link2 size={16} className="mr-2 text-gray-500" />
                                        <span className="font-semibold theme-text-primary">{fw.name}</span>
                                        <span className="ml-2 text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full">{fw.jurisdiction}</span>
                                        <span className="ml-2 text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full">{fw.status}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm theme-text-secondary italic">No specific frameworks linked to this entity.</p>
                        )}
                    </div>

                    {/* Associated Rules */}
                    <div className="p-4 theme-bg-card-alt rounded-lg border theme-border-color">
                        <h4 className="text-lg font-semibold theme-text-primary mb-2 flex items-center">
                            <FileText size={20} className="mr-2 text-green-400" /> Associated Compliance Rules
                        </h4>
                        {applicableRules.length > 0 ? (
                            <ul className="space-y-2">
                                {applicableRules.map(rule => (
                                    <li key={rule.id} className="text-sm theme-text-secondary flex items-start">
                                        <span className="mr-2 text-gray-500">•</span>
                                        <div className="flex-grow">
                                            <span className="font-semibold theme-text-primary">{rule.name}</span>
                                            <p className="text-xs theme-text-secondary">{rule.description}</p>
                                        </div>
                                        <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${rule.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                                            {rule.status}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm theme-text-secondary italic">No specific rules directly associated with this entity or its linked frameworks.</p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t theme-border-color mt-6">
                    <button
                        onClick={onClose}
                        className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EntityComplianceDetailsModal;
