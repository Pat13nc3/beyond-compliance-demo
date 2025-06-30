import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { gapAssessmentData } from '../../data/mockData';

// A simple tooltip for charts
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-900 p-4 rounded-lg shadow-xl border border-gray-700 text-white">
                <p className="font-bold text-[#c0933e]">{label || payload[0].payload.name}</p>
                {payload.map((pld, index) => (
                    <p key={index} style={{ color: pld.color }}>
                        {`${pld.name}: ${pld.value}%`}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const GapAssessmentChart = ({ onBarClick }) => (
    <ResponsiveContainer width="100%" height="100%">
        <BarChart
            data={gapAssessmentData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
            {/* Define gradients for the bars */}
            <defs>
                <linearGradient id="barGold" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#c0933e" stopOpacity={0.6}/><stop offset="100%" stopColor="#c0933e" stopOpacity={1}/></linearGradient>
                <linearGradient id="barGreen" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#22c55e" stopOpacity={0.6}/><stop offset="100%" stopColor="#22c55e" stopOpacity={1}/></linearGradient>
                <linearGradient id="barRed" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#ef4444" stopOpacity={0.6}/><stop offset="100%" stopColor="#ef4444" stopOpacity={1}/></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2}/>
            <XAxis type="number" domain={[0, 100]} unit="%" stroke="#e7f1fe"/>
            <YAxis type="category" dataKey="name" width={120} stroke="#e7f1fe" tick={{ fill: '#e7f1fe' }}/>
            <Tooltip cursor={{fill: 'rgba(230, 230, 230, 0.1)'}} content={<CustomTooltip />} />
            <Legend wrapperStyle={{color: "#e7f1fe"}} />
            <Bar dataKey="adherence" name="Adherence" onClick={onBarClick}>
                {/* Dynamically color bars based on adherence value */}
                {gapAssessmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.adherence < 80 ? 'url(#barRed)' : (entry.adherence < 95 ? 'url(#barGreen)' : 'url(#barGold)')} />
                ))}
            </Bar>
        </BarChart>
    </ResponsiveContainer>
);

export default GapAssessmentChart;