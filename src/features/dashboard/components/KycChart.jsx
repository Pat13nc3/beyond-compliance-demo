import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { kycData } from '../../../data/mockData.js';

// This is a helper component to define the color gradients for the chart
const ChartGradients = () => (
    <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
            <radialGradient id="kycGreenGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#22c55e" />
            </radialGradient>
            <radialGradient id="kycYellowGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fde047" />
                <stop offset="100%" stopColor="#f59e0b" />
            </radialGradient>
            <radialGradient id="kycRedGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f87171" />
                <stop offset="100%" stopColor="#ef4444" />
            </radialGradient>
        </defs>
    </svg>
);

const KycChart = () => (
    <div className="bg-gray-800 p-4 rounded-lg h-full">
         <ChartGradients />
        <h4 className="text-lg font-semibold text-white mb-2 text-center">KYC Status</h4>
        <ResponsiveContainer width="100%" height={250}>
            <PieChart>
                <Pie
                    data={kycData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                >
                    {kycData.map((entry) => {
                         let color;
                         if (entry.name === 'Verified') color = 'url(#kycGreenGradient)';
                         else if (entry.name === 'Pending') color = 'url(#kycYellowGradient)';
                         else color = 'url(#kycRedGradient)';
                         return <Cell key={`cell-${entry.name}`} fill={color} />;
                    })}
                </Pie>
                <Tooltip
                    cursor={{ fill: 'rgba(230, 230, 230, 0.1)' }}
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', color: 'white' }}
                />
                <Legend iconType="circle" wrapperStyle={{color: "#e7f1fe"}}/>
            </PieChart>
        </ResponsiveContainer>
    </div>
);

export default KycChart;