// src/features/riskAssessment/components/RiskHeatmap.jsx

import React from 'react';

// This mock data can be moved to your main mockData.js file later if you wish
const riskData = {
    products: ['Payments', 'Lending', 'Digital Assets', 'Remittances'],
    jurisdictions: ['Nigeria', 'Kenya', 'Ghana', 'South Africa'],
    scores: [
        [75, 60, 85, 65],
        [65, 80, 75, 55],
        [85, 90, 80, 70],
        [65, 55, 60, 50]
    ]
};

const getColorForScore = (score) => {
    if (score > 80) return 'bg-red-500 hover:bg-red-600';
    if (score > 60) return 'bg-yellow-500 hover:bg-yellow-600';
    return 'bg-green-500 hover:bg-green-600';
};

// The component is now simplified and no longer has the animating useEffect
const RiskHeatmap = () => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
                <thead>
                    <tr>
                        <th className="p-3 font-medium text-left text-sm theme-text-secondary border-b theme-border-color">Product</th>
                        {riskData.jurisdictions.map(j => (
                            <th key={j} className="p-3 font-medium text-center text-sm theme-text-secondary border-b theme-border-color">{j}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {riskData.products.map((product, rowIndex) => (
                        <tr key={product}>
                            <td className="p-3 border-b theme-border-color font-semibold theme-text-primary">{product}</td>
                            {riskData.scores[rowIndex].map((score, colIndex) => (
                                <td key={`${rowIndex}-${colIndex}`} className="p-1 border-b theme-border-color">
                                    <div
                                        className={`w-full h-12 flex items-center justify-center text-white font-bold rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${getColorForScore(score)}`}
                                    >
                                        {score}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="text-xs theme-text-secondary mt-2 text-center">
                This heatmap shows risk concentrations. Higher values indicate higher risk.
            </p>
        </div>
    );
};

export default RiskHeatmap;