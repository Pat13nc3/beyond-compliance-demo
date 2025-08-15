// src/features/complianceFrameworks/modals/CreateFrameworkModal.jsx

import React, { useState, useEffect } from 'react';
import { X, Save, Shield, PlusCircle, MinusCircle, Layers, AlertTriangle } from 'lucide-react';
import { mockProjects } from "../../../data/mockData";

const CreateFrameworkModal = ({ onClose, onSave, initialData }) => {
    const [name, setName] = useState(initialData?.name || '');
    const [status, setStatus] = useState(initialData?.status || 'Not Published');
    const [linkedProducts, setLinkedProducts] = useState(initialData?.linkedProducts || []);
    const [rulesToCreate, setRulesToCreate] = useState(initialData?.rules || [{ name: '', conditions: [{ field: 'Transaction Value', operator: 'exceeds', value: '' }], actions: [{ type: 'Create Alert' }] }]);

    const handleProductChange = (e) => {
        const { value, checked } = e.target;
        setLinkedProducts(prev => 
            checked ? [...prev, value] : prev.filter(p => p !== value)
        );
    };

    const handleAddRule = () => {
        setRulesToCreate(prev => [...prev, { name: '', conditions: [{ field: 'Transaction Value', operator: 'exceeds', value: '' }], actions: [{ type: 'Create Alert' }] }]);
    };
    
    const handleRemoveRule = (index) => {
        setRulesToCreate(prev => prev.filter((_, i) => i !== index));
    };

    const handleRuleChange = (ruleIndex, fieldName, value) => {
        setRulesToCreate(prev => prev.map((rule, i) => 
            i === ruleIndex ? { ...rule, [fieldName]: value } : rule
        ));
    };
    
    const handleRuleConditionChange = (ruleIndex, conditionIndex, fieldName, value) => {
        setRulesToCreate(prev => prev.map((rule, i) => {
            if (i === ruleIndex) {
                const newConditions = [...rule.conditions];
                newConditions[conditionIndex][fieldName] = value;
                return { ...rule, conditions: newConditions };
            }
            return rule;
        }));
    };
    
    const handleAddCondition = (ruleIndex) => {
        setRulesToCreate(prev => prev.map((rule, i) => 
            i === ruleIndex ? { ...rule, conditions: [...rule.conditions, { field: 'Transaction Value', operator: 'exceeds', value: '' }] } : rule
        ));
    };
    
    const handleRemoveCondition = (ruleIndex, conditionIndex) => {
        setRulesToCreate(prev => prev.map((rule, i) => {
            if (i === ruleIndex) {
                const newConditions = rule.conditions.filter((_, j) => j !== conditionIndex);
                return { ...rule, conditions: newConditions };
            }
            return rule;
        }));
    };
    
    const handleSave = () => {
        if (!name) {
            alert('Framework name is required.');
            return;
        }

        const frameworkData = {
            id: initialData?.id || `fw-${Date.now()}`,
            name,
            status,
            totalRequirements: rulesToCreate.length,
            linkedProducts
        };
        
        const newRules = rulesToCreate.map(rule => ({
            ...rule,
            id: `rule-${Date.now() + Math.random()}`,
            context: frameworkData.name, // Link rule to framework by name
            type: 'Compliance Control',
            status: 'Active',
            description: rule.description || `Rule for ${frameworkData.name}`,
            actions: rule.actions, // Preserve actions from state
            conditions: rule.conditions // Preserve conditions from state
        }));

        onSave(frameworkData, newRules);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="theme-bg-card rounded-2xl shadow-2xl p-6 w-full max-w-4xl theme-text-primary max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4 border-b theme-border-color pb-3">
                    <h3 className="text-2xl font-bold theme-text-highlight-color">{initialData?.name ? 'Edit Framework' : 'Create New Framework'}</h3>
                    <button onClick={onClose} className="p-1 rounded-full theme-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-4">
                    {/* Framework Details Section */}
                    <div className="p-4 theme-bg-card-alt rounded-lg">
                        <h4 className="text-lg font-bold theme-text-primary mb-2">Framework Details</h4>
                        <div>
                            <label className="block text-sm font-medium theme-text-secondary mb-2">Framework Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g., AML Act 2023 Compliance"
                                className="w-full p-2 border theme-border-color rounded-md theme-bg-card theme-text-primary focus:ring-yellow-500 focus:border-yellow-500"
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium theme-text-secondary mb-2">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full p-2 border theme-border-color rounded-md theme-bg-card theme-text-primary"
                            >
                                <option>Not Published</option>
                                <option>Published</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium theme-text-secondary mb-2">Linked Products</label>
                            <div className="grid grid-cols-2 gap-2 p-3 theme-bg-card-alt rounded-md max-h-40 overflow-y-auto">
                                {mockProjects.map(p => (
                                    <label key={p.id} className="flex items-center text-sm theme-text-primary">
                                        <input
                                            type="checkbox"
                                            value={p.name}
                                            checked={linkedProducts.includes(p.name)}
                                            onChange={handleProductChange}
                                            className="h-4 w-4 text-blue-600 rounded"
                                        />
                                        <span className="ml-2">{p.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Rule Definition Section */}
                    <div className="mt-6 p-4 theme-bg-card-alt rounded-lg">
                        <h4 className="text-lg font-bold theme-text-primary mb-2">Define Associated Rules</h4>
                        <p className="text-sm theme-text-secondary mb-4">These rules will be automatically linked to this framework and added to the Rules Engine.</p>
                        {rulesToCreate.map((rule, ruleIndex) => (
                            <div key={ruleIndex} className="p-4 border theme-border-color rounded-lg mb-4 space-y-2">
                                <div className="flex justify-between items-center">
                                    <h5 className="font-semibold theme-text-primary">Rule {ruleIndex + 1}</h5>
                                    {rulesToCreate.length > 1 && (
                                        <button onClick={() => handleRemoveRule(ruleIndex)} className="p-1 text-red-400 hover:text-red-300">
                                            <MinusCircle size={20} />
                                        </button>
                                    )}
                                </div>
                                <input
                                    type="text"
                                    value={rule.name}
                                    onChange={(e) => handleRuleChange(ruleIndex, 'name', e.target.value)}
                                    placeholder="Rule Name (e.g., High-Value Transaction Alert)"
                                    className="w-full p-2 border theme-border-color rounded-md theme-bg-card theme-text-primary"
                                />
                                {rule.conditions.map((cond, condIndex) => (
                                    <div key={condIndex} className="flex items-center space-x-2">
                                        <Layers size={18} className="text-gray-400"/>
                                        <select value={cond.field} onChange={e => handleRuleConditionChange(ruleIndex, condIndex, 'field', e.target.value)} className="w-1/3 p-2 bg-gray-700 rounded-md">
                                            <option>Transaction Value</option>
                                            <option>User Country</option>
                                        </select>
                                        <select value={cond.operator} onChange={e => handleRuleConditionChange(ruleIndex, condIndex, 'operator', e.target.value)} className="w-1/4 p-2 bg-gray-700 rounded-md">
                                            <option>exceeds</option>
                                            <option>is equal to</option>
                                        </select>
                                        <input type="text" value={cond.value} onChange={e => handleRuleConditionChange(ruleIndex, condIndex, 'value', e.target.value)} placeholder="Value..." className="w-1/2 p-2 bg-gray-700 rounded-md"/>
                                        {rule.conditions.length > 1 && (
                                            <button onClick={() => handleRemoveCondition(ruleIndex, condIndex)} className="p-1 text-red-400 hover:text-red-300">
                                                <MinusCircle size={18} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button onClick={() => handleAddCondition(ruleIndex)} className="mt-2 text-blue-400 hover:text-blue-300 flex items-center text-sm">
                                    <PlusCircle size={16} className="mr-1" /> Add another condition
                                </button>
                            </div>
                        ))}
                        <button onClick={handleAddRule} className="mt-2 text-blue-400 hover:text-blue-300 flex items-center text-sm">
                            <PlusCircle size={16} className="mr-1" /> Add another rule
                        </button>
                    </div>

                </div>
                <div className="flex justify-end pt-6 mt-6 border-t theme-border-color">
                    <button type="button" onClick={onClose} className="bg-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 text-white mr-2">
                        Cancel
                    </button>
                    <button type="button" onClick={handleSave} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-blue-500 flex items-center">
                        <Save size={16} className="mr-2" /> {initialData?.name ? 'Save Changes' : 'Create Framework'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateFrameworkModal;