import React, { useState, useEffect, useMemo } from 'react';
import { LayoutGrid, CalendarDays, Upload, FilePlus2, Sparkles, CheckCircle } from 'lucide-react';
// 1. ADD 'monthlySubmissionsData' to the import from mockData
import { mockReports, reportingEvents, monthlySubmissionsData } from '../../data/mockData';

// Component Imports
import ReportingOverview from './components/ReportingOverview';
import ReportingCalendar from './components/ReportingCalendar';
import SmartFiling from './components/SmartFiling';

// Modal Imports
import GenerateReportModal from './modals/GenerateReportModal';
import UploadExistingReportModal from './modals/UploadExistingReportModal';
import ReportDraftModal from './modals/ReportDraftModal';
import FilingModal from './modals/FilingModal';
import ActionChoiceModal from './modals/ActionChoiceModal';

const ComplianceReporting = ({ jurisdiction }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [reports, setReports] = useState(mockReports);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Your existing filteredReports logic is perfect. No changes needed.
  const filteredReports = useMemo(() => {
    if (!jurisdiction || jurisdiction === 'Global') {
      return reports;
    }
    return reports.filter(report => report.jurisdiction === jurisdiction);
  }, [reports, jurisdiction]);

  // Your existing filteredEvents logic is also perfect. No changes needed.
  const filteredEvents = useMemo(() => {
    if (!jurisdiction || jurisdiction === 'Global') {
      return reportingEvents;
    }
    return reportingEvents.filter(event => event.jurisdiction === jurisdiction);
  }, [jurisdiction]);


  // 2. ADD the logic to calculate dynamic chart data.
  // This uses your 'filteredReports' to derive the data for the donut chart.
  const dynamicReportStatusData = useMemo(() => {
    const counts = { Submitted: 0, 'In Review': 0, Draft: 0, Overdue: 0, Filed: 0, 'Pending Submission': 0 };

    filteredReports.forEach((report) => {
      if (counts[report.status] !== undefined) {
        counts[report.status]++;
      }
    });

    // We combine 'Filed', 'Submitted', and 'Pending Submission' for the chart's "Submitted" category.
    return [
      { name: 'Submitted', value: counts.Submitted + counts.Filed + counts['Pending Submission'], fill: '#22c55e' },
      { name: 'In Review', value: counts['In Review'], fill: '#3b82f6' },
      { name: 'Draft', value: counts.Draft, fill: '#f97316' },
      { name: 'Overdue', value: counts.Overdue, fill: '#ef4444' },
    ];
  }, [filteredReports]);


  // --- All your handler functions below this remain unchanged ---
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleProcessReport = (newReportData) => {
    const newReport = {
      id: `rep-${Date.now()}`,
      name: newReportData.name,
      status: 'Draft',
      type: newReportData.template?.type || 'Uploaded',
      regulator: newReportData.regulator,
      jurisdiction: jurisdiction === 'Global' ? 'Global' : jurisdiction, // This is correct
      content: `This is an AI-generated draft for "${newReportData.name}". Please review and edit.`
    };
    setReports(prevReports => [newReport, ...prevReports]);
    setSelectedReport(newReport);
    setActiveModal('draft');
  };

  const handleReadyForSubmission = (reportToSubmit) => {
    setReports(currentReports =>
      currentReports.map(report =>
        report.id === reportToSubmit.id ? { ...report, status: 'Pending Submission' } : report
      )
    );
    setActiveModal(null);
    setToastMessage('Report sent to the Smart Filing queue!');
  };

  const handleFileReport = (reportToSubmit) => {
    setReports(currentReports =>
      currentReports.map(report =>
        report.id === reportToSubmit.id ? { ...report, status: 'Filed' } : report
      )
    );
    setActiveModal(null);
    setToastMessage('Report has been successfully filed!');
  };

  const handleCalendarEventClick = (event) => {
    if (event.type === 'Filing') {
      setSelectedEvent(event);
      setActiveModal('actionChoice');
    }
  };

  const handleActionChoice = (choice) => {
    if (choice === 'generate') setActiveModal('generate');
    else if (choice === 'upload') setActiveModal('upload');
  };

  const handleOpenDraftModal = (report) => {
    setSelectedReport(report);
    setActiveModal('draft');
  };

  const handleOpenFileModal = (report) => {
    setSelectedReport(report);
    setActiveModal('filing');
  };


  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        // 3. UPDATE the props being passed to ReportingOverview
        return <ReportingOverview
          reportStatusData={dynamicReportStatusData}
          monthlySubmissionsData={monthlySubmissionsData}
          // The other props your component had are no longer needed since the child doesn't use them
          // We keep it clean by only passing what's necessary for the charts.
        />;
      case 'calendar':
        return <ReportingCalendar events={filteredEvents} onEventClick={handleCalendarEventClick} />;
      case 'smartFiling':
        return <SmartFiling reports={filteredReports} onFileNow={handleOpenFileModal} />;
      default:
        // Fallback case
        return <ReportingOverview
          reportStatusData={dynamicReportStatusData}
          monthlySubmissionsData={monthlySubmissionsData}
        />;
    }
  };

  // --- All the JSX for rendering the component below this remains unchanged ---
  return (
    <div className="p-6 space-y-6 animate-fade-in relative">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Compliance Reporting</h1>
          <p className="text-gray-500">Manage, generate, and file all your regulatory reports.</p>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => setActiveModal('upload')} className="bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-50 flex items-center text-sm"><Upload size={16} className="mr-2"/> Upload Existing</button>
          <button onClick={() => setActiveModal('generate')} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-500 flex items-center text-sm"><FilePlus2 size={16} className="mr-2"/> Generate Report</button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-6">
          <button onClick={() => setActiveTab('overview')} className={`py-3 px-1 inline-flex items-center gap-2 text-sm font-medium whitespace-nowrap ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'}`}><LayoutGrid size={16}/>Overview</button>
          <button onClick={() => setActiveTab('calendar')} className={`py-3 px-1 inline-flex items-center gap-2 text-sm font-medium whitespace-nowrap ${activeTab === 'calendar' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'}`}><CalendarDays size={16}/>Calendar</button>
          <button onClick={() => setActiveTab('smartFiling')} className={`py-3 px-1 inline-flex items-center gap-2 text-sm font-medium whitespace-nowrap ${activeTab === 'smartFiling' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'}`}><Sparkles size={16}/>Smart Filing</button>
        </nav>
      </div>

      <div className="mt-4">
        {renderContent()}
      </div>

      {activeModal === 'generate' && <GenerateReportModal onClose={() => setActiveModal(null)} onProcessReport={handleProcessReport} />}
      {activeModal === 'upload' && <UploadExistingReportModal onClose={() => setActiveModal(null)} onProcessReport={handleProcessReport} />}
      {activeModal === 'draft' && <ReportDraftModal report={selectedReport} onClose={() => setActiveModal(null)} onReadyForSubmission={handleReadyForSubmission} />}
      {activeModal === 'filing' && <FilingModal report={selectedReport} onClose={() => setActiveModal(null)} onFile={handleFileReport} />}
      {activeModal === 'actionChoice' && <ActionChoiceModal event={selectedEvent} onClose={() => setActiveModal(null)} onChoice={handleActionChoice} />}

      {toastMessage && (
        <div className="fixed bottom-10 right-10 bg-gray-800 text-white py-3 px-5 rounded-lg shadow-2xl flex items-center animate-fade-in-up">
          <CheckCircle size={20} className="text-green-400 mr-3" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default ComplianceReporting;