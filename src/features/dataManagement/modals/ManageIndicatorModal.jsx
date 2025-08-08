// src/features/dataManagement/modals/ManageIndicatorModal.jsx

import React, { useState, useEffect } from 'react';
import { X, Save, Link, Settings, Eye } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, YAxis, XAxis, Tooltip, ReferenceLine } from 'recharts';

const ManageIndicatorModal = ({ indicator, dataSources, onClose, onSave }) => {
    const [activeTab, setActiveTab] = useState('Live View');
    const [linkedIds, setLinkedIds] = useState([]);

    useEffect(() => {
        if (indicator) {
            setLinkedIds(indicator.linkedSourceIds || []);
        }
    }, [indicator]);

    if (!indicator) return null;

    const handleToggleLink = (sourceId) => {
        setLinkedIds(currentIds =>
            currentIds.includes(sourceId)
                ? currentIds.filter(id => id !== sourceId)
                : [...currentIds, sourceId]
        );
    };

    const handleSaveChanges = () => {
        onSave(indicator.id, linkedIds);
        onClose();
    };

    const isKri = indicator.type === 'KRI';
    const latestValue = indicator.history?.[indicator.history.length - 1]?.value ?? 0;

    let status, statusColor, statusBgColor;

    if (isKri) {
        if (latestValue > indicator.targetValue) {
            status = 'Breached'; statusColor = 'text-red-800 dark:text-red-300'; statusBgColor = 'bg-red-100 dark:bg-red-900';
        } else if (latestValue > indicator.targetValue * 0.9) {
            status = 'At Risk'; statusColor = 'text-yellow-800 dark:text-yellow-300'; statusBgColor = 'bg-yellow-100 dark:bg-yellow-900';
        } else {
            status = 'In Compliance'; statusColor = 'text-green-800 dark:text-green-300'; statusBgColor = 'bg-green-100 dark:bg-green-900';
        }
    } else { // KPI
        if (latestValue >= indicator.targetValue) {
            status = 'Exceeding Target'; statusColor = 'text-green-800 dark:text-green-300'; statusBgColor = 'bg-green-100 dark:bg-green-900';
        } else if (latestValue >= indicator.targetValue * 0.9) {
            status = 'On Track'; statusColor = 'text-blue-800 dark:text-blue-300'; statusBgColor = 'bg-blue-100 dark:bg-blue-900';
        } else {
            status = 'Needs Attention'; statusColor = 'text-yellow-800 dark:text-yellow-300'; statusBgColor = 'bg-yellow-100 dark:bg-yellow-900';
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="theme-bg-card rounded-lg shadow-xl p-8 w-full max-w-4xl theme-text-primary animate-fade-in-up">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-2xl font-bold">{indicator.name}</h2>
                        <p className="theme-text-secondary">{indicator.description}</p>
                    </div>
                    <button onClick={onClose} className="theme-text-secondary hover:theme-text-primary p-1 rounded-full"><X size={24} /></button>
                </div>

                <div className="border-b theme-border-color"><nav className="-mb-px flex space-x-6">
                    <button onClick={() => setActiveTab('Live View')} className={`py-3 px-1 flex items-center gap-2 ${activeTab === 'Live View' ? 'text-yellow-600 dark:text-yellow-400 border-b-2 border-yellow-600 dark:border-yellow-400' : 'theme-text-secondary hover:theme-text-primary'}`}><Eye size={16}/> Live View</button>
                    <button onClick={() => setActiveTab('Configuration')} className={`py-3 px-1 flex items-center gap-2 ${activeTab === 'Configuration' ? 'text-yellow-600 dark:text-yellow-400 border-b-2 border-yellow-600 dark:border-yellow-400' : 'theme-text-secondary hover:theme-text-primary'}`}><Settings size={16}/> Configuration</button>
                </nav></div>

                {activeTab === 'Live View' && (
                    <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-fast">
                        <div className="md:col-span-2 h-80 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={indicator.history} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <defs><linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#facc15" stopOpacity={0.4}/><stop offset="95%" stopColor="#facc15" stopOpacity={0}/></linearGradient></defs>
                                    <XAxis dataKey="date" stroke="var(--text-secondary)" fontSize={12} />
                                    <YAxis stroke="var(--text-secondary)" fontSize={12} />
                                    <Tooltip contentStyle={{ backgroundColor: 'var(--background-card)', border: '1px solid var(--border-color)' }} />
                                    <ReferenceLine y={indicator.targetValue} label={{ value: isKri ? 'Threshold' : 'Target', position: 'insideTopLeft', fill: 'var(--text-primary)' }} strokeDasharray="3 3" stroke={isKri ? '#f87171' : '#4ade80'} strokeWidth={2} />
                                    <Area type="monotone" dataKey="value" stroke="#facc15" strokeWidth={2} fillOpacity={1} fill="url(#chartGradient)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
                                <h4 className="theme-text-secondary text-sm font-semibold mb-2">Current Status</h4>
                                <div className={`px-3 py-2 rounded-md font-bold text-lg ${statusBgColor} ${statusColor}`}>{status}</div>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
                                <h4 className="theme-text-secondary text-sm font-semibold mb-2">Latest Value</h4>
                                <p className="text-3xl font-bold theme-text-primary">{latestValue.toLocaleString()} <span className="text-lg theme-text-secondary">{indicator.targetUnit}</span></p>
                            </div>
                             <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
                                <h4 className="theme-text-secondary text-sm font-semibold mb-2">{isKri ? 'Breach Threshold' : 'Performance Target'}</h4>
                                <p className="text-3xl font-bold theme-text-primary">{indicator.targetValue.toLocaleString()} <span className="text-lg theme-text-secondary">{indicator.targetUnit}</span></p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Configuration' && (
                    <div className="py-6 animate-fade-in-fast">
                        <h3 className="text-lg font-semibold mb-3">Link Data Sources</h3>
                        <p className="text-sm theme-text-secondary mb-4">Select the data sources that should feed into this indicator.</p>
                        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg max-h-64 overflow-y-auto">
                            {dataSources.map(source => (
                                <div key={source.id} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                                    <div><p className="font-semibold">{source.name}</p><p className="text-xs theme-text-secondary">{source.type}</p></div>
                                    <input type="checkbox" checked={linkedIds.includes(source.id)} onChange={() => handleToggleLink(source.id)} className="h-5 w-5 rounded bg-gray-600 border-gray-500 text-yellow-500 focus:ring-yellow-500"/>
                                </div>
                            ))}
                        </div>
                         <div className="mt-8 flex justify-end">
                            <button onClick={handleSaveChanges} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center"><Save size={16} className="mr-2"/> Save Links ({linkedIds.length})</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageIndicatorModal;