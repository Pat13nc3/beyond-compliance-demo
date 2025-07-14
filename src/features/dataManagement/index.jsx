import React, { useState } from 'react';
import { Database, Plus, MoreVertical, Wifi, WifiOff, AlertCircle, Edit, Zap, Trash2, BarChart3 } from 'lucide-react';
import AddDataSourceModal from './modals/AddDataSourceModal.jsx';
import ActionMenu from '../../components/ui/ActionMenu.jsx';
import { kpiAndKriData, initialDataSources } from '../../data/mockData.js';


// --- Data Sources View Component ---
const DataSourcesView = ({ onAddClick, dataSources }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Connected Data Sources</h3>
            <button onClick={onAddClick} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center">
                <Plus size={20} className="mr-2"/> Add New Source
            </button>
        </div>
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead>
                    <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium uppercase text-gray-500">Source Name</th>
                        <th className="text-left py-3 px-4 text-sm font-medium uppercase text-gray-500">Type</th>
                        <th className="text-left py-3 px-4 text-sm font-medium uppercase text-gray-500">Status</th>
                        <th className="text-right py-3 px-4 text-sm font-medium uppercase text-gray-500">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {dataSources.map(source => (
                        <tr key={source.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-4 font-medium">{source.name}</td>
                            <td className="px-4 py-4 text-gray-600">{source.type}</td>
                            <td className="px-4 py-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    source.status === 'Connected' ? 'bg-green-100 text-green-800' :
                                    source.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                }`}>
                                    {source.status}
                                </span>
                            </td>
                            <td className="px-4 py-4 text-right">
                                <ActionMenu items={[{ label: 'Edit', icon: Edit }, { label: 'Delete', icon: Trash2 }]} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);


// --- KPI & KRI Library View Component (NOW BUILT OUT) ---
const KpiKriLibraryView = ({ kpis }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">KPI & KRI Library</h3>
            <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center">
                <Plus size={20} className="mr-2"/> Add New Metric
            </button>
        </div>
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead>
                    <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium uppercase text-gray-500">Metric Name</th>
                        <th className="text-left py-3 px-4 text-sm font-medium uppercase text-gray-500">Type</th>
                        <th className="text-left py-3 px-4 text-sm font-medium uppercase text-gray-500">Category</th>
                        <th className="text-left py-3 px-4 text-sm font-medium uppercase text-gray-500">Status</th>
                        <th className="text-right py-3 px-4 text-sm font-medium uppercase text-gray-500">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {kpis.map(metric => (
                         <tr key={metric.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-4 font-medium">{metric.name}</td>
                            <td className="px-4 py-4 text-gray-600">{metric.type}</td>
                            <td className="px-4 py-4 text-gray-600">{metric.category}</td>
                            <td className="px-4 py-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${metric.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                    {metric.status}
                                </span>
                            </td>
                            <td className="px-4 py-4 text-right">
                                <ActionMenu items={[{ label: 'Edit', icon: Edit }, { label: 'Delete', icon: Trash2 }]} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);


const DataManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('sources');

    const handleAddSource = (newSource) => {
        console.log("New Source Added:", newSource);
    };

    return (
        <div className="p-6">
            <div className="space-y-6 animate-fade-in">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Data Management</h2>
                    <p className="text-gray-500">Manage data sources and the KPIs/KRIs that drive analytics.</p>
                </div>
                
                <div className="flex border-b border-gray-300">
                    <button onClick={() => setActiveTab('sources')} className={`py-2 px-4 flex items-center text-lg font-semibold ${activeTab === 'sources' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>
                        <Database size={20} className="mr-2"/> Data Sources
                    </button>
                    <button onClick={() => setActiveTab('kpi')} className={`py-2 px-4 flex items-center text-lg font-semibold ${activeTab === 'kpi' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>
                        <BarChart3 size={20} className="mr-2"/> KPI & KRI Library
                    </button>
                </div>

                {/* We now pass the correct data to each view component */}
                {activeTab === 'sources' && <DataSourcesView dataSources={initialDataSources} onAddClick={() => setIsModalOpen(true)} />}
                {activeTab === 'kpi' && <KpiKriLibraryView kpis={kpiAndKriData} />}
            </div>
            
            {isModalOpen && <AddDataSourceModal onClose={() => setIsModalOpen(false)} onAddSource={handleAddSource} />}
        </div>
    );
};

export default DataManagement;