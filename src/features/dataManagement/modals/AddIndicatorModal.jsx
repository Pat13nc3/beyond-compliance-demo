import React, { useState } from 'react';
import { X, PlusCircle, TrendingUp, Shield } from 'lucide-react';

const AddIndicatorModal = ({ onClose, onAdd, setToastMessage }) => {
    const [type, setType] = useState('KRI');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Financial Crime');
    const [targetValue, setTargetValue] = useState('');
    const [targetUnit, setTargetUnit] = useState('');

    const handleAdd = () => {
        if (!name.trim() || !description.trim() || !targetValue || !targetUnit.trim()) {
            setToastMessage('Please fill out all fields.');
            return;
        }
        if (isNaN(parseFloat(targetValue))) {
            setToastMessage('Target Value must be a number.');
            return;
        }

        onAdd({
            id: `${type.toLowerCase()}-${Date.now()}`,
            type,
            name: name.trim(),
            description: description.trim(),
            category,
            status: 'Active',
            targetValue: parseFloat(targetValue),
            targetUnit: targetUnit.trim(),
            linkedSources: 0,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="theme-bg-card rounded-lg shadow-xl p-8 w-full max-w-2xl theme-text-primary animate-fade-in-up">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Create New Indicator</h2>
                    <button onClick={onClose} className="theme-text-secondary hover:theme-text-primary"><X size={24} /></button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <button onClick={() => setType('KRI')} className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${type === 'KRI' ? 'bg-red-900/50 border-red-500' : 'bg-gray-700 border-gray-600 hover:border-red-500'}`}>
                        <Shield className="mb-2 text-red-400" size={24} />
                        <h3 className="font-bold">Key Risk Indicator (KRI)</h3>
                        <p className="text-xs theme-text-secondary">Monitors for potential problems.</p>
                    </button>
                    <button onClick={() => setType('KPI')} className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${type === 'KPI' ? 'bg-green-900/50 border-green-500' : 'bg-gray-700 border-gray-600 hover:border-green-500'}`}>
                        <TrendingUp className="mb-2 text-green-400" size={24} />
                        <h3 className="font-bold">Key Performance Indicator (KPI)</h3>
                        <p className="text-xs theme-text-secondary">Tracks progress towards goals.</p>
                    </button>
                </div>

                <div className="space-y-4">
                    <div><label className="block text-sm font-medium theme-text-secondary mb-2">Indicator Name</label><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={`e.g., ${type === 'KRI' ? 'High-Risk Transactions' : 'KYC Processing Time'}`} className="w-full bg-gray-700 border theme-border-color rounded-md p-2 theme-text-primary focus:ring-yellow-500 focus:border-yellow-500"/></div>
                    <div><label className="block text-sm font-medium theme-text-secondary mb-2">Description</label><textarea value={description} onChange={e => setDescription(e.target.value)} placeholder={`Describe what this ${type} monitors`} className="w-full bg-gray-700 border theme-border-color rounded-md p-2 theme-text-primary focus:ring-yellow-500 focus:border-yellow-500" rows="3"></textarea></div>
                    <div><label className="block text-sm font-medium theme-text-secondary mb-2">Category</label><select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-gray-700 border theme-border-color rounded-md p-2 theme-text-primary focus:ring-yellow-500 focus:border-yellow-500"><option>Financial Crime</option><option>Cybersecurity</option><option>Data Governance</option><option>Operational Efficiency</option><option>Business Growth</option></select></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-sm font-medium theme-text-secondary mb-2">{type === 'KRI' ? 'Threshold Value' : 'Target Value'}</label><input type="number" value={targetValue} onChange={e => setTargetValue(e.target.value)} placeholder="e.g., 10000" className="w-full bg-gray-700 border theme-border-color rounded-md p-2 theme-text-primary focus:ring-yellow-500 focus:border-yellow-500"/></div>
                        <div><label className="block text-sm font-medium theme-text-secondary mb-2">Unit</label><input type="text" value={targetUnit} onChange={e => setTargetUnit(e.target.value)} placeholder="e.g., USD, Hours, %" className="w-full bg-gray-700 border theme-border-color rounded-md p-2 theme-text-primary focus:ring-yellow-500 focus:border-yellow-500"/></div>
                    </div>
                </div>
                <div className="mt-8 flex justify-end"><button onClick={handleAdd} className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-md hover:bg-yellow-400 flex items-center"><PlusCircle size={20} className="mr-2"/> Create {type}</button></div>
            </div>
        </div>
    );
};

export default AddIndicatorModal;