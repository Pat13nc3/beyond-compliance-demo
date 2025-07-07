import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import ActionOrientedDashboard from './components/dashboard/ActionOrientedDashboard';
import ComplianceReporting from './pages/ComplianceReporting.jsx';
import DataManagement from './pages/DataManagement.jsx';
import Library from './pages/Library.jsx';
import RiskAssessment from './pages/RiskAssessment.jsx';
import Licensing from './pages/Licensing.jsx';
import RegulatoryUpdates from './pages/RegulatoryUpdates.jsx';
// UPDATED: Importing the separated Manage and Settings pages
import Manage from './pages/Manage.jsx';
import Settings from './pages/Settings.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [initialReportParams, setInitialReportParams] = useState(null);
  const [navigationContext, setNavigationContext] = useState(null);
  const [userMode, setUserMode] = useState('Pro');

  const handlePrepareReport = (params) => {
      setInitialReportParams(params);
      setActiveTab('Compliance Reporting');
  };
  
  const clearInitialParams = () => { setInitialReportParams(null); };
  const handleNavigate = (tabName, context = null) => {
    setNavigationContext(context);
    setActiveTab(tabName);
  };
  const clearNavigationContext = () => { setNavigationContext(null); };

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <ActionOrientedDashboard userMode={userMode} setActiveTab={setActiveTab} onPrepareReport={handlePrepareReport} onViewUpdate={(update) => handleNavigate('Regulatory Updates', { selectedUpdateId: update.id })} />;
      case 'Compliance Reporting':
        return <ComplianceReporting initialParams={initialReportParams} onClearParams={clearInitialParams} userMode={userMode}/>;
      case 'Data Management': 
        return <DataManagement userMode={userMode}/>;
      case 'Library': 
        return <Library onNavigate={handleNavigate} userMode={userMode}/>;
      case 'Risk Assessment': 
        return <RiskAssessment userMode={userMode}/>;
      case 'Licensing':
        return <Licensing onNavigate={handleNavigate} userMode={userMode}/>;
      case 'Regulatory Updates':
        return <RegulatoryUpdates context={navigationContext} onClearContext={clearNavigationContext} userMode={userMode}/>;
      // --- UPDATED: Routing for the new module structure ---
      case 'Manage': 
        return <Manage userMode={userMode}/>;
      case 'Settings':
        return <Settings userMode={userMode}/>;
      default:
        return <ActionOrientedDashboard userMode={userMode} setActiveTab={setActiveTab} onPrepareReport={handlePrepareReport} onViewUpdate={(update) => handleNavigate('Regulatory Updates', { selectedUpdateId: update.id })}/>;
    }
  };

  return (
    <div className="flex h-screen bg-[#e7f1fe] font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col transition-all duration-300">
        <Header 
          activeTab={activeTab} 
          isSidebarOpen={isSidebarOpen} 
          setIsSidebarOpen={setIsSidebarOpen}
          userMode={userMode}
          setUserMode={setUserMode}
        />
        <main className="flex-1 p-4 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
