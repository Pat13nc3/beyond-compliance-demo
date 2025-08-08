// src/features/aiAgent/components/AIAgentOverview.jsx

import React, { useRef, useEffect } from 'react';
import {
    Bot, PlayCircle, PauseCircle, Settings, Lightbulb, Activity, Eye, FileText, BarChart2, TrendingUp, AlertTriangle, Send, Mic, Upload, XCircle
} from 'lucide-react'; // Added XCircle for clearing file

const AIAgentOverview = ({
    aiConfig,
    onSimulateAiAction,
    onViewInsight,
    onNavigateToConfig,
    onNavigateToActivities,
    onNavigateToInsights,
    mockAiActivities,
    mockAiInsights,
    chatMessages,
    currentChatInput,
    setCurrentChatInput,
    onSendChatMessage,
    // NEW: File related props
    selectedFileForReview,
    onFileSelectForAIReview,
}) => {
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null); // Ref to clear the file input

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages]);

    const aiHealth = aiConfig.aiStatus === 'Active' ? 'Operational' : 'Inactive';
    const healthColor = aiConfig.aiStatus === 'Active' ? 'text-green-400' : 'text-red-400';
    const healthIcon = aiConfig.aiStatus === 'Active' ? <PlayCircle size={24} /> : <PauseCircle size={24} />;

    const keyMetrics = [
        { id: 'insights', label: 'Insights Generated (Last 7 Days)', value: mockAiInsights.filter(i => (new Date() - new Date(i.date)) / (1000 * 60 * 60 * 24) <= 7).length, icon: <Lightbulb size={24} />, color: 'text-yellow-400' },
        { id: 'simulations', label: 'Simulations Run (Total)', value: 125, icon: <BarChart2 size={24} />, color: 'text-blue-400' },
        { id: 'complianceImpact', label: 'Compliance Impact Score', value: '92%', icon: <TrendingUp size={24} />, color: 'text-purple-400' },
    ];

    const handleInputKeyPress = (e) => {
        if (e.key === 'Enter' && (currentChatInput.trim() !== '' || selectedFileForReview)) {
            onSendChatMessage(currentChatInput);
            if (fileInputRef.current) { // Clear the file input after sending
                fileInputRef.current.value = '';
            }
        }
    };

    const handleClearFile = () => {
        onFileSelectForAIReview({ target: { files: [] } }); // Simulate clearing file input
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Clear the actual input field
        }
    };

    return (
        <div className="space-y-6">
            {/* AI Agent Status & Key Metrics (Condensed) */}
            <div className="theme-bg-card p-4 rounded-lg shadow-md theme-text-primary flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center space-x-3">
                    {healthIcon}
                    <div>
                        <p className="text-sm font-semibold theme-text-primary">AI Status:</p>
                        <p className="text-lg font-bold"><span className={healthColor}>{aiHealth}</span></p>
                    </div>
                </div>
                {keyMetrics.map(metric => (
                    <div key={metric.id} className="flex items-center space-x-2">
                        <span className={metric.color}>{metric.icon}</span>
                        <div>
                            <p className="text-sm font-semibold theme-text-primary">{metric.label}</p>
                            <p className="text-base font-bold theme-text-primary">{metric.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* AI Chat Section - Prominent */}
            <div className="theme-bg-card p-6 rounded-lg shadow-md theme-text-primary h-[60vh] flex flex-col relative">
                <h3 className="text-[20px] leading-[28px] font-semibold theme-text-highlight-color mb-4 flex items-center">
                    <Bot size={24} className="mr-3 theme-text-secondary" /> Chat with AI Agent
                </h3>

                {/* Chat Message History */}
                <div className="flex-grow overflow-y-auto custom-scrollbar p-2 mb-4 space-y-4">
                    {chatMessages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'theme-bg-page theme-text-primary'}`}>
                                <p className="text-sm">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} /> {/* Scroll target */}
                </div>

                {/* Chat Input */}
                <div className="flex flex-col border-t theme-border-color pt-4">
                    {selectedFileForReview && (
                        <div className="flex items-center theme-bg-card theme-text-secondary px-3 py-2 rounded-t-lg text-sm mb-1 -mt-4">
                            <FileText size={16} className="mr-2 text-blue-400" />
                            <span>{selectedFileForReview.name}</span>
                            <button onClick={handleClearFile} className="ml-auto theme-text-secondary hover:theme-text-primary">
                                <XCircle size={16} />
                            </button>
                        </div>
                    )}
                    <div className="flex items-center">
                        <input
                            type="file"
                            id="file-upload-input"
                            className="hidden"
                            onChange={onFileSelectForAIReview}
                            ref={fileInputRef} // Connect ref to input
                        />
                        <label 
                            htmlFor="file-upload-input" 
                            className="p-3 bg-gray-100 dark:bg-gray-700 rounded-l-lg theme-text-secondary hover:theme-text-primary cursor-pointer flex items-center justify-center"
                            title="Upload File for AI Review"
                        >
                            <Upload size={20} />
                        </label>

                        <input
                            type="text"
                            placeholder="Ask anything..."
                            value={currentChatInput}
                            onChange={(e) => setCurrentChatInput(e.target.value)}
                            onKeyPress={handleInputKeyPress}
                            className="flex-grow p-3 bg-gray-100 dark:bg-gray-700 border theme-border-color theme-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-r-none"
                        />
                        <button
                            onClick={() => onSendChatMessage(currentChatInput)}
                            className="p-3 bg-blue-600 rounded-r-lg text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Navigation Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <button
                    onClick={onNavigateToConfig}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-md text-base flex items-center justify-center"
                >
                    <Settings size={20} className="mr-2" /> Configure AI
                </button>
                <button
                    onClick={() => onSimulateAiAction('Generate Recommendation')}
                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-4 rounded-md text-base flex items-center justify-center"
                >
                    <PlayCircle size={20} className="mr-2" /> Simulate Action
                </button>
                <button
                    onClick={onNavigateToInsights}
                    className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-3 px-4 rounded-md text-base flex items-center justify-center"
                >
                    <Lightbulb size={20} className="mr-2" /> All Insights
                </button>
                <button
                    onClick={onNavigateToActivities}
                    className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-md text-base flex items-center justify-center"
                >
                    <Activity size={20} className="mr-2" /> Activity Log
                </button>
            </div>
        </div>
    );
};

export default AIAgentOverview;