// src/features/dataManagement/index.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// Import all necessary icons, including Scale for IndicatorCard
import { Plus, Link, Shield, TrendingUp, Zap, Database, Settings, Scale } from 'lucide-react'; 

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
import { mockDataSources, mockIndicators, mockUserAccessData, mockTransactionData, mockEtlProcesses, filesPendingAnalysis } from '../../data/mockData.js';
import Toast from '../../components/ui/Toast.jsx';
import ConfirmationModal from '../../components/modals/ConfirmationModal.jsx';
import UploadModal from '../library/modals/UploadModal';


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
        <div className={`bg-gray-800 p-5 rounded-lg shadow-lg text-white border border-gray-700 hover:${borderColor} transition-all duration-300 transform hover:-translate-y-1`}>
            <div>
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                        {/* CORRECTED: Use Scale icon for IndicatorCard to avoid 'source is not defined' error */}
                        <div className="bg-gray-700 p-3 rounded-lg mr-4">
                            <Scale size={20} className="text-blue-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-100">{indicator.name}</h4>
                            <p className="text-xs text-gray-400">{indicator.type}</p>
                        </div>
                    </div>
                    {/* Placeholder for status info if needed for indicators */}
                </div>
                <div className="space-y-3 text-sm mb-4">
                    <div className="flex justify-between"><span className="text-gray-400">Data Quality Score</span><span className="font-semibold text-green-400">N/A</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Last Sync</span><span className="font-semibold text-gray-200">N/A</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Records Synced</span><span className="font-semibold text-gray-200">N/A</span></div>
                </div>
                {/* Chart placeholder removed for simplicity here, as it's not directly part of indicator */}
            </div>
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


const DataManagement = ({ onPromoteToLibrary, jurisdiction, onNavigate, context, onCleanContext, triggerAIAnalysis }) => { // Receive triggerAIAnalysis
    const navigate = useNavigate();
    const [dataSources, setDataSources] = useState(mockDataSources);
    const [indicatorLibrary, setIndicatorLibrary] = useState(mockIndicators);
    const [filesToAnalyze, setFilesToAnalyze] = useState(filesPendingAnalysis);
    const [syncingSourceId, setSyncingSourceId] = useState(null);
    const [isAddDataSourceModalOpen, setIsAddDataSourceModalOpen] = useState(false);
    const [isAddIndicatorModalOpen, setIsAddIndicatorModalOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [detailsModalData, setDetailsModalData] = useState(null);
    const [logModalSource, setLogModalSource] = useState(null);
    const [settingsModalSource, setSettingsModalSource] = useState(null);
    const [manageIndicatorModal, setManageIndicatorModal] = useState(null);
    const [workbenchContext, setWorkbenchContext] = useState(null);
    const [showWorkbench, setShowWorkbench] = useState(false);

    const [toastMessage, setToastMessage] = useState('');
    const [activeTab, setActiveTab] = useState('Data Sources');
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [etlDetailsModalData, setEtlDetailsModalData] = useState(null);
    const [detailedRecordsFilters, setDetailedRecordsFilters] = useState(context?.detailedRecordsFilters || {}); // Initialize here


    // Effect to handle context from external navigation (e.g., from Dashboard)
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
        setDataSources(current => [...current, { ...base, status: 'Pending', dataQuality: 0, recordsSynced: 0, lastSync: 'Never', chartData: [], syncHistory: [], credentials: sourceData.credentials }]);
        setIsAddDataSourceModalOpen(false);
        setToastMessage(`Data source '${sourceData.name}' added successfully.`);
        if (sourceData.type !== 'File Upload') {
            setWorkbenchContext({ dataSourceId: base.id, isNew: true });
            setShowWorkbench(true);
        }
    };

    const onFileImportSuccess = (newFile) => {
      setFilesToAnalyze((prev) => [...prev, newFile]);
      setIsUploadModalOpen(false);
      setWorkbenchContext({ fileId: newFile.id, isNew: true });
      setShowWorkbench(true);
    };

    const handleMapData = (fileObject) => {
      setWorkbenchContext({ fileId: fileObject.id });
      setShowWorkbench(true);
    };

    const handleMapDataForSource = (dataSourceId) => {
        setWorkbenchContext({ dataSourceId: dataSourceId });
        setShowWorkbench(true);
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
        setSettingsModalSource(null);
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
        setIndicatorLibrary(current => [...current, { ...newIndicator, linkedSourceIds: [], history: [] }]);
        setToastMessage(`Indicator '${newIndicator.name}' created successfully.`);
    };
    const handleManageIndicator = (indicatorId) => setManageIndicatorModal(indicatorLibrary.find(i => i.id === indicatorId));
    const handleSaveIndicatorLinks = (indicatorId, newLinkedIds) => {
        setIndicatorLibrary(current => current.map(indicator => indicator.id === indicatorId ? { ...indicator, linkedSourceIds: newLinkedIds } : indicator));
        setToastMessage('Indicator links updated.');
    };

    const handleStartAnalysis = (fileToAnalyze) => {
        let relevantIndicator;
        if (fileToAnalyze.name.includes('User Access Reviews')) {
            relevantIndicator = indicatorLibrary.find(i => i.id === 'kri-user-access');
        } else if (fileToAnalyze.name.includes('Transaction_Logs')) {
            relevantIndicator = indicatorLibrary.find(i => i.id === 'kri-transaction-compliance');
        } else {
            setToastMessage("Error: No suitable indicator found for this file type. Please check the KPI & KRI Library.");
            return;
        }

        if (relevantIndicator && relevantIndicator.validationRule && Array.isArray(relevantIndicator.validationRule.rules)) {
            setWorkbenchContext({ fileId: fileToAnalyze.id, isNew: false });
            setShowWorkbench(true);
        } else {
            setToastMessage("Error: Could not find a suitable indicator or its validation rules are not properly configured. Please check the KPI & KRI Library.");
        }
    };

    const handlePromoteFile = (fileId) => {
        setFilesToAnalyze(current => current.filter(f => f.id !== fileId));
        setToastMessage(`File ID "${fileId}" was successfully promoted.`);
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
                setWorkbenchContext({ dataSourceId: source.id, isNew: false });
                setShowWorkbench(true);
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
        } else if (nodeId.startsWith('system-')) {
            setActiveTab('Detailed Records');
            if (nodeId === 'system-compliance-db') {
                setDetailedRecordsFilters({ source: 'Internal', type: 'All' });
                setToastMessage(`Mapped to Detailed Records. Displaying data from the Compliance Data Lake.`);
            } else if (nodeId === 'system-risk-engine') {
                setDetailedRecordsFilters({ type: 'KYC', status: 'Rejected' });
                setToastMessage(`Mapped to Detailed Records. Displaying 'Rejected' KYC records for Risk Assessment review.`);
            }
        } else if (nodeId === 'external-regulator-suptech') {
            setActiveTab('Detailed Records');
            setDetailedRecordsFilters({ status: 'Approved', type: 'All' });
            setToastMessage(`Data is being prepared for direct submission to Regulator Suptech. Review the detailed records to ensure compliance before final filing.`);
        } else if (nodeId === 'external-beyond-supervision') {
            setActiveTab('Detailed Records');
            setDetailedRecordsFilters({ status: 'Approved', type: 'All' });
            setToastMessage(`Data is available for oversight by the Beyond Supervision platform. Ensure all relevant data is accurate for external auditing and continuous monitoring.`);
        } else {
            setToastMessage(`No specific drill-down configured for '${nodeName}'. Consider checking related Data Sources or Detailed Records manually.`);
        }
    };

    const renderHeaderButton = () => {
        if (activeTab === 'Data Sources') return <button onClick={() => setIsAddDataSourceModalOpen(true)} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 flex items-center"><Plus size={20} className="mr-2" /> Add New Source</button>;
        if (activeTab === 'KPI & KRI Library') return <button onClick={() => setIsAddIndicatorModalOpen(true)} className="bg-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 flex items-center"><Plus size={20} className="mr-2" /> Create Indicator</button>;
        return null;
    };

    return (
        <>
            {showWorkbench ? (
                <Workbench
                    fileId={workbenchContext?.fileId}
                    dataSourceId={workbenchContext?.dataSourceId}
                    isNew={workbenchContext?.isNew}
                    onPromoteToLibrary={onPromoteToLibrary} 
                />
            ) : (
                <div className="p-6 bg-gray-900 min-h-screen text-white font-inter">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold text-blue-400">Data Management</h2>
                            {renderHeaderButton()}
                        </div>
                        <div className="border-b border-gray-700 mb-6">
                            <nav className="-mb-px flex space-x-8">
                                {['Data Sources', 'Detailed Records', 'KPI & KRI Library', 'Data Flow'].map(tab => (
                                    <button key={tab} onClick={() => setActiveTab(tab)} className={`py-3 px-1 text-sm font-medium whitespace-nowrap ${activeTab === tab ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}>
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
                                            <FileAnalysisCard key={file.id} file={file} onMap={handleMapData} onDelete={() => { /* Implement delete logic for files */ }} onAnalyze={handleStartAnalysis}/>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-300 mb-4">Connected Data Sources</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {filteredDataSources.map(source => (
                                          <DataSourceCard
                                            key={source.id}
                                            source={source}
                                            onSync={handleSync}
                                            isSyncing={syncingSourceId === source.id}
                                            onShowDetails={handleShowDetails}
                                            onShowLogs={handleShowLogs}
                                            onShowSettings={handleShowSettings}
                                            onMapData={handleMapDataForSource} // Use the new helper function
                                          />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Detailed Records' && (
                            <DetailedRecordsTable
                                initialFilters={detailedRecordsFilters}
                                triggerAIAnalysis={triggerAIAnalysis} // Pass triggerAIAnalysis here
                            />
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

                    {/* Modals */}
                    {isAddDataSourceModalOpen && <AddDataSourceModal onAdd={handleAddDataSource} onClose={() => setIsAddDataSourceModalOpen(false)} />}
                    {isUploadModalOpen && <UploadModal onUploadSuccess={onFileImportSuccess} onClose={() => setIsUploadModalOpen(false)} />}
                    {isAddIndicatorModalOpen && <AddIndicatorModal onAddIndicator={handleAddIndicator} onClose={() => setIsAddIndicatorModalOpen(false)} />}
                    {detailsModalData && <SyncDetailsModal syncDetails={detailsModalData} onClose={() => setDetailsModalData(null)} />}
                    {logModalSource && <AuditLogModal source={logModalSource} onClose={() => setLogModalSource(null)} />}
                    {settingsModalSource && <SettingsModal source={settingsModalSource} onClose={() => setSettingsModalSource(null)} onSave={handleSaveSettings} onDelete={handleDeleteSource} setConfirmationModal={setConfirmationModal} />}
                    {manageIndicatorModal && <ManageIndicatorModal indicator={manageIndicatorModal} dataSources={dataSources} onClose={() => setManageIndicatorModal(null)} onSave={handleSaveIndicatorLinks} />}
                    {etlDetailsModalData && <EtlProcessDetailsModal etlProcess={etlDetailsModalData} onClose={() => setEtlDetailsModalData(null)} />}
                    {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}
                    {confirmationModal && <ConfirmationModal {...confirmationModal} />}
                </div>
            )}
        </>
    );
};

export default DataManagement;