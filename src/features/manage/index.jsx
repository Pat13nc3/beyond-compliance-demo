import React, { useState } from 'react';
import { Cpu, ListChecks, Puzzle, Plus, Edit, Trash2, Power, PowerOff, Zap } from 'lucide-react';
import CreateRuleModal from './modals/CreateRuleModal.jsx';
import CreateTaskModal from './modals/CreateTaskModal.jsx';
import ActionMenu from '../../components/ui/ActionMenu.jsx';
// --- CORRECT: We only import what exists in your file ---
import { mockIntegrations } from '../../data/mockData.js';

// --- STABLE FIX: Use an empty array for rules since it's not in mockData.js ---
const mockRules = [];

// --- Rules Engine View ---
const RulesEngine = ({ rules, onOpenCreateModal }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold">Core Intelligence: Rules Engine</h3><button onClick={onOpenCreateModal} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center"><Plus size={20} className="mr-2" /> Create New Rule</button></div>
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead><tr className="border-b"><th className="text-left py-3 px-4 text-sm font-medium uppercase text-gray-500">Rule Name</th><th className="text-left py-3 px-4 text-sm font-medium uppercase text-gray-500">Type</th><th className="text-left py-3 px-4 text-sm font-medium uppercase text-gray-500">Status</th><th className="text-right py-3 px-4 text-sm font-medium uppercase text-gray-500">Actions</th></tr></thead>
                <tbody>
                    {rules.length > 0 ? rules.map(rule => (
                        <tr key={rule.id} className="border-b hover:bg-gray-50"><td className="px-4 py-4 font-medium">{rule.name}</td><td className="px-4 py-4 text-gray-600">{rule.type}</td><td className="px-4 py-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${rule.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{rule.status}</span></td><td className="px-4 py-4 text-right"><ActionMenu items={[{ label: 'Edit', icon: Edit }, { label: 'Delete', icon: Trash2 }]} /></td></tr>
                    )) : <tr><td colSpan="4" className="text-center py-8 text-gray-500">No rules defined.</td></tr>}
                </tbody>
            </table>
        </div>
    </div>
);

// --- Task Management View ---
const TaskManagementBoard = ({ onCreateTaskClick }) => {
    const [tasks] = useState({'To Do': [{ id: 'task-1', content: 'Review new CBN guidelines' }],'In Progress': [{ id: 'task-3', content: 'Prepare VASP White Paper' }],'Done': [{ id: 'task-4', content: 'Submit Q2 AML Summary' }]});
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold">Compliance Task Board</h3><button onClick={onCreateTaskClick} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center"><Plus size={20} className="mr-2" /> Create New Task</button></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(tasks).map(([status, taskList]) => (
                    <div key={status} className="bg-gray-50 p-4 rounded-lg"><h4 className="font-bold text-gray-600 mb-4">{status} ({taskList.length})</h4><div className="space-y-3">{taskList.map(task => (<div key={task.id} className="bg-white p-3 rounded-md shadow border"><p className="text-sm text-gray-800">{task.content}</p></div>))}</div></div>
                ))}
            </div>
        </div>
    );
};

// --- Integrations View ---
const IntegrationsView = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold">Ecosystem Integrations</h3><button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center"><Plus size={20} className="mr-2" /> Add Integration</button></div>
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead><tr className="border-b"><th className="text-left py-3 px-4 text-sm font-medium uppercase text-gray-500">Integration</th><th className="text-left py-3 px-4 text-sm font-medium uppercase text-gray-500">Type</th><th className="text-left py-3 px-4 text-sm font-medium uppercase text-gray-500">Status</th><th className="text-right py-3 px-4 text-sm font-medium uppercase text-gray-500">Actions</th></tr></thead>
                <tbody>
                    {mockIntegrations.map(item => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-4 font-medium flex items-center"><Zap size={16} className="mr-3 text-yellow-500" />{item.name}</td>
                            <td className="px-4 py-4 text-gray-600">{item.type}</td>
                            <td className="px-4 py-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{item.status}</span></td>
                            <td className="px-4 py-4 text-right"><ActionMenu items={[{ label: 'Toggle Status', icon: item.status === 'Active' ? PowerOff : Power }, { label: 'Settings', icon: Edit }]} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

// --- MAIN MANAGE PAGE ---
const Manage = () => {
    const [activeTab, setActiveTab] = useState('tasks');
    const [isCreateRuleModalOpen, setIsCreateRuleModalOpen] = useState(false);
    const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

    return (
        <div className="p-6">
            <div className="space-y-6 animate-fade-in">
                <div><h2 className="text-3xl font-bold text-gray-800">Manage Platform Core</h2><p className="text-gray-500">Control the intelligence, automation, and ecosystem of the platform.</p></div>
                <div className="flex border-b border-gray-300">
                    <button onClick={() => setActiveTab('tasks')} className={`py-2 px-4 flex items-center text-lg font-semibold ${activeTab === 'tasks' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}><ListChecks size={20} className="mr-2"/> Task Management</button>
                    <button onClick={() => setActiveTab('rules')} className={`py-2 px-4 flex items-center text-lg font-semibold ${activeTab === 'rules' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}><Cpu size={20} className="mr-2"/> Core Intelligence</button>
                    <button onClick={() => setActiveTab('integrations')} className={`py-2 px-4 flex items-center text-lg font-semibold ${activeTab === 'integrations' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}><Puzzle size={20} className="mr-2"/> Integrations</button>
                </div>
                <div>
                    {activeTab === 'tasks' && <TaskManagementBoard onCreateTaskClick={() => setIsCreateTaskModalOpen(true)} />}
                    {activeTab === 'rules' && <RulesEngine rules={mockRules} onOpenCreateModal={() => setIsCreateRuleModalOpen(true)} />}
                    {activeTab === 'integrations' && <IntegrationsView />}
                </div>
            </div>
            {isCreateRuleModalOpen && <CreateRuleModal onClose={() => setIsCreateRuleModalOpen(false)} />}
            {isCreateTaskModalOpen && <CreateTaskModal onClose={() => setIsCreateTaskModalOpen(false)} />}
        </div>
    );
};

export default Manage;