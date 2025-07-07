import React from 'react';
// CORRECTED: 'AlertTriangle' and 'BarChart' are now imported from the correct libraries.
import { DollarSign, AlertTriangle, BarChart as BarChartIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import FraudChart from "./FraudChart.jsx";

// Mock data for this specific dashboard
const transactionStats = {
    totalValue: '1.2M USD',
    totalTransactions: '15,432',
    alertsGenerated: 112,
};

const StatCard = ({ icon, title, value }) => (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-white">
        <div className="flex items-center">
            <div className="mr-4">{icon}</div>
            <div>
                <p className="text-sm text-gray-400">{title}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </div>
    </div>
);

const TransactionMonitoringDashboard = () => {
    return (
        <div className="space-y-6 animate-fade-in mt-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={<DollarSign size={32} className="text-green-500"/>} title="Total Transaction Value (24h)" value={transactionStats.totalValue} />
                <StatCard icon={<BarChartIcon size={32} className="text-blue-500"/>} title="Total Transactions (24h)" value={transactionStats.totalTransactions} />
                <StatCard icon={<AlertTriangle size={32} className="text-yellow-500"/>} title="Alerts Generated (24h)" value={transactionStats.alertsGenerated} />
            </div>

            {/* Transaction Trends Chart */}
            <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white">
                 <h3 className="text-xl font-semibold mb-4 text-[#c0933e]">Transaction Trends (Last 7 Days)</h3>
                 <div className="h-96">
                    {/* We are reusing the FraudChart component here */}
                    <FraudChart />
                 </div>
            </div>
        </div>
    );
};

export default TransactionMonitoringDashboard;
