// src/features/licensing/index.jsx

import React, { useState } from "react";
import { Award, Plus, MoreVertical, Search, CheckCircle, Clock, AlertTriangle, Edit, Trash2, Eye, RefreshCw } from "lucide-react";
import ApplyLicenseModal from "./modals/ApplyLicenseModal.jsx";
import ApplicationProjectView from "./components/ApplicationProjectView.jsx";
import ActionMenu from "../../components/ui/ActionMenu.jsx";
import PlatformLicenseView from "./components/PlatformLicenseView.jsx";
import Toast from '../../components/ui/Toast.jsx';

const mockLicenses = [
    { id: 1, name: 'Payment Service Provider (PSP)', jurisdiction: 'Nigeria (CBN)', status: 'Active', expiry: '2023-12-31' },
    { id: 2, name: 'Digital Asset Service Provider (DASP)', jurisdiction: 'Kenya (CMA)', status: 'Application in Progress', expiry: 'N/A' },
    { id: 3, name: 'Money Transmitter License', jurisdiction: 'Ghana (BOG)', status: 'Renewal Due', expiry: '2025-08-15' },
    { id: 4, name: 'E-Money Issuer', jurisdiction: 'South Africa (SARB)', status: 'Active', expiry: '2026-05-20' },
];

const Licensing = ({ triggerAIAnalysis }) => {
    const [licenses, setLicenses] = useState(mockLicenses);
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [view, setView] = useState('list');
    const [selectedLicense, setSelectedLicense] = useState(null);
    const [modalMode, setModalMode] = useState('application'); 
    const [activeTab, setActiveTab] = useState('platform');
    const [toastMessage, setToastMessage] = useState(''); 
    const [licenseToView, setLicenseToView] = useState(null);

    const handleViewProject = (license) => {
        setSelectedLicense(license);
        setView('project');
    };

    const handleViewDetails = (license) => {
        setLicenseToView(license);
        setView('details');
    };

    const handleBackToList = () => {
        setSelectedLicense(null);
        setLicenseToView(null);
        setView('list');
    };

    const handleApply = (newApplication) => {
        setLicenses(prevLicenses => [...prevLicenses, newApplication]);
        setToastMessage('New license application created! It has been added to your list.');
        setActiveTab('my-licenses');
    };

    const handleStartRenewal = (license) => {
        setSelectedLicense(license);
        setModalMode('renewal');
        setIsApplyModalOpen(true);
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Active':
                return <CheckCircle className="text-green-500" size={20} />;
            case 'Application in Progress':
                return <Clock className="text-blue-500" size={20} />;
            case 'Renewal Due':
                return <AlertTriangle className="text-yellow-500" size={20} />;
            default:
                return null;
        }
    };

    if (view === 'project' && selectedLicense) {
        return <ApplicationProjectView license={selectedLicense} onBack={handleBackToList} />;
    }

    if (view === 'details' && licenseToView) {
         return <ApplicationProjectView license={licenseToView} onBack={handleBackToList} />;
    }

    const renderMyLicenses = () => (
        <div className="theme-bg-card p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold theme-text-primary">My Licenses</h3>
                <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 theme-text-secondary" />
                    <input type="text" placeholder="Search licenses..." className="theme-bg-page border theme-border-color rounded-md pl-10 pr-4 py-2 text-sm theme-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
            </div>
            {/* NEW: Add max-height and overflow-y-auto to this div */}
            <div className="overflow-x-auto max-h-[60vh] overflow-y-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b theme-border-color">
                            <th className="text-left py-3 px-4 text-sm font-medium uppercase theme-text-secondary">License Name</th>
                            <th className="text-left py-3 px-4 text-sm font-medium uppercase theme-text-secondary">Jurisdiction</th>
                            <th className="text-left py-3 px-4 text-sm font-medium uppercase theme-text-secondary">Status</th>
                            <th className="text-left py-3 px-4 text-sm font-medium uppercase theme-text-secondary">Expiry Date</th>
                            <th className="text-right py-3 px-4 text-sm font-medium uppercase theme-text-secondary">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {licenses.map(license => (
                            <tr key={license.id} className="border-b theme-border-color hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td className="px-4 py-4 font-medium theme-text-primary">{license.name}</td>
                                <td className="px-4 py-4 theme-text-secondary">{license.jurisdiction}</td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center">
                                        {getStatusIcon(license.status)}
                                        <span className="ml-2 theme-text-primary">{license.status}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 theme-text-secondary">{license.expiry}</td>
                                <td className="px-4 py-4 text-right">
                                    <ActionMenu items={[
                                        { label: 'View Project', action: () => handleViewProject(license), icon: Eye },
                                        { label: 'Start Renewal', action: () => handleStartRenewal(license), icon: RefreshCw }
                                    ]}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="p-6 theme-bg-page min-h-screen">
            <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-bold theme-text-primary">License Management</h2>
                        <p className="theme-text-secondary">Track and manage your licenses and registrations across all jurisdictions.</p>
                    </div>
                </div>

                <div className="border-b-2 theme-border-color">
                    <nav className="-mb-0.5 flex space-x-6">
                        <button
                            onClick={() => setActiveTab('platform')}
                            className={`py-3 px-1 text-sm font-medium whitespace-nowrap ${activeTab === 'platform' ? 'text-blue-600 border-b-2 border-blue-600' : 'theme-text-secondary hover:text-blue-600'}`}
                        >
                            <Award size={18} className="inline-block mr-2" /> Platform License
                        </button>
                        <button
                            onClick={() => setActiveTab('my-licenses')}
                            className={`py-3 px-1 text-sm font-medium whitespace-nowrap ${activeTab === 'my-licenses' ? 'text-blue-600 border-b-2 border-blue-600' : 'theme-text-secondary hover:text-blue-600'}`}
                        >
                            <CheckCircle size={18} className="inline-block mr-2" /> My Licenses
                        </button>
                    </nav>
                </div>

                <div className="mt-6">
                    {activeTab === 'platform' && <PlatformLicenseView onApply={handleApply} onStartRenewal={handleStartRenewal} onViewDetails={handleViewDetails} />}
                    {activeTab === 'my-licenses' && renderMyLicenses()}
                </div>
            </div>

            {isApplyModalOpen && (
                <ApplyLicenseModal
                    onClose={() => setIsApplyModalOpen(false)}
                    onApply={(app) => { handleApply(app); setIsApplyModalOpen(false); }}
                    triggerAIAnalysis={triggerAIAnalysis}
                    mode={modalMode} 
                    initialData={modalMode === 'renewal' ? selectedLicense : null} 
                />
            )}
            
            {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}
        </div>
    );
};

export default Licensing;