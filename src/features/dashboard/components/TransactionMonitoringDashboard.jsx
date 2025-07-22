import React from 'react';
import { DollarSign, AlertTriangle, BarChart as BarChartIcon, CheckCircle, XCircle, Slash } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import FraudChart from "./FraudChart.jsx";
import { processedTransactionDashboardData, mockIndicators } from '../../../data/mockData.js';
import Tooltip from '../../../components/ui/Tooltip.jsx';

const StatCard = ({ icon, title, value, metricType, indicatorId }) => {
    const indicator = mockIndicators.find(ind => ind.id === indicatorId);

    const getTooltipContent = () => {
        if (!indicator) {
            return (
                <div className="p-2 text-sm text-gray-300">
                    <p className="font-bold mb-1">No detailed indicator information available.</p>
                    <p>Please check the KPI & KRI Library for configuration.</p>
                </div>
            );
        }

        const isKri = indicator.type === 'KRI';
        let statusText = '';
        let actionHint = '';
        let statusIcon = null;
        let statusColorClass = 'text-gray-400';
        const latestValue = indicator.history?.[indicator.history.length - 1]?.value ?? 'N/A';

        if (latestValue !== 'N/A') {
            if (isKri) {
                if (latestValue > indicator.targetValue) { statusText = 'Breached'; actionHint = 'Action: Investigate and remediate immediately.'; statusIcon = <XCircle size={16} className="text-red-400 mr-2" />; statusColorClass = 'text-red-400'; }
                else if (latestValue > indicator.targetValue * 0.9) { statusText = 'At Risk'; actionHint = 'Action: Monitor closely and review contributing factors.'; statusIcon = <AlertTriangle size={16} className="text-yellow-400 mr-2" />; statusColorClass = 'text-yellow-400'; }
                else { statusText = 'In Compliance'; actionHint = 'Action: Maintain current controls.'; statusIcon = <CheckCircle size={16} className="text-green-400 mr-2" />; statusColorClass = 'text-green-400'; }
            } else { // KPI
                if (latestValue >= indicator.targetValue) { statusText = 'Exceeding Target'; actionHint = 'Action: Good performance, analyze for best practices.'; statusIcon = <CheckCircle size={16} className="text-green-400 mr-2" />; statusColorClass = 'text-green-400'; }
                else if (latestValue >= indicator.targetValue * 0.9) { statusText = 'On Track'; actionHint = 'Action: Maintain focus on operational efficiency.'; statusIcon = <AlertTriangle size={16} className="text-blue-400 mr-2" />; statusColorClass = 'text-blue-400'; }
                else { statusText = 'Needs Attention'; actionHint = 'Action: Review processes to improve performance.'; statusIcon = <AlertTriangle size={16} className="text-yellow-400 mr-2" />; statusColorClass = 'text-yellow-400'; }
            }
        } else {
            statusText = 'No historical data';
            actionHint = 'Action: Ensure data sources are properly linked and syncing.';
            statusIcon = <AlertTriangle size={16} className="text-gray-400 mr-2" />;
            statusColorClass = 'text-gray-400';
        }

        return (
            <div className="p-2 space-y-2">
                <p className="font-bold text-lg text-yellow-400">{indicator.name} ({indicator.type})</p>
                <p className="text-sm text-gray-300">Category: {indicator.category}</p>

                <div className="pt-2 border-t border-gray-700">
                    <p className="text-sm"><strong>Description:</strong> {indicator.description}</p>
                </div>

                <div className="pt-2 border-t border-gray-700">
                    <p className="text-sm"><strong>{isKri ? 'Threshold' : 'Target'}:</strong> {indicator.targetValue} {indicator.targetUnit}</p>
                    <p className="text-sm"><strong>Current Value:</strong> {latestValue} {indicator.targetUnit}</p>
                </div>

                <div className="pt-2 border-t border-gray-700 flex items-center">
                    {statusIcon}
                    <p className="text-sm"><strong>Status:</strong> <span className={statusColorClass}>{statusText}</span></p>
                </div>
                <p className="text-xs italic text-gray-500 mt-2">{actionHint}</p>
            </div>
        );
    };

    return (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-white">
            <div className="flex items-center">
                <div className="mr-4">{icon}</div>
                <div>
                    <Tooltip>
                        <p className="text-sm text-gray-400 cursor-help">
                            {title} {metricType && <span className="text-xs px-2 py-0.5 rounded-full bg-red-900 text-red-300 ml-1">{metricType}</span>}
                        </p>
                        {getTooltipContent()}
                    </Tooltip>
                    <p className="text-2xl font-bold">{value}</p>
                </div>
            </div>
        </div>
    );
};

