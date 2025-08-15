// src/features/riskAssessment/data/riskData.js

// Data specific to Risk Assessment feature

export const mockEntities = [
    {
        entityId: 'ent-1',
        companyName: 'Fintech Corp',
        type: 'Fintech',
        licenses: ['Payment Service Provider (PSP)'],
        jurisdictions: ['Nigeria', 'Kenya'],
        riskScores: {
            overall: 80,
            credit: 75,
            liquidity: 60,
            market: 85,
            operational: 70,
            capitalAdequacy: 65,
        },
        trend: 'up',
        sector: 'Fintech'
    },
    {
        entityId: 'ent-2',
        companyName: 'Global Bank',
        type: 'Banking',
        licenses: ['Banking License'],
        jurisdictions: ['Ghana', 'South Africa'],
        riskScores: {
            overall: 65,
            credit: 80,
            liquidity: 75,
            market: 55,
            operational: 80,
            capitalAdequacy: 90,
        },
        trend: 'down',
        sector: 'Banking'
    },
    {
        entityId: 'ent-3',
        companyName: 'Innovate Payments',
        type: 'Fintech',
        licenses: ['E-Money Issuer'],
        jurisdictions: ['Kenya'],
        riskScores: {
            overall: 95,
            credit: 90,
            liquidity: 85,
            market: 80,
            operational: 95,
            capitalAdequacy: 80,
        },
        trend: 'up',
        sector: 'Fintech'
    },
];

export const mockLicenses = [
    {
        id: 'lic-1',
        entityId: 'ent-1',
        name: 'Payment Service Provider (PSP)',
        jurisdiction: 'Nigeria (CBN)',
        status: 'Active',
        expiry: '2025-12-31'
    },
    {
        id: 'lic-2',
        entityId: 'ent-1',
        name: 'Payment Service Provider (PSP)',
        jurisdiction: 'Kenya (CMA)',
        status: 'Renewal Due',
        expiry: '2025-08-15'
    },
    {
        id: 'lic-3',
        entityId: 'ent-2',
        name: 'Banking License',
        jurisdiction: 'Ghana (BOG)',
        status: 'Active',
        expiry: '2026-05-20'
    },
    {
        id: 'lic-4',
        entityId: 'ent-3',
        name: 'E-Money Issuer',
        jurisdiction: 'South Africa (SARB)',
        status: 'Active',
        expiry: '2026-05-20'
    },
];

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
            { type: 'Transaction', id: 'TXN98765', link: '/data-management?tab=detailedRecords&filter=TXN98765' },
            { type: 'Customer', id: 'CUST456', link: '/customers?segment=CUST456' }
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
    {
        id: 'alert-5',
        name: 'Liquidity coverage ratio below regulatory minimum.',
        type: 'Liquidity',
        status: 'Open',
        date: '2025-08-14',
        action: 'Review LCR Calculation',
        severity: 'High',
        details: 'Fintech Corp.\'s LCR has fallen to 98% during a simulated stress test, below the 100% minimum. Immediate action required to boost liquid assets.',
        linkedEntities: [
            { type: 'Entity', id: 'ent-1', link: '/risk-assessment?entity=ent-1' }
        ],
        eventType: 'Liquidity Stress Test',
        messageTemplate: 'Entity {{entity.name}} liquidity coverage ratio below threshold.'
    },
    {
        id: 'alert-6',
        name: 'FX exposure on international portfolio exceeds limit.',
        type: 'Market',
        status: 'Open',
        date: '2025-08-13',
        action: 'Hedge FX Exposure',
        severity: 'Medium',
        details: 'Global Bank has an unhedged FX exposure of $15M against USD/NGN, exceeding the internal limit of $10M.',
        linkedEntities: [
            { type: 'Entity', id: 'ent-2', link: '/risk-assessment?entity=ent-2' }
        ],
        eventType: 'Market Risk Exposure',
        messageTemplate: 'Market risk exposure for {{entity.name}} exceeds threshold.'
    },
    {
        id: 'alert-7',
        name: 'Critical system outage in transaction processing.',
        type: 'Operational',
        status: 'Open',
        date: '2025-08-12',
        action: 'Investigate Incident',
        severity: 'Critical',
        details: 'Innovate Payments experienced a 4-hour outage affecting wire transfers. This has been identified as a high-severity operational risk event.',
        linkedEntities: [
            { type: 'Entity', id: 'ent-3', link: '/risk-assessment?entity=ent-3' }
        ],
        eventType: 'System Incident',
        messageTemplate: 'Critical system outage affecting {{system.name}} detected.'
    },
    {
        id: 'alert-8',
        name: 'Tier 1 Capital Ratio trending downwards.',
        type: 'Capital',
        status: 'Acknowledged',
        date: '2025-08-11',
        action: 'Monitor Capital Levels',
        severity: 'Low',
        details: 'Global Bank\'s Tier 1 Capital Ratio has shown a steady decline over the last quarter. While still above the minimum, close monitoring is recommended.',
        linkedEntities: [
            { type: 'Entity', id: 'ent-2', link: '/risk-assessment?entity=ent-2' }
        ],
        eventType: 'Financial Reporting',
        messageTemplate: 'Tier 1 Capital Ratio for {{entity.name}} is trending downwards.'
    },
];
