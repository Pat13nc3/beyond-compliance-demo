// src/features/manage/modals/CreateWorkflowModal.jsx

import React, { useState, useEffect } from 'react';
import { X, Save, PlusCircle, MinusCircle } from 'lucide-react';
import { mockUsers } from '../../../data/mockData';

const CreateWorkflowModal = ({ onClose, onSave, initialData = null }) => {
    const [name, setName] = useState(initialData?.name || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [assignedTo, setAssignedTo] = useState(initialData?.assignedTo || mockUsers[0]?.name || '');
    // Steps are managed as an array of objects, each with a name
    const [steps, setSteps] = useState(initialData?.steps && initialData.steps.length > 0 ? initialData.steps : [{ name: '' }]);

    // Effect to reset form or pre-fill when initialData changes
    useEffect(() => {
        if (initialData) {
            setName(initialData.name || '');
            setDescription(initialData.description || '');
            setAssignedTo(initialData.assignedTo || mockUsers[0]?.name || '');
            setSteps(initialData.steps || [{ name: '' }]);
        } else {
            setName('');
            setDescription('');
            setAssignedTo(mockUsers[0]?.name || '');
            setSteps([{ name: '' }]);
        }
    }, [initialData]);

    const handleStepChange = (index, value) => {
        const newSteps = [...steps];
        newSteps[index].name = value;
        setSteps(newSteps);
    };

    const handleAddStep = () => {
        setSteps([...steps, { name: '' }]);
    };

    const handleRemoveStep = (index) => {
        const newSteps = steps.filter((_, i) => i !== index);
        setSteps(newSteps);
    };

    const handleSave = () => {
        if (!name.trim()) {
            alert('Please enter a workflow name.');
            return;
        }
        if (steps.some(step => !step.name.trim())) {
            alert('All workflow steps must have a name.');
            return;
        }

        const workflowToSave = {
            id: initialData?.id || `WF-${Date.now()}`, // Reuse ID for edits, generate new for creation
            name: name.trim(),
            description: description.trim(),
            assignedTo,
            steps: steps.map(step => ({ name: step.name.trim() })), // Clean up step names
        };

        onSave(workflowToSave);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="theme-bg-card rounded-2xl shadow-2xl p-6 w-full max-w-2xl theme-text-primary">
                <div className="flex justify-between items-center mb-4 border-b theme-border-color pb-3">
                    <h3 className="text-2xl font-bold theme-text-highlight-color">
                        {initialData?.id ? 'Edit Workflow' : 'Create New Workflow'}
                    </h3>
                    <button onClick={onClose} className="p-1 rounded-full theme-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium theme-text-secondary mb-2">Workflow Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., New License Application, Quarterly Reporting Cycle"
                            className="w-full p-2 border theme-border-color rounded-md theme-bg-card theme-text-primary focus:ring-yellow-500 focus:border-yellow-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium theme-text-secondary mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Briefly describe the purpose and scope of this workflow."
                            className="w-full p-2 border theme-border-color rounded-md theme-bg-card theme-text-primary focus:ring-yellow-500 focus:border-yellow-500 h-20"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium theme-text-secondary mb-2">Assigned To</label>
                        <select
                            value={assignedTo}
                            onChange={(e) => setAssignedTo(e.target.value)}
                            className="w-full p-2 border theme-border-color rounded-md theme-bg-card theme-text-primary focus:ring-yellow-500 focus:border-yellow-500"
                        >
                            {mockUsers.map(user => (
                                <option key={user.id} value={user.name}>{user.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium theme-text-secondary mb-2">Workflow Steps</label>
                        <div className="space-y-2 p-3 theme-bg-card-secondary rounded-md max-h-48 overflow-y-auto custom-scrollbar">
                            {steps.map((step, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <span className="theme-text-primary">{index + 1}.</span>
                                    <input
                                        type="text"
                                        value={step.name}
                                        onChange={(e) => handleStepChange(index, e.target.value)}
                                        placeholder={`Step ${index + 1} name (e.g., Data Collection, Review & Approval)`}
                                        className="flex-grow p-2 border theme-border-color rounded-md theme-bg-card theme-text-primary focus:ring-yellow-500 focus:border-yellow-500"
                                    />
                                    {steps.length > 1 && (
                                        <button onClick={() => handleRemoveStep(index)} className="p-1 text-red-400 hover:text-red-300">
                                            <MinusCircle size={20} />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button onClick={handleAddStep} className="mt-2 text-blue-400 hover:text-blue-300 flex items-center text-sm">
                                <PlusCircle size={16} className="mr-1" /> Add another step
                            </button>
                        </div>
                        <p className="text-xs theme-text-secondary mt-1">Define the sequential steps in this workflow.</p>
                    </div>
                </div>
                <div className="flex justify-end pt-6 mt-6 border-t theme-border-color">
                    <button type="button" onClick={onClose} className="bg-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 text-white mr-2">
                        Cancel
                    </button>
                    <button type="button" onClick={handleSave} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-blue-500 flex items-center">
                        <Save size={16} className="mr-2"/> {initialData?.id ? 'Save Changes' : 'Create Workflow'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateWorkflowModal;