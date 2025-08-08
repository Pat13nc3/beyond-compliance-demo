// src/features/complianceReporting/components/ReportingOverview.jsx

import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector, Legend, Tooltip, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, ComposedChart } from 'recharts';

const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    return (
        <g>
            <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill="var(--text-primary)" className="font-bold text-lg">{payload.name}</text>
            <text x={cx} y={cy + 10} dy={8} textAnchor="middle" fill="var(--text-secondary)" className="text-sm">{`${value} Reports (${(percent * 100).toFixed(0)}%)`}</text>
            <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 6} startAngle={startAngle} endAngle={endAngle} fill={fill}/>
        </g>
    );
};

const ReportingOverview = ({ reportStatusData, monthlySubmissionsData }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = (_, index) => setActiveIndex(index);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 theme-bg-card p-6 rounded-xl shadow-lg theme-text-primary">
                <h3 className="text-lg font-semibold theme-text-highlight-color mb-4">Current Report Status</h3>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie activeIndex={activeIndex} activeShape={renderActiveShape} data={reportStatusData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} dataKey="value" onMouseEnter={onPieEnter}>
                                {reportStatusData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} cursor="pointer" />)}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="lg:col-span-3 theme-bg-card p-6 rounded-xl shadow-lg theme-text-primary">
                <h3 className="text-lg font-semibold theme-text-highlight-color mb-4">Monthly Submissions & Reviews</h3>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <ComposedChart data={monthlySubmissionsData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                            <XAxis dataKey="month" stroke="var(--text-secondary)" />
                            <YAxis stroke="var(--text-secondary)" />
                            <Tooltip contentStyle={{ backgroundColor: 'var(--background-card)', border: 'none' }} itemStyle={{ color: 'var(--text-primary)' }} />
                            <Legend wrapperStyle={{ color: "var(--text-primary)" }} />
                            <Bar dataKey="count" name="Total Submissions" fill="#3b82f6" barSize={30} />
                            <Line type="monotone" dataKey="flaggedForReview" name="Flagged for Review" stroke="#ef4444" strokeWidth={2} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ReportingOverview;