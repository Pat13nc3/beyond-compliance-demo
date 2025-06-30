import React from 'react';

// Mock data structured specifically for the heatmap
const heatmapData = {
  jurisdictions: ['Nigeria', 'Kenya', 'Ghana', 'South Africa'],
  products: ['Payments', 'Lending', 'Digital Assets', 'Remittances'],
  // This matrix corresponds to the risks for each product (row) in each jurisdiction (column)
  // Higher numbers indicate higher risk.
  risks: [
    [75, 60, 65, 55], // Payments row
    [85, 70, 75, 65], // Lending row
    [95, 90, 80, 70], // Digital Assets row
    [65, 55, 60, 50], // Remittances row
  ],
};

// Helper function to get a color based on the risk score
const getRiskColor = (score) => {
    if (score > 90) return 'bg-red-800 hover:bg-red-700';
    if (score > 80) return 'bg-red-600 hover:bg-red-500';
    if (score > 70) return 'bg-yellow-600 hover:bg-yellow-500';
    if (score > 60) return 'bg-yellow-800 hover:bg-yellow-700';
    return 'bg-green-800 hover:bg-green-700';
};

const RiskHeatmap = () => {
    return (
        <div className="flex flex-col">
            {/* Header Row - Jurisdictions */}
            <div className="grid grid-cols-5 gap-1">
                <div className="p-2 text-sm font-bold text-gray-400">Product</div>
                {heatmapData.jurisdictions.map(jur => (
                    <div key={jur} className="p-2 text-sm font-bold text-center text-gray-400">{jur}</div>
                ))}
            </div>

            {/* Data Rows - Products and their risks */}
            <div className="space-y-1">
                {heatmapData.products.map((product, rowIndex) => (
                    <div key={product} className="grid grid-cols-5 gap-1 items-center">
                        <div className="p-2 text-sm font-semibold text-white">{product}</div>
                        {heatmapData.risks[rowIndex].map((risk, colIndex) => (
                             <div 
                                key={`${rowIndex}-${colIndex}`} 
                                className={`p-4 rounded-md text-center font-bold text-white transition-colors cursor-pointer ${getRiskColor(risk)}`}
                                title={`Risk Score: ${risk}`}
                            >
                                {risk}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
             <p className="text-xs text-gray-500 mt-4 text-center">
                This heatmap shows risk concentrations. Darker red indicates higher risk.
            </p>
        </div>
    );
};

export default RiskHeatmap;
