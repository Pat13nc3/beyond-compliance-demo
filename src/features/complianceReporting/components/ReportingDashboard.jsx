// src/features/complianceReporting/components/ReportingDashboard.jsx

import React from 'react';
import { Pencil, FileUp, UploadCloud, Filter, Database } from 'lucide-react';
import ActionMenu from '../../../components/ui/ActionMenu.jsx';

const ReportingDashboard = ({ reports, filters, onFilterChange, regulators, reportTypes, statuses, onGenerateReport, onUploadReport, onEditReport, onNavigateToDetailedRecords }) => {
    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-x-6 gap-y-4 items-center p-4 theme-bg-card rounded-lg">
                <div className="flex items-center"><Filter size={18} className="theme-text-secondary mr-2"/><h4 className="font-semibold theme-text-primary">Filter by:</h4></div>
                <select value={filters.regulator} onChange={(e) => onFilterChange('regulator', e.target.value)} className="bg-gray-700 theme-text-primary theme-border-color rounded p-2 text-sm">
                    {regulators.map(reg => <option key={reg} value={reg}>{reg === 'All' ? 'Regulator: All' : reg}</option>)}
                </select>
                <select value={filters.reportType} onChange={(e) => onFilterChange('reportType', e.target.value)} className="bg-gray-700 theme-text-primary theme-border-color rounded p-2 text-sm">
                    {reportTypes.map(type => <option key={type} value={type}>{type === 'All' ? 'Report Type: All' : type}</option>)}
                </select>
                <select value={filters.status} onChange={(e) => onFilterChange('status', e.target.value)} className="bg-gray-700 theme-text-primary theme-border-color rounded p-2 text-sm">
                    {statuses.map(status => <option key={status} value={status}>{status === 'All' ? 'Status: All' : status}</option>)}
                </select>
            </div>

            <div className="overflow-x-auto theme-bg-card p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold theme-text-primary">My Reports</h3>
                    <div className="flex space-x-3">
                        <button onClick={onGenerateReport} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center text-sm"><FileUp className="mr-2 h-4 w-4" /> Generate Report</button>
                        <button onClick={onUploadReport} className="bg-gray-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600 flex items-center text-sm"><UploadCloud className="mr-2 h-4 w-4" /> Upload Report</button>
                    </div>
                </div>
                <table className="min-w-full theme-text-primary">
                    <thead>
                        <tr className="border-b theme-border-color">
                            <th className="text-left py-3 px-4 text-sm font-medium uppercase theme-text-secondary">Report Name</th>
                            <th className="text-left py-3 px-4 text-sm font-medium uppercase theme-text-secondary">Status</th>
                            <th className="text-left py-3 px-4 text-sm font-medium uppercase theme-text-secondary">Type</th>
                            <th className="text-left py-3 px-4 text-sm font-medium uppercase theme-text-secondary">Data Used</th>
                            <th className="text-right py-3 px-4 text-sm font-medium uppercase theme-text-secondary">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr key={report.id} className="border-b theme-border-color hover:bg-gray-800">
                                <td className="px-6 py-4">{report.name}</td>
                                <td className="px-6 py-4">{report.status}</td>
                                <td className="px-6 py-4">{report.type}</td>
                                <td className="px-6 py-4 text-sm theme-text-secondary">
                                    {report.linkedDataDescription ? (
                                        <div className="flex items-center">
                                            {report.linkedDataDescription}
                                            {report.linkedDataFilters && (
                                                <button
                                                    onClick={() => onNavigateToDetailedRecords(report.linkedDataFilters)}
                                                    className="ml-2 p-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white flex items-center text-xs"
                                                    title="View underlying data"
                                                >
                                                    <Database size={14} />
                                                </button>
                                            )}
                                        </div>
                                    ) : 'N/A'}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <ActionMenu items={[{ label: 'Edit', icon: Pencil, action: () => onEditReport(report.id) }]} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportingDashboard;