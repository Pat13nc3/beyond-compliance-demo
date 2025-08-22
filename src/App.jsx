// src/App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar.jsx';
import Header from './components/layout/Header.jsx';
import SignInPage from './features/auth/SignInPage.jsx';

// --- Import all your page components ---
import ActionOrientedDashboard from './features/dashboard/index.jsx';
import ComplianceReporting from './features/complianceReporting/index.jsx';
import DataManagement from './features/dataManagement/index.jsx';
import Library from './features/library/index.jsx';
import RiskAssessment from './features/riskAssessment/index.jsx';
import Licensing from './features/licensing/index.jsx';
import RegulatoryUpdates from './features/regulatoryUpdates/index.jsx';
import Manage from './features/manage/index.jsx';
import Settings from './features/settings/index.jsx';
import TaskManagement from './features/taskManagement/index.jsx';
import ComplianceFrameworks from './features/complianceFrameworks/index.jsx';

// Global UI Components
import Toast from './components/ui/Toast.jsx';
import AIAnalysisResultModal from './features/aiAgent/modals/AIAnalysisResultModal.jsx';

// Onboarding Components
import OnboardingWrapper from './features/onboarding/OnboardingWrapper.jsx';
import { mockRules as initialMockRules, mockTemplates, mockRegulatorySections } from './data/mockData.js';

// Firebase imports
import { getAuth, onAuthStateChanged, signInWithCustomToken, signInAnonymously } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const App = () => {
    // Firebase related states
    const [user, setUser] = useState(null);
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [isFirebaseInitialized, setIsFirebaseInitialized] = useState(false);
    const [isMockMode, setIsMockMode] = useState(false); // NEW STATE FOR MOCK MODE

    // Application specific states
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [userMode, setUserMode] = useState('Pro');
    const [pageContext, setPageContext] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeJurisdiction, setActiveJurisdiction] = useState('Global');
    const [theme, setTheme] = useState('dark');
    
    // State to track if the user has completed the onboarding flow
    const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

    const [libraryEvidence, setLibraryEvidence] = useState([
      { name: 'Q1 Board Meeting Minutes.pdf', status: 'New', id: 'evid-1' }
    ]);

    const [toastMessage, setToastMessage] = useState('');
    const [isAIAnalysisResultModalOpen, setIsAIAnalysisResultModalOpen] = useState(false);
    // FIX: Initialize aiAnalysisResultContent as an object with default empty arrays/strings
    const [aiAnalysisResultContent, setAiAnalysisResultContent] = useState({
        title: '',
        summary: '',
        keyPoints: [],
        recommendedActions: [],
        originalContext: {},
        analysisType: ''
    });

    // NEW STATE VARIABLES
    const [activeProduct, setActiveProduct] = useState('All Products');
    const [selectedEntity, setSelectedEntity] = useState('parent-01');

    useEffect(() => {
        const mockFirebaseConfig = {
            apiKey: "YOUR_FIREBASE_API_KEY",
            authDomain: "your-project-id.firebaseapp.com",
            projectId: "your-project-id",
            storageBucket: "your-project-id.appspot.com",
            messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
            appId: "YOUR_APP_ID"
        };
        
        const firebaseConfig = (typeof __firebase_config !== 'undefined' && Object.keys(JSON.parse(__firebase_config)).length > 0)
            ? JSON.parse(__firebase_config)
            : mockFirebaseConfig;

        const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
        
        const isConfigValid = firebaseConfig && firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_FIREBASE_API_KEY";

        if (!isConfigValid) {
            console.warn("No valid Firebase config detected. Running in mock user mode.");
            setIsMockMode(true);
            setUser({ uid: 'mock-user-123' });
            // In mock mode, we still want to go through onboarding
            setIsOnboardingComplete(false); 
            setIsFirebaseInitialized(true);
        } else {
            if (Object.keys(firebaseConfig).length > 0 && !isFirebaseInitialized) {
                try {
                    const app = initializeApp(firebaseConfig);
                    const authInstance = getAuth(app);
                    const dbInstance = getFirestore(app);

                    setAuth(authInstance);
                    setDb(dbInstance);
                    setIsFirebaseInitialized(true);

                    const unsubscribe = onAuthStateChanged(authInstance, async (currentUser) => {
                        if (currentUser) {
                            setUser(currentUser);
                        } else {
                            setUser(null);
                            setIsOnboardingComplete(false);
                        }
                    });

                    const signIn = async () => {
                        if (initialAuthToken) {
                            try {
                                await signInWithCustomToken(authInstance, initialAuthToken);
                            } catch (error) {
                                console.error("Custom token sign-in failed:", error);
                                await signInAnonymously(authInstance);
                            }
                        } else {
                            await signInAnonymously(authInstance);
                        }
                    };
                    signIn();

                    return () => unsubscribe();
                } catch (e) {
                    console.error("Firebase initialization failed:", e);
                }
            }
        }
    }, [isFirebaseInitialized]);

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

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

    const handleOnboardingComplete = (setupConfig) => {
        console.log("Onboarding complete with config:", setupConfig);
        setIsOnboardingComplete(true);
        setActiveTab('Dashboard');
        setToastMessage(`Welcome! Your platform is configured for ${setupConfig.jurisdiction}.`);
    };


    const triggerAIAnalysis = (contextData, analysisType) => {
        console.log(`AI Analysis requested for type: ${analysisType}`, contextData);
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
                summary = `Simulated review of your license application for "${contextData.licenseType || 'General License'}" for ${contextData.jurisdiction}.`;
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
            case 'RuleSummary':
                summary = `Simulated AI summary and analysis of rule "${contextData.ruleName || 'Untitled Rule'}".`;
                keyPoints = [
                    `Identified primary trigger condition: ${contextData.conditions[0]?.field} ${contextData.conditions[0]?.operator} "${contextData.conditions[0]?.value}".`,
                    `Primary action: ${contextData.actions[0]?.type}.`,
                    `Assessed potential impact on data volume and alert frequency.`,
                    `Cross-referenced with related rules in the system.`
                ];
                recommendedActions = [
                    `Verify rule conditions against latest regulatory circulars.`,
                    `Run a simulation with historical data to predict rule impact.`,
                    `Consider creating a corresponding task in Task Management for ongoing monitoring.`
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
        if (!isFirebaseInitialized) {
            return (
                <div className="flex items-center justify-center min-h-screen theme-bg-page theme-text-primary">
                    <p>Initializing application...</p>
                </div>
            );
        }

        if (!user && !isMockMode) {
            return (
                <SignInPage 
                    onSignInSuccess={(dbInstance, authInstance, uid) => {
                        setDb(dbInstance);
                        setAuth(authInstance);
                        setUser({ uid });
                        setIsOnboardingComplete(false); 
                    }} 
                />
            );
        }

        if (!isOnboardingComplete) {
            return <OnboardingWrapper onCompleteOnboarding={handleOnboardingComplete} />;
        }

        const pageProps = {
            onNavigate: handleNavigate,
            context: pageContext,
            onCleanContext: handleCleanContext,
            jurisdiction: activeJurisdiction,
            triggerAIAnalysis: triggerAIAnalysis,
        };

        switch (activeTab) {
            case 'Dashboard':
                return <ActionOrientedDashboard {...pageProps} activeProduct={activeProduct} setActiveProduct={setActiveProduct} selectedEntity={selectedEntity} onSelectEntity={setSelectedEntity} />;
            case 'ComplianceReporting':
                return <ComplianceReporting {...pageProps} />;
            case 'ComplianceFrameworks':
                // Correctly pass all necessary props to the component
                return <ComplianceFrameworks {...pageProps} activeProduct={activeProduct} selectedEntity={selectedEntity} onSelectEntity={setSelectedEntity} />;
            case 'DataManagement':
                return <DataManagement {...pageProps} onPromoteToLibrary={handlePromoteToLibrary} jurisdiction={activeJurisdiction} onNavigate={handleNavigate} />;
            case 'Library':
                return <Library {...pageProps} evidence={libraryEvidence} />;
            case 'RiskAssessment':
                return <RiskAssessment {...pageProps} />;
            case 'Licensing':
                return <Licensing {...pageProps} />;
            case 'RegulatoryUpdates':
                // NEW: Pass activeProduct, jurisdiction, and setActiveJurisdiction
                return <RegulatoryUpdates {...pageProps} activeProduct={activeProduct} jurisdiction={activeJurisdiction} setActiveJurisdiction={setActiveJurisdiction} />;
            case 'Manage':
                return <Manage {...pageProps} />;
            case 'Settings':
                return <Settings {...pageProps} />;
            case 'TaskManagement':
                return <TaskManagement {...pageProps} />;
            default:
                return <ActionOrientedDashboard {...pageProps} activeProduct={activeProduct} setActiveProduct={setActiveProduct} selectedEntity={selectedEntity} onSelectEntity={setSelectedEntity} />;
        }
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden" data-theme={theme}>
            {user && isOnboardingComplete && (
                <Header
                    activeTab={activeTab}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                    userMode={userMode}
                    setUserMode={setUserMode}
                    activeJurisdiction={activeJurisdiction}
                    setActiveJurisdiction={setActiveJurisdiction}
                    activeProduct={activeProduct}
                    setActiveProduct={setActiveProduct}
                    theme={theme}
                    toggleTheme={toggleTheme}
                    isMockMode={isMockMode}
                />
            )}
            <div className="flex flex-1 overflow-hidden">
                {user && isOnboardingComplete && (
                    <Sidebar
                        activeTab={activeTab}
                        setActiveTab={handleNavigate}
                        isSidebarOpen={isSidebarOpen}
                        setIsSidebarOpen={setIsSidebarOpen}
                    />
                )}
                <main className="flex-1 overflow-x-hidden overflow-y-auto theme-bg-page">
                    {renderContent()}
                </main>
            </div>

            {isAIAnalysisResultModalOpen && (
                <AIAnalysisResultModal
                    title={aiAnalysisResultContent.title}
                    result={aiAnalysisResultContent}
                    onClose={() => { setIsAIAnalysisResultModalOpen(false); setAiAnalysisResultContent({}); }}
                    onPromote={(actionType, originalContext, aiResult) => {
                        console.log(`Simulating promotion to ${actionType}...`, {originalContext, aiResult});
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