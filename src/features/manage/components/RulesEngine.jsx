// src/features/manage/components/RulesEngine.jsx

import React from 'react';
import { Plus } from 'lucide-react';

const RulesEngine = ({ onCreateRule }) => {
  // Ensure mockRules is always an array
  const mockRules = [
    { id: 'rule-1', name: 'High-Value Transaction Alert', description: 'Flags transactions over $10,000.', status: 'Active' },
    { id: 'rule-2', name: 'KYC Document Expiry', description: 'Alerts on KYC documents expiring within 30 days.', status: 'Active' },
    { id: 'rule-3', name: 'Sanctioned Entity Check', description: 'Blocks transactions with sanctioned entities.', status: 'Inactive' },
  ];

  return (
    <div className="p-6 bg-[#1e252d] rounded-xl shadow-lg text-white">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-[#c0933e]">Rules Engine</h3>
        <button onClick={onCreateRule} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center text-sm">
          <Plus size={16} className="mr-2" /> Create New Rule
        </button>
      </div>

      <div className="space-y-4">
        {/* Ensure mockRules is always an array before calling map */}
        {mockRules && mockRules.map(rule => ( 
          <div key={rule.id} className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
            <div>
              <p className="font-bold text-gray-100">{rule.name}</p>
              <p className="text-sm text-gray-400">{rule.description}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${rule.status === 'Active' ? 'bg-green-700 text-green-200' : 'bg-gray-600 text-gray-300'}`}>
              {rule.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RulesEngine;