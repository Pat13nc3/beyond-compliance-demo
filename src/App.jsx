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

const App = () => {
    const [activeTab, setActiveTab] = useState('Data Management');
    const [userMode, setUserMode] = useState('Pro');
    const [pageContext, setPageContext] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeJurisdiction, setActiveJurisdiction] = useState('Global');

    const [libraryEvidence, setLibraryEvidence] = useState([
      { name: 'Q1 Board Meeting Minutes.pdf', status: 'New', id: 'evid-1' }
    ]);

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

    const renderContent = () => {
        const pageProps = {
            onNavigate: handleNavigate,
            context: pageContext,
            onCleanContext: handleCleanContext,
            jurisdiction: activeJurisdiction,
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
            default:
                return <ActionOrientedDashboard {...pageProps} />; 
        }
    };

    return (
        // Outer container: flex to layout sidebar and main content, h-screen to fill viewport height
        <div className="flex h-screen bg-gray-900 text-white">
            <Sidebar
                activeTab={activeTab}
                setActiveTab={handleNavigate}
                isSidebarOpen={isSidebarOpen}
            />
            {/* Main content area: flex-1 to take remaining width, flex-col for vertical stacking */}
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
                {/* Main content area for pages: flex-1 to take remaining height, overflow for scrolling, bg-gray-900 for consistent dark background */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 h-full">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default App;