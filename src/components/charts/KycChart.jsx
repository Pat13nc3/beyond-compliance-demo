import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { kycData } from '../../data/mockData';

// A simple tooltip for charts
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-900 p-4 rounded-lg shadow-xl border border-gray-700 text-white">
                <p className="font-bold text-[#c0933e]">{payload[0].name}</p>
                <p className="text-sm">
                    Count: {payload[0].value}
                </p>
            </div>
        );
    }
    return null;
};


// Defines SVG gradients to be used in charts
const ChartGradients = () => (
    <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
            <radialGradient id="goldGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" style={{stopColor: '#fde047'}} />
                <stop offset="100%" style={{stopColor: '#c0933e'}} />
            </radialGradient>
            <radialGradient id="greenGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" style={{stopColor: '#4ade80'}} />
                <stop offset="100%" style={{stopColor: '#22c55e'}} />
            </radialGradient>
            <radialGradient id="redGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" style={{stopColor: '#f87171'}} />
                <stop offset="100%" style={{stopColor: '#b91c1c'}} />
            </radialGradient>
        </defs>
    </svg>
);


const KycChart = ({ onSliceClick }) => (
    <>
        <ChartGradients />
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={kycData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    innerRadius={60}
                    outerRadius={'80%'}
                    dataKey="value"
                    onClick={onSliceClick}
                    paddingAngle={5}
                >
                    {kycData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} stroke={entry.fill} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{color: "#e7f1fe"}}/>
            </PieChart>
        </ResponsiveContainer>
    </>
);

export default KycChart;