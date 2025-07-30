// src/features/manage/modals/CreateTaskModal.jsx

import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

const CreateTaskModal = ({ users, onClose, onSave, initialData = null }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [priority, setPriority] = useState(initialData?.priority || 'Medium');
    const [assignedTo, setAssignedTo] = useState(initialData?.assignedTo || users[0]?.name || '');
    const [dueDate, setDueDate] = useState(initialData?.dueDate || '');
    const [status, setStatus] = useState(initialData?.status || 'To Do'); // NEW: Status state

    const validUsers = users || [];

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '');
            setDescription(initialData.description || '');
            setPriority(initialData.priority || 'Medium');
            setAssignedTo(initialData.assignedTo || validUsers[0]?.name || '');
            setDueDate(initialData.dueDate || '');
            setStatus(initialData.status || 'To Do'); // Set status from initialData
        } else {
            setTitle('');
            setDescription('');
            setPriority('Medium');
            setAssignedTo(validUsers[0]?.name || '');
            setDueDate('');
            setStatus('To Do'); // Default for new tasks
        }
    }, [initialData, validUsers]);


    const handleSave = () => {
        if (!title || !dueDate) {
            alert('Please fill out the task title and due date.');
            return;
        }

        const taskToSave = {
            id: initialData?.id || `TASK-${Date.now()}`,
            title,
            description,
            priority,
            assignedTo,
            dueDate,
            status, // Include status in the saved task object
        };
        onSave(taskToSave);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="bg-[#1e252d] rounded-2xl shadow-2xl p-6 w-full max-w-lg text-white">
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                    <h3 className="text-2xl font-bold text-[#c0933e]">{initialData?.id ? 'Edit Task' : 'Create New Task'}</h3>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Task Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Review Q3 AML transaction data"
                            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Provide more details about the task."
                            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e] h-20"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e]"
                        >
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Assign To</label>
                        <select
                            value={assignedTo}
                            onChange={(e) => setAssignedTo(e.target.value)}
                            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e]"
                        >
                            {validUsers.map(user => (
                                <option key={user.id} value={user.name}>{user.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Due Date</label>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e]"
                        />
                    </div>
                    {/* NEW: Task Status Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e]"
                        >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end pt-6 mt-6 border-t border-gray-700">
                    <button type="button" onClick={onClose} className="bg-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 mr-2">
                        Cancel
                    </button>
                    <button type="button" onClick={handleSave} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-blue-500 flex items-center">
                        <Save size={16} className="mr-2"/> {initialData?.id ? 'Save Changes' : 'Create Task'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateTaskModal;