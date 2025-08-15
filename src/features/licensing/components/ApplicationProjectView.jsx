// src/features/licensing/components/ApplicationProjectView.jsx

import React, { useState, useRef } from "react";
import { ArrowLeft, CheckCircle, Clock, FileText, UploadCloud, Plus, Download, Send } from "lucide-react";

// Helper function to get status styles
const getStatusStyles = (status) => {
    switch (status) {
        case 'Active':
        case 'Approved':
            return 'bg-green-500 text-white';
        case 'In Progress':
        case 'Application in Progress':
            return 'bg-yellow-500 text-black';
        case 'Submitted':
            return 'bg-blue-500 text-white';
        case 'Renewal Due':
            return 'bg-red-500 text-white';
        default:
            return 'bg-gray-500 text-white';
    }
};

const ApplicationProjectView = ({ license, onBack }) => {
    const [activeSubTab, setActiveSubTab] = useState('Overview');
    
    // NEW: Use state to manage documents dynamically
    const [documents, setDocuments] = useState([
        { id: 1, name: 'business_plan_v3_final.pdf' },
        { id: 2, name: 'articles_of_incorporation.pdf' },
    ]);
    
    // Create a ref for the hidden file input
    const fileInputRef = useRef(null);

    const mockProjectData = {
        name: license.name,
        jurisdiction: license.jurisdiction,
        status: license.status,
        requirements: [
            { id: 1, text: 'Business Plan and Financial Projections', completed: true, status: 'Approved' },
            { id: 2, text: 'Certified Articles of Incorporation', completed: true, status: 'Approved' },
            { id: 3, text: 'AML/CFT Policy Documentation', completed: false, status: 'Pending' },
            { id: 4, text: 'Proof of Identity for all Directors', completed: false, status: 'Pending' },
            { id: 5, text: 'Completed Application Form 101', completed: false, status: 'Pending' },
        ],
        overview: {
            description: "The Payment Solution Service Provider (PSSP) license allows organisations to offer payment solutions such as payment gateways, merchant processing, and financial transaction services. This license is crucial for businesses operating within the payment and financial services sector, ensuring compliance with local regulations and safeguarding consumers. Capital Requirement: ₦100,000,000. Application Fee: ₦50,000."
        },
        eligibility: [
            "Must be a company incorporated in the jurisdiction of Nigeria.",
            "Must have a minimum paid-up capital of NGN 100,000,000.",
            "Key management personnel must meet the 'fit and proper' criteria.",
            "Must have a clear corporate governance structure in place."
        ],
        applicationSteps: [
            "1. Complete and submit Application Form 101.",
            "2. Upload all required supporting documents.",
            "3. Pay the non-refundable application fee of NGN 50,000.",
            "4. Await preliminary review by the Central Bank of Nigeria (CBN).",
            "5. If approved in principle, pay the licensing fee of NGN 1,000,000."
        ]
    };

    const isSubmissionReady = mockProjectData.requirements.every(req => req.completed);

    const handleDownloadApplication = () => {
        alert("Downloading a zip file of your application and all supporting documents.");
    };

    const handleSubmitApplication = () => {
        if (isSubmissionReady) {
            alert("Application submitted to regulator for review! You will be notified of any status changes.");
        }
    };
    
    // NEW: Function to handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newDocument = {
                id: `doc-${Date.now()}`,
                name: file.name
            };
            setDocuments(prevDocuments => [...prevDocuments, newDocument]);
            // Reset the input to allow uploading the same file again
            fileInputRef.current.value = '';
        }
    };
    
    // NEW: Function to trigger the hidden file input
    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const renderSubTabContent = () => {
        switch (activeSubTab) {
            case 'Overview':
                return (
                    <div className="space-y-4">
                        <p className="theme-text-primary text-base whitespace-pre-wrap">{mockProjectData.overview.description}</p>
                    </div>
                );
            case 'Eligibility':
                return (
                    <ul className="list-disc list-inside theme-text-primary space-y-2">
                        {mockProjectData.eligibility.map((item, index) => (
                            <li key={index} className="flex items-start text-sm">
                                <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" /> {item}
                            </li>
                        ))}
                    </ul>
                );
            case 'Checklist':
                return (
                    <div className="space-y-2">
                        {mockProjectData.requirements.map(item => (
                            <div key={item.id} className="flex items-center p-3 theme-bg-card-alt rounded-md">
                                {item.completed 
                                    ? <CheckCircle size={20} className="text-green-500 mr-3" />
                                    : <Clock size={20} className="text-yellow-500 mr-3" />
                                }
                                <span className={`flex-grow ${item.completed ? 'line-through text-gray-500' : 'theme-text-primary'}`}>
                                    {item.text}
                                </span>
                                <span className={`text-sm font-semibold px-2 py-1 rounded-full text-black ${getStatusStyles(item.status)}`}>
                                    {item.status}
                                </span>
                            </div>
                        ))}
                    </div>
                );
            case 'License Application Steps':
                return (
                    <ol className="list-decimal list-inside theme-text-primary space-y-2">
                        {mockProjectData.applicationSteps.map((step, index) => (
                            <li key={index} className="text-sm">{step}</li>
                        ))}
                    </ol>
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-6 theme-bg-page min-h-screen theme-text-primary animate-fade-in">
            <div className="flex items-center space-x-4 mb-6">
                <button onClick={onBack} className="p-2 rounded-full theme-text-primary hover:bg-gray-200 dark:hover:bg-gray-700">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-3xl font-bold">{mockProjectData.name}</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-6">
                     <div className="theme-bg-card p-6 rounded-xl shadow-lg">
                        <div className="flex justify-between items-center mb-4 pb-4 border-b theme-border-color">
                            <h2 className="text-xl font-bold theme-text-highlight-color">Application Status</h2>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyles(mockProjectData.status)}`}>
                                {mockProjectData.status}
                            </span>
                        </div>
                        <div className="flex justify-start space-x-4 border-b theme-border-color pb-2">
                            {['Overview', 'Eligibility', 'License Application Steps', 'Checklist'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveSubTab(tab)}
                                    className={`py-2 px-1 text-sm font-medium ${activeSubTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'theme-text-secondary hover:text-blue-600'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div className="mt-4">
                           {renderSubTabContent()}
                        </div>
                    </div>
                </div>

                {/* Sidebar Content */}
                <div className="md:col-span-1 space-y-6">
                    {/* Documents Card */}
                    <div className="theme-bg-card p-6 rounded-xl shadow-lg">
                        <div className="flex justify-between items-center mb-4 pb-4 border-b theme-border-color">
                            <h2 className="text-xl font-bold theme-text-highlight-color">Documents</h2>
                            <button className="text-blue-500 hover:text-blue-300">
                                <Plus size={20} />
                            </button>
                        </div>
                        <div className="space-y-2">
                            {documents.map(doc => ( // UPDATED: Map over state instead of mock data
                                <div key={doc.id} className="flex items-center p-3 theme-bg-card-alt rounded-md">
                                    <FileText size={20} className="theme-text-secondary mr-3" />
                                    <span className="text-sm theme-text-primary">{doc.name}</span>
                                </div>
                            ))}
                            {/* NEW: Hidden file input */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            {/* NEW: Click handler to trigger the file input */}
                            <button onClick={handleUploadClick} className="w-full mt-4 p-3 border-2 border-dashed border-blue-500 text-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
                                <UploadCloud size={20} className="mr-2" />
                                Upload File
                            </button>
                        </div>
                    </div>
                    {/* Action buttons at the bottom of the sidebar */}
                    <div className="theme-bg-card p-6 rounded-xl shadow-lg">
                        <h2 className="text-xl font-bold theme-text-highlight-color mb-4">Application Actions</h2>
                        <div className="flex flex-col space-y-3">
                            <button 
                                onClick={handleDownloadApplication} 
                                className="w-full py-3 rounded-md text-sm font-bold bg-gray-600 text-white hover:bg-gray-700 flex items-center justify-center transition-colors"
                            >
                                <Download size={20} className="mr-2"/> Download Application
                            </button>
                            <button 
                                onClick={handleSubmitApplication} 
                                disabled={!isSubmissionReady}
                                className="w-full py-3 rounded-md text-sm font-bold bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                            >
                                <Send size={20} className="mr-2"/> Submit Application
                            </button>
                            {!isSubmissionReady && (
                                <p className="text-xs text-center text-yellow-400">
                                    Complete all checklist items to submit.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationProjectView;