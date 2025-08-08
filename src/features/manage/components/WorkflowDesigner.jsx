// src/features/manage/components/WorkflowDesigner.jsx

import React, { useState } from 'react';
import { Plus, Edit, Trash2, Play } from 'lucide-react'; // Icons for actions

const WorkflowDesigner = ({ workflows, onCreateWorkflow, onEditWorkflow, onDeleteWorkflow, onRunWorkflow }) => {
    return (
        <div className="p-6 theme-bg-card rounded-xl shadow-lg theme-text-primary">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold theme-text-highlight-color">Workflow Templates</h3>
                <button
                    onClick={onCreateWorkflow}
                    className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center text-sm"
                >
                    <Plus size={16} className="mr-2" /> Create New Workflow
                </button>
            </div>

            <div className="space-y-4">
                {workflows.length === 0 ? (
                    <p className="theme-text-secondary text-center py-8">No workflow templates defined yet. Click "Create New Workflow" to get started.</p>
                ) : (
                    workflows.map(workflow => (
                        <div key={workflow.id} className="theme-bg-card p-4 rounded-lg border theme-border-color hover:bg-gray-100 dark:hover:bg-gray-700">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <p className="font-bold theme-text-primary">{workflow.name}</p>
                                    <p className="text-sm theme-text-secondary line-clamp-1">{workflow.description}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => onRunWorkflow(workflow)}
                                        className="p-1 rounded-full text-green-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-green-300"
                                        title="Run Workflow (Simulate)"
                                    >
                                        <Play size={20} />
                                    </button>
                                    <button
                                        onClick={() => onEditWorkflow(workflow)}
                                        className="p-1 rounded-full theme-text-secondary hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-theme-text-primary"
                                        title="Edit Workflow"
                                    >
                                        <Edit size={20} />
                                    </button>
                                    <button
                                        onClick={() => onDeleteWorkflow(workflow.id)}
                                        className="p-1 rounded-full text-red-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-red-300"
                                        title="Delete Workflow"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                            <div className="text-xs theme-text-secondary mt-2">
                                <span className="font-semibold theme-text-primary">Steps:</span> {workflow.steps.length > 0 ? workflow.steps.map(step => step.name).join(' > ') : 'No steps defined'}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default WorkflowDesigner;