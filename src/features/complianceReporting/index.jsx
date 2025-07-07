import React, { useState, useEffect, useMemo } from 'react';
import { LayoutDashboard, FileText, Calendar } from 'lucide-react';
import ReportingDashboard from './components/ReportingDashboard.jsx';
import ReportingOverview from './components/ReportingOverview.jsx';
import ReportingCalendar from './components/ReportingCalendar.jsx';
import GenerateReportModal from './modals/GenerateReportModal.jsx';
import UploadExistingReportModal from './modals/UploadExistingReportModal.jsx';
import ReportDraftModal from './modals/ReportDraftModal.jsx';
import FilingModal from './modals/FilingModal.jsx';
import { mockReports, mockTemplates, initialDataSources } from '../../data/mockData.js';

const ComplianceReporting = ({ context, onNavigate, onCleanContext }) => {
    // State for UI
    const [activeTab, setActiveTab] = useState('Reports');

    // State for Data
    const [reports, setReports] = useState(mockReports);
    const [selectedReport, setSelectedReport] = useState(null);

    // State for Modals
    const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
    const [isFilingModalOpen, setIsFilingModalOpen] = useState(false);

    // State for Multi-Step "Generate Report" Modal
    const [generateStep, setGenerateStep] = useState(1);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [selectedDataSources, setSelectedDataSources] = useState([]);

    // State and Logic for Filtering
    const [filters, setFilters] = useState({ regulator: 'All', reportType: 'All', status: 'All' });
    const uniqueRegulators = useMemo(() => ['All', ...new Set(reports.map(r => r.regulator).filter(Boolean))], [reports]);
    const uniqueReportTypes = useMemo(() => ['All', ...new Set(reports.map(r => r.type).filter(Boolean))], [reports]);
    const uniqueStatuses = useMemo(() => ['All', ...new Set(reports.map(r => r.status).filter(Boolean))], [reports]);
    const filteredReports = useMemo(() => {
        return reports.filter(report => {
            const { regulator, reportType, status } = filters;
            return (regulator === 'All' || report.regulator === regulator) &&
                   (reportType === 'All' || report.type === reportType) &&
                   (status === 'All' || report.status === status);
        });
    }, [reports, filters]);
    const handleFilterChange = (name, value) => setFilters(prev => ({ ...prev, [name]: value }));

    // Effect to handle receiving a template from the Library
    useEffect(() => {
        if (context?.action === 'generateReport' && context.template) {
            setIsGenerateModalOpen(true);
            setSelectedTemplate(context.template);
            setGenerateStep(2);
            onCleanContext();
        }
    }, [context, onCleanContext]);

    // --- ALL WORKFLOW HANDLERS ---

    const openGenerateModal = () => {
        setGenerateStep(1);
        setSelectedTemplate(null);
        setSelectedDataSources([]);
        setIsGenerateModalOpen(true);
    };

    const handleGenerateReport = ({ template, sources }) => {
        const newReport = { id: `rep-${Date.now()}`, name: `${template.name} Report`, status: 'Draft', type: template.type, regulator: 'CBN' };
        setReports(prev => [newReport, ...prev]);
        setIsGenerateModalOpen(false);
        setTimeout(() => {
            setSelectedReport(newReport);
            setIsDraftModalOpen(true);
        }, 300);
    };

    const handleUploadReport = (uploadedReport) => {
        const newReport = { id: `rep-${Date.now()}`, name: uploadedReport.name || 'Uploaded Report', status: 'Uploaded', type: 'External', regulator: 'SEC' };
        setReports(prev => [newReport, ...prev]);
        setSelectedReport(newReport);
        setIsUploadModalOpen(false);
        setIsFilingModalOpen(true);
    };
    
    const handleEditReport = (reportId) => {
        const report = reports.find(r => r.id === reportId);
        setSelectedReport(report);
        setIsDraftModalOpen(true);
    };

    const handleSaveDraft = (draft) => {
        setReports(reports.map(r => (r.id === draft.id ? draft : r)));
        setIsDraftModalOpen(false);
    };

    const handleStartFiling = (report) => {
        setSelectedReport(report);
        setIsDraftModalOpen(false);
        setIsFilingModalOpen(true);
    };

    const handleFileReport = ({ reportId, channel }) => {
        setReports(prev => prev.map(report => report.id === reportId ? { ...report, status: 'Submitted', submittedDate: new Date().toLocaleDateString() } : report));
        setIsFilingModalOpen(false);
    };

    // --- RENDER LOGIC ---

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Overview': return <ReportingOverview />;
            case 'Reports': return <ReportingDashboard reports={filteredReports} filters={filters} onFilterChange={handleFilterChange} regulators={uniqueRegulators} reportTypes={uniqueReportTypes} statuses={uniqueStatuses} onGenerateReport={openGenerateModal} onUploadReport={() => setIsUploadModalOpen(true)} onEditReport={handleEditReport}/>;
            case 'Calendar': return <ReportingCalendar />;
            default: return null;
        }
    };

    return (
        <div className="p-6">
            <div className="space-y-6 animate-fade-in">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Compliance Reporting</h2>
                    <p className="text-gray-500">Oversee, plan, and manage all regulatory reporting activities.</p>
                </div>
                <div className="flex border-b border-gray-300">
                    <button onClick={() => setActiveTab('Overview')} className={`py-2 px-4 flex items-center text-lg font-semibold ${activeTab === 'Overview' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}><LayoutDashboard size={20} className="mr-2"/> Overview</button>
                    <button onClick={() => setActiveTab('Reports')} className={`py-2 px-4 flex items-center text-lg font-semibold ${activeTab === 'Reports' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}><FileText size={20} className="mr-2"/> Reports</button>
                    <button onClick={() => setActiveTab('Calendar')} className={`py-2 px-4 flex items-center text-lg font-semibold ${activeTab === 'Calendar' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}><Calendar size={20} className="mr-2"/> Calendar</button>
                </div>
                <div>{renderTabContent()}</div>
            </div>

            {/* --- All Modals with Correct Props --- */}
            {isGenerateModalOpen && <GenerateReportModal step={generateStep} onNavigateStep={setGenerateStep} onBrowse={() => onNavigate('Library', { action: 'selectTemplate' })} selectedTemplate={selectedTemplate} selectedSources={selectedDataSources} dataSources={initialDataSources} onSourceToggle={(id) => setSelectedDataSources(p => p.includes(id) ? p.filter(i => i !== id) : [...p, id])} onClose={() => setIsGenerateModalOpen(false)} onGenerate={handleGenerateReport} />}
            {isUploadModalOpen && <UploadExistingReportModal onClose={() => setIsUploadModalOpen(false)} onUpload={handleUploadReport} />}
            {isDraftModalOpen && selectedReport && <ReportDraftModal report={selectedReport} onClose={() => setSelectedReport(null)} onSave={handleSaveDraft} onFile={handleStartFiling} />}
            {isFilingModalOpen && selectedReport && <FilingModal report={selectedReport} onClose={() => setSelectedReport(null)} onFileReport={handleFileReport} />}
        </div>
    );
};

export default ComplianceReporting;