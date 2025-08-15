// src/features/riskAssessment/riskUtils.js

// This is a mock implementation to resolve the import error.
// Replace the logic with your actual risk calculation and color utility functions.

// Simulates the calculation of risk scores for all entities.
// In a real application, this would contain complex logic.
export const calculateAllEntityRisks = (mockEntities, mockLicenses) => {
    // For the purpose of this mock, we simply return the provided entities.
    // In your actual implementation, you would calculate and enrich the risk scores.
    return [
        {
            entityId: 'ent-1',
            companyName: 'Fintech Corp',
            type: 'Fintech',
            riskScores: {
                overall: 80,
                credit: 75,
                liquidity: 60,
                market: 85,
                operational: 70,
                capitalAdequacy: 65
            },
            trend: 'up'
        },
        {
            entityId: 'ent-2',
            companyName: 'Global Bank',
            type: 'Banking',
            riskScores: {
                overall: 65,
                credit: 80,
                liquidity: 75,
                market: 55,
                operational: 80,
                capitalAdequacy: 90
            },
            trend: 'down'
        },
        {
            entityId: 'ent-3',
            companyName: 'Innovate Payments',
            type: 'Fintech',
            riskScores: {
                overall: 95,
                credit: 90,
                liquidity: 85,
                market: 80,
                operational: 95,
                capitalAdequacy: 80
            },
            trend: 'up'
        }
    ];
};

// Returns a color based on a given risk score.
export const getRiskColor = (score) => {
    if (score >= 90) return 'text-purple-400';
    if (score >= 75) return 'text-red-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-green-400';
};

// Returns a status-related color based on a severity string.
export const getSeverityColor = (severity) => {
    switch (severity) {
        case 'High':
        case 'Critical':
            return 'text-red-400';
        case 'Medium':
            return 'text-yellow-400';
        case 'Low':
            return 'text-green-400';
        default:
            return 'text-gray-400';
    }
};