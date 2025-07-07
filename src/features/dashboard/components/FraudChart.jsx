import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
// We will use existing mock data as a placeholder to fix the error.
import { monthlySubmissionsData as fraudTrendsData } from '../../../data/mockData';

const FraudChart = () => {
  return (
    <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white">
      <h4 className="text-lg font-semibold text-[#c0933e] mb-4">Fraud Trends</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={fraudTrendsData}>
          <XAxis dataKey="month" stroke="#e7f1fe" />
          <YAxis stroke="#e7f1fe" />
          <Tooltip
            cursor={{ fill: 'rgba(230, 230, 230, 0.1)' }}
            contentStyle={{ backgroundColor: '#2d251e', border: 'none' }}
          />
          <Legend wrapperStyle={{ color: '#e7f1fe' }} />
          {/* Note: We are using the 'count' property from the placeholder data */}
          <Bar dataKey="count" stackId="a" fill="#ef4444" name="Attempted" />
          <Bar dataKey="count" stackId="a" fill="#3b82f6" name="Prevented" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FraudChart;