import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

// --- THIS IS THE FIX: All page components must be imported ---
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
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [userMode, setUserMode] = useState('Pro');
    const [pageContext, setPageContext] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // State for managing the active jurisdiction
    const [activeJurisdiction, setActiveJurisdiction] = useState('Global');

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
            // Pass the active jurisdiction to every page
            jurisdiction: activeJurisdiction,
        };

        switch (activeTab) {
            case 'Dashboard': return <ActionOrientedDashboard {...pageProps} />;
            case 'ComplianceReporting': return <ComplianceReporting {...pageProps} />;
            case 'DataManagement': return <DataManagement {...pageProps} />;
            case 'Library': return <Library {...pageProps} />;
            case 'RiskAssessment': return <RiskAssessment {...pageProps} />;
            case 'Licensing': return <Licensing {...pageProps} />;
            case 'RegulatoryUpdates': return <RegulatoryUpdates {...pageProps} />;
            case 'Manage': return <Manage {...pageProps} />;
            case 'Settings': return <Settings {...pageProps} />;
            default: return <ActionOrientedDashboard {...pageProps} />;
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