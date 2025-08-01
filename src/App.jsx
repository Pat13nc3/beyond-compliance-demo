// src/App.jsx

import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

// --- Import all your page components ---
import ActionOrientedDashboard from './features/dashboard';
import ComplianceReporting from './features/complianceReporting';
import DataManagement from './features/dataManagement';
import Library from './features/library';
import RiskAssessment from './features/riskAssessment';
import Licensing from './features/licensing';
import RegulatoryUpdates from './features/regulatoryUpdates';
import Manage from './features/manage';
import Settings from './features/settings';

// AI Agent feature
import AIAgent from './features/aiAgent';

// Global UI Components
import Toast from './components/ui/Toast';

// CORRECTED: Import AIAnalysisResultModal from its actual location within aiAgent/modals
import AIAnalysisResultModal from './features/aiAgent/modals/AIAnalysisResultModal';


const App = () => {
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [userMode, setUserMode] = useState('Pro');
    const [pageContext, setPageContext] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeJurisdiction, setActiveJurisdiction] = useState('Global');

    const [libraryEvidence, setLibraryEvidence] = useState([
      { name: 'Q1 Board Meeting Minutes.pdf', status: 'New', id: 'evid-1' }
    ]);

    const [toastMessage, setToastMessage] = useState('');

    // State for AI Analysis Result Modal
    const [isAIAnalysisResultModalOpen, setIsAIAnalysisResultModalOpen] = useState(false);
    const [aiAnalysisResultContent, setAiAnalysisResultContent] = useState({});


    const handlePromoteToLibrary = (fileToPromote) => {
        const newEvidence = {
          id: `evid-${Date.now()}`,
          name: fileToPromote.name,
          status: 'New',
        };
        setLibraryEvidence(currentEvidence => [newEvidence, ...currentEvidence]);
    };

    const handleNavigate = (tab, context = null) => {
        setActiveTab(tab);
        setPageContext(context);
    };

    const handleCleanContext = () => {
        setPageContext(null);
    };

    // Function to trigger AI analysis and show result modal
    const triggerAIAnalysis = (contextData, analysisType) => {
        console.log(`AI Analysis requested for type: ${analysisType}`, contextData);
        // Simulate AI analysis and generate result
        let summary = "";
        let keyPoints = [];
        let recommendedActions = [];

        switch (analysisType) {
            case 'ReportDraft':
                summary = `Simulated analysis of your report draft "${contextData.reportName || 'Untitled Report'}": The AI has identified key sections and areas for improvement.`;
                keyPoints = [
                    "Ensured all mandatory sections are present.",
                    "Identified potential inconsistencies in data reporting.",
                    "Summarized key findings and conclusions."
                ];
                recommendedActions = [
                    "Verify data points in 'Financial Overview' section.",
                    "Add a disclaimer for forward-looking statements.",
                    "Cross-reference with latest regulatory updates for jurisdiction: " + (contextData.jurisdiction || 'Global')
                ];
                break;
            case 'ReportCompliance':
                // NEW: AI analysis for compliance check
                summary = `Simulated AI compliance check for the report draft "${contextData.reportName || 'Untitled Report'}" completed.`;
                keyPoints = [
                    "Identified a potential conflict with the CBN PSP Framework regarding data localization (Section 4.1).",
                    "The report's summary of transactions appears to be missing a key demographic breakdown required by a recent regulatory update.",
                    "The declaration section lacks a specific date field, which is required for formal submission."
                ];
                recommendedActions = [
                    "Review Section 4.1 of the report to ensure all data is processed within the correct jurisdiction.",
                    "Add a new table to the report detailing transaction volume by customer country of origin.",
                    "Insert a dynamic date field into the final declaration."
                ];
                break;
            case 'UploadedDocumentAnalysis':
                // NEW: AI analysis for uploaded documents
                summary = `Simulated AI analysis of document "${contextData.documentName || 'Untitled Document'}" completed successfully.`;
                keyPoints = [
                    "Extracted key entities and report headers from the document.",
                    "Analyzed the document structure and identified it as a quarterly financial report.",
                    "Found a reference to the 'Proceeds of Crime and Anti-Money Laundering Act 2009' in the content.",
                ];
                recommendedActions = [
                    "Verify the extracted report details for accuracy.",
                    "Link this document to the relevant compliance requirement in the Compliance Calendar.",
                    "Assign a task to the legal team to review the document's alignment with the referenced Act."
                ];
                break;
            case 'ReportTemplate':
                summary = `Simulated generation of a report template for '${contextData.templateType || 'General Report'}'.`;
                keyPoints = [
                    "Includes sections for Executive Summary, Introduction, Methodology, Findings, Recommendations, and Conclusion.",
                    "Formatted for regulatory submission compliance.",
                    "Placeholder for data integration points."
                ];
                recommendedActions = [
                    "Customize introduction and scope specific to your organization.",
                    "Populate data fields from integrated sources.",
                    "Review specific regulatory guidelines for additional requirements."
                ];
                break;
            case 'RegulationReview':
                summary = `Simulated review of regulation "${contextData.regulationTitle || 'Untitled Regulation'}".`;
                keyPoints = [
                    "Key changes identified compared to previous version.",
                    "Impact on current operational procedures assessed.",
                    "Specific clauses affecting data privacy highlighted."
                ];
                recommendedActions = [
                    "Update internal policies based on Section 3.1 changes.",
                    "Conduct training for relevant teams on new compliance obligations.",
                    "Assess technology stack for new data handling requirements."
                ];
                break;
            case 'DataAnalysis':
                summary = `Simulated analysis of ${contextData.recordCount || 'selected'} data records from ${contextData.dataSource || 'your database'}.`;
                keyPoints = [
                    "Identified 3 potential anomalies in transaction patterns.",
                    "Summarized customer segments by risk score.",
                    "Suggested areas for data quality improvement."
                ];
                recommendedActions = [
                    "Review flagged transactions for suspicious activity.",
                    "Initiate KYC refresh for high-risk customer segments.",
                    "Implement automated data validation rules for future ingestions."
                ];
                break;
            case 'LicenseApplication':
                summary = `Simulated review of your license application for "${contextData.licenseType || 'General License'}".`;
                keyPoints = [
                    "Identified 2 missing required documents.",
                    "Summarized key regulatory requirements for application.",
                    "Highlighted common pitfalls in similar applications."
                ];
                recommendedActions = [
                    "Upload 'Proof of Capital' and 'Business Plan' documents.",
                    "Review Section B for alignment with regulatory definitions.",
                    "Schedule a pre-submission review with legal counsel."
                ];
                break;
            default:
                summary = "AI analysis performed. No specific insights generated for this type of request at the moment.";
                keyPoints = ["No specific key points."];
                recommendedActions = ["Consider rephrasing your query."];
        }

        setAiAnalysisResultContent({
            title: `AI Result for ${analysisType.replace(/([A-Z])/g, ' $1').trim()}`,
            summary,
            keyPoints,
            recommendedActions,
            originalContext: contextData,
            analysisType: analysisType
        });
        setIsAIAnalysisResultModalOpen(true);
    };


    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => {
                setToastMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);


    const renderContent = () => {
        const pageProps = {
            onNavigate: handleNavigate,
            context: pageContext,
            onCleanContext: handleCleanContext,
            jurisdiction: activeJurisdiction,
            triggerAIAnalysis: triggerAIAnalysis, // Pass triggerAIAnalysis to relevant pages
        };

        switch (activeTab) {
            case 'Dashboard':
                return <ActionOrientedDashboard {...pageProps} />;
            case 'ComplianceReporting':
                return <ComplianceReporting {...pageProps} />;

            case 'Data Management':
            case 'DataManagement': // Fallback for consistency
                return <DataManagement {...pageProps} onPromoteToLibrary={handlePromoteToLibrary} jurisdiction={activeJurisdiction} onNavigate={handleNavigate} />;

            case 'Library':
                return <Library {...pageProps} evidence={libraryEvidence} />;
            case 'RiskAssessment':
                return <RiskAssessment {...pageProps} />;
            case 'Licensing':
                return <Licensing {...pageProps} />;
            case 'RegulatoryUpdates':
                return <RegulatoryUpdates {...pageProps} />;
            case 'Manage':
                return <Manage {...pageProps} />;
            case 'Settings':
                return <Settings {...pageProps} />;
            case 'AIAgent':
                return <AIAgent {...pageProps} />;
            default:
                return <ActionOrientedDashboard {...pageProps} />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            <Sidebar
                activeTab={activeTab}
                setActiveTab={handleNavigate}
                isSidebarOpen={isSidebarOpen}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header
                    activeTab={activeTab}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                    userMode={userMode}
                    setUserMode={setUserMode}
                    activeJurisdiction={activeJurisdiction}
                    setActiveJurisdiction={setActiveJurisdiction}
                />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 h-full">
                    {renderContent()}
                </main>
            </div>

            {/* AI Analysis Result Modal - Managed Globally by App.jsx */}
            {isAIAnalysisResultModalOpen && (
                <AIAnalysisResultModal
                    title={aiAnalysisResultContent.title}
                    result={aiAnalysisResultContent}
                    onClose={() => { setIsAIAnalysisResultModalOpen(false); setAiAnalysisResultContent({}); }}
                    onPromote={(actionType, originalContext, aiResult) => {
                        console.log(`Promote action: ${actionType}`, {originalContext, aiResult});
                        setToastMessage(`Simulating promotion to ${actionType}...`);
                        setIsAIAnalysisResultModalOpen(false);
                    }}
                />
            )}

            {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}
        </div>
    );
};

export default App;
