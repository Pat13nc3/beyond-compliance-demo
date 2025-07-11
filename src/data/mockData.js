// src/data/mockData.js

// --- Data for New Revamped Dashboard ---

export const currentUser = {
  name: "Kene Gold",
  role: "Chief Compliance Officer",
  companyName: "Innovate Inc.",
  avatarUrl: "https://placehold.co/100x100/E2E8F0/E2E8F0?text=+" 
};

export const companyStructure = {
  parent: { id: 'parent-01', name: "Innovate Inc. (Headquarters)", location: "New York, USA", status: "Active" },
  subsidiaries: [
    { id: 'sub-01', name: "Innovate Kenya Ltd.", location: "Nairobi, Kenya", status: "Active" },
    { id: 'sub-02', name: "Innovate UK Services", location: "London, UK", status: "Active" },
    { id: 'sub-03', name: "Innovate Brazil Tech", location: "São Paulo, Brazil", status: "In Review" },
  ],
};

// --- Data for Dashboard & Core UI ---

export const initialPriorityActions = [
    { id: 'act1', type: 'DEADLINE', urgency: 'URGENT', title: 'CBN Bi-Annual AML Report', details: 'Due in 3 days', cta: 'Prepare Report', jurisdiction: 'Nigeria' },
    { id: 'act2', type: 'ACTION', urgency: 'HIGH', title: 'Incomplete KYC Records', details: '15 records require manual review', cta: 'Review Now', jurisdiction: 'Global' },
    { id: 'act3', type: 'ACTION', urgency: 'MEDIUM', title: 'VASP License Renewal', details: 'Kenya - CMA license expires in 60 days', cta: 'Start Renewal', jurisdiction: 'Kenya' },
    { id: 'act4', type: 'DEADLINE', urgency: 'URGENT', title: 'SAR Filing', details: 'Due in 5 days', cta: 'Prepare Report', jurisdiction: 'Ghana' },
];
export const regulatoryPulseData = [
    { id: 'reg1', type: 'UPDATE', title: 'New CBN Guidelines for PSPs', source: 'CBN', date: '2025-06-20', jurisdiction: 'Nigeria' },
    { id: 'reg2', type: 'ANALYSIS', title: 'Impact of ODPC Framework Update', source: 'Internal Analysis', date: '2025-06-18', jurisdiction: 'Kenya' },
    { id: 'reg3', type: 'GUIDE', title: 'New VASP Regulations', source: 'SARB', date: '2025-06-15', jurisdiction: 'South Africa' },
];

export const kpiData = [
    { title: 'Overall Health', value: 88, color: '#4ade80', icon: 'Target' },
    { title: 'Controls Adherence', value: 75, color: '#facc15', icon: 'Shield' },
    { title: 'On-Time Reporting', value: 98, color: '#4ade80', icon: 'CheckCheck' },
];


// --- Data for Analytics & Charts ---

export const controlHotspotData = [
    { id: 'CTRL-01', name: 'KYC Verification', status: 'At Risk', reason: 'High number of incomplete records.', cta: 'Review Records' },
    { id: 'CTRL-02', name: 'Transaction Monitoring Rules', status: 'Failing', reason: 'Alert backlog increased by 15%.', cta: 'Adjust Rules' },
    { id: 'CTRL-03', name: 'Sanctions Screening', status: 'Compliant', reason: 'Screening lists updated and operating normally.', cta: 'View Details' },
];

export const fraudData = [
    { name: 'Mon', transactions: 4000, flagged: 24 },
    { name: 'Tue', transactions: 3000, flagged: 18 },
    { name: 'Wed', transactions: 2000, flagged: 12 },
    { name: 'Thu', transactions: 2780, flagged: 39 },
    { name: 'Fri', transactions: 1890, flagged: 48 },
    { name: 'Sat', transactions: 2390, flagged: 38 },
    { name: 'Sun', transactions: 3490, flagged: 43 },
];

export const kycData = [
    { name: 'Verified', value: 400, fill: 'url(#greenGradient)' },
    { name: 'Pending', value: 150, fill: 'url(#goldGradient)' },
    { name: 'Rejected', value: 50, fill: 'url(#redGradient)' },
];

// Used for both the Heatmap and the Risk Bar Chart
export const heatmapData = [
    { product: 'Payments', Compliance: 40, Operational: 20, Market: 15, Credit: 80 },
    { product: 'Lending', Compliance: 30, Operational: 50, Market: 60, Credit: 90 },
    { product: 'Digital Assets', Compliance: 95, Operational: 60, Market: 85, Credit: 40 },
    { product: 'Remittances', Compliance: 50, Operational: 30, Market: 20, Credit: 25 },
];

export const reportStatusData = [
    { name: 'Submitted', value: 12, fill: '#22c55e' },
    { name: 'In Review', value: 5, fill: '#3b82f6' },
    { name: 'Draft', value: 8, fill: '#f59e0b' },
    { name: 'Overdue', value: 2, fill: '#ef4444' },
];

export const monthlySubmissionsData = [
    { month: 'Jan', count: 15, flaggedForReview: 2 },
    { month: 'Feb', count: 18, flaggedForReview: 3 },
    { month: 'Mar', count: 22, flaggedForReview: 5 },
    { month: 'Apr', count: 19, flaggedForReview: 4 },
    { month: 'May', count: 25, flaggedForReview: 6 },
    { month: 'Jun', count: 21, flaggedForReview: 3 },
];

export const gapAssessmentData = [
    { name: 'AML Policy', adherence: 98 },
    { name: 'Data Privacy', adherence: 85 },
    { name: 'Sanctions Screening', adherence: 92 },
    { name: 'KYC/CDD', adherence: 78 },
    { name: 'Regulatory Reporting', adherence: 95 },
];


// --- Data for Compliance Reporting Page ---

export const mockTemplates = [
    { id: 'tpl1', name: 'Suspicious Activity Report (SAR)', type: 'SAR', category: 'Templates', description: 'Standard template for SARs.', content: 'SAR Content...' },
    { id: 'tpl2', name: 'Currency Transaction Report (CTR)', type: 'CTR', category: 'Templates', description: 'For cash transactions over $10,000.', content: 'CTR Content...' },
    { id: 'tpl3', name: 'Annual Compliance Review', type: 'Annual Review', category: 'Templates', description: 'Template for the annual internal audit.', content: 'Annual Review Content...' }
];

export const mockReports = [
    { id: 'rep1', name: 'SAR-2023-04-12 (NG)', status: 'Filed', type: 'SAR', regulator: 'CBN', jurisdiction: 'Nigeria' },
    { id: 'rep2', name: 'CTR-2023-04-11 (NG)', status: 'Filed', type: 'CTR', regulator: 'NDIC', jurisdiction: 'Nigeria' },
    { id: 'rep3', name: 'ACR-2022-Q4 (KE)', status: 'Draft', type: 'Annual Review', regulator: 'CMA', jurisdiction: 'Kenya' },
];


// --- Data for Library & Data Management ---

export const initialLibraryStructure = [
    {
        heading: 'Core Documents',
        categories: [
            { name: 'Regulatory Rulebooks', icon: 'BookOpenCheck', count: 5, content: [{ name: 'CBN PSP Framework 2024', status: 'Analyzed' }] },
            { name: 'Internal Policies', icon: 'FileSignature', count: 12, content: [{ name: 'AML/CFT Policy v3.1', status: 'Live' }] },
        ]
    },
    {
        heading: 'Evidence & Reports',
        categories: [
            { name: 'Evidence Files', icon: 'Archive', count: 34, content: [{ name: 'Q1 Board Meeting Minutes', status: 'New' }] },
            { name: 'Submitted Reports', icon: 'FileClock', count: 8, content: [{ name: '2023 Annual SAR Filing', status: 'Submitted' }] },
            { name: 'Templates', icon: 'FileText', count: 3, content: mockTemplates },
        ]
    }
];
export const initialDataSources = [
    { id: 'ds01', name: 'Stripe Payments API', type: 'API', status: 'Connected' },
    { id: 'ds02', name: 'Chainalysis KYT', type: 'API', status: 'Connected' },
    { id: 'ds03', name: 'Internal User Database', type: 'SFTP', status: 'Pending' },
    { id: 'ds04', name: 'On-chain Polygon Transactions', type: 'API', status: 'Error' },
];
export const kpiAndKriData = [
    { id: 'METRIC-01', name: 'Transaction Monitoring Alert Rate', type: 'KRI', category: 'Financial Crime', status: 'Active' },
    { id: 'METRIC-02', name: 'KYC Verification Success Rate', type: 'KPI', category: 'Onboarding', status: 'Active' },
    { id: 'METRIC-03', name: 'Overdue Compliance Tasks', type: 'KRI', category: 'Operational', status: 'Inactive' },
];


// --- Data for Calendar ---

export const reportingEvents = [
    { date: '2025-07-15', title: 'File Q2 SAR Summary (NG)', type: 'Filing', urgency: 'high', jurisdiction: 'Nigeria' },
    { date: '2025-07-15', title: 'Submit VASP License Attestation (KE)', type: 'Filing', urgency: 'high', jurisdiction: 'Kenya' },
    { date: '2025-07-20', title: 'Internal Audit Committee Meeting', type: 'Meeting', jurisdiction: 'Global' },
    { date: '2025-07-22', title: 'File K-CMA Monthly Report', type: 'Filing', urgency: 'high', jurisdiction: 'Kenya' },
    { date: '2025-07-28', title: 'Review Draft of new AML Policy', type: 'Report', jurisdiction: 'Global' },
];
export const mockIntegrations = [
  { id: 'int-01', name: 'Slack Notifications', type: 'Messaging', status: 'Active' },
  { id: 'int-02', name: 'Jira Task Creation', type: 'Project Management', status: 'Active' },
  { id: 'int-03', name: 'Chainalysis API', type: 'Data Provider', status: 'Inactive' },
];
// --- Data for Settings Page ---

export const mockUsers = [
    { id: 'usr-01', name: 'Kene Gold', email: 'kene@example.com', title: 'Company Founder', role: 'Admin', status: 'Active' },
    { id: 'usr-02', name: 'Adesanmi Adeosun', email: 'adesanmi@example.com', title: 'Compliance Officer', role: 'Editor', status: 'Active' },
    { id: 'usr-03', name: 'Patience O.', email: 'patience@example.com', title: 'Risk Analyst', role: 'Editor', status: 'Active' },
    { id: 'usr-04', name: 'John Doe', email: 'john.d@example.com', title: 'External Counsel', role: 'Viewer', status: 'Inactive' },
];

export const mockRoles = [
    { name: 'Admin', description: 'Full access to all modules and settings.', permissions: 32 },
    { name: 'Editor', description: 'Can create and edit drafts, but cannot submit.', permissions: 15 },
    { name: 'Viewer', description: 'Read-only access to dashboards and reports.', permissions: 8 },
];

export const mockAlerts = [
    { id: 'alert-1', name: 'High-Risk Transaction', condition: 'When transaction value > $10,000', notify: ['Admin', 'Compliance Officer'], active: true },
    { id: 'alert-2', name: 'License Renewal Reminder', condition: '30 days before expiry', notify: ['Admin'], active: true },
    { id: 'alert-3', name: 'Failed Data Source Sync', condition: 'When any data source fails to connect', notify: ['Admin'], active: false },
];
