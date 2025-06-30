import React, { useState } from 'react';
import { Plus, Filter, Globe, Shield, Edit, ToggleLeft, ToggleRight } from 'lucide-react';

// Mock data for existing rules
const initialRules = [
    { id: 'RULE-001', name: 'High-Value Transaction Alert (Nigeria)', type: 'Web2', context: 'Nigeria - PSP', status: 'Active' },
    { id: 'RULE-002', name: 'VASP Travel Rule Threshold', type: 'Web3', context: 'Kenya - DASP', status: 'Active' },
    { id: 'RULE-003', name: 'Dormant Account Activity', type: 'Web2', context: 'Ghana - E-Money', status: 'Inactive' },
    { id: 'RULE-004', name: 'On-Chain Sanctions Screening', type: 'Web3', context: 'Global - DASP', status: 'Active' },
];

const RulesEngine = () => {
    const [rules, setRules] = useState(initialRules);

    const toggleStatus = (ruleId) => {
        setRules(currentRules =>
            currentRules.map(rule =>
                rule.id === ruleId
                    ? { ...rule, status: rule.status === 'Active' ? 'Inactive' : 'Active' }
                    : rule
            )
        );
    };

    return (
        <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white mt-6">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-xl font-semibold text-[#c0933e]">Intelligent Rules Engine</h3>
                    <p className="text-sm text-gray-400">Manage the codified rules that power platform automation.</p>
                </div>
                <button className="bg-blue-600 text-white font-bold py-2 px-3 rounded-md hover:bg-blue-500 flex items-center text-sm">
                    <Plus size={16} className="mr-2"/> Create New Rule
                </button>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4 mb-4 pb-4 border-b border-gray-700">
                <Filter size={16} className="text-gray-400"/>
                <select className="bg-gray-800 border-gray-600 rounded p-1 text-sm"><option>All Types</option><option>Web2</option><option>Web3</option></select>
                <select className="bg-gray-800 border-gray-600 rounded p-1 text-sm"><option>All Contexts</option><option>Nigeria</option><option>Kenya</option></select>
                <select className="bg-gray-800 border-gray-600 rounded p-1 text-sm"><option>All Statuses</option><option>Active</option><option>Inactive</option></select>
            </div>

            {/* Rules List */}
            <div className="space-y-3">
                {rules.map(rule => (
                    <div key={rule.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="mr-4">
                                {rule.type === 'Web3' ? <Shield className="text-purple-400" size={24}/> : <Globe className="text-blue-400" size={24}/>}
                            </div>
                            <div>
                                <p className="font-bold">{rule.name}</p>
                                <p className="text-xs text-gray-500">{rule.id} • Context: {rule.context}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center cursor-pointer" onClick={() => toggleStatus(rule.id)}>
                                {rule.status === 'Active' ? <ToggleRight className="text-green-500" size={32}/> : <ToggleLeft className="text-gray-500" size={32}/>}
                                <span className={`text-sm font-semibold ${rule.status === 'Active' ? 'text-green-400' : 'text-gray-500'}`}>{rule.status}</span>
                            </div>
                            <button className="p-2 rounded-md hover:bg-gray-700"><Edit size={18}/></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RulesEngine;
