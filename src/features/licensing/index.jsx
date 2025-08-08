// src/features/licensing/index.jsx

import React, { useState } from "react";
import { Award, Plus, MoreVertical, Search, CheckCircle, Clock, AlertTriangle, Edit, Trash2, Eye, RefreshCw } from "lucide-react";
import ApplyLicenseModal from "./modals/ApplyLicenseModal.jsx";
import ApplicationProjectView from "./components/ApplicationProjectView.jsx";
import ActionMenu from "../../components/ui/ActionMenu.jsx";

const mockLicenses = [
    { id: 1, name: 'Payment Service Provider (PSP)', jurisdiction: 'Nigeria (CBN)', status: 'Active', expiry: '2023-12-31' },
    { id: 2, name: 'Digital Asset Service Provider (DASP)', jurisdiction: 'Kenya (CMA)', status: 'Application in Progress', expiry: 'N/A' },
    { id: 3, name: 'Money Transmitter License', jurisdiction: 'Ghana (BOG)', status: 'Renewal Due', expiry: '2025-08-15' },
    { id: 4, name: 'E-Money Issuer', jurisdiction: 'South Africa (SARB)', status: 'Active', expiry: '2026-05-20' },
];

const Licensing = () => {
    const [licenses, setLicenses] = useState(mockLicenses);
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [view, setView] = useState('list'); // 'list' or 'project'
    const [selectedLicense, setSelectedLicense] = useState(null);

    const handleViewProject = (license) => {
        setSelectedLicense(license);
        setView('project');
    };

    const handleBackToList = () => {
        setSelectedLicense(null);
        setView('list');
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

    return (
        <div className="p-6 theme-bg-page min-h-screen">
            <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-bold theme-text-primary">License Management</h2>
                        <p className="theme-text-secondary">Track and manage your licenses and registrations across all jurisdictions.</p>
                    </div>
                    <button onClick={() => setIsApplyModalOpen(true)} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center">
                        <Plus size={20} className="mr-2"/> Apply for New License
                    </button>
                </div>

                <div className="theme-bg-card p-6 rounded-lg shadow-md">
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold theme-text-primary">My Licenses</h3>
                        <div className="relative">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 theme-text-secondary" />
                            <input type="text" placeholder="Search licenses..." className="theme-bg-page border theme-border-color rounded-md pl-10 pr-4 py-2 text-sm theme-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
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
                                                { label: 'Start Renewal', action: () => { /* Add renewal logic */ }, icon: RefreshCw }
                                            ]}/>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isApplyModalOpen && <ApplyLicenseModal onClose={() => setIsApplyModalOpen(false)} />}
        </div>
    );
};

export default Licensing;