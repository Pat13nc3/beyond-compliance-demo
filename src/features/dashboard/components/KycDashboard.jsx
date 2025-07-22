import React from 'react';
import { UserCheck, Clock, ShieldX, TrendingUp, CheckCircle, AlertTriangle, XCircle, BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import { processedKycDashboardData, mockIndicators } from '../../../data/mockData.js';
import Tooltip from '../../../components/ui/Tooltip.jsx';

const StatCard = ({ icon, title, value, trend, metricType, indicatorId }) => {
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
                            {title} {metricType && <span className="text-xs px-2 py-0.5 rounded-full bg-blue-900 text-blue-300 ml-1">{metricType}</span>}
                        </p>
                        {getTooltipContent()}
                    </Tooltip>
                    <p className="text-2xl font-bold">{value}</p>
                </div>
            </div>
            {trend && <p className="text-xs text-green-400 mt-2 flex items-center"><TrendingUp size={14} className="mr-1"/>{trend}</p>}
        </div>
    );
};

// KYC Summary Card Component
const KycSummaryCard = () => {
    // Determine overall KYC health based on key KPIs/KRIs
    const verificationRate = processedKycDashboardData.verificationRate;
    const rejectionRate = processedKycDashboardData.rejectionRate;
    const avgTurnaroundTime = parseFloat(processedKycDashboardData.avgTurnaroundTime);

    let healthStatus = "Good";
    let healthIcon = <CheckCircle size={24} className="text-green-400" />;
    let healthDescription = "KYC performance is strong and within target benchmarks.";
    let healthColor = "bg-green-900/20 border-green-700";

    if (rejectionRate > 3.0 || verificationRate < 90 || avgTurnaroundTime > 5) {
        healthStatus = "Needs Attention";
        healthIcon = <AlertTriangle size={24} className="text-yellow-400" />;
        healthDescription = "Some KYC metrics are outside ideal ranges. Review details below.";
        healthColor = "bg-yellow-900/20 border-yellow-700";
    }
    if (rejectionRate > 5.0 || verificationRate < 80 || avgTurnaroundTime > 8) {
        healthStatus = "Critical";
        healthIcon = <XCircle size={24} className="text-red-400" />;
        healthDescription = "Critical KYC performance issues detected. Immediate action required.";
        healthColor = "bg-red-900/20 border-red-700";
    }


    const totalVerifications = processedKycDashboardData.dailyVerificationsData.reduce((sum, item) => sum + item.count, 0);

    return (
        <div className={`bg-gray-800 p-6 rounded-xl shadow-lg text-white border ${healthColor} flex flex-col md:flex-row items-center justify-between`}>
            <div className="flex items-center mb-4 md:mb-0">
                {healthIcon}
                <div className="ml-4">
                    {/* UPDATED: Title font size and weight, explicit text-white */}
                    <h3 className="text-2xl font-extrabold text-white">KYC Performance Overview: <span className={healthColor.includes('green') ? 'text-green-400' : healthColor.includes('yellow') ? 'text-yellow-400' : 'text-red-400'}>{healthStatus}</span></h3>
                    {/* UPDATED: Description font weight and color */}
                    <p className="text-base text-white font-medium mt-1">{healthDescription}</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-8"> {/* Removed text-sm text-gray-300 from here to inherit text-white */}
                <div className="flex items-center">
                    <UserCheck size={18} className="mr-2 text-blue-400" />
                    {/* UPDATED: Metric label font weight and size, explicit text-white */}
                    <span className="font-semibold text-base text-white">Total Verifications (7 Days): <span className="font-bold">{totalVerifications}</span></span>
                </div>
                <div className="flex items-center">
                    <BarChart2 size={18} className="mr-2 text-purple-400" />
                    {/* UPDATED: Metric label font weight and size, explicit text-white */}
                    <span className="font-semibold text-base text-white">Avg. Rejection Rate: <span className="font-bold">{rejectionRate}%</span></span>
                </div>
            </div>
        </div>
    );
};


const KycDashboard = () => {
    return (
        <div className="space-y-6 animate-fade-in mt-6">
            <KycSummaryCard />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={<UserCheck size={32} className="text-green-500"/>} title="Verification Rate" value={`${processedKycDashboardData.verificationRate}%`} trend="+1.2% this week" metricType="KPI" indicatorId="kpi-verification-rate" />
                <StatCard icon={<Clock size={32} className="text-blue-500"/>} title="Avg. Turnaround Time" value={processedKycDashboardData.avgTurnaroundTime} metricType="KPI" indicatorId="kpi-kyc-processing-time" />
                <StatCard icon={<ShieldX size={32} className="text-red-500"/>} title="Rejection Rate" value={`${processedKycDashboardData.rejectionRate}%`} metricType="KRI" indicatorId="kri-rejection-rate" />
            </div>

            <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white mt-6">
                 <h3 className="text-xl font-semibold mb-4 text-[#c0933e]">Daily Verifications (Last 7 Days)</h3>
                 <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={processedKycDashboardData.dailyVerificationsData}>
                            <XAxis dataKey="day" stroke="#e7f1fe" />
                            <YAxis stroke="#e7f1fe" />
                            <RechartsTooltip
                                cursor={{fill: 'rgba(230, 230, 230, 0.1)'}}
                                contentStyle={{ backgroundColor: '#2d251e', border: 'none', color: 'white' }}
                            />
                            <Legend wrapperStyle={{color: "#e7f1fe"}}/>
                            <Bar dataKey="count" name="Verifications" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                 </div>
            </div>
        </div>
    );
};

export default KycDashboard;