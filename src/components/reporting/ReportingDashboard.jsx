import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { reportStatusData, monthlySubmissionsData } from '../../data/mockData';

const ReportingDashboard = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            {/* Report Status Donut Chart */}
            <div className="lg:col-span-1 bg-[#1e252d] p-6 rounded-xl shadow-lg text-white">
                <h3 className="text-xl font-semibold mb-4 text-[#c0933e]">Current Report Status</h3>
                <div className="w-full h-72">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={reportStatusData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {reportStatusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Monthly Submissions Bar Chart */}
            <div className="lg:col-span-2 bg-[#1e252d] p-6 rounded-xl shadow-lg text-white">
                <h3 className="text-xl font-semibold mb-4 text-[#c0933e]">Monthly Submissions</h3>
                <div className="w-full h-72">
                    <ResponsiveContainer>
                        <BarChart data={monthlySubmissionsData}>
                            <XAxis dataKey="month" stroke="#e7f1fe" />
                            <YAxis stroke="#e7f1fe" />
                            <Tooltip cursor={{fill: 'rgba(230, 230, 230, 0.1)'}} contentStyle={{ backgroundColor: '#2d251e' }}/>
                            <Legend wrapperStyle={{color: "#e7f1fe"}} />
                            <Bar dataKey="count" name="Submissions" fill="#c0933e" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ReportingDashboard;