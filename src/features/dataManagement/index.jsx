import React, { useState } from 'react';
import { Plus, Link, Shield, TrendingUp } from 'lucide-react';

import DataSourceCard from './components/DataSourceCard.jsx';
import FileAnalysisCard from './components/FileAnalysisCard.jsx';
import Workbench from './components/Workbench.jsx';
import AddDataSourceModal from './modals/AddDataSourceModal.jsx';
import SyncDetailsModal from './modals/SyncDetailsModal.jsx';
import AuditLogModal from './modals/AuditLogModal.jsx';
import SettingsModal from './modals/SettingsModal.jsx';
import AddIndicatorModal from './modals/AddIndicatorModal.jsx';
import ManageIndicatorModal from './modals/ManageIndicatorModal.jsx';
import { mockDataSources, mockIndicators } from '../../data/mockData.js';
import Toast from '../../components/ui/Toast.jsx';

const initialFilesToAnalyze = [{ id: 'file-1', name: 'Q3 User Access Reviews.xlsx', source: 'HR Upload', owner: 'Jane Doe', status: 'Needs Mapping' }];

const simulateApiCall = (sourceType) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() < 0.2) {
            return reject({ success: false, error: 'Connection timed out' });
        }
        let syncDetails = {};
        if (sourceType === 'API' || sourceType === 'On-chain') {
            syncDetails = { recordCount: Math.floor(Math.random() * 1500) + 500, headers: ['Transaction ID', 'Amount', 'Status', 'Timestamp'], previewRows: [[`txn_${(Math.random() + 1).toString(36).substring(7)}`, '$150.00', 'Completed', new Date().toLocaleString()], [`txn_${(Math.random() + 1).toString(36).substring(7)}`, '$2,300.50', 'Completed', new Date().toLocaleString()]] };
        } else {
            syncDetails = { recordCount: Math.floor(Math.random() * 200) + 50, headers: ['User ID', 'Email', 'Last Login', 'Status'], previewRows: [[`usr_${(Math.random() + 1).toString(36).substring(7)}`, 'test.user@example.com', new Date().toLocaleString(), 'Active'], [`usr_${(Math.random() + 1).toString(36).substring(7)}`, 'another.user@example.com', new Date().toLocaleString(), 'Active']] };
        }
        resolve({ success: true, newDataPoint: Math.floor(Math.random() * 40) + 50, syncDetails });
    }, 1500);
});

const IndicatorCard = ({ indicator, onManage }) => {
    const isKri = indicator.type === 'KRI';
    const borderColor = isKri ? 'border-red-500' : 'border-green-500';
    const icon = isKri ? <Shield size={16} className="text-red-400" /> : <TrendingUp size={16} className="text-green-400" />;
    const linkedSourcesCount = indicator.linkedSourceIds?.length || 0;

    return (
        <div className={`bg-gray-800 p-5 rounded-lg shadow-lg text-white border border-gray-700 hover:${borderColor} transition-all duration-300`}>
            <div className="flex justify-between items-start mb-3">
                <h4 className="font-bold text-gray-100">{indicator.name}</h4>
                <span className={`px-2 py-1 text-xs rounded-full font-semibold flex items-center gap-2 ${isKri ? 'bg-red-900 text-red-300' : 'bg-green-900 text-green-300'}`}>
                    {icon} {indicator.type}
                </span>
            </div>
            <p className="text-sm text-gray-400 mb-4 h-10">{indicator.description}</p>
            <div className="text-xs text-gray-500 mb-4 font-mono">CATEGORY: {indicator.category.toUpperCase()}</div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-700 text-sm">
                <div className="flex items-center space-x-4">
                    <span className="flex items-center text-gray-300"><Link size={14} className="mr-2"/> {linkedSourcesCount} Sources</span>
                    <span className={`font-semibold ${isKri ? 'text-red-400' : 'text-green-400'}`}>
                        {isKri ? 'Threshold:' : 'Target:'} {indicator.targetValue} {indicator.targetUnit}
                    </span>
                </div>
                <button onClick={() => onManage(indicator.id)} className="text-yellow-500 hover:text-yellow-400 font-semibold">Manage</button>
            </div>
        </div>
    );
};

const DataManagement = ({ onPromoteToLibrary }) => {
    const [dataSources, setDataSources] = useState(mockDataSources);
    const [indicatorLibrary, setIndicatorLibrary] = useState(mockIndicators);
    const [filesToAnalyze, setFilesToAnalyze] = useState(initialFilesToAnalyze);
    const [syncingSourceId, setSyncingSourceId] = useState(null);
    const [isAddDataSourceModalOpen, setIsAddDataSourceModalOpen] = useState(false);
    const [isAddIndicatorModalOpen, setIsAddIndicatorModalOpen] = useState(false);
    const [detailsModalData, setDetailsModalData] = useState(null);
    const [logModalSource, setLogModalSource] = useState(null);
    const [settingsModalSource, setSettingsModalSource] = useState(null);
    const [manageIndicatorModal, setManageIndicatorModal] = useState(null);
    const [workbenchContext, setWorkbenchContext] = useState(null);
    const [toastMessage, setToastMessage] = useState('');
    const [activeTab, setActiveTab] = useState('Data Sources');

    const handleAddDataSource = (sourceData) => {
        const base = {
            id: `src-${Date.now()}`, name: sourceData.name, type: sourceData.type,
            logHistory: [{ timestamp: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }), event: 'Source Created', triggeredBy: 'Manual', details: `Integration '${sourceData.name}' of type '${sourceData.type}' was created.` }]
        };
        if (sourceData.type === 'File Upload') {
            setFilesToAnalyze(current => [{ ...base, source: 'Manual Upload', owner: 'Current User', status: 'Needs Mapping', fileInfo: sourceData.fileInfo }, ...current]);
        } else {
            setDataSources(current => [{ ...base, status: 'Pending', dataQuality: 0, recordsSynced: 0, lastSync: 'Never', chartData: [], syncHistory: [], credentials: sourceData.credentials }, ...current]);
        }
        setIsAddDataSourceModalOpen(false);
    };

    const handleSync = async (sourceId) => {
        setSyncingSourceId(sourceId);
        try {
            const sourceToSync = dataSources.find(s => s.id === sourceId);
            const result = await simulateApiCall(sourceToSync.type);
            setDataSources(current => current.map(s => s.id === sourceId ? { ...s, status: 'Connected', dataQuality: (Math.random() * (99.9 - 95) + 95).toFixed(1), recordsSynced: s.recordsSynced + result.syncDetails.recordCount, lastSync: 'Just now', chartData: [...(s.chartData || []).slice(-6), { value: result.newDataPoint }], syncHistory: [...(s.syncHistory || []), result.syncDetails] } : s));
        } catch (error) {
            setDataSources(current => current.map(s => (s.id === sourceId ? { ...s, status: 'Error' } : s)));
        } finally {
            setSyncingSourceId(null);
        }
    };

    const handleShowDetails = (sourceId) => {
        const source = dataSources.find(s => s.id === sourceId);
        if (source?.syncHistory?.length > 0) setDetailsModalData({ sourceName: source.name, ...source.syncHistory[source.syncHistory.length - 1] });
    };

    const handleShowLogs = (sourceId) => setLogModalSource(dataSources.find(s => s.id === sourceId));
    const handleShowSettings = (sourceId) => setSettingsModalSource(dataSources.find(s => s.id === sourceId));
    const handleSaveSettings = (sourceId, updatedSettings) => setDataSources(current => current.map(s => (s.id === sourceId ? { ...s, ...updatedSettings } : s)));
    const handleDeleteSource = (sourceId) => setDataSources(current => current.filter(s => s.id !== sourceId));
    const handleAddIndicator = (newIndicator) => setIndicatorLibrary(current => [{ ...newIndicator, linkedSourceIds: [] }, ...current]);
    const handleManageIndicator = (indicatorId) => setManageIndicatorModal(indicatorLibrary.find(i => i.id === indicatorId));
    const handleSaveIndicatorLinks = (indicatorId, newLinkedIds) => setIndicatorLibrary(current => current.map(indicator => indicator.id === indicatorId ? { ...indicator, linkedSourceIds: newLinkedIds } : indicator));

    const handleStartAnalysis = (fileToAnalyze) => {
        const relevantIndicator = indicatorLibrary.find(i => i.id === 'kri-user-access');
        if (relevantIndicator) setWorkbenchContext({ fileData: fileToAnalyze, activeIndicator: relevantIndicator });
        else alert("Could not find a suitable indicator for this file type.");
    };

    const handlePromoteFile = () => {
        if (workbenchContext?.fileData) {
            onPromoteToLibrary(workbenchContext.fileData);
            setFilesToAnalyze(current => current.filter(f => f.id !== workbenchContext.fileData.id));
            setToastMessage(`"${workbenchContext.fileData.name}" was successfully promoted.`);
            setWorkbenchContext(null);
        }
    };

    const renderHeaderButton = () => {
        if (activeTab === 'Data Sources') return <button onClick={() => setIsAddDataSourceModalOpen(true)} className="bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-md hover:bg-yellow-400 flex items-center"><Plus size={20} className="mr-2" /> Add New Source</button>;
        if (activeTab === 'KPI & KRI Library') return <button onClick={() => setIsAddIndicatorModalOpen(true)} className="bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-md hover:bg-yellow-400 flex items-center"><Plus size={20} className="mr-2" /> Create Indicator</button>;
        return null;
    };

    if (workbenchContext) return <Workbench fileData={workbenchContext.fileData} activeIndicator={workbenchContext.activeIndicator} onBack={() => setWorkbenchContext(null)} onPromote={handlePromoteFile} />;

    return (
        // This outer div is the main page container
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            {/* This container constrains the width and centers the content, fixing the layout issue */}
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">Data Management</h2>
                    {renderHeaderButton()}
                </div>
                <div className="border-b border-gray-700 mb-6">
                    <nav className="-mb-px flex space-x-8">
                        {['Data Sources', 'KPI & KRI Library'].map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)} className={`py-3 px-1 text-sm font-medium whitespace-nowrap ${activeTab === tab ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-400 hover:text-white'}`}>
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>
                
                {activeTab === 'Data Sources' && (
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-300 mb-4">Files Pending Analysis</h3>
                            {/* This grid now correctly has 3 columns on large screens */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filesToAnalyze.map(file => <FileAnalysisCard key={file.id} file={file} onMap={() => handleStartAnalysis(file)} />)}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-300 mb-4">Connected Data Sources</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {dataSources.map(source => (<DataSourceCard key={source.id} source={source} onSync={handleSync} isSyncing={syncingSourceId === source.id} onShowDetails={handleShowDetails} onShowLogs={handleShowLogs} onShowSettings={handleShowSettings} />))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'KPI & KRI Library' && (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {indicatorLibrary.map(indicator => (<IndicatorCard key={indicator.id} indicator={indicator} onManage={handleManageIndicator} />))}
                        </div>
                    </div>
                )}
            </div>

            {/* Modals remain outside the main content container */}
            {isAddDataSourceModalOpen && <AddDataSourceModal onAdd={handleAddDataSource} onClose={() => setIsAddDataSourceModalOpen(false)} />}
            {isAddIndicatorModalOpen && <AddIndicatorModal onAdd={handleAddIndicator} onClose={() => setIsAddIndicatorModalOpen(false)} />}
            {detailsModalData && <SyncDetailsModal syncDetails={detailsModalData} onClose={() => setDetailsModalData(null)} />}
            {logModalSource && <AuditLogModal source={logModalSource} onClose={() => setLogModalSource(null)} />}
            {settingsModalSource && <SettingsModal source={settingsModalSource} onClose={() => setSettingsModalSource(null)} onSave={handleSaveSettings} onDelete={handleDeleteSource} />}
            {manageIndicatorModal && <ManageIndicatorModal indicator={manageIndicatorModal} dataSources={dataSources} onClose={() => setManageIndicatorModal(null)} onSave={handleSaveIndicatorLinks} />}
            {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}
        </div>
    );
};

export default DataManagement;
