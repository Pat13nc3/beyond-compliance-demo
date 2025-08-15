// src/features/manage/components/RulesEngine.jsx

import React, { useState, useMemo } from 'react';
import { Plus, Edit, ToggleLeft, ToggleRight, Layers, AlertTriangle, Play, Info, Lightbulb } from 'lucide-react';

const RulesEngine = ({ rules, onCreateRule, onEditRule, onToggleRuleStatus, onTestRule, triggerAIAnalysis }) => {
  const [filterByContext, setFilterByContext] = useState('All');

  const uniqueContexts = useMemo(() => {
    const contexts = rules.map(rule => rule.context);
    return ['All', ...new Set(contexts)];
  }, [rules]);

  const filteredRules = useMemo(() => {
    if (filterByContext === 'All') {
      return rules;
    }
    return rules.filter(rule => rule.context === filterByContext);
  }, [rules, filterByContext]);

  const getStatusClasses = (status) => {
    return status === 'Active'
      ? 'bg-green-700 text-green-200'
      : 'bg-gray-600 text-gray-300';
  };

  const handleAIAnalyzeRule = (rule) => {
    if (triggerAIAnalysis) {
      triggerAIAnalysis({
        ruleName: rule.name,
        ruleDescription: rule.description,
        ruleType: rule.type,
        conditions: rule.conditions,
        actions: rule.actions,
      }, 'RuleSummary');
    }
  };

  return (
    <div className="p-6 theme-bg-card rounded-xl shadow-lg theme-text-primary">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold theme-text-highlight-color">Rules Engine</h3>
        <div className="flex items-center space-x-4">
          <select
            value={filterByContext}
            onChange={(e) => setFilterByContext(e.target.value)}
            className="p-2 border theme-border-color rounded-md bg-gray-100 dark:bg-gray-800 theme-text-primary focus:ring-blue-500 focus:border-blue-500"
          >
            {uniqueContexts.map(context => (
              <option key={context} value={context}>
                {context === 'All' ? 'Filter by Context: All' : context}
              </option>
            ))}
          </select>
          <button
            onClick={onCreateRule}
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center text-sm"
          >
            <Plus size={16} className="mr-2" /> Create New Rule
          </button>
        </div>
      </div>

      <div className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-700 theme-text-primary p-4 rounded-lg mb-6 flex items-center space-x-3">
          <Info size={24} className="flex-shrink-0 text-yellow-600 dark:text-yellow-200" />
          <p className="text-sm font-bold text-yellow-800 dark:text-yellow-200">
              **Important Disclaimer:** Rules configured here can trigger automated actions and influence compliance outputs. Ultimate responsibility for the accuracy, legality, and compliance of any information or actions based on AI-generated output or automated rules **lies with the end user.** Ensure appropriate human oversight and legal accountability.
          </p>
      </div>

      <div className="space-y-4">
        {filteredRules.length === 0 ? (
          <p className="theme-text-secondary text-center py-8">No rules defined yet. Click "Create New Rule" to get started.</p>
        ) : (
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
                  {rule.status === 'Active' && (
                      <button
                          onClick={() => onTestRule(rule)}
                          className="p-1 rounded-full text-green-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-green-300"
                          title="Test Rule (Simulate Trigger)"
                      >
                          <Play size={20} />
                      </button>
                  )}
                  {/* NEW AI Analyze button */}
                  <button
                      onClick={() => handleAIAnalyzeRule(rule)}
                      className="p-1 rounded-full text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-purple-300"
                      title="AI Analyze Rule"
                  >
                      <Lightbulb size={20} />
                  </button>
                  <button
                    onClick={() => onToggleRuleStatus(rule.id)}
                    className="p-1 rounded-full theme-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-theme-text-primary"
                    title={rule.status === 'Active' ? 'Deactivate Rule' : 'Activate Rule'}
                  >
                    {rule.status === 'Active' ? <ToggleLeft size={20} /> : <ToggleRight size={20} />}
                  </button>
                  <button
                    onClick={() => onEditRule(rule)}
                    className="p-1 rounded-full theme-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-theme-text-primary"
                    title="Edit Rule"
                  >
                    <Edit size={20} />
                  </button>
                </div>
              </div>
              {/* Detailed Rule Logic Summary */}
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
        )}
      </div>
    </div>
  );
};

export default RulesEngine;