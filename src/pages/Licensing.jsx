import React, { useState } from 'react';
import { Award, Plus, MoreVertical, Search, CheckCircle, Clock, AlertTriangle, Edit, Trash2, Eye, RefreshCw } from 'lucide-react';
import ApplyLicenseModal from '../components/modals/ApplyLicenseModal.jsx';
import ApplicationProjectView from '../components/licensing/ApplicationProjectView.jsx';
import ActionMenu from '../components/ui/ActionMenu.jsx';

const initialLicenses = [
    { id: 'LIC-01', name: 'Payment Service Provider (PSP)', jurisdiction: 'Nigeria', regulator: 'CBN', status: 'Active', expiryDate: '2025-12-31' },
    { id: 'LIC-02', name: 'Digital Asset Service Provider (DASP)', jurisdiction: 'Kenya', regulator: 'CMA', status: 'Application in Progress', expiryDate: 'N/A' },
    { id: 'LIC-03', name: 'Money Transmitter License', jurisdiction: 'Ghana', regulator: 'BOG', status: 'Renewal Due', expiryDate: '2025-08-15' },
    { id: 'LIC-04', name: 'E-Money Issuer', jurisdiction: 'South Africa', regulator: 'SARB', status: 'Active', expiryDate: '2026-05-20' },
];

const statusStyles = {
    'Active': { icon: <CheckCircle className="text-green-500" />, textColor: 'text-green-400' },
    'Application in Progress': { icon: <Clock className="text-blue-500" />, textColor: 'text-blue-400' },
    'Renewal Due': { icon: <AlertTriangle className="text-yellow-500" />, textColor: 'text-yellow-400' }
};

// UPDATED: Now accepts the userMode prop
const Licensing = ({ onNavigate, userMode }) => {
    const [licenses, setLicenses] = useState(initialLicenses);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewingApplication, setViewingApplication] = useState(null);
    const [openMenuId, setOpenMenuId] = useState(null);

    const summaryStats = {
        active: licenses.filter(l => l.status === 'Active').length,
        inProgress: licenses.filter(l => l.status === 'Application in Progress').length,
        renewalDue: licenses.filter(l => l.status === 'Renewal Due').length
    };

    const handleApply = (newApplication) => {
        setLicenses([newApplication, ...licenses]);
        // For 'Lite' mode, we'll build a simplified wizard later.
        // For now, it will go to the same project view.
        setViewingApplication(newApplication);
    };
    
    const handleViewProject = (license) => {
        setViewingApplication(license);
    };

    const handleEditLicense = (license) => {
        alert(`Editing license: ${license.name}`);
    };

    const handleRenewLicense = (licenseToRenew) => {
        setLicenses(currentLicenses => currentLicenses.map(license => {
            if (license.id === licenseToRenew.id) {
                const renewedLicense = { ...license, status: 'Application in Progress' };
                setViewingApplication(renewedLicense);
                return renewedLicense;
            }
            return license;
        }));
    };

    const handleDeleteLicense = (licenseId) => {
        setLicenses(currentLicenses => currentLicenses.filter(l => l.id !== licenseId));
    };

    if (viewingApplication) {
        return <ApplicationProjectView 
                    application={viewingApplication} 
                    onBack={() => setViewingApplication(null)}
                    onNavigate={onNavigate}
                />;
    }

    // --- LITE MODE UI ---
    if (userMode === 'Lite') {
        return (
            <>
                <div className="space-y-6 animate-fade-in">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">License Management</h2>
                        <p className="text-gray-500">Start a new application or view your existing ones.</p>
                    </div>
                    <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white text-center">
                         <Award className="mx-auto h-16 w-16 text-[#c0933e] mb-4"/>
                         <h3 className="text-xl font-semibold mb-2">Ready to expand?</h3>
                         <p className="text-gray-400 mb-6">Let us guide you through your next license application.</p>
                         <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-500 flex items-center mx-auto text-lg">
                            <Plus size={20} className="mr-2"/> Apply for New License
                        </button>
                    </div>
                    {licenses.filter(l => l.status === 'Application in Progress').length > 0 && (
                         <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white">
                            <h3 className="text-xl font-semibold mb-4 text-[#c0933e]">Your In-Progress Applications</h3>
                             {licenses.filter(l => l.status === 'Application in Progress').map(license => (
                                <button key={license.id} onClick={() => handleViewProject(license)} className="w-full text-left bg-gray-800 p-4 rounded-lg flex justify-between items-center hover:bg-gray-700">
                                    <p className="font-bold">{license.name} - {license.jurisdiction}</p>
                                    <span className="text-blue-400 font-semibold">View Project &rarr;</span>
                                </button>
                             ))}
                        </div>
                    )}
                </div>
                 {isModalOpen && <ApplyLicenseModal onClose={() => setIsModalOpen(false)} onApply={handleApply} />}
            </>
        )
    }

    // --- PRO MODE UI (The default, detailed view) ---
    return (
        <>
            <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">License Management</h2>
                        <p className="text-gray-500">Track and manage your licenses and registrations across all jurisdictions.</p>
                    </div>
                    <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center">
                        <Plus size={20} className="mr-2"/> Apply for New License
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white"><h3 className="text-lg font-semibold text-gray-400">Active Licenses</h3><p className="text-4xl font-bold">{summaryStats.active}</p></div>
                    <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white"><h3 className="text-lg font-semibold text-gray-400">Applications in Progress</h3><p className="text-4xl font-bold">{summaryStats.inProgress}</p></div>
                    <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white"><h3 className="text-lg font-semibold text-gray-400">Renewals Due Soon</h3><p className="text-4xl font-bold text-yellow-400">{summaryStats.renewalDue}</p></div>
                </div>

                <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white">
                    <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-[#c0933e]">My Licenses</h3><div className="relative"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/><input type="text" placeholder="Search licenses..." className="bg-gray-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-[#c0933e] focus:border-[#c0933e]"/></div></div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="text-left py-3 px-4 text-sm font-medium uppercase">License Name</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium uppercase">Jurisdiction</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium uppercase">Status</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium uppercase">Expiry Date</th>
                                    <th className="text-right py-3 px-4 text-sm font-medium uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {licenses.map(license => {
                                    const style = statusStyles[license.status] || {};
                                    const menuItems = [];
                                    if (license.status === 'Application in Progress') {
                                        menuItems.push({ label: 'View Project', icon: <Eye size={14} />, onClick: () => handleViewProject(license) });
                                    }
                                    if (license.status === 'Active' || license.status === 'Renewal Due') {
                                        menuItems.push({ label: 'Renew', icon: <RefreshCw size={14} />, onClick: () => handleRenewLicense(license) });
                                    }
                                    menuItems.push({ label: 'Edit', icon: <Edit size={14} />, onClick: () => handleEditLicense(license) });
                                    menuItems.push({ label: 'Delete', icon: <Trash2 size={14} />, onClick: () => handleDeleteLicense(license.id), isDestructive: true });

                                    return (
                                        <tr key={license.id} className="border-b border-gray-800 hover:bg-gray-800 transition-colors">
                                            <td className="py-4 px-4 font-bold">{license.name}</td>
                                            <td className="py-4 px-4 text-gray-300">{license.jurisdiction} ({license.regulator})</td>
                                            <td className={`py-4 px-4 font-semibold flex items-center ${style.textColor}`}>{style.icon}<span className="ml-2">{license.status}</span></td>
                                            <td className="py-4 px-4 text-gray-300">{license.expiryDate}</td>
                                            <td className="py-4 px-4 text-right">
                                                <div className="relative inline-block">
                                                    <button onClick={() => setOpenMenuId(openMenuId === license.id ? null : license.id)} className="p-2 rounded-md hover:bg-gray-700">
                                                        <MoreVertical size={18} />
                                                    </button>
                                                    {openMenuId === license.id && (
                                                        <ActionMenu
                                                            onClose={() => setOpenMenuId(null)}
                                                            items={menuItems}
                                                        />
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isModalOpen && <ApplyLicenseModal onClose={() => setIsModalOpen(false)} onApply={handleApply} />}
        </>
    );
};

export default Licensing;
