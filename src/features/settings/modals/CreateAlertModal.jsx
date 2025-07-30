// src/features/settings/modals/CreateAlertModal.jsx

import React, { useState, useEffect } from 'react';
import { X, Save, Bell } from 'lucide-react';

// Predefined list of key system event types
const availableEventTypes = [
    'Application Status Change',
    'Compliance Reporting Deadline',
    'License Expiration',
    'Regulatory Circular Publication',
    'Task Assignment',
    'Risk Threshold Breached', // From previous mock
];

// Map event types to example placeholders for guidance
const eventTypePlaceholders = {
    'Application Status Change': 'Application "{{application.name}}" status changed to {{application.status}}.',
    'Compliance Reporting Deadline': 'The "{{report.name}}" report is due on {{report.dueDate}}.',
    'License Expiration': 'Your license for "{{license.type}}" expires on {{license.expiryDate}}.',
    'Regulatory Circular Publication': 'A new regulatory circular "{{circular.title}}" has been published.',
    'Task Assignment': 'A new task titled "{{task.title}}" has been assigned to you by {{user.name}}.',
    'Risk Threshold Breached': 'Risk threshold breached for {{entity.name}}. Score: {{risk.score}}.',
};


const CreateAlertModal = ({ onClose, onSave, initialData = null }) => {
    const [name, setName] = useState(initialData?.name || 'New Alert'); // Updated default name
    const [eventType, setEventType] = useState(initialData?.eventType || availableEventTypes[0]); // NEW: eventType state, defaults to first available
    const [messageTemplate, setMessageTemplate] = useState(initialData?.messageTemplate || eventTypePlaceholders[availableEventTypes[0]]); // Message template based on initial eventType
    const [channels, setChannels] = useState(initialData?.notify || []);

    const availableChannels = ['In-App', 'Email', 'SMS'];

    // Effect to reset form or pre-fill when initialData changes
    useEffect(() => {
        if (initialData) {
            setName(initialData.name || '');
            setEventType(initialData.eventType || availableEventTypes[0]);
            setMessageTemplate(initialData.messageTemplate || eventTypePlaceholders[initialData.eventType || availableEventTypes[0]]);
            setChannels(initialData.notify || []);
        } else {
            setName('New Alert');
            setEventType(availableEventTypes[0]);
            setMessageTemplate(eventTypePlaceholders[availableEventTypes[0]]);
            setChannels([]);
        }
    }, [initialData]);

    // Effect to update message template placeholder when eventType changes
    useEffect(() => {
        setMessageTemplate(eventTypePlaceholders[eventType] || '');
    }, [eventType]);


    const handleChannelChange = (channel) => {
        setChannels(prev =>
            prev.includes(channel)
                ? prev.filter(c => c !== channel)
                : [...prev, channel]
        );
    };

    const handleSave = () => {
        if (!name.trim() || !eventType || !messageTemplate.trim() || channels.length === 0) { // Validate all required fields
            console.error('Validation Error: Please fill out alert name, select an event type, provide a message template, and select at least one channel.');
            return;
        }

        const newAlert = {
            id: initialData?.id || `ALERT-${Date.now()}`,
            name: name.trim(),
            eventType: eventType, // Include eventType
            messageTemplate: messageTemplate.trim(),
            active: initialData?.active !== undefined ? initialData.active : true,
            notify: channels,
        };

        onSave(newAlert);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-lg text-white">
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                    <h3 className="text-2xl font-bold text-[#c0933e]">{initialData?.id ? 'Edit Alert' : 'Create New Alert'}</h3>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Alert Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., High-Risk Transaction Alert"
                            className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white focus:ring-[#c0933e] focus:border-[#c0933e]"
                        />
                    </div>
                    {/* NEW: Trigger Event Type Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Trigger Event Type</label>
                        <select
                            value={eventType}
                            onChange={(e) => setEventType(e.target.value)}
                            className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white focus:ring-[#c0933e] focus:border-[#c0933e]"
                        >
                            {availableEventTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Message Template</label>
                        <textarea
                            value={messageTemplate}
                            onChange={(e) => setMessageTemplate(e.target.value)}
                            placeholder={eventTypePlaceholders[eventType]} // Dynamic placeholder based on event type
                            className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white focus:ring-[#c0933e] focus:border-[#c0933e] h-32"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            Use placeholders specific to the event (e.g., <code className="bg-gray-700 text-gray-200 p-1 rounded">{'{{task.title}}'}</code> for "Task Assignment").
                        </p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Delivery Channels</label>
                        <div className="flex flex-wrap gap-4 p-3 bg-gray-700 rounded-md">
                            {availableChannels.map(channel => (
                                <label key={channel} className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={channels.includes(channel)}
                                        onChange={() => handleChannelChange(channel)}
                                        className="h-4 w-4 text-blue-600 rounded border-gray-600 focus:ring-blue-500 bg-gray-900"
                                    />
                                    <span className="ml-2 text-gray-200">{channel}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end pt-6 mt-6 border-t border-gray-700">
                    <button type="button" onClick={onClose} className="bg-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 mr-2">
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-blue-500 flex items-center"
                    >
                        <Save size={16} className="mr-2"/> {initialData?.id ? 'Save Changes' : 'Create Alert'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateAlertModal;