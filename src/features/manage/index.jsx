// src/features/manage/index.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { Link, FileText, GanttChart, Workflow, Bot, Code, Users } from 'lucide-react'; // Ensure Users icon is imported

// Component Imports
import Integrations from './components/Integrations';
import RulesEngine from './components/RulesEngine';
import TaskManagementBoard from './components/TaskManagementBoard';
import WorkflowDesigner from './components/WorkflowDesigner';
import RegulatoryAIAgentView from './components/RegulatoryAIAgentView';
import ApiDevCentreView from './components/ApiDevCentreView';
import PartnerCollaborationView from './components/PartnerCollaborationView'; // Ensure this is imported

// Modal Imports
import CreateRuleModal from './modals/CreateRuleModal';
import CreateTaskModal from './modals/CreateTaskModal';
import CreateIntegrationModal from './modals/CreateIntegrationModal';
import CreateWorkflowModal from './modals/CreateWorkflowModal';
import ViewAIInsightModal from './modals/ViewAIInsightModal';
import SimulateAIOutputModal from './modals/SimulateAIOutputModal';
import CreateEditPartnerModal from './modals/CreateEditPartnerModal'; // NEW: Import CreateEditPartnerModal
import Toast from '../../components/ui/Toast';
import {
    mockUsers,
    mockIntegrations as initialMockIntegrations,
    mockRules as initialMockRules,
    initialTasks as initialMockTasks,
    mockWorkflows as initialMockWorkflows,
    mockPartners as initialMockPartners // NEW: Import mockPartners
} from '../../data/mockData';


// Manage component receives `context` and `onCleanContext` from App.jsx
const Manage = ({ jurisdiction, context, onCleanContext }) => {
    const [activeTab, setActiveTab] = useState('partnerCollaboration'); // Set default to partnerCollaboration for testing
    const [users, setUsers] = useState(mockUsers);

    const [integrations, setIntegrations] = useState(initialMockIntegrations);
    const [editingIntegration, setEditingIntegration] = useState(null);

    const [rules, setRules] = useState(initialMockRules);
    const [editingRule, setEditingRule] = useState(null);

    const [tasks, setTasks] = useState(initialMockTasks);
    const [editingTask, setEditingTask] = useState(null);

    const [workflows, setWorkflows] = useState(initialMockWorkflows);
    const [editingWorkflow, setEditingWorkflow] = useState(null);

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

    const [apiSettings, setApiSettings] = useState({
        baseUrl: 'https://api.beyondcompliance.com/v2',
        docsUrl: 'https://docs.beyondcompliance.com/api',
        apiKeys: [
            { id: 'key-1', name: 'Primary Integration Key', key: 'sk_live_**********xyz', created: '2025-01-15', lastUsed: '2025-07-28', status: 'Active' },
        ],
        webhooks: [
            { id: 'hook-1', name: 'Compliance Event Notifications', url: 'https://webhook.example.com/compliance', events: ['alert.created'], status: 'Active' },
        ],
    });

    // NEW: State for Partner Collaboration settings and editing
    const [partnerSettings, setPartnerSettings] = useState({
        partners: initialMockPartners // Initialize from mockData
    });
    const [editingPartner, setEditingPartner] = useState(null);
    const [isCreateEditPartnerModalOpen, setIsCreateEditPartnerModalOpen] = useState(false);


    const [isCreateRuleModalOpen, setIsCreateRuleModalOpen] = useState(false);
    const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
    const [isCreateIntegrationModalOpen, setIsCreateIntegrationModalOpen] = useState(false);
    const [isCreateWorkflowModalOpen, setIsCreateWorkflowModalOpen] = useState(false);

    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        if (context && context.initialTab) {
            setActiveTab(context.initialTab);
            if (onCleanContext) {
                onCleanContext();
            }
        }
    }, [context, onCleanContext]);

    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => {
                setToastMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    const handleSaveRule = (ruleToSave) => {
        if (ruleToSave.id) {
            setRules(prevRules => prevRules.map(rule =>
                rule.id === ruleToSave.id ? ruleToSave : rule
            ));
            setToastMessage(`Rule "${ruleToSave.name}" updated successfully!`);
        } else {
            setRules(prevRules => [...prevRules, ruleToSave]);
            setToastMessage(`Rule "${ruleToSave.name}" created successfully!`);
        }
        setIsCreateRuleModalOpen(false);
        setEditingRule(null);
    };

    const handleEditRule = (rule) => {
        setEditingRule(rule);
        setIsCreateRuleModalOpen(true);
    };

    const handleToggleRuleStatus = (ruleId) => {
        setRules(prevRules =>
            prevRules.map(rule => {
                const currentRule = prevRules.find(r => r.id === ruleId);
                if (currentRule) {
                    const newStatus = currentRule.status === 'Active' ? 'Inactive' : 'Active';
                    setToastMessage(`Rule "${currentRule.name}" is now ${newStatus}.`);
                    return { ...currentRule, status: newStatus };
                }
                return rule;
            })
        );
    };


    const handleSaveTask = (taskToSave) => {
        setTasks(prevTasks => {
            const updatedTasks = { ...prevTasks };

            if (taskToSave.id) {
                for (const column in updatedTasks) {
                    updatedTasks[column] = updatedTasks[column].filter(t => t.id !== taskToSave.id);
                }
            }

            if (!updatedTasks[taskToSave.status]) {
                updatedTasks[taskToSave.status] = [];
            }
            updatedTasks[taskToSave.status] = [...updatedTasks[taskToSave.status], taskToSave];

            setToastMessage(`Task "${taskToSave.title}" ${taskToSave.id ? 'updated' : 'created'} successfully!`);

            return updatedTasks;
        });
        setIsCreateTaskModalOpen(false);
        setEditingTask(null);
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setIsCreateTaskModalOpen(true);
    };

    const handleTestRule = (rule) => {
        const triggersTask = rule.actions.some(action => action.type === 'Trigger Workflow' || action.type === 'Create Alert');

        if (triggersTask) {
            const newTask = {
                id: `AUTOTASK-${Date.now()}`,
                title: `ACTION REQUIRED: Rule "${rule.name}" triggered!`,
                description: `Automatically generated task due to rule "${rule.name}" being triggered. Review rule conditions and take necessary action.`,
                priority: 'High',
                assignedTo: 'Compliance Team',
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
                status: 'To Do',
                generatedByRuleId: rule.id,
            };
            handleSaveTask(newTask);
            setToastMessage(`Rule "${rule.name}" simulated. A new task has been created!`);
        } else {
            setToastMessage(`Rule "${rule.name}" simulated. No task was generated by this rule's actions.`);
        }
    };

    const handleConnectToggle = (integrationId, currentStatus) => {
        setIntegrations(prevIntegrations =>
            prevIntegrations.map(integration =>
                integration.id === integrationId
                    ? { ...integration, status: currentStatus === 'Active' ? 'Inactive' : 'Active' }
                    : integration
            )
        );
        const toggledIntegration = integrations.find(int => int.id === integrationId);
        setToastMessage(`Integration "${toggledIntegration.name}" is now ${toggledIntegration.status === 'Active' ? 'Active' : 'Inactive'}.`);
    };

    const handleViewIntegrationDetails = (integration) => {
        setEditingIntegration(integration);
        setIsCreateIntegrationModalOpen(true);
    };

    const handleAddIntegration = () => {
        setEditingIntegration(null);
        setIsCreateIntegrationModalOpen(true);
    };

    const handleSaveIntegration = (integrationToSave) => {
        if (integrationToSave.id) {
            setIntegrations(prevIntegrations => prevIntegrations.map(integration =>
                integration.id === integrationToSave.id ? integrationToSave : integration
            ));
            setToastMessage(`Integration "${integrationToSave.name}" updated successfully!`);
        } else {
            setIntegrations(prevIntegrations => [...prevIntegrations, integrationToSave]);
            setToastMessage(`Integration "${integrationToSave.name}" added successfully!`);
        }
        setIsCreateIntegrationModalOpen(false);
        setEditingIntegration(null);
    };

    const handleSaveWorkflow = (workflowToSave) => {
        if (workflowToSave.id) {
            setWorkflows(prevWorkflows => prevWorkflows.map(workflow =>
                workflow.id === workflowToSave.id ? workflowToSave : workflow
            ));
            setToastMessage(`Workflow "${workflowToSave.name}" updated successfully!`);
        } else {
            setWorkflows(prevWorkflows => [...prevWorkflows, workflowToSave]);
            setToastMessage(`Workflow "${workflowToSave.name}" created successfully!`);
        }
        setIsCreateWorkflowModalOpen(false);
        setEditingWorkflow(null);
    };

    const handleEditWorkflow = (workflow) => {
        setEditingWorkflow(workflow);
        setIsCreateWorkflowModalOpen(true);
    };

    const handleDeleteWorkflow = (workflowId) => {
        setWorkflows(prevWorkflows => prevWorkflows.filter(workflow => workflow.id !== workflowId));
        setToastMessage("Workflow deleted successfully!");
    };

    const handleRunWorkflow = (workflow) => {
        const firstStepTask = {
            id: `WF_TASK-${Date.now()}`,
            title: `Workflow: ${workflow.name} - Step 1: ${workflow.steps[0]?.name || 'Start'}`,
            description: `Initiated workflow "${workflow.name}". This task represents the first step.`,
            priority: 'High',
            assignedTo: 'Compliance Team',
            dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
            status: 'In Progress',
            linkedWorkflowId: workflow.id,
        };
        handleSaveTask(firstStepTask);
        setToastMessage(`Workflow "${workflow.name}" has been initiated! A new task has been created in your Task Management Board.`);
    };

    const handleSaveAiConfig = (newAiConfig) => {
        setAiConfig(newAiConfig);
        setToastMessage('AI Agent configuration saved successfully!');
    };

    const handleSimulateAiAction = (actionType) => {
        setSimulateActionType(actionType);
        setSimulateOutputData({ modelVersion: aiConfig.modelVersion, score: Math.floor(Math.random() * 100) });
        setIsSimulateAIOutputModalOpen(true);
        setToastMessage(`AI Action: "${actionType}" simulated successfully!`);
    };

    const handleViewInsightClick = (insight) => {
        setSelectedInsight(insight);
        setIsViewAIInsightModalOpen(true);
    };

    const handleSaveApiSettings = (newApiSettings) => {
        setApiSettings(newApiSettings);
        setToastMessage('API & Dev Centre settings saved successfully!');
    };

    // NEW: Partner Collaboration Handlers
    const handleSavePartner = (partnerToSave) => {
        setPartnerSettings(prevSettings => {
            const updatedPartners = prevSettings.partners.map(p =>
                p.id === partnerToSave.id ? partnerToSave : p
            );
            // If it's a new partner, add it
            if (!updatedPartners.some(p => p.id === partnerToSave.id)) {
                updatedPartners.push(partnerToSave);
            }
            return { ...prevSettings, partners: updatedPartners };
        });
        setIsCreateEditPartnerModalOpen(false);
        setEditingPartner(null);
        setToastMessage(`Partner "${partnerToSave.name}" ${partnerToSave.id ? 'updated' : 'added'} successfully!`);
    };

    const handleAddPartnerClick = () => {
        setEditingPartner(null); // Clear editing state for new partner
        setIsCreateEditPartnerModalOpen(true);
    };

    const handleEditPartnerClick = (partner) => {
        setEditingPartner(partner);
        setIsCreateEditPartnerModalOpen(true);
    };

    const handleConfigureSharing = (partner) => {
        setToastMessage(`Opening configuration for "${partner.name}" (Sharing settings modal coming soon!).`);
    };

    const handleViewSharingActivity = (partner) => {
        setToastMessage(`Viewing sharing activity for "${partner.name}" (Activity log modal coming soon!).`);
    };


    const renderContent = () => {
        switch (activeTab) {
            case 'integrations':
                return (
                    <Integrations
                        integrations={integrations}
                        onConnectToggle={handleConnectToggle}
                        onViewDetails={handleViewIntegrationDetails}
                        onAddIntegration={handleAddIntegration}
                    />
                );
            case 'rules':
                return (
                    <RulesEngine
                        rules={rules}
                        onCreateRule={() => { setIsCreateRuleModalOpen(true); setEditingRule(null); }}
                        onEditRule={handleEditRule}
                        onToggleRuleStatus={handleToggleRuleStatus}
                        onTestRule={handleTestRule}
                    />
                );
            case 'tasks':
                return (
                    <TaskManagementBoard
                        tasks={tasks}
                        onCreateTask={() => { setIsCreateTaskModalOpen(true); setEditingTask(null); }}
                        onEditTask={handleEditTask}
                    />
                );
            case 'workflows':
                return (
                    <WorkflowDesigner
                        workflows={workflows}
                        onCreateWorkflow={() => { setIsCreateWorkflowModalOpen(true); setEditingWorkflow(null); }}
                        onEditWorkflow={handleEditWorkflow}
                        onDeleteWorkflow={handleDeleteWorkflow}
                        onRunWorkflow={handleRunWorkflow}
                    />
                );
            case 'aiAgent':
                return (
                    <RegulatoryAIAgentView
                        onSaveAiConfig={handleSaveAiConfig}
                        initialAiConfig={aiConfig}
                        onSimulateAiAction={handleSimulateAiAction}
                        onViewInsight={handleViewInsightClick}
                    />
                );
            case 'apiDevCentre':
                return (
                    <ApiDevCentreView
                        onSaveApiSettings={handleSaveApiSettings}
                        initialApiSettings={apiSettings}
                        setToastMessage={setToastMessage}
                    />
                );
            case 'partnerCollaboration':
                return (
                    <PartnerCollaborationView
                        partners={partnerSettings.partners} // Pass partners from state
                        onSavePartnerSettings={handleSavePartner} // Pass handler for saving partner (add/edit)
                        setToastMessage={setToastMessage}
                        onAddPartner={handleAddPartnerClick} // Pass handler for add button
                        onEditPartner={handleEditPartnerClick} // Pass handler for card click
                        onConfigureSharing={handleConfigureSharing}
                        onViewSharingActivity={handleViewSharingActivity}
                    />
                );
            default:
                return <p className="text-center text-gray-400 py-8">Please select a tab.</p>
        }
    };

    return (
        <div className="p-6 bg-gray-900 h-full text-white">
            <div className="max-w-7xl mx-auto flex flex-col h-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">Manage Compliance Operations</h2>
                </div>
                <div className="border-b border-gray-700 mb-6 flex-shrink-0">
                    <nav className="-mb-px flex space-x-4">
                        <button onClick={() => setActiveTab('integrations')} className={`py-3 px-1 text-sm font-medium whitespace-nowrap ${activeTab === 'integrations' ? 'text-[#c0933e] border-b-2 border-[#c0933e]' : 'text-gray-400 hover:text-white'}`}>
                            <Link size={18} className="inline-block mr-2" /> Integrations
                        </button>
                        <button onClick={() => setActiveTab('rules')} className={`py-3 px-1 text-sm font-medium whitespace-nowrap ${activeTab === 'rules' ? 'text-[#c0933e] border-b-2 border-[#c0933e]' : 'text-gray-400 hover:text-white'}`}>
                            <FileText size={18} className="inline-block mr-2" /> Rules Engine
                        </button>
                        <button onClick={() => setActiveTab('tasks')} className={`py-3 px-1 text-sm font-medium whitespace-nowrap ${activeTab === 'tasks' ? 'text-[#c0933e] border-b-2 border-[#c0933e]' : 'text-gray-400 hover:text-white'}`}>
                            <GanttChart size={18} className="inline-block mr-2" /> Task Management
                        </button>
                        <button onClick={() => setActiveTab('workflows')} className={`py-3 px-1 text-sm font-medium whitespace-nowrap ${activeTab === 'workflows' ? 'text-[#c0933e] border-b-2 border-[#c0933e]' : 'text-gray-400 hover:text-white'}`}>
                            <Workflow size={18} className="inline-block mr-2" /> Workflows
                        </button>
                        <button onClick={() => setActiveTab('aiAgent')} className={`py-3 px-1 text-sm font-medium whitespace-nowrap ${activeTab === 'aiAgent' ? 'text-[#c0933e] border-b-2 border-[#c0933e]' : 'text-gray-400 hover:text-white'}`}>
                            <Bot size={18} className="inline-block mr-2" /> AI Agent
                        </button>
                        <button onClick={() => setActiveTab('apiDevCentre')} className={`py-3 px-1 text-sm font-medium whitespace-nowrap ${activeTab === 'apiDevCentre' ? 'text-[#c0933e] border-b-2 border-[#c0933e]' : 'text-gray-400 hover:text-white'}`}>
                            <Code size={18} className="inline-block mr-2" /> API & Dev Centre
                        </button>
                        <button onClick={() => setActiveTab('partnerCollaboration')} className={`py-3 px-1 text-sm font-medium whitespace-nowrap ${activeTab === 'partnerCollaboration' ? 'text-[#c0933e] border-b-2 border-[#c0933e]' : 'text-gray-400 hover:text-white'}`}>
                            <Users size={18} className="inline-block mr-2" /> Partner Collaboration
                        </button>
                    </nav>
                </div>

                <div className="mt-6 flex-1 overflow-y-auto">
                    {renderContent()}
                </div>
            </div>

            {isCreateRuleModalOpen && (
                <CreateRuleModal
                    onClose={() => { setIsCreateRuleModalOpen(false); setEditingRule(null); }}
                    onSave={handleSaveRule}
                    initialData={editingRule}
                />
            )}
            {isCreateTaskModalOpen && (
                <CreateTaskModal
                    onClose={() => { setIsCreateTaskModalOpen(false); setEditingTask(null); }}
                    onSave={handleSaveTask}
                    initialData={editingTask}
                    users={users}
                />
            )}
            {isCreateIntegrationModalOpen && (
                <CreateIntegrationModal
                    onClose={() => { setIsCreateIntegrationModalOpen(false); setEditingIntegration(null); }}
                    onSave={handleSaveIntegration}
                    initialData={editingIntegration}
                />
            )}
            {isCreateWorkflowModalOpen && (
                <CreateWorkflowModal
                    onClose={() => { setIsCreateWorkflowModalOpen(false); setEditingWorkflow(null); }}
                    onSave={handleSaveWorkflow}
                    initialData={editingWorkflow}
                />
            )}
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
            {/* NEW: Render CreateEditPartnerModal */}
            {isCreateEditPartnerModalOpen && (
                <CreateEditPartnerModal
                    onClose={() => { setIsCreateEditPartnerModalOpen(false); setEditingPartner(null); }}
                    onSave={handleSavePartner} // Pass the handler for saving partner details
                    initialData={editingPartner} // Pass partner data for editing, or null for new
                />
            )}

            {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}
        </div>
    );
};

export default Manage;