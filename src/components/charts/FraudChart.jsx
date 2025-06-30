import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fraudData } from '../../data/mockData';

// A simple tooltip for charts
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-900 p-4 rounded-lg shadow-xl border border-gray-700 text-white">
                <p className="font-bold text-lg">{label}</p>
                {payload.map((pld, index) => (
                    <p key={index} style={{ color: pld.color }}>
                        {`${pld.name}: ${pld.value}`}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const FraudChart = ({ onLineClick }) => (
    <ResponsiveContainer width="100%" height="100%">
        <LineChart
            data={fraudData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="name" stroke="#e7f1fe" />
            <YAxis yAxisId="left" stroke="#e7f1fe" label={{ value: 'Transactions', angle: -90, position: 'insideLeft', fill: '#e7f1fe' }} />
            <YAxis yAxisId="right" orientation="right" stroke="#c0933e" label={{ value: 'Flagged', angle: -90, position: 'insideRight', fill: '#c0933e' }}/>
            <Tooltip cursor={{fill: 'rgba(230, 230, 230, 0.1)'}} content={<CustomTooltip />} />
            <Legend wrapperStyle={{color: "#e7f1fe"}}/>
            <Line yAxisId="left" type="monotone" dataKey="transactions" name="Total Transactions" stroke="#e7f1fe" strokeWidth={2} activeDot={{ r: 8, onClick: onLineClick }} />
            <Line yAxisId="right" type="monotone" dataKey="flagged" name="Flagged for Review" stroke="#c0933e" strokeWidth={2} activeDot={{ r: 8, onClick: onLineClick }} />
        </LineChart>
    </ResponsiveContainer>
);

export default FraudChart;