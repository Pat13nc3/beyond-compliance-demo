// src/features/complianceReporting/index.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { LayoutGrid, CalendarDays, Sparkles, CheckCircle } from 'lucide-react';
// Import mock data needed for dynamic content
import {
    mockReports,
    reportingEvents,
    monthlySubmissionsData,
    mockTransactionData,
    mockUserAccessData,
    userAccessValidationRule,
    mockTemplates
} from '../../data/mockData';

// Component Imports
import ReportingOverview from './components/ReportingOverview';
import ReportingCalendar from './components/ReportingCalendar';
import SmartFiling from './components/SmartFiling';
import ReportingDashboard from './components/ReportingDashboard';

// Modal Imports
import GenerateReportModal from './modals/GenerateReportModal';
import UploadExistingReportModal from './modals/UploadExistingReportModal';
import ReportDraftModal from './modals/ReportDraftModal';
import FilingModal from './modals/FilingModal';
import ActionChoiceModal from './modals/ActionChoiceModal';

const ComplianceReporting = ({ jurisdiction, context, onNavigate, onCleanContext, triggerAIAnalysis }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [reports, setReports] = useState(mockReports);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [reportingDashboardFilters, setReportingDashboardFilters] = useState({
      regulator: 'All',
      reportType: 'All',
      status: 'All'
  });

  useEffect(() => {
    if (context && context.initialTab) {
      setActiveTab(context.initialTab);
    }

    if (context && context.action === 'initiateReportGeneration') {
      setActiveModal('actionChoice');
      if (onCleanContext) {
        onCleanContext();
      }
    }
  }, [context, onCleanContext]);

  const filteredReports = useMemo(() => {
    let filtered = reports;
    if (jurisdiction && jurisdiction !== 'Global') {
      filtered = filtered.filter(report => report.jurisdiction === jurisdiction);
    }

    if (reportingDashboardFilters.regulator !== 'All') {
        filtered = filtered.filter(report => report.regulator === reportingDashboardFilters.regulator);
    }
    if (reportingDashboardFilters.reportType !== 'All') {
        filtered = filtered.filter(report => report.type === reportingDashboardFilters.reportType);
    }
    if (reportingDashboardFilters.status !== 'All') {
        filtered = filtered.filter(report => report.status === reportingDashboardFilters.status);
    }
    return filtered;

  }, [reports, jurisdiction, reportingDashboardFilters]);

  const filteredEvents = useMemo(() => {
    if (!jurisdiction || jurisdiction === 'Global') {
      return reportingEvents;
    }
    // FIX: Corrected the comparison from filteredEvents to jurisdiction
    return reportingEvents.filter(event => event.jurisdiction === jurisdiction);
  }, [jurisdiction]);

  const dynamicReportStatusData = useMemo(() => {
    const counts = { Submitted: 0, 'In Review': 0, Draft: 0, Overdue: 0, Filed: 0, 'Pending Submission': 0 };

    filteredReports.forEach((report) => {
      if (counts[report.status] !== undefined) {
        counts[report.status]++;
      }
    });

    return [
      { name: 'Submitted', value: counts.Submitted + counts.Filed + counts['Pending Submission'], fill: '#22c55e' },
      { name: 'In Review', value: counts['In Review'], fill: '#3b82f6' },
      { name: 'Draft', value: counts.Draft, fill: '#f97316' },
      { name: 'Overdue', value: counts.Overdue, fill: '#ef4444' },
    ];
  }, [filteredReports]);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const simulateFileContentExtraction = (fileName) => {
    let template;
    if (fileName.includes('SAR')) {
        template = mockTemplates.find(t => t.type === 'SAR');
    } else if (fileName.includes('CTR')) {
        template = mockTemplates.find(t => t.type === 'CTR');
    } else if (fileName.includes('ACR') || fileName.includes('Annual Compliance')) {
        template = mockTemplates.find(t => t.type === 'Annual Review');
    }

    if (template) {
        let content = template.content;
        content = content.replace(/\[CurrentDate\]/g, new Date().toLocaleDateString());
        content = content.replace(/\[CurrentYear\]/g, new Date().getFullYear());
        content = content.replace(/\[ReportID\]/g, 'UPLOAD-' + Date.now());
        content = content.replace(/\[AI-Identified Suspect Name\]/g, '[Name from AI]');
        content = content.replace(/\[AI-Identified Account\]/g, '[Account from AI]');
        content = content.replace(/\[AI-Identified Nationality\]/g, '[Nationality from AI]');
        content = content.replace(/\[AI-Identified Transaction Timestamp\]/g, '[Transaction Timestamp from AI]');
        content = content.replace(/\[AI-Identified Transaction Amount\]/g, '[Transaction Amount from AI]');
        content = content.replace(/\[AI-Identified Transaction Currency\]/g, '[Transaction Currency from AI]');
        content = content.replace(/\[AI-Identified Transaction Type\]/g, '[Transaction Type from AI]');
        content = content.replace(/\[AI-Summarized Transaction Purpose\]/g, '[Summarized Transaction Purpose from AI]');
        content = content.replace(/\[AI-Assessed Reason for Suspicion\]/g, '[AI-Assessed Reason for Suspicion]');
        content = content.replace(/\[AI-Generated Narrative\]/g, '[AI-Generated Narrative]');
        content = content.replace(/\[AI-Assessed Status\]/g, '[Status from AI]');
        content = content.replace(/\[AI-Assessed Registration Comments\]/g, 'Registration comments from AI');
        content = content.replace(/\[AI-Assessed Risk Assessment Comments\]/g, 'Risk assessment comments from AI');
        content = content.replace(/\[AI-Assessed Internal Control Comments\]/g, 'Internal control comments from AI');
        content = content.replace(/\[AI-Assessed CDD Comments\]/g, 'Customer Due Diligence comments from AI');
        content = content.replace(/\[AI-Assessed Suspicious Activity Comments\]/g, 'Suspicious Activity comments from AI');
        content = content.replace(/\[AI-Assessed Record Keeping Comments\]/g, 'Record Keeping comments from AI');
        content = content.replace('[describe specific behavior, e.g., "multiple incoming small deposits followed by a large outbound transfer to a jurisdiction known for illicit finance"]', 'AI-generated narrative based on file content.');
        return { content, type: template.type };
    }

    return { content: `This is simulated content for the uploaded file: "${fileName}".\n\nThe AI has extracted key details and is ready for you to review and create a draft.`, type: 'Uploaded' };
  };

  const handleProcessReport = (newReportData) => {
    let generatedContent = '';
    let reportType = newReportData.template?.type || 'Uploaded';
    let linkedDataDescription = `Data used for ${newReportData.name} (simulated)`;
    let linkedDataFilters = { type: 'All', period: 'Month' };

    if (newReportData.template) {
        generatedContent = newReportData.template.content || "No content available for this draft.";
        switch (newReportData.template.type) {
            case 'SAR':
                const sarTransaction = mockTransactionData.rows.find(row => row.amlFlag === true);
                if (sarTransaction) {
                    generatedContent = generatedContent
                        .replace(/\[AI-Identified Suspect Name\]/g, `Customer ${sarTransaction.senderAccount}`)
                        .replace(/\[AI-Identified Account\]/g, sarTransaction.senderAccount)
                        .replace(/\[AI-Identified Nationality\]/g, sarTransaction.senderCountry)
                        .replace(/\[AI-Identified Transaction Timestamp\]/g, sarTransaction.timestamp)
                        .replace(/\[AI-Identified Transaction Amount\]/g, sarTransaction.amount)
                        .replace(/\[AI-Identified Transaction Currency\]/g, sarTransaction.currency)
                        .replace(/\[AI-Identified Transaction Type\]/g, sarTransaction.transactionType)
                        .replace(/\[AI-Summarized Transaction Purpose\]/g, `Transfer of ${sarTransaction.amount} ${sarTransaction.currency} to ${sarTransaction.receiverCountry}`)
                        .replace(/\[AI-Assessed Reason for Suspicion\]/g, 'Unusual transfer to flagged jurisdiction.')
                        .replace(/\[AI-Generated Narrative\]/g, `a single high-value transfer of ${sarTransaction.amount} ${sarTransaction.currency} from ${sarTransaction.senderCountry} to ${sarTransaction.receiverCountry}, which is a flagged jurisdiction.`);
                    linkedDataDescription = `Relevant data includes high-risk transaction ${sarTransaction.transaction_id}`;
                    linkedDataFilters = { type: 'Transaction', id: sarTransaction.transaction_id };
                }
                break;
            case 'CTR':
                const ctrTransaction = mockTransactionData.rows.find(row => parseFloat(row.amount) > 10000 && row.transactionType === 'Deposit');
                if (ctrTransaction) {
                    generatedContent = generatedContent
                        .replace(/\[AI-Identified Transaction Date\]/g, ctrTransaction.timestamp.split('T')[0])
                        .replace(/\[AI-Identified Transaction Amount\]/g, ctrTransaction.amount)
                        .replace(/\[AI-Identified Transaction Currency\]/g, ctrTransaction.currency)
                        .replace(/\[AI-Identified Transaction Type\]/g, ctrTransaction.transactionType === 'Deposit' ? 'Cash Deposit' : 'Cash Withdrawal')
                        .replace(/\[AI-Identified Branch\/Location\]/g, 'Main Branch, Lagos')
                        .replace(/\[AI-Identified Customer Name\]/g, 'John Doe')
                        .replace(/\[AI-Identified Customer Account\]/g, 'ACC12345')
                        .replace(/\[AI-Identified ID Type & Number\]/g, 'NIN: 1234567890')
                        .replace(/\[AI-Summarized Purpose of Transaction\]/g, 'Capital Injection for Business')
                        .replace(/\[AI-Identified Source of Funds\]/g, 'Personal Savings')
                        .replace(/\[AI-Identified Destination of Funds\]/g, 'Company Operating Account');
                    linkedDataDescription = `Relevant data includes high-value transaction ${ctrTransaction.transaction_id}`;
                    linkedDataFilters = { type: 'Transaction', id: ctrTransaction.transaction_id };
                }
                break;
            case 'Annual Review':
                const userAccessIssues = mockUserAccessData.rows.filter(row => {
                    const validationResult = userAccessValidationRule.rules.some(rule => {
                        const value = row[mockUserAccessData.headers.indexOf(rule.field)];
                        return !rule.check(value, row);
                    });
                    return validationResult;
                }).length;
                const complianceStatus = userAccessIssues === 0 ? 'Complied' : 'Did Not Comply';
                const comment = userAccessIssues > 0
                  ? `Internal control measures for user access show ${userAccessIssues} potential issues, requiring further review to ensure full compliance with internal policies.`
                  : `Internal control measures, including AML/CFT compliance arrangements, employee screening, ongoing training programs, and independent audit functions, are actively implemented. A manual of compliance procedures is maintained.`;

                generatedContent = newReportData.template.content
                  .replace(/\[AI-Assessed Status\]/g, complianceStatus)
                  .replace(/\[AI-Assessed Internal Control Comments\]/g, comment);

                generatedContent = generatedContent
                  .replace(/\[AI-Assessed Registration Comments\]/g, 'Registration comments from AI')
                  .replace(/\[AI-Assessed Risk Assessment Comments\]/g, 'Risk assessment comments from AI')
                  .replace(/\[AI-Assessed Internal Control Comments\]/g, 'Internal control comments from AI')
                  .replace(/\[AI-Assessed CDD Comments\]/g, 'Customer Due Diligence comments from AI')
                  .replace(/\[AI-Assessed Suspicious Activity Comments\]/g, 'Suspicious Activity comments from AI')
                  .replace(/\[AI-Assessed Record Keeping Comments\]/g, 'Record Keeping comments from AI');

                linkedDataDescription = `Compliance status derived from user access data analysis.`;
                linkedDataFilters = { type: 'User Access', status: 'Flagged' };
                break;
            default:
                break;
        }
    } else if (newReportData.file) {
        const fileExtractionResult = simulateFileContentExtraction(newReportData.file.name);
        generatedContent = fileExtractionResult.content;
        reportType = fileExtractionResult.type;
        linkedDataDescription = `AI-extracted content from uploaded file "${newReportData.file.name}"`;
        linkedDataFilters = { type: 'File', name: newReportData.file.name };
    }


    const newReport = {
      id: `rep-${Date.now()}`,
      name: newReportData.name,
      status: 'Draft',
      type: reportType,
      regulator: newReportData.regulator,
      jurisdiction: jurisdiction === 'Global' ? 'Global' : jurisdiction,
      content: generatedContent,
      linkedDataDescription: linkedDataDescription,
      linkedDataFilters: linkedDataFilters
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
    setActiveTab('smartFiling');
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
    setSelectedEvent(null);
  };

  const handleOpenDraftModal = (report) => {
    setSelectedReport(report);
    setActiveModal('draft');
  };

  const handleOpenFileModal = (report) => {
    setSelectedReport(report);
    setActiveModal('filing');
  };

  const handleNavigateToDetailedRecords = (filters) => {
    if (onNavigate) {
      onNavigate('Data Management', { initialTab: 'Detailed Records', detailedRecordsFilters: filters });
    }
  };

  const handleReportingDashboardFilterChange = (filterName, value) => {
      setReportingDashboardFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
            <>
                <ReportingOverview
                    reportStatusData={dynamicReportStatusData}
                    monthlySubmissionsData={monthlySubmissionsData}
                />
                <div className="mt-6">
                    <ReportingDashboard
                        reports={filteredReports}
                        filters={reportingDashboardFilters}
                        onFilterChange={handleReportingDashboardFilterChange}
                        regulators={['All', 'CBN', 'CMA', 'NDIC', 'SARB']}
                        reportTypes={['All', 'SAR', 'CTR', 'Annual Review', 'Uploaded']}
                        statuses={['All', 'Draft', 'Pending Submission', 'Filed', 'In Review', 'Overdue']}
                        onGenerateReport={() => setActiveModal('generate')}
                        onUploadReport={() => setActiveModal('upload')}
                        onEditReport={handleOpenDraftModal}
                        onNavigateToDetailedRecords={handleNavigateToDetailedRecords}
                    />
                </div>
            </>
        );
      case 'calendar':
        return <ReportingCalendar events={filteredEvents} onEventClick={handleCalendarEventClick} />;
      case 'smartFiling':
        return <SmartFiling reports={filteredReports} onFileNow={handleOpenFileModal} />;
      default:
        return (
            <ReportingOverview
                reportStatusData={dynamicReportStatusData}
                monthlySubmissionsData={monthlySubmissionsData}
            />
        );
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in relative theme-bg-page theme-text-primary">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold theme-text-primary">Compliance Reporting</h1>
          <p className="theme-text-secondary">Manage, generate, and file all your regulatory reports.</p>
        </div>
      </div>

      <div className="border-b theme-border-color">
        <nav className="-mb-px flex space-x-6">
          <button onClick={() => setActiveTab('overview')} className={`py-3 px-1 inline-flex items-center gap-2 text-sm font-medium whitespace-nowrap ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'theme-text-secondary hover:text-blue-600'}`}><LayoutGrid size={16}/>Overview</button>
          <button onClick={() => setActiveTab('calendar')} className={`py-3 px-1 inline-flex items-center gap-2 text-sm font-medium whitespace-nowrap ${activeTab === 'calendar' ? 'text-blue-600 border-b-2 border-blue-600' : 'theme-text-secondary hover:text-blue-600'}`}><CalendarDays size={16}/>Calendar</button>
          <button onClick={() => setActiveTab('smartFiling')} className={`py-3 px-1 inline-flex items-center gap-2 text-sm font-medium whitespace-nowrap ${activeTab === 'smartFiling' ? 'text-blue-600 border-b-2 border-blue-600' : 'theme-text-secondary hover:text-blue-600'}`}><Sparkles size={16}/>Smart Filing</button>
        </nav>
      </div>

      <div className="mt-4">
        {renderContent()}
      </div>

      {activeModal === 'generate' && <GenerateReportModal onClose={() => setActiveModal(null)} onProcessReport={handleProcessReport} triggerAIAnalysis={triggerAIAnalysis} />}
      {activeModal === 'upload' && <UploadExistingReportModal onClose={() => setActiveModal(null)} onProcessReport={handleProcessReport} />}
      {activeModal === 'draft' && <ReportDraftModal report={selectedReport} onClose={() => setActiveModal(null)} onReadyForSubmission={handleReadyForSubmission} triggerAIAnalysis={triggerAIAnalysis} />}
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