// Transaction Risk Summary Card Component
const TransactionRiskSummaryCard = () => {
    // Determine overall Transaction Risk health
    const alertsGenerated = processedTransactionDashboardData.alertsGenerated;
    const totalTransactions = parseInt(processedTransactionDashboardData.totalTransactions.replace(/,/g, ''), 10);
    const flaggedTransactionsCount = processedTransactionDashboardData.dailyFraudMonitoring.reduce((sum, item) => sum + item.flagged, 0);

    let healthStatus = "Stable";
    let healthIcon = <CheckCircle size={24} className="text-green-400" />;
    let healthDescription = "Transaction monitoring systems are operating effectively with low anomaly rates.";
    let healthColor = "bg-green-900/20 border-green-700";

    if (alertsGenerated > 100 || flaggedTransactionsCount > 50) { // Example thresholds
        healthStatus = "Elevated Risk";
        healthIcon = <AlertTriangle size={24} className="text-yellow-400" />;
        healthDescription = "Increased number of alerts and flagged transactions. Review alerts and rules.";
        healthColor = "bg-yellow-900/20 border-yellow-700";
    }
    if (alertsGenerated > 200 || flaggedTransactionsCount > 100) { // Higher thresholds for Critical
        healthStatus = "Critical Risk";
        healthIcon = <XCircle size={24} className="text-red-400" />;
        healthDescription = "High volume of critical alerts. Immediate investigation and remediation required.";
        healthColor = "bg-red-900/20 border-red-700";
    }

    return (
        <div className={`bg-gray-800 p-6 rounded-xl shadow-lg text-white border ${healthColor} flex flex-col md:flex-row items-center justify-between`}>
            <div className="flex items-center mb-4 md:mb-0">
                {healthIcon}
                <div className="ml-4">
                    {/* UPDATED: Title font size and weight, explicit text-white */}
                    <h3 className="text-2xl font-extrabold text-white">Transaction Risk Overview: <span className={healthColor.includes('green') ? 'text-green-400' : healthColor.includes('yellow') ? 'text-yellow-400' : 'text-red-400'}>{healthStatus}</span></h3>
                    {/* UPDATED: Description font weight and color */}
                    <p className="text-base text-white font-medium mt-1">{healthDescription}</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-8"> {/* Removed text-sm text-gray-300 from here to inherit text-white */}
                <div className="flex items-center">
                    <DollarSign size={18} className="mr-2 text-blue-400" />
                    {/* UPDATED: Metric label font weight and size, explicit text-white */}
                    <span className="font-semibold text-base text-white">Total Value (24h): <span className="font-bold">{processedTransactionDashboardData.totalValue}</span></span>
                </div>
                <div className="flex items-center">
                    <AlertTriangle size={18} className="mr-2 text-yellow-400" />
                    {/* UPDATED: Metric label font weight and size, explicit text-white */}
                    <span className="font-semibold text-base text-white">Unresolved Alerts (24h): <span className="font-bold">{alertsGenerated}</span></span>
                </div>
            </div>
        </div>
    );
};

const TransactionMonitoringDashboard = () => {
    return (
        <div className="space-y-6 animate-fade-in mt-6">
            <TransactionRiskSummaryCard />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={<DollarSign size={32} className="text-green-500"/>} title="Total Transaction Value (24h)" value={processedTransactionDashboardData.totalValue} metricType="KRI" indicatorId="kri-total-transaction-value" />
                <StatCard icon={<BarChartIcon size={32} className="text-blue-500"/>} title="Total Transactions (24h)" value={processedTransactionDashboardData.totalTransactions} metricType="KRI" indicatorId="kri-total-transactions" />
                <StatCard icon={<AlertTriangle size={32} className="text-yellow-500"/>} title="Alerts Generated (24h)" value={processedTransactionDashboardData.alertsGenerated} metricType="KRI" indicatorId="kri-transaction-compliance" />
            </div>

            <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white mt-6">
                 <h3 className="text-xl font-semibold mb-4 text-[#c0933e]">Transaction Trends (Last 7 Days)</h3>
                 <div className="h-96">
                    <FraudChart />
                 </div>
            </div>
        </div>
    );
};

export default TransactionMonitoringDashboard;