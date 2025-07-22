// src/features/dataManagement/index.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Link, Shield, TrendingUp } from 'lucide-react';

import DataSourceCard from './components/DataSourceCard.jsx';
import FileAnalysisCard from './components/FileAnalysisCard.jsx';
import Workbench from './components/Workbench.jsx';
import DetailedRecordsTable from './components/DetailedRecordsTable.jsx';
import DataFlowDiagram from './components/DataFlowDiagram.jsx';
import AddDataSourceModal from './modals/AddDataSourceModal.jsx';
import SyncDetailsModal from './modals/SyncDetailsModal.jsx';
import AuditLogModal from './modals/AuditLogModal.jsx';
import SettingsModal from './modals/SettingsModal.jsx';
import AddIndicatorModal from './modals/AddIndicatorModal.jsx';
import ManageIndicatorModal from './modals/ManageIndicatorModal.jsx';
import EtlProcessDetailsModal from './modals/EtlProcessDetailsModal.jsx';
import { mockDataSources, mockIndicators, mockUserAccessData, mockTransactionData, mockEtlProcesses } from '../../data/mockData.js';
import Toast from '../../components/ui/Toast.jsx';
import ConfirmationModal from '../../components/modals/ConfirmationModal.jsx';

const initialFilesToAnalyze = [
    { id: 'file-1', name: 'Q3 User Access Reviews.xlsx', source: 'HR Upload', owner: 'Jane Doe', status: 'Needs Mapping', jurisdiction: 'Global' },
    { id: 'file-2', name: 'Transaction_Logs_Q3_2025.xlsx', source: 'Core System Export', owner: 'Kene Gold', status: 'Needs Mapping', jurisdiction: 'Nigeria' }
];

const simulateApiCall = (sourceType) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() < 0.05) {
            return reject({ success: false, error: 'Connection timed out or API limit reached.' });
        }
        let syncDetails = {};
        if (sourceType === 'API' || sourceType === 'On-chain') {
            syncDetails = { recordCount: Math.floor(Math.random() * 1500) + 500, headers: ['Transaction ID', 'Amount', 'Status', 'Timestamp'], previewRows: [['txn_abc', '$150.00', 'Completed', new Date().toLocaleString()], ['txn_def', '$2,300.50', 'Completed', new Date().toLocaleString()]] };
        } else {
            syncDetails = { recordCount: Math.floor(Math.random() * 200) + 50, headers: ['User ID', 'Email', 'Last Login', 'Status'], previewRows: [['usr_abc', 'test.user@example.com', new Date().toLocaleString(), 'Active'], ['usr_def', 'another.user@example.com', new Date().toLocaleString(), 'Active']] };
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

const DataManagement = ({ onPromoteToLibrary, jurisdiction, onNavigate, context, onCleanContext }) => {
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
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [detailedRecordsFilters, setDetailedRecordsFilters] = useState({});
    const [etlDetailsModalData, setEtlDetailsModalData] = useState(null); // FIX: Added missing useState declaration

    useEffect(() => {
        if (context) {
            if (context.initialTab) {
                setActiveTab(context.initialTab);
            }
            if (context.detailedRecordsFilters) {
                setDetailedRecordsFilters(context.detailedRecordsFilters);
            } else {
                setDetailedRecordsFilters({});
            }
            if (context.sourceId) {
                const source = dataSources.find(s => s.id === context.sourceId);
                if (source) {
                    handleShowDetails(source.id);
                } else {
                    setToastMessage(`Source with ID '${context.sourceId}' not found.`);
                }
            }
            if (onCleanContext) {
                onCleanContext();
            }
        }
    }, [context, dataSources, onCleanContext]);

    const filteredDataSources = useMemo(() => {
        if (jurisdiction === 'Global') {
            return dataSources;
        }
        return dataSources.filter(source => source.jurisdiction === jurisdiction || source.jurisdiction === 'Global');
    }, [dataSources, jurisdiction]);

    const filteredFilesToAnalyze = useMemo(() => {
        if (jurisdiction === 'Global') {
            return filesToAnalyze;
        }
        return filesToAnalyze.filter(file => file.jurisdiction === jurisdiction || file.jurisdiction === 'Global');
    }, [filesToAnalyze, jurisdiction]);


    const handleAddDataSource = (sourceData) => {
        const base = {
            id: `src-${Date.now()}`, name: sourceData.name, type: sourceData.type,
            logHistory: [{ timestamp: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }), event: 'Source Created', triggeredBy: 'Manual', details: `Integration '${sourceData.name}' of type '${sourceData.type}' was created.` }],
            jurisdiction: sourceData.jurisdiction || 'Global'
        };
        if (sourceData.type === 'File Upload') {
            setFilesToAnalyze(current => [{ ...base, source: 'Manual Upload', owner: 'Current User', status: 'Needs Mapping', fileInfo: sourceData.fileInfo }, ...current]);
        } else {
            setDataSources(current => [{ ...base, status: 'Pending', dataQuality: 0, recordsSynced: 0, lastSync: 'Never', chartData: [], syncHistory: [], credentials: sourceData.credentials }, ...current]);
        }
        setIsAddDataSourceModalOpen(false);
        setToastMessage(`Data source '${sourceData.name}' added successfully.`);
    };

    const handleSync = async (sourceId) => {
        setSyncingSourceId(sourceId);
        setToastMessage('Syncing data...');
        try {
            const sourceToSync = dataSources.find(s => s.id === sourceId);
            const result = await simulateApiCall(sourceToSync.type);
            setDataSources(current => current.map(s => s.id === sourceId ? { ...s, status: 'Connected', dataQuality: (Math.random() * (99.9 - 95) + 95).toFixed(1), recordsSynced: s.recordsSynced + result.syncDetails.recordCount, lastSync: 'Just now', chartData: [...(s.chartData || []).slice(-6), { value: result.newDataPoint }], syncHistory: [...(s.syncHistory || []), result.syncDetails] } : s));
            setToastMessage('Data synced successfully!');
        } catch (error) {
            setDataSources(current => current.map(s => (s.id === sourceId ? { ...s, status: 'Error' } : s)));
            setToastMessage(`Sync failed: ${error.error || 'Unknown error'}. Please check source settings.`);
        } finally {
            setSyncingSourceId(null);
        }
    };

    const handleShowDetails = (sourceId) => {
        const source = dataSources.find(s => s.id === sourceId);
        if (source?.syncHistory?.length > 0) {
            setDetailsModalData({ sourceName: source.name, ...source.syncHistory[source.syncHistory.length - 1] });
        } else {
            setDetailsModalData({
                sourceName: source?.name || 'Unknown Source',
                recordCount: 0,
                headers: ['Status Message'],
                previewRows: [['No sync history available for this source. Consider initiating a manual sync.']],
                noHistory: true
            });
        }
    };

    const handleShowLogs = (sourceId) => setLogModalSource(dataSources.find(s => s.id === sourceId));
    const handleShowSettings = (sourceId) => setSettingsModalSource(dataSources.find(s => s.id === sourceId));
    const handleSaveSettings = (sourceId, updatedSettings) => {
        setDataSources(current => current.map(s => (s.id === sourceId ? { ...s, ...updatedSettings } : s)));
        setToastMessage('Settings saved successfully.');
    };
    const handleDeleteSource = (sourceId) => {
        setConfirmationModal({
            title: "Confirm Deletion",
            message: `Are you sure you want to delete this data source? This action is irreversible.`,
            onConfirm: () => {
                setDataSources(current => current.filter(s => s.id !== sourceId));
                setToastMessage('Data source deleted successfully.');
                setConfirmationModal(null);
                setSettingsModalSource(null);
            },
            onCancel: () => setConfirmationModal(null)
        });
    };
    const handleAddIndicator = (newIndicator) => {
        setIndicatorLibrary(current => [{ ...newIndicator, linkedSourceIds: [], history: [] }, ...current]);
        setToastMessage(`Indicator '${newIndicator.name}' created successfully.`);
    };
    const handleManageIndicator = (indicatorId) => setManageIndicatorModal(indicatorLibrary.find(i => i.id === indicatorId));
    const handleSaveIndicatorLinks = (indicatorId, newLinkedIds) => {
        setIndicatorLibrary(current => current.map(indicator => indicator.id === indicatorId ? { ...indicator, linkedSourceIds: newLinkedIds } : indicator));
        setToastMessage('Indicator links updated.');
    };

    const handleStartAnalysis = (fileToAnalyze) => {
        let relevantIndicator;
        let mockSourceDataForWorkbench;

        if (fileToAnalyze.name.includes('User Access Reviews')) {
            relevantIndicator = indicatorLibrary.find(i => i.id === 'kri-user-access');
            mockSourceDataForWorkbench = mockUserAccessData;
        } else if (fileToAnalyze.name.includes('Transaction_Logs')) {
            relevantIndicator = indicatorLibrary.find(i => i.id === 'kri-transaction-compliance');
            mockSourceDataForWorkbench = mockTransactionData;
        } else {
            setToastMessage("Error: No suitable indicator or mock data found for this file type. Please check the KPI & KRI Library.");
            return;
        }

        if (relevantIndicator && relevantIndicator.validationRule && Array.isArray(relevantIndicator.validationRule.rules)) {
            setWorkbenchContext({ fileData: fileToAnalyze, activeIndicator: relevantIndicator, sourceDataForWorkbench: mockSourceDataForWorkbench });
        } else {
            setToastMessage("Error: Could not find a suitable indicator or its validation rules are not properly configured. Please check the KPI & KRI Library.");
        }
    };

    const handlePromoteFile = () => {
        if (workbenchContext?.fileData) {
            onPromoteToLibrary(workbenchContext.fileData);
            setFilesToAnalyze(current => current.filter(f => f.id !== workbenchContext.fileData.id));
            setToastMessage(`"${workbenchContext.fileData.name}" was successfully promoted.`);
            setWorkbenchContext(null);
        }
    };

    const handleDataFlowDiagramNodeClick = (nodeId, nodeName, nodeType) => {
        setDetailedRecordsFilters({});

        const sourceIdMap = {
            'source-stripe': 'src-stripe-api',
            'source-kyc-db': 'src-internal-user-db',
            'source-hr-file': 'src-internal-user-db',
            'system-etl': 'etl-main-payments',
            'system-compliance-db': 'COMPLIANCE_DB',
            'system-reporting': 'REPORTING_ENGINE',
            'system-risk-engine': 'RISK_ENGINE',
        };

        if (nodeId.startsWith('source-')) {
            const mappedSourceId = sourceIdMap[nodeId];
            const source = dataSources.find(s => s.id === mappedSourceId);
            if (source) {
                setActiveTab('Data Sources');
                handleShowDetails(source.id);
            } else {
                setToastMessage(`Data source '${nodeName}' not found in connected data sources. Please check the 'Data Sources' tab.`);
            }
        } else if (nodeId === 'system-etl') {
            const etlProcess = mockEtlProcesses.find(p => p.id === sourceIdMap[nodeId]);
            if (etlProcess) {
                setEtlDetailsModalData(etlProcess);
            } else {
                setToastMessage(`ETL Process details for '${nodeName}' not found.`);
            }
        } else if (nodeId === 'system-reporting') {
            onNavigate('ComplianceReporting', { action: 'initiateReportGeneration' });
            setToastMessage(`Navigating to Compliance Reporting to prepare reports.`);
        }
        else if (nodeId.startsWith('system-')) {
            setActiveTab('Detailed Records');
            if (nodeId === 'system-compliance-db') {
                setDetailedRecordsFilters({ source: 'Internal', type: 'All' });
                setToastMessage(`Mapped to Detailed Records. Displaying data from the Compliance Data Lake.`);
            } else if (nodeId === 'system-risk-engine') {
                setDetailedRecordsFilters({ type: 'KYC', status: 'Rejected' });
                setToastMessage(`Mapped to Detailed Records. Displaying 'Rejected' KYC records for Risk Assessment review.`);
            }
        } else {
            setToastMessage(`No specific drill-down configured for '${nodeName}'. Consider checking related Data Sources or Detailed Records manually.`);
        }
    };

    const renderHeaderButton = () => {
        if (activeTab === 'Data Sources') return <button onClick={() => setIsAddDataSourceModalOpen(true)} className="bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-md hover:bg-yellow-400 flex items-center"><Plus size={20} className="mr-2" /> Add New Source</button>;
        if (activeTab === 'KPI & KRI Library') return <button onClick={() => setIsAddIndicatorModalOpen(true)} className="bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-md hover:bg-yellow-400 flex items-center"><Plus size={20} className="mr-2" /> Create Indicator</button>;
        return null;
    };

    if (workbenchContext) return <Workbench fileData={workbenchContext.fileData} activeIndicator={workbenchContext.activeIndicator} onBack={() => setWorkbenchContext(null)} onPromote={handlePromoteFile} setToastMessage={setToastMessage} sourceDataForWorkbench={workbenchContext.sourceDataForWorkbench} />;

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">Data Management</h2>
                    {renderHeaderButton()}
                </div>
                <div className="border-b border-gray-700 mb-6">
                    <nav className="-mb-px flex space-x-8">
                        {['Data Sources', 'Detailed Records', 'KPI & KRI Library', 'Data Flow'].map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)} className={`py-3 px-1 text-sm font-medium whitespace-nowrap ${activeTab === tab ? 'text-[#c0933e] border-b-2 border-[#c0933e]' : 'text-gray-400 hover:text-white'}`}>
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>

                {activeTab === 'Data Sources' && (
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-300 mb-4">Files Pending Analysis</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredFilesToAnalyze.map(file => (
                                    <FileAnalysisCard key={file.id} file={file} onMap={() => handleStartAnalysis(file)} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-300 mb-4">Connected Data Sources</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredDataSources.map(source => (<DataSourceCard key={source.id} source={source} onSync={handleSync} isSyncing={syncingSourceId === source.id} onShowDetails={handleShowDetails} onShowLogs={handleShowLogs} onShowSettings={handleShowSettings} />))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Detailed Records' && (
                    <DetailedRecordsTable initialFilters={detailedRecordsFilters} />
                )}

                {activeTab === 'KPI & KRI Library' && (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {indicatorLibrary.map(indicator => (
                                <IndicatorCard key={indicator.id} indicator={indicator} onManage={handleManageIndicator} />
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'Data Flow' && (
                    <DataFlowDiagram onNodeClick={handleDataFlowDiagramNodeClick} />
                )}
            </div>

            {isAddDataSourceModalOpen && <AddDataSourceModal onAdd={handleAddDataSource} onClose={() => setIsAddDataSourceModalOpen(false)} setToastMessage={setToastMessage} />}
            {isAddIndicatorModalOpen && <AddIndicatorModal onAdd={handleAddIndicator} onClose={() => setIsAddIndicatorModalOpen(false)} setToastMessage={setToastMessage} />}
            {detailsModalData && <SyncDetailsModal syncDetails={detailsModalData} onClose={() => setDetailsModalData(null)} />}
            {logModalSource && <AuditLogModal source={logModalSource} onClose={() => setLogModalSource(null)} />}
            {settingsModalSource && <SettingsModal source={settingsModalSource} onClose={() => setSettingsModalSource(null)} onSave={handleSaveSettings} onDelete={handleDeleteSource} setConfirmationModal={setConfirmationModal} />}
            {manageIndicatorModal && <ManageIndicatorModal indicator={manageIndicatorModal} dataSources={dataSources} onClose={() => setManageIndicatorModal(null)} onSave={handleSaveIndicatorLinks} />}
            {etlDetailsModalData && <EtlProcessDetailsModal etlProcess={etlDetailsModalData} onClose={() => setEtlDetailsModalData(null)} />}
            {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}
            {confirmationModal && <ConfirmationModal {...confirmationModal} />}
        </div>
    );
};

export default DataManagement;