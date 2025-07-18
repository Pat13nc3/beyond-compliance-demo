import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector, Legend, Tooltip, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, ComposedChart } from 'recharts';

// Custom component for the active donut slice
const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    return (
        <g>
            <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill="#fff" className="font-bold text-lg">{payload.name}</text>
            <text x={cx} y={cy + 10} dy={8} textAnchor="middle" fill="#9ca3af" className="text-sm">{`${value} Reports (${(percent * 100).toFixed(0)}%)`}</text>
            <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 6} startAngle={startAngle} endAngle={endAngle} fill={fill}/>
        </g>
    );
};

const ReportingOverview = ({ reportStatusData, monthlySubmissionsData }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = (_, index) => setActiveIndex(index);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 bg-[#1e252d] p-6 rounded-xl shadow-lg text-white">
                <h3 className="text-lg font-semibold text-[#c0933e] mb-4">Current Report Status</h3>
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

            {/* --- THIS IS THE NEW COMPOSED CHART --- */}
            <div className="lg:col-span-3 bg-[#1e252d] p-6 rounded-xl shadow-lg text-white">
                <h3 className="text-lg font-semibold text-[#c0933e] mb-4">Monthly Submissions & Reviews</h3>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <ComposedChart data={monthlySubmissionsData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                            <XAxis dataKey="month" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip contentStyle={{ backgroundColor: '#2d251e', border: 'none' }} itemStyle={{ color: '#e7f1fe' }} />
                            <Legend wrapperStyle={{ color: "#e7f1fe" }} />
                            {/* The blue bars for total submissions */}
                            <Bar dataKey="count" name="Total Submissions" fill="#3b82f6" barSize={30} />
                            {/* The red line for flagged reports */}
                            <Line type="monotone" dataKey="flaggedForReview" name="Flagged for Review" stroke="#ef4444" strokeWidth={2} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ReportingOverview;