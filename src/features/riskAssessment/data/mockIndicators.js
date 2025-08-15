// src/features/riskAssessment/data/mockIndicators.js

// Mock data for a centralized KPI/KRI library
export const mockIndicators = [
    {
        id: 'kri-npl-ratio',
        type: 'KRI',
        name: 'Non-Performing Loan (NPL) Ratio',
        description: 'Measures the percentage of non-performing loans relative to the total loan portfolio. A high ratio indicates significant credit risk.',
        category: 'Credit Risk',
        status: 'Active',
        targetValue: 5.0, // Critical threshold
        targetUnit: '%',
        trend: 'up', // Simulating an upward trend
    },
    {
        id: 'kri-leverage-ratio',
        type: 'KRI',
        name: 'Leverage Ratio',
        description: 'A key measure of financial leverage for banks. A lower ratio indicates higher risk.',
        category: 'Capital Adequacy',
        status: 'Active',
        targetValue: 3.0, // Regulatory minimum threshold
        targetUnit: '%',
        trend: 'down',
    },
    {
        id: 'kri-platform-uptime',
        type: 'KRI',
        name: 'Platform/API Uptime',
        description: 'Tracks the percentage of time a platform or API is operational. Downtime poses a significant operational risk for Fintechs.',
        category: 'Operational Risk',
        status: 'Active',
        targetValue: 99.9,
        targetUnit: '%',
        trend: 'down',
    },
    {
        id: 'kri-unhedged-exposure',
        type: 'KRI',
        name: 'Unhedged FX Exposure',
        description: 'Monitors exposure to foreign exchange fluctuations without protective hedges, a primary market risk.',
        category: 'Market Risk',
        status: 'Active',
        targetValue: 2000000,
        targetUnit: 'USD',
        trend: 'up',
    },
];