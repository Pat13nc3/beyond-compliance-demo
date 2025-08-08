// src/features/aiAgent/index.jsx

import React, { useState, useEffect } from 'react';

// Import all AI Agent feature components and modals
import AIAgentOverview from './components/AIAgentOverview';
import AIAgentConfiguration from './components/AIAgentConfiguration';
import AIAgentActivityLog from './components/AIAgentActivityLog';
import AIAgentInsights from './components/AIAgentInsights';
import ViewAIInsightModal from './modals/ViewAIInsightModal';
import SimulateAIOutputModal from './modals/SimulateAIOutputModal';
import Toast from '../../components/ui/Toast';

// Import mock data needed for the AI Agent feature
import { mockAiActivities, mockAiInsights } from '../../data/mockData';
import { Bot, LayoutDashboard, Settings, Activity, Lightbulb, PlayCircle } from 'lucide-react';


const AIAgent = () => {
    const [activeView, setActiveView] = useState('overview');

    const [aiConfig, setAiConfig] = useState({
        aiStatus: 'Active',
        enableRecommendations: true,
        modelVersion: 'v2.1.0-alpha',
        lastTrainingDate: '2025-07-15',
        smartContractMonitoring: true,
    });
    const [selectedInsight, setSelectedInsight] = useState(null);
    const [isViewAIInsightModalOpen, setIsViewAIInsightModalOpen] = useState(false);
    const [isSimulateAIOutputModalOpen, setIsSimulateAIOutputModalOpen] = useState(false);
    const [simulateActionType, setSimulateActionType] = useState('');
    const [simulateOutputData, setSimulateOutputData] = useState({});
    const [toastMessage, setToastMessage] = useState('');

    const [chatMessages, setChatMessages] = useState([
        { sender: 'ai', text: "Hello! I'm your Regulatory AI Agent. How can I assist you with compliance today?" },
        { sender: 'ai', text: "You can ask me anything about regulations, reports, risks, or platform functionalities." }
    ]);
    const [currentChatInput, setCurrentChatInput] = useState('');

    // NEW: State for selected file for AI review
    const [selectedFileForReview, setSelectedFileForReview] = useState(null);

    // --- AI Agent Specific Handlers ---
    const handleSaveAiConfig = (newAiConfig) => {
        setAiConfig(newAiConfig);
        setToastMessage('AI Agent configuration saved successfully!');
    };

    const handleSimulateAiAction = (actionType) => {
        setSimulateActionType(actionType);
        setSimulateOutputData({ 
            modelVersion: aiConfig.modelVersion, 
            score: Math.floor(Math.random() * 100),
            result: `Simulated output for ${actionType}: The AI generated a preliminary report with a compliance score of ${Math.floor(Math.random() * 20) + 80}%.`
        });
        setIsSimulateAIOutputModalOpen(true);
        setToastMessage(`AI Action: "${actionType}" simulated successfully!`);
    };

    const handleViewInsightClick = (insight) => {
        setSelectedInsight(insight);
        setIsViewAIInsightModalOpen(true);
    };

    // NEW: Handler for file selection
    const handleFileSelectForAIReview = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFileForReview(file);
            setChatMessages(prevMessages => [...prevMessages, { sender: 'user', text: `Attached file: ${file.name}` }]);
            setToastMessage(`File selected for review: ${file.name}`);
        } else {
            setSelectedFileForReview(null);
        }
    };

    // Modified handleSendChatMessage to consider selected file
    const handleSendChatMessage = (message) => {
        if (message.trim() === '' && !selectedFileForReview) return;

        const userMessageText = selectedFileForReview 
            ? `(File: ${selectedFileForReview.name}) ${message.trim()}`
            : message.trim();

        setChatMessages(prevMessages => [...prevMessages, { sender: 'user', text: userMessageText }]);
        setCurrentChatInput('');

        // Simulate AI response
        setTimeout(() => {
            let aiResponse = "I'm still learning, but I can help with general compliance queries. Can you be more specific?";
            const lowerCaseMessage = message.toLowerCase();

            if (selectedFileForReview) {
                // Simulated AI response for file review
                aiResponse = `Thank you for uploading '${selectedFileForReview.name}'. I'm performing a simulated review now. Based on a quick scan, it appears to be a [document type, e.g., 'policy document']. What specific aspects of this document would you like me to analyze?`;
                setSelectedFileForReview(null); // Clear file after simulated "review"
                setToastMessage(`Simulated AI review of ${selectedFileForReview.name} initiated.`);
            } else if (lowerCaseMessage.includes("report") || lowerCaseMessage.includes("filing")) {
                aiResponse = "I can help you understand reporting requirements or even draft a report template. Which report are you interested in?";
            } else if (lowerCaseMessage.includes("kyc") || lowerCaseMessage.includes("customer")) {
                aiResponse = "Are you asking about KYC verification procedures, customer data management, or specific compliance checks?";
            } else if (lowerCaseMessage.includes("risk") || lowerCaseMessage.includes("aml")) {
                aiResponse = "I can analyze transaction patterns for AML risks or provide insights on operational risk factors. What risk area are you focusing on?";
            } else if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
                aiResponse = "Hello there! How can I assist you today?";
            } else if (lowerCaseMessage.includes("thank you") || lowerCaseMessage.includes("thanks")) {
                aiResponse = "You're welcome! Is there anything else?";
            } else if (lowerCaseMessage.includes("settings") || lowerCaseMessage.includes("configure")) {
                aiResponse = "You can find my configuration options under the 'Configuration' tab. There you can toggle recommendations, smart contract monitoring, and update my model version.";
            }

            setChatMessages(prevMessages => [...prevMessages, { sender: 'ai', text: aiResponse }]);
        }, 1000);
    };


    // Auto-clear toast message after a few seconds
    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => {
                setToastMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    const renderContent = () => {
        switch (activeView) {
            case 'overview':
                return (
                    <AIAgentOverview
                        aiConfig={aiConfig}
                        onSimulateAiAction={handleSimulateAiAction}
                        onViewInsight={handleViewInsightClick}
                        onNavigateToConfig={() => setActiveView('configuration')}
                        onNavigateToActivities={() => setActiveView('activities')}
                        onNavigateToInsights={() => setActiveView('insights')}
                        mockAiActivities={mockAiActivities}
                        mockAiInsights={mockAiInsights}
                        chatMessages={chatMessages}
                        currentChatInput={currentChatInput}
                        setCurrentChatInput={setCurrentChatInput}
                        onSendChatMessage={handleSendChatMessage}
                        // NEW: Pass file related props
                        selectedFileForReview={selectedFileForReview}
                        onFileSelectForAIReview={handleFileSelectForAIReview}
                    />
                );
            case 'configuration':
                return (
                    <AIAgentConfiguration
                        onSaveAiConfig={handleSaveAiConfig}
                        initialAiConfig={aiConfig}
                    />
                );
            case 'activities':
                return (
                    <AIAgentActivityLog
                        activities={mockAiActivities}
                    />
                );
            case 'insights':
                return (
                    <AIAgentInsights
                        insights={mockAiInsights}
                        onViewInsight={handleViewInsightClick}
                    />
                );
            default:
                return <AIAgentOverview />;
        }
    };

    return (
        <div className="p-6 theme-bg-page h-full theme-text-primary flex flex-col">
            <div className="max-w-7xl mx-auto flex flex-col h-full w-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-[32px] leading-[40px] font-bold theme-text-highlight-color">
                        <Bot size={32} className="inline-block mr-3 text-gray-400" /> Regulatory AI Agent
                    </h2>
                    <button
                        onClick={() => handleSimulateAiAction('Quick Check')}
                        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-blue-500 flex items-center"
                    >
                        <PlayCircle size={16} className="mr-2"/> Quick Simulate
                    </button>
                </div>

                <div className="border-b border-gray-700 mb-6 flex-shrink-0">
                    <nav className="-mb-px flex space-x-4">
                        <button
                            onClick={() => setActiveView('overview')}
                            className={`py-3 px-1 text-sm font-medium whitespace-nowrap ${activeView === 'overview' ? 'text-theme-text-highlight-color border-b-2 border-theme-text-highlight-color' : 'text-gray-400 hover:text-white'}`}
                        >
                            <LayoutDashboard size={18} className="inline-block mr-2" /> Overview
                        </button>
                        <button
                            onClick={() => setActiveView('configuration')}
                            className={`py-3 px-1 text-sm font-medium whitespace-nowrap ${activeView === 'configuration' ? 'text-theme-text-highlight-color border-b-2 border-theme-text-highlight-color' : 'text-gray-400 hover:text-white'}`}
                        >
                            <Settings size={18} className="inline-block mr-2" /> Configuration
                        </button>
                        <button
                            onClick={() => setActiveView('activities')}
                            className={`py-3 px-1 text-sm font-medium whitespace-nowrap ${activeView === 'activities' ? 'text-theme-text-highlight-color border-b-2 border-theme-text-highlight-color' : 'text-gray-400 hover:text-white'}`}
                        >
                            <Activity size={18} className="inline-block mr-2" /> Activity Log
                        </button>
                        <button
                            onClick={() => setActiveView('insights')}
                            className={`py-3 px-1 text-sm font-medium whitespace-nowrap ${activeView === 'insights' ? 'text-theme-text-highlight-color border-b-2 border-theme-text-highlight-color' : 'text-gray-400 hover:text-white'}`}
                        >
                            <Lightbulb size={18} className="inline-block mr-2" /> Insights
                        </button>
                    </nav>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {renderContent()}
                </div>
            </div>

            {isViewAIInsightModalOpen && (
                <ViewAIInsightModal
                    insight={selectedInsight}
                    onClose={() => { setIsViewAIInsightModalOpen(false); setSelectedInsight(null); }}
                />
            )}
            {isSimulateAIOutputModalOpen && (
                <SimulateAIOutputModal
                    actionType={simulateActionType}
                    outputData={simulateOutputData}
                    onClose={() => { setIsSimulateAIOutputModalOpen(false); setSimulateActionType(''); setSimulateOutputData({}); }}
                />
            )}

            {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}
        </div>
    );
};

export default AIAgent;