import React, { useState } from 'react';
import { X, Save, Trash2, PowerOff } from 'lucide-react';

const SettingsModal = ({ source, onClose, onSave, onDelete }) => {
    if (!source) return null;

    const [name, setName] = useState(source.name);
    const [apiKey, setApiKey] = useState('**********');
    const [syncSchedule, setSyncSchedule] = useState('manual');

    const handleSave = () => {
        onSave(source.id, { name, syncSchedule });
        onClose();
    };
    
    const handleDelete = () => {
        if(window.confirm(`Are you sure you want to delete ${source.name}? This action is irreversible.`)) {
            onDelete(source.id);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-2xl text-white animate-fade-in-up">
                <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold">Settings: <span className="text-yellow-400">{source.name}</span></h2><button onClick={onClose} className="text-gray-400 hover:text-white"><X size={24} /></button></div>
                <div className="space-y-6">
                    <div><label className="block text-sm font-medium text-gray-300 mb-2">Integration Name</label><input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-yellow-500 focus:border-yellow-500"/></div>
                    <div><label className="block text-sm font-medium text-gray-300 mb-2">API Key</label><input type="text" value={apiKey} onChange={e => setApiKey(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-yellow-500 focus:border-yellow-500"/></div>
                    <div><label className="block text-sm font-medium text-gray-300 mb-2">Sync Schedule</label><select value={syncSchedule} onChange={e => setSyncSchedule(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-yellow-500 focus:border-yellow-500"><option value="manual">Manual Only</option><option value="hourly">Sync automatically every hour</option><option value="daily">Sync daily at 2:00 AM</option></select></div>
                </div>
                <div className="mt-8 flex justify-between items-center">
                    <div><button onClick={handleDelete} className="flex items-center text-sm font-medium text-red-500 hover:text-red-400"><Trash2 size={16} className="mr-2"/> Delete Integration</button></div>
                    <div className="flex items-center space-x-4">
                        <button className="flex items-center text-sm font-medium text-gray-300 hover:text-white"><PowerOff size={16} className="mr-2"/> Deactivate</button>
                        <button onClick={handleSave} className="bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-md hover:bg-yellow-400 flex items-center"><Save size={16} className="mr-2"/> Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;