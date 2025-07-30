// src/features/manage/components/TaskManagementBoard.jsx

import React from 'react';
import { Plus, MoreHorizontal, CalendarDays, User } from 'lucide-react'; // Added CalendarDays, User icons

const priorityStyles = {
    'High': 'border-red-500',
    'Medium': 'border-yellow-500',
    'Low': 'border-blue-500',
};

// TaskCard now accepts an onEdit prop
const TaskCard = ({ task, onEdit }) => (
    // Make the card clickable for editing
    <div
        className={`bg-gray-900 p-3 rounded-md border-l-4 ${priorityStyles[task.priority]} cursor-pointer hover:bg-gray-800 transition-colors duration-200`}
        onClick={() => onEdit(task)} // Call onEdit when clicked
    >
        <p className="font-semibold text-sm text-white">{task.title}</p>
        {task.description && (
            <p className="text-xs text-gray-400 mt-1 line-clamp-2">{task.description}</p>
        )}
        <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
            {task.assignedTo && (
                <div className="flex items-center">
                    <User size={12} className="mr-1 inline-block" />
                    <span className="font-bold">{task.assignedTo}</span>
                </div>
            )}
            {task.dueDate && (
                <div className="flex items-center ml-auto"> {/* Use ml-auto to push to right */}
                    <CalendarDays size={12} className="mr-1 inline-block" />
                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
            )}
        </div>
    </div>
);

// TaskColumn now receives onEdit prop to pass to TaskCards
const TaskColumn = ({ title, tasks, onEdit, onCreateTaskInColumn }) => (
    <div className="bg-gray-800 rounded-lg p-3 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-gray-300">{title} ({tasks.length})</h4>
            {/* This plus button can be used to add tasks directly to this column if desired later */}
            <button onClick={() => onCreateTaskInColumn(title)} className="p-1 text-gray-400 hover:text-white" title={`Add task to ${title}`}><Plus size={18} /></button>
        </div>
        <div className="space-y-3 flex-grow overflow-y-auto pr-1 custom-scrollbar"> {/* Added flex-grow and scrollbar */}
            {tasks.map(task => <TaskCard key={task.id} task={task} onEdit={onEdit} />)}
        </div>
        {tasks.length === 0 && (
            <p className="text-gray-500 text-center text-sm mt-4">No tasks here yet.</p>
        )}
    </div>
);

// TaskManagementBoard now receives tasks, onCreateTask, onEditTask
const TaskManagementBoard = ({ tasks, onCreateTask, onEditTask }) => {
    // Note: tasks state is now managed by the parent (Manage/index.jsx)

    // Function to handle creating a task directly in a column (optional for future)
    const handleCreateTaskInColumn = (columnTitle) => {
        // For now, we'll just open the main create modal
        onCreateTask();
        // Future: could pre-fill a column property in the task modal
    };


    return (
        <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white mt-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-[#c0933e]">Compliance Task Board</h3>
                <button
                    onClick={onCreateTask} // This calls the onCreateTask from Manage/index.jsx
                    className="bg-blue-600 text-white font-bold py-2 px-3 rounded-md hover:bg-blue-500 flex items-center text-sm"
                >
                    <Plus size={16} className="mr-2"/> Create New Task
                </button>
            </div>
            <div className="flex space-x-4 h-[70vh]"> {/* Increased height for better visibility */}
                {Object.entries(tasks).map(([columnTitle, columnTasks]) => (
                    <TaskColumn
                        key={columnTitle}
                        title={columnTitle}
                        tasks={columnTasks}
                        onEdit={onEditTask} // Pass onEditTask to TaskColumn
                        onCreateTaskInColumn={handleCreateTaskInColumn}
                    />
                ))}
            </div>
        </div>
    );
};

export default TaskManagementBoard;