// This file no longer needs to import BarChart3 for the library, so it's removed from this import line.
import { Target, Shield, CheckCheck, BookOpenCheck, FileSignature, Archive, FileClock, FileText, Folder, BarChart3 } from 'lucide-react';

export const initialPriorityActions = [
    { id: 1, type: 'DEADLINE', urgency: 'URGENT', title: "Nigerian PSP License Renewal Due", details: "Submission required in 15 days", cta: "Start Renewal" },
    { id: 2, type: 'DEADLINE', urgency: 'HIGH', title: "Quarterly AML Summary (Q2) due", details: "Due in 3 days", cta: "Prepare Report" },
    { id: 3, type: 'ACTION', urgency: 'MEDIUM', title: "NDPA Compliance Check Required", details: "Annual data protection audit for Nigerian operations is due for scheduling.", cta: "Submit Evidence" },
];

export const regulatoryPulseData = [
    { id: 1, type: 'UPDATE', source: 'Central Bank of Nigeria (CBN)', title: "Updated guidelines for Payment Service Providers released.", date: "2025-06-20" },
    { id: 2, type: 'ANALYSIS', source: 'EMTECH Rules Engine', title: "New ODPC requirements require 2 new controls for your DASP license.", date: "2025-06-19" },
];

export const kpiData = [
    { title: 'Overall Score', value: 88, color: '#c0933e', icon: 'Target', explanation: "This score represents the overall compliance health of your organization, calculated by weighting all monitored controls, reports, and risk factors." },
    { title: 'Controls Adherence', value: 75, color: '#22c55e', icon: 'Shield', explanation: "This score measures the percentage of your internal controls that are currently active, fully implemented, and meeting their defined requirements." },
    { title: 'On-Time Reporting', value: 98, color: '#3b82f6', icon: 'CheckCheck', explanation: "This score tracks the percentage of regulatory reports and filings submitted on or before their due dates over the last 12 months." },
];

export const gapAssessmentData = [ { name: 'AML Policy', adherence: 85, }, { name: 'Data Privacy', adherence: 95, }, { name: 'SOX Controls', adherence: 70, }, { name: 'MiFID II Reporting', adherence: 92, }, ];
export const kycData = [ { name: 'Verified', value: 450, fill: 'url(#goldGradient)' }, { name: 'Pending', value: 30, fill: 'url(#greenGradient)' }, { name: 'Rejected', value: 15, fill: 'url(#redGradient)' }, ];
export const fraudData = [ { name: 'Mon', transactions: 1200, flagged: 5 }, { name: 'Tue', transactions: 1500, flagged: 8 }, { name: 'Wed', transactions: 1100, flagged: 2 }, { name: 'Thu', transactions: 1800, flagged: 12 }, { name: 'Fri', transactions: 2100, flagged: 7 }, ];
export const recentReportsData = [ { id: 1, name: "Quarterly AML Summary - Q2 2025", date: "2025-06-18", format: "PDF" }, { id: 2, name: "Suspicious Activity Report (SAR) - May 2025", date: "2025-06-01", format: "CSV" }, ];
export const reportStatusData = [ { name: 'Submitted', value: 78, fill: '#22c55e' }, { name: 'In Draft', value: 12, fill: '#3b82f6' }, { name: 'In Review', value: 5, fill: '#f59e0b' }, { name: 'Overdue', value: 2, fill: '#ef4444' }, ];
export const monthlySubmissionsData = [ { month: 'Jan', count: 10 }, { month: 'Feb', count: 8 }, { month: 'Mar', count: 12 }, { month: 'Apr', count: 11 }, { month: 'May', count: 9 }, { month: 'Jun', count: 15 }, ];
export const controlHotspotData = [ { id: 'SOX-004', name: 'User Access Review', status: 'Failing', reason: 'Quarterly review is 3 days overdue.', cta: 'Start Review' }, { id: 'AML-017', name: 'Transaction Monitoring Threshold', status: 'Failing', reason: 'Threshold settings do not match new CBN guidelines.', cta: 'Update Control' }, { id: 'NDPA-003', name: 'Data Encryption Policy', status: 'At Risk', reason: 'Annual policy review due in 15 days.', cta: 'View Policy' }, { id: 'PCIDSS-11.2', name: 'Internal Vulnerability Scans', status: 'At Risk', reason: 'Last scan results showed 3 medium-risk vulnerabilities.', cta: 'View Scan Results' }, { id: 'GEN-001', name: 'Incident Response Plan', status: 'Compliant', reason: 'Last tested successfully on 2025-05-20.', cta: 'View Plan' }, ];
export const reportingEvents = [ { date: '2025-06-10', title: 'Nigerian PSP License Renewal Due', type: 'Filing', urgency: 'high' }, { date: '2025-06-25', title: 'Quarterly AML Summary (Q2) due', type: 'Report', urgency: 'high' }, { date: '2025-07-15', title: 'NDPA Compliance Check Required', type: 'Audit', urgency: 'medium' }, { date: '2025-07-20', title: 'SAR Filing Deadline', type: 'Filing', urgency: 'high' }, { date: '2025-06-05', title: 'Internal Review Meeting', type: 'Meeting', urgency: 'low' }, ];

export const initialLibraryStructure = [
    {
        heading: 'Compliance Knowledge Assets',
        categories: [
            { name: 'Regulatory Rulebooks', icon: 'BookOpenCheck', count: 14, content: [{name: 'CBN Consumer Protection Framework', status: 'Analyzed'}, {name: 'NDPA 2023', status: 'New'}] },
            { name: 'Templates', icon: 'FileText', count: 8, content: [{name: 'VASP White Paper Template', status: 'Published'}, {name: 'Quarterly SAR Template', status: 'Draft'}] },
        ]
    },
    {
        heading: 'Compliance Documentation Assets',
        categories: [
            { name: 'Company Compliance Records', icon: 'Folder', count: 12, content: [{name: 'Internal Data Privacy Policy', status: 'Active'}] },
            { name: 'Evidence Files', icon: 'Archive', count: 32, content: [{name: 'Q2 AML Report Submission Receipt', status: 'Archived'}] },
            { name: 'Generated Reports', icon: 'FileClock', count: 4, content: [{name: 'AML Summary - 2025-06-01 to 2025-06-25', status: 'Draft'}] },
            { name: 'Official Filings', icon: 'FileSignature', count: 2, content: [{name: 'Q1 2025 AML Filing', status: 'Submitted'}] },
        ]
    }
];

export const kpiAndKriData = [
    { id: 'KPI-01', name: 'On-Time Reporting Rate', type: 'KPI', category: 'Compliance', status: 'Active', value: '98%' },
    { id: 'KRI-01', name: 'High-Risk Transaction Volume', type: 'KRI', category: 'Risk', status: 'Active', value: '2.3%' },
    { id: 'KPI-02', name: 'KYC Automatic Approval Rate', type: 'KPI', category: 'Operations', status: 'Active', value: '85%' },
    { id: 'KRI-02', name: 'New Account Fraud Rate', type: 'KRI', category: 'Risk', status: 'Inactive', value: '0.15%' },
];

// --- ADDED THIS SECTION TO FIX THE ERROR ---
export const heatmapData = [
    { product: 'Payments (PSP)', Compliance: 78, Operational: 45, Market: 30, Credit: 25 },
    { product: 'Digital Assets (DASP)', Compliance: 85, Operational: 70, Market: 90, Credit: 40 },
    { product: 'E-Money', Compliance: 60, Operational: 55, Market: 35, Credit: 30 },
    { product: 'Lending', Compliance: 70, Operational: 65, Market: 50, Credit: 88 },
];
