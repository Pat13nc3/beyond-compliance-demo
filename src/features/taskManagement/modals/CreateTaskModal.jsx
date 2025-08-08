// src/features/taskManagement/modals/CreateTaskModal.jsx

import React, { useState, useEffect, useRef } from 'react';
import { X, Save, Plus, Tag, User, Clock, CheckCircle, Paperclip, Box } from 'lucide-react'; // Added Box icon
import { mockUsers, mockProjects, mockTeams } from '../../../data/mockData';

const CreateTaskModal = ({ users, onClose, onSave, initialData = null, allProducts, currentUserName }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [priority, setPriority] = useState(initialData?.priority || 'Medium');
    const [assignedTo, setAssignedTo] = useState(initialData?.assignedTo || users[0]?.name || '');
    const [dueDate, setDueDate] = useState(initialData?.dueDate || '');
    const [status, setStatus] = useState(initialData?.status || 'To Do');
    const [product, setProduct] = useState(initialData?.product || allProducts[0] || ''); // NEW: Product state
    const [labels, setLabels] = useState(initialData?.labels || []);
    const [currentLabelInput, setCurrentLabelInput] = useState('');

    const [isPriorityMenuOpen, setIsPriorityMenuOpen] = useState(false);
    const [isAssigneeMenuOpen, setIsAssigneeMenuOpen] = useState(false);
    const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
    const [isProductMenuOpen, setIsProductMenuOpen] = useState(false); // NEW: Product menu state
    const [isDueDateMenuOpen, setIsDueDateMenuOpen] = useState(false);
    const [attachedFile, setAttachedFile] = useState(null);

    const priorityButtonRef = useRef(null);
    const assigneeButtonRef = useRef(null);
    const statusButtonRef = useRef(null);
    const productButtonRef = useRef(null); // NEW: Product button ref
    const dueDateInputRef = useRef(null);
    const dueDateButtonRef = useRef(null);
    const fileInputRef = useRef(null);
    
    // NEW: State for the "Create more" toggle
    const [isCreateMore, setIsCreateMore] = useState(false);


    const validUsers = users || [];

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '');
            setDescription(initialData.description || '');
            setPriority(initialData.priority || 'Medium');
            setAssignedTo(initialData.assignedTo || validUsers[0]?.name || '');
            setDueDate(initialData.dueDate || '');
            setStatus(initialData.status || 'To Do');
            setProduct(initialData.product || allProducts[0] || ''); // Set product from initialData
            setLabels(initialData.labels || []);
        } else {
            setTitle('');
            setDescription('');
            setPriority('Medium');
            setAssignedTo(validUsers[0]?.name || '');
            setDueDate('');
            setStatus('To Do');
            setProduct(allProducts[0] || ''); // Set default product for new task
            setLabels([]);
        }
    }, [initialData, validUsers, allProducts]);

    const handleAddLabel = () => {
        const trimmedLabel = currentLabelInput.trim();
        if (trimmedLabel && !labels.includes(trimmedLabel)) {
            setLabels([...labels, trimmedLabel]);
            setCurrentLabelInput('');
        }
    };

    const handleRemoveLabel = (labelToRemove) => {
        setLabels(labels.filter(label => label !== labelToRemove));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setAttachedFile(e.target.files[0]);
        }
    };

    const handleSave = () => {
        if (!title.trim()) {
            alert('Please fill out the task title.');
            return;
        }

        const taskToSave = {
            id: initialData?.id || `TASK-${Date.now()}`,
            title,
            description,
            priority,
            assignedTo,
            dueDate,
            status,
            product, // NEW: Include product
            createdBy: initialData?.createdBy || currentUserName, // Set createdBy
            labels,
            attachedFile,
        };
        onSave(taskToSave);
        if (isCreateMore) {
            // Reset form for new task if "Create more" is checked
            setTitle('');
            setDescription('');
            setPriority('Medium');
            setAssignedTo(validUsers[0]?.name || '');
            setDueDate('');
            setStatus('To Do');
            setProduct(allProducts[0] || '');
            setLabels([]);
            setAttachedFile(null);
        } else {
            onClose();
        }
    };

    const getPriorityColor = (p) => {
        switch (p) {
            case 'High': return 'bg-red-500';
            case 'Medium': return 'bg-yellow-500';
            case 'Low': return 'bg-blue-500';
            default: return 'bg-gray-500';
        }
    };

    const closeAllMenus = () => {
        setIsPriorityMenuOpen(false);
        setIsAssigneeMenuOpen(false);
        setIsStatusMenuOpen(false);
        setIsProductMenuOpen(false); // Close product menu
        setIsDueDateMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                !priorityButtonRef.current?.contains(event.target) &&
                !assigneeButtonRef.current?.contains(event.target) &&
                !statusButtonRef.current?.contains(event.target) &&
                !productButtonRef.current?.contains(event.target) && // Include product button ref
                !dueDateButtonRef.current?.contains(event.target) &&
                !dueDateInputRef.current?.contains(event.target) &&
                !fileInputRef.current?.contains(event.target)
            ) {
                closeAllMenus();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="theme-bg-card rounded-2xl shadow-2xl p-6 w-full max-w-2xl theme-text-primary">
                <div className="flex justify-between items-center mb-4 border-b theme-border-color pb-3">
                    <h3 className="text-2xl font-bold theme-text-highlight-color">Create New Task</h3>
                    <button onClick={onClose} className="p-1 rounded-full theme-text-secondary hover:theme-bg-card-alt">
                        <X size={24} />
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Top Section: Title and Description */}
                    <div>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Beyond Compliance Prototyping"
                            className="w-full p-2 text-xl font-bold border-b theme-border-color bg-transparent theme-text-primary focus:outline-none"
                        />
                    </div>
                    <div>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Purpose is to create a prototype..."
                            className="w-full p-2 border theme-border-color rounded-md theme-bg-card theme-text-primary focus:ring-yellow-500 focus:border-yellow-500 h-32"
                        />
                    </div>

                    {/* Middle Section: Attributes as Buttons */}
                    <div className="relative flex flex-wrap items-center gap-2">
                        {/* Status Button */}
                        <button
                            ref={statusButtonRef}
                            onClick={() => {closeAllMenus(); setIsStatusMenuOpen(true);}}
                            className="px-3 py-1 bg-gray-700 rounded-full text-sm font-medium flex items-center theme-text-primary"
                        >
                           <CheckCircle size={16} className="mr-2 text-green-400" /> {status}
                        </button>
                        {isStatusMenuOpen && (
                            <div className="absolute top-12 left-0 z-10 w-48 theme-bg-card rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {['To Do', 'In Progress', 'Done'].map(s => (
                                    <button
                                        key={s}
                                        onClick={() => {setStatus(s); closeAllMenus();}}
                                        className="block w-full text-left px-4 py-2 text-sm theme-text-primary hover:theme-bg-card-alt"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}
                        
                        {/* Priority Button */}
                        <button
                            ref={priorityButtonRef}
                            onClick={() => {closeAllMenus(); setIsPriorityMenuOpen(true);}}
                            className={`px-3 py-1 ${getPriorityColor(priority)} rounded-full text-sm font-medium theme-text-primary`}
                        >
                            {priority}
                        </button>
                        {isPriorityMenuOpen && (
                            <div className="absolute top-12 left-28 z-10 w-32 theme-bg-card rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {['High', 'Medium', 'Low'].map(p => (
                                    <button
                                        key={p}
                                        onClick={() => {setPriority(p); closeAllMenus();}}
                                        className="block w-full text-left px-4 py-2 text-sm theme-text-primary hover:theme-bg-card-alt"
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        )}
                        
                        {/* Assignee Button */}
                        <button
                            ref={assigneeButtonRef}
                            onClick={() => {closeAllMenus(); setIsAssigneeMenuOpen(true);}}
                            className="px-3 py-1 theme-bg-card-alt rounded-full text-sm font-medium flex items-center theme-text-primary"
                        >
                            <User size={16} className="mr-2 theme-text-secondary" /> {assignedTo}
                        </button>
                        {isAssigneeMenuOpen && (
                            <div className="absolute top-12 left-52 z-10 w-48 theme-bg-card rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-40 overflow-y-auto">
                                {mockUsers.map(user => (
                                    <button
                                        key={user.id}
                                        onClick={() => {setAssignedTo(user.name); closeAllMenus();}}
                                        className="block w-full text-left px-4 py-2 text-sm theme-text-primary hover:theme-bg-card-alt"
                                    >
                                        {user.name}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Product Button */}
                        <button
                            ref={productButtonRef}
                            onClick={() => {closeAllMenus(); setIsProductMenuOpen(true);}}
                            className="px-3 py-1 theme-bg-card-alt rounded-full text-sm font-medium flex items-center theme-text-primary"
                        >
                           <Box size={16} className="mr-2 text-blue-400" /> {product}
                        </button>
                        {isProductMenuOpen && (
                             <div className="absolute top-12 left-[400px] z-10 w-48 theme-bg-card rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {allProducts.map(prod => (
                                    <button
                                        key={prod}
                                        onClick={() => {setProduct(prod); closeAllMenus();}}
                                        className="block w-full text-left px-4 py-2 text-sm theme-text-primary hover:theme-bg-card-alt"
                                    >
                                        {prod}
                                    </button>
                                ))}
                             </div>
                        )}

                        {/* Due Date Button */}
                         <button
                            ref={dueDateButtonRef}
                            onClick={() => {closeAllMenus(); setIsDueDateMenuOpen(true);}}
                            className="px-3 py-1 theme-bg-card-alt rounded-full text-sm font-medium flex items-center theme-text-primary"
                        >
                            <Clock size={16} className="mr-2 text-blue-400" /> {dueDate || 'No due date'}
                        </button>
                        {isDueDateMenuOpen && (
                             <div className="absolute top-12 left-[500px] z-10" ref={dueDateInputRef}> {/* Adjusted left position */}
                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => {setDueDate(e.target.value); closeAllMenus();}}
                                    className="p-2 border theme-border-color rounded-md theme-bg-card theme-text-primary focus:ring-[#c0933e] focus:border-[#c0933e]"
                                />
                             </div>
                        )}
                    </div>
                    
                    {attachedFile && (
                        <div className="flex items-center space-x-2 p-2 theme-bg-card-alt rounded-md theme-text-primary">
                            <Paperclip size={16} className="theme-text-secondary" />
                            <span className="text-sm theme-text-secondary">{attachedFile.name}</span>
                            <button onClick={() => setAttachedFile(null)} className="theme-text-secondary hover:theme-text-primary ml-auto">
                                <X size={16} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Bottom Section: Action Buttons */}
                <div className="flex justify-between items-center pt-6 mt-6 border-t theme-border-color">
                    <div className="flex items-center space-x-2">
                         <label htmlFor="file-input" className="cursor-pointer">
                            <Paperclip size={24} className="theme-text-secondary hover:theme-text-primary" />
                            <input
                                id="file-input"
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="sr-only"
                            />
                        </label>
                        <label htmlFor="create-more-toggle" className="flex items-center cursor-pointer text-sm theme-text-secondary">
                            <input
                                type="checkbox"
                                id="create-more-toggle"
                                className="sr-only peer"
                                checked={isCreateMore}
                                onChange={() => setIsCreateMore(!isCreateMore)}
                            />
                            <div className="relative w-9 h-5 theme-bg-card peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                            <span className="ml-2">Create more</span>
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button type="button" onClick={onClose} className="bg-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 text-white">
                            Save as draft
                        </button>
                        <button type="button" onClick={handleSave} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-blue-500 flex items-center">
                            Create task
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTaskModal;
