// src/features/dashboard/components/KpiCard.jsx

import React from 'react';
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
// --- CORRECTED: Import the necessary icons directly into this component. ---
import { Target, Shield, CheckCheck } from 'lucide-react';

// A helper object to map string names to the actual icon components
const iconComponents = {
  Target,
  Shield,
  CheckCheck,
};

// Modified to accept onDrilldown prop
const KpiCard = ({ title, value, color, icon: iconName, onClick, onDrilldown, kpiData }) => { // Added kpiData prop
    // Look up the correct icon component from the helper object
    const Icon = iconComponents[iconName] || Target; // Fallback to Target icon

    return (
        <button
            onClick={() => onDrilldown(kpiData)} // Call onDrilldown with the full kpiData
            className="bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center text-center w-full hover:bg-gray-700 transition-colors"
        >
            <div className="relative w-32 h-32">
                <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                        innerRadius="70%"
                        outerRadius="85%"
                        data={[{ value, fill: color }]}
                        startAngle={90}
                        endAngle={-270}
                    >
                        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                        <RadialBar
                            background={{ fill: '#374151' }}
                            dataKey="value"
                            cornerRadius={10}
                        />
                    </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold" style={{ color }}>{value}%</span>
                </div>
            </div>
            <div className="flex items-center mt-2">
                <div className="mr-2" style={{ color }}>
                    {/* Render the icon component */}
                    <Icon size={24} />
                </div>
                <h4 className="font-semibold text-gray-300">{title}</h4>
            </div>
        </button>
    );
};

export default KpiCard;
