import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// We are re-purposing the heatmapData for this chart, as it's already in the correct format.
import { heatmapData as riskByProductData } from "../../../data/mockData.js";

// Define the risk pillars and their corresponding colors for the chart
const riskPillars = [
    { name: 'Compliance', color: '#ef4444' },
    { name: 'Operational', color: '#f59e0b' },
    { name: 'Market', color: '#3b82f6' },
    { name: 'Credit', color: '#8b5cf6' },
];

const RiskBarChart = () => (
    <ResponsiveContainer width="100%" height="100%">
        <BarChart
            data={riskByProductData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="product" stroke="#e7f1fe" angle={-25} textAnchor="end" height={60} interval={0} />
            <YAxis stroke="#e7f1fe" />
            <Tooltip 
                cursor={{fill: 'rgba(230, 230, 230, 0.1)'}} 
                contentStyle={{ backgroundColor: '#2d251e', border: 'none' }}
            />
            <Legend wrapperStyle={{color: "#e7f1fe"}}/>
            {riskPillars.map(pillar => (
                <Bar key={pillar.name} dataKey={pillar.name} fill={pillar.color} />
            ))}
        </BarChart>
    </ResponsiveContainer>
);

export default RiskBarChart;
