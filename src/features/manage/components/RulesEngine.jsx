// src/features/manage/components/RulesEngine.jsx

import React from 'react';
import { Plus, Edit, ToggleLeft, ToggleRight, Layers, AlertTriangle, Play, Info } from 'lucide-react'; // Added Info icon

// RulesEngine now receives actual rules, and callbacks for edit and toggle status
const RulesEngine = ({ rules, onCreateRule, onEditRule, onToggleRuleStatus, onTestRule }) => {

  const getStatusClasses = (status) => {
    return status === 'Active'
      ? 'bg-green-700 text-green-200'
      : 'bg-gray-600 text-gray-300';
  };

  return (
    <div className="p-6 bg-[#1e252d] rounded-xl shadow-lg text-white">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-[#c0933e]">Rules Engine</h3>
        <button
          onClick={onCreateRule}
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center text-sm"
        >
          <Plus size={16} className="mr-2" /> Create New Rule
        </button>
      </div>

      {/* NEW: AI Responsibility Disclaimer */}
      <div className="bg-yellow-900 bg-opacity-30 border border-yellow-700 text-yellow-200 p-4 rounded-lg mb-6 flex items-center space-x-3">
          <Info size={24} className="flex-shrink-0" />
          <p className="text-sm">
              **Important Disclaimer:** Rules configured here can trigger automated actions and influence compliance outputs. Ultimate responsibility for the accuracy, legality, and compliance of any information or actions based on AI-generated output or automated rules **lies with the end user.** Ensure appropriate human oversight and legal accountability.
          </p>
      </div>


      <div className="space-y-4">
        {rules.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No rules defined yet. Click "Create New Rule" to get started.</p>
        ) : (
          rules.map(rule => (
            <div key={rule.id} className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-bold text-gray-100">{rule.name} <span className="text-sm text-gray-400">({rule.type})</span></p>
                  <p className="text-sm text-gray-400">{rule.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses(rule.status)}`}>
                    {rule.status}
                  </span>
                  {rule.status === 'Active' && (
                      <button
                          onClick={() => onTestRule(rule)}
                          className="p-1 rounded-full text-green-400 hover:bg-gray-700 hover:text-green-300"
                          title="Test Rule (Simulate Trigger)"
                      >
                          <Play size={20} />
                      </button>
                  )}
                  <button
                    onClick={() => onToggleRuleStatus(rule.id)}
                    className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white"
                    title={rule.status === 'Active' ? 'Deactivate Rule' : 'Activate Rule'}
                  >
                    {rule.status === 'Active' ? <ToggleLeft size={20} /> : <ToggleRight size={20} />}
                  </button>
                  <button
                    onClick={() => onEditRule(rule)}
                    className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white"
                    title="Edit Rule"
                  >
                    <Edit size={20} />
                  </button>
                </div>
              </div>
              {/* Detailed Rule Logic Summary */}
              <div className="text-xs text-gray-500 mt-2 space-y-1">
                <p className="flex items-center">
                  <Layers size={14} className="mr-1 inline-block text-gray-600" />
                  <span className="font-semibold text-gray-400">IF: </span>
                  {rule.conditions && rule.conditions.map((c, i) => (
                    <span key={i} className="ml-1 px-2 py-0.5 bg-gray-700 rounded-sm">
                      {c.field} {c.operator} "{c.value}"{i < rule.conditions.length - 1 && <span className="text-gray-500"> AND</span>}
                    </span>
                  ))}
                </p>
                <p className="flex items-center">
                  <AlertTriangle size={14} className="mr-1 inline-block text-gray-600" />
                  <span className="font-semibold text-gray-400">THEN: </span>
                  {rule.actions && rule.actions.map((a, i) => (
                    <span key={i} className="ml-1 px-2 py-0.5 bg-gray-700 rounded-sm">
                      {a.type}{i < rule.actions.length - 1 && <span className="text-gray-500"> AND</span>}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RulesEngine;