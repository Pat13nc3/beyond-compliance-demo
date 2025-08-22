// src/features/taskManagement/index.jsx

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { GanttChart, ListFilter, Box, Clock, UserCheck, AlertTriangle } from 'lucide-react'; // Added icons for filters

// Component and Modal Imports for Task Management
import TaskManagementBoard from './components/TaskManagementBoard';
import CreateTaskModal from './modals/CreateTaskModal';
import Toast from '../../components/ui/Toast';

// Data Imports
import { initialTasks, mockUsers, mockProjects, currentUser } from '../../data/mockData'; // Import mockProjects and currentUser

const TaskManagement = ({ context, onCleanContext, activeProduct, selectedEntity }) => {
    const [tasks, setTasks] = useState(initialTasks);
    const [editingTask, setEditingTask] = useState(null);
    const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // NEW: State for filters
    const [taskViewFilter, setTaskViewFilter] = useState('all'); // 'all', 'my', 'pending', 'overdue'

    // Get current user's role for permissions
    const userRole = currentUser.userRole; // Assuming currentUser is available globally or passed via props
    const currentUserName = currentUser.name;

    useEffect(() => {
        if (context?.initialTab) {
            // Can handle specific routing logic here if needed
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
    
    // NEW: Memoize and filter tasks based on view, product, and user permissions
    const filteredTasks = useMemo(() => {
        let filtered = [...tasks];

        // Apply product filter first
        if (activeProduct !== 'All Products') {
            filtered = filtered.filter(task => task.product === activeProduct);
        }

        // Apply entity filter
        if (selectedEntity && selectedEntity !== 'All Entities') {
            filtered = filtered.filter(task => task.entityId === selectedEntity);
        }
        
        // Apply view-specific filters
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to start of day for comparison

        switch (taskViewFilter) {
            case 'my':
                filtered = filtered.filter(task => 
                    task.assignedTo === currentUserName || task.createdBy === currentUserName
                );
                break;
            case 'pending':
                filtered = filtered.filter(task => task.status !== 'Done');
                break;
            case 'overdue':
                filtered = filtered.filter(task => 
                    task.dueDate && new Date(task.dueDate) < today && task.status !== 'Done'
                );
                break;
            case 'all':
            default:
                // If user is a Normal User, restrict "All Tasks" view
                if (userRole === 'Normal User') {
                    filtered = filtered.filter(task => 
                        task.assignedTo === currentUserName || task.createdBy === currentUserName
                    );
                }
                break;
        }

        // Apply user permissions for visibility
        if (userRole === 'Normal User') {
            filtered = filtered.filter(task => 
                task.assignedTo === currentUserName || task.createdBy === currentUserName
            );
        }
        // Compliance Admins see all tasks by default, no further filtering needed here based on role

        return filtered;
    }, [tasks, taskViewFilter, activeProduct, selectedEntity, userRole, currentUserName]);

    // Group filtered tasks by status for the board view
    const groupedTasks = useMemo(() => {
        const initialGroups = {'To Do': [], 'In Progress': [], 'Done': []};
        return filteredTasks.reduce((acc, task) => {
            if (!acc[task.status]) {
                acc[task.status] = [];
            }
            acc[task.status].push(task);
            return acc;
        }, initialGroups);
    }, [filteredTasks]);

    const handleSaveTask = (taskToSave) => {
        setTasks(prevTasks => {
            // Check permissions for reassigning
            if (taskToSave.id) { // Existing task
                const originalTask = prevTasks.find(task => task.id === taskToSave.id);
                if (userRole === 'Normal User' && originalTask && 
                   (originalTask.assignedTo !== currentUserName && originalTask.createdBy !== currentUserName) &&
                   (taskToSave.assignedTo !== originalTask.assignedTo) // If assignee is changed by normal user for someone else's task
                ) {
                    setToastMessage("Permission denied: You can only reassign tasks you created or are assigned to.");
                    return prevTasks; // Prevent update
                }
            }

            const existingIndex = prevTasks.findIndex(task => task.id === taskToSave.id);
            if (existingIndex > -1) {
                const newTasks = [...prevTasks];
                newTasks[existingIndex] = taskToSave;
                return newTasks;
            } else {
                return [...prevTasks, taskToSave];
            }
        });
        setIsCreateTaskModalOpen(false);
        setEditingTask(null);
        setToastMessage(`Task "${taskToSave.title}" ${taskToSave.id ? 'updated' : 'created'} successfully!`);
    };

    const handleEditTask = (task) => {
        // Check if user has permission to edit/reassign this specific task
        if (userRole === 'Normal User' && task.assignedTo !== currentUserName && task.createdBy !== currentUserName) {
            setToastMessage("Permission denied: You can only edit tasks you created or are assigned to.");
            return;
        }
        setEditingTask(task);
        setIsCreateTaskModalOpen(true);
    };

    const allProducts = useMemo(() => {
        const uniqueProducts = new Set(mockProjects.map(p => p.name));
        return ['All Products', ...Array.from(uniqueProducts)];
    }, [mockProjects]);

    return (
        <div className="p-6 theme-bg-page h-full theme-text-primary">
            <div className="max-w-7xl mx-auto flex flex-col h-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold flex items-center">
                        <GanttChart size={32} className="inline-block mr-3" /> Task Management
                    </h2>
                </div>
                {/* NEW: Filter and View Options */}
                <div className="flex flex-wrap gap-4 mb-6 items-center theme-bg-card p-4 rounded-lg">
                    <span className="font-semibold theme-text-primary flex items-center"><ListFilter size={18} className="mr-2"/> View Tasks:</span>
                    <div className="flex space-x-2">
                        <button 
                            onClick={() => setTaskViewFilter('all')} 
                            className={`px-4 py-2 rounded-full text-sm font-medium ${taskViewFilter === 'all' ? 'theme-bg-highlight-color text-black' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                        >
                            All Tasks
                        </button>
                        <button 
                            onClick={() => setTaskViewFilter('my')} 
                            className={`px-4 py-2 rounded-full text-sm font-medium ${taskViewFilter === 'my' ? 'theme-bg-highlight-color text-black' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                        >
                            My Tasks
                        </button>
                        <button 
                            onClick={() => setTaskViewFilter('pending')} 
                            className={`px-4 py-2 rounded-full text-sm font-medium ${taskViewFilter === 'pending' ? 'theme-bg-highlight-color text-black' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                        >
                            Pending Tasks
                        </button>
                        <button 
                            onClick={() => setTaskViewFilter('overdue')} 
                            className={`px-4 py-2 rounded-full text-sm font-medium ${taskViewFilter === 'overdue' ? 'theme-bg-highlight-color text-black' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                        >
                            Overdue Tasks
                        </button>
                    </div>
                </div>

                <div className="mt-6 flex-1 overflow-y-auto">
                    <TaskManagementBoard
                        tasks={groupedTasks}
                        onCreateTask={() => { setIsCreateTaskModalOpen(true); setEditingTask(null); }}
                        onEditTask={handleEditTask}
                        userRole={userRole} // Pass user role for permissions in board
                        allProducts={allProducts} // Pass all products for the board view
                    />
                </div>
            </div>

            {isCreateTaskModalOpen && (
                <CreateTaskModal
                    onClose={() => { setIsCreateTaskModalOpen(false); setEditingTask(null); }}
                    onSave={handleSaveTask}
                    initialData={editingTask}
                    users={mockUsers}
                    allProducts={allProducts.filter(p => p !== 'All')} // Pass actual product names
                    currentUserName={currentUserName} // Pass current user for createdBy default
                />
            )}

            {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}
        </div>
    );
};

export default TaskManagement;