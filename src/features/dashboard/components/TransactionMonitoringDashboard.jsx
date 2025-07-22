import React, { useState, useEffect, useMemo } from 'react';
import { DollarSign, AlertTriangle, BarChart as BarChartIcon, CheckCircle, XCircle, Slash, TrendingUp, CreditCard, Filter, Search, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import FraudChart from "./FraudChart.jsx";
import { processedTransactionDashboardData, mockIndicators } from '../../../data/mockData.js';
import Tooltip from '../../../components/ui/Tooltip.jsx';
import PaymentTransactionsDrilldownModal from '../modals/PaymentTransactionsDrilldownModal.jsx'; // NEW: Import the new modal

// Helper function to generate dummy transaction data for the dashboard
const generateDummyTransactionData = (count = 1000) => {
    const data = [];
    const paymentMethods = ['Stripe', 'Visa', 'Mastercard', 'PayPal', 'Bank Transfer'];
    const transactionTypes = ['Payment', 'Refund', 'Withdrawal', 'Deposit', 'KYC Transaction'];
    const statuses = ['Completed', 'Pending', 'Failed', 'Flagged'];
    const currencies = ['USD', 'KSH', 'GHS', 'NGN', 'ZAR'];
    const currencySymbols = { 'USD': '$', 'KSH': 'KSh', 'GHS': 'GH¢', 'NGN': '₦', 'ZAR': 'R' }; // Map currency codes to symbols

    for (let i = 0; i < count; i++) {
        const date = new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000));
        const amount = (Math.random() * 5000 + 50);
        const method = paymentMethods[i % paymentMethods.length]; // FIX: Distribute methods cyclically
        const type = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const currency = currencies[i % currencies.length]; // FIX: Distribute currencies cyclically

        data.push({
            id: `TXN-${i}-${Date.now()}`,
            date: date,
            amount: amount,
            method: method,
            type: type,
            status: status,
            currency: currency, // Add currency to the data
            description: `${type} via ${method} for ${currencySymbols[currency] || ''}${amount.toFixed(2)}`,
            isFlagged: status === 'Flagged',
        });
    }
    return data;
};

