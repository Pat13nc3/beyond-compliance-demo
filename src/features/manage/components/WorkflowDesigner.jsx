// src/features/manage/components/WorkflowDesigner.jsx

import React, { useState } from 'react';
import { Plus, Edit, Trash2, Play } from 'lucide-react'; // Icons for actions

const WorkflowDesigner = ({ workflows, onCreateWorkflow, onEditWorkflow, onDeleteWorkflow, onRunWorkflow }) => {
    return (
        <div className="p-6 bg-[#1e252d] rounded-xl shadow-lg text-white">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-[#c0933e]">Workflow Templates</h3>
                <button
                    onClick={onCreateWorkflow}
                    className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center text-sm"
                >
                    <Plus size={16} className="mr-2" /> Create New Workflow
                </button>
            </div>

            <div className="space-y-4">
                {workflows.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">No workflow templates defined yet. Click "Create New Workflow" to get started.</p>
                ) : (
                    workflows.map(workflow => (
                        <div key={workflow.id} className="bg-gray-800 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <p className="font-bold text-gray-100">{workflow.name}</p>
                                    <p className="text-sm text-gray-400 line-clamp-1">{workflow.description}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => onRunWorkflow(workflow)}
                                        className="p-1 rounded-full text-green-400 hover:bg-gray-700 hover:text-green-300"
                                        title="Run Workflow (Simulate)"
                                    >
                                        <Play size={20} />
                                    </button>
                                    <button
                                        onClick={() => onEditWorkflow(workflow)}
                                        className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white"
                                        title="Edit Workflow"
                                    >
                                        <Edit size={20} />
                                    </button>
                                    <button
                                        onClick={() => onDeleteWorkflow(workflow.id)}
                                        className="p-1 rounded-full text-red-400 hover:bg-gray-700 hover:text-red-300"
                                        title="Delete Workflow"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                            <div className="text-xs text-gray-500 mt-2">
                                <span className="font-semibold text-gray-400">Steps:</span> {workflow.steps.length > 0 ? workflow.steps.map(step => step.name).join(' > ') : 'No steps defined'}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default WorkflowDesigner;