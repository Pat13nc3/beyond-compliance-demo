// src/features/manage/modals/CreateWorkflowModal.jsx

import React, { useState, useEffect } from 'react';
import { X, Save, PlusCircle, MinusCircle } from 'lucide-react';

const CreateWorkflowModal = ({ onClose, onSave, initialData = null }) => {
    const [name, setName] = useState(initialData?.name || '');
    const [description, setDescription] = useState(initialData?.description || '');
    // Steps are managed as an array of objects, each with a name
    const [steps, setSteps] = useState(initialData?.steps && initialData.steps.length > 0 ? initialData.steps : [{ name: '' }]);

    // Effect to reset form or pre-fill when initialData changes
    useEffect(() => {
        if (initialData) {
            setName(initialData.name || '');
            setDescription(initialData.description || '');
            setSteps(initialData.steps || [{ name: '' }]);
        } else {
            setName('');
            setDescription('');
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
            steps: steps.map(step => ({ name: step.name.trim() })), // Clean up step names
        };

        onSave(workflowToSave);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-2xl text-white">
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                    <h3 className="text-2xl font-bold text-[#c0933e]">
                        {initialData?.id ? 'Edit Workflow' : 'Create New Workflow'}
                    </h3>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Workflow Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., New License Application, Quarterly Reporting Cycle"
                            className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white focus:ring-[#c0933e] focus:border-[#c0933e]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Briefly describe the purpose and scope of this workflow."
                            className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white focus:ring-[#c0933e] focus:border-[#c0933e] h-20"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Workflow Steps</label>
                        <div className="space-y-2 p-3 bg-gray-700 rounded-md max-h-48 overflow-y-auto custom-scrollbar">
                            {steps.map((step, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <span className="text-gray-300">{index + 1}.</span>
                                    <input
                                        type="text"
                                        value={step.name}
                                        onChange={(e) => handleStepChange(index, e.target.value)}
                                        placeholder={`Step ${index + 1} name (e.g., Data Collection, Review & Approval)`}
                                        className="flex-grow p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e]"
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
                        <p className="text-xs text-gray-400 mt-1">Define the sequential steps in this workflow.</p>
                    </div>
                </div>
                <div className="flex justify-end pt-6 mt-6 border-t border-gray-700">
                    <button type="button" onClick={onClose} className="bg-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 mr-2">
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