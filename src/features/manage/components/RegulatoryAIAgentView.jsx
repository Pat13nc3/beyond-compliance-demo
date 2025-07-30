// src/features/manage/components/RegulatoryAIAgentView.jsx

import React, { useState, useEffect } from 'react';
// CORRECTED: Added AlertTriangle to the import list
import { Save, Bot, PlayCircle, PauseCircle, Settings, CheckCircle, Clock, FileText, BarChart2, Lightbulb, AlertTriangle } from 'lucide-react';

const RegulatoryAIAgentView = ({ onSaveAiConfig, initialAiConfig = {}, onSimulateAiAction, onViewInsight }) => {
    const [aiStatus, setAiStatus] = useState(initialAiConfig.aiStatus || 'Active');
    const [enableRecommendations, setEnableRecommendations] = useState(
        initialAiConfig.enableRecommendations !== undefined ? initialAiConfig.enableRecommendations : true
    );
    const [modelVersion, setModelVersion] = useState(initialAiConfig.modelVersion || 'v2.1.0-alpha');
    const [lastTrainingDate, setLastTrainingDate] = useState(initialAiConfig.lastTrainingDate || '2025-07-15');
    const [smartContractMonitoring, setSmartContractMonitoring] = useState(
        initialAiConfig.smartContractMonitoring !== undefined ? initialAiConfig.smartContractMonitoring : true
    );

    const mockInsights = [
        { id: 'ins1', title: 'New Risk Pattern Identified', details: 'AI detected a correlation between high-value cross-border payments and unverified new users. Recommended review of KYC onboarding for specific regions.', date: '2025-07-28', type: 'Risk Analysis' },
        { id: 'ins2', title: 'Optimized Report Submission Schedule', details: 'AI recommends shifting Q3 SAR report submission from Aug 15 to Aug 10 for better resource allocation, based on historical data.', date: '2025-07-27', type: 'Recommendation' },
        { id: 'ins3', title: 'Potential Compliance Gap in New Regulation', details: 'AI highlights a potential oversight in the recently published CBN guidelines concerning digital asset service providers. Suggests review of Rule #45.', date: '2025-07-26', type: 'Alert' },
        { id: 'ins4', title: 'On-chain Anomaly Alert (Ethereum)', details: 'AI detected unusual transaction patterns from a smart contract address linked to a defi protocol. Recommends on-chain data verification.', date: '2025-07-25', type: 'Digital Asset Alert' },
    ];

    useEffect(() => {
        if (initialAiConfig) {
            setAiStatus(initialAiConfig.aiStatus || 'Active');
            setEnableRecommendations(initialAiConfig.enableRecommendations !== undefined ? initialAiConfig.enableRecommendations : true);
            setModelVersion(initialAiConfig.modelVersion || 'v2.1.0-alpha');
            setLastTrainingDate(initialAiConfig.lastTrainingDate || '2025-07-15');
            setSmartContractMonitoring(initialAiConfig.smartContractMonitoring !== undefined ? initialAiConfig.smartContractMonitoring : true);
        }
    }, [initialAiConfig]);

    const handleSave = () => {
        const configToSave = {
            aiStatus,
            enableRecommendations,
            modelVersion,
            lastTrainingDate,
            smartContractMonitoring,
        };
        onSaveAiConfig(configToSave);
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white space-y-6">
            <h3 className="text-xl font-semibold text-[#c0933e] mb-4 flex items-center">
                <Bot size={24} className="mr-3 text-gray-400" /> Regulatory AI Agent Overview
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6 border-b border-gray-700">
                <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-md">
                    {aiStatus === 'Active' ? <PlayCircle size={24} className="text-green-400" /> : <PauseCircle size={24} className="text-red-400" />}
                    <div>
                        <p className="text-sm font-semibold">AI Agent Status</p>
                        <p className="text-lg font-bold">{aiStatus}</p>
                    </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-md">
                    <div className="flex items-center space-x-3">
                        <Lightbulb size={24} className="text-gray-400" />
                        <div>
                            <p className="text-sm font-semibold">Enable Recommendations</p>
                            <p className="text-xs text-gray-400">Toggle AI-powered insights.</p>
                        </div>
                    </div>
                    <label htmlFor="enableRecommendationsToggle" className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            id="enableRecommendationsToggle"
                            className="sr-only peer"
                            checked={enableRecommendations}
                            onChange={() => setEnableRecommendations(!enableRecommendations)}
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-md">
                    <div className="flex items-center space-x-3">
                        <Settings size={24} className="text-gray-400" />
                        <div>
                            <p className="text-sm font-semibold">Smart Contract Monitoring</p>
                            <p className="text-xs text-gray-400">AI monitors on-chain requirements.</p>
                        </div>
                    </div>
                    <label htmlFor="smartContractToggle" className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            id="smartContractToggle"
                            className="sr-only peer"
                            checked={smartContractMonitoring}
                            onChange={() => setSmartContractMonitoring(!smartContractMonitoring)}
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="modelVersion" className="block text-sm font-medium text-gray-300 mb-2">AI Model Version</label>
                    <input
                        type="text"
                        id="modelVersion"
                        value={modelVersion}
                        onChange={(e) => setModelVersion(e.target.value)}
                        className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., v2.1.0-alpha"
                    />
                </div>
                <div>
                    <label htmlFor="lastTrainingDate" className="block text-sm font-medium text-gray-300 mb-2">Last Training Date</label>
                    <input
                        type="date"
                        id="lastTrainingDate"
                        value={lastTrainingDate}
                        onChange={(e) => setLastTrainingDate(e.target.value)}
                        className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            <div className="pt-6 border-t border-gray-700 mt-6">
                <h4 className="text-lg font-semibold text-gray-200 mb-4 flex items-center">
                    <PlayCircle size={20} className="mr-2 text-blue-400" /> Simulate AI Actions
                </h4>
                <p className="text-sm text-gray-400 mb-4">Trigger AI-powered outputs to see how the agent can assist with compliance tasks.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                        onClick={() => onSimulateAiAction('Generate Report Template')}
                        className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm flex items-center justify-center"
                    >
                        <FileText size={16} className="mr-2" /> Generate Report Template
                    </button>
                    <button
                        onClick={() => onSimulateAiAction('Generate Risk Assessment')}
                        className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm flex items-center justify-center"
                    >
                        <BarChart2 size={16} className="mr-2" /> Generate Risk Assessment
                    </button>
                    <button
                        onClick={() => onSimulateAiAction('Provide Recommendation')}
                        className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm flex items-center justify-center"
                    >
                        <Lightbulb size={16} className="mr-2" /> Provide Recommendation
                    </button>
                </div>
            </div>

            <div className="pt-6 border-t border-gray-700 mt-6">
                <h4 className="text-lg font-semibold text-gray-200 mb-4 flex items-center">
                    <CheckCircle size={20} className="mr-2 text-green-400" /> AI-Powered Insights & Recommendations
                </h4>
                <div className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar pr-2">
                    {mockInsights.map(insight => (
                        // Make each insight card clickable
                        <div
                            key={insight.id}
                            className="bg-gray-700 p-4 rounded-md cursor-pointer hover:bg-gray-600 transition-colors duration-200"
                            onClick={() => onViewInsight(insight)} // Call onViewInsight when clicked
                        >
                            <p className="font-semibold text-gray-100 mb-1 flex items-center">
                                {insight.type === 'Recommendation' && <Lightbulb size={16} className="mr-2 text-yellow-300" />}
                                {insight.type === 'Risk Analysis' && <BarChart2 size={16} className="mr-2 text-red-300" />}
                                {insight.type === 'Alert' && <AlertTriangle size={16} className="mr-2 text-orange-300" />}
                                {insight.type === 'Digital Asset Alert' && <Bot size={16} className="mr-2 text-blue-300" />}
                                {insight.title}
                            </p>
                            <p className="text-sm text-gray-300 line-clamp-2">{insight.details}</p>
                            <p className="text-xs text-gray-400 mt-2 flex items-center">
                                <Clock size={12} className="mr-1" /> {insight.date}
                            </p>
                        </div>
                    ))}
                    {mockInsights.length === 0 && (
                        <p className="text-gray-400 text-center py-4">No AI insights available at this time.</p>
                    )}
                </div>
                <p className="text-xs text-gray-500 mt-4">
                    These insights are generated by the Regulatory AI Agent. Always review and verify before taking action.
                </p>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-700 mt-6">
                <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-blue-500 flex items-center"
                >
                    <Save size={16} className="mr-2"/> Save AI Settings
                </button>
            </div>
        </div>
    );
};

export default RegulatoryAIAgentView;