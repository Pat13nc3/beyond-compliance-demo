import React, { useState } from 'react';
// Added BarChart3 for the new tab
import { Database, Plus, MoreVertical, Wifi, WifiOff, AlertCircle, Edit, Zap, Trash2, BarChart3 } from 'lucide-react';
import AddDataSourceModal from '../components/modals/AddDataSourceModal.jsx';
import ActionMenu from '../components/ui/ActionMenu.jsx';
// Import the new data we just added
import { kpiAndKriData } from '../data/mockData.js';


// --- Data Sources View Component ---
const initialDataSources = [
    { id: 1, name: 'Stripe Payments API', type: 'API', status: 'Connected' },
    { id: 2, name: 'Chainalysis KYT', type: 'API', status: 'Connected' },
    { id: 3, name: 'Internal User Database', type: 'SFTP', status: 'Pending' },
    { id: 4, name: 'On-chain Polygon Transactions', type: 'API', status: 'Error' },
];
const statusStyles = {
    'Connected': { icon: <Wifi className="text-green-500" />, textColor: 'text-green-400' },
    'Pending': { icon: <AlertCircle className="text-yellow-500" />, textColor: 'text-yellow-400' },
    'Error': { icon: <WifiOff className="text-red-500" />, textColor: 'text-red-400' }
};

const DataSourcesView = ({ onAddClick }) => {
    const [dataSources, setDataSources] = useState(initialDataSources);
    const [openMenuId, setOpenMenuId] = useState(null);

    const handleDelete = (sourceId) => {
        setDataSources(currentSources => currentSources.filter(source => source.id !== sourceId));
    };

    return (
        <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-[#c0933e]">Connected Data Sources</h3>
                <button onClick={onAddClick} className="bg-blue-600 text-white font-bold py-2 px-3 rounded-md hover:bg-blue-500 flex items-center text-sm">
                    <Plus size={16} className="mr-2"/> Add New Source
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead><tr className="border-b border-gray-700"><th className="text-left py-3 px-4 text-sm font-medium uppercase">Source Name</th><th className="text-left py-3 px-4 text-sm font-medium uppercase">Type</th><th className="text-left py-3 px-4 text-sm font-medium uppercase">Status</th><th className="text-right py-3 px-4 text-sm font-medium uppercase">Actions</th></tr></thead>
                    <tbody>
                        {dataSources.map(source => (
                            <tr key={source.id} className="border-b border-gray-800 hover:bg-gray-800">
                                <td className="py-4 px-4 font-bold">{source.name}</td>
                                <td className="py-4 px-4"><span className="bg-gray-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{source.type}</span></td>
                                <td className={`py-4 px-4 font-semibold flex items-center ${statusStyles[source.status].textColor}`}>{statusStyles[source.status].icon}<span className="ml-2">{source.status}</span></td>
                                <td className="py-4 px-4 text-right">
                                    <div className="relative inline-block">
                                        <button onClick={() => setOpenMenuId(openMenuId === source.id ? null : source.id)} className="p-2 rounded-md hover:bg-gray-700"><MoreVertical size={18} /></button>
                                        {openMenuId === source.id && <ActionMenu onClose={() => setOpenMenuId(null)} items={[{ label: 'Edit', icon: <Edit size={14}/> }, { label: 'Sync Now', icon: <Zap size={14}/> }, { label: 'Delete', icon: <Trash2 size={14}/>, onClick: () => handleDelete(source.id), isDestructive: true }]} />}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


// --- NEW: KPI & KRI Library View Component ---
const KpiKriLibraryView = () => (
    <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-[#c0933e]">KPI & KRI Library</h3>
            <button className="bg-blue-600 text-white font-bold py-2 px-3 rounded-md hover:bg-blue-500 flex items-center text-sm">
                <Plus size={16} className="mr-2"/> Define New Metric
            </button>
        </div>
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead><tr className="border-b border-gray-700"><th className="text-left py-3 px-4 text-sm font-medium uppercase">Metric Name</th><th className="text-left py-3 px-4 text-sm font-medium uppercase">Type</th><th className="text-left py-3 px-4 text-sm font-medium uppercase">Category</th><th className="text-left py-3 px-4 text-sm font-medium uppercase">Status</th><th className="text-right py-3 px-4 text-sm font-medium uppercase">Actions</th></tr></thead>
                <tbody>
                    {kpiAndKriData.map(metric => (
                        <tr key={metric.id} className="border-b border-gray-800 hover:bg-gray-800">
                            <td className="py-4 px-4 font-bold">{metric.name}</td>
                            <td className="py-4 px-4"><span className={`font-semibold ${metric.type === 'KPI' ? 'text-blue-400' : 'text-purple-400'}`}>{metric.type}</span></td>
                            <td className="py-4 px-4 text-gray-300">{metric.category}</td>
                            <td className="py-4 px-4"><span className={`text-xs font-semibold px-2 py-1 rounded-full ${metric.status === 'Active' ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-300'}`}>{metric.status}</span></td>
                            <td className="py-4 px-4 text-right"><button className="p-2 rounded-md hover:bg-gray-700"><MoreVertical size={18} /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);


const DataManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // --- NEW STATE for managing the active tab ---
    const [activeTab, setActiveTab] = useState('sources');

    const handleAddSource = (newSource) => {
        // This logic will need to be updated to add to the sources list inside the component
        console.log("New Source Added:", newSource);
    };

    return (
        <>
            <div className="space-y-6 animate-fade-in">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Data Management</h2>
                    <p className="text-gray-500">Manage data sources and the KPIs/KRIs that drive analytics.</p>
                </div>
                
                {/* --- NEW: Tab Navigation --- */}
                <div className="flex border-b border-gray-300">
                    <button onClick={() => setActiveTab('sources')} className={`py-2 px-4 flex items-center text-lg font-semibold ${activeTab === 'sources' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>
                        <Database size={20} className="mr-2"/> Data Sources
                    </button>
                    <button onClick={() => setActiveTab('kpi')} className={`py-2 px-4 flex items-center text-lg font-semibold ${activeTab === 'kpi' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>
                        <BarChart3 size={20} className="mr-2"/> KPI & KRI Library
                    </button>
                </div>

                {/* --- Conditionally render content based on active tab --- */}
                {activeTab === 'sources' && <DataSourcesView onAddClick={() => setIsModalOpen(true)} />}
                {activeTab === 'kpi' && <KpiKriLibraryView />}
            </div>
            
            {isModalOpen && <AddDataSourceModal onClose={() => setIsModalOpen(false)} onAddSource={handleAddSource} />}
        </>
    );
};

export default DataManagement;
