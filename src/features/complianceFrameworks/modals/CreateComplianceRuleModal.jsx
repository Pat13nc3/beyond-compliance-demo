// src/features/complianceFrameworks/modals/CreateComplianceRuleModal.jsx

import React, { useState, useMemo } from 'react';
import { X, Save, FileText, Link, Book, Database } from 'lucide-react';
import { mockRegulatorySections, mockReports, mockDataSources } from '../../../data/mockData'; // Import mockReports and mockDataSources

const CreateComplianceRuleModal = ({ onClose, onSave, initialData }) => {
    const [ruleName, setRuleName] = useState(initialData?.name || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [status, setStatus] = useState(initialData?.status || 'Inactive');
    const [regulatorySource, setRegulatorySource] = useState(initialData?.regulatorySource || mockRegulatorySections[0].regulation);
    const [complianceClause, setComplianceClause] = useState(initialData?.complianceClause || '');
    // New states for linking to reports and data sources
    const [relatedReports, setRelatedReports] = useState(initialData?.relatedReports || []);
    const [relevantDataSources, setRelevantDataSources] = useState(initialData?.relevantDataSources || []);

    const handleSave = () => {
        // Updated validation logic to include new fields
        if (!ruleName || !regulatorySource || !complianceClause || relatedReports.length === 0 || relevantDataSources.length === 0) {
            alert('Please fill out all required fields for the rule, including related reports and data sources.');
            return;
        }

        const ruleId = initialData?.id || `RULE-${Date.now()}`;

        const newRule = {
            id: ruleId,
            name: ruleName,
            description: description,
            type: 'Compliance Control', 
            status: status,
            context: regulatorySource,
            regulatorySource,
            complianceClause,
            conditions: [], 
            actions: [], 
            relatedReports: relatedReports, // Save selected reports
            relevantDataSources: relevantDataSources // Save selected data sources
        };
        onSave(newRule);
        onClose();
    };
    
    // Filter clauses based on the selected regulatory source
    const filteredClauses = useMemo(() => {
        return mockRegulatorySections.filter(section => section.regulation === regulatorySource);
    }, [regulatorySource]);

    const handleReportCheckboxChange = (reportName) => {
        setRelatedReports(prev => 
            prev.includes(reportName) 
                ? prev.filter(name => name !== reportName)
                : [...prev, reportName]
        );
    };

    const handleDataSourceCheckboxChange = (dataSourceName) => {
        setRelevantDataSources(prev => 
            prev.includes(dataSourceName) 
                ? prev.filter(name => name !== dataSourceName)
                : [...prev, dataSourceName]
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="bg-[#1e252d] rounded-2xl shadow-2xl p-6 w-full max-w-2xl text-white">
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                    <h3 className="text-2xl font-bold text-[#c0933e]">{initialData?.id ? 'Edit Compliance Rule' : 'Create New Compliance Rule'}</h3>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Rule Name</label>
                        <input
                            type="text"
                            value={ruleName}
                            onChange={(e) => setRuleName(e.target.value)}
                            placeholder="e.g., High-Value Transaction Alert (VASP Bill)"
                            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Briefly describe what this rule enforces."
                            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e] h-20"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center"><FileText size={16} className="mr-2"/> Regulatory Source</label>
                            <select value={regulatorySource} onChange={(e) => setRegulatorySource(e.target.value)} className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e]">
                                {Array.from(new Set(mockRegulatorySections.map(s => s.regulation))).map(reg => (
                                    <option key={reg} value={reg}>{reg}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center"><Link size={16} className="mr-2"/> Compliance Clause</label>
                            <select value={complianceClause} onChange={(e) => setComplianceClause(e.target.value)} className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e]">
                                <option value="">Select Clause</option>
                                {filteredClauses.map(clause => (
                                    <option key={clause.id} value={clause.section}>{clause.section} - {clause.description}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Initial Status</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e]">
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    {/* New section for Reporting and Data Linkage with checkboxes */}
                    <div className="p-4 bg-gray-800 rounded-lg space-y-3">
                        <h4 className="font-bold mb-3 text-gray-300">Reporting & Data Linkage</h4>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center"><Book size={16} className="mr-2"/> Related Reports</label>
                            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-2">
                                {mockReports.map(report => (
                                    <div key={report.id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`report-${report.id}`}
                                            value={report.name}
                                            checked={relatedReports.includes(report.name)}
                                            onChange={() => handleReportCheckboxChange(report.name)}
                                            className="form-checkbox h-4 w-4 text-[#c0933e] rounded border-gray-600 bg-gray-700 focus:ring-[#c0933e]"
                                        />
                                        <label htmlFor={`report-${report.id}`} className="ml-2 text-sm text-gray-300">{report.name}</label>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-gray-400 mt-1">Select one or more reports this rule contributes to.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center"><Database size={16} className="mr-2"/> Relevant Data Sources</label>
                            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-2">
                                {mockDataSources.map(source => (
                                    <div key={source.id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`dataSource-${source.id}`}
                                            value={source.name}
                                            checked={relevantDataSources.includes(source.name)}
                                            onChange={() => handleDataSourceCheckboxChange(source.name)}
                                            className="form-checkbox h-4 w-4 text-[#c0933e] rounded border-gray-600 bg-gray-700 focus:ring-[#c0933e]"
                                        />
                                        <label htmlFor={`dataSource-${source.id}`} className="ml-2 text-sm text-gray-300">{source.name}</label>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-gray-400 mt-1">Select data sources that this rule monitors or uses.</p>
                        </div>
                    </div>

                </div>
                <div className="flex justify-end pt-6 mt-6 border-t border-gray-700">
                    <button type="button" onClick={onClose} className="bg-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 mr-2">
                        Cancel
                    </button>
                    <button type="button" onClick={handleSave} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-blue-500 flex items-center">
                        <Save size={16} className="mr-2"/> Save Rule
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateComplianceRuleModal;
