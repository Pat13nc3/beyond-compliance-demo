import React, { useState } from 'react';
import { Calendar, FileType, Download, BarChart2, List, FilePlus2, ChevronRight, Edit } from 'lucide-react';

// Import all our components and data
import { recentReportsData } from '../data/mockData';
import ReportingCalendar from '../components/calendar/ReportingCalendar';
import ReportingDashboard from '../components/reporting/ReportingDashboard';
import FilingModal from '../components/modals/FilingModal.jsx';
import ReportDraftModal from '../components/modals/ReportDraftModal.jsx'; // Import the new modal

// --- NEW DATA STRUCTURE FOR TEMPLATES ---
const reportTemplates = {
    "Regulatory Filings": ["Suspicious Activity Report (SAR)", "AML Summary", "Suspicious Transaction Report (STR)"],
    "VASP Documentation": ["VASP White Paper", "Risk Assessment Framework"],
    "Internal Audits": ["Quarterly Controls Review", "Data Privacy Audit"],
};

// --- A function to get placeholder content for a template ---
const getTemplateContent = (templateName) => {
    switch(templateName) {
        case "Suspicious Activity Report (SAR)":
            return `--- Suspicious Activity Report (SAR) ---\n\nNarrative: [Describe the suspicious activity here]\n\nInvolved Parties: [List names, accounts, etc.]\n\nTransaction Details: [List transaction IDs, amounts, dates]`;
        case "VASP White Paper":
            return `--- VASP White Paper ---\n\n1. Abstract:\n\n2. Introduction:\n\n3. Technology:\n\n4. Tokenomics:`;
        default:
            return `--- ${templateName} Draft ---\n\n[Auto-generated content will appear here]`;
    }
}

const ComplianceReporting = () => {
    const [view, setView] = useState('list');
    const [reports, setReports] = useState(recentReportsData);
    
    // State for the Filing Modal
    const [isFilingModalOpen, setIsFilingModalOpen] = useState(false);
    const [selectedReportForFiling, setSelectedReportForFiling] = useState(null);

    // --- NEW STATE for the Draft/Editor Modal ---
    const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
    const [currentDraft, setCurrentDraft] = useState(null);

    // Form state
    const [reportCategory, setReportCategory] = useState("Regulatory Filings");
    const [reportTemplate, setReportTemplate] = useState("Suspicious Activity Report (SAR)");
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleFileReport = (report) => {
        setSelectedReportForFiling(report);
        setIsFilingModalOpen(true);
    };
    
    // --- UPDATED function to open the editor with a new draft ---
    const handleGenerateDraft = () => {
        const newDraft = {
            id: `temp-${Date.now()}`, // Temporary ID for a new draft
            name: `${reportTemplate} (${startDate || 'N/A'} - ${endDate || 'N/A'})`,
            date: new Date().toISOString().split('T')[0],
            format: 'PDF',
            content: getTemplateContent(reportTemplate) // Get placeholder content
        };
        setCurrentDraft(newDraft);
        setIsDraftModalOpen(true);
    };

    // --- NEW function to open an existing report in the editor ---
    const handleEditReport = (report) => {
        // In a real app, you'd fetch the full content. For now, we'll add placeholder if it doesn't exist.
        const reportWithContent = {
            ...report,
            content: report.content || getTemplateContent(report.name)
        };
        setCurrentDraft(reportWithContent);
        setIsDraftModalOpen(true);
    };

    // --- NEW function to save the report from the modal ---
    const handleSaveDraft = (draftId, newContent) => {
        const existingReportIndex = reports.findIndex(r => r.id === draftId);

        if (existingReportIndex > -1) {
            // It's an existing report, so we update it
            const updatedReports = [...reports];
            updatedReports[existingReportIndex].content = newContent;
            setReports(updatedReports);
        } else {
            // It's a new report, so we add it to the list
            const newReport = { ...currentDraft, id: reports.length + 1, content: newContent };
            setReports([newReport, ...reports]);
        }
    };


    return (
        <div className="space-y-6 animate-fade-in">
             <div className="flex justify-end bg-[#1e252d] p-2 rounded-xl shadow-lg">
                <div className="flex items-center bg-gray-800 rounded-lg p-1">
                    <button onClick={() => setView('dashboard')} className={`p-2 rounded-lg flex items-center ${view === 'dashboard' ? 'bg-[#c0933e] text-[#1e252d]' : 'text-gray-400 hover:bg-gray-700'}`}><BarChart2 size={20} className="mr-2" /> Dashboard</button>
                    <button onClick={() => setView('calendar')} className={`p-2 rounded-lg flex items-center ${view === 'calendar' ? 'bg-[#c0933e] text-[#1e252d]' : 'text-gray-400 hover:bg-gray-700'}`}><Calendar size={20} className="mr-2" /> Calendar</button>
                    <button onClick={() => setView('list')} className={`p-2 rounded-lg flex items-center ${view === 'list' ? 'bg-[#c0933e] text-[#1e252d]' : 'text-gray-400 hover:bg-gray-700'}`}><List size={20} className="mr-2" /> Report List</button>
                </div>
            </div>

            {view === 'dashboard' && <ReportingDashboard />}
            {view === 'calendar' && <ReportingCalendar />}
            
            {view === 'list' && (
                <>
                    <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white">
                        <h3 className="text-xl font-semibold mb-4 text-[#c0933e] flex items-center"><FilePlus2 className="mr-3"/> Intelligent Report Generator</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                            <div>
                                <label className="text-sm font-medium text-gray-300 block mb-2">1. Report Category</label>
                                <select value={reportCategory} onChange={(e) => setReportCategory(e.target.value)} className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e]">{Object.keys(reportTemplates).map(cat => <option key={cat} value={cat}>{cat}</option>)}</select>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-300 block mb-2">2. Specific Template</label>
                                <select value={reportTemplate} onChange={(e) => setReportTemplate(e.target.value)} className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e]">{reportTemplates[reportCategory].map(temp => <option key={temp} value={temp}>{temp}</option>)}</select>
                            </div>
                            {reportCategory === "Regulatory Filings" && (<div className="grid grid-cols-2 gap-4"><div><label className="text-sm font-medium text-gray-300 block mb-2">Start Date</label><input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white" /></div><div><label className="text-sm font-medium text-gray-300 block mb-2">End Date</label><input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white" /></div></div>)}
                            <div className="lg:col-start-4"><button onClick={handleGenerateDraft} className="w-full bg-[#c0933e] text-[#1e252d] font-bold py-2 px-4 rounded-md hover:bg-opacity-90 flex items-center justify-center">Generate Draft <ChevronRight size={20} className="ml-2"/></button></div>
                        </div>
                    </div>

                    <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white">
                        <h3 className="text-xl font-semibold mb-4 text-[#c0933e]">Generated Reports</h3>
                        <div className="overflow-x-auto">
                           <table className="min-w-full">
                                <thead><tr className="border-b border-gray-700"><th className="text-left py-3 px-4 uppercase">Report Name</th><th className="text-left py-3 px-4 uppercase">Date</th><th className="text-left py-3 px-4 uppercase">Format</th><th className="text-right py-3 px-4 uppercase">Actions</th></tr></thead>
                                <tbody>
                                    {reports.map(report => (
                                        <tr key={report.id} className="border-b border-gray-800 hover:bg-gray-800">
                                            <td className="py-3 px-4">{report.name}</td>
                                            <td className="py-3 px-4 text-gray-400">{report.date}</td>
                                            <td className="py-3 px-4"><span className="bg-gray-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{report.format}</span></td>
                                            <td className="py-3 px-4 text-right flex justify-end items-center space-x-2">
                                                {/* --- NEW EDIT BUTTON --- */}
                                                <button onClick={() => handleEditReport(report)} className="p-2 rounded-md hover:bg-gray-700" title="Edit"><Edit size={18} /></button>
                                                <button className="p-2 rounded-md hover:bg-gray-700" title="Download"><Download size={18} /></button>
                                                <button onClick={() => handleFileReport(report)} className="bg-blue-600 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-blue-500" title="File Report">File</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
            
            {isFilingModalOpen && <FilingModal report={selectedReportForFiling} onClose={() => setIsFilingModalOpen(false)} />}
            {/* --- RENDER THE NEW DRAFT MODAL --- */}
            {isDraftModalOpen && <ReportDraftModal report={currentDraft} onClose={() => setIsDraftModalOpen(false)} onSave={handleSaveDraft} />}
        </div>
    );
};

export default ComplianceReporting;
