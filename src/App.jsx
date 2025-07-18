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
    // --- Existing State ---
    const [activeTab, setActiveTab] = useState('Data Management'); // Start on Data Management to see the flow
    const [userMode, setUserMode] = useState('Pro');
    const [pageContext, setPageContext] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeJurisdiction, setActiveJurisdiction] = useState('Global');

    // --- NEW: State for Library Evidence ---
    // This state is "lifted up" to the App component so it can be shared
    // between DataManagement (which adds to it) and the Library (which displays it).
    const [libraryEvidence, setLibraryEvidence] = useState([
      { name: 'Q1 Board Meeting Minutes.pdf', status: 'New', id: 'evid-1' }
    ]);

    // --- NEW: Handler to add a file to the Library ---
    // This function will be passed down to the DataManagement component.
    const handlePromoteToLibrary = (fileToPromote) => {
        const newEvidence = {
          id: `evid-${Date.now()}`,
          name: fileToPromote.name,
          status: 'New', // Promoted files always start with a 'New' status
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
                return <ActionOrientedDashboard {...pageProps} onPrepareReport={(reportContext) => handleNavigate('ComplianceReporting', reportContext)} />;
            case 'ComplianceReporting':
                return <ComplianceReporting {...pageProps} />;
            
            case 'Data Management': 
            case 'DataManagement':
                // --- UPDATED: Pass the new handler to DataManagement ---
                return <DataManagement {...pageProps} onPromoteToLibrary={handlePromoteToLibrary} />;
            
            case 'Library':
                // --- UPDATED: Pass the evidence list to the Library ---
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
                return <ActionOrientedDashboard {...pageProps} onPrepareReport={() => handleNavigate('ComplianceReporting')} />;
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
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#e7f1fe]">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default App;
