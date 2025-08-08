// src/features/taskManagement/components/TaskManagementBoard.jsx

import React from 'react';
import { Plus, MoreHorizontal, CalendarDays, User, Box } from 'lucide-react'; // Added Box icon for product
import { currentUser } from '../../../data/mockData'; // Corrected import path for currentUser

const priorityStyles = {
    'High': 'border-red-500',
    'Medium': 'border-yellow-500',
    'Low': 'border-blue-500',
};

// TaskCard now accepts an onEdit prop and displays product
const TaskCard = ({ task, onEdit, userRole, currentUserName }) => {
    const canEdit = userRole === 'Compliance Admin' || task.assignedTo === currentUserName || task.createdBy === currentUserName;

    return (
        // Make the card clickable for editing if user has permission
        <div
            className={`theme-bg-card-alt p-3 rounded-md border-l-4 ${priorityStyles[task.priority]} ${canEdit ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800' : ''} transition-colors duration-200`}
            onClick={canEdit ? () => onEdit(task) : undefined} // Call onEdit only if user has permission
        >
            <p className="font-semibold text-sm theme-text-primary">{task.title}</p>
            {task.description && (
                <p className="text-xs theme-text-secondary mt-1 line-clamp-2">{task.description}</p>
            )}
            <div className="flex justify-between items-center text-xs theme-text-secondary mt-2">
                {task.assignedTo && (
                    <div className="flex items-center">
                        <User size={12} className="mr-1 inline-block" />
                        <span className="font-bold">{task.assignedTo}</span>
                    </div>
                )}
                {task.product && ( // Display product association
                    <div className="flex items-center ml-2">
                        <Box size={12} className="mr-1 inline-block" />
                        <span>{task.product}</span>
                    </div>
                )}
                {task.dueDate && (
                    <div className="flex items-center ml-auto"> {/* Use ml-auto to push to right */}
                        <CalendarDays size={12} className="mr-1 inline-block" />
                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                )}
            </div>
            {task.createdBy && (
                <p className="text-xs theme-text-secondary mt-1 text-right">Created by: {task.createdBy}</p>
            )}
        </div>
    );
};

// TaskColumn now receives onEdit prop to pass to TaskCards, and userRole
const TaskColumn = ({ title, tasks, onEdit, onCreateTaskInColumn, userRole, currentUserName }) => (
    <div className="theme-bg-card rounded-lg p-3 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold theme-text-primary">{title} ({tasks.length})</h4>
            {/* Allow creating tasks only if user is Compliance Admin or Normal User */}
            {(userRole === 'Compliance Admin' || userRole === 'Normal User') && (
                <button onClick={() => onCreateTaskInColumn(title)} className="p-1 theme-text-secondary hover:text-theme-text-primary" title={`Add task to ${title}`}><Plus size={18} /></button>
            )}
        </div>
        <div className="space-y-3 flex-grow overflow-y-auto pr-1 custom-scrollbar"> {/* Added flex-grow and scrollbar */}
            {tasks.map(task => 
                <TaskCard 
                    key={task.id} 
                    task={task} 
                    onEdit={onEdit} 
                    userRole={userRole} 
                    currentUserName={currentUserName} 
                />
            )}
        </div>
        {tasks.length === 0 && (
            <p className="theme-text-secondary text-center text-sm mt-4">No tasks here yet.</p>
        )}
    </div>
);

// TaskManagementBoard now receives tasks, onCreateTask, onEditTask, and userRole
const TaskManagementBoard = ({ tasks, onCreateTask, onEditTask, userRole, allProducts }) => {
    // Note: tasks state is now managed by the parent (Manage/index.jsx)
    const handleCreateTaskInColumn = (columnTitle) => {
        onCreateTask();
    };

    const currentUserName = currentUser.name; // Get current user's name

    return (
        <div className="theme-bg-card p-6 rounded-xl shadow-lg theme-text-primary mt-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold theme-text-highlight-color">Compliance Task Board</h3>
                {/* Allow creating tasks only if user is Compliance Admin or Normal User */}
                {(userRole === 'Compliance Admin' || userRole === 'Normal User') && (
                    <button
                        onClick={onCreateTask} // This calls the onCreateTask from Manage/index.jsx
                        className="bg-blue-600 text-white font-bold py-2 px-3 rounded-md hover:bg-blue-500 flex items-center text-sm"
                    >
                        <Plus size={16} className="mr-2"/> Create New Task
                    </button>
                )}
            </div>
            <div className="flex space-x-4 h-[70vh]"> {/* Increased height for better visibility */}
                {Object.entries(tasks).map(([columnTitle, columnTasks]) => (
                    <TaskColumn
                        key={columnTitle}
                        title={columnTitle}
                        tasks={columnTasks}
                        onEdit={onEditTask} // Corrected: pass onEditTask prop
                        userRole={userRole} // Pass user role to TaskColumn
                        onCreateTaskInColumn={handleCreateTaskInColumn}
                        currentUserName={currentUserName} // Pass current user to TaskColumn for task card permissions
                    />
                ))}
            </div>
        </div>
    );
};

export default TaskManagementBoard;
