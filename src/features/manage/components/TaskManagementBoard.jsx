import React from 'react';
import { MoreHorizontal, Plus } from 'lucide-react';

// Mock data for the tasks
const initialTasks = {
    'To Do': [
        { id: 'TASK-1', title: 'Review new CBN guidelines for PSPs', priority: 'High' },
        { id: 'TASK-2', title: 'Schedule Q3 internal audit', priority: 'Medium' },
    ],
    'In Progress': [
        { id: 'TASK-3', title: 'Prepare VASP White Paper draft', priority: 'High', assignedTo: 'Kene Gold' },
        { id: 'TASK-4', title: 'Update Data Encryption Policy', priority: 'Low', assignedTo: 'Adeyemi A.' },
    ],
    'Done': [
        { id: 'TASK-5', title: 'Submit Q2 AML Summary', priority: 'High', assignedTo: 'Adeyemi A.' },
    ],
};

const priorityStyles = {
    'High': 'border-red-500',
    'Medium': 'border-yellow-500',
    'Low': 'border-blue-500',
};

const TaskCard = ({ task }) => (
    <div className={`bg-gray-900 p-3 rounded-md border-l-4 ${priorityStyles[task.priority]}`}>
        <p className="font-semibold text-sm text-white">{task.title}</p>
        {task.assignedTo && (
            <div className="text-xs text-gray-400 mt-2">
                Assigned to: <span className="font-bold">{task.assignedTo}</span>
            </div>
        )}
    </div>
);

const TaskColumn = ({ title, tasks }) => (
    <div className="bg-gray-800 rounded-lg p-3 flex-1">
        <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-gray-300">{title}</h4>
            <button className="p-1 text-gray-400 hover:text-white"><Plus size={18} /></button>
        </div>
        <div className="space-y-3">
            {tasks.map(task => <TaskCard key={task.id} task={task} />)}
        </div>
    </div>
);

const TaskManagementBoard = () => {
    const [tasks, setTasks] = React.useState(initialTasks);

    return (
        <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white mt-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-[#c0933e]">Compliance Task Board</h3>
                <button className="bg-blue-600 text-white font-bold py-2 px-3 rounded-md hover:bg-blue-500 flex items-center text-sm">
                    <Plus size={16} className="mr-2"/> Create New Task
                </button>
            </div>
            <div className="flex space-x-4">
                {Object.entries(tasks).map(([columnTitle, columnTasks]) => (
                    <TaskColumn key={columnTitle} title={columnTitle} tasks={columnTasks} />
                ))}
            </div>
        </div>
    );
};

export default TaskManagementBoard;
