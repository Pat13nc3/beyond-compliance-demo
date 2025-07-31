// src/App.jsx

import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

// --- Import all your page components ---
import ActionOrientedDashboard from './features/dashboard';
import ComplianceReporting from './features/complianceReporting';
import DataManagement from './features/dataManagement';
import Library from './features/library';
import RiskAssessment from './features/riskAssessment';
import Licensing from './features/licensing';
import RegulatoryUpdates from './features/regulatoryUpdates';
import Manage from './features/manage';
import Settings from './features/settings';

// UPDATED: Only import the main AI Agent feature index
import AIAgent from './features/aiAgent'; // New direct import for the feature's index

// REMOVED: Direct imports for RegulatoryAIAgentView, ViewAIInsightModal, SimulateAIOutputModal
import Toast from './components/ui/Toast';


const App = () => {
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [userMode, setUserMode] = useState('Pro');
    const [pageContext, setPageContext] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeJurisdiction, setActiveJurisdiction] = useState('Global');

    const [libraryEvidence, setLibraryEvidence] = useState([
      { name: 'Q1 Board Meeting Minutes.pdf', status: 'New', id: 'evid-1' }
    ]);

    // --- REMOVED: AI Agent Specific States (Moved to aiAgent/index.jsx) ---
    // const [aiConfig, setAiConfig] = useState({...});
    // const [selectedInsight, setSelectedInsight] = useState(null);
    // const [isViewAIInsightModalOpen, setIsViewAIInsightModalOpen] = useState(false);
    // const [isSimulateAIOutputModalOpen, setIsSimulateAIOutputModalOpen] = useState(false);
    // const [simulateActionType, setSimulateActionType] = useState('');
    // const [simulateOutputData, setSimulateOutputData] = {};
    const [toastMessage, setToastMessage] = useState(''); // Keep global toast for App-level messages


    // --- REMOVED: AI Agent Specific Handlers (Moved to aiAgent/index.jsx) ---
    // const handleSaveAiConfig = (newAiConfig) => { ... };
    // const handleSimulateAiAction = (actionType) => { ... };
    // const handleViewInsightClick = (insight) => { ... };

    const handlePromoteToLibrary = (fileToPromote) => {
        const newEvidence = {
          id: `evid-${Date.now()}`,
          name: fileToPromote.name,
          status: 'New',
        };
        setLibraryEvidence(currentEvidence => [newEvidence, ...currentEvidence]);
    };

    const handleNavigate = (tab, context = null) => {
        setActiveTab(tab);
        setPageContext(context);
    };

    const handleCleanContext = () => {
        setPageContext(null);
    };

    // Auto-clear global toast message after a few seconds
    React.useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => {
                setToastMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);


    const renderContent = () => {
        const pageProps = {
            onNavigate: handleNavigate,
            context: pageContext,
            onCleanContext: handleCleanContext,
            jurisdiction: activeJurisdiction,
            // REMOVED: AI-specific handlers, as they are now managed within AIAgent component
            // onSaveAiConfig: handleSaveAiConfig,
            // onSimulateAiAction: handleSimulateAiAction,
            // onViewInsight: handleViewInsightClick,
        };

        switch (activeTab) {
            case 'Dashboard':
                return <ActionOrientedDashboard {...pageProps} />; 
            case 'ComplianceReporting':
                return <ComplianceReporting {...pageProps} />;

            case 'Data Management':
            case 'DataManagement': // Fallback for consistency
                return <DataManagement {...pageProps} onPromoteToLibrary={handlePromoteToLibrary} jurisdiction={activeJurisdiction} onNavigate={handleNavigate} />;

            case 'Library':
                return <Library {...pageProps} evidence={libraryEvidence} />;
            case 'RiskAssessment':
                return <RiskAssessment {...pageProps} />;
            case 'Licensing':
                return <Licensing {...pageProps} />;
            case 'RegulatoryUpdates':
                return <RegulatoryUpdates {...pageProps} />;
            case 'Manage':
                return <Manage {...pageProps} />;
            case 'Settings':
                return <Settings {...pageProps} />;
            case 'AIAgent': // Now renders the new AIAgent index component
                return <AIAgent />; // No props needed here, as state is now internal
            default:
                return <ActionOrientedDashboard {...pageProps} />; 
        }
    };

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            <Sidebar
                activeTab={activeTab}
                setActiveTab={handleNavigate}
                isSidebarOpen={isSidebarOpen}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header
                    activeTab={activeTab}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                    userMode={userMode}
                    setUserMode={setUserMode}
                    activeJurisdiction={activeJurisdiction}
                    setActiveJurisdiction={setActiveJurisdiction}
                />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 h-full">
                    {renderContent()}
                </main>
            </div>

            {/* REMOVED: AI Agent Modals (Moved to aiAgent/index.jsx) */}
            {/* {isViewAIInsightModalOpen && (...) } */}
            {/* {isSimulateAIOutputModalOpen && (...) } */}

            {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}
        </div>
    );
};

export default App;