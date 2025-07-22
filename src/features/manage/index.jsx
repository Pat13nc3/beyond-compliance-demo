// src/features/manage/index.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { Settings, Users, Link, FileText, GanttChart } from 'lucide-react';

// Component Imports
import UserManagement from './components/UserManagement';
import Integrations from './components/Integrations';
import Alerts from './components/Alerts';
import RulesEngine from './components/RulesEngine'; // Assuming you have a RulesEngine component
import TaskManagementBoard from './components/TaskManagementBoard';

// Modal Imports
import CreateRuleModal from './modals/CreateRuleModal';
import CreateTaskModal from './modals/CreateTaskModal';
import { mockUsers, mockRoles, mockAlerts, mockIntegrations } from '../../data/mockData';

// Manage component receives `context` and `onCleanContext` from App.jsx
const Manage = ({ jurisdiction, context, onCleanContext }) => {
    const [activeTab, setActiveTab] = useState('users'); // Default active tab
    const [users, setUsers] = useState(mockUsers);
    const [roles, setRoles] = useState(mockRoles);
    const [alerts, setAlerts] = useState(mockAlerts);
    const [integrations, setIntegrations] = useState(mockIntegrations);

    const [isCreateRuleModalOpen, setIsCreateRuleModalOpen] = useState(false);
    const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

    // NEW: useEffect to handle context passed for initial tab setting
    useEffect(() => {
        if (context && context.initialTab) {
            setActiveTab(context.initialTab);
            // Clean up context after processing it to prevent re-triggering
            if (onCleanContext) {
                onCleanContext();
            }
        }
    }, [context, onCleanContext]); // Add onCleanContext to dependencies

    const handleInviteUser = (newUser) => {
        setUsers(prev => [...prev, newUser]);
    };

    const handleSaveUser = (updatedUser) => {
        setUsers(prev => prev.map(user => user.id === updatedUser.id ? updatedUser : user));
    };

    const handleDeleteUser = (userId) => {
        setUsers(prev => prev.filter(user => user.id !== userId));
    };

    const handleCreateRule = (newRule) => {
        console.log("Creating new rule:", newRule);
        setIsCreateRuleModalOpen(false);
        // In a real app, you'd add this to your mock data or state management
    };

    const handleCreateTask = (newTask) => {
        console.log("Creating new task:", newTask);
        setIsCreateTaskModalOpen(false);
        // In a real app, add to tasks state for TaskManagementBoard
    };

    // Filter alerts by jurisdiction (if applicable, though mockAlerts don't have jurisdiction)
    const filteredAlerts = useMemo(() => {
        // Example: If alerts had a jurisdiction property
        // if (jurisdiction && jurisdiction !== 'Global') {
        //    return alerts.filter(alert => alert.jurisdiction === jurisdiction);
        // }
        return alerts;
    }, [alerts, jurisdiction]);


    const renderContent = () => {
        switch (activeTab) {
            case 'users':
                return <UserManagement users={users} roles={roles} onInvite={handleInviteUser} onSaveUser={handleSaveUser} onDeleteUser={handleDeleteUser} />;
            case 'integrations':
                return <Integrations integrations={integrations} />;
            case 'alerts':
                return <Alerts alerts={filteredAlerts} />;
            case 'rules': // This case will be hit when initialTab is 'rules'
                return <RulesEngine onCreateRule={() => setIsCreateRuleModalOpen(true)} />;
            case 'tasks':
                return <TaskManagementBoard onCreateTask={() => setIsCreateTaskModalOpen(true)} />;
            default:
                return <UserManagement users={users} roles={roles} onInvite={handleInviteUser} onSaveUser={handleSaveUser} onDeleteUser={handleDeleteUser} />;
        }
    };

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">Manage Compliance Operations</h2>
                </div>
                <div className="border-b border-gray-700 mb-6">
                    <nav className="-mb-px flex space-x-8">
                        {/* Tab buttons */}
                        <button onClick={() => setActiveTab('users')} className={`py-3 px-1 text-sm font-medium whitespace-nowrap ${activeTab === 'users' ? 'text-[#c0933e] border-b-2 border-[#c0933e]' : 'text-gray-400 hover:text-white'}`}>
                            <Users size={18} className="inline-block mr-2" /> User & Access
                        </button>
                        <button onClick={() => setActiveTab('integrations')} className={`py-3 px-1 text-sm font-medium whitespace-nowrap ${activeTab === 'integrations' ? 'text-[#c0933e] border-b-2 border-[#c0933e]' : 'text-gray-400 hover:text-white'}`}>
                            <Link size={18} className="inline-block mr-2" /> Integrations
                        </button>
                        <button onClick={() => setActiveTab('alerts')} className={`py-3 px-1 text-sm font-medium whitespace-nowrap ${activeTab === 'alerts' ? 'text-[#c0933e] border-b-2 border-[#c0933e]' : 'text-gray-400 hover:text-white'}`}>
                            <Settings size={18} className="inline-block mr-2" /> Alerts
                        </button>
                        <button onClick={() => setActiveTab('rules')} className={`py-3 px-1 text-sm font-medium whitespace-nowrap ${activeTab === 'rules' ? 'text-[#c0933e] border-b-2 border-[#c0933e]' : 'text-gray-400 hover:text-white'}`}>
                            <FileText size={18} className="inline-block mr-2" /> Rules Engine
                        </button>
                        <button onClick={() => setActiveTab('tasks')} className={`py-3 px-1 text-sm font-medium whitespace-nowrap ${activeTab === 'tasks' ? 'text-[#c0933e] border-b-2 border-[#c0933e]' : 'text-gray-400 hover:text-white'}`}>
                            <GanttChart size={18} className="inline-block mr-2" /> Task Management
                        </button>
                    </nav>
                </div>

                <div className="mt-6">
                    {renderContent()}
                </div>
            </div>

            {isCreateRuleModalOpen && <CreateRuleModal onClose={() => setIsCreateRuleModalOpen(false)} onCreate={handleCreateRule} />}
            {isCreateTaskModalOpen && <CreateTaskModal onClose={() => setIsCreateTaskModalOpen(false)} onCreate={handleCreateTask} />}
        </div>
    );
};

export default Manage;