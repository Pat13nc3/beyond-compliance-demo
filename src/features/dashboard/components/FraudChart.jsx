// src/features/dashboard/components/FraudChart.jsx

import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import FraudDrilldownModal from '../modals/FraudDrilldownModal.jsx';

// Helper function to generate dummy fraud trend data for the last 7 days
const generateDummyFraudData = () => {
    const data = [];
    const today = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 6; i >= 0; i--) { // Loop for the last 7 days (from 6 days ago to today)
        const currentDate = new Date(today); // Create a new Date object for each iteration
        currentDate.setDate(today.getDate() - i); // Set the specific date for this iteration

        const dayName = days[currentDate.getDay()]; // Get the day name (e.g., 'Mon', 'Tue') for currentDate
        // Format the full date for the modal title (e.g., "Jul 25")
        const formattedFullDate = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        // Format the date for individual event details (e.g., "07/25/2025")
        const formattedEventDate = currentDate.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });

        // Generate more realistic, varying numbers for attempted and prevented fraud
        const attempted = Math.floor(Math.random() * 30) + 10; // 10-40 attempted
        const prevented = Math.floor(Math.random() * 20) + attempted - 5;
        const actualPrevented = prevented > 0 ? prevented : 0; // Ensure prevented is not negative

        data.push({
            day: dayName,           // e.g., 'Fri'
            attempted: attempted,
            prevented: actualPrevented,
            fullDate: formattedFullDate, // e.g., 'Jul 25' - used in modal header
            details: Array.from({ length: attempted + actualPrevented }, (_, j) => ({
                id: `${currentDate.toISOString().slice(0, 10)}-fraud-${j}`,
                type: Math.random() > 0.5 ? 'Attempted' : 'Prevented',
                // Ensure description uses the specific day's name and formatted date
                description: `Fraud event ${j + 1} on ${dayName}, ${formattedEventDate}`,
                amount: (Math.random() * 1000 + 10).toFixed(2),
                date: formattedEventDate, // This is the date for the individual event
                status: Math.random() > 0.7 ? 'High Risk' : 'Medium Risk'
            }))
        });
    }
    return data;
};

const FraudChart = () => {
    const [fraudTrendsData, setFraudTrendsData] = useState(generateDummyFraudData());
    const [showDrilldownModal, setShowDrilldownModal] = useState(false);
    const [selectedDayData, setSelectedDayData] = useState(null);

    // handleBarClick now receives the full 'entry' object for the clicked day
    const handleBarClick = (dataEntry) => {
        setSelectedDayData(dataEntry); // This is the entire daily data object (e.g., for 'Fri', 'Jul 25')
        setShowDrilldownModal(true);
    };

    return (
        <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white h-full">
            <h4 className="text-lg font-semibold text-[#c0933e] mb-4">Fraud Trends (Last 7 Days)</h4>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={fraudTrendsData}>
                    <XAxis dataKey="day" stroke="#e7f1fe" />
                    <YAxis stroke="#e7f1fe" />
                    <Tooltip
                        cursor={{ fill: 'rgba(230, 230, 230, 0.1)' }}
                        contentStyle={{ backgroundColor: '#2d251e', border: 'none', color: 'white' }}
                        labelStyle={{ color: '#e7f1fe' }}
                        itemStyle={{ color: '#e7f1fe' }}
                    />
                    <Legend wrapperStyle={{ color: '#e7f1fe', paddingTop: '10px' }} />
                    <Bar dataKey="attempted" stackId="a" fill="#ef4444" name="Attempted">
                        {
                            fraudTrendsData.map((entry, index) => (
                                <Cell
                                    cursor="pointer"
                                    key={`cell-attempted-${index}`}
                                    onClick={() => handleBarClick(entry)} // Pass the full 'entry' data object for the day
                                />
                            ))
                        }
                    </Bar>
                    <Bar dataKey="prevented" stackId="a" fill="#3b82f6" name="Prevented">
                        {
                            fraudTrendsData.map((entry, index) => (
                                <Cell
                                    cursor="pointer"
                                    key={`cell-prevented-${index}`}
                                    onClick={() => handleBarClick(entry)} // Pass the full 'entry' data object for the day
                                />
                            ))
                        }
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

            {showDrilldownModal && selectedDayData && (
                <FraudDrilldownModal
                    dayData={selectedDayData} // selectedDayData now correctly holds the daily data object
                    onClose={() => setShowDrilldownModal(false)}
                />
            )}
        </div>
    );
};

export default FraudChart;