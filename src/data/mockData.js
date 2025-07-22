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

export const kycChartData = [ // Renamed from kycData to avoid conflict
    { name: 'Verified', value: 400, fill: 'url(#greenGradient)' },
    { name: 'Pending', value: 150, fill: 'url(#goldGradient)' },
    { name: 'Rejected', value: 50, fill: 'url(#redGradient)' },
];

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
    {
        id: 'rep1',
        name: 'SAR-2023-04-12 (NG)',
        status: 'Filed',
        type: 'SAR',
        regulator: 'CBN',
        jurisdiction: 'Nigeria',
        linkedDataDescription: 'Transactions with high-risk scores from Stripe and Internal DB (Q2 2023)',
        linkedDataFilters: { type: 'Payment', source: 'Stripe', status: 'Flagged', period: 'Year' }
    },
    {
        id: 'rep2',
        name: 'CTR-2023-04-11 (NG)',
        status: 'Filed',
        type: 'CTR',
        regulator: 'NDIC',
        jurisdiction: 'Nigeria',
        linkedDataDescription: 'High-value cash transactions from Mastercard (Q2 2023)',
        linkedDataFilters: { type: 'Payment', source: 'Mastercard', value: '>10000', period: 'Month' }
    },
    {
        id: 'rep3',
        name: 'ACR-2022-Q4 (KE)',
        status: 'Draft',
        type: 'Annual Review',
        regulator: 'CMA',
        jurisdiction: 'Kenya',
        linkedDataDescription: 'All KYC and User data (Q4 2022)',
        linkedDataFilters: { type: 'All', period: 'Year' }
    },
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

export const mockDataSources = [
    {
        id: 'src-stripe-api',
        name: 'Stripe Payments API',
        type: 'API',
        status: 'Connected',
        dataQuality: 99.2,
        recordsSynced: 18450,
        lastSync: '15m ago',
        chartData: [{ value: 50 }, { value: 55 }, { value: 60 }, { value: 58 }, { value: 62 }, { value: 65 }],
        syncHistory: [{ recordCount: 18450, headers: ['Transaction ID', 'Amount', 'Status'], previewRows: [['txn_abc', '$150.00', 'Completed'], ['txn_def', '$2300.50', 'Completed']] }],
        logHistory: [{ timestamp: 'Jul 15, 10:30 AM', event: 'Sync Started', triggeredBy: 'System', details: 'Automated hourly sync initiated.' }, { timestamp: 'Jul 15, 10:35 AM', event: 'Sync Completed', triggeredBy: 'System', details: '18450 records ingested.' }],
        jurisdiction: 'Global'
    },
    {
        id: 'src-chainalysis-kyt',
        name: 'Chainalysis KYT',
        type: 'API',
        status: 'Connected',
        dataQuality: 99.8,
        recordsSynced: 2300,
        lastSync: '2h ago',
        chartData: [{ value: 30 }, { value: 32 }, { value: 28 }, { value: 35 }, { value: 33 }, { value: 38 }],
        syncHistory: [{ recordCount: 2300, headers: ['Wallet Address', 'Risk Score', 'Status'], previewRows: [['0xabc...', 'High', 'Flagged'], ['0xdef...', 'Low', 'Clean']] }],
        logHistory: [{ timestamp: 'Jul 15, 8:00 AM', event: 'Sync Started', triggeredBy: 'System', details: 'Automated daily sync initiated.' }, { timestamp: 'Jul 15, 8:10 AM', event: 'Sync Completed', triggeredBy: 'System', details: '2300 records ingested.' }],
        jurisdiction: 'Global'
    },
    {
        id: 'src-internal-user-db',
        name: 'Internal User Database',
        type: 'SFTP',
        status: 'Pending',
        dataQuality: 97.5,
        recordsSynced: 5210,
        lastSync: '1w ago',
        chartData: [{ value: 40 }, { value: 42 }, { value: 39 }, { value: 45 }, { value: 43 }, { value: 48 }],
        syncHistory: [{ recordCount: 5210, headers: ['User ID', 'Email', 'Last Login'], previewRows: [['USR-001', 'user1@example.com', '2024-07-10'], ['USR-002', 'user2@example.com', '2024-07-09']] }],
        logHistory: [{ timestamp: 'Jul 8, 9:00 AM', event: 'Manual Sync', triggeredBy: 'Admin', details: 'Manual sync initiated by Jane Doe.' }, { timestamp: 'Jul 8, 9:30 AM', event: 'Sync Completed', triggeredBy: 'System', details: '5210 records ingested.' }],
        jurisdiction: 'Nigeria'
    },
    {
        id: 'src-on-chain-polygon',
        name: 'On-chain Polygon Transactions',
        type: 'On-chain',
        status: 'Error',
        dataQuality: 92.1,
        recordsSynced: 580,
        lastSync: '3d ago',
        chartData: [{ value: 90 }, { value: 85 }, { value: 80 }, { value: 70 }, { value: 30 }, { value: 20 } ],
        syncHistory: [{ recordCount: 580, headers: ['Tx Hash', 'From', 'To', 'Value'], previewRows: [['0xabc...', '0x123...', '0x456...', '1.5 ETH']] }],
        logHistory: [{ timestamp: 'Jul 12, 11:00 AM', event: 'Sync Failed', triggeredBy: 'System', details: 'API connection error: Timeout.' }],
        jurisdiction: 'Kenya'
    },
];

export const mockEtlProcesses = [
    {
        id: 'etl-main-payments',
        name: 'Main Payments ETL',
        description: 'Processes Stripe, Visa, and Mastercard payment data for Compliance Data Lake.',
        status: 'Running',
        lastRun: '2025-07-22T09:45:00Z',
        transformationMethod: 'Internal System (Rule-based)',
        averageRunDurationMs: 120000,
        runHistory: [
            { timestamp: '2025-07-22T09:45:00Z', status: 'Completed', recordsProcessed: 18500, durationMs: 118000, errors: 0, log: 'Successfully processed 18500 payment records.' },
            { timestamp: '2025-07-22T08:45:00Z', status: 'Completed', recordsProcessed: 17900, durationMs: 125000, errors: 0, log: 'Successfully processed 17900 payment records.' },
            { timestamp: '2025-07-22T07:45:00Z', status: 'Failed', recordsProcessed: 500, durationMs: 30000, errors: 12, log: 'Error: Database connection failed during load phase.' },
            { timestamp: '2025-07-21T09:45:00Z', status: 'Completed', recordsProcessed: 18000, durationMs: 121000, errors: 0, log: 'Daily payment ETL complete.' },
        ],
    },
    {
        id: 'etl-kyc-user-sync',
        name: 'KYC & User Sync ETL',
        description: 'Synchronizes KYC and internal user data for unified customer profiles.',
        status: 'Scheduled',
        lastRun: '2025-07-21T23:00:00Z',
        transformationMethod: 'AI-driven (Data Matching)',
        averageRunDurationMs: 300000,
        runHistory: [
            { timestamp: '2025-07-21T23:00:00Z', status: 'Completed', recordsProcessed: 5200, durationMs: 290000, errors: 1, log: 'One record flagged for manual review due to ambiguous match.' },
            { timestamp: '2025-07-20T23:00:00Z', status: 'Completed', recordsProcessed: 5180, durationMs: 310000, errors: 0, log: 'Daily KYC sync complete.' },
        ],
    },
    {
        id: 'etl-regulatory-reporting',
        name: 'Regulatory Reporting Prep ETL',
        description: 'Aggregates and formats data for SAR and CTR submissions.',
        status: 'Completed',
        lastRun: '2025-07-15T14:00:00Z',
        transformationMethod: 'Hybrid (Custom Scripts & AI)',
        averageRunDurationMs: 600000,
        runHistory: [
            { timestamp: '2025-07-15T14:00:00Z', status: 'Completed', recordsProcessed: 1500, durationMs: 580000, errors: 0, log: 'Q2 SAR data extraction and formatting complete.' },
        ],
    },
];

// Define the validation rule structure for indicators
export const userAccessValidationRule = {
    description: "Comprehensive user access review: Checks for invalid emails, inappropriate access levels, inactive user access, outdated activity, missing departments, and duplicate employee IDs.",
    rules: [
        {
            field: 'employee_email',
            check: (value) => value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            errorMessage: (value) => `Invalid or missing email format for '${value}'. This affects user identification and notification compliance.`,
        },
        {
            field: 'access_level',
            check: (value, rowObject) => !(value === 'Admin' && rowObject.employee_email?.includes('guest')),
            errorMessage: (rowObject) => `Unauthorized 'Admin' access for 'guest' user (${rowObject.employee_email}). This is a critical security and compliance violation.`,
        },
        {
            field: 'status',
            check: (value, rowObject) => !(value === 'Inactive' && (rowObject.access_level === 'Admin' || rowObject.access_level === 'User' || rowObject.access_level === 'Viewer')),
            errorMessage: (rowObject) => `Inactive user (${rowObject.employee_email}) still has active access (${rowObject.access_level}). This poses a significant security risk and violates access control policies.`,
        },
        {
            field: 'last_login_date',
            check: (value) => {
                const regex = /^\d{4}-\d{2}-\d{2}$/;
                if (!regex.test(value)) return false;
                const date = new Date(value);
                return !isNaN(date.getTime());
            },
            errorMessage: (value) => `Invalid date format for 'last_login_date' (${value}). Accurate timestamps are crucial for audit trails and activity monitoring.`,
        },
        {
            field: 'department',
            check: (value) => value && value.trim() !== '',
            errorMessage: "Missing department information. This impacts organizational structure and role-based access compliance.",
        },
        {
            field: 'last_activity_days',
            check: (value, rowObject) => {
                const days = parseInt(value, 10);
                if (rowObject.department === 'IT' && days > 90) return false;
                return true;
            },
            errorMessage: (rowObject) => `IT department user (${rowObject.employee_email}) has not been active for over 90 days (${rowObject.last_activity_days} days). This indicates potential stale access and requires review for security compliance.`,
        },
    ],
};

// New Validation Rule for Transaction Monitoring
export const transactionMonitoringValidationRule = {
    description: "Monitors financial transactions for compliance with anti-money laundering (AML) and anti-fraud regulations, flagging high-value transactions or those involving high-risk jurisdictions.",
    rules: [
        {
            field: 'amount',
            check: (value) => parseFloat(value) <= 10000, // Flag if amount > 10,000
            errorMessage: (value) => `High-value transaction detected (Amount: ${value}). This exceeds the predefined threshold and requires further review for AML compliance.`,
        },
        {
            field: 'country',
            check: (value) => {
                const flaggedCountries = ['IRN', 'PRK', 'SYR', 'CUB', 'VEN']; // Example list of flagged countries (ISO 3166-1 alpha-3)
                return !flaggedCountries.includes(value.toUpperCase());
            },
            errorMessage: (value) => `Transaction involves a flagged country (${value}). Transactions with these jurisdictions require enhanced due diligence.`,
        },
        // Add more rules as needed, e.g., for transaction patterns, frequency, etc.
    ],
};

// Mock data for a User Access Review file with more diverse issues
export const mockUserAccessData = {
  headers: ['employee_id', 'employee_email', 'system_name', 'access_level', 'last_login_date', 'status', 'department', 'last_activity_days'],
  rows: [
    ['EMP001', 'john.doe@example.com', 'Core Banking System', 'User', '2024-07-15', 'Active', 'Finance', 5],
    ['EMP002', 'jane.smith@example.com', 'CRM', 'User', '2024-07-16', 'Active', 'Sales', 3],
    ['EMP003', 'admin.user@example.com', 'Core Banking System', 'Admin', '2024-07-16', 'Active', 'IT', 10],
    ['EMP004', 'guest.user@example.com', 'HRIS', 'Admin', '2024-07-17', 'Active', 'HR', 1],
    ['EMP005', 'inactive.user@example.com', 'Salesforce', 'User', '2024-07-18', 'Inactive', 'Marketing', 200],
    ['EMP006', 'missing.email', 'Payroll System', 'User', '2024-07-19', 'Active', 'Finance', 15],
    ['EMP007', 'auditor.guest@example.com', 'Finance Portal', 'Admin', '2024-07-20', 'Active', 'Audit', 7],
    ['EMP008', 'sarah.connor@example.com', 'Data Warehouse', 'Viewer', 'invalid-date', 'Active', 'Analytics', 30],
    ['EMP009', 'linda.hamilton@example.com', 'CRM', 'User', '2024-07-21', 'Active', 'IT', 2],
    ['EMP010', 'kyle.reese@example.com', 'Core Banking System', 'User', '2024-07-22', 'Active', 'Sales', 1],
    ['EMP001', 'duplicate.john@example.com', 'HRIS', 'User', '2024-07-15', 'Active', 'Finance', 5],
    ['EMP011', 'empty@example.com', 'Compliance Tool', 'User', '2024-07-23', 'Active', '', 10],
    ['EMP012', 'test@example.com', 'Risk System', 'User', '2024-07-24', 'Active', 'IT', 100],
  ],
};

// New mock data for transaction logs
export const mockTransactionData = {
  headers: ['transaction_id', 'amount', 'currency', 'country', 'timestamp'],
  rows: [
    ['TXN001', 1200, 'USD', 'USA', '2025-07-19'],
    ['TXN002', 15000, 'USD', 'IRN', '2025-07-19'],
    ['TXN003', 500, 'EUR', 'DEU', '2025-07-20'],
    ['TXN004', 20000, 'NGN', 'NGA', '2025-07-20'],
    ['TXN005', 800, 'USD', 'USA', '2025-07-21'],
    ['TXN006', 7500, 'USD', 'USA', '2025-07-21'],
    ['TXN007', 11000, 'GBP', 'PRK', '2025-07-22'],
    ['TXN008', 300, 'CAD', 'CAN', '2025-07-22'],
    ['TXN009', 9000, 'USD', 'USA', '2025-07-22'],
    ['TXN010', 10500, 'JPY', 'JPN', '2025-07-23'],
    ['TXN011', 200, 'CHF', 'SWI', '2025-07-23'],
    ['TXN012', 3000, 'AUD', 'AUS', '2025-07-24'],
  ],
};


export const mockIndicators = [
    {
        id: 'kri-privileged-access',
        type: 'KRI',
        name: 'Privileged Access Review',
        description: 'Ensures non-privileged users do not have administrative access.',
        category: 'IT Governance',
        status: 'Active',
        targetValue: 0,
        targetUnit: 'Violations',
        linkedSourceIds: [],
        history: [{ date: '2024-01-01', value: 0 }, { date: '2024-02-01', value: 0 }, { date: '2024-03-01', value: 1 }, { date: '2024-04-01', value: 0 }, { date: '2024-05-01', value: 2 }, { date: '2024-06-01', value: 1 }],
        validationRule: userAccessValidationRule,
        jurisdiction: 'Global'
    },
    {
        id: 'kpi-kyc-processing-time',
        type: 'KPI',
        name: 'KYC Processing Time',
        description: 'Measures the average time to complete Know Your Customer verifications.',
        category: 'Operational Efficiency',
        status: 'Active',
        targetValue: 24,
        targetUnit: 'Hours',
        linkedSourceIds: ['src-kyc-api'],
        history: [{ date: '2024-01-01', value: 20 }, { date: '2024-02-01', value: 22 }, { date: '2024-03-01', value: 18 }, { date: '2024-04-01', value: 25 }, { date: '2024-05-01', value: 23 }, { date: '2024-06-01', value: 21 }],
        calculation: {
            description: "Calculate the average of the 'processing_time_hours' column.",
            execute: (rowsAsObjects) => {
                if (!rowsAsObjects || rowsAsObjects.length === 0) return 0;
                const total = rowsAsObjects.reduce((sum, row) => sum + parseFloat(row.processing_time_hours || 0), 0);
                return (total / rowsAsObjects.length).toFixed(1);
            }
        },
        jurisdiction: 'Global'
    },
    {
        id: 'kri-user-access',
        type: 'KRI',
        name: 'User Access Compliance',
        description: 'Monitors user access data for compliance with internal policies and regulations.',
        category: 'Access Management',
        status: 'Active',
        targetValue: 0,
        targetUnit: 'Violations',
        linkedSourceIds: [],
        history: [{ date: '2024-01-01', value: 0 }, { date: '2024-02-01', value: 0 }, { date: '2024-03-01', value: 1 }, { date: '2024-04-01', value: 0 }, { date: '2024-05-01', value: 2 }, { date: '2024-06-01', value: 1 }],
        validationRule: userAccessValidationRule,
        jurisdiction: 'Global'
    },
    {
        id: 'kri-transaction-compliance',
        type: 'KRI',
        name: 'Transaction Compliance Monitoring',
        description: 'Identifies transactions that violate predefined thresholds or patterns related to AML and fraud.',
        category: 'Financial Crime',
        status: 'Active',
        targetValue: 0,
        targetUnit: 'Violations',
        linkedSourceIds: ['src-transactions-log'],
        history: [{ date: '2024-01-01', value: 0 }, { date: '2024-02-01', value: 0 }, { date: '2024-03-01', value: 0 }, { date: '2024-04-01', value: 0 }, { date: '2024-05-01', value: 5 }, { date: '2024-06-01', value: 3 }],
        validationRule: transactionMonitoringValidationRule,
        jurisdiction: 'Nigeria'
    },
    {
        id: 'kpi-verification-rate',
        type: 'KPI',
        name: 'KYC Verification Rate',
        description: 'Measures the percentage of successfully completed KYC verifications out of total attempts.',
        category: 'Operational Efficiency',
        status: 'Active',
        targetValue: 95,
        targetUnit: '%',
        linkedSourceIds: [],
        history: [{ date: '2024-01-01', value: 92 }, { date: '2024-02-01', value: 93 }, { date: '2024-03-01', value: 94 }, { date: '2024-04-01', value: 95 }, { date: '2024-05-01', value: 95.5 }, { date: '2024-06-01', value: 95.8 }],
        jurisdiction: 'Global'
    },
    {
        id: 'kri-rejection-rate',
        type: 'KRI',
        name: 'KYC Rejection Rate',
        description: 'Monitors the percentage of KYC applications rejected due to issues like incomplete documentation or fraudulent information.',
        category: 'Financial Crime',
        status: 'Active',
        targetValue: 3,
        targetUnit: '%',
        linkedSourceIds: [],
        history: [{ date: '2024-01-01', value: 4 }, { date: '2024-02-01', value: 3.5 }, { date: '2024-03-01', value: 3.2 }, { date: '2024-04-01', value: 3.1 }, { date: '2024-05-01', value: 2.8 }, { date: '2024-06-01', value: 2.5 }],
        jurisdiction: 'Kenya'
    },
    {
        id: 'kri-total-transaction-value',
        type: 'KRI',
        name: 'Total Transaction Value (24h)',
        description: 'Monitors the aggregate value of all transactions processed within a 24-hour period for unusual spikes.',
        category: 'Operational Risk',
        status: 'Active',
        targetValue: 1000000,
        targetUnit: 'USD',
        linkedSourceIds: [],
        history: [{ date: '2024-01-01', value: 800000 }, { date: '2024-02-01', value: 900000 }, { date: '2024-03-01', value: 950000 }, { date: '2024-04-01', value: 1100000 }, { date: '2024-05-01', value: 1050000 }, { date: '2024-06-01', value: 1500000 }],
        jurisdiction: 'Global'
    },
    {
        id: 'kri-total-transactions',
        type: 'KRI',
        name: 'Total Transactions (24h)',
        description: 'Monitors the total volume of transactions processed within a 24-hour period for anomalies.',
        category: 'Operational Risk',
        status: 'Active',
        targetValue: 15000,
        targetUnit: 'Transactions',
        linkedSourceIds: [],
        history: [{ date: '2024-01-01', value: 12000 }, { date: '2024-02-01', value: 13500 }, { date: '2024-03-01', value: 14000 }, { date: '2024-04-01', value: 16000 }, { date: '2024-05-01', value: 15500 }, { date: '2024-06-01', value: 18765 }],
        jurisdiction: 'Global'
    },
];

// --- Data for Calendar ---
export const reportingEvents = [
    { date: '2025-07-15', title: 'File Q2 SAR Summary (NG)', type: 'Filing', urgency: 'high', jurisdiction: 'Nigeria' },
    { date: '2025-07-15', title: 'Submit VASP License Attestation (KE)', type: 'Filing', urgency: 'high', jurisdiction: 'Kenya' },
    { date: '2025-07-20', title: 'Internal Audit Committee Meeting', type: 'Meeting', jurisdiction: 'Global' },
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

// NEW: Processed data for KYC Dashboard
export const processedKycDashboardData = {
    verificationRate: 95.8,
    avgTurnaroundTime: '3.9 hours',
    rejectionRate: 2.5,
    dailyVerificationsData: [
        { day: 'Mon', count: 160 },
        { day: 'Tue', count: 195 },
        { day: 'Wed', count: 220 },
        { day: 'Thu', count: 200 },
        { day: 'Fri', count: 265 },
        { day: 'Sat', count: 130 },
        { day: 'Sun', count: 100 },
    ],
};

// NEW: Processed data for Transaction Monitoring Dashboard
export const processedTransactionDashboardData = {
    totalValue: '1.5M USD',
    totalTransactions: '18,765',
    alertsGenerated: 85,
    dailyFraudMonitoring: [
        { name: 'Mon', transactions: 4200, flagged: 20 },
        { name: 'Tue', transactions: 3100, flagged: 15 },
        { name: 'Wed', transactions: 2100, flagged: 10 },
        { name: 'Thu', transactions: 2850, flagged: 30 },
        { name: 'Fri', transactions: 1950, flagged: 40 },
        { name: 'Sat', transactions: 2450, flagged: 35 },
        { name: 'Sun', transactions: 3550, flagged: 40 },
    ],
};