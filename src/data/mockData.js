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

// UPDATED: regulatoryPulseData with fullText property
export const regulatoryPulseData = [
    {
        id: 'reg1',
        type: 'UPDATE',
        title: 'New CBN Guidelines for PSPs',
        source: 'CBN',
        date: '2025-06-20',
        publishedDate: '2025-06-20', // Ensure consistent date property
        jurisdiction: 'Nigeria',
        summary: 'Key updates to operational guidelines and reporting standards for Payment Service Providers in Nigeria.',
        fullText: `The Central Bank of Nigeria (CBN) has today released updated guidelines aimed at enhancing the regulatory framework for Payment Service Providers (PSPs) operating within the country. These new guidelines, effective immediately, introduce stringent requirements concerning data localization, enhanced fraud detection mechanisms, and revised capital adequacy ratios.

Key changes include:
1.  **Data Localization**: All PSPs must ensure that customer data is stored and processed exclusively within Nigerian borders. Compliance audits will be intensified to ensure adherence.
2.  **Fraud Detection and Prevention**: PSPs are now mandated to implement real-time fraud monitoring systems capable of identifying and reporting suspicious transactions exceeding NGN 5,000,000 within 24 hours. Collaboration with the Nigerian Financial Intelligence Unit (NFIU) is paramount.
3.  **Capital Adequacy**: Minimum capital requirements for various PSP licenses (e.g., PSSP, PTSP) have been reviewed and increased by 15% to bolster financial stability and resilience against economic shocks.
4.  **Cybersecurity Framework**: New protocols for cybersecurity risk assessment, incident reporting, and mandatory annual penetration testing have been introduced to safeguard digital payment ecosystems.
5.  **Consumer Protection**: Enhanced provisions for consumer dispute resolution, transparency in fees, and clear complaint mechanisms are now enforceable. PSPs must provide clear communication channels and resolution timelines.

PSPs are advised to review the full document available on the CBN official website and ensure compliance within 90 days to avoid penalties.`
    },
    {
        id: 'reg2',
        type: 'ANALYSIS',
        title: 'Impact of ODPC Framework Update',
        source: 'Internal Analysis',
        date: '2025-06-18',
        publishedDate: '2025-06-18', // Ensure consistent date property
        jurisdiction: 'Kenya',
        summary: 'An internal analysis report on the implications of the latest Office of the Data Protection Commissioner (ODPC) framework update on data handling practices.',
        fullText: `Our internal compliance team has completed a comprehensive analysis of the recent amendments to the ODPC framework in Kenya, particularly focusing on its impact on our data handling and privacy protocols.

Key findings and implications include:
1.  **Expanded Definition of Personal Data**: The update broadens the scope of what constitutes 'personal data', requiring a re-evaluation of data classification across our systems.
2.  **Enhanced Consent Requirements**: Stricter consent mechanisms are now required for data processing, especially for sensitive personal data. Our current consent flows will need revision to ensure explicit, informed, and unambiguous consent.
3.  **Data Retention Policies**: New guidelines on data retention periods for various data types have been introduced. This necessitates an update to our existing data lifecycle management policies to align with the stipulated maximum retention periods.
4.  **Cross-Border Data Transfer**: Stricter conditions apply to cross-border data transfers, requiring robust safeguards and adherence to specific legal instruments for transfers outside Kenya.
5.  **Increased Penalties**: The framework introduces significantly higher penalties for non-compliance, emphasizing the critical need for proactive adherence.

Recommended actions from this analysis include:
* Update internal data privacy policy (Section 3 & 4).
* Conduct a data mapping exercise to identify all personal data touchpoints.
* Implement mandatory staff training on new consent requirements.`
    },
    {
        id: 'reg3',
        type: 'GUIDE',
        title: 'New VASP Regulations',
        source: 'SARB',
        date: '2025-06-15',
        publishedDate: '2025-06-15', // Ensure consistent date property
        jurisdiction: 'South Africa',
        summary: 'South African Reserve Bank (SARB) issues new regulations for Virtual Asset Service Providers (VASPs).',
        fullText: `The South African Reserve Bank (SARB) has published its final regulatory framework for Virtual Asset Service Providers (VASPs). These regulations aim to bring digital asset activities under closer supervision to mitigate risks associated with money laundering, terrorist financing, and consumer protection.

Key provisions of the new VASP regulations include:
1.  **Mandatory Registration/Licensing**: All entities providing VASP services (e.g., crypto exchanges, digital asset custodians, and issuers of stablecoins) must register with the Financial Sector Conduct Authority (FSCA) by [Date - e.g., 2025-12-31].
2.  **AML/CFT Compliance**: VASPs are now explicitly designated as accountable institutions under the Financial Intelligence Centre Act (FICA). This means they must implement robust Anti-Money Laundering and Counter-Financing of Terrorism (AML/CFT) measures, including customer due diligence (CDD), suspicious transaction reporting (STR), and record-keeping.
3.  **Risk-Based Approach**: VASPs are required to adopt a risk-based approach to AML/CFT, assessing and mitigating risks specific to their operations and customer base.
4.  **Operational Resilience**: Guidelines on operational resilience, including cybersecurity standards, business continuity planning, and outsourcing arrangements, are also covered.
5.  **Consumer Protection**: Requirements related to transparency, disclosure, and dispute resolution mechanisms for consumers engaging with VASPs.

VASPs currently operating in South Africa are advised to immediately review these regulations and initiate the registration process to ensure continuous legal operation.`
    },
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

export const kycChartData = [
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
    {
        id: 'tpl1',
        name: 'Suspicious Activity Report (SAR)',
        type: 'SAR',
        category: 'Templates',
        description: 'Standard template for Suspicious Activity Reports (SARs) as per regulatory guidelines.',
        content: `SAR Draft - Automatically Generated

    REPORT ID: SAR-[ReportID]
    DATE: [CurrentDate]

    1. SUSPECT INFORMATION:
       Name: [AI-Identified Suspect Name]
       Account Number: [AI-Identified Account]
       Nationality: [AI-Identified Nationality]

    2. TRANSACTION DETAILS:
       Date/Time: [AI-Identified Transaction Timestamp]
       Amount: [AI-Identified Transaction Amount]
       Currency: [AI-Identified Transaction Currency]
       Type: [AI-Identified Transaction Type] (e.g., Wire Transfer, Deposit)
       Description: [AI-Summarized Transaction Purpose]
       Reason for Suspicion: [AI-Assessed Reason for Suspicion]

    3. NARRATIVE:
       Based on automated monitoring, a series of transactions involving [AI-Identified Suspect Name] exhibited characteristics consistent with money laundering indicators. Specifically, [AI-Generated Narrative]. Further manual investigation is recommended.

    4. SUPPORTING DOCUMENTATION:
       [Placeholder for automatically linked transaction records, KYC documents]

    --- END OF DRAFT ---`
    },
    {
        id: 'tpl2',
        name: 'Currency Transaction Report (CTR)',
        type: 'CTR',
        category: 'Templates',
        description: 'For cash transactions exceeding the regulatory threshold ($10,000 equivalent).',
        content: `CTR Draft - Automatically Generated

    REPORT ID: CTR-[ReportID]
    DATE: [CurrentDate]

    1. REPORTING INSTITUTION INFORMATION:
       Name: Innovate Inc.
       Regulator: CBN (Simulated)
       Reporting Year: [CurrentYear]

    2. TRANSACTION DETAILS:
       Transaction Date: [AI-Identified Transaction Date]
       Transaction Amount: [AI-Identified Transaction Amount]
       Currency: [AI-Identified Transaction Currency]
       Type: [AI-Identified Transaction Type]
       Branch/Location: [AI-Identified Branch/Location]

    3. INDIVIDUAL/ENTITY CONDUCTING TRANSACTION:
       Name: [AI-Identified Customer Name]
       Account: [AI-Identified Customer Account]
       Identification: [AI-Identified ID Type & Number]
       Purpose: [AI-Summarized Purpose of Transaction]

    4. FUNDS INFORMATION:
       Source of Funds: [AI-Identified Source of Funds] (e.g., Business Income, Salary, Loan)
       Destination of Funds: [AI-Identified Destination of Funds]

    --- END OF DRAFT ---`
    },
    {
        id: 'tpl3',
        name: 'Annual Compliance Review',
        type: 'Annual Review',
        category: 'Templates',
        description: 'Template for the annual internal compliance audit and self-assessment.',
        content: `Annual Compliance Review Draft - AI Assisted

    REPORT ID: ACR-[CurrentYear]-Draft
    REPORTING PERIOD: January 1, [CurrentYear] - December 31, [CurrentYear]

    1. REGISTRATION WITH THE CENTRE (Regulation 5):
       - Status: [AI-Assessed Status]
       - Comments: [AI-Assessed Registration Comments]

    2. RISK ASSESSMENT (Regulation 7):
       - Status: [AI-Assessed Status]
       - Comments: [AI-Assessed Risk Assessment Comments]

    3. INTERNAL CONTROL OBLIGATIONS (Regulation 11):
       - Status: [AI-Assessed Status]
       - Comments: [AI-Assessed Internal Control Comments]

    4. CUSTOMER DUE DILIGENCE (Regulation 14):
       - Status: [AI-Assessed Status]
       - Comments: [AI-Assessed CDD Comments]

    5. REPORTING OF SUSPICIOUS ACTIVITIES (Regulation 38):
       - Status: [AI-Assessed Status]
       - Comments: [AI-Assessed Suspicious Activity Comments]

    6. RECORD KEEPING (Regulation 42):
       - Status: [AI-Assessed Status]
       - Comments: [AI-Assessed Record Keeping Comments]
       
    --- END OF DRAFT ---`
    }
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
        syncHistory: [{ recordCount: 18450, headers: ['Transaction ID', 'Amount', 'Status'], previewRows: [['txn_abc', '$150.00', 'Completed', new Date().toLocaleString()], ['txn_def', '$2300.50', 'Completed', new Date().toLocaleString()]] }],
        logHistory: [{ timestamp: 'Jul 15, 10:30 AM', event: 'Sync Started', triggeredBy: 'System', details: 'Automated hourly sync initiated.' }, { timestamp: 'Jul 15, 10:35 AM', event: 'Sync Completed', triggeredBy: 'System', details: '18450 records ingested.' }],
        jurisdiction: 'Global'
    },
    {
        id: 'src-chainalysis-kyt',
        name: 'Chainalysis KYT',
        type: 'Blockchain Analytics',
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
  headers: ['transaction_id', 'amount', 'currency', 'timestamp', 'transactionType', 'senderAccount', 'receiverAccount', 'senderCountry', 'receiverCountry', 'fraudScore', 'amlFlag'],
  rows: [
    ['TXN001', 1200, 'USD', '2025-07-19', 'Payment', 'ACC001', 'ACC002', 'USA', 'CAN', 15.2, false],
    ['TXN002', 15000, 'USD', '2025-07-19', 'Transfer', 'ACC003', 'ACC004', 'IRN', 'GBR', 95.1, true],
    ['TXN003', 500, 'EUR', '2025-07-20', 'Withdrawal', 'ACC005', 'N/A', 'DEU', 'DEU', 5.0, false],
    ['TXN004', 20000, 'NGN', '2025-07-20', 'Deposit', 'N/A', 'ACC006', 'NGA', 'NGA', 22.8, false],
    ['TXN005', 800, 'USD', '2025-07-21', 'Payment', 'ACC007', 'ACC008', 'USA', 'MEX', 10.1, false],
    ['TXN006', 7500, 'USD', '2025-07-21', 'Transfer', 'ACC009', 'ACC010', 'USA', 'USA', 30.7, false],
    ['TXN007', 11000, 'GBP', '2025-07-22', 'Payment', 'ACC011', 'ACC012', 'PRK', 'JPN', 88.3, true],
    ['TXN008', 300, 'CAD', '2025-07-22', 'Deposit', 'N/A', 'ACC013', 'CAN', 'CAN', 2.1, false],
    ['TXN009', 9000, 'USD', '2025-07-22', 'Withdrawal', 'ACC014', 'N/A', 'USA', 'USA', 18.9, false],
    ['TXN010', 10500, 'JPY', '2025-07-23', 'Transfer', 'ACC015', 'ACC016', 'JPN', 'CHN', 70.0, true],
    ['TXN011', 200, 'CHF', '2025-07-23', 'Payment', 'ACC017', 'ACC018', 'SWI', 'FRA', 8.5, false],
    ['TXN012', 3000, 'AUD', '2025-07-24', 'Deposit', 'N/A', 'ACC019', 'AUS', 'NZL', 12.3, false],
  ],
};

// --- New processed data for KYC Dashboard ---
export const processedKycDashboardData = {
    verificationRate: 95.8,
    rejectionRate: 2.5,
    avgTurnaroundTime: "22.5 Hours",
    dailyVerificationsData: [
        { day: 'Mon', count: 120 },
        { day: 'Tue', count: 135 },
        { day: 'Wed', count: 140 },
        { day: 'Thu', count: 160 },
        { day: 'Fri', count: 155 },
        { day: 'Sat', count: 180 },
        { day: 'Sun', count: 170 },
    ],
};

// --- New processed data for Transaction Monitoring Dashboard ---
export const processedTransactionDashboardData = {
    totalTransactions: 18765,
    flaggedTransactions: 45,
    totalValue: "$1.5M",
    transactionsByDay: [
        { day: 'Mon', count: 3500, flagged: 20 },
        { day: 'Tue', count: 3800, flagged: 25 },
        { day: 'Wed', count: 3200, flagged: 18 },
        { day: 'Thu', count: 4100, flagged: 30 },
        { day: 'Fri', count: 3900, flagged: 28 },
        { day: 'Sat', count: 3000, flagged: 15 },
        { day: 'Sun', count: 2800, flagged: 12 },
    ],
    transactionsByRiskLevel: [
        { name: 'Low Risk', value: 80000, fill: '#4ade80' },
        { name: 'Medium Risk', value: 15000, fill: '#facc15' },
        { name: 'High Risk', value: 5000, fill: '#ef4444' },
    ],
};

export const reportingEvents = [
    {
        id: 'evt1',
        date: '2025-07-25',
        title: 'Q2 AML Report Submission Deadline',
        description: 'Final submission deadline for the Anti-Money Laundering report for Q2 2025.',
        type: 'Deadline',
        jurisdiction: 'Nigeria',
        status: 'Upcoming',
        severity: 'High'
    },
    {
        id: 'evt2',
        date: '2025-07-20',
        title: 'Regulatory Change: New Data Privacy Laws',
        description: 'New national data privacy regulations effective starting July 20, 2025. Requires policy updates.',
        type: 'Regulatory Update',
        jurisdiction: 'Kenya',
        status: 'Completed',
        severity: 'Medium'
    },
    {
        id: 'evt3',
        date: '2025-08-10',
        title: 'Internal Audit: KYC Procedures Review',
        description: 'Scheduled internal audit to review KYC (Know Your Customer) procedures and effectiveness.',
        type: 'Audit',
        jurisdiction: 'Global',
        status: 'Scheduled',
        severity: 'Low'
    },
    {
        id: 'evt4',
        date: '2025-07-22',
        title: 'SAR Filing Training Session',
        description: 'Mandatory training session for compliance officers on Suspicious Activity Report (SAR) filing protocols.',
        type: 'Training',
        jurisdiction: 'Global',
        status: 'Completed',
        severity: 'Low'
    },
    {
        id: 'evt5',
        date: '2025-09-01',
        title: 'Annual Compliance Review Meeting',
        description: 'Annual review meeting with senior management to discuss overall compliance posture and strategic initiatives.',
        type: 'Meeting',
        jurisdiction: 'Global',
        status: 'Scheduled',
        severity: 'Medium'
    },
];

// Mock data for files pending analysis, used in Data Management Workbench
export const filesPendingAnalysis = [
    {
        id: 'file-1',
        name: 'customer_data_q1_2025.csv',
        uploadDate: '2025-07-20',
        status: 'Pending Analysis',
        sampleContent: [
            {
                id: 'CUST001',
                name: 'Alice Smith',
                email: 'alice.s@example.com',
                registered: '2024-01-15',
                status: 'Active',
                nationalID: '123456789',
                phoneNumber: '254712345678',
                address: '123 Main St, Nairobi',
                countryOfResidence: 'KEN',
                occupation: 'Software Engineer',
                pepStatus: false,
                sanctionsStatus: false,
                riskScore: 35.5
            },
            {
                id: 'CUST002',
                name: 'Bob Johnson',
                email: 'bob.j@example.com',
                registered: '2024-02-20',
                status: 'Inactive',
                nationalID: '987654321',
                phoneNumber: '254721098765',
                address: '456 Elm St, Mombasa',
                countryOfResidence: 'KEN',
                occupation: 'Accountant',
                pepStatus: false,
                sanctionsStatus: false,
                riskScore: 60.1
            },
            {
                id: 'CUST003',
                name: 'Charlie Brown',
                email: 'charlie.b@example.com',
                registered: '2024-03-01',
                status: 'Active',
                nationalID: '112233445',
                phoneNumber: '2348011223344',
                address: '789 Oak Ave, Lagos',
                countryOfResidence: 'NGA',
                occupation: 'Marketing Manager',
                pepStatus: true, // Example of PEP
                sanctionsStatus: false,
                riskScore: 85.0
            },
            {
                id: 'CUST004',
                name: 'Diana Prince',
                email: 'diana.p@example.com',
                registered: '2024-04-10',
                status: 'Active',
                nationalID: '556677889',
                phoneNumber: '27712345678',
                address: '101 Pine St, Cape Town',
                countryOfResidence: 'ZAF',
                occupation: 'Architect',
                pepStatus: false,
                sanctionsStatus: false,
                riskScore: 40.2
            },
            {
                id: 'CUST005',
                name: 'Eva Green',
                email: 'eva.g@example.com',
                registered: '2024-05-05',
                status: 'Active',
                nationalID: '998877665',
                phoneNumber: '233209876543',
                address: '201 Cedar St, Accra',
                countryOfResidence: 'GHA',
                occupation: 'Artist',
                pepStatus: false,
                sanctionsStatus: true, // Example of Sanctioned
                riskScore: 92.7
            },
        ],
    },
    {
        id: 'file-2',
        name: 'transactions_june_2025.json',
        uploadDate: '2025-07-21',
        status: 'Pending Analysis',
        sampleContent: [
            {
                transactionId: 'TXN789',
                timestamp: '2025-06-15T10:30:00Z',
                amount: 1500,
                currency: 'USD',
                type: 'Deposit', // maps to transactionType
                senderAccount: 'ACCT1001',
                receiverAccount: 'ACCT2001',
                senderCountry: 'USA', // can map to senderCountry
                receiverCountry: 'USA',
                fraudScore: 10,
                amlFlag: false
            },
            {
                transactionId: 'TXN790',
                timestamp: '2025-06-16T14:45:00Z',
                amount: 250,
                currency: 'EUR',
                type: 'Withdrawal',
                senderAccount: 'ACCT1002',
                receiverAccount: 'ACCT2002',
                senderCountry: 'DEU',
                receiverCountry: 'FRA',
                fraudScore: 5,
                amlFlag: false
            },
            {
                transactionId: 'TXN791',
                timestamp: '2025-06-17T09:00:00Z',
                amount: 5000,
                currency: 'GBP',
                type: 'Transfer',
                senderAccount: 'ACCT1003',
                receiverAccount: 'ACCT2003',
                senderCountry: 'GBR',
                receiverCountry: 'IND',
                fraudScore: 70, // Higher risk example
                amlFlag: true // AML flag example
            },
            {
                transactionId: 'TXN792',
                timestamp: '2025-06-18T11:20:00Z',
                amount: 10000,
                currency: 'USD',
                type: 'Payment',
                senderAccount: 'ACCT1004',
                receiverAccount: 'ACCT2004',
                senderCountry: 'CAN',
                receiverCountry: 'USA',
                fraudScore: 25,
                amlFlag: false
            },
            {
                transactionId: 'TXN793',
                timestamp: '2025-06-19T16:00:00Z',
                amount: 750,
                currency: 'JPY',
                type: 'Deposit',
                senderAccount: 'ACCT1005',
                receiverAccount: 'ACCT2005',
                senderCountry: 'JPN',
                receiverCountry: 'JPN',
                fraudScore: 8,
                amlFlag: false
            },
        ],
    },
];

// Mock data for industry schemas, used in Workbench
export const mockIndustrySchemas = [
    {
        id: 'schema-customer-profile',
        name: 'Customer Profile Schema (AML/KYC)',
        description: 'Standard schema for customer due diligence and KYC records, compliant with common AML regulations.',
        fields: [
            { id: 'customerID', name: 'Customer ID', type: 'string', required: true, format: 'alphanumeric' },
            { id: 'firstName', name: 'First Name', type: 'string', required: true },
            { id: 'lastName', name: 'Last Name', type: 'string', required: true },
            { id: 'dateOfBirth', name: 'Date of Birth', type: 'date', required: true, format: 'YYYY-MM-DD' },
            { id: 'nationalID', name: 'National ID', type: 'string', required: false },
            { id: 'email', name: 'Email Address', type: 'string', required: true, format: 'email' },
            { id: 'phoneNumber', name: 'Phone Number', type: 'string', required: false },
            { id: 'address', name: 'Address', type: 'string', required: true },
            { id: 'countryOfResidence', name: 'Country of Residence', type: 'string', required: true, format: 'ISO 3166-1 alpha-3' },
            { id: 'occupation', name: 'Occupation', type: 'string', required: false },
            { id: 'pepStatus', name: 'PEP Status', type: 'boolean', required: true, enum: [true, false] },
            { id: 'sanctionsStatus', name: 'Sanctions Status', type: 'boolean', required: true, enum: [true, false] },
            { id: 'riskScore', name: 'Risk Score', type: 'number', required: true },
        ],
    },
    {
        id: 'schema-transaction-data',
        name: 'Financial Transaction Schema (AML/Fraud)',
        description: 'Standard schema for financial transaction reporting, including AML and fraud monitoring fields.',
        fields: [
            { id: 'transactionID', name: 'Transaction ID', type: 'string', required: true, format: 'alphanumeric' },
            { id: 'timestamp', name: 'Timestamp', type: 'date', required: true, format: 'YYYY-MM-DDTHH:mm:ssZ' },
            { id: 'amount', name: 'Amount', type: 'number', required: true },
            { id: 'currency', name: 'Currency', type: 'string', required: true, format: 'ISO 4217' },
            { id: 'transactionType', name: 'Transaction Type', type: 'string', required: true, enum: ['Deposit', 'Withdrawal', 'Transfer', 'Payment'] },
            { id: 'senderAccount', name: 'Sender Account', type: 'string', required: true },
            { id: 'receiverAccount', name: 'Receiver Account', type: 'string', required: true },
            { id: 'senderCountry', name: 'Sender Country', type: 'string', required: false, format: 'ISO 3166-1 alpha-3' },
            { id: 'receiverCountry', name: 'Receiver Country', type: 'string', required: false, format: 'ISO 3166-1 alpha-3' },
            { id: 'fraudScore', name: 'Fraud Score', type: 'number', required: false },
            { id: 'amlFlag', name: 'AML Flag', type: 'boolean', required: true, enum: [true, false] },
        ],
    },
];

// Mock data for saving mapping templates
export const mockMappingTemplates = [
    {
        id: 'template_financial_transactions_q1_2025',
        name: 'Financial Transactions Q1 2025',
        description: 'Mapping for quarterly financial transactions to AML/Fraud schema.',
        sourceSchemaExample: ['transaction_id_src', 'value_src', 'currency_code_src', 'type_src', 'sender_account_src', 'receiver_account_src'],
        targetSchemaId: 'schema-transaction-data',
        mappings: [
            { sourceField: 'transaction_id_src', targetField: 'transactionID', transformation: null },
            { sourceField: 'value_src', targetField: 'amount', transformation: { type: 'convertToNumber' } },
            { sourceField: 'currency_code_src', targetField: 'currency', transformation: { type: 'toUpperCase' } },
            { sourceField: 'type_src', targetField: 'transactionType', transformation: null },
            { sourceField: 'sender_account_src', targetField: 'senderAccount', transformation: null },
            { sourceField: 'receiver_account_src', targetField: 'receiverAccount', transformation: null },
        ],
    },
    {
        id: 'template_customer_onboarding_v1',
        name: 'Customer Onboarding V1',
        description: 'Initial mapping for new customer onboarding data to Customer Profile schema.',
        sourceSchemaExample: ['cust_id', 'f_name', 'l_name', 'dob', 'email_addr', 'home_address', 'country_iso'],
        targetSchemaId: 'schema-customer-profile',
        mappings: [
            { sourceField: 'cust_id', targetField: 'customerID', transformation: null },
            { sourceField: 'f_name', targetField: 'firstName', transformation: null },
            { sourceField: 'l_name', targetField: 'lastName', transformation: null },
            { sourceField: 'dob', targetField: 'dateOfBirth', transformation: { type: 'formatDate', from: 'DD/MM/YYYY', to: 'YYYY-MM-DD' } },
            { sourceField: 'email_addr', targetField: 'email', transformation: null },
            { sourceField: 'home_address', targetField: 'address', transformation: null },
            { sourceField: 'country_iso', targetField: 'countryOfResidence', transformation: { type: 'toUpperCase' } },
        ],
    },
];

// Mock data for alerts
export const mockAlerts = [
    {
        id: 'alert-1',
        name: 'High-risk transaction detected from unverified source.',
        type: 'Fraud Alert',
        status: 'Open',
        date: '2025-07-24',
        action: 'Review Transaction',
        severity: 'Critical',
        details: 'Transaction TXN98765 valued at $15,000 from IP 192.168.1.10. Associated with customer profile CUST456, which has incomplete KYC. Recommend immediate review and potential suspension.',
        linkedEntities: [
            { type: 'Transaction', id: 'TXN98765', link: '/transactions/TXN98765' },
            { type: 'Customer', id: 'CUST456', link: '/customers/CUST456' }
        ],
        eventType: 'Transaction Triggered',
        messageTemplate: 'High-risk transaction detected from unverified source. Review transaction {{transaction.id}}.'
    },
    {
        id: 'alert-2',
        name: 'Multiple failed login attempts for administrator account.',
        type: 'Security Alert',
        status: 'Acknowledged',
        date: '2025-07-23',
        action: 'Investigate Activity',
        severity: 'High',
        details: 'Admin user "john.doe" experienced 5 failed login attempts within 10 minutes from various geolocations. Account temporarily locked. Recommend checking audit logs.',
        linkedEntities: [
            { type: 'User', id: 'john.doe', link: '/users/john.doe' },
            { type: 'Audit Log', id: 'log-security-20250723', link: '/audit-logs/security-20250723' }
        ],
        eventType: 'Security Breach',
        messageTemplate: 'Multiple failed login attempts for administrator account {{user.name}}.'
    },
    {
        id: 'alert-3',
        name: 'Compliance report overdue: Q2 Regulatory Filing.',
        type: 'Compliance Alert',
        status: 'Closed',
        date: '2025-07-20',
        action: 'View Report',
        severity: 'Medium',
        details: 'The Quarterly Regulatory Filing for Q2 2025 was due on 2025-07-15. Report has since been filed and marked as compliant. Investigation into delay initiated.',
        linkedEntities: [
            { type: 'Report', id: 'REG2025Q2', link: '/reports/REG2025Q2' }
        ],
        eventType: 'Compliance Reporting Deadline',
        messageTemplate: 'Compliance report overdue: {{report.name}}.'
    },
    {
        id: 'alert-4',
        name: 'New regulatory guideline published: VASP licensing.',
        type: 'Regulatory Update',
        status: 'Open',
        date: '2025-07-18',
        action: 'Review Guideline',
        severity: 'Low',
        details: 'Central Bank has issued new guidelines concerning Virtual Asset Service Provider (VASP) licensing requirements. Review required to assess impact on current operations.',
        linkedEntities: [
            { type: 'Regulation', id: 'REG2025VASP', link: '/regulations/REG2025VASP' }
        ],
        eventType: 'Regulatory Circular Publication',
        messageTemplate: 'New regulatory guideline published: {{circular.title}}.'
    },
];

// Mock data for integrations (similar to mockDataSources, but conceptually for 'integrations' page)
export const mockIntegrations = [
    {
        id: 'integration-stripe',
        name: 'Stripe Payments',
        type: 'Payment Gateway',
        status: 'Active',
        lastSync: '15m ago',
        dataQuality: 99.2,
        recordsSynced: 18450,
        description: 'Connects to Stripe API for payment transaction data.',
        configuration: { apiKey: 'sk_live_****', webhookUrl: 'https://webhook.example.com/stripe' },
        linkedDataSources: ['src-stripe-api']
    },
    {
        id: 'integration-chainalysis',
        name: 'Chainalysis KYT',
        type: 'Blockchain Analytics',
        status: 'Active',
        lastSync: '2h ago',
        dataQuality: 99.8,
        recordsSynced: 2300,
        lastSync: '2h ago',
        description: 'Integrates with Chainalysis KYT for crypto transaction risk scoring.',
        configuration: { apiEndpoint: 'https://api.chainalysis.com/kyt', licenseKey: '****' },
        linkedDataSources: ['src-chainalysis-kyt']
    },
    {
        id: 'integration-crm',
        name: 'Salesforce CRM',
        type: 'CRM System',
        status: 'Inactive',
        lastSync: '3w ago',
        dataQuality: 85.0,
        recordsSynced: 0,
        description: 'Placeholder for Salesforce integration for customer data. Currently inactive.',
        configuration: { instanceUrl: 'https://innovateinc.salesforce.com', userId: 'crm_admin' },
        linkedDataSources: []
    },
];

// Mock data for user roles
export const mockRoles = [
    {
        id: 'role-admin',
        name: 'Administrator',
        description: 'Full access to all system features and configurations.',
        permissions: ['manage_users', 'manage_settings', 'view_all_data', 'create_reports', 'manage_integrations'],
    },
    {
        id: 'role-compliance-officer',
        name: 'Compliance Officer',
        description: 'Access to compliance reporting, data management, and alert investigation features.',
        permissions: ['view_compliance_dashboard', 'manage_data_sources', 'view_alerts', 'investigate_alerts', 'generate_reports', 'manage_templates'],
    },
    {
        id: 'role-analyst',
        name: 'Analyst',
        description: 'Read-only access to dashboards, reports, and specific data views for analysis.',
        permissions: ['view_dashboard', 'view_reports', 'view_data'],
    },
    {
        id: 'role-auditor',
        name: 'Auditor',
        description: 'Read-only access to audit logs and compliance evidence for auditing purposes.',
        permissions: ['view_audit_logs', 'view_evidence_files', 'view_reports'],
    },
];

// Mock data for users
export const mockUsers = [
    {
        id: 'user-1',
        name: 'Kene Gold',
        email: 'kene.gold@innovateinc.com',
        role: 'Administrator',
        status: 'Active',
        lastLogin: '2025-07-24',
        createdAt: '2024-01-01',
        twoFactorEnabled: true,
        title: 'Chief Compliance Officer',
    },
    {
        id: 'user-2',
        name: 'Jane Smith',
        email: 'jane.smith@innovateinc.com',
        role: 'Compliance Officer',
        status: 'Active',
        lastLogin: '2025-07-23',
        createdAt: '2024-03-10',
        twoFactorEnabled: false,
        title: 'Senior Compliance Analyst',
    },
    {
        id: 'user-3',
        name: 'Mark Davis',
        email: 'mark.davis@innovateinc.com',
        role: 'Analyst',
        status: 'Inactive',
        lastLogin: '2025-06-15',
        createdAt: '2024-02-01',
        twoFactorEnabled: true,
        title: 'Financial Data Analyst',
    },
    {
        id: 'user-4',
        name: 'Sarah Chen',
        email: 'sarah.chen@innovateinc.com',
        role: 'Auditor',
        status: 'Active',
        lastLogin: '2025-07-22',
        createdAt: '2024-05-01',
        twoFactorEnabled: false,
        title: 'Internal Auditor',
    },
];

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

// Mock data for rules
export const mockRules = [
    {
        id: 'rule-1',
        name: 'High-Value Transaction Alert',
        description: 'Flags transactions over $10,000 from any country.',
        type: 'Web2',
        context: 'Global - All PSP',
        status: 'Active',
        conditions: [
            { field: 'Transaction Value', operator: 'exceeds', value: '10000' }
        ],
        actions: [
            { type: 'Create Alert' },
            { type: 'Flag for Review' }
        ]
    },
    {
        id: 'rule-2',
        name: 'KYC Document Expiry Alert',
        description: 'Alerts on KYC documents expiring within 30 days and triggers a task.',
        type: 'Web2',
        context: 'Nigeria - All PSP',
        status: 'Active',
        conditions: [
            { field: 'KYC Status', operator: 'is from', value: 'expiring in 30 days' } // Placeholder for more complex date logic
        ],
        actions: [
            { type: 'Create Alert' },
            { type: 'Trigger Workflow' }
        ]
    },
    {
        id: 'rule-3',
        name: 'Sanctioned Crypto Address Block',
        description: 'Blocks transactions with addresses identified on sanctions lists for digital assets.',
        type: 'Web3',
        context: 'Global - Digital Assets',
        status: 'Inactive',
        conditions: [
            { field: 'Digital Asset Type', operator: 'contains', value: 'sanctioned' }, // Placeholder for actual sanctions list check
            { field: 'Transaction Value', operator: 'exceeds', value: '500' }
        ],
        actions: [
            { type: 'Block Transaction' },
            { type: 'Create Alert' }
        ]
    },
    {
        id: 'rule-4',
        name: 'New Regulatory Circular Review',
        description: 'Triggers a task for the compliance team when a new regulatory circular is published.',
        type: 'Web2',
        context: 'Kenya - All',
        status: 'Active',
        conditions: [
            { field: 'Regulatory Update', operator: 'is equal to', value: 'new publication' } // Placeholder
        ],
        actions: [
            { type: 'Trigger Workflow' },
            { type: 'Generate Report' }
        ]
    }
];

// Mock data for the tasks
export const initialTasks = {
    'To Do': [
        { id: 'TASK-1', title: 'Review new CBN guidelines for PSPs', description: 'Analyze impact of recent CBN updates on payment service providers.', priority: 'High', dueDate: '2025-08-10', status: 'To Do' },
        { id: 'TASK-2', title: 'Schedule Q3 internal audit', description: 'Coordinate with internal and external auditors for the third-quarter audit.', priority: 'Medium', dueDate: '2025-08-01', status: 'To Do' },
        { id: 'TASK-6', title: 'Draft new AML/CFT Policy Addendum', description: 'Incorporate new regulatory requirements for virtual asset service providers.', priority: 'High', assignedTo: 'Jane Smith', dueDate: '2025-09-15', status: 'To Do' },
    ],
    'In Progress': [
        { id: 'TASK-3', title: 'Prepare VASP White Paper draft', description: 'Outline the company\'s approach to virtual asset services and compliance.', priority: 'High', assignedTo: 'Kene Gold', dueDate: '2025-08-20', status: 'In Progress' },
        { id: 'TASK-4', title: 'Update Data Encryption Policy', description: 'Revise current data encryption standards to meet new industry best practices.', priority: 'Low', assignedTo: 'Mark Davis', dueDate: '2025-07-30', status: 'In Progress' },
    ],
    'Done': [
        { id: 'TASK-5', title: 'Submit Q2 AML Summary', description: 'Quarterly Anti-Money Laundering summary report submitted to regulatory authority.', priority: 'High', assignedTo: 'Sarah Chen', dueDate: '2025-07-15', status: 'Done' },
    ],
};

// Mock data for Workflows
export const mockWorkflows = [
    {
        id: 'wf-1',
        name: 'New License Application',
        description: 'Standard workflow for submitting new license applications to regulators.',
        steps: [
            { name: 'Gather Required Documents' },
            { name: 'Complete Application Forms' },
            { name: 'Internal Legal Review' },
            { name: 'Submit to Regulator' },
            { name: 'Track Application Status' },
        ],
    },
    {
        id: 'wf-2',
        name: 'Quarterly AML Reporting',
        description: 'Automated workflow for preparing and submitting quarterly AML reports.',
        steps: [
            { name: 'Collect Transaction Data' },
            { name: 'Run AML Screening Rules' },
            { name: 'Generate SAR/CTR Reports' },
            { name: 'Compliance Officer Review' },
            { name: 'Submit to Regulator' },
        ],
    },
    {
        id: 'wf-3',
        name: 'KYC Document Renewal',
        description: 'Workflow for managing the periodic renewal of KYC documents for existing clients.',
        steps: [
            { name: 'Identify Clients for Renewal' },
            { name: 'Send Renewal Request' },
            { name: 'Collect Updated Documents' },
            { name: 'Verify New Documents' },
            { name: 'Update Client Profile' },
        ],
    },
];

// Mock data for Partners
export const mockPartners = [
    {
        id: 'partner-1',
        name: 'First National Bank',
        type: 'Bank Partner',
        status: 'Active',
        sharedData: ['KYC Records (Limited)', 'Transaction Data (Filtered)'],
        lastActivity: '2025-07-28'
    },
    {
        id: 'partner-2',
        name: 'LegalShield Solutions',
        type: 'Legal Firm',
        status: 'Active',
        sharedData: ['Compliance Reports', 'Audit Documentation'],
        lastActivity: '2025-07-20'
    },
    {
        id: 'partner-3',
        name: 'Global Compliance Auditors',
        type: 'Auditor',
        status: 'Inactive',
        sharedData: ['Audit Logs'],
        lastActivity: '2025-06-10'
    },
];

// --- Data for AI Agent Feature ---

export const mockAiActivities = [
    { id: 'act-ai-1', type: 'Configuration Update', description: 'AI Model Version updated to v2.1.0-beta by Admin.', date: '2025-07-30 14:30', status: 'Completed' },
    { id: 'act-ai-2', type: 'Data Ingestion', description: 'Processed 5,000 new transaction records for analysis.', date: '2025-07-30 12:00', status: 'Completed' },
    { id: 'act-ai-3', type: 'Insight Generation', description: 'Generated a new risk pattern insight: "High-value cross-border payments".', date: '2025-07-29 09:15', status: 'Completed' },
    { id: 'act-ai-4', type: 'Simulation Run', description: 'Simulated "Generate Risk Assessment" scenario.', date: '2025-07-29 08:00', status: 'Completed' },
    { id: 'act-ai-5', type: 'Model Retraining', description: 'Initiated re-training of AI recommendation engine.', date: '2025-07-28 23:00', status: 'In Progress' },
    { id: 'act-ai-6', type: 'Smart Contract Monitor', description: 'Detected potential exploit attempt on smart contract: 0xAbCdEf...', date: '2025-07-28 17:00', status: 'Alert' },
    { id: 'act-ai-7', type: 'System Health Check', description: 'Performed routine self-diagnosis; no issues detected.', date: '2025-07-28 01:00', status: 'Completed' },
];

export const mockAiInsights = [
    {
        id: 'insight-1',
        type: 'Risk Analysis',
        title: 'New High-Risk Transaction Pattern Identified',
        description: 'AI detected a strong correlation between transactions over $10,000 originating from a specific region (Southeast Asia) and newly onboarded customers with basic KYC. Recommends enhanced due diligence for similar future transactions and a retrospective review of impacted accounts.',
        date: '2025-07-28',
        status: 'New',
        priority: 'High',
        action: 'Review Accounts',
        linkedEntities: [
            { type: 'Transaction', id: 'TXN-98765', link: '/data-management?tab=detailedRecords&filter=TXN-98765' },
            { type: 'Customer Segment', id: 'SEG-NewSEA-BasicKYC', link: '/customers?segment=NewSEA-BasicKYC' }
        ]
    },
    {
        id: 'insight-2',
        type: 'Recommendation',
        title: 'Optimize Regulatory Reporting Workflow for Q3',
        description: 'Based on historical submission times and regulatory changes, AI suggests re-sequencing the data aggregation and review steps for Q3 regulatory reports to improve efficiency by 15%. This could reduce overtime during peak filing periods.',
        date: '2025-07-27',
        status: 'New',
        priority: 'Medium',
        action: 'Adjust Workflow',
        linkedEntities: [
            { type: 'Workflow', id: 'WF-QTR-AML', link: '/manage?tab=workflows&id=WF-QTR-AML' },
            { type: 'Report', id: 'REP-Q3-SAR', link: '/compliance-reporting?report=REP-Q3-SAR' }
        ]
    },
    {
        id: 'insight-3',
        type: 'Alert',
        title: 'Potential Compliance Gap in Draft Data Privacy Policy',
        description: 'AI has identified a clause in the draft data privacy policy that may not fully align with recent updates to the ODPC framework in Kenya, specifically regarding data retention periods. Recommends legal review of Section 4.2.',
        date: '2025-07-26',
        status: 'Acknowledged',
        priority: 'High',
        action: 'Review Policy',
        linkedEntities: [
            { type: 'Policy Document', id: 'DOC-DPP-DRAFT', link: '/library?doc=DOC-DPP-DRAFT' },
            { type: 'Regulation', id: 'REG-ODPC-KE', link: '/regulatory-updates?reg=ODPC-KE' }
        ]
    },
    {
        id: 'insight-4',
        type: 'Digital Asset Alert',
        title: 'Unusual Inflow to Whitelisted Wallet',
        description: 'AI detected an unusually large and frequent inflow of funds from a non-whitelisted address into a company-approved digital asset wallet. Recommends immediate review for potential illicit activity or misconfigured systems.',
        date: '2025-07-25',
        status: 'New',
        priority: 'Critical',
        action: 'Investigate Wallet',
        linkedEntities: [
            { type: 'Wallet Address', id: '0x1A2b3C4d...', link: '/data-management?tab=crypto&address=0x1A2b3C4d' }
        ]
    },
    {
        id: 'insight-5',
        type: 'Recommendation',
        title: 'Automate Manual Report Data Collation',
        description: 'Analysis shows that 30% of time spent on monthly compliance reports is manual data collation. AI suggests automating this via a new ETL process or integration with existing systems.',
        date: '2025-07-24',
        status: 'Closed',
        priority: 'Medium',
        action: 'Propose Automation',
        linkedEntities: [
            { type: 'ETL Process', id: 'ETL-Reporting-Data', link: '/data-management?tab=etl&id=ETL-Reporting-Data' }
        ]
    },
    {
        id: 'insight-6',
        type: 'Risk Analysis',
        title: 'Geographic Risk Exposure Update',
        description: 'The AI model has updated the risk score for transactions involving Brazil due to recent regulatory changes and increased fraud indicators in the region.',
        date: '2025-07-23',
        status: 'New',
        priority: 'Low',
        action: 'Review Risk Profile',
        linkedEntities: [
            { type: 'Jurisdiction', id: 'Brazil', link: '/risk-assessment?geo=Brazil' }
        ]
    },
];

// Mock Partner Tiers (Added this section to align with OrganizationsView.jsx)
export const mockPartnerTiers = [
    {
        id: 'tier1',
        name: 'Standard Partner',
        description: 'Basic access level for new partners.',
        accessLevel: 'Limited Data View',
        permissions: ['View KYC Records', 'Submit Basic Reports'],
    },
    {
        id: 'tier2',
        name: 'Premium Partner',
        description: 'Enhanced access for established and trusted partners.',
        accessLevel: 'Full Data Access',
        permissions: ['View KYC Records', 'View Transaction Data', 'Generate Compliance Reports', 'Access Audit Logs'],
    },
    {
        id: 'tier3',
        name: 'Strategic Partner',
        description: 'Highest access level for key strategic alliances.',
        accessLevel: 'Admin Access',
        permissions: ['View All Data', 'Manage Integrations', 'Receive Real-time Alerts'],
    },
];