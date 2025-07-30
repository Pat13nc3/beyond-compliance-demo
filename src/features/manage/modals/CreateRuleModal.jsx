// src/features/manage/modals/CreateRuleModal.jsx

import React, { useState, useEffect } from 'react';
import { X, Save, Layers, AlertTriangle, PlusCircle, MinusCircle } from 'lucide-react';

const CreateRuleModal = ({ onClose, onSave, initialData }) => {
    // Use optional chaining (?.) to safely access properties of initialData
    const [ruleName, setRuleName] = useState(initialData?.name || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [ruleType, setRuleType] = useState(initialData?.type || 'Web2');
    const [status, setStatus] = useState(initialData?.status || 'Inactive');

    // Ensure conditions and actions are always arrays, even if initialData.conditions/actions are null/undefined
    const [conditions, setConditions] = useState(
        initialData?.conditions?.length > 0
            ? initialData.conditions
            : [{ field: 'Transaction Value', operator: 'exceeds', value: '' }]
    );

    const [actions, setActions] = useState(
        initialData?.actions?.length > 0
            ? initialData.actions
            : [{ type: 'Create Alert' }]
    );

    const handleAddCondition = () => {
        setConditions([...conditions, { field: 'Transaction Value', operator: 'exceeds', value: '' }]);
    };

    const handleRemoveCondition = (index) => {
        const newConditions = conditions.filter((_, i) => i !== index);
        setConditions(newConditions);
    };

    const handleConditionChange = (index, key, value) => {
        const newConditions = [...conditions];
        newConditions[index][key] = value;
        setConditions(newConditions);
    };

    const handleAddAction = () => {
        setActions([...actions, { type: 'Create Alert' }]);
    };

    const handleRemoveAction = (index) => {
        const newActions = actions.filter((_, i) => i !== index);
        setActions(newActions);
    };

    const handleActionChange = (index, key, value) => {
        const newActions = [...actions];
        newActions[index][key] = value;
        setActions(newActions);
    };

    const handleSave = () => {
        // Basic validation: rule name and at least one condition value must not be empty
        if (!ruleName || conditions.some(c => !c.value) || actions.length === 0) {
            alert('Please fill out all required fields for the rule, its conditions, and actions.');
            return;
        }

        const ruleId = initialData?.id || `RULE-${Math.floor(Math.random() * 900) + 100}`;

        const newRule = {
            id: ruleId,
            name: ruleName,
            description: description,
            type: ruleType,
            status: status,
            context: 'Global - Dynamic', // Placeholder: this would be more complex/dynamic
            conditions: conditions,
            actions: actions
        };
        onSave(newRule);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="bg-[#1e252d] rounded-2xl shadow-2xl p-6 w-full max-w-2xl text-white">
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                    <h3 className="text-2xl font-bold text-[#c0933e]">{initialData?.id ? 'Edit Rule' : 'Create New Rule'}</h3> {/* Dynamic Title */}
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
                            placeholder="e.g., High-Value Transaction Alert (Nigeria)"
                            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Briefly describe what this rule does."
                            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e] h-20"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Rule Type</label>
                        <select value={ruleType} onChange={(e) => setRuleType(e.target.value)} className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e]">
                            <option value="Web2">Web2 (Traditional Finance)</option>
                            <option value="Web3">Web3 (Digital Assets)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Initial Status</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e]">
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="p-4 bg-gray-800 rounded-lg space-y-3">
                        <h4 className="font-bold mb-3 text-gray-300">Rule Logic (IF...)</h4>
                        {conditions.map((cond, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <Layers size={20} className="text-gray-400"/>
                                <select
                                    value={cond.field}
                                    onChange={(e) => handleConditionChange(index, 'field', e.target.value)}
                                    className="w-1/3 p-2 bg-gray-700 rounded-md"
                                >
                                    <option>Transaction Value</option>
                                    <option>User Country</option>
                                    <option>Transaction Frequency</option>
                                    <option>KYC Status</option>
                                    <option>Digital Asset Type</option>
                                </select>
                                <select
                                    value={cond.operator}
                                    onChange={(e) => handleConditionChange(index, 'operator', e.target.value)}
                                    className="w-1/4 p-2 bg-gray-700 rounded-md"
                                >
                                    <option>exceeds</option>
                                    <option>is equal to</option>
                                    <option>is from</option>
                                    <option>contains</option>
                                    <option>is less than</option>
                                </select>
                                <input
                                    type="text"
                                    value={cond.value}
                                    onChange={(e) => handleConditionChange(index, 'value', e.target.value)}
                                    placeholder="Value..."
                                    className="w-1/2 p-2 bg-gray-700 rounded-md"
                                />
                                {conditions.length > 1 && (
                                    <button onClick={() => handleRemoveCondition(index)} className="p-1 text-red-400 hover:text-red-300">
                                        <MinusCircle size={20} />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button onClick={handleAddCondition} className="mt-2 text-blue-400 hover:text-blue-300 flex items-center text-sm">
                            <PlusCircle size={16} className="mr-1" /> Add another condition
                        </button>
                    </div>

                    <div className="p-4 bg-gray-800 rounded-lg space-y-3">
                        <h4 className="font-bold mb-3 text-gray-300">Action (THEN...)</h4>
                        {actions.map((act, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <AlertTriangle size={20} className="text-gray-400"/>
                                <select
                                    value={act.type}
                                    onChange={(e) => handleActionChange(index, 'type', e.target.value)}
                                    className="w-full p-2 bg-gray-700 rounded-md"
                                >
                                    <option>Create Alert</option>
                                    <option>Flag for Review</option>
                                    <option>Block Transaction</option>
                                    <option>Generate Report</option>
                                    <option>Trigger Workflow</option>
                                </select>
                                {actions.length > 1 && (
                                    <button onClick={() => handleRemoveAction(index)} className="p-1 text-red-400 hover:text-red-300">
                                        <MinusCircle size={20} />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button onClick={handleAddAction} className="mt-2 text-blue-400 hover:text-blue-300 flex items-center text-sm">
                            <PlusCircle size={16} className="mr-1" /> Add another action
                        </button>
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

export default CreateRuleModal;