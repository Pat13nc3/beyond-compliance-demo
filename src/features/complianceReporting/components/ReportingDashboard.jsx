import React from 'react';
import { Pencil, FileUp, UploadCloud, Filter } from 'lucide-react';
import ActionMenu from '../../../components/ui/ActionMenu.jsx';

const ReportingDashboard = ({ reports, filters, onFilterChange, regulators, reportTypes, statuses, onGenerateReport, onUploadReport, onEditReport }) => {
    return (
        <div className="space-y-6">
            {/* The filter bar is already dark, so it remains unchanged */}
            <div className="flex flex-wrap gap-x-6 gap-y-4 items-center p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center"><Filter size={18} className="text-gray-400 mr-2"/><h4 className="font-semibold text-white">Filter by:</h4></div>
                <select value={filters.regulator} onChange={(e) => onFilterChange('regulator', e.target.value)} className="bg-gray-700 text-white border-gray-600 rounded p-2 text-sm">
                    {regulators.map(reg => <option key={reg} value={reg}>{reg === 'All' ? 'Regulator: All' : reg}</option>)}
                </select>
                <select value={filters.reportType} onChange={(e) => onFilterChange('reportType', e.target.value)} className="bg-gray-700 text-white border-gray-600 rounded p-2 text-sm">
                    {reportTypes.map(type => <option key={type} value={type}>{type === 'All' ? 'Report Type: All' : type}</option>)}
                </select>
                <select value={filters.status} onChange={(e) => onFilterChange('status', e.target.value)} className="bg-gray-700 text-white border-gray-600 rounded p-2 text-sm">
                    {statuses.map(status => <option key={status} value={status}>{status === 'All' ? 'Status: All' : status}</option>)}
                </select>
            </div>

            {/* --- THIS IS THE FIX: The table container is now styled with the dark theme --- */}
            <div className="overflow-x-auto bg-[#1e252d] p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-white">My Reports</h3>
                    <div className="flex space-x-3">
                        <button onClick={onGenerateReport} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center text-sm"><FileUp className="mr-2 h-4 w-4" /> Generate Report</button>
                        <button onClick={onUploadReport} className="bg-gray-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600 flex items-center text-sm"><UploadCloud className="mr-2 h-4 w-4" /> Upload Report</button>
                    </div>
                </div>
                <table className="min-w-full text-white">
                    <thead>
                        <tr className="border-b border-gray-700"><th className="text-left py-3 px-4 text-sm font-medium uppercase text-gray-400">Report Name</th><th className="text-left py-3 px-4 text-sm font-medium uppercase text-gray-400">Status</th><th className="text-left py-3 px-4 text-sm font-medium uppercase text-gray-400">Type</th><th className="text-right py-3 px-4 text-sm font-medium uppercase text-gray-400">Actions</th></tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr key={report.id} className="border-b border-gray-800 hover:bg-gray-800">
                                <td className="px-6 py-4">{report.name}</td>
                                <td className="px-6 py-4">{report.status}</td>
                                <td className="px-6 py-4">{report.type}</td>
                                <td className="px-6 py-4 text-right"><ActionMenu items={[{ label: 'Edit', icon: Pencil, action: () => onEditReport(report.id) }]} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportingDashboard;