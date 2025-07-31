// src/features/aiAgent/components/AIAgentConfiguration.jsx

import React, { useState, useEffect } from 'react';
// Removed FileText, BarChart2, Lightbulb, AlertTriangle as they are no longer used here
import { Save, Bot, PlayCircle, PauseCircle, Settings, Lightbulb } from 'lucide-react';

const AIAgentConfiguration = ({ onSaveAiConfig, initialAiConfig = {} }) => {
    const [aiStatus, setAiStatus] = useState(initialAiConfig.aiStatus || 'Active');
    const [enableRecommendations, setEnableRecommendations] = useState(
        initialAiConfig.enableRecommendations !== undefined ? initialAiConfig.enableRecommendations : true
    );
    const [modelVersion, setModelVersion] = useState(initialAiConfig.modelVersion || 'v2.1.0-alpha');
    const [lastTrainingDate, setLastTrainingDate] = useState(initialAiConfig.lastTrainingDate || '2025-07-15');
    const [smartContractMonitoring, setSmartContractMonitoring] = useState(
        initialAiConfig.smartContractMonitoring !== undefined ? initialAiConfig.smartContractMonitoring : true
    );

    // Removed mockInsights as it's no longer displayed here

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
                <Bot size={24} className="mr-3 text-gray-400" /> AI Agent Configuration
            </h3>

            {/* AI Status and Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6 border-b border-gray-700">
                <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-md">
                    {aiStatus === 'Active' ? <PlayCircle size={24} className="text-green-400" /> : <PauseCircle size={24} className="text-red-400" />}
                    <div>
                        <p className="text-sm font-semibold">AI Agent Status</p>
                        <p className="text-lg font-bold">{aiStatus}</p>
                        <button 
                            onClick={() => setAiStatus(aiStatus === 'Active' ? 'Inactive' : 'Active')}
                            className={`mt-1 px-2 py-1 text-xs rounded ${
                                aiStatus === 'Active' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                            } text-white`}
                        >
                            {aiStatus === 'Active' ? 'Deactivate' : 'Activate'}
                        </button>
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

            {/* Model Version and Training Date */}
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

            {/* Removed: Simulate AI Actions section */}
            {/* Removed: AI-Powered Insights & Recommendations section */}

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

export default AIAgentConfiguration;