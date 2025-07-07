import React, { useState } from 'react';
// Importing icons for the new structure
import { Cpu, ListChecks, Puzzle } from 'lucide-react';
// We will reuse the RulesEngine component we already built
import RulesEngine from '../components/manage/RulesEngine.jsx';

// Placeholder for the Task Management view
const TaskManagementView = () => (
    <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white mt-6">
        <h3 className="text-xl font-semibold text-[#c0933e]">Task Management</h3>
        <p className="text-gray-400 mt-4">A dashboard for assigning, tracking, and managing all compliance-related activities will be built here.</p>
    </div>
);

// Placeholder for the Integrations view
const IntegrationsView = () => (
    <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white mt-6">
        <h3 className="text-xl font-semibold text-[#c0933e]">3rd Party Integrations</h3>
        <p className="text-gray-400 mt-4">A center for managing connections to KYC/AML services, Regulator Suptech platforms, and Audit Management Systems will be built here.</p>
    </div>
);


const Manage = () => {
    // Default to the 'intelligence' tab
    const [activeTab, setActiveTab] = useState('intelligence');

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold text-gray-800">Manage Platform Core</h2>
                <p className="text-gray-500">Control the intelligence, automation, and ecosystem connectivity of the platform.</p>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-300">
                <button onClick={() => setActiveTab('intelligence')} className={`py-2 px-4 flex items-center text-lg font-semibold ${activeTab === 'intelligence' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>
                    <Cpu size={20} className="mr-2"/> Core Intelligence
                </button>
                <button onClick={() => setActiveTab('tasks')} className={`py-2 px-4 flex items-center text-lg font-semibold ${activeTab === 'tasks' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>
                    <ListChecks size={20} className="mr-2"/> Task Management
                </button>
                 <button onClick={() => setActiveTab('integrations')} className={`py-2 px-4 flex items-center text-lg font-semibold ${activeTab === 'integrations' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>
                    <Puzzle size={20} className="mr-2"/> Integrations
                </button>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'intelligence' && (
                // We are reusing the RulesEngine component here as the primary UI for intelligence
                <RulesEngine />
            )}
            {activeTab === 'tasks' && (
                <TaskManagementView />
            )}
            {activeTab === 'integrations' && (
                <IntegrationsView />
            )}
        </div>
    );
};

export default Manage;