// Modified StatCard to accept and use a tooltipPlacementClass
const StatCard = ({ icon, title, value, metricType, indicatorId, tooltipPlacementClass = "" }) => {
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
                    {/* Pass tooltipPlacementClass to Tooltip */}
                    <Tooltip customClass={tooltipPlacementClass}>
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
const TransactionRiskSummaryCard = ({ alertsGenerated, totalValue, flaggedTransactionsCount, currencySymbol }) => {
    let healthStatus = "Stable";
    let healthIcon = <CheckCircle size={24} className="text-green-400" />;
    let healthDescription = "Transaction monitoring systems are operating effectively with low anomaly rates.";
    let healthColor = "bg-green-900/20 border-green-700";

    if (alertsGenerated > 10 || flaggedTransactionsCount > 5) { // Adjusted example thresholds for smaller dummy dataset
        healthStatus = "Elevated Risk";
        healthIcon = <AlertTriangle size={24} className="text-yellow-400" />;
        healthDescription = "Increased number of alerts and flagged transactions. Review alerts and rules.";
        healthColor = "bg-yellow-900/20 border-yellow-700";
    }
    if (alertsGenerated > 20 || flaggedTransactionsCount > 10) { // Higher thresholds for Critical
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
                    <h3 className="text-2xl font-extrabold text-white">Transaction Risk Overview: <span className={healthColor.includes('green') ? 'text-green-400' : healthColor.includes('yellow') ? 'text-yellow-400' : 'text-red-400'}>{healthStatus}</span></h3>
                    <p className="text-base text-white font-medium mt-1">{healthDescription}</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-8">
                <div className="flex items-center">
                    <DollarSign size={18} className="mr-2 text-blue-400" />
                    {/* Use currencySymbol prop */}
                    <span className="font-semibold text-base text-white">Total Value (Filtered): <span className="font-bold">{currencySymbol}{totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></span>
                </div>
                <div className="flex items-center">
                    <AlertTriangle size={18} className="mr-2 text-yellow-400" />
                    <span className="font-semibold text-base text-white">Flagged Transactions (Filtered): <span className="font-bold">{flaggedTransactionsCount}</span></span>
                </div>
            </div>
        </div>
    );
};


const TransactionMonitoringDashboard = ({ jurisdiction }) => { // Accept jurisdiction as prop
    const [allTransactions, setAllTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [currentSourceFilter, setCurrentSourceFilter] = useState('All');
    const [currentTimeFilter, setCurrentTimeFilter] = useState('All Time');
    const [searchTerm, setSearchTerm] = useState('');
    // NEW: State for Payment Transactions Drilldown Modal
    const [showPaymentDrilldownModal, setShowPaymentDrilldownModal] = useState(false);
    const [selectedPaymentProviderTransactions, setSelectedPaymentProviderTransactions] = useState([]);
    const [selectedPaymentProviderName, setSelectedPaymentProviderName] = useState('');


    // Map currency codes to symbols for display
    const currencySymbolsMap = useMemo(() => ({
        'USD': '$',
        'KSH': 'KSh',
        'GHS': 'GH¢',
        'NGN': '₦',
        'ZAR': 'R'
    }), []);

    // Determine the current currency symbol based on jurisdiction filter
    const currentCurrencySymbol = useMemo(() => {
        let targetCurrencyCode = 'USD'; // Default to USD
        switch (jurisdiction) {
            case 'Kenya': targetCurrencyCode = 'KSH'; break;
            case 'Nigeria': targetCurrencyCode = 'NGN'; break;
            case 'Ghana': targetCurrencyCode = 'GHS'; break;
            case 'South Africa': targetCurrencyCode = 'ZAR'; break;
            // 'Global' or unmapped jurisdictions will use the default 'USD'
        }
        return currencySymbolsMap[targetCurrencyCode] || '$';
    }, [jurisdiction, currencySymbolsMap]);


    useEffect(() => {
        setAllTransactions(generateDummyTransactionData(500));
    }, []);

    useEffect(() => {
        applyFilters();
    }, [allTransactions, currentSourceFilter, currentTimeFilter, searchTerm, jurisdiction]); // Add jurisdiction to dependencies

    const applyFilters = () => {
        let tempFiltered = [...allTransactions];

        // Filter by Source
        if (currentSourceFilter !== 'All') {
            tempFiltered = tempFiltered.filter(t => t.method === currentSourceFilter);
        }

        // Filter by Time
        const now = new Date();
        if (currentTimeFilter === 'Last Year') {
            const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
            tempFiltered = tempFiltered.filter(t => t.date >= oneYearAgo);
        } else if (currentTimeFilter === 'Last Month') {
            const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
            tempFiltered = tempFiltered.filter(t => t.date >= oneMonthAgo);
        } else if (currentTimeFilter === 'Last Week') {
            const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
            tempFiltered = tempFiltered.filter(t => t.date >= oneWeekAgo);
        }

        // Filter by Currency based on Jurisdiction
        let targetCurrencyCodeForFilter = 'USD'; // Default currency for filtering if no specific jurisdiction match
        if (jurisdiction && jurisdiction !== 'Global') {
             switch (jurisdiction) {
                case 'Kenya': targetCurrencyCodeForFilter = 'KSH'; break;
                case 'Nigeria': targetCurrencyCodeForFilter = 'NGN'; break;
                case 'Ghana': targetCurrencyCodeForFilter = 'GHS'; break;
                case 'South Africa': targetCurrencyCodeForFilter = 'ZAR'; break;
                default: break; // If jurisdiction is specific but not mapped, it remains 'USD'
            }
            tempFiltered = tempFiltered.filter(t => t.currency === targetCurrencyCodeForFilter);
        }
        // If 'Global' is selected, no currency filter is applied, showing all currencies generated by dummy data.


        // Filter by Search Term
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            tempFiltered = tempFiltered.filter(t =>
                t.description.toLowerCase().includes(lowerCaseSearchTerm) ||
                t.id.toLowerCase().includes(lowerCaseSearchTerm)
            );
        }

        setFilteredTransactions(tempFiltered);
    };

    // NEW: Handle click on payment provider breakdown
    const handlePaymentProviderDrilldown = (provider) => {
        let transactionsToDisplay = [];
        if (provider === 'Other') {
            // Filter for transactions whose method is NOT Stripe, Visa, or Mastercard
            transactionsToDisplay = filteredTransactions.filter(t => 
                t.method !== 'Stripe' && t.method !== 'Visa' && t.method !== 'Mastercard'
            );
        } else {
            transactionsToDisplay = filteredTransactions.filter(t => t.method === provider);
        }
        setSelectedPaymentProviderTransactions(transactionsToDisplay);
        setSelectedPaymentProviderName(provider);
        setShowPaymentDrilldownModal(true);
    };


    // Calculate Transaction Volume breakdown by Payment Provider
    const transactionMethodBreakdown = useMemo(() => {
        const breakdown = {
            Stripe: 0,
            Visa: 0,
            Mastercard: 0,
            Other: 0
        };

        filteredTransactions.forEach(t => {
            if (t.method === 'Stripe') breakdown.Stripe++;
            else if (t.method === 'Visa') breakdown.Visa++;
            else if (t.method === 'Mastercard') breakdown.Mastercard++;
            else breakdown.Other++;
        });
        return breakdown;
    }, [filteredTransactions]);

    const totalTransactionsInBreakdown = useMemo(() => {
        return Object.values(transactionMethodBreakdown).reduce((sum, count) => sum + count, 0);
    }, [transactionMethodBreakdown]);

    const totalFilteredValue = useMemo(() => {
        return filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
    }, [filteredTransactions]);

    const totalFlaggedTransactions = useMemo(() => {
        return filteredTransactions.filter(t => t.isFlagged).length;
    }, [filteredTransactions]);


    const filterButtonClass = (isActive) =>
        isActive
            ? 'px-4 py-2 bg-[#c0933e] text-[#1e252d] rounded-full shadow-lg font-semibold text-sm'
            : 'px-4 py-2 bg-gray-700 text-white rounded-full shadow-md hover:bg-gray-600 text-sm';

    return (
        <div className="space-y-6 animate-fade-in mt-6">
            <h3 className="text-2xl font-bold text-blue-400 mb-6">Transaction Monitoring Dashboard</h3>

            {/* Filters Section */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
                <div className="flex-grow flex flex-col items-start space-y-2">
                    <span className="text-blue-300 font-semibold">Source:</span>
                    <div className="flex flex-wrap gap-2">
                        {['All', 'Stripe', 'Visa', 'Mastercard', 'PayPal', 'Bank Transfer'].map(source => (
                            <button
                                key={source}
                                onClick={() => setCurrentSourceFilter(source === 'All' ? 'All' : source)}
                                className={filterButtonClass(currentSourceFilter === source)}
                            >
                                {source === 'All' ? 'All Payment Sources' : source}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex-grow flex flex-col items-start space-y-2">
                    <span className="text-blue-300 font-semibold">Time:</span>
                    <div className="flex flex-wrap gap-2">
                        {['All Time', 'Last Year', 'Last Month', 'Last Week'].map(time => (
                            <button
                                key={time}
                                onClick={() => setCurrentTimeFilter(time)}
                                className={filterButtonClass(currentTimeFilter === time)}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="relative w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        className="pl-8 pr-2 py-1 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            <TransactionRiskSummaryCard 
                alertsGenerated={totalFlaggedTransactions}
                totalValue={totalFilteredValue}
                flaggedTransactionsCount={totalFlaggedTransactions}
                currencySymbol={currentCurrencySymbol} // Pass currency symbol
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <StatCard 
                    icon={<DollarSign size={32} className="text-green-500"/>} 
                    title="Total Transaction Value (Filtered)" 
                    value={`${currentCurrencySymbol}${totalFilteredValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
                    metricType="KRI" 
                    indicatorId="kri-total-transaction-value" 
                    tooltipPlacementClass="!left-full !ml-6 !top-1/2 !-translate-y-1/2 z-20"
                />
                <StatCard 
                    icon={<BarChartIcon size={32} className="text-blue-500"/>} 
                    title="Total Transactions (Filtered)" 
                    value={filteredTransactions.length.toLocaleString()} 
                    metricType="KRI" 
                    indicatorId="kri-total-transactions" 
                    tooltipPlacementClass="!left-full !ml-6 !top-1/2 !-translate-y-1/2 z-20"
                />
                <StatCard 
                    icon={<AlertTriangle size={32} className="text-yellow-500"/>} 
                    title="Alerts Generated (Filtered)" 
                    value={totalFlaggedTransactions.toLocaleString()} 
                    metricType="KRI" 
                    indicatorId="kri-transaction-compliance" 
                    tooltipPlacementClass="!left-full !ml-6 !top-1/2 !-translate-y-1/2 z-20"
                />
            </div>

            {/* Transaction Volume Breakdown by Payment Provider */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-md border border-gray-600 mb-6 relative z-10">
                <h4 className="text-xl font-semibold text-gray-100 mb-4">Transaction Volume by Payment Provider (Filtered)</h4>
                {totalTransactionsInBreakdown > 0 ? (
                    <div className="flex flex-col space-y-3">
                        {Object.entries(transactionMethodBreakdown).map(([provider, count]) => (
                            <div 
                                key={provider} 
                                className="flex items-center cursor-pointer hover:bg-gray-600 p-2 rounded-md transition-colors" // Make clickable
                                onClick={() => handlePaymentProviderDrilldown(provider)} // NEW: Add click handler
                            >
                                <span className="text-gray-300 w-36">{provider}</span>
                                <div className="flex-grow bg-gray-600 rounded-full h-4 relative">
                                    <div
                                        className="bg-blue-500 h-full rounded-full"
                                        style={{ width: `${(count / totalTransactionsInBreakdown) * 100}%` }}
                                    ></div>
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-white">
                                        {count} ({(totalTransactionsInBreakdown > 0 ? (count / totalTransactionsInBreakdown) * 100 : 0).toFixed(1)}%)
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400 text-center py-4">No transactions found for the selected filters.</p>
                )}
            </div>

            <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white mt-6">
                <h3 className="text-xl font-semibold mb-4 text-[#c0933e]">Transaction Trends (Last 7 Days)</h3>
                <div className="h-96">
                    <FraudChart />
                </div>
            </div>

            {/* NEW: Payment Transactions Drilldown Modal */}
            {showPaymentDrilldownModal && (
                <PaymentTransactionsDrilldownModal
                    transactions={selectedPaymentProviderTransactions}
                    providerName={selectedPaymentProviderName}
                    currencySymbol={currentCurrencySymbol}
                    onClose={() => setShowPaymentDrilldownModal(false)}
                />
            )}
        </div>
    );
};

export default TransactionMonitoringDashboard;
