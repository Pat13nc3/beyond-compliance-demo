import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import FraudDrilldownModal from '../modals/FraudDrilldownModal.jsx'; // Import the new modal

// Helper function to generate dummy fraud trend data
const generateDummyFraudData = () => {
    const data = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    months.forEach(month => {
        // Generate more realistic, varying numbers for attempted and prevented fraud
        const attempted = Math.floor(Math.random() * 30) + 10; // 10-40 attempted
        const prevented = Math.floor(Math.random() * 20) + attempted - 5; // Prevented is usually slightly less than or equal to attempted
        
        data.push({
            month: month,
            attempted: attempted,
            prevented: prevented > 0 ? prevented : 0, // Ensure prevented is not negative
            details: Array.from({ length: attempted + prevented }, (_, i) => ({
                id: `${month}-fraud-${i}`,
                type: Math.random() > 0.5 ? 'Attempted' : 'Prevented',
                description: `Fraud event ${i + 1} in ${month}`,
                amount: (Math.random() * 1000 + 10).toFixed(2),
                date: new Date(2023, months.indexOf(month), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
                status: Math.random() > 0.7 ? 'High Risk' : 'Medium Risk'
            }))
        });
    });
    return data;
};

const FraudChart = () => {
    const [fraudTrendsData, setFraudTrendsData] = useState(generateDummyFraudData());
    const [showDrilldownModal, setShowDrilldownModal] = useState(false);
    const [selectedMonthData, setSelectedMonthData] = useState(null);

    // Handler for clicking on a bar in the chart
    const handleBarClick = (data, index) => {
        // When a bar is clicked, set the data for that month and open the modal
        setSelectedMonthData(fraudTrendsData[index]);
        setShowDrilldownModal(true);
    };

    return (
        <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white">
            <h4 className="text-lg font-semibold text-[#c0933e] mb-4">Fraud Trends</h4>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={fraudTrendsData} onClick={(state) => {
                    // Check if a bar was actually clicked
                    if (state && state.activePayload && state.activePayload.length > 0) {
                        handleBarClick(state.activePayload[0].payload, state.activeTooltipIndex);
                    }
                }}>
                    <XAxis dataKey="month" stroke="#e7f1fe" />
                    <YAxis stroke="#e7f1fe" />
                    <Tooltip
                        cursor={{ fill: 'rgba(230, 230, 230, 0.1)' }}
                        contentStyle={{ backgroundColor: '#2d251e', border: 'none' }}
                        labelStyle={{ color: '#e7f1fe' }}
                        itemStyle={{ color: '#e7f1fe' }}
                    />
                    <Legend wrapperStyle={{ color: '#e7f1fe', paddingTop: '10px' }} />
                    {/* Use different dataKeys for attempted and prevented fraud */}
                    <Bar dataKey="attempted" stackId="a" fill="#ef4444" name="Attempted">
                        {/* Make bars clickable */}
                        {
                            fraudTrendsData.map((entry, index) => (
                                <Cell cursor="pointer" key={`cell-${index}`} />
                            ))
                        }
                    </Bar>
                    <Bar dataKey="prevented" stackId="a" fill="#3b82f6" name="Prevented">
                        {/* Make bars clickable */}
                        {
                            fraudTrendsData.map((entry, index) => (
                                <Cell cursor="pointer" key={`cell-${index}`} />
                            ))
                        }
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

            {/* Fraud Drilldown Modal */}
            {showDrilldownModal && selectedMonthData && (
                <FraudDrilldownModal
                    monthData={selectedMonthData}
                    onClose={() => setShowDrilldownModal(false)}
                />
            )}
        </div>
    );
};

export default FraudChart;
