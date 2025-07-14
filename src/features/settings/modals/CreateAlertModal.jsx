import React, { useState } from 'react';
import { X, Save, Bell } from 'lucide-react';

const CreateAlertModal = ({ onClose, onSave }) => {
    const [eventName, setEventName] = useState('New Task Assigned');
    const [channels, setChannels] = useState({ 'In-App': true, 'Email': false });

    const handleChannelChange = (channel) => {
        setChannels(prev => ({ ...prev, [channel]: !prev[channel] }));
    };

    const handleSave = () => {
        const selectedChannels = Object.keys(channels).filter(c => channels[c]);
        if (!eventName || selectedChannels.length === 0) {
            alert('Please select an event and at least one channel.');
            return;
        }
        const newAlert = {
            id: `N-${Date.now()}`,
            event: eventName,
            status: 'Active', // New alerts default to active
            channels: selectedChannels,
        };
        onSave(newAlert);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="bg-[#1e252d] rounded-2xl shadow-2xl p-6 w-full max-w-lg text-white">
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                    <h3 className="text-2xl font-bold text-[#c0933e]">Create New Alert</h3>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Trigger Event</label>
                        <select
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e]"
                        >
                            <option>New Task Assigned</option>
                            <option>License Nearing Expiration</option>
                            <option>Regulatory Update Published</option>
                            <option>Report Submission Successful</option>
                            <option>Risk Threshold Breached</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Delivery Channels</label>
                        <div className="flex space-x-4">
                            <label className="flex items-center">
                                <input type="checkbox" checked={channels['In-App']} onChange={() => handleChannelChange('In-App')} className="form-checkbox h-5 w-5 text-blue-600 bg-gray-800 border-gray-600 rounded" />
                                <span className="ml-2 text-white">In-App</span>
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" checked={channels['Email']} onChange={() => handleChannelChange('Email')} className="form-checkbox h-5 w-5 text-blue-600 bg-gray-800 border-gray-600 rounded" />
                                <span className="ml-2 text-white">Email</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end pt-6 mt-6 border-t border-gray-700">
                    <button type="button" onClick={onClose} className="bg-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 mr-2">
                        Cancel
                    </button>
                    <button type="button" onClick={handleSave} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-blue-500 flex items-center">
                        <Save size={16} className="mr-2"/> Save Alert
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateAlertModal;